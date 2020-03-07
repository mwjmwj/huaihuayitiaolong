
var app = getApp();
var share_count = 0;
Page({
    data: {
        x: wx.getSystemInfoSync().windowWidth,
        y: wx.getSystemInfoSync().windowHeight,
        background: 'rgba(0,0,0,0)',
        colorCss: ""
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
        var page = this;
        var parent_id = 0;
        var user_id = options.user_id;
        var scene = decodeURIComponent(options.scene);
        if (user_id != undefined) {
            parent_id = user_id;
        } else if (scene != undefined) {
            parent_id = scene;
        }
        app.loginBindParent({
            parent_id: parent_id
        });
    },

    /**
     * 加载页面数据
     */
    loadData: function (options) {
        var page = this;
        /** */
        let str ={"msg":"success","code":200,"data":{
            "module_list":[{"id":null,"title":"banner","summary":null,"releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"search","summary":null,"releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"nav","summary":null,"releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"cat","summary":null,"releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"coupon","summary":null,"releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"topic","summary":null,"releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"block","summary":"4","releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"block","summary":"3","releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null},
            {"id":null,"title":"block","summary":"5","releasedate":null,"clickhit":null,"replyhit":null,"content":null,"keyword":null,"state":null,"img":null,"villageid":null,"username":null}],
            "banner_list":[{"id":12,"name":"电影推荐广告","type":2,"pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20181113/movie_ad.jpg","startTime":1541001600000,"endTime":1542988800000,"status":1,"clickCount":0,"orderCount":0,"url":"www.baidu.com","note":"电影推荐广告","sort":100},
            {"id":13,"name":"汽车促销广告","type":2,"pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20181113/car_ad.jpg","startTime":1542038400000,"endTime":1542988800000,"status":1,"clickCount":0,"orderCount":0,"url":"xxx","note":null,"sort":99},
            {"id":14,"name":"汽车推荐广告","type":2,"pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20181113/car_ad2.jpg","startTime":1542038400000,"endTime":1543507200000,"status":1,"clickCount":0,"orderCount":0,"url":"xxx","note":null,"sort":98}],
            "nav_icon_list":[{"id":null,"title":"我的公告","summary":"/pages/topic-list/topic-list","releasedate":null,"clickhit":null,"replyhit":null,"content":"navigate","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/86/863a7db352a936743faf8edd5162bb5c.png","villageid":null,"username":null},
            {"id":null,"title":"商品分类","summary":"/pages/cat/cat","releasedate":null,"clickhit":null,"replyhit":null,"content":"switchTab","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/35/3570994c06e61b1f0cf719bdb52a0053.png","villageid":null,"username":null},
            {"id":null,"title":"购物车","summary":"/pages/cart/cart","releasedate":null,"clickhit":null,"replyhit":null,"content":"switchTab","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/c2/c2b01cf78f79cbfba192d5896eeaecbe.png","villageid":null,"username":null},
            {"id":null,"title":"我的订单","summary":"/pages/order/order?status=9","releasedate":null,"clickhit":null,"replyhit":null,"content":"navigate","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/7c/7c80acbbd479b099566cc6c3d34fbcb8.png","villageid":null,"username":null},
            {"id":null,"title":"用户中心","summary":"/pages/user/user","releasedate":null,"clickhit":null,"replyhit":null,"content":"switchTab","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/46/46eabbff1e7dc5e416567fc45d4d5df3.png","villageid":null,"username":null},
            {"id":null,"title":"优惠劵","summary":"/pages/coupon/coupon?status=0","releasedate":null,"clickhit":null,"replyhit":null,"content":"navigate","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/13/13312a6d56c202330f8c282d8cf84ada.png","villageid":null,"username":null},
            {"id":null,"title":"我的收藏","summary":"/pages/favorite/favorite","releasedate":null,"clickhit":null,"replyhit":null,"content":"navigate","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/ca/cab6d8d4785e43bd46dcbb52ddf66f61.png","villageid":null,"username":null},
            {"id":null,"title":"售后订单","summary":"/pages/order/order?status=4","releasedate":null,"clickhit":null,"replyhit":null,"content":"navigate","keyword":null,"state":null,"img":"http://www.91weiyi.xyz/addons/zjhj_mall/core/web/uploads/image/cf/cfb32a65d845b4e9a9778020ed2ccac6.png","villageid":null,"username":null}],
            "cat_list":[{"id":1,"name":"服装-T恤","attributeCount":2,"paramCount":5,"goodsList":[{"id":37,"supplyId":null,"brandId":5,"productCategoryId":7,"feightTemplateId":0,"productAttributeCategoryId":1,"name":"测试衣服","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b235bb9Nf606460b.jpg","productSn":"1234","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":1,"sale":0,"price":11.00,"promotionPrice":44.00,"giftGrowth":2,"giftPoint":2,"usePointLimit":22,"subTitle":"测试衣服","originalPrice":12.00,"stock":222,"lowStock":0,"unit":"剑","weight":12.00,"previewStatus":0,"serviceIds":"3","keywords":"缺钱","note":"缺钱","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5b235bb9Nf606460b.jpg","detailTitle":"测试商品详细","promotionStartTime":1550160000000,"promotionEndTime":1551283200000,"promotionPerLimit":0,"promotionType":1,"brandName":"方太","productCategoryName":"外套","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000},
            {"id":30,"supplyId":null,"brandId":50,"productCategoryId":8,"feightTemplateId":0,"productAttributeCategoryId":1,"name":"HLA海澜之家简约动物印花短袖T恤","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ad83a4fN6ff67ecd.jpg!cc_350x449.jpg","productSn":"HNTBJ2E042A","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":0,"sale":0,"price":98.00,"promotionPrice":null,"giftGrowth":0,"giftPoint":0,"usePointLimit":0,"subTitle":"2018夏季新品微弹舒适新款短T男生 6月6日-6月20日，满300减30，参与互动赢百元礼券，立即分享赢大奖","originalPrice":98.00,"stock":100,"lowStock":0,"unit":"","weight":0.00,"previewStatus":0,"serviceIds":"","keywords":"","note":"","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ad83a4fN6ff67ecd.jpg!cc_350x449.jpg","detailTitle":"","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":0,"brandName":"海澜之家","productCategoryName":"T恤","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000},
            {"id":31,"supplyId":null,"brandId":50,"productCategoryId":8,"feightTemplateId":0,"productAttributeCategoryId":1,"name":"HLA海澜之家蓝灰花纹圆领针织布短袖T恤","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ac98b64N70acd82f.jpg!cc_350x449.jpg","productSn":"HNTBJ2E080A","deleteStatus":0,"publishStatus":1,"newStatus":0,"recommandStatus":0,"verifyStatus":0,"sort":0,"sale":0,"price":98.00,"promotionPrice":null,"giftGrowth":0,"giftPoint":0,"usePointLimit":0,"subTitle":"2018夏季新品短袖T恤男HNTBJ2E080A 蓝灰花纹80 175/92A/L80A 蓝灰花纹80 175/92A/L","originalPrice":98.00,"stock":100,"lowStock":0,"unit":"","weight":0.00,"previewStatus":0,"serviceIds":"","keywords":"","note":"","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5ac98b64N70acd82f.jpg!cc_350x449.jpg","detailTitle":"","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":0,"brandName":"海澜之家","productCategoryName":"T恤","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000},
            {"id":23,"supplyId":null,"brandId":6,"productCategoryId":19,"feightTemplateId":0,"productAttributeCategoryId":1,"name":"毛衫测试","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180604/1522738681.jpg","productSn":"NO.1098","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":0,"sale":0,"price":99.00,"promotionPrice":null,"giftGrowth":99,"giftPoint":99,"usePointLimit":1000,"subTitle":"毛衫测试11","originalPrice":109.00,"stock":100,"lowStock":0,"unit":"件","weight":1000.00,"previewStatus":1,"serviceIds":"1,2,3","keywords":"毛衫测试","note":"毛衫测试","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180604/1522738681.jpg,http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180604/1522738681.jpg","detailTitle":"毛衫测试","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":2,"brandName":"小米","productCategoryName":"手机通讯","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000}]},
            
            {"id":2,"name":"服装-裤装","attributeCount":2,"paramCount":4,"goodsList":[]},
            {"id":3,"name":"手机数码-手机通讯","attributeCount":2,"paramCount":4,"goodsList":[{"id":28,"supplyId":null,"brandId":6,"productCategoryId":19,"feightTemplateId":0,"productAttributeCategoryId":3,"name":"小米 红米5A 全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg","productSn":"7437789","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":0,"sale":0,"price":649.00,"promotionPrice":null,"giftGrowth":649,"giftPoint":649,"usePointLimit":0,"subTitle":"8天超长待机，137g轻巧机身，高通骁龙处理器小米6X低至1299，点击抢购","originalPrice":649.00,"stock":100,"lowStock":0,"unit":"","weight":0.00,"previewStatus":0,"serviceIds":"","keywords":"","note":"","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg","detailTitle":"","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":4,"brandName":"小米","productCategoryName":"手机通讯","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000},{"id":40,"supplyId":null,"brandId":6,"productCategoryId":19,"feightTemplateId":0,"productAttributeCategoryId":3,"name":"小米 notneed","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg","productSn":"7437789","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":0,"sale":0,"price":649.00,"promotionPrice":null,"giftGrowth":649,"giftPoint":649,"usePointLimit":0,"subTitle":"8天超长待机，137g轻巧机身，高通骁龙处理器小米6X低至1299，点击抢购","originalPrice":649.00,"stock":100,"lowStock":0,"unit":"","weight":0.00,"previewStatus":0,"serviceIds":"","keywords":"","note":"","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg","detailTitle":"","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":4,"brandName":"小米","productCategoryName":"手机通讯","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000},{"id":27,"supplyId":null,"brandId":6,"productCategoryId":19,"feightTemplateId":0,"productAttributeCategoryId":3,"name":"小米8 全面屏游戏智能手机 6GB+64GB 黑色 全网通4G 双卡双待","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg","productSn":"7437788","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":0,"sale":0,"price":2699.00,"promotionPrice":null,"giftGrowth":2699,"giftPoint":2699,"usePointLimit":0,"subTitle":"骁龙845处理器，红外人脸解锁，AI变焦双摄，AI语音助手小米6X低至1299，点击抢购","originalPrice":2699.00,"stock":100,"lowStock":0,"unit":"","weight":0.00,"previewStatus":0,"serviceIds":"","keywords":"","note":"","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg","detailTitle":"","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":3,"brandName":"小米","productCategoryName":"手机通讯","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000},{"id":39,"supplyId":null,"brandId":6,"productCategoryId":19,"feightTemplateId":0,"productAttributeCategoryId":3,"name":"小米8 全面notneed0 ","pic":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg","productSn":"7437788","deleteStatus":0,"publishStatus":1,"newStatus":1,"recommandStatus":1,"verifyStatus":0,"sort":0,"sale":0,"price":2699.00,"promotionPrice":null,"giftGrowth":2699,"giftPoint":2699,"usePointLimit":0,"subTitle":"骁龙845处理器，红外人脸解锁，AI变焦双摄，AI语音助手小米6X低至1299，点击抢购","originalPrice":2699.00,"stock":100,"lowStock":0,"unit":"","weight":0.00,"previewStatus":0,"serviceIds":"","keywords":"","note":"","albumPics":"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/xiaomi.jpg","detailTitle":"","promotionStartTime":null,"promotionEndTime":null,"promotionPerLimit":0,"promotionType":3,"brandName":"小米","productCategoryName":"手机通讯","description":null,"detailDesc":null,"detailHtml":null,"detailMobileHtml":null,"type":0,"createTime":1553688225000}]},
            {"id":4,"name":"配件","attributeCount":0,"paramCount":0,"goodsList":[]},
            {"id":5,"name":"居家","attributeCount":0,"paramCount":0,"goodsList":[]},
            {"id":6,"name":"洗护","attributeCount":0,"paramCount":0,"goodsList":[]}],
            "cat_goods_cols":2,"block_list":null,"coupon_list":[],"subjectList":[{"id":1,"categoryId":1,"title":"轮廓分明，双摄手机映现细腻美照","pic":"https://img10.360buyimg.com/mobilecms/s1500x600_jfs/t26434/217/1381240043/254214/290f9d5b/5bc6c11cN54567a27.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1541914015000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"手机对于拍照党来说，已经不仅仅是通讯工具那么简单了。因为有时TA还充当着“单反”的角色，来不断地带给那些喜欢拍照的人惊喜。所以，在这里准备一波高颜值的双摄手机来给大家。让TA们灵敏捕捉影像的能力，为你展现出轮廓更加分明、且画质更加细腻的美照。","showStatus":1,"forwardCount":null,"categoryName":"精选专题","is_favorite":0,"content":null},{"id":2,"categoryId":1,"title":"交通拥挤有妙招，电动车小巧穿行无障碍","pic":"https://img11.360buyimg.com/mobilecms/s1500x600_jfs/t14224/229/529700229/74868/a1cc7364/5a314f85N5bfd22c7.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1542000420000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"随着人们消费水平的提高，公路上的小车是越来越多了，导致每到上下班高峰期的时候，大路的车辆堵了一环又一环，而且你根本不知道它到底会塞多久，所以我们需要变通一下，不妨骑上电动车来个绿色出行，它够小巧玲珑，即使交通再怎么拥挤，也总有它可以通过的地方。","showStatus":1,"forwardCount":null,"categoryName":"精选专题","is_favorite":0,"content":null},{"id":3,"categoryId":1,"title":"无酒不成席，甘香白酒开怀助兴","pic":"https://img12.360buyimg.com/mobilecms/s1500x600_jfs/t1/881/4/12265/114011/5bd1446fEc71114bf/68925bfb4a2adc44.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1542086825000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"白酒是由各种优质的高粱，小麦，大米等谷物为原料，经过传统工艺的长时间酿造，酒液在这样的环境中慢慢发酵，最终变成清香浓郁的白酒，被摆上人们的餐桌，供人畅饮，是一种受到大众喜爱的绝佳饮品。","showStatus":1,"forwardCount":null,"categoryName":"精选专题","is_favorite":0,"content":null},{"id":4,"categoryId":2,"title":"真规划不盲扫，全域清洁净无尘","pic":"https://img10.360buyimg.com/mobilecms/s1500x600_jfs/t15205/35/2539924281/429185/72fa7857/5aab2c4bN6a32a6c5.png","productCount":null,"recommendStatus":1,"createTime":1541050029000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"科技时代，聪明女人会选择用智慧来减负，和繁琐的家务挥手再见，才能腾出更多休闲时间。规划式扫地机器人设计个性化，它能够跟据房间布置呈现清扫路线，实现规划式覆盖性清洁，少遗漏不盲扫，从而大幅度降低损耗，侦测技术遇到家具及时避让，杜绝猛烈撞击，任它灵巧穿梭于低矮空间，坐享居家净无尘。","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":5,"categoryId":2,"title":"抑菌更纯净，直饮净水保家人健康","pic":"https://img11.360buyimg.com/mobilecms/s1500x600_jfs/t11428/340/1504074828/20474/1e8cab1e/5a0305d3Nb1e7a762.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1541482038000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"在城里居住，首先要担心的是饮水问题。桶装水太贵不够经济，还不一定是干净的。自己去干净的水源地取水也不切实际。此时只有选择在家里安装一台净水器才实在。装上一台直饮式的净水器，方便安全，关键是水质过滤得比较纯净，很大限度地处理了大部分的废弃物，留下健康的矿物质水。好生活，从一口干净的纯净水开始。","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":6,"categoryId":2,"title":"储鲜冷冻灵活变，多门无霜更贴心","pic":"https://img12.360buyimg.com/mobilecms/s1500x600_jfs/t13015/356/2397552584/605232/46c88e6e/5a5321bcN6a8866f0.png","productCount":null,"recommendStatus":1,"createTime":1541568441000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"春节临近，每个家庭都要储备不少食材，但各种食材的保鲜方式与温度不尽相同，而多门风冷冰箱能轻松满足您。它们容积大占地小，拥有多个可以独立调节温度的温区，满足对不同类食材的存放需求，同时省去除霜烦恼，还可以通过温度调节满足您对大冷藏及大冷冻的需求变化，从而带来更好的保鲜冷冻体验，为新年宴请保驾护航。","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":7,"categoryId":2,"title":"想喝健康水，就用304不锈钢热水壶","pic":"https://img13.360buyimg.com/mobilecms/s1500x600_jfs/t12541/90/443985343/33603/65d6e884/5a0bb77aNff08550a.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548732115000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"大冬天的喝一口热水，不仅能够暧身还可以给身体补充足够的水份，但是对于热水壶的购买却是需要慎之又慎，材质不好的热水壶在烧水的过程当中极容易产生对身体不利的有害物，极大影响人们的身体健康。304不锈钢热水壶选用食品级不不锈钢，确保水质安全，烧水健康好水，为您的饮水健康保驾护航。","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":8,"categoryId":2,"title":"你尽情赖床！早餐“煲”在它身上","pic":"https://img14.360buyimg.com/mobilecms/s1500x600_jfs/t15949/363/1450937723/89513/7d8c1219/5a531d28N2aaec2a6.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548738433000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"赖床不想起，饿了的时候想吃饭又要现做等待简直饥肠辘辘让人心烦，所以一款带有预约功能的电饭煲简直不要太贴心，你睡懒觉的时候它已经给你做好了香滑软糯的粥，起床就能享美味是不是很贴心呐。","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":9,"categoryId":2,"title":"小白变大厨，微波炉为实力加持","pic":"https://img10.360buyimg.com/mobilecms/s1500x600_jfs/t1/8774/21/11460/38908/5c2cbfcfEdab1ef03/d5800f0f7cf05b38.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548738498000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"对于厨艺小白而言，没有什么能比掌握好火候更来得困难的了！毕竟烹饪出食物的味道好坏，很大程度上还是对火候的掌控，想要轻松掌握火候，当然少不了一款微波炉的撑场，内设多功能，满足不同的烹饪需求，简单方便易操作，让厨艺小白秒变大师！","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":10,"categoryId":2,"title":"十秒鲜榨，冬日把爱浓缩成杯果汁","pic":"https://img11.360buyimg.com/mobilecms/s1500x600_jfs/t13708/126/308291722/542847/26ee6edd/5a07dc72N3252a9e0.png","productCount":null,"recommendStatus":1,"createTime":1548738602000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"寒瑟冬日女友不喜欢吃水果，用便携迷你果汁机，撩妹又养胃。一按一转，碾压切割，简单快速制作，压榨出纯原味果汁。一键启动，十秒出汁，保留食物营养，轻轻松松粉碎食物，营养在手，说走就走。","showStatus":1,"forwardCount":null,"categoryName":"家电专题","is_favorite":0,"content":null},{"id":11,"categoryId":3,"title":"饭点未到肚已空？美味饼干先充饥","pic":"https://img10.360buyimg.com/mobilecms/s1500x600_jfs/t13240/79/443357432/38567/94792c4c/5a0ba054N89388654.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548738645000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"一上午都把精力集中在工作中，刚闲下来就发现自己已是饥肠辘辘了，可饭点却还没到，怎么办呢？不妨让这些美味饼干先帮你充充饥吧！酥香松脆有营养，每一口都让人回味无穷，既能满足你挑剔的味蕾又能起到果腹效果，快快为自己备上吧！","showStatus":1,"forwardCount":null,"categoryName":"美食专题","is_favorite":0,"content":null},{"id":12,"categoryId":3,"title":"赖床无罪，香酥面包营养又便捷","pic":"https://img11.360buyimg.com/mobilecms/s1500x600_jfs/t9775/33/1197239610/38547/34899011/59ddbd01N0bd693bb.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548738701000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"赖床是很多年轻人的通病，特别是秋冬季节，都会恋恋不舍温暖的被窝。对于苦逼的上班族来说，就算再多睡几分钟，还是要起床的，甚至来不及吃早餐。面包营养丰富，能快速饱腹，且携带方便，再搭配一盒牛奶，一顿简单而不失营养的早餐能提供一天的能量，让赖床族多睡几分钟也无妨。","showStatus":1,"forwardCount":null,"categoryName":"美食专题","is_favorite":0,"content":null},{"id":13,"categoryId":3,"title":"夹心饼干，予多重滋味交织舌尖","pic":"https://img12.360buyimg.com/mobilecms/s1500x600_jfs/t18877/139/652452758/27262/36e6ed6e/5a9d5b6dN327150e8.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548738758000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"饼干味道香脆可口，深受不少人的青睐。饼干的种类多样，而夹心饼干就是其中一种，相比普通饼干而言，夹心饼干有着更丰富的口感，当肚子空空如也的时候，来一些美味的夹心饼干，既能解馋，又能扛饿。下面就为大家推荐一组好吃的夹心饼干，作为办公室小零食非常不错。","showStatus":1,"forwardCount":null,"categoryName":"美食专题","is_favorite":0,"content":null},{"id":14,"categoryId":4,"title":"户外Party，便携音箱烘气氛","pic":"https://img10.360buyimg.com/mobilecms/s1500x600_jfs/t17125/265/644948348/42066/6f2dc610/5a9c9da1N9a95ee2c.jpg!q70.jpg","productCount":null,"recommendStatus":1,"createTime":1548738833000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"初春的季节，除了户外的各种踏青旅行，在户外开异常Party也是很惬意。户外派对，气氛的烘托肯定不能离开音箱的衬托，选择一款户外的便携音箱，无线蓝牙连接，免去有线的束缚，携带使用更方便。","showStatus":1,"forwardCount":null,"categoryName":"数码专题","is_favorite":0,"content":null},{"id":15,"categoryId":5,"title":"今冬潮包look，凹出绚丽女王范","pic":"https://img10.360buyimg.com/mobilecms/s1500x600_jfs/t8365/191/1901440450/575969/c71560c9/59c3144dNe6d8dd2f.png","productCount":null,"recommendStatus":1,"createTime":1548738912000,"collectCount":100,"readCount":1000,"commentCount":100,"albumPics":null,"description":"潮流时尚的美包，搭配潮服，会让你魅力一直在线。因为潮包一直是女性出游扮美的秘籍，它不仅能够帮你收纳日常小物件，还能让你解放双手，这里推荐的时尚美包，随意搭配一件服饰，都可以让你潮范十足，凹出绚丽女王范。","showStatus":1,"forwardCount":null,"categoryName":"服饰专题","is_favorite":0,"content":null},{"id":16,"categoryId":1,"title":"1","pic":"1","productCount":1,"recommendStatus":1,"createTime":0,"collectCount":1,"readCount":1,"commentCount":1,"albumPics":"1","description":"1","showStatus":1,"forwardCount":1,"categoryName":"1","is_favorite":0,"content":null}]}}
            
        //let obj = JSON.parse(str);
        page.setData(str.data);
        return;
        app.request({
            url: 'api.default.index', //请求首页数据
            success: function (res) {
                if (res.code == 200) {
                    page.setData(res.data);
                }
            },
            complete: function () {
                wx.stopPullDownRefresh();
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.loadData();
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
    receive: function (e) {
        var page = this;
        var id = e.target.dataset.index;
        wx.showLoading({
            mask: true,
        });
        if (!page.hideGetCoupon) {
            page.hideGetCoupon = function (e) {
                var url = e.currentTarget.dataset.url || false;
                page.setData({
                    get_coupon_list: null,
                });
                if (url) {
                    wx.navigateTo({
                        url: url,
                    });
                }
            };
        }
        app.request({
            url: '', 
            data: {
                id: id
            },
            success: function (res) {
                wx.hideLoading();
                if (res.code == 200) {
                    page.setData({
                        get_coupon_list: res.data.list,
                        coupon_list: res.data.coupon_list
                    });
                } else {
                    wx.showToast({
                        title: '已领取',
                        duration: 2000
                    })
                    page.setData({
                        coupon_list: res.data.coupon_list
                    });
                }
            },
            // complete: function () {
            //   wx.hideLoading();
            // }
        });
    },

    navigatorClick: function (e) {
        var page = this;
        var open_type = e.currentTarget.dataset.open_type;
        var url = e.currentTarget.dataset.url;
        if (open_type != 'wxapp')
            return true;
        //console.log(url);
        url = parseQueryString(url);
        url.path = url.path ? decodeURIComponent(url.path) : "";
        console.log("Open New App");
        wx.navigateToMiniProgram({
            appId: url.appId,
            path: url.path,
            complete: function (e) {
                console.log(e);
            }
        });
        return false;

        function parseQueryString(url) {
            var reg_url = /^[^\?]+\?([\w\W]+)$/,
                reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
                arr_url = reg_url.exec(url),
                ret = {};
            if (arr_url && arr_url[1]) {
                var str_para = arr_url[1],
                    result;
                while ((result = reg_para.exec(str_para)) != null) {
                    ret[result[1]] = result[2];
                }
            }
            return ret;
        }
    },
    closeCouponBox: function (e) {
        this.setData({
            get_coupon_list: ""
        });
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
    toSearch: function(){
        wx.navigateTo({
            //url: '/pages/search/search'
            url: '/pages/index1/index'
          });
    }

});