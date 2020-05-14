import java.security.MessageDigest;

public class test {

    public static void main(String[] args) {

//			String url = "http://localhost:8888/open/hfbapi/recharge?";
//			String str = "merchant_id=10000&order_number=88810616&" +
//					"pay_amount=168&time=5522541&pay_channel=0202" +
//					"&notify_url=http://www.xx.com&bank_code=1&api_key=10f4a5534852475da415c1eec12bbfbc";
        String url = "http://www.bigchengs.cn/open/hfbapi/recharge?";
        String str = "merchant_id=10000&order_number=88810204&" +
                "pay_amount=199&time=5522541&pay_channel=0202" +
                "&notify_url=http://www.xx.com&bank_code=305&api_key=10f4a5534852475da415c1eec12bbfbc";
//
        String sign = md5(str);

       System.out.println(url+str+"&sign="+sign);


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
