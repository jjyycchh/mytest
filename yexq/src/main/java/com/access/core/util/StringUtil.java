package com.access.core.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.DigestUtils;

/**
 * @description StringUtil
 * @Version V1.0
 * @CreateDate 2014-3-19
 */
public class StringUtil {
	
	public static final String NULL = "\'null\'";
	
	public static HashMap<String, String> getMap(String str) {
		HashMap<String, String> strmap = new HashMap<String, String>();
		String[] st = str.split(">");
		for (String string : st) {
			String[] s = string.substring(1).split("=");
			if (s.length == 1) {
				strmap.put(s[0], null);
			} else if (s.length == 2) {
				strmap.put(s[0], s[1]);
			}
		}
		return strmap;
	}

	public static byte[] interceptByte(byte[] b, int start, int end) {
		byte[] b2 = new byte[end - start];
		for (int i = 0; i < end - start; i++) {
			b2[i] = b[i + start];
		}
		return b2;
	}
	
	public static int bytesToInt(byte[] intByte) {
		int fromByte = 0;
		for (int i = 0; i < 4; i++) {
			int n = (intByte[i] < 0 ? (int) intByte[i] + 256 : (int) intByte[i]) << (8 * i);
			fromByte += n;
		}
		return fromByte;
	}

	public static byte[] interceptByte(byte[] b, int start) {
		byte[] b2 = new byte[b.length - start];
		for (int i = 0; i < b2.length; i++) {
			b2[i] = b[i + start];
		}
		return b2;
	}

	public static String hexToStr(byte[] b) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			String hex = Integer.toHexString(b[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			sb.append(hex.toUpperCase());
		}
		String returnValue = sb.toString();
		sb.setLength(0);
		sb = null;
		b = null;
		return returnValue;

	}

	public static String hexToString(byte[] b) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < b.length; i++) {
			String hex = Integer.toHexString(b[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			sb.append(hex.toUpperCase());
		}
		String returnValue = sb.toString();
		sb.setLength(0);
		sb = null;
		b = null;
		// return returnValue;
		return addSpaceString(returnValue);

	}

	public static String addSpaceString(String s) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			sb.append(s.charAt(i));
			if ((i + 1) % 2 == 0) {
				sb.append(" ");
			}
		}
		return sb.toString();

	}

	/**
	 * 转换十六进制编码为字符串 ok
	 * 
	 * @param s
	 * @return
	 */
	public static String toStringHex(String s) {
		if ("0x".equals(s.substring(0, 2))) {
			s = s.substring(2);
		}
		byte[] baKeyword = new byte[s.length() / 2];
		for (int i = 0; i < baKeyword.length; i++) {
			try {
				baKeyword[i] = (byte) (0xff & Integer.parseInt(
						s.substring(i * 2, i * 2 + 2), 16));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		try {
			s = new String(baKeyword, "UTF-8");// UTF-16le:Not
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		return s;
	}

	/**
	 * 将指定字符串src，以每两个字符分割转换为16进制形式 如："2B44EFD9" –> byte[]{0x2B, 0×44, 0xEF,
	 * 0xD9}
	 * 
	 * @param src
	 *            String
	 * @return byte[]
	 */
	public static byte[] hexStringToBytes(String str) {
		str = str.replaceAll(" ", "");
		int length = str.length() / 2;
		byte[] ret = new byte[length];
		byte[] tmp = str.getBytes();
		for (int i = 0; i < length; i++) {
			ret[i] = uniteBytes(tmp[i * 2], tmp[i * 2 + 1]);
		}
		str = null;
		return ret;
	}

	/**
	 * 将两个ASCII字符合成一个字节； 如："EF"–> 0xEF
	 * 
	 * @param src0
	 *            byte
	 * @param src1
	 *            byte
	 * @return byte
	 */
	private static byte uniteBytes(byte src0, byte src1) {
		byte ret = 0;
		String value = null;
		try {

			value = new String(new byte[] { src0 });
			byte _b0 = Byte.decode("0x" + value).byteValue();
			_b0 = (byte) (_b0 << 4);
			value = new String(new byte[] { src1 });
			byte _b1 = Byte.decode("0x" + value).byteValue();
			ret = (byte) (_b0 ^ _b1);
			value = null;
		} catch (NumberFormatException e) {
			System.out.println(value);
			e.printStackTrace();
		}
		return ret;
	}
	
	/**
	 * 根据指定格式转换成日期字符串
	 * */
	public static String formatToString(Date date, String format) {
		if(date==null){
			return "";
		}
		DateFormat df = new SimpleDateFormat(format);
		return df.format(date);
	}
	
	public static String getLogDate() {
		return formatToString(new Date(),"yyyy-MM-dd HH:mm:ss");
	}
	
	public static short getShort(byte[] b, int index) {
		return (short) (((b[index] << 8) | b[index + 1] & 0xff));
	}
	
	/**
	 * 转义get方式提交的中文字符
	 * @param str
	 * @return
	 */
	public static String fromGetRequest(String str){
		String result="";
		try {
			if(str==null || str.equals(""))return "";
			result = new String(str.getBytes("ISO-8859-1"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return result;
	} 
	
	public static String getString(String str){
		return str==null?"":str;
	}
	
	/**
	 * 转义特定的html标签
	 * @param str
	 * @return
	 */
	public static String htmlLableRemove(String str){
		if(StringUtils.isBlank(str)){
			return str;
		} else {
			str = StringUtils.replace(str, "<!--", "&lt;!--");
			str = StringUtils.replace(str, "-->", "--&gt;");
			str = StringUtils.replace(str, "<script>", "&lt;script&gt;");
			str = StringUtils.replace(str, "</script>", "&lt;/script&gt;");
			return str;
		}
	}
	
	/**
	 * 转义特定的字符
	 * @param str
	 * @return
	 */
	public static String htmlEscape(String str){
		if(StringUtils.isBlank(str)){
			return str;
		} else {
		    //str = StringUtils.replace(str, " ", "&nbsp;");// 替换空格
			str = StringUtils.replace(str, "\t", "&nbsp;&nbsp;");// 替换跳格
			str = StringUtils.replace(str, "\\", "&quot;");
			str = StringUtils.replace(str, "<", "&lt;");
			str = StringUtils.replace(str, ">", "&gt;");
//			str = StringUtils.replace(str, "&", "&amp;");
			return str;
		}
	}
	
	/**
	 * md5加密
	 * @param str
	 * @return
	 */
	public static String getMd5Str(String str){
		if(str == null) return "";
		byte[] pb = null;
		try {
			pb = str.getBytes("utf-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return DigestUtils.md5DigestAsHex(pb);
	}
	
	/**
	 * 获取异常堆栈信息
	 * @param e
	 * @return
	 */
	public static String getExceptionStackTrace(Exception e){
		StringWriter writer = new StringWriter();
		e.printStackTrace(new PrintWriter(writer,true));
		return writer.toString();
	}
	
	public static String convertToString(String str) {
		String result = "";
		try{
//			result = new String(str.getBytes("UTF-8"),"GBK"); 
			
			result = str;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return "\'" + result + "\'";
    }
	
	public static void main(String[] args) {		
		
	}
}
