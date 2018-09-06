const app = getApp()


Page({
  enterIndex: function (event) {
    wx.reLaunch({ url: "../profile/profile?isDoctor=false" });
  },
  enterDoctor: function (event) {
    wx.reLaunch({ url: "../profile/profile?isDoctor=true" });
  },
  onLoad: function () {
    console.log(wx.getStorageSync('userDetail'))
  },

})