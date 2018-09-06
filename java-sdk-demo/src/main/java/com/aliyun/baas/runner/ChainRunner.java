package com.aliyun.baas.runner;

import com.aliyun.baas.index.Chain;
import com.aliyun.baas.index.IndexEntry;
import com.aliyun.baas.index.IndexFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * @version V1.0
 * @Package: cn.edu.ruc.iir.api.agent.runner
 * @ClassName: MyApplicationRunner
 * @Description:
 * @author: tao
 * @date: Create in 2018-06-15 16:47
 **/
@Component
public class ChainRunner implements ApplicationRunner {

    private static String chaincodeName = "mycc2";
    private static String chaincodeVersion = "0";

    @Override
    public void run(ApplicationArguments applicationArguments) {
        IndexEntry indexEntry = new IndexEntry(chaincodeName, chaincodeVersion);
        Chain index = new Chain();
        IndexFactory.Instance().cacheIndex(indexEntry, index);
    }

}
