//logs.js
const app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    phone:"",
    searchResult:[{
      name:"张长弓",
      from:"上海市第一医院"
  }, {
      name: "海明威",
      from: "北京市第一医院"
    }, {
      name: "黄慧",
      from: "深圳市第一医院"
    }],
    aCase:{}
  },
  onLoad: function (option) {
    this.setData({
      aCase:option.case
    })
  },
  bindPhoneChange:function(e){
    this.setData({
      phone:e.detail
    })
  },
  onSearch: function(e){
    
  },
  queryUser: function () {
    var that = this;
    app.globalData.user = wx.getStorageSync('user')
    var phone = this.data.phone;
    var fcn = this.data.value;
    var url = app.Datas.Url.fcn;
    var data = {
      peer: "peer0.org1.example.com",
      fcn: "queryUser", //"queryUser",queryAllShareCases,queryShareCases,queryCases,createCase,createShareCase,createUser,queryShareCaseByRandomNum
      args: [phone]
    }

    var token = app.globalData.user.token;
    app.acFcn(url, data, "GET", token, function (aRes) {
      var data = JSON.stringify(aRes);
      console.log(data);
      wx.setStorageSync('value', data)

      that.setData({
        value: data
      })

    })
  },
  doShare:function(){
    var that = this;
    var aeskeys = wx.getStorageSync('aes');
    var aCase = this.data.aCase;
    var url = app.Datas.Url.fcn;
    var data = {
      peer: "peer0.org1.example.com",
      fcn: "createShareCase", //"queryUser",queryAllShareCases,queryShareCases,queryCases,createCase,createShareCase,createUser,queryShareCaseByRandomNum
      args: [this.data.phone, aCase.phone, aCase.RandomNum, util.formatTime2(new Date()),
        aeskeys, aCase.code, aCase.caption, aCase.department]
    }

    console.log(data);

    var token = app.globalData.user.token;
    app.acFcn(url, data, "GET", token, function (aRes) {
      var data = JSON.stringify(aRes);
      console.log(data);
      wx.setStorageSync('value', data)

      that.setData({
        value: data
      })

    })
  },
})
