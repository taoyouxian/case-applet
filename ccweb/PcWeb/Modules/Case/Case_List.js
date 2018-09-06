/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />
/// <reference path="../../Commons/Init.js" />

var Case_List = {
    Datas: {
        K0: "",
        ID: "0"
    },
    Tpls: {
        tplCase_List: { P: "Modules/Case/tplCase_List.htm", C: "" }
    },
    Load: function () {
        var me = Case_List;
        try {
            Index.doSetLeftMenu("Case");
            me.Datas.ID = hhls.getUrlParamByDefault("ID", "0");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) {; }
    },
    Refresh: function () {
        var me = Case_List;
        try {
            var aHtml = bt(me.Tpls.tplCase_List.C, { tplData: SysDatas.Datas.ECases });
            hhls.fillElement(".divMiddleMain", aHtml);
        }
        catch (E) {; }
    },
    contentRefresh: function (aInfo, aElement) {
        var me = Case_List;
        try {
            var aHtml = "";
            var num = 1;
            for (var i in aInfo) {
                aHtml += num + "." + aInfo[i].name;
                if (i < aInfo.length - 1) {
                    aHtml += ";"
                } else {
                }
                num++;
            }
            $("#" + aElement).val(aHtml);
        }
        catch (E) {; }
    },
    addContent: function (aIndex) {
        var me = Case_List;
        try {
            var aInfo = {};
            var name = "";
            if (aIndex == 0) {
                name = $("#ADname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.AD.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.AD, "AD");
            } else if (aIndex == 1) {
                name = $("#DDname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.DD.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.DD, "DD");
            } else if (aIndex == 2) {
                name = $("#ASname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.AS.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.AS, "AS");
            } else if (aIndex == 3) {
                name = $("#Hname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.H.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.H, "H");
            } else if (aIndex == 4) {
                name = $("#DSname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.DS.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.DS, "DS");
            } else if (aIndex == 5) {
                name = $("#DIname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.DI.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.DI, "DI");
            } else if (aIndex == 6) {
                name = $("#IEname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.IE.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.IE, "IE");
            } else if (aIndex == 7) {
                name = $("#LEname").val();
                aInfo.name = name;
                SysDatas.Datas.ECases.LE.push(aInfo);
                me.contentRefresh(SysDatas.Datas.ECases.LE, "LE");
            } else {
            }
        }
        catch (E) {; }
    },
    clearContent: function (aIndex) {
        var me = Case_List;
        try {
            if (aIndex == 0) {
                SysDatas.Datas.ECases.AD = [];
                me.contentRefresh(SysDatas.Datas.ECases.AD, "AD");
            } else if (aIndex == 1) {
                SysDatas.Datas.ECases.DD = [];
                me.contentRefresh(SysDatas.Datas.ECases.DD, "DD");
            } else if (aIndex == 2) {
                SysDatas.Datas.ECases.AS = [];
                me.contentRefresh(SysDatas.Datas.ECases.AS, "AS");
            } else if (aIndex == 3) {
                SysDatas.Datas.ECases.H = [];
                me.contentRefresh(SysDatas.Datas.ECases.H, "H");
            } else if (aIndex == 4) {
                SysDatas.Datas.ECases.DS = [];
                me.contentRefresh(SysDatas.Datas.ECases.DS, "DS");
            } else if (aIndex == 5) {
                SysDatas.Datas.ECases.DI = [];
                me.contentRefresh(SysDatas.Datas.ECases.DI, "DI");
            } else if (aIndex == 6) {
                SysDatas.Datas.ECases.IE = [];
                me.contentRefresh(SysDatas.Datas.ECases.IE, "IE");
            } else if (aIndex == 7) {
                SysDatas.Datas.ECases.LE = [];
                me.contentRefresh(SysDatas.Datas.ECases.LE, "LE");
            } else {
            }
        }
        catch (E) {; }
    },
    doPost: function () {
        var me = Case_List;
        try {
            Init.WebToast("数据保存中");
            if (me.Datas.ID == "0") {
                var aInfo = {
                    // user
                    name: $("#name").val(),
                    sex: $("#sex").val(),
                    birthday: $("#birthday").val(),
                    phone: $("#phone").val(),
                    idcard: $("#idcard").val(),
                    addr: $("#addr").val(),
                    medical_insurance_number: $("#medical_insurance_number").val(),
                    medical_insurance_type: $("#medical_insurance_type").val(),
                    presenter: $("#presenter").val(),
                    chief_complaint: $("#chief_complaint").val(),
                    allergy_history: $("#allergy_history").val(),
                    blood_transfusion_history: $("#blood_transfusion_history").val(),
                    current_medical_history: $("#current_medical_history").val(),
                    past_history: $("#past_history").val(),
                    personal_history: $("#personal_history").val(),
                    marriage_history: $("#marriage_history").val(),
                    family_history: $("#family_history").val(),
                    memo: $("#memo").val(),
                    // hospital
                    code: $("#code").val(),
                    caption: $("#caption").val(),
                    hospital_addr: $("#hospital_addr").val(),
                    hospital_number: $("#hospital_number").val(),
                    registration_number: $("#registration_number").val(),
                    department: $("#department").val(),
                    admission_time: $("#admission_time").val(),
                    discharge_time: $("#discharge_time").val(),
                    hospitalization_cycle: $("#hospitalization_cycle").val(),
                    //
                    AD: SysDatas.Datas.ECases.AD,
                    DD: SysDatas.Datas.ECases.DD,
                    AS: SysDatas.Datas.ECases.AS,
                    H: SysDatas.Datas.ECases.H,
                    DS: SysDatas.Datas.ECases.DS,
                    DI: SysDatas.Datas.ECases.DI,
                    IE: SysDatas.Datas.ECases.IE,
                    LE: SysDatas.Datas.ECases.LE,

                    //
                    publickey: ""
                //    SysDatas.Datas.ECases.User = User;
                //    SysDatas.Datas.ECases.Hospital = Hospital;
                };
                aInfo.randomnum = aInfo.hospital_number + "_" + aInfo.registration_number;
                Ac.acExecuteSql(SysDatas.Paths.Case.Post, aInfo, function (aRes) {
                    $(".web-toast_content").text("保存成功");
                    Init.ClearToast("#webToast", 1)
                    if (aRes.State == 0) {
                        alert("发生错误, 请联系管理员.")
                    }
                })
            }
            else {

            }
        }
        catch (E) {; }
    }
}
