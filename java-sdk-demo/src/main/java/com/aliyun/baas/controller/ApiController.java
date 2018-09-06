package com.aliyun.baas.controller;

import com.alibaba.fastjson.JSON;
import com.aliyun.baas.domain.Json;
import com.aliyun.baas.index.Chain;
import com.aliyun.baas.index.IndexEntry;
import com.aliyun.baas.index.IndexFactory;
import org.hyperledger.fabric.sdk.Channel;
import org.hyperledger.fabric.sdk.HFClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    private Logger logger = LoggerFactory.getLogger(ApiController.class);

    @Value("${chaincodeName}")
    private String chaincodeName;

    @Value("${chaincodeVersion}")
    private String chaincodeVersion;

    @RequestMapping(value = "/")
    public String getAction() {
        long time = System.currentTimeMillis();
        Json j = new Json();
        j.setDatas(time);
        j.setState(1);
        String res = JSON.toJSONString(j);
        System.out.println("Time is: " + System.currentTimeMillis());
        return res;
    }

    // doFcn?fcn=queryAll&args={"selector":{"sharename":"赵然"}}
    // doFcn?fcn=createUser&args="15061126707","江苏常州","publickey","流向","男","1995-05-26","3256452133665412"
    @RequestMapping(value = "/doFcn")
    public String doFcn(@RequestParam("fcn") String fcn, @RequestParam("args") String... args) {
        boolean invoke = false;

        IndexEntry indexEntry = new IndexEntry(chaincodeName, chaincodeVersion);
        Chain chain = IndexFactory.Instance().getIndex(indexEntry);
        HFClient client = chain.getClient();
        Channel channel = chain.getChannel();
        if (fcn.startsWith("init")) {
            invoke = true;
        } else if (fcn.startsWith("create")) {
            invoke = true;
        } else if (fcn.startsWith("query")) {

        }
        Json j = new Json();
        String record = "";
        try {
            record = chain.executeChaincode(client, channel, invoke, fcn, args);
            logger.info(fcn + " result: " + record);
            if (record.contains("error")) {
                j.setDatas(record);
                j.setMsg(fcn + " fail");
            } else if (record.equals(null)) {
                j.setDatas(record);
                j.setMsg(fcn + " fail");
            } else {
//                record = record.replace("\"", "'");
                j.setDatas(record);
                j.setMsg(fcn + " success");
                j.setState(1);
            }
        } catch (Exception e) {
            j.setDatas(record);
            j.getErrorList().add(e.getMessage());
            j.setMsg(fcn + " fail");
        }
        String res = JSON.toJSONString(j);
        return res;
    }

}
