/*
 *  Copyright 2018 Aliyun.com All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.aliyun.baas;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperledger.fabric.sdk.*;
import org.hyperledger.fabric.sdk.exception.InvalidArgumentException;
import org.hyperledger.fabric.sdk.exception.ProposalException;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class ChaincodeExecuter {
    private static final Log logger = LogFactory.getLog(ChaincodeExecuter.class);

    private String chaincodeName;
    private String version;
    private ChaincodeID ccId;
    private long waitTime = 6000;

    public ChaincodeExecuter(String chaincodeName, String version) {
        this.chaincodeName = chaincodeName;
        this.version = version;

        ChaincodeID.Builder chaincodeIDBuilder = ChaincodeID.newBuilder()
                .setName(chaincodeName)
                .setVersion(version);
        ccId = chaincodeIDBuilder.build();
    }

    public String getChaincodeName() {
        return chaincodeName;
    }

    public void setChaincodeName(String chaincodeName) {
        this.chaincodeName = chaincodeName;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public long getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(long waitTime) {
        this.waitTime = waitTime;
    }

    public String executeTransaction(HFClient client, Channel channel, boolean invoke, String func, String... args) {
        TransactionProposalRequest transactionProposalRequest = client.newTransactionProposalRequest();
        transactionProposalRequest.setChaincodeID(ccId);
        transactionProposalRequest.setChaincodeLanguage(TransactionRequest.Type.GO_LANG);

        transactionProposalRequest.setFcn(func);
        transactionProposalRequest.setArgs(args);
        transactionProposalRequest.setProposalWaitTime(waitTime);


        List<ProposalResponse> successful = new LinkedList();
        List<ProposalResponse> failed = new LinkedList();
        String result = null;

        Collection<ProposalResponse> transactionPropResp = null;
        try {
            transactionPropResp = channel.sendTransactionProposal(transactionProposalRequest, channel.getPeers());
        } catch (ProposalException e) {
            result = "error " + e.getMessage();
            return result;
        } catch (InvalidArgumentException e) {
            result = "error " + e.getMessage();
            return result;
        }
        for (ProposalResponse response : transactionPropResp) {

            if (response.getStatus() == ProposalResponse.Status.SUCCESS) {
                String payload = null;
                try {
                    payload = new String(response.getChaincodeActionResponsePayload());
                } catch (InvalidArgumentException e) {
                    result = "error " + e.getMessage();
                    return result;
                }
                logger.info(String.format("[√] Got success response from peer %s => payload: %s", response.getPeer().getName(), payload));
                result = payload;
                successful.add(response);
            } else {
                String status = response.getStatus().toString();
                String msg = response.getMessage();
                logger.warn(String.format("[×] Got failed response from peer %s => %s: %s ", response.getPeer().getName(), status, msg));
                failed.add(response);
            }
        }

        if (invoke) {
            logger.info("Sending transaction to orderers...");
            try {
                channel.sendTransaction(successful).thenApply(transactionEvent -> {
                    logger.info("Orderer response: txid" + transactionEvent.getTransactionID());
                    logger.info("Orderer response: block number: " + transactionEvent.getBlockEvent().getBlockNumber());
                    return null;
                }).exceptionally(e -> {
                    logger.error("Orderer exception happened: ", e);
                    return null;
                }).get(waitTime, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                result = "error " + e.getMessage();
                return result;
            } catch (ExecutionException e) {
                result = "error " + e.getMessage();
                return result;
            } catch (TimeoutException e) {
                result = "error " + e.getMessage();
                return result;
            }
        }

        return result;
    }
}
