package com.access.core.util;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

import org.apache.commons.lang.StringUtils;


/**
 * 日期操作工具类
 * @ClassName DateUtil
 * @CreateDate 2014-3-19
 * @Version V1.0
 */
public final class DateUtil {

	private DateUtil() {
	}

	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	public static final String YYYYMMDD = "yyyyMMdd";
	public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";
    public static final String YYYY_MM_DD_HH_MM_DASH = "yyyy-MM-dd_HH:mm";
	public static final String YYYYMMDDHHMMSS = "yyyyMMddHHmmss";

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

	/**
	 * 获取今天日期yyyy-MM-dd
	 * 
	 * @return
	 */
	public static String getTodayDate() {
		return formatToString(new Date(), YYYY_MM_DD);
	}

	public static Date getTodayDateDate() {
		return parseToDate(formatToString(new Date(), YYYY_MM_DD), YYYY_MM_DD);
	}

	/**
	 * 获取当前时间 yyyy-MM-dd HH:mm:ss
	 * 
	 * @return
	 */
	public static String getNow() {
		return formatToString(new Date(), YYYY_MM_DD_HH_MM_SS);
	}

	public static Date getNowDate() {
		return parseToDate(formatToString(new Date(), YYYY_MM_DD_HH_MM_SS),
				YYYY_MM_DD_HH_MM_SS);
	}
	public static Date parseToDate(String s, String format) {
		DateFormat df = new SimpleDateFormat(format);
		try {
			return df.parse(s);
		} catch (ParseException e) {
			// e.printStackTrace();
			//System.err.println(s + "日期格式不对");
			return null;
		}
	}

	public static Date parseToDateTry(String s) {
		Date v = null;
		if (s.length() == DateUtil.YYYY_MM_DD.length()) {
			if(s.contains("/")) {
				v = DateUtil.parseToDate(s, "yyyy/MM/dd");
			} else {
				v = DateUtil.parseToDate(s, DateUtil.YYYY_MM_DD);
			}
		} else if (s.length() == DateUtil.YYYY_MM_DD_HH_MM_SS.length()) {
			if(s.contains("/")) {
				v = DateUtil.parseToDate(s, "yyyy/MM/dd HH:mm:ss");
			} else {
				v = DateUtil.parseToDate(s, DateUtil.YYYY_MM_DD_HH_MM_SS);
			}
		} else if (s.length() == DateUtil.YYYYMMDDHHMMSS.length()) {
			v = DateUtil.parseToDate(s, DateUtil.YYYYMMDDHHMMSS);
		} else if (s.length() == DateUtil.YYYYMMDD.length()) {
			v = DateUtil.parseToDate(s, DateUtil.YYYYMMDD);
		} else if (s.length() == "yyyy/MM/dd HH:mm".length()) {
			v = DateUtil.parseToDate(s, "yyyy/MM/dd HH:mm");
		} else {
			System.err.println("Unsupported date string format: " + s);
			return v;
		}
		return v;
	}

	/**
	 * 格式化毫秒数
	 * 
	 * @param time
	 *            毫秒数
	 * @return HH:MM:ss
	 */
	public static String formatMillisecond(long time) {
		time = time / 1000;
		long hh = time / 60 / 60;
		long mm = time / 60 % 60;
		long ss = time % 60;
		return (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm)
				+ ":" + (ss < 10 ? "0" + ss : ss);
	}

	// 判断日期格式是否正确
	public static boolean checkDate(String date, String format) {
		DateFormat df = new SimpleDateFormat(format);
		Date d = null;
		try {
			d = df.parse(date);
		} catch (Exception e) {
			// 如果不能转换,肯定是错误格式
			return false;
		}
		String s1 = df.format(d);
		// 转换后的日期再转换回String,如果不等,逻辑错误.如format为"yyyy-MM-dd",date为
		// "2006-02-31",转换为日期后再转换回字符串为"2006-03-03",说明格式虽然对,但日期
		// 逻辑上不对.
		return date.equals(s1);
	}

	// 判断字符串是否是合法日期格式
	public static boolean checkStrDate(String format) {
		try {
			parseToDateTry(format);
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	/**
	 * excel日期解析 返回Date
	 * */
	public static Date convertDate4JXL(Date jxlDate) {
		if (jxlDate == null) {
			return null;
		}
		TimeZone gmt = TimeZone.getTimeZone("GMT");
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss",
				Locale.getDefault());
		dateFormat.setTimeZone(gmt);
		String str = dateFormat.format(jxlDate);
		TimeZone local = TimeZone.getDefault();
		dateFormat.setTimeZone(local);
		try {
			return dateFormat.parse(str);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * excel日期解析 返回String
	 * */
	public static String strDate4JXL(Date jxlDate) {
		if (jxlDate == null) {
			return "";
		}
		TimeZone gmt = TimeZone.getTimeZone("GMT");
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss",
				Locale.getDefault());
		dateFormat.setTimeZone(gmt);
		return dateFormat.format(jxlDate);
	}
	
	/**
	 * 返回一个月份的最后一天
	 * 
	 * @param time
	 * @return
	 */
	public static String getMonthLastDay(String time) {
		int yy = Integer.parseInt(time.substring(0, 4));
		int mm = Integer.parseInt(time.substring(5));

		String endTime = "";
		boolean r = yy % 4 == 0 && yy % 100 != 0 || yy % 400 == 0;
		if (mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10
				|| mm == 12) {
			endTime = time + "-31";
		} else if (mm != 2) {
			endTime = time + "-30";
		} else {
			if (r) {
				endTime = time + "-29";
			} else {
				endTime = time + "-28";
			}
		}
		return endTime;
	}

	@SuppressWarnings("unchecked")
	public static <T extends Date> T parse(String dateString,String dateFormat,Class<T> targetResultType) {
		if(StringUtils.isBlank(dateString))
			return null;
		DateFormat df = new SimpleDateFormat(dateFormat);
		try {
			long time = df.parse(dateString).getTime();
			java.util.Date t = targetResultType.getConstructor(long.class).newInstance(time);
			return (T)t;
		} catch (ParseException e) {
			String errorInfo = "cannot use dateformat:"+dateFormat+" parse datestring:"+dateString;
			throw new IllegalArgumentException(errorInfo,e);
		} catch (Exception e) {
			throw new IllegalArgumentException("error targetResultType:"+targetResultType.getName(),e);
		}
	}
	
	public static String dayAdd(String dateStr, int plus){
		Date date = parseToDate(dateStr, YYYY_MM_DD);
		Date resultDate = new Date(date.getTime() + plus*24*60*60*1000);
		return formatToString(resultDate, YYYY_MM_DD);
		
//		Calendar calendar = new GregorianCalendar();
//		Date date = parseToDate(dateStr, DateUtil.YYYY_MM_DD);
//        calendar.setTime(date);
//		calendar.add(Calendar.DATE, plus);
//		return formatToString(calendar.getTime(), YYYY_MM_DD);
	}
}



