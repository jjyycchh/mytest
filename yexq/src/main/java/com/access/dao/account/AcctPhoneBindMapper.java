package com.access.dao.account;

import com.access.model.account.AcctPhoneBind;

public interface AcctPhoneBindMapper {
    int deleteByPrimaryKey(Long id);

    int insert(AcctPhoneBind record);

    int insertSelective(AcctPhoneBind record);

    AcctPhoneBind selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(AcctPhoneBind record);

    int updateByPrimaryKey(AcctPhoneBind record);

    AcctPhoneBind getLatestBindLogByPhoneNumber(String phoneNumber);
}