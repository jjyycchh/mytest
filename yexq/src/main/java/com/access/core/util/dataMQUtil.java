package com.access.core.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.access.core.constant.Constants;
import com.google.gson.GsonBuilder;
import com.mq.client.MqReceiver;
import com.mq.client.MqSender;
import com.mq.client.MyProcess;
import com.mq.model.sync.Msg;
import com.mq.model.sync.Operation;

public class dataMQUtil {

	public dataMQUtil() {
		// TODO Auto-generated constructor stub
	}
	
	public static void mqsender(Map<String, String> paramValue, String optType, String tblname, String condition, Long seq) throws Exception{
		
		List<Map<String, String>> values = new ArrayList<Map<String, String>>();
		values.add(paramValue);
		
		List<Operation> operations = new ArrayList<Operation>();
		Operation operation = new Operation();
		operation.setOptType(optType);
		operation.setTblName(tblname);
		operation.setCondition(condition);
		operation.setSeq(seq);
		operation.setValues(values);
		operations.add(operation);

		Msg msg = new Msg();
		msg.setClientDBVer("5.6");
		msg.setOperations(operations);
		System.out.println(new GsonBuilder().disableHtmlEscaping().create().toJson(msg));
		
		MqSender mqSender = new MqSender(Constants.CLIENT_MQ_RECEVER);
		mqSender.sendSYNC(msg);
	}
	
	public static void mqsender(Map<String, String> paramValue, String optType, String tblname, String condition) throws Exception{
		
		List<Map<String, String>> values = new ArrayList<Map<String, String>>();
		values.add(paramValue);
		
		List<Operation> operations = new ArrayList<Operation>();
		Operation operation = new Operation();
		operation.setOptType(optType);
		operation.setTblName(tblname);
		operation.setCondition(condition);
		operation.setValues(values);
		operations.add(operation);

		Msg msg = new Msg();
		msg.setClientDBVer("5.6");
		msg.setOperations(operations);
		System.out.println(new GsonBuilder().disableHtmlEscaping().create().toJson(msg));
		
//		MqSender mqSender = new MqSender(); 
		MqSender mqSender = new MqSender(Constants.CLIENT_MQ_RECEVER);
		mqSender.sendSYNC(msg);
	}
	
	public static void main(String[] args) throws Exception {
//		MqSenderTest.test1();
		MqReceiverTest.receiveTest();
	}
}

class MqSenderTest {
	public static void test1() throws Exception{
//		MqMessage sync = new SYNCMessage();
//		sync.setDestName(destName)
		Map<String, String> value1 = new HashMap<String, String>();
		value1.put("id", "78");
		value1.put("model", "model");
		value1.put("brand", "brand");
		value1.put("total_mem", "64");
		value1.put("manufacturer_id", "1");
		
		Map<String, String> value2 = new HashMap<String, String>();
		
		
		List<Map<String, String>> values = new ArrayList<Map<String, String>>();
		values.add(value1);
		
		List<Operation> operations = new ArrayList<Operation>();
		
		Operation operation = new Operation();
		operation.setSeq(1L);
		operation.setOptType("Insert");
		operation.setTblName("device_model");
		operation.setCondition(" where 1=1 ");
		operation.setValues(values);
		operations.add(operation);

		Msg msg = new Msg();
		msg.setClientDBVer("5.6");
		msg.setOperations(operations);
		

		System.out.println(new GsonBuilder().disableHtmlEscaping().create().toJson(msg));

		MqSender mqSender = new MqSender("S400");
		mqSender.sendSYNC(msg);
	}
	
//	public static void main(String[] args) throws Exception {
//		test1();
//		MqReceiverTest.receiveTest();
//	}
}

class MqReceiverTest {
	public static void receiveTest() throws Exception{

		Thread test = new Thread(new MqReceiver(new DataMQProcess()));
//		Thread test = new Thread(new MqReceiver(new MyProcess(), "client001"));
		test.start();
	}
	
	public static void receiveTest1() throws Exception{

		Thread test = new Thread(new MqReceiver(new MyProcess()));
//		Thread test = new Thread(new MqReceiver(new MyProcess(), "client001"));
		test.start();
	}
	
	public static void clearQueue() throws Exception{

		Thread test = new Thread(new MqReceiver(new MyProcess()));
//		Thread test = new Thread(new MqReceiver(new MyProcess(), "client001"));
		new MqReceiver(new MyProcess()).clearQueue();
	}
	
//	public static void main(String args[]) throws Exception{
////		sendTest();
//		receiveTest();
////		clearQueue();
//	}
}