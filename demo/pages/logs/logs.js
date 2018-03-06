//logs.js
const util = require('../../utils/util.js')
console.log(getApp());
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      user: getApp().globalData.userInfo
    })
  }
})
