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
            j.setDatas(record);
            j.setMsg("查询正确");
            j.setState(1);
        } catch (Exception e) {
            j.setMsg(e.getMessage());
        }
        String res = JSON.toJSONString(j);
        return res;
    }

}
