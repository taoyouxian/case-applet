/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />
/// <reference path="../../Commons/Init.js" />

var Exam_List = {
    Datas: {
        K0: "",
        ID: "0",
        API: [
            { fcn: "queryAll", func: "富查询支持,可根据数据需要进行查询，用途最广", args: '{"selector":{"sharename":"赵然"}}', examples: '根据身份证号查询用户病历信息：{"selector":{"caseidcard":"350802199505294512"}}&#10;查询别人分享分享给自己的病历信息：{"selector":{"accept":"13713962176"}}' },
            { fcn: "queryInfo", func: "根据手机号查询历史数据", args: 'case_18754522441', examples: '病人查询根据手机号查询病历的历史记录：case_18754522441&#10;病人查询根据手机号查询已分享病历的历史记录：sharedcase_18754522441&#10;病人查询根据手机号查询自己的个人信息：user_18754522441' },
            { fcn: "queryShareCasesOwn", func: "根据手机号查询已分享的病历信息", args: 'sharedcase_18754522441, 15066971266', examples: '病人查询根据手机号查询已分享病历的历史记录：sharedcase_18754522441, 15066971266' },
        ],
        CreateAPI: [
            { fcn: "createUser", func: "创建用户", args: '15061126707,江苏常州,publickey,kate,女,1995-05-02,350802199505294511', examples: '（手机号、籍贯、公钥，姓名，性别，生日，身份证号）：&#10;15061126707,江苏常州,publickey,kate,女,1995-05-02,350802199505294511&#10;注：这里的pubkey 是客户端用公钥加密后的对称秘钥' },
            { fcn: "createCase", func: "创建病历", args: '15269983625,李非,350802199505293625,ox0129, 2018-3-29 10:20,ZJYD,浙江医科大学就诊病历,内科,#121', examples: '（手机号、姓名、身份证号，随机数，入院日期，病历号码，病历名称，科室，病历内容）：&#10;15269983625,李非,350802199505293625,ox0129, 2018-3-29 10:20,ZJYD,浙江医科大学就诊病历,内科,#121&#10;注：病历内容是在客户端通过将用户公钥进行对称加密所得到的密文，本质是加密的json字符串' },
            { fcn: "createShareCase", func: "创建分享病历", args: '15269983625,13713962176,0291,2018-3-29 10:20,ox0129,李松,KOKM,浙江医科大学就诊病历,内科', examples: '（分享对象手机号，分享者手机号，随机数，分享时间，秘钥，分享者姓名，分享码，病历名称，看病部门）：&#10;15269983625,13713962176,0291,2018-3-29 10:20,ox0129,李松,KOKM,浙江医科大学就诊病历,内科&#10; 注：此处的秘钥是用被分享者公钥加密后的对称秘钥' },
        ]
    },
    Tpls: {
        tplExam_List: { P: "Modules/Exam/tplExam_List.htm", C: "" }
    },
    Load: function () {
        var me = Exam_List;
        try {
            Index.doSetLeftMenu("Exam");
            me.Datas.ID = hhls.getUrlParamByDefault("ID", "0");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) {; }
    },
    Refresh: function () {
        var me = Exam_List;
        try {
            var aHtml = me.Tpls.tplExam_List.C;
            hhls.fillElement(".divMiddleMain", aHtml);
            me.doChangeAPI();
            me.doCreateAPI();
        }
        catch (E) {; }
    },
    doChangeAPI: function () {
        var me = Exam_List;
        try {
            var aFcn = $("#fcn").val();
            var aIndex = 0;
            if (aFcn == "queryAll") {

            } else if (aFcn == "queryInfo") {
                aIndex = 1;
            } else if (aFcn == "queryShareCasesOwn") {
                aIndex = 2;
            }
            me.doQueryAPI(aIndex);
        }
        catch (E) {; }
    },
    doQueryAPI: function (aIndex) {
        var me = Exam_List;
        try {
            var aInfo = me.Datas.API[aIndex];
            $("#func").val(aInfo.func);
            hhls.fillElement("#examples", aInfo.examples);
            $("#args").val(aInfo.args);
        }
        catch (E) {; }
    },
    doCreateAPI: function () {
        var me = Exam_List;
        try {
            var aFcn = $("#fcn_c").val();
            var aIndex = 0;
            if (aFcn == "createUser") {

            } else if (aFcn == "createCase") {
                aIndex = 1;
            } else if (aFcn == "createShareCase") {
                aIndex = 2;
            }

            var aInfo = me.Datas.CreateAPI[aIndex];
            $("#func_c").val(aInfo.func);
            hhls.fillElement("#examples_c", aInfo.examples);
            $("#args_c").val(aInfo.args);
            $("#fcn").val("queryAll");
            me.doQueryAPI(0);
        }
        catch (E) {; }
    },
    doPost: function (aIndex) {
        var me = Exam_List;
        try {
            if (aIndex == 0) {
                var aData = {
                    phone: $("#phone").val(),
                    hospital_number: $("#hospital_number").val(),
                    registration_number: $("#registration_number").val()
                };
                var aUrl = Init.Url.acGetCase;
                Ac.acGetData(aUrl, aData, "GET", function (aRes) {
                    var result = "";
                    if (aRes.state == 1 && aRes.datas.length > 2) {
                        result = JSON.stringify(aRes.datas[0], null, 2);
                    } else {
                        result = JSON.stringify(aRes, null, 2);
                    }
                    $("#out_hospital").text(result);
                })
            } else if (aIndex == 1) {
                var aData = {
                    fcn: $("#fcn").val(),
                    args: $("#args").val(),
                };
                var aUrl = Init.Url.acPostCase;
                //var aUrl = "http://localhost:2020/doFcn";
                Ac.acGetData(aUrl, aData, "GET", function (aRes) {
                    var result = "";
                    if (aRes.state == 1 && aRes.datas.length > 0) {
                        var aInfo = JSON.parse(aRes.datas);
                        result = JSON.stringify(JSON.parse(aRes.datas), null, 2);
                    } else {
                        result = JSON.stringify(aRes, null, 2);
                    }
                    $("#out_bass").text(result);
                })
            }
            else if (aIndex == 2) {
                var aData = {
                    fcn: $("#fcn_c").val(),
                    args: $("#args_c").val(),
                };
                var aUrl = Init.Url.acPostCase;
                //var aUrl = "http://localhost:2020/doFcn";
                Ac.acGetData(aUrl, aData, "GET", function (aRes) {
                    var result = "";
                    if (aRes.state == 1 && aRes.datas.length > 0) {
                        var aInfo = JSON.parse(aRes.datas);
                        result = JSON.stringify(JSON.parse(aRes.datas), null, 2);
                    } else {
                        result = JSON.stringify(aRes, null, 2);
                    }
                    $("#out_bass_c").text(result);
                })
            }
        }
        catch (E) {; }
    },
    doClear: function (aIndex) {
        var me = Exam_List;
        try {
            if (aIndex == 0) {
                $("#out_hospital").text("");
            } else if (aIndex == 1) {
                $("#out_bass").text("");
            }
            else if (aIndex == 2) {
                $("#out_bass_c").text("");
            }
        }
        catch (E) {; }
    },
}
