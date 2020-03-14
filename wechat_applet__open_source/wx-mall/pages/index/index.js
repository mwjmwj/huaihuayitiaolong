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
                "title": "商品分类",
                "summary": "/pages/catalog/catalog",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "switchTab",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/35/3570994c06e61b1f0cf719bdb52a0053.png",
                "villageid": null,
                "username": null
            },
            {
                "id": null,
                "title": "购物车",
                "summary": "/pages/cart/cart",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "switchTab",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/c2/c2b01cf78f79cbfba192d5896eeaecbe.png",
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
                "title": "用户中心",
                "summary": "/pages/ucenter/index/index",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "switchTab",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/46/46eabbff1e7dc5e416567fc45d4d5df3.png",
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
                "title": "我的收藏",
                "summary": "/pages/ucenter/collect/collect",
                "releasedate": null,
                "clickhit": null,
                "replyhit": null,
                "content": "navigate",
                "keyword": null,
                "state": null,
                "img": "http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/ca/cab6d8d4785e43bd46dcbb52ddf66f61.png",
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
    }

});