package com.access.dao.user;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.access.model.user.TerminalUserAuthLog;

public interface TerminalUserAuthLogMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TerminalUserAuthLog record);

    int insertSelective(TerminalUserAuthLog record);

    TerminalUserAuthLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TerminalUserAuthLog record);

    int updateByPrimaryKeyWithBLOBs(TerminalUserAuthLog record);

    int updateByPrimaryKey(TerminalUserAuthLog record);

    List<Map<String, Object>> getUsersstatis(Map<String, Object> param);
    
    List<Map<String, Object>> getLatestDayUsersstatis(Map<String, Object> param);
    
    List<Map<String, Object>> getTrafficstatis(Map<String, Object> param);
    
    TerminalUserAuthLog getLatestUserAuthLogsByUserId(Map<String, Object> param);
    
    Map<String, Object> getCurrentTrafficForDevice(Map<String, Object> param);
    
    long getLatestDaysIncreasedConnection(Long days);
    
    Integer getLoginCount(String deviceId);
    
    Integer getLoginTimes(Map<String, Object> param);
    
    List<TerminalUserAuthLog> getAuthListByMap(Map<String, Object> param);
    
    TerminalUserAuthLog getLastAuthLogByMap(Map<String, Object> param);

    List<Map<String, Object>> getUserDetails(Long accountId); 

    List<Map<String, Object>> getTrafficDetails(Long accountId); 

    List<Map<String, Object>> getAuthTypeStatis(Map<String, Object> paramMap); 
    
    List<Map<String, Object>> getTerminalTypeStatis(Map<String, Object> paramMap); 
    
    List<Map<String, Object>> getBrowserTypeStatis(Map<String, Object> paramMap); 
    
    Map<String, Object> getUserAnalyse(Map<String, Object> paramMap);
    
    List<Map<String, Object>> getTrafficAnalyse(Map<String, Object> paramMap); 
    
    List<Map<String, Object>> getTrafficPoint(Map<String, Object> paramMap);
    
    int getUserCountOfDevice(Map<String, Object> paramMap);

    List<Map<String, Object>> getAuthStatis(Map<String, Object> paramMap);
    
    long getAuthPoint(Map<String, Object> paramMap);
    
    long getClickCountBySiteId(Map<String, Object> paramMap);
    
    Long getUserCountPoint(Map<String, Object> paramMap);

    List<Map<String,Object>> getAuthTypePoint(Map<String, Object> paramMap);
 
    Map<String, Object> superGetAuthPage(Map<String, Object> paramMap);
    
    Integer superGetAuthPageCount(Map<String, Object> paramMap);

    TerminalUserAuthLog getLastAuthLogByUserIdDevId(Map<String, Object> paramMap);

    TerminalUserAuthLog getAuthLogByToken(Map<String, Object> paramMap);
    
    int updateAuthLogStatus(Map<String, Object> paramMap);

    List<Map<String,String>> getUserInfo(Map<String, Object> paramMap);
    
    List<Map<String,String>> findUserInfo(Map<String, Object> paramMap);
    
    List<Map<String, Object>> getOneDayUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getOneDayNewUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getOneDayOldUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getHistoryUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getHistoryNewUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getHistoryOldUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getAllApUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getApUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getApNewUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getApOldUsers(Map<String, Object> param);
    
    List<Map<String, Object>> getUserStatusStatistics(Long accountId);
    
    Long getNewUserNumStatistics(Map<String, Object> param);
    
    Long getTodayUserCount(Map<String, Object> param);
    
    List<Map<String, Object>> getUserInfoByMac(Map<String, Object> param);
    
    List<String> getUserMacByUserId(Long terminalUserId);
    
    Map<String, Date> selectByTerminalUserId(Long terminalUserId);
}