/// <reference path="../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../Libs/sdk/json.js" />
/// <reference path="../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../Libs/sdk/date.js" />
/// <reference path="../../Libs/sdk/hhls.js" />
/// <reference path="../../Libs/sdk/hhac.js" />

var Init = {
    //数据
    Datas: {
        TomcatUrl: "http://localhost:6174/",
    },
    //sql语句的路径
    Path: {

    },
    // 请求的url
    Url: {
        acGetCase: "http://case.merchain.cn:2019/acGetCase",
        acPostCase: "http://47.107.42.181:2020/doFcn",
    },
    //web弹出框样式
    Utility: {
        WebToast: "<div id=\"webToast\">"
                    + "<div class=\"web_transparent\"></div>"
                    + "<div class=\"web-toast\">"
                        + "<div class=\"sk-spinner sk-spinner-three-bounce\">"
                            + "<div class=\"sk-bounce1\"></div>"
                            + "<div class=\"sk-bounce2\"></div>"
                            + "<div class=\"sk-bounce3\"></div>"
                        + "</div>"
                        + "<p class=\"web-toast_content\">数据加载中</p>"
                    + "</div>"
                + "</div>",
    },
    //Toast Style
    Utility: {
        WxToast: "<div id=\"wxToast\">"
                    + "<div class=\"wx_transparent\"></div>"
                    + "<div class=\"wx-toast\">"
                        + "<div class=\"sk-spinner sk-spinner-three-bounce\">"
                            + "<div class=\"sk-bounce1\"></div>"
                            + "<div class=\"sk-bounce2\"></div>"
                            + "<div class=\"sk-bounce3\"></div>"
                        + "</div>"
                        + "<p class=\"wx-toast_content\">数据加载中</p>"
                    + "</div>"
                + "</div>",
        WebToast: "<div id=\"webToast\">"
                    + "<div class=\"web_transparent\"></div>"
                    + "<div class=\"web-toast\">"
                        + "<div class=\"sk-spinner sk-spinner-three-bounce\">"
                            + "<div class=\"sk-bounce1\"></div>"
                            + "<div class=\"sk-bounce2\"></div>"
                            + "<div class=\"sk-bounce3\"></div>"
                        + "</div>"
                        + "<p class=\"web-toast_content\">数据加载中</p>"
                    + "</div>"
                + "</div>",
        Loading: "<div class='ibox'><div class='ibox-content'><div class='sk-spinner sk-spinner-three-bounce'><div class='sk-bounce1'></div><div class='sk-bounce2'></div><div class='sk-bounce3'></div></div></div></div>",
    },
    //web Toast
    WebToast: function (aContent) {
        var me = Init;
        try {
            $("body").append(me.Utility.WebToast);
            var w = $(window).width();
            var aW = $(".web-toast").width();
            var left = (w - aW) / 2;
            $(".web-toast").css("left", left + "px");
            $(".web-toast_content").text(aContent);
        }
        catch (e) {; }
    },
    WxToast: function (aContent) {
        var me = Init;
        try {
            $("body").append(me.Utility.WxToast);
            var w = $(window).width();
            var aW = $(".wx-toast").width();
            var left = (w - aW) / 2;
            $(".wx-toast").css("left", left + "px");
            $(".wx-toast_content").text(aContent);
        }
        catch (e) {; }
    },
    //Toast
    Web_Toast: function (aContent, aTimeOut) {
        var me = Init;
        try {
            me.WebToast(aContent);
            me.ClearToast("#webToast", aTimeOut);
        }
        catch (e) {; }
    },
    Wx_Toast: function (aContent, aTimeOut) {
        var me = Init;
        try {
            me.WxToast(aContent);
            me.ClearToast("#wxToast", aTimeOut);
        }
        catch (e) {; }
    },
    //clear Toast, set time
    ClearToast: function (aElement, aTimeOut) {
        var me = Init;
        try {
            setTimeout(function () {
                $(aElement).remove();
            }, aTimeOut * 1000);
        }
        catch (e) {; }
    },
    //load Pciture
    LoadWxImg: function () {
        var me = Init;
        try {
            var aImgs = $(".WxImg");
            $.each(aImgs, function (aInd, aItem) {
                try {
                    var aImg = $(aItem);
                    var aKey = aImg.attr("Key");
                    if (aKey.length > 0) {
                        var aUrl = me.Datas.TomcatUrl + aKey + ".jpg";
                        aImg.attr("src", aUrl);
                    }
                }
                catch (ee) {; }
            });
        }
        catch (e) {; }
    },
    //load Pciture
    LoadWxImg: function (aSelector) {
        var me = Init;
        try {
            var aImgs = $(aSelector);
            $.each(aImgs, function (aInd, aItem) {
                try {
                    var aImg = $(aItem);
                    var aKey = aImg.attr("Key");
                    if (aKey.length > 0) {
                        var aUrl = me.Datas.TomcatUrl + aKey;
                        aImg.attr("src", aUrl);
                    }
                }
                catch (ee) {; }
            });
        }
        catch (e) {; }
    },
    doPlayVoice: function (aId) {
        var me = Init;
        try {
            var aDlg = $("#dlgPlayMp3").unbind("shown.bs.modal").bind("shown.bs.modal", function () {
                try {
                    var aUrl = me.Datas.MediaPath + Common.Config.DataSvc.WxSrc + "/" + aId + ".mp3";
                    var aHtml = '<audio controls="controls" autoplay="autoplay" style="width:100%"><source src="' + aUrl + '" type="audio/mpeg" />Your browser does not support the audio element.</audio>';
                    hhls.fillElement("#divPlayer", aHtml);
                } catch (e) {; }
            }).unbind("hidden.bs.modal").bind("hidden.bs.modal", function () {
                try {
                    hhls.clearElement("#divPlayer");
                } catch (e) {; }
            }).modal("show");
        }
        catch (e) {; }
    }

}

var SysDatas = {
    Datas: {
        LoginKey: "",
        OrgInfo: {},
        Cases: {
            Info: {},
            Items: []
        },
        ECases: { // 18
            User: {
                name: "李四",
                    sex: "男",
                    birthday: "1965-08-03",
                    phone: "15061112861",
                    idcard: "340521199501013311",
                    addr: "北京市海淀",
                    medical_insurance_number: "0001234",
                    medical_insurance_type: "城镇职工基本医疗保险",
                    presenter: "患者妻子 可靠",
                    chief_complaint: "患者1.5 h﹢前因摔伤倒头痛、呕吐，意识障碍",
                    allergy_history: "青霉素过敏",
                    blood_transfusion_history: "无",
                    current_medical_history: "患者约1.5h+洗澡时摔倒，伴有头痛、呕吐多次为内容物、伴有意识下降、左侧肢体乏力；我院急救车接诊，现场患者倒地、意识不清，我院急诊头颅CT提示右侧额叶、颞叶、顶叶脑出血并破入左侧脑室、第三脑室；轻度大脑镰下疝、复查头颅CTA提示：结合CTA：右侧额叶、颞叶、顶叶AVM脑出血并破入左侧脑室、第三脑室。少量蛛网膜下腔出血；轻度大脑镰下疝。为进一步治疗，以“头部外伤、右侧额叶、颞叶、顶叶AVM并脑出血”收治我科，发病以来，持续意识下降，小便正常。",
                    past_history: "患者为慢性阻塞性肺疾病患者，曾多次入院治疗。既往有“冠心病（心脏扩大、陈旧性心肌梗塞、心律失常）、前列腺增生，骨质疏松、肺大泡、慢性支气管炎、陈旧性脑梗死灶”，否认手术室、青霉素过敏、否认输血史、否认传染病、糖尿病，预防接种史不详。",
                    personal_history: "嗜烟 1包/天，嗜酒",
                    marriage_history: "已婚，1子1女",
                    family_history: "父母均有高血压、父亲曾是“哮喘患者”",
                    memo: "暂无",
            }, // 9
            Hospital: { code: "HDXX",
                        caption: "北京海淀XX医院",
                        hospital_addr: "北京海淀中关村大街XX号",
                        hospital_number: "HD00123456",
                        registration_number: "000123456",
                        department: "神经外科",
                        admission_time: "2016-03-01 14:25",
                        discharge_time: "2016-03-28 15:57",
                        hospitalization_cycle: "4周",
            },// 8
            AD: [{ name: "脑内出血" },
                { name: "大脑血管动静脉畸形" },
                { name: "头部损伤" },
                { name: "慢性阻塞性肺疾病缓解期" },
                { name: "冠心病（心脏扩大、陈旧性心肌梗塞、心律失常）" },
                { name: "前列腺增生" },
                { name: "骨质疏松" },
                { name: "肺大泡" },
                { name: "慢性支气管炎" },
                { name: "陈旧性脑梗死灶" }, ],
            DD: [{ name: "脑内出血" },
                { name: "大脑血管动静脉畸形" },
                { name: "头部损伤" },
                { name: "慢性阻塞性肺疾病缓解期" },
                { name: "冠心病（心脏扩大、陈旧性心肌梗塞、心律失常）" },
                { name: "前列腺增生" },
                { name: "骨质疏松" },
                { name: "肺大泡" },
                { name: "慢性支气管炎" },
                { name: "陈旧性脑梗死灶" }, ],
            AS: [{ name: "查体：神志昏睡，GCS10分、双侧瞳孔不等大、右侧7mm，反射消失；左侧2mm，反射迟钝，右侧肢体肌力5级，左侧肢体肌力2级。口唇发绀、桶状胸，双肺叩诊过清音、听诊呼吸音低、可闻及细小湿罗音，余瓣膜听诊区未闻及病理性杂音、腹软、无压痛、反跳痛、双肾无叩痛。" }],
            H: [{ name: "入院后安排相关检查，排除手术禁忌症后于2016-03-01全麻下行“经右颞叶入路，右颞顶部AVM切除术及血肿清除术切除术”，术后予以头孢呋辛抗感染、甲强龙抗炎、甘露醇脱水、辅以祛痰护胃、补充能量及电解质、加强监护等治疗。术后复查：头部螺旋CT检查所见：1.右侧颞叶动静脉畸形切除术后改变、术后脑肿胀、左额颞顶部硬脑膜下少量鸡血、积液、气，右侧侧脑室、第三脑室少量积血、大脑镰下疝。建议复查CTA。脑脊液常规：白细胞总数32*10E6/L.2016-3-28 脑脊液常规131*10E6/L。予以哌拉西林钠他唑巴坦钠，利奈唑胺注射液抗感染。" }],
                DS: [{ name: "目前整体尚可，无发热，食、睡眠可，无特殊不适，查体：神清、精神可，安静面容。双侧瞳孔等大等圆，直接间接对光反射灵敏，四肢肌力、肌张力可，病理征未引出，颈软，脑膜刺激征阴性。口唇发绀、桶状胸，双肺叩诊过清音、听诊呼吸音低、可闻及细小湿罗音，余瓣膜听诊区未闻及病理性杂音、腹软、无压痛、反跳痛、双肾无叩痛。患者目前病情稳定，允许转院进行继续康复治疗，请指示上级医师后予以办理，嘱其相关出院后注意事项后予以出院。" }],
                DI: [{ name: "注意休息，加强营养，营养均衡，不适随诊" },
                { name: "定期复查，3个月后我科复诊" }, 
                { name: "出院带药：甲钴胺片 po 500ug 每日3次，复方丹参滴丸 po 10粒 每日3次" }, ],
                IE: [{ name: "CT: 正常" }, { name: "X: 正常" }, { name: "MRI: 正常" }, { name: "HRCT: 正常" }, { name: "钡餐造影: 正常" }, ],
                LE: [{ name: "血常规: 正常" }, { name: "尿常规: 正常" }, { name: "OT: 正常" }, ],
                AdmissionDiagnosis: [
                ],
                DischargeDiagnosis: [
                ],
                AdmissionSituation: [
                ],
                Hospitalization: [
                ],
                DischargeSituation: [
                ],
                DischargeInstructions: [
                ],
                ImagingExamination: [
                ],
                LabExamination: [
                ],
        },
        Users: {
            Info: {},
            Items: [{
                "F_ID": 1,
                "F_Code": "001",
                "F_Phone": "15061112861",
                "F_Caption": "张三",
                "F_Desc": "市第一医院"
            }, {
                "F_ID": 2,
                "F_Code": "002",
                "F_Phone": "15061112862",
                "F_Caption": "陶四",
                "F_Desc": "市第二医院"
            }, {
                "F_ID": 3,
                "F_Code": "003",
                "F_Phone": "15061112863",
                "F_Caption": "胡二",
                "F_Desc": "市第三医院"
            }, {
                "F_ID": 4,
                "F_Code": "004",
                "F_Phone": "15061112864",
                "F_Caption": "赵月",
                "F_Desc": "市人民医院"
            }, {
                "F_ID": 5,
                "F_Code": "005",
                "F_Phone": "15061112865",
                "F_Caption": "吴英",
                "F_Desc": "市综合医院"
            }]
        },
        Chanels: {
            Info: {},
            Items: [{
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-20",
                "F_StateCaption": "关闭",
                "F_ID": 1,
                "F_Code": "qweqwe",
                "F_Caption": "asda",
                "F_Desc": "asdasd",
                "F_CreateTime": "2017-01-20T16:47:23.967",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-20",
                "F_StateCaption": "关闭",
                "F_ID": 3,
                "F_Code": "324234",
                "F_Caption": "sadfsdf",
                "F_Desc": "sdafdsfw3",
                "F_CreateTime": "2017-01-20T16:53:00.37",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-21",
                "F_StateCaption": "关闭",
                "F_ID": 4,
                "F_Code": "dffd",
                "F_Caption": "reer",
                "F_Desc": "dfffd",
                "F_CreateTime": "2017-01-21T10:32:04.4",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-21",
                "F_StateCaption": "关闭",
                "F_ID": 5,
                "F_Code": "ssw2w",
                "F_Caption": "xxx",
                "F_Desc": "weeddee",
                "F_CreateTime": "2017-01-21T10:32:49.12",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-21",
                "F_StateCaption": "关闭",
                "F_ID": 7,
                "F_Code": "2sssx",
                "F_Caption": "ccdd",
                "F_Desc": " cxxxzx",
                "F_CreateTime": "2017-01-21T10:33:35.887",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-21",
                "F_StateCaption": "关闭",
                "F_ID": 8,
                "F_Code": "asdasd",
                "F_Caption": "wqeqweqwe",
                "F_Desc": "我们可以用CSS语法来控制超链接的形式、颜色变化，为什么链接一定要使用下划线和颜色区分呢？ 其主要原因主要是考虑到   1、视力差的人 2、色盲的人 。。。\n\n下面我们做一个这样的链接：未被点击时超链接文字无下划线，显示为蓝色；当鼠标在链接上时有下划线，链接文字显示为红色；当点击链接后，链接无下划线，显示为绿色",
                "F_CreateTime": "2017-01-21T10:55:38.513",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-21",
                "F_StateCaption": "关闭",
                "F_ID": 9,
                "F_Code": "12312",
                "F_Caption": "awewq",
                "F_Desc": "qweqwe",
                "F_CreateTime": "2017-01-21T11:03:55.77",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }, {
                "F_OrgCode": "hhuc-sport",
                "F_OrgCaption": "河海体育",
                "F_MasUserCode": "chenp",
                "F_MasUserCaption": "陈鹏",
                "F_CreateDay": "2017-01-21",
                "F_StateCaption": "关闭",
                "F_ID": 12,
                "F_Code": "12",
                "F_Caption": "12",
                "F_Desc": "12",
                "F_CreateTime": "2017-01-21T11:19:21.437",
                "F_OrgID": 1,
                "F_ChanelTypeCode": "AppChanel",
                "F_State": 0,
                "F_OpenTime": 0,
                "F_CloseTime": 0,
                "F_MasUserID": 1
            }]
        },
    },
    Paths: {
        Case: {
            Post: "Case/Post.txt"
        },
        Users: {
            GetList: "User/GetList.txt",
            GetInfo: "User/GetInfo.txt",
            Create: "User/Create.txt",
            Edit: "User/Edit.txt",
            Delete: "User/Delete.txt"
        },
    }
}