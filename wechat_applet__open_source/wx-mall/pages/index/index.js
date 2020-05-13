const util = require('../../utils/util.js');
const api = require('../../config/api.js');

var app = getApp();
var share_count = 0;
Page({
    data: {
        x: wx.getSystemInfoSync().windowWidth,
        y: wx.getSystemInfoSync().windowHeight,
        background: 'rgba(0,0,0,0)',
        colorCss: "",
        categoryGoods: {},
        banner: [],
        msTime: '23:59',
        countdown: '',
        countdownFlag: true,
        day:0,
        hou:0,
        min:0,
        sec:0,
        newGoods:[],
        skill:[],
        page: 1,
        size: 10,
        loadmoreText: '正在加载更多数据',
        nomoreText: '全部加载完成',
        nomore: false,
        totalPages: 1,
        "nav_icon_list": [{
                "id": null,
                "title": "我的足迹",
                "summary": "/pages/ucenter/footprint/footprint",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "navigate",
                "keyword": null,
                "state": null,
                "img": "../../static/images/zuji.png",
                "villageid": null,
                "username": null
            },
            {
                "id": null,
                "title": "我的订单",
                "summary": "/pages/ucenter/order/order?id=-1",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "navigate",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/7c/7c80acbbd479b099566cc6c3d34fbcb8.png",
                "villageid": null,
                "username": null
            },
            {
                "id": null,
                "title": "优惠劵",
                "summary": "/pages/ucenter/coupon/coupon",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "navigate",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/13/13312a6d56c202330f8c282d8cf84ada.png",
                "villageid": null,
                "username": null
            },
            {
                "id": null,
                "title": "售后订单",
                "summary": "/pages/ucenter/return/return?id=201",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "navigate",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/cf/cfb32a65d845b4e9a9778020ed2ccac6.png",
                "villageid": null,
                "username": null
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var access_token = wx.getStorageSync("access_token");
        this.loadData(options);
        
    },
    /**
     * 加载页面数据
     */
    loadData: function (options) {
        var that = this;
        this.getIndexData();
        //暂时首页不显示倒计时
        //this.countDownFun();
    },
    onPullDownRefresh() {
        // 增加下拉刷新数据的功能
        var self = this;
        self.getIndexData();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom(){
        this.getGoodsList();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        share_count = 0;
        var store = wx.getStorageSync("store");
        if (store && store.name) {
            wx.setNavigationBarTitle({
                title: store.name,
            });
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (options) {
        var that = this;
        var user_info = wx.getStorageSync("user_info");
        var obj = {};
        if(options.from == 'button'){
            let index = options.target.dataset.index;
            let goods = that.data.skill[index];
            obj = {
                title: goods.name,
                imageUrl: goods.list_pic_url,
                path: 'pages/goods/goods?id=' + goods.id + '&userId=' + user_info.id
              }
        }else{
            obj = {
                path: "/pages/index/index?user_id=" + user_info.id,
                success: function (e) {
                    share_count++;
                    if (share_count == 1)
                        app.shareSendCoupon(that);
                }
            };
        }
        
        return obj;
    },
    onPageScroll(e) {
        let opciaty = e.scrollTop / 130;
        let colorCss = "";
        if (opciaty >= 1) {
            opciaty = 1;
            colorCss = "con";
        } else if (opciaty <= 0) {
            opciaty = 0;
            colorCss = "";
        }
        this.setData({
            background: `rgba(255,255,255,${opciaty})`,
            colorCss: colorCss
        });
    },
    toSearch: function () {
        wx.navigateTo({
            url: '/pages/search/search'
        });
    },
    getIndexData: function () {
        let that = this;
        var data = new Object();
        util.request(api.IndexUrlNewGoods).then(function (res) {
          if (res.errno === 0) {
            //that.setData(data);
            that.setData({
                newGoods: res.data.goodsList,
                page: res.data.currentPage+1,
                totalPages: res.data.totalPages
              });
          }
        });
        //秒杀产品
        util.request(api.KillList,{page: 1,size:3}).then(function (res) {
          if (res.errno === 0) {
            data.skill = res.data.data;
            that.setData(data); 
          }
        });

        util.request(api.IndexUrlBanner).then(function (res) {
            if (res.errno === 0) {
                that.setData({
                    banner: res.data.banner
                });
            }
        });

      },
      getGoodsList: function () {
        var that = this;
    
        if (that.data.totalPages <= that.data.page-1) {
          that.setData({
            nomore: true
          })
          return;
        }
    
        util.request(api.IndexUrlNewGoods, {page: that.data.page, size: that.data.size})
          .then(function (res) {
                that.setData({
                newGoods: that.data.newGoods.concat(res.data.goodsList),
                page: res.data.currentPage+1,
                totalPages: res.data.totalPages
                });
          });
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

});