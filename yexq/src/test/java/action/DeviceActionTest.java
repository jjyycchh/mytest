package action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.google.gson.Gson;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class DeviceActionTest {
	
	@Test
	public void addMacToBlackList() {
		String url = "http://192.168.4.88:8000/account/addMacToBlackList.htm";
		List<String> devIdList = new ArrayList<String>();
		List<String> macList = new ArrayList<String>();
		
		devIdList.add("3b7883ea-b930-40b3-826e-7ef27157453b");
		devIdList.add("47f83283-1ffb-4a7f-ab95-56f0c9186950");
		devIdList.add("51a4034e-a988-4728-afb8-2db7d5d27f94");
		
		devIdList.add("4b4296dc-cc79-4320-8cd7-2429fa243e69");
		System.out.println(new Gson().toJson(devIdList));
		
//		macList.add("123456789012");
//		macList.add("abc123abc123");
		
		// 更新黑名单用
//		macList.add("333aaa555bbb");
		
		// 黑白名单同时存在
//		macList.add("111111111111");
		macList.add("222222222222");
		
		Map<String,List<String>> paramMap = new HashMap<String,List<String>>();
		paramMap.put("dev_id_list", devIdList);
		paramMap.put("mac_list", macList);
		
		String receiveMsg = HttpRequest.sendPost(url, new Gson().toJson(paramMap));
		System.err.println("------------------------------------------:"
				+ receiveMsg);
		
	}
	
	@Test
	public void addMacToWhitekList() {
		String url = "http://192.168.4.88:8000/account/addMacToWhitekList.htm";
		List<String> devIdList = new ArrayList<String>();
		List<String> macList = new ArrayList<String>();
		
//		devIdList.add("4b4296dc-cc79-4320-8cd7-2429fa243e69");
//		devIdList.add("5229e570-a1de-430e-a85d-6b798973a139");
//		devIdList.add("53498138-2234-45a9-8efd-24436acb7d16");
		
		devIdList.add("51a4034e-a988-4728-afb8-2db7d5d27f94");
		macList.add("bcd123bcd123");
		macList.add("123456abcdef");
		
		// 更新白名单用
//		macList.add("222aaa111ccc");
		
		// 黑白名单同时存在
		macList.add("111111111111");
		macList.add("222222222222");
		
		Map<String,List<String>> paramMap = new HashMap<String,List<String>>();
		paramMap.put("dev_id_list", devIdList);
		paramMap.put("mac_list", macList);
		
		String receiveMsg = HttpRequest.sendPost(url, new Gson().toJson(paramMap));
		System.err.println("------------------------------------------:"
				+ receiveMsg);
	}
	
	@Test
	public void removeMacFromBlackList() {
		String url = "http://192.168.4.88:8000/account/removeMacFromBlackList.htm";
		List<String> devIdList = new ArrayList<String>();
		List<String> macList = new ArrayList<String>();
		
//		devIdList.add("3b7883ea-b930-40b3-826e-7ef27157453b");
//		devIdList.add("47f83283-1ffb-4a7f-ab95-56f0c9186950");
		devIdList.add("54e8a53f-cfd1-486c-a605-a8f49f61d3ac");
		
		macList.add("123456789012");
		
		Map<String,List<String>> paramMap = new HashMap<String,List<String>>();
		paramMap.put("dev_id_list", devIdList);
		paramMap.put("mac_list", macList);
		
		String receiveMsg = HttpRequest.sendPost(url, new Gson().toJson(paramMap));
		System.err.println("------------------------------------------:"
				+ receiveMsg);
	}
	
	@Test
	public void removeMacFromWhitekList() {
		String url = "http://192.168.4.88:8000/account/removeMacFromBlackList.htm";
		List<String> devIdList = new ArrayList<String>();
		List<String> macList = new ArrayList<String>();
		
		devIdList.add("4b4296dc-cc79-4320-8cd7-2429fa243e69");
//		devIdList.add("5229e570-a1de-430e-a85d-6b798973a139");
		
		macList.add("bcd123bcd123");
		
		Map<String,List<String>> paramMap = new HashMap<String,List<String>>();
		paramMap.put("dev_id_list", devIdList);
		paramMap.put("mac_list", macList);
		
		String receiveMsg = HttpRequest.sendPost(url, new Gson().toJson(paramMap));
		System.err.println("------------------------------------------:"
				+ receiveMsg);
	}

	@Test
	public void deviceLimitationTest() {
		String url = "http://192.168.4.88:8000/device/deviceSaveLimitation.htm";
		
		List<String> devIdList = new ArrayList<String>();
		devIdList.add("4b4296dc-cc79-4320-8cd7-2429fa243e69");
		devIdList.add("5229e570-a1de-430e-a85d-6b798973a139");
		
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("dev_id_list", devIdList);
		paramMap.put("minslimit", 5);
		paramMap.put("trafficlimit", 10);
		
		String receiveMsg = HttpRequest.sendPost(url, new Gson().toJson(paramMap));
		System.out.println(receiveMsg);
	}
}
