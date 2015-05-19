package action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.google.gson.GsonBuilder;
import com.mq.client.MqSender;
import com.mq.model.sync.Msg;
import com.mq.model.sync.Operation;

public class MqsenderTest {

	public static void test1() throws Exception{
//		MqMessage sync = new SYNCMessage();
//		sync.setDestName(destName)
		Map<String, String> value1 = new HashMap<String, String>();
		value1.put("colume_name1", "vaue1");
		value1.put("colume_name2", "vaue2");
		
		Map<String, String> value2 = new HashMap<String, String>();
		value2.put("colume_name3", "vaue1");
		value2.put("colume_name4", "vaue2");
		
		List<Map<String, String>> values = new ArrayList<Map<String, String>>();
		values.add(value1);
		values.add(value2);
		
		
		List<Operation> operations = new ArrayList<Operation>();
		
		Operation operation = new Operation();
		operation.setSeq(1L);
		operation.setOptType("update");
		operation.setTblName("testTable");
		operation.setCondition(" where 1=1 ");
		operation.setValues(values);
		
		operations.add(operation);

		Msg msg = new Msg();
		msg.setClientDBVer("5.6");
		msg.setOperations(operations);
		

		System.out.println(new GsonBuilder().disableHtmlEscaping().create().toJson(msg));
		
		MqSender mqSender = new MqSender();
		mqSender.sendSYNC(msg);
	}
	
	
	public static void main(String[] args) throws Exception {
		test1();
	}

}

