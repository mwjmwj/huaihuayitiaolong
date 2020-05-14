package com.platform.task;

import com.platform.service.SysOssService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.MessageDigest;

/**
 * 测试定时任务(演示Demo，可删除)
 * <p>
 * testTask为spring bean的名称
 *
 * @author lipengjun
 * @email 939961241@qq.com
 * @date 2016年11月30日 下午1:34:24
 */
@Component("testTask")
public class TestTask {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private SysOssService sysOssService;

    public void test(String params) {
        logger.info("我是带参数的test方法，正在被执行，参数为：" + params);
    }

    public void test2() {
        logger.info("我是不带参数的test2方法，正在被执行");
    }

    public static void main(String[] args) {
        //992 0202
//			String url = "http://www.bigchengs.cn/open/hfbapi/recharge?";
//			String str = "merchant_id=10000&order_number=888107055168&" +
//					"pay_amount=1016&time=5522541&pay_channel=0202" +
//					"&notify_url=http://www.xx.com&api_key=10f4a5534852475da415c1eec12bbfbc";
////        String url = "http://127.0.0.1:8888/open/hfbapi/recharge?";
////        String str = "merchant_id=10000&order_number=888107017&" +
////                "pay_amount=500&time=5522541&pay_channel=0202" +
////                "&notify_url=http://www.xx.com&api_key=10f4a5534852475da415c1eec12bbfbc";
//
//        String sign = md5(str);
//
//        System.out.println(url+str+"&sign="+sign);
//        System.out.println(get(1000000000));
//        System.out.println(fibonacia(1000000000));
//        System.out.println(C(1000000000, 2));
        System.out.println(get(49));

    }


    public static int fibonacia(int i) {
        if (1 == i || 2 == i) {
            return 1;
        }
        return fibonacia(i - 1) + fibonacia(i - 2);
    }


    public static int sum(int i, int j) {
        return i + j;
    }

    public static int gogo(int n) {
        if (1 == n || 2 == n) {
            return 1;
        }
        int s1 = 0;
        int s2 = 0;
        int temp = 0;
        for (int i = 3; i <= n; i++) {
            if (i == 3) {
                s1 = 1;
                s2 = 1;
            }
            temp = s2;
            s2 = s2 + s1;
            s1 = temp;
            if (s1 > 1000000007) {
                s1 = s1 % 1000000007;
            }
            if (s2 > 1000000007) {
                s2 = s2 % 1000000007;
            }

        }
        return s2;
    }

    public static int get(int n) {
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                for (int k = 1; k <= j; k++) {
                    sum += gogo(k);
                    if (sum > 1000000007)
                        sum = sum % 1000000007;
                }
            }
        }
        System.out.println(sum);
        return sum;
    }


    public static String md5(String str) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes("UTF-8"));
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer();
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
            str = buf.toString();
        } catch (Exception e) {
            e.printStackTrace();

        }
        return str;
    }
}
