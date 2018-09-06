/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../Commons/Init.js" />

var Index = {
    Datas: {
        K0: ""
    },
    Tpls: {},
    Load: function () {
        var me = Index;
        try {
            me.Datas.K0 = hhls.getUrlParamByDefault("K0", "Video_List");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) { ; }
    },
    Refresh: function () {
        var me = Index;
        try {
            //$("#labTitleOrgCaption").text(SysDatas.Datas.OrgInfo.F_Caption);
            var aFun = me.Datas.K0 + ".Load()";
            eval(aFun);
        }
        catch (E) { ; }
    },
    doSetLeftMenu: function (aKey) {
        var me = Index;
        try {
            var aItems = $(".LeftMenuItem");
            aItems.removeClass("active");
            $.each(aItems, function (aInd, aItem) {
                var aItemKey = $(aItem).attr("Key");
                if (aItemKey == aKey) {
                    $(aItem).addClass("active");
                }
            });
        }
        catch (E) { ; }
    },
    doOnPickMenu: function (aLi) {
        var me = Index;
        try {
            var aKey = $(aLi).attr("Key");
            var aUrl = "index.htm?K0=" + aKey+"_List";
            hhls.goUrl(aUrl);
        }
        catch (E) { ; }
    }
}
