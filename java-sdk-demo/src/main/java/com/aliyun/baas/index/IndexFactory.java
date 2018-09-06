package com.aliyun.baas.index;

import java.util.HashMap;
import java.util.Map;

public class IndexFactory {
    private static IndexFactory instance = null;

    public static IndexFactory Instance() {
        if (instance == null) {
            instance = new IndexFactory();
        }
        return instance;
    }

    private Map<IndexEntry, Chain> indexCache = null;

    private IndexFactory() {
        this.indexCache = new HashMap<>();
    }

    public void cacheIndex(IndexEntry name, Chain chain) {
        this.indexCache.put(name, chain);
    }

    public Chain getIndex(IndexEntry name) {
        return this.indexCache.get(name);
    }

}
