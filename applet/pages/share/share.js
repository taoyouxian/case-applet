// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Cases: [{
      hospital: "浙江医科大学就诊病例",
      time: "2017-10-12",
    },
    {
      hospital: "北京医科大学就诊病例",
      time: "2016-10-12",
    }, {
      hospital: "南方医科大学就诊病例",
      time: "2015-10-12",
    }],
    Cases2: [{
      hospital: "福州医科大学就诊病例",
      time: "2017-10-12",
    },
    {
      hospital: "上海医科大学就诊病例",
      time: "2016-10-12",
    }, {
      hospital: "天津医科大学就诊病例",
      time: "2015-10-12",
    }],
    isMyShare: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  doSwitch:function(){
    this.setData({
      isMyShare: !this.data.isMyShare
    })
  },
  enterCaseInfo:function(){
    wx.navigateTo({
      url: '../caseInfo/caseInfo'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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