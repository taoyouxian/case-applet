package com.aliyun.baas.index;

import java.util.Objects;

public class IndexEntry {
    private String chaincodeName;
    private String chaincodeVersion;

    public IndexEntry() {
    }

    public IndexEntry(String chaincodeName, String chaincodeVersion) {
        this.chaincodeName = chaincodeName;
        this.chaincodeVersion = chaincodeVersion;
    }

    public String getChaincodeName() {
        return chaincodeName;
    }

    public void setChaincodeName(String chaincodeName) {
        this.chaincodeName = chaincodeName;
    }

    public String getChaincodeVersion() {
        return chaincodeVersion;
    }

    public void setChaincodeVersion(String chaincodeVersion) {
        this.chaincodeVersion = chaincodeVersion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IndexEntry that = (IndexEntry) o;
        return Objects.equals(chaincodeName, that.chaincodeName) &&
                Objects.equals(chaincodeVersion, that.chaincodeVersion);
    }

    @Override
    public int hashCode() {

        return Objects.hash(chaincodeName, chaincodeVersion);
    }
}
