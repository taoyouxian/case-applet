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

package com.aliyun.baas.index;

import com.aliyun.baas.ChaincodeExecuter;
import com.aliyun.baas.FabricUser;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperledger.fabric.sdk.*;
import org.hyperledger.fabric.sdk.exception.InvalidArgumentException;
import org.hyperledger.fabric.sdk.exception.ProposalException;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.hyperledger.fabric_ca.sdk.HFCAClient;
import org.hyperledger.fabric_ca.sdk.HFCAInfo;
import org.hyperledger.fabric_ca.sdk.exception.EnrollmentException;
import org.hyperledger.fabric_ca.sdk.exception.InfoException;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;

public class Chain {

    private static final Log logger = LogFactory.getLog(Chain.class);
    private static final long waitTime = 12000;
    private static String connectionProfilePath;

    private static String channelName = "first-channel";
    private static String userName = "case";
    private static String secret = "Casechain";
    private static String chaincodeName = "mycc2";
    private static String chaincodeVersion = "0";

    HFClient client;
    Channel channel;

    public HFClient getClient() {
        return client;
    }

    public void setClient(HFClient client) {
        this.client = client;
    }

    public Channel getChannel() {
        return channel;
    }

    public void setChannel(Channel channel) {
        this.channel = channel;
    }

    public Chain() {
        connectionProfilePath = System.getProperty("user.dir") + "/connection-profile-standard.yaml";
        File f = new File(connectionProfilePath);
        try {
            NetworkConfig networkConfig = NetworkConfig.fromYamlFile(f);
            NetworkConfig.OrgInfo clientOrg = networkConfig.getClientOrganization();
            NetworkConfig.CAInfo caInfo = clientOrg.getCertificateAuthorities().get(0);

            FabricUser user = getFabricUser(clientOrg, caInfo);

            client = HFClient.createNewInstance();
            client.setCryptoSuite(CryptoSuite.Factory.getCryptoSuite());
            client.setUserContext(user);

            channel = client.loadChannelFromConfig(channelName, networkConfig);

            channel.initialize();

            channel.registerBlockListener(blockEvent -> {
                logger.info(String.format("Receive block event (number %s) from %s", blockEvent.getBlockNumber(), blockEvent.getPeer()));
            });
            //printChannelInfo(client, channel);
//            String res = executeChaincode(client, channel);
//            System.out.println(res);
//
//            logger.info("Shutdown channel.");
//            channel.shutdown(true);
        } catch (Exception e) {
            logger.error("exception", e);
        }
    }

    public String executeChaincode(HFClient client, Channel channel, boolean invoke, String fcn, String... args) throws
            ProposalException, InvalidArgumentException, UnsupportedEncodingException, InterruptedException,
            ExecutionException, TimeoutException {
        ChaincodeExecuter executer = new ChaincodeExecuter(chaincodeName, chaincodeVersion);

//        String queryString = "{\"selector\":{\"sharename\":\"赵然\"}}";"queryAll" false

        return executer.executeTransaction(client, channel, invoke, fcn, args);
    }

    private static void printChannelInfo(HFClient client, Channel channel) throws
            ProposalException, InvalidArgumentException, IOException {
        BlockchainInfo channelInfo = channel.queryBlockchainInfo();

        logger.info("Channel height: " + channelInfo.getHeight());
        for (long current = channelInfo.getHeight() - 1; current > -1; --current) {
            BlockInfo returnedBlock = channel.queryBlockByNumber(current);
            final long blockNumber = returnedBlock.getBlockNumber();

            logger.info(String.format("Block #%d has previous hash id: %s", blockNumber, Hex.encodeHexString(returnedBlock.getPreviousHash())));
            logger.info(String.format("Block #%d has data hash: %s", blockNumber, Hex.encodeHexString(returnedBlock.getDataHash())));
            logger.info(String.format("Block #%d has calculated block hash is %s",
                    blockNumber, Hex.encodeHexString(SDKUtils.calculateBlockHash(client, blockNumber, returnedBlock.getPreviousHash(), returnedBlock.getDataHash()))));
        }

    }

    private static FabricUser getFabricUser(NetworkConfig.OrgInfo clientOrg, NetworkConfig.CAInfo caInfo) throws
            MalformedURLException, org.hyperledger.fabric_ca.sdk.exception.InvalidArgumentException, InfoException,
            EnrollmentException {
        HFCAClient hfcaClient = HFCAClient.createNewInstance(caInfo);
        HFCAInfo cainfo = hfcaClient.info();
        logger.info("CA name: " + cainfo.getCAName());
        logger.info("CA version: " + cainfo.getVersion());

        // Persistence is not part of SDK.

        logger.info("Going to enroll user: " + userName);
        Enrollment enrollment = hfcaClient.enroll(userName, secret);
        logger.info("Enroll user: " + userName + " successfully.");

        FabricUser user = new FabricUser();
        user.setMspId(clientOrg.getMspId());
        user.setName(userName);
        user.setOrganization(clientOrg.getName());
        user.setEnrollment(enrollment);
        return user;
    }
}