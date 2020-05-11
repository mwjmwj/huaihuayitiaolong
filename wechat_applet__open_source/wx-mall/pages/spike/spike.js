// pages/spike/spike.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    spikeList: [],
    page: 1,
    size: 10,
    loadmoreText: '正在加载更多数据',
    nomoreText: '全部加载完成',
    nomore: false,
    totalPages: 1,
    msTime: '23:59',
    countdown: '',
    countdownFlag: true,
    day:0,
    hou:0,
    min:0,
    sec:0,
    xsList:[1,2,3,4,5,6,7,8,9]
  },
  onShareAppMessage: function () {
    return {
      title: '秒杀更优惠',
      desc: '秒杀更优惠',
      path: 'pages/spike/spike'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.countDownFun();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
         * 页面上拉触底事件的处理函数
         */
  onReachBottom: function () {
    this.getSpikeList()
  },
  onPullDownRefresh() {
    // 增加下拉刷新数据的功能
    wx.showNavigationBarLoading();
    var self = this;
    self.setData({
      spikeList: [],
      page: 1,
      totalPages: 1
    });
    self.getSpikeList();
  },
  goDetail(e) {
    console.log("====:", e.target.dataset.id)
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '../goods/goods?id=' + id + '&type=2'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSpikeList()
  },
  getSpikeList() {
    let that = this;
    if (that.data.totalPages <= that.data.page - 1) {
      that.setData({
        nomore: true
      })
      return;
    }
    util.request(api.KillList, { page: that.data.page, size: that.data.size }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          spikeList: that.data.spikeList.concat(res.data.data),
          page: res.data.currentPage + 1,
          totalPages: res.data.totalPages
        });
        wx.hideLoading();
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
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

  },
  // 倒计时
  countDownFun:function(){
    var that=this;
    var nowTime = new Date();//现在时间（时间戳）
    var dateStr = nowTime.getFullYear()+"-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate() + " " + this.data.msTime;
    var endTime = new Date(dateStr);//结束时间（时间戳）

    var time = (endTime-nowTime)/1000;//距离结束的毫秒数
    // 获取天、时、分、秒
    let day = parseInt(time / (60 * 60 * 24));
    let hou = parseInt(time % (60 * 60 * 24) / 3600);
    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
    // console.log(day + "," + hou + "," + min + "," + sec)
    day = that.timeFormin(day),
    hou = that.timeFormin(hou),
    min = that.timeFormin(min),
    sec = that.timeFormin(sec)
    that.setData({
      day: that.timeFormat(day),
      hou: that.timeFormat(hou),
      min: that.timeFormat(min),
      sec: that.timeFormat(sec)
    })
    // 每1000ms刷新一次
    if (time>0){
      that.setData({
        countdownFlag: true
      })
      setTimeout(this.countDownFun, 1000);
    }else{
      that.setData({
        countdownFlag:false
      })
    }
  },
  //小于10的格式化函数（2变成02）
  timeFormat(param) {
    return param < 10 ? '0' + param : param;
  },
  //小于0的格式化函数（不会出现负数）
  timeFormin(param) {
    return param < 0 ? 0: param;
  }
})