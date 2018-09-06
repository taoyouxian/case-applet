## 使用方法

通过如下步骤运行fabric-sdk-java的示例程序。 

### 确认配置文件

将SDK包中的配置文件 `connection-profile-standard.yaml` 复制到当前目录。

### 安装 jar 包

我们已预先下载了java-sdk 1.2.0版本的jar包，位于 `lib` 目录下，

`fabric-sdk-java-1.2.0-jar-with-dependencies.jar`: 包含了fabric-sdk-java和它的所有依赖。
`fabric-sdk-java-1.2.0-sources.jar`: 包含了fabric-sdk-java的源码。


执行如下命令将jar包安装到本地maven仓库：
```
mvn install:install-file -Dfile=./lib/fabric-sdk-java-1.2.0-jar-with-dependencies.jar -DgroupId=org.hyperledger.fabric-sdk-java -DartifactId=fabric-sdk-java -Dversion=1.2.0 -Dpackaging=jar
```

若需要阅读fabric-sdk-java源码，可以安装源码包：

```
mvn install:install-file -Dfile=./lib/fabric-sdk-java-1.2.0-sources.jar -DgroupId=org.hyperledger.fabric-sdk-java -DartifactId=fabric-sdk-java -Dversion=1.2.0 -Dpackaging=jar -Dclassifier=sources
```

### 上传链码

将 chaincode 目录中的 `sacc.out` 上传至 BaaS 平台，上传方法参考：https://help.aliyun.com/document_detail/85739.html

### 打开项目

打开任意IDE，导入java项目

修改`java-sdk-demo/src/main/java/com/aliyun/baas/Main.java` 文件中的内容以匹配您的配置

```java
    private static String channelName = "first-channel";  // 通道名称
    private static String userName = "user1";             // 用户名
    private static String secret = "password";            // 密码
```

执行 com.aliyun.baas.Main 程序即可

```shell
mvn compile
mvn exec:java -Dexec.mainClass="com.aliyun.baas.Main"  -Dexec.classpathScope=runtime
```

## 示例程序说明

该示例程序会执行如下操作：

1. Enroll 用户
2. 读取配置文件，连接到channel相关的peer，并监听块事件。
3. 获取账本的块信息并输出
4. 调用 sacc 智能合约，修改账本，并读取
5. 断开和peer的连接

## 参考链接

- [fabric-sdk-java官方地址](https://github.com/hyperledger/fabric-sdk-java)
- [sdk-java maven 仓库](http://central.maven.org/maven2/org/hyperledger/fabric-sdk-java/fabric-sdk-java/1.2.0/)
