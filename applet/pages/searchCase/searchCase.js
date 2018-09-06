// pages/searchCase/searchCase.js

var Api = require("../../utils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"15061112861",
    hospital_number:"HD00123456",
    registration_number:"000123456",
    searchResult:[],
    noresult:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  searchInfo:function(){
    var aPs = {
      phone: this.data.phone,
      hospital_number: this.data.hospital_number,
      registration_number: this.data.registration_number
    }
    var that = this;
    Api.acGetData("acGetCase",aPs,function(res){
       if(res.datas.length>0){
         that.setData({
           searchResult: res.datas,
           noresult: true,
         });
       }else{
        that.setData({
          noresult: false,
          searchResult: []
        });
       }
    });
  },

  enterCaseInfo: function (event){
    let data = JSON.stringify(this.data.searchResult[event.currentTarget.dataset.id])
    wx.navigateTo({
      url: "../caseInfo/caseInfo?isChain=false&data=" + data
    });
  },
  bindHospitalChange: function (e) {
    this.setData({
      hospital_number: e.detail
    })
  },
  bindRegChange: function (e) {
    this.setData({
      registration_number: e.detail
    })
  },
  bindPhoneChange: function (e) {
    this.setData({
      phone: e.detail
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