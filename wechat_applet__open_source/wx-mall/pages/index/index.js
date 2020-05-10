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
        xsList:[1,2],
        msTime: '23:59',
        countdown: '',
        countdownFlag: true,
        day:0,
        hou:0,
        min:0,
        sec:0,
        proList:[1,2,3,4],
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
        console.log('token:' + access_token);


        // if (!access_token)
        //     app.login();
        console.log('login-token:' + access_token);
        this.loadData(options);
        
    },

    /**
     * 加载页面数据
     */
    loadData: function (options) {
        var that = this;
        util.request(api.getCategoryGoods).then((res) => {
            console.log("res", res);
            that.setData({
                categoryGoods: res.data
            });
        });
        util.request(api.IndexUrlBanner).then(function (res) {
            console.log("resbanner", res);
            if (res.errno === 0) {
                that.setData({
                    banner: res.data.banner
                });
            }
        });
        this.countDownFun();
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
        var page = this;
        var user_info = wx.getStorageSync("user_info");
        return {
            path: "/pages/index/index?user_id=" + user_info.id,
            success: function (e) {
                share_count++;
                if (share_count == 1)
                    app.shareSendCoupon(page);
            }
        };
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