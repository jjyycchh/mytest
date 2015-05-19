package com.access.core.listener;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.access.core.util.PropertiesUtil;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class ChangeDataListener implements ServletContextListener{

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
		try {
			this.changeBlacklist();
			this.deleteBlacklist();
			
			this.changeWhitelist();
			this.deleteWhitelist();
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private Connection getConection() throws ClassNotFoundException, SQLException {
//		String driver = "com.mysql.jdbc.Driver";
//		String url = "jdbc:mysql://localhost:3306/twifi-access?useUnicode=true&characterEncoding=utf-8";
//		String username = "root";
//		String password = "root";
		
		String driver = PropertiesUtil.confProperties.getProperty("db.jdbc.driver");
		String url = PropertiesUtil.confProperties.getProperty("db.jdbc.url");
		String username = PropertiesUtil.confProperties.getProperty("db.jdbc.user");
		String password = PropertiesUtil.confProperties.getProperty("db.jdbc.password");

		Class.forName(driver);
		Connection conn = DriverManager.getConnection(url, username, password);
		
		return conn;
	}
	
	
	private void changeBlacklist() throws SQLException, ClassNotFoundException {
		Connection conn = this.getConection();
		Statement  stmt = conn.createStatement();
		String getBlackList = "select * from user_blacklist where mac is not null";
		ResultSet blackLisSet = stmt.executeQuery(getBlackList);
		
		changeData(conn, blackLisSet, "user_blacklist");
		
		if(blackLisSet != null) {
			blackLisSet.close();
		}
		
		if(stmt != null) {
			stmt.close();
		}
		
		if(conn != null) {
			conn.close();
		}
	}

	private void changeWhitelist() throws ClassNotFoundException, SQLException {
		Connection conn = this.getConection();
		Statement stmt = conn.createStatement();
		String getWhiteList = "select * from user_whitelist where mac is not null";
		ResultSet whiteLisSet = stmt.executeQuery(getWhiteList);
		
		changeData(conn, whiteLisSet, "user_whitelist");
		
		if(stmt != null) {
			stmt.close();
		}
	}
	
	private void changeData(Connection conn, ResultSet resultSet, String tableName) throws SQLException {
		
		if(resultSet != null) {
			String mac = "";
			String deviceIdListString = "";
			Gson gson = new Gson();
			List<String> allDeviceIdList = new ArrayList<String>();
			List<String> deviceIdList = null;
			Map<String, String> recordMap = new HashMap<String, String>();
			
			// 获取所有的deviceId,并将原来记录里的mac和device_ids对应起来
			while(resultSet.next()) {
				mac = resultSet.getString("mac");
				deviceIdListString = resultSet.getString("device_ids");
				
				recordMap.put(mac, deviceIdListString);
				deviceIdList = gson.fromJson(deviceIdListString, new TypeToken<List<String>>(){}.getType());

				if(deviceIdList != null && deviceIdList.size() > 0) {
					for(String deviceId : deviceIdList) {
						if(!allDeviceIdList.contains(deviceId)) {
							allDeviceIdList.add(deviceId);
						}
					}
				}
			}
			
			if(allDeviceIdList.size() > 0) {
				Map<String, String> deviceIdAndMacsMap = new HashMap<String, String>();
				
				Entry<String, String> recordMapEntry = null;
				
				// 循环所有的deviceId，判断是否在每条记录的device_ids里存在，存在时，将此deviceId和mac关联起来
				for(String deviceId : allDeviceIdList) {
					List<String> macList = new ArrayList<String>();
					
					Set<Entry<String, String>> recordMapEntrySet = recordMap.entrySet();
					Iterator<Entry<String, String>> recordMapIterator = recordMapEntrySet.iterator();
					
					while(recordMapIterator.hasNext()) {
						recordMapEntry = recordMapIterator.next();
						deviceIdList = gson.fromJson(recordMapEntry.getValue(), new TypeToken<List<String>>(){}.getType());
						
						if(deviceIdList !=null && deviceIdList.contains(deviceId)) {
							macList.add(recordMapEntry.getKey());
						}
					}
					
					deviceIdAndMacsMap.put(deviceId, gson.toJson(macList));
				}
				
 				Set<Entry<String, String>> entrySet = deviceIdAndMacsMap.entrySet();
 				Iterator<Entry<String, String>> iterator = entrySet.iterator();
				
 				Entry<String, String> entry = null;
 				String deviceId = "";
 				String macs = "";
 				String insetSql = "insert into " + tableName + " (device_id, macs, mac) values (?,?,?)";
 				PreparedStatement preStmt = conn.prepareStatement(insetSql);
 				
 				Statement stmt = null;
 				ResultSet rs = null;
 				
 				while(iterator.hasNext()) {
 					entry = iterator.next();
 					deviceId = entry.getKey();
 					macs = entry.getValue();
 					
 					stmt = conn.createStatement();
 					String selectSql = "select * from "+ tableName + " where device_id = '" + deviceId + "';";
 					rs = stmt.executeQuery(selectSql);
 					
 					if(rs == null || !rs.next()) {
 						preStmt.setString(1, deviceId);
 	 					preStmt.setString(2, macs);
 	 					preStmt.setString(3, null);
 	 					
 	 					preStmt.executeUpdate();
 					}
 				}
 				
 				if(resultSet != null) {
 					resultSet.close();
 				}
 				
 				if(preStmt != null) {
 					preStmt.close();
 				}
			}
			
		}
	}
	
	/**
	 * 删除黑名单表的老数据
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 */
	private void deleteBlacklist() throws ClassNotFoundException, SQLException {
		Connection conn = this.getConection();
		Statement stmt = conn.createStatement();
		
		String deleteBlackList = "delete from user_blacklist where device_id is null";
		stmt.executeUpdate(deleteBlackList);
		
		if(stmt != null) {
			stmt.close();
		}
		
		if(conn != null) {
			conn.close();
		}
		
	}
	
	/**
	 * 删除白名单的老数据
	 * @throws ClassNotFoundException
	 * @throws SQLException
	 */
	private void deleteWhitelist() throws ClassNotFoundException, SQLException {
		Connection conn = this.getConection();
		Statement stmt = conn.createStatement();
		
		String deleteWhiteList = "delete from user_whitelist where device_id is null";
		stmt.executeUpdate(deleteWhiteList);
		
		if(stmt != null) {
			stmt.close();
		}
		
		if(conn != null) {
			conn.close();
		}
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

}
