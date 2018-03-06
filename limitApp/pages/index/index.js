//index.js
//加载百度地图模块
var bmap = require('../../libs/bmap/bmap-wx.min.js');
var wxMarkerData = [];
//获取应用实例
const app = getApp()

Page({
  data: {
    markers: [],
    city: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    _tab: 0,
    scrollTop: 0,
    list: [1,2,3,4,5,6,7,8,9],
    dd: '',
    hidden: true,
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //导航切换
  changeTab: function(event){
    if (!this.data.city && event.target.dataset.tab == 2){
      console.log('为获取到城市');
    }else{
      console.log(this.data.city);
    }
    console.log(event.target.dataset.tab);
  this.setData({
    _tab: event.target.dataset.tab,
    list: [1,2,3,4,5,6,7,8,9],
    scrollTop: 0
  })
  },
  onShareAppMessage: function () {
    console.log("点击分享");
  }, 
  onPullDownRefresh: function(e){
    console.log(e,'onPullDownRefresh');
  },
  //加载更多数据
  getMore: function(e){
    var that = this;
    that.setData({
      hasRefesh: true,
      hidden: false
    });
   setTimeout(function(){
     that.setData({
       list: that.data.list.concat([1, 2, 3, 4, 5, 6]),
       hidden: true
     })
   }, 1000);
  },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'j72bq9yajn27HUP1tFMwCu9EyPcsmLGl'
    });
    var fail = function (data) {
      BMap.regeocoding({
        fail: fail,
        success: success
      })
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      console.log(data);
      that.setData({
        markers: wxMarkerData,
        city: data.originalData.result.addressComponent.city
      });
    } 
    BMap.regeocoding({
      fail: fail,
      success: success
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
