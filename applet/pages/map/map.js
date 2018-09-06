var QQMapWX = require('../../common/qqmap-wx-jssdk.js');
var qqmapsdk;
var locName = '';
Page({
  data: {
    markerId:0,
    markers:[{
       iconPath: "../../images/map_mark.png",
       id: 1001,
       latitude: 35.97029817,//给一个默认的经纬度
       longitude: 110.85278506,
       width: 35,
       height: 35,
       title:'这是我的标记',
       callout:{
         content:'123',
         color:'#000',
         fontSize: 14,
         padding: 5,
         display:'ALWAYS'
       }
     }]
  },
  markerEventHandle(e){
    console.log(e);
    this.setData({
      markerId: e.markerId
    })
    
  },

  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'XWUBZ-5A4CO-LX2WK-SSC6Q-DBJ27-BBB5I'
    });

    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {

        var latitude = res.latitude
        var longitude = res.longitude
        console.log("纬度：",latitude)
        that.setData({
          lat: latitude,//显示到前端界面的text值
          lng: longitude,
          'markers[0].latitude':latitude, //将定位到的经纬度赋给地图
          'markers[0].longitude': longitude
        });
        //腾讯地图API 逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            //console.log(res);
            getApp().globalData.cityname = res.result.address_component.city;   //全局变量存放城市   res.result.address_component.city 获取解析之后地址中的城市 33             
            console.log(res);
            locName = res.result.formatted_addresses.recommend;
            that.setData({ 
              'markers[0].callout.content': res.result.formatted_addresses.recommend,
            });
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
        
      }
    })
    
  },
  btnChooseLocation:function(){//选择其他位置
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        locName = res.name;
        that.setData({
          lat: res.latitude,
          lng: res.longitude,
          'markers[0].latitude': res.latitude, //将定位到的经纬度赋给地图
          'markers[0].longitude': res.longitude,
          'markers[0].callout.content': res.name
        });
      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },
  userThisLocation: function () {
    var that = this;
    getApp().globalData.loc = locName;
    console.log(getApp().globalData.loc);
    wx.navigateTo({
      url: '../release/release',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      } 
    })
  }
  
  })