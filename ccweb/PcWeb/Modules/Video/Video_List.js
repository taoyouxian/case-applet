/// <reference path="../../../Libs/sdk/jQuery-2.1.3.min.js" />
/// <reference path="../../../Libs/sdk/baiduTpls.js" />
/// <reference path="../../../Libs/sdk/date.js" />
/// <reference path="../../../Libs/sdk/hhls.js" />
/// <reference path="../../../Libs/sdk/hhac.js" />
/// <reference path="../../../Libs/sdk/json.js" />
/// <reference path="../../../Libs/sdk/hhls_wxConfirm.js" />
/// <reference path="../Index/Index.js" />
/// <reference path="../../Commons/Init.js" />

var Video_List = {
    Datas: {
        K0: "",
        ID: "0"
    },
    Tpls: {
        tplVideo_List: { P: "Modules/Video/tplVideo_List.htm", C: "" }
    },
    Load: function () {
        var me = Video_List;
        try {
            Index.doSetLeftMenu("Video");
            me.Datas.ID = hhls.getUrlParamByDefault("ID", "0");
            hhls.GetTpls(me.Tpls, function () {
                me.Refresh();
            });
        }
        catch (E) {; }
    },
    Refresh: function () {
        var me = Video_List;
        try {
            var aHtml = me.Tpls.tplVideo_List.C;
            hhls.fillElement(".divMiddleMain", aHtml);
            
            var aW = $(".divForms").width();
            var aMinW = parseInt(aW).toString() + "px";
            $("#divVideo").css("width", aMinW);
            var aMinH = aMinW * 9 / 5 + "px";
            $("#divVideo").css("height", aMinH);
        }
        catch (E) {; }
    },
}
