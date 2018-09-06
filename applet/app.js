
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    var userchain = wx.getStorageSync('user_chain') || {};
    this.globalData.user_chain = userchain
    // var userInfo = wx.getStorageSync('userInfo') || {};

    var str = JSON.stringify(userchain);
    if (str.toString().length > 10) {
      if (userchain.isDoctor == true) {
        wx.reLaunch({ url: "./pages/index/index?isDoctor=true" });
      } else if (userchain.isDoctor == false) {
        wx.reLaunch({ url: "./pages/index/index?isDoctor=false" });
      } else if (userchain.isDoctor == undefined) {
        console.info("Begin to get openId")
      }
    }
    // if ((!wxuser.openid || (wxuser.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // var d = that.globalData;//这里存储了appid、secret、token串  
          // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          // wx.request({
          //   url: l,
          //   data: {},
          //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          //   // header: {}, // 设置请求的 header  
          //   success: function (res) {
          //     var obj = {};
          //     obj.openid = res.data.openid;
          //     obj.expires_in = Date.now() + res.data.expires_in;
          //     console.log(obj);
          //     wx.setStorageSync('user_wx', obj);//存储openid  
          //   },
          //   error: function (res) {
          //     console.log("error: " + res.data);
          //     wx.setStorageSync('error', res.data);
          //   }
          // });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

    // }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.showToast({
            title: '已经授权',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.redirectTo({
            url: '../index/index'
          })
        } else {
          // wx.showToast({
          //   title: '未授权',
          //   icon: 'false',
          //   duration: 1000,
          //   mask: true
          // })
        }
      }
    })
  },
  onShow: function () {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  globalData: {
    g_isMusicPlayed: false,
    g_currentMusicIndex: null,
    userInfo: null,
    openId: null,
    chain: {},
    tag: null,
    appid: 'wx47e35011af6002e5',
    secret: 'bf53c02963c9ed868943f11e85b3f496',
    user_wx: null,
    user_chain: null,
  },
  getUserInfo: function (cb) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          const app = getApp()
          app.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(app.globalData.userInfo)
        }
      })
    }
  },


  // 加密
  encrypt: function (word, KEY, IV) {
    var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
    var eb = Crypto.charenc.UTF8.stringToBytes(word);
    var kb = Crypto.charenc.UTF8.stringToBytes(KEY);//KEY "1234567812345678"
    var vb = Crypto.charenc.UTF8.stringToBytes(IV);//IV "8765432187654321"
    var ub = Crypto.AES.encrypt(eb, kb, { iv: vb, mode: mode, asBpytes: true });
    return ub;
  },
  // 解密：
  decrypt: function (word, KEY, IV) {
    var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
    var eb = Crypto.util.base64ToBytes(word);
    var kb = Crypto.charenc.UTF8.stringToBytes(KEY);//KEY "1234567812345678"
    var vb = Crypto.charenc.UTF8.stringToBytes(IV);//IV "8765432187654321"
    var ub = Crypto.AES.decrypt(eb, kb, { asBpytes: true, mode: mode, iv: vb });
    return ub;
  },
  createNonceStr: function () {
    return Math.random().toString().substr(2, 16)
  },


  /**
   * 数据
   */
  Datas: {
    // reqUrl: "https://mini.merchain.cn/",
    reqUrl: "",
    /**
    * sql语句的路径
    */
    Path: {
    },
    /**
     * 请求的url
     */
    Url: {
      register: "http://10.77.40.27:4000/users",
      fcn: "http://10.77.40.27:4000/channels/mychannel/chaincodes/mycc",
    },
  },
  /**
   * 发起网络请求
   */
  acHttp: function (url_input, path_input, data_input, method_input, callback) {
    var aUrl = this.Datas.reqUrl + url_input
    var aData = {
      Path: path_input,
      Ps: data_input,
    }
    wx.request({
      url: aUrl, //仅为示例，并非真实的接口地址
      data: aData,   //data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data
        typeof callback == "function" && callback(receiveData);
      }
    })
  },
  acHttpGet: function (url_input, data_input, header_input, method_input, callback) {
    var aUrl = this.Datas.reqUrl + url_input
    wx.request({
      url: aUrl, //仅为示例，并非真实的接口地址
      data: data_input,   //data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      header: header_input,
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data
        typeof callback == "function" && callback(receiveData);
      }
    })
  },
  /**
   * 发起blockchain请求
   */
  acRegist: function (url_input, data_input, method_input, contentType_input, callback) {
    wx.request({
      url: url_input, //仅为示例，并非真实的接口地址
      data: data_input,   //data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      contentType: contentType_input,
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data
        typeof callback == "function" && callback(receiveData);
      }
    })
  },
  acFcn: function (url_input, data_input, method_input, token, callback) {
    wx.request({
      url: url_input, //仅为示例，并非真实的接口地址
      data: data_input,   //data:::{ x: '', y: '' };;最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      method: method_input,    //默认GET
      header: {
        'content-type': 'application/json', // 默认值
        'authorization': "Bearer " + token
      },
      success: function (res) {
        //console.log(res.data)
        var receiveData = res.data
        typeof callback == "function" && callback(receiveData);
      }
    })
  },
})