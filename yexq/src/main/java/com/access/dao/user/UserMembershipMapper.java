package com.access.dao.user;

import java.util.Date;
import java.util.Map;

import com.access.model.user.UserMembership;

public interface UserMembershipMapper {
    int deleteByPrimaryKey(Long id);

    int insert(UserMembership record);

    int insertSelective(UserMembership record);

    UserMembership selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(UserMembership record);

    int updateByPrimaryKeyWithBLOBs(UserMembership record);

    int updateByPrimaryKey(UserMembership record);
    
    /**
     * 根据accountId获取会员信息
     * @param accountId
     * @return
     */
    UserMembership selectByAccountId(Long accountId);
    
    /**
     * 根据accountId和phoneNumber获取会员信息
     * @param paramMap
     * @return
     */
    UserMembership selectByAccountIdAndPhoneNumber(Map<String, Object> paramMap);
    
    /**
     * 根据会员ID获取该会员登录的最早和最晚时间
     * @param memberId
     * @return
     */
    Map<String, Date> selectFirstAndLastLoginTimeByMemberId(Long memberId);
}