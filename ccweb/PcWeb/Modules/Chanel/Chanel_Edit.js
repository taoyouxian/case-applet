/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />

var Chanel_Edit = {
    Datas: {
        K0: "",
        ID: "0"
    },
    Tpls: {
        tplChanel_Edit: { P: "Modules/Chanel/tplChanel_Edit.htm", C: "" }
    },
    Load: function () {
        var me = Chanel_Edit;
        try {
            Index.doSetLeftMenu("Chanel");
            me.Datas.ID = hhls.getUrlParamByDefault("ID", "0");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) { ; }
    },
    Refresh: function () {
        var me = Chanel_Edit;
        try {
            hhls.fillElement(".divMiddleMain", me.Tpls.tplChanel_Edit.C);
            if (parseInt(me.Datas.ID) > 0) {
                var aRes = SysDatas.Datas.Chanels.Items[me.Datas.ID];
                $("#txtCode").val(aRes.F_Code);
                $("#txtCaption").val(aRes.F_Caption);
                $("#txtDesc").val(aRes.F_Desc);
                $("#cmbMasUserID").val(aRes.F_MasUserID);
            }
        }
        catch (E) { ; }
    },
    doPost: function () {
        var me = Chanel_Edit;
        try {
            if (me.Datas.ID == "0") {
                SysDatas.Chanel.doCreate(
                    SysDatas.Datas.OrgInfo.F_ID,
                    $("#txtCode").val(),
                    $("#txtCaption").val(),
                    $("#txtDesc").val(),
                    "AppChanel",
                    $("#cmbMasUserID").val(),
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
                    SysDatas.Chanel.doEdit(
                        me.Datas.ID ,
                        $("#txtCode").val(),
                        $("#txtCaption").val(),
                        $("#txtDesc").val(),
                        "AppChanel",
                        $("#cmbMasUserID").val(),
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
