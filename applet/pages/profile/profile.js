// pages/profile/profile.js

const util = require("../../utils/util.js");
const app = getApp()

var RSA = require('../../utils/wxapp_rsa.js')
var Encrypt = require('../../utils/jsencrypt.js')
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDoctor: null,
    userDetail: {
      birthday: "1985-01-01",
      region: ["广东省", "深圳市"],
      sex: 0,
    },
    errList: {
      name: "",
      IDNumber: "",
      phone: ""
    },
    sexArray: ["女", "男"],
    endDate: util.formatTime(new Date())
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.isDoctor = options.isDoctor == "false" ? false : true;
    // 秘钥
    var rsakeys = wx.getStorageSync('rsa') || {}
    var aeskeys = wx.getStorageSync('aes') || {}
    var userchain = wx.getStorageSync('user_chain') || {}
    if (rsakeys.pub == undefined) {
      var crypt = new Encrypt.JSEncrypt({ default_key_size: 1024 });
      crypt.getKey();
      var publicKey = crypt.getPublicKey();
      var privateKey = crypt.getPrivateKey();
      rsakeys.pub = publicKey;
      rsakeys.priv = privateKey;
      aeskeys.key = app.createNonceStr();
      aeskeys.iv = app.createNonceStr();

      wx.setStorageSync('rsa', rsakeys)
      wx.setStorageSync('aes', aeskeys)
    } else {
    }
    app.globalData.rsakeys = rsakeys
    app.globalData.aeskeys = aeskeys
    app.globalData.user_chain = userchain

    // var str = JSON.stringify(userchain);
    // if (str.toString().length > 10) {
    //   this.setData({
    //     userDetail: userchain || this.data.userDetail
    //   });
    //   //直接到首页
    //   wx.reLaunch({ url: "../index/index?isDoctor=false" });
    // }

  },
  bindNameChange: function (e) {
    this.setData({
      ["userDetail.realName"]: e.detail
    })
  },
  bindIDNumberChange: function (e) {
    this.setData({
      ["userDetail.IDNumber"]: e.detail
    })
  },
  bindPhoneChange: function (e) {
    this.setData({
      ["userDetail.phone"]: e.detail
    })
  },


  bindSexChange: function (e) {
    this.setData({
      ["userDetail.sex"]: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      ["userDetail.region"]: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      ["userDetail.birthday"]: e.detail.value
    })
  },
  saveInfo: function () {
    try {
      var userDetail = this.data.userDetail
      var i = 0;
      for (var p in userDetail) {
        if (userDetail[p].length < 1) {
          this.setData({
            ["errList." + p]: "请填写该项"
          });
          i++
        } else {
          this.setData({
            ["errList." + p]: ""
          });
        }
      }
      if (i > 0) {
        return;
      }
      var rsaKey = wx.getStorageSync('rsa');
      if (rsaKey == undefined) {
        wx.showToast({
          title: '系统错误,请重新打开小程序',
          icon: 'none',
          duration: 2000
        })
      }
      wx.showLoading({ title: '用户注册上链中' });
      var sexArray = ["女", "男"]
      //本地缓存一份
      wx.setStorageSync('user', this.data.userDetail);
      this.registerChainUser(this.data.isDoctor, function () {
        //提交到区块链中
        var data = {
          peers: ["peer0.org1.example.com", "peer1.org1.example.com"],
          fcn: "createUser",
          args: ["user_" + userDetail.phone, userDetail.region[0] + "-" + userDetail.region[1], rsaKey.pub, userDetail.realName, sexArray[userDetail.sex], userDetail.birthday, userDetail.IDNumber]
        }
        console.log(data);
        var url = app.Datas.Url.fcn;
        var token = app.globalData.user_chain.token;
        var that = this;
        wx.showLoading({ title: '数据保存中' });
        app.acFcn(url, data, "POST", token, function (aRes) {
          console.log(aRes);
          wx.hideLoading();
          if (aRes.indexOf("Error") >= 0) {
            wx.showToast({
              title: '保存失败',
              icon: 'false',
              duration: 2000,
              success: function () {
              }
            })
          }else{
            wx.setStorageSync('trxid', aRes)
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000,
              success: function () {
                //跳转到首页
                wx.reLaunch({ url: "../index/index?isDoctor=false" });
              }
            })
          }
        })
      })

    } catch (e) {

    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  registerChainUser: function (flag, callback) {
    var url = app.Datas.Url.register;
    var data = {
      username: this.data.userDetail.IDNumber,
      orgName: 'Org1',
    }
    var contentType = "application/x-www-form-urlencoded";
    app.acRegist(url, data, "POST", contentType, function (aRes) {
      app.globalData.user_chain = aRes
      console.log(aRes);
      app.globalData.user_chain.isDoctor = flag;
      wx.setStorageSync('user_chain', app.globalData.user_chain)
      typeof callback == "function" && callback();
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userDetail: wx.getStorageSync('userDetail') || this.data.userDetail
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})