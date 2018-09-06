// pages/caseInfo/caseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"李木子",
    caseInfo:[],
    isChain:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(JSON.parse(options.data))
    this.setData({
      caseInfo: JSON.parse(options.data),
      isChain: options.isChain
    });
  },
  doChain:function(){
    var caseInfo = this.data.caseInfo;
    var data = {
      peers: ["peer0.org1.example.com", "peer1.org1.example.com"],
      fcn: "createCase",
      args: [caseInfo.phone, caseInfo.name, caseInfo.idcard, caseInfo.randomnum,
        caseInfo.admission_time, caseInfo.code, caseInfo.caption, caseInfo.department, JSON.stringify(caseInfo)]
    }
    //调用上链方法

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