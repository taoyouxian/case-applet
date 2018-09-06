/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />

var User_List = {
    Datas: {
        K0: "",
    },
    Tpls: {
        tplUser_List: { P: "Modules/User/tplUser_List.htm", C: "" }
    },
    Load: function () {
        var me = User_List;
        try {
            Index.doSetLeftMenu("User");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) { ; }
    },
    Refresh: function () {
        var me = User_List;
        try {
            var aHtml = bt(me.Tpls.tplUser_List.C, { tplData: SysDatas.Datas.Users.Items });
            hhls.fillElement(".divMiddleMain", aHtml);
        }
        catch (E) { ; }
    },
    doEdit: function (aIndex) {
        var me = User_List;
        try {
            var aID = SysDatas.Datas.Users.Items[aIndex].F_ID;
            var aUrl = "Index.htm?K0=User_Edit&ID=" + aID;
            hhls.goUrl(aUrl);
        }
        catch (E) { ; }
    },
    doDelete: function (aIndex) {
        var me = User_List;
        try {
            hhls.WxConfirm("是否确定要删除该病人？", function () {
                var aID = SysDatas.Datas.Users.Items[aIndex].F_ID;
                SysDatas.User.doDelete(aID, function (aRes) {
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
