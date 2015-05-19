package com.access.core.util;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import org.apache.commons.lang.StringUtils;
import org.junit.Test;


/**
 * <p class="detail">
 * 邮件工具
 * </p>
 */
public class EmailUtil {
	private static int PORT = 25;
	private static String SERVER="smtp.126.com";// 发件服务器
	// 发送者信息
	private static String NAME="于俊杰";// 发送者,显示的发件人名字
	private static String USER="yujunjie2009@126.com";// 发送者邮箱地址
	private static String PASSWORD="1314iloveyou";// 密码
	private static String ENCODING="UTF-8";// 邮件编码
	private String title;// 邮件标题
	private String html;// 邮件html内容
	private List<EmailEvent> emailEvents = new ArrayList<EmailEvent>();// 邮件数据
	private static EmailUtil emailUtil = new EmailUtil();
	private Session session;
	
/*	public static void init(){
		Properties config = (Properties) ContextHolder.getBean("appConfig");
		SERVER = config.getProperty("mail.server");
		NAME = config.getProperty("mail.name");
		USER = config.getProperty("mail.user");
		PASSWORD = config.getProperty("mail.passWord");
		ENCODING = config.getProperty("mail.encoding");
	}*/
	
	public EmailUtil() {
		final Properties props = new Properties();
		props.put("mail.smtp.host", SERVER);// SMTP服务器地址
		props.put("mail.smtp.port", String.valueOf(PORT));// 端口
		props.put("mail.smtp.auth", Boolean.TRUE.toString());// SMTP服务器是否需要用户认证，默认为false
		props.put("mail.stmp.timeout", "2000");
		session = Session.getDefaultInstance(props, new Authenticator() {
			// 验证帐户
			public PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(USER, PASSWORD);
			}
		});
	}

	public static EmailUtil getInstance() {
		return emailUtil;
	}

	public EmailUtil setTitle(String title) {
		this.title = title;
		return this;
	}

	public EmailUtil setHTML(String html) {
		this.html = html;
		return this;
	}

	private Email getEmail() {
		return new Email();
	}

	public EmailUtil addEmailGiveUser(String addresseeEmail,
			String addresseeName) {
		EmailEvent emailEvent = new EmailEvent();
		emailEvent.setAddresseeEmail(addresseeEmail);
		emailEvent.setAddresseeName(addresseeName);
		emailEvents.add(emailEvent);
		return this;
	}

	public void send() {
		Email email = emailUtil.getEmail();
		try {
			email.sendEmail();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		clear();
	}

	private void clear() {
		emailEvents = new ArrayList<EmailEvent>();
		html = null;
		title = null;
	}
	
/**
 * 
 * @author Administrator
 *
 */
	public class Email {
		public void sendEmail() throws UnsupportedEncodingException, MessagingException {
			MimeMessage msg = new MimeMessage(session);
			msg.setSentDate(new Date());
			msg.setFrom(new InternetAddress(USER, NAME, ENCODING));

			// 这里可以添加多个目的用户
			for (EmailEvent e : emailEvents) {
				if(StringUtils.isNotBlank(e.getAddresseeEmail())){
					msg.addRecipient(Message.RecipientType.TO, new InternetAddress(e.getAddresseeEmail(), e.getAddresseeName(), ENCODING));
				}
			}
			msg.setSubject(title, ENCODING);

			// 设置邮件内容格式为混合内容
			MimeMultipart msgMultipart = new MimeMultipart("mixed");
			MimeBodyPart content = new MimeBodyPart();
			// 设置html内容
			content.setContent(html, "text/html;charset=UTF-8");
			msgMultipart.addBodyPart(content);
			msg.setContent(msgMultipart);
			Transport.send(msg);
		}
	}

	/**
	 * 
	 * @author Administrator
	 *
	 */
	public class EmailEvent {
		private String addresseeName;// 收件人姓名
		private String addresseeEmail;// 收件人邮箱

		public String getAddresseeName() {
			return addresseeName;
		}

		public void setAddresseeName(String addresseeName) {
			this.addresseeName = addresseeName;
		}

		public String getAddresseeEmail() {
			return addresseeEmail;
		}

		public void setAddresseeEmail(String addresseeEmail) {
			this.addresseeEmail = addresseeEmail;
		}
	}
/***********************************************************************************************/
	public static void main(String args[]) throws UnsupportedEncodingException {
		String ss = "<STYLE type=\"text/css\">BODY { font-size: 14px; line-height: 1.5  } </STYLE><html><head><meta http-equiv=Content-Type content=\"text/html; charset=utf-8\"/></head><body><h1>这个是一个测试邮件:<a href=\"http://www.baidu.com\">百度的连接</h1></body></html>";

		// 收件人
		EmailUtil.getInstance()
		.setTitle("会议通知")
		.setHTML(ss)
		.addEmailGiveUser("923185078@qq.com", "云中鱼")
//		.addEmailGiveUser("luoweijun@wokejia.com", "罗伟俊")
		.send();
	}
	
	@Test
	public void test(){
		String ss = "<STYLE type=\"text/css\">BODY { font-size: 14px; line-height: 1.5  } </STYLE><html><head><meta http-equiv=Content-Type content=\"text/html; charset=utf-8\"/></head><body><h1>这个是一个测试邮件:<a href=\"http://www.baidu.com\">百度的连接</h1></body></html>";

		// 收件人
		EmailUtil.getInstance().setTitle("这是第一sss封邮件").setHTML(ss)
				.addEmailGiveUser("923185078@qq.com", "云中鱼")
//						.addEmailGiveUser("luoweijun@wokejia.com", "罗伟俊")
				.send();
	}
}

