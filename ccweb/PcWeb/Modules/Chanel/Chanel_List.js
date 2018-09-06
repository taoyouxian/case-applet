/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />

var Chanel_List = {
    Datas: {
        K0: "",
    },
    Tpls: {
        tplChanel_List: { P: "Modules/Chanel/tplChanel_List.htm", C: "" }
    },
    Load: function () {
        var me = Chanel_List;
        try {
            Index.doSetLeftMenu("Chanel");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) { ; }
    },
    Refresh: function () {
        var me = Chanel_List;
        try {
            var aHtml = bt(me.Tpls.tplChanel_List.C, { tplData: SysDatas.Datas.Chanels.Items });
            hhls.fillElement(".divMiddleMain", aHtml);
        }
        catch (E) { ; }
    },
    doEdit: function (aIndex) {
        var me = Chanel_List;
        try {
            var aID = SysDatas.Datas.Chanels.Items[aIndex].F_ID;
            var aUrl = "Index.htm?K0=Chanel_Edit&ID=" + aID;
            hhls.goUrl(aUrl);
        }
        catch (E) { ; }
    },
    doDelete: function (aIndex) {
        var me = Chanel_List;
        try {
            hhls.WxConfirm("是否确定要删除该频道？", function () {
                var aID = SysDatas.Datas.Chanels.Items[aIndex].F_ID;
                SysDatas.Chanel.doDelete(aID, function (aRes) {
                    if (aRes.State == 1) {
                        me.Refresh();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }); 
        }
        catch (E) { ; }
    }
}
