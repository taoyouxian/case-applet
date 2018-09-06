//index.js
//获取应用实例
const app = getApp();
var QR = require("../../utils/qrcode.js");

Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    isDoctor: false,
    imagePath: '',
    caselen: false,
    Cases: [
      // {
      //   hospital: "浙江医科大学就诊病例",
      //   time: "2017-10-12",
      // },
      // {
      //   hospital: "北京医科大学就诊病例",
      //   time: "2016-10-12",
      // }, {
      //   hospital: "南方医科大学就诊病例",
      //   time: "2015-10-12",
      // }
    ]
  },
  //事件处理函数
  goToSearch: function () {
    wx.navigateTo({
      url: '../searchCase/searchCase'
    })
  },
  enterCaseInfo: function () {
    wx.navigateTo({
      url: '../caseInfo/caseInfo'
    })
  },
  enterSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  onLoad: function (option) {
    var flag = option.isDoctor == "false" ? false : true;
    this.setData({
      isDoctor: flag
    });

    app.globalData.user = wx.getStorageSync('user')
    app.globalData.user_chain = wx.getStorageSync('user_chain')
    // 秘钥
    app.globalData.rsakeys = wx.getStorageSync('rsa') || {}
    app.globalData.aeskeys = wx.getStorageSync('aes') || {}

    this.queryCases();
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小

    var aeskey = app.globalData.aeskeys.key
    var aesiv = app.globalData.aeskeys.iv
    var value = aeskey + "_" + aesiv + "_" + app.globalData.user.phone
    this.createQrCode(value, "mycanvas", size.w, size.h);
  },

  doScan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        //打印二维码中的内容
        console.log(res.result);
        wx.navigateTo({
          url: '../caseInfo/caseInfo'
        })
      }
    })
  },
  //   queryC: function () {
  // console.log(1)
  //   },
  queryCases: function () {
    wx.showLoading({ title: '病历信息获取中' });
    var that = this;
    var phone = app.globalData.user.phone;
    var url = app.Datas.Url.fcn;
    var data = {
      peer: "peer0.org1.example.com",
      fcn: "queryCases", //"queryUser",queryAllShareCases,queryShareCases,queryCases,createCase,createShareCase,createUser,queryShareCaseByRandomNum
      args: ["case_" + phone]
    }

    var token = app.globalData.user_chain.token;
    app.acFcn(url, data, "GET", token, function (aRes) {
      var data = JSON.stringify(aRes);
      console.log(data);
      wx.setStorageSync('cases', data)

      wx.hideLoading();
      that.setData({
        Cases: aRes
      })
      if (data.length > 0){
        that.setData({
          caselen: true
        })
      }

    })
  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (data, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(data, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 500);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          imagePath: tempFilePath,
          canvasHidden: true
        });

      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  }
})
