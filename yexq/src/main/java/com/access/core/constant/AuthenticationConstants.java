package com.access.core.constant;

public class AuthenticationConstants {
	// 第三方应用发布状态
	public static final String THIRD_APPLICATION_STATUS_UNPUBLISHED_EN = "UNPUBLISHED";
	public static final String THIRD_APPLICATION_STATUS_UNPUBLISHED_CN = "未发布";
	public static final String THIRD_APPLICATION_STATUS_PUBLISHED_EN = "PUBLISHED";
	public static final String THIRD_APPLICATION_STATUS_PUBLISHED_CN = "已发布";
	public static final String THIRD_APPLICATION_STATUS_DELETED_EN  = "DELETED";
	public static final String THIRD_APPLICATION_STATUS_DELETED_CN = "已下架";
	
	// 第三方应用随机AppId和AppKey的长度
	public static final int THIRD_APPLICATION_APP_ID_LENGTH = 8;
	public static final int THIRD_APPLICATION_APP_KEY_LENGTH = 12;
	
	// 用户添加第三方应用的状态
	public static final byte THIRD_APPLICATION_DEFAULT_STATUS = 1;
	public static final byte THIRD_APPLICATION_DELETED_STATUS = 0;
	
	// 生成商户OpenId所用的密钥
	public static final String DES_ENCRYPT_KEY = "qlstudio";
	
	// 微通宝接口请求类型（测试用）
	public static final String VTONGBAO_INTERFACE_TYPE = "vtongbao";
	
	// 接口请求类型
	public static final String INTERFACE_REGISTER = "REG";
	public static final String INTERFACE_LOGIN = "LOGIN";
	public static final String INTERFACE_AUTH = "AUTH";
	
	// 请求执行结果
	public static final Byte REQUEST_RESULT_SUCCESS = 1;
	public static final Byte REQUEST_RESULT_FAIL = 0;
	
	// 2B和2C的secretKey
	public static final String SECRET_KEY_2B = "toBusiness";
	public static final String SECRET_KEY_2C = "toConsumer";
	
	// 微信认证所需的重定向URL
	public static final String WECHAT_REDRECT_URL = "http://wxtest.buy0573.com/smartwifi/authwe";
	
	// 默认添加的第三方应用分类
	public static final Long DEFAULT_THIRD_APP_TYPE_ID = 1L;
}
