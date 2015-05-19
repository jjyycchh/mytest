package com.access.dao.user;

import java.util.List;
import java.util.Map;

import com.access.model.user.TerminalUser;

public interface TerminalUserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TerminalUser record);

    int insertSelective(TerminalUser record);

    TerminalUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TerminalUser record);

    int updateByPrimaryKey(TerminalUser record);
    
    int updateUserStatus(TerminalUser record);
    
    long getLatestDaysIncreasedUser(Long days);
    
    TerminalUser getTerminalUserByAuthId(String authId);
    
    List<TerminalUser> getTerminalUserByMac(String mac);

    TerminalUser getTerminalUser(Map<String, Object> paramMap);
    
    TerminalUser getTerminalUserByMap(Map<String, Object> paramMap);
    
    //广告平台查找用户Map
    Map<String,Object> findUserOfAdvert(Map<String, Object> paramMap);
    
    TerminalUser selectByMemberId(Long memberShipId);
}