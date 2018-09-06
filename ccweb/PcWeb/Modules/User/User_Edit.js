/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />

var User_Edit = {
    Datas: {
        K0: "",
        ID: "0"
    },
    Tpls: {
        tplUser_Edit: { P: "Modules/User/tplUser_Edit.htm", C: "" }
    },
    Load: function () {
        var me = User_Edit;
        try {
            Index.doSetLeftMenu("User");
            me.Datas.ID = hhls.getUrlParamByDefault("ID", "0");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) { ; }
    },
    Refresh: function () {
        var me = User_Edit;
        try {
            hhls.fillElement(".divMiddleMain", me.Tpls.tplUser_Edit.C);
            if (parseInt(me.Datas.ID) > 0) {
                var aRes = SysDatas.Datas.Users.Items[me.Datas.ID];
                $("#txtCode").val(aRes.F_Code);
                $("#txtCaption").val(aRes.F_Caption);
                $("#txtDesc").val(aRes.F_Desc);
                $("#txtPhone").val(aRes.F_Phone);
            }
        }
        catch (E) { ; }
    },
    doPost: function () {
        var me = User_Edit;
        try {
            if (me.Datas.ID == "0") {
                SysDatas.User.doCreate(
                    SysDatas.Datas.OrgInfo.F_ID,
                    $("#txtCode").val(),
                    $("#txtCaption").val(),
                    $("#txtDesc").val(),
                    "AppUser",
                    $("#txtPhone").val(),
                    function (aRes) {
                        if (aRes.State == 1) {
                            window.history.go(-1);
                        }
                        else {
                            alert("提交失败！");
                        }
                    });
            }
                else {
                    SysDatas.User.doEdit(
                        me.Datas.ID ,
                        $("#txtCode").val(),
                        $("#txtCaption").val(),
                        $("#txtDesc").val(),
                        "AppUser",
                        $("#txtPhone").val(),
                        function (aRes) {
                            if (aRes.State == 1) {
                                window.history.go(-1);
                            }
                            else {
                                alert("提交失败！");
                            }
                        }
                    );

            }
        }
        catch (E) { ; }
    }
}
