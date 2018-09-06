// pages/square/square.js
Page({
  data: {
    checkboxItems: [
      { name: '', value: '0', checked: false }

    ],
    topics: ["choose topic", "topic1", "topic2", "topic3"],
    topicIndex: 0,
    contentList: [
      {
        userIcon: '',
        txt: 'This is first content of Moments',
        image: '',
        userInfo: '123'
      },
      {
        userIcon: '',
        txt: 'This is second content of Moments',
        image: '',
        userInfo: '123'
      },


    ]
  },
  bindTopicChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      topicIndex: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  /*
  onLoad: function(){
    var that = this;
    that.netRequest('http://www.healercedar.cn:8080/WeChatApplet/GetAllVideoServlet', "", "POST", function (responseData) {
      console.log(responseData);
      that.setData({
        videoList:responseData
      });
    })
  },
 */
  /*****
* 发起网络请求
*/
  netRequest: function (url_input, data_input, method_input, callback) {
    wx.request({
      url: url_input, //仅为示例，并非真实的接口地址
      data: data_input,   ///data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data;
        typeof callback == "function" && callback(receiveData);
      }

    })

  },
});