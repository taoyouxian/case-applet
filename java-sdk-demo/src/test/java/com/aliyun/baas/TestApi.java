package com.aliyun.baas;

import org.junit.Test;

/**
 * @version V1.0
 * @Package: com.aliyun.baas
 * @ClassName: TestApi
 * @Description: Test api function
 * @author: taoyouxian
 * @date: Create in 2018-09-04 12:30
 **/
public class TestApi {

    @Test
    public void testAction() {
        String queryString = "11";
        printArr("createUser", "15061126707", "江苏常州", "publickey", "流向", "男", "1995-05-26", "35080219950695574");
        printArr("queryAll", queryString);
        String[] args = new String[]{"15061126707", "江苏常州", "publickey", "流向", "男", "1995-05-26", "35080219950695574"};
        printArr("createUser", args);
    }

    //含可变参数的方法（注，可变参数只能放在末位）
    public static void printArr(String fuction, String... s) {
        System.out.print("Fcn： " + fuction + "; \nargs: ");
        for (String str : s) {
            System.out.print(str + ", ");
        }
        System.out.println("\n");
    }
}
