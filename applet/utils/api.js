
var  requestUrl = "http://case.merchain.cn:2019/"

function acGetData (aAction, aPs,cb) {
  var aUrl = requestUrl;
  aUrl += aAction;
  aUrl += requestUrl.indexOf("?") > 0 ? "&" : "?";
  for (var i in aPs) {
    aUrl += "&" + i + "=" + aPs[i];
  }
  wx.request({
    url: aUrl,
    data: '',
    header: {},
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      typeof cb == "function" && cb(res.data)
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

function print() {
  console.log("a")
}

module.exports = {
  acGetData: acGetData,
  print: print,
}
