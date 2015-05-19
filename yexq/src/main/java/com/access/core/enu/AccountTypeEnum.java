package com.access.core.enu;

import com.access.core.constant.Constants;
/**
 * 帐户类型
 * @author Administrator
 *
 */
public enum AccountTypeEnum {
    SUPER_MAN(Constants.ACCOUNT_TYPE_SUPER_MAN_CN), 
    ADMINISTRATOR(Constants.ACCOUNT_TYPE_ADMINISTRATOR_CN), 
    REPRESENTATIVE(Constants.ACCOUNT_TYPE_REPRESENTATIVE_CN), 
    MERCHANT(Constants.ACCOUNT_TYPE_SUPER_MAN_CN),
    MANUFACTURER(Constants.ACCOUNT_TYPE_MANUFACTURER_CN),
    DEVICE_ADMIN(Constants.ACCOUNT_TYPE_DEVICE_ADMIN_CN);
    
    private String context;
    private String getContext(){
   	 return this.context;
    }
    private AccountTypeEnum(String context){
   	 this.context = context;
    }
    public static void main(String[] args){
   	 for(AccountTypeEnum name :AccountTypeEnum.values()){
   		 System.out.println(name+" : "+name.getContext());
   	 }
   	 System.out.println(AccountTypeEnum.SUPER_MAN.name());
   	 System.out.println(AccountTypeEnum.SUPER_MAN.getContext());
    }
} 