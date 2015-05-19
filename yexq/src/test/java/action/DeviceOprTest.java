package action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * 设备操作接口测试
 * 
 * @author wujj
 * 
 */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations = "classpath:application-context.xml")
public class DeviceOprTest {
//
//	@Autowired
//	private EmsDeviceSynService emsDeviceSynService;
//
//	/**
//	 * AP重启
//	 */
//	@Test
//	public void apRestartTest() {
//		DeviceRemoteOpr opr = new DeviceRemoteOpr();
//		opr.setType(DeviceOprProcessor.AP_RESTART_TYPE);
//		opr.setDevId("RIXIN-RXMAR30-20140712-128adb01");
//		String url = "http://192.168.4.38:8080/ems-pro/device/deviceOpr.do";
//		StringBuilder param = new StringBuilder();
//		param.append("devId=" + opr.getDevId());
//		param.append("&type=" + opr.getType());
//		String receiveMsg = HttpRequest.sendPost(url, param.toString());
//		System.err.println("------------------------------------------:"
//				+ receiveMsg);
//	}
//
//	/**
//	 * portal重启
//	 */
//	@Test
//	public void portalRestartTest() {
//		DeviceRemoteOpr opr = new DeviceRemoteOpr();
//		opr.setType(DeviceOprProcessor.PORTAL_RESTART_TYPE);
//		opr.setDevId("RIXIN-RXMAR30-20140712-128adb01");
//		String url = "http://192.168.4.38:8080/ems-pro/device/deviceOpr.do";
//		StringBuilder param = new StringBuilder();
//		param.append("devId=" + opr.getDevId());
//		param.append("&type=" + opr.getType());
//		String receiveMsg = HttpRequest.sendPost(url, param.toString());
//		System.err.println("------------------------------------------:"
//				+ receiveMsg);
//	}
//
//	/**
//	 * 修改设备名称信息
//	 */
//	@Test
//	public void updateDevicenameTest() {
//		DeviceRemoteOpr opr = new DeviceRemoteOpr();
//		opr.setType(DeviceOprProcessor.UPDATE_DEVICENAME_TYPE);
//		opr.setDevId("RIXIN-RXMAR30-20140712-128adb01");
//		opr.setDevname("测试设备1");
//		String url = "http://192.168.4.38:8080/ems-pro/device/deviceOpr.do";
//		StringBuilder param = new StringBuilder();
//		param.append("devId=" + opr.getDevId());
//		param.append("&type=" + opr.getType());
//		param.append("&devname=" + opr.getDevname());
//		String receiveMsg = HttpRequest.sendPost(url, param.toString());
//		System.err.println("------------------------------------------:"
//				+ receiveMsg);
//	}
//
//	/**
//	 * 修改设备SSID信息
//	 */
//	@Test
//	public void deviceApRestartTest() {
//		DeviceRemoteOpr opr = new DeviceRemoteOpr();
//		opr.setType(DeviceOprProcessor.UPDATE_SSID_TYPE);
//		opr.setDevId("RIXIN-RXMAR30-20140712-128adb01");
//		opr.setSsid("1234");
//		String url = "http://192.168.4.38:8080/ems-pro/device/deviceOpr.do";
//		StringBuilder param = new StringBuilder();
//		param.append("devId=" + opr.getDevId());
//		param.append("&type=" + opr.getType());
//		param.append("&ssid=" + opr.getSsid());
//		String receiveMsg = HttpRequest.sendPost(url, param.toString());
//		System.err.println("------------------------------------------:"
//				+ receiveMsg);
//	}
//
//	/**
//	 * 白名单
//	 * @throws JsonProcessingException 
//	 */
//	@Test
//	public void whiteListTest() throws JsonProcessingException {
//		DeviceRemoteOpr opr = new DeviceRemoteOpr();
//		opr.setType(DeviceOprProcessor.WHITE_TYPE);
//		List<String> arrayList2 = new ArrayList<String>();
//		arrayList2.add("RIXIN-RXMAR30-20140712-128adb01");
//		List<String> arrayList1 = new ArrayList<String>();
//		arrayList1.add("68A0F6EE2A8D");
//		arrayList1.add("00664B079111");
//		Map<String, List<String>> macMap = new HashMap<String, List<String>>();
//		macMap.put("RIXIN-RXMAR30-20140712-128adb01", arrayList1);
//		String url = "http://192.168.4.38:8080/ems-pro/device/deviceOpr.do";
//		StringBuilder param = new StringBuilder();
//		ObjectMapper mapper = new ObjectMapper();
//		String devIds = mapper.writeValueAsString(arrayList2);
//		param.append("devIds=" + devIds);
//		param.append("&type=" + opr.getType());
//		String macs = mapper.writeValueAsString(macMap);
//		param.append("&macs=" + macs);
//		String receiveMsg = HttpRequest.sendPost(url, param.toString());
//		System.err.println("------------------------------------------:"
//				+ receiveMsg);
//	}
//
//	/**
//	 * 流量上限设置
//	 */
//	@Test
//	public void setQosTest() {
//		DeviceRemoteOpr opr = new DeviceRemoteOpr();
//		opr.setType(DeviceOprProcessor.SET_QOS_TYPE);
//		opr.setDevId("RIXIN-RXMAR30-20140712-128adb01");
//		opr.setInbound_rate(10l);
//		opr.setOutbound_rate(100l);
//		String url = "http://192.168.4.38:8080/ems-pro/device/deviceOpr.do";
//		StringBuilder param = new StringBuilder();
//		param.append("devId=" + opr.getDevId());
//		param.append("&type=" + opr.getType());
//		param.append("&inbound_rate=" + opr.getType());
//		param.append("&outbound_rate=" + opr.getSsid());
//		String receiveMsg = HttpRequest.sendPost(url, param.toString());
//		System.err.println("------------------------------------------:"
//				+ receiveMsg);
//	}
//
}
