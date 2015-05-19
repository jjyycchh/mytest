package com.access.core.enu;

import com.access.core.constant.Constants;
/**
 * 权限菜单
 * @author Administrator
 *
 */
public enum PermissionEnum {  
	subadmin_mgmt(Constants.PERMISSION_SUBADMIN_MGMT_CN),
	representative_mgmt(Constants.PERMISSION_REPRESENTATIVE_MGMT_CN),
	merchant_mgmt(Constants.PERMISSION_MERCHANT_MGMT_CN),
	manufacturer_mgmt(Constants.PERMISSION_MANUFACTURER_MGMT_CN),
	device_admin_mgmt(Constants.PERMISSION_DEVICE_ADMIN_MGMT_CN),
	user_mgmt(Constants.PERMISSION_USER_MGMT_CN),
	device_mgmt(Constants.PERMISSION_DEVICE_MGMT_CN),
	portal_mgmt(Constants.PERMISSION_PORTAL_MGMT_CN),
	profile_mgmt(Constants.PERMISSION_PROFILE_MGMT_CN),
	system_cfg_mgmt(Constants.PERMISSION_SYSTEM_CFG_MGMT_EN),
	manu_device_mgmt(Constants.PERMISSION_MANU_DEVICE_MGMT_EN);
	
    PermissionEnum(String name) {  
        this.name = name;  
    }
  
    private String name;  
    public String getName() {  
        return name;  
    }  
    public void setName(String name) {  
        this.name = name;  
    }
  
    public static void main(String[] args) {
		for(PermissionEnum m : PermissionEnum.values()){
			System.out.println(m+":"+m.getName()+"--"+m.getDeclaringClass());
		}
	}
}  
