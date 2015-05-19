package com.access.core.token;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import sun.misc.BASE64Encoder;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.access.core.constant.Constants;
import com.access.core.util.DeviceTaskUtil;

@Repository("twifiTokenRepository")
public class TwifiTokenRepository {
	
	Logger logger  =  Logger.getLogger(this.getClass());
	
	private final String SALT_KEY = "twifi_key";
	private final Integer INTERVAL_TIME = 60000; //60s
    private final String SEPARATE = "_";
	protected MessageDigest md5;
	protected BASE64Encoder base64Encoder = new BASE64Encoder();
	private Map<String, TwifiToken> tokenMap = new ConcurrentHashMap<String, TwifiToken>();
	
	/**
	 * 生产一个6位的随机数，作为authCode。
	 * @return
	 */
	public String generateAuthCode() {
		return RandomStringUtils.random(Constants.AUTH_CODE_LENGTH, false, true);
	}
	
	/**
	 * 生成token方法。
	 * @param authId 手机号，或者帐号
	 * @param terMac 终端MAC地址
	 * @param devId  设备ID
	 * @param terminalType 终端操作系统类型
	 * @return
	 */
	public String generateTokenData(String authId, String terMac, String devId, String terminalType) {
    	StringBuffer buf = new StringBuffer();
    	buf.append(authId).append(SEPARATE).append(terMac).append(SEPARATE)
    			.append(devId).append(SEPARATE).append(terminalType).append(SEPARATE).append(SALT_KEY);
    	buf.append(SEPARATE).append(System.currentTimeMillis());
    	try {
			String token = encoderByMd5(buf.toString()).substring(0, 15);
			TwifiToken authToken = new TwifiToken(token, System.currentTimeMillis());
			DeviceTaskUtil.authTokenPush(authId, new Gson().toJson(authToken));
			return token;
		} catch (NoSuchAlgorithmException e) {
			logger.error("generate token data failure", e);
		} catch (UnsupportedEncodingException e) {
			logger.error("generate token data failure", e);
		}
    	return null;
    }
	
	/**
	 * 利用MD5进行加密
	 * @param str 待加密的字符串
	 * @return 加密后的字符串
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public String encoderByMd5(String str) throws NoSuchAlgorithmException,
			UnsupportedEncodingException {
		// 确定计算方法
		md5 = MessageDigest.getInstance("MD5");
		// 加密后的字符串
		String newStr = base64Encoder.encode(md5.digest(str.getBytes("utf-8")))
				.replace("==", "++").replace("\\", "-").replace("/", "-");
		return newStr;
	}
	
	/**
	 * 判断token的时效
	 * @param authId
	 * @param token 被校验的token
	 * @return
	 */
	public Boolean validToken(String authId, String token){
		
		// 从内存数据库中获取原有token
		String strAuthToken = DeviceTaskUtil.getAuthToken(authId);
		Boolean result = Boolean.FALSE;
		
		if(StringUtils.isNotBlank(strAuthToken)){
			//删除缓存
			DeviceTaskUtil.authTokenDel(authId);
			TwifiToken authToken = new Gson().fromJson(strAuthToken, new TypeToken<TwifiToken>(){}.getType());
			
			// 判断传过来的token和内存数据库中的token是否一致，且是否超时
			if(authToken != null){
				result = token.equals(authToken.getToken()) 
						&& ((authToken.getTime() + INTERVAL_TIME) >= System.currentTimeMillis());
			}
        }
		return result;
	}
	
	/*public Boolean validSeq(String authId, String token, String seq){
		TwifiToken userToken = tokenMap.get(authId);
		return userToken !=null && seq.equals(userToken.getSeq()) 
				&& ((userToken.getTime() + INTERVAL_TIME) >= System.currentTimeMillis());
	}
	
	public String generateSeq(String authId, String token){
		String seq = this.generateAuthCode();
		tokenMap.put(authId, new TwifiToken(token, seq, System.currentTimeMillis()));
		return seq;
	}*/
	
}

class TwifiToken{
	private String token;
//	private String seq;
	private Long time;
	
	TwifiToken(){}
	TwifiToken(String token, Long time){
		this.token = token;
//		this.seq = seq;
		this.time = time;
	}
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
//	public String getSeq() {
//		return seq;
//	}
//	public void setSeq(String seq) {
//		this.seq = seq;
//	}
	public Long getTime() {
		return time;
	}
	public void setTime(Long time) {
		this.time = time;
	}
}