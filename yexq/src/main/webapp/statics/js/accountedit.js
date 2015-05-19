/**
 * Created by wj on 2014/8/13.
 */
Array.prototype.clone = function () { 
	return this.slice(0); 
} 

Array.prototype.unique = function() {
	
}

Array.prototype.remove = function(b) { 
	var a = this.indexOf(b); 
	if (a >= 0) { 
		
		this.splice(a, 1); 
		return true; 
	} 
	
	return false; 
};

Array.prototype.removeOnIndex = function (a) {
	if (a < this.length) {
		this.splice(a, 1); 
		return true;
	}
	
	return false;
}

//////////////////////////////////////////////////////////////////////
// permission definition
var WHOLE_PERMISSIONS = [{'cn_name': '下属管理员管理', 		'id': 'id_perm_subadmin_mgmt', 			'perm_code': 'SUBADMIN_MGMT', 		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR']},
		                   {'cn_name': '代理商管理', 		'id': 'id_perm_representative_mgmt', 	'perm_code': 'REPRESENTATIVE_MGMT', 'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR']},
		                   {'cn_name': '商户管理', 		'id': 'id_perm_merchant_mgmt', 			'perm_code': 'MERCHANT_MGMT',		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE']},
		                   {'cn_name': '用户管理', 		'id': 'id_perm_user_mgmt', 				'perm_code': 'USER_MGMT',			'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT']},
		                   {'cn_name': '设备管理', 		'id': 'id_perm_device_mgmt', 			'perm_code': 'DEVICE_MGMT',			'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT']},
		                   {'cn_name': 'WiFi门户管理', 	'id': 'id_perm_portal_mgmt', 			'perm_code': 'PORTAL_MGMT', 		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT']},
		                   {'cn_name': '基本信息管理', 		'id': 'id_perm_profile_mgmt', 			'perm_code': 'PROFILE_MGMT',		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT', 'MANUFACTURER', 'DEVICE_ADMIN']},
		                   {'cn_name': '系统设置管理', 		'id': 'id_perm_system_cfg_mgmt', 		'perm_code': 'SYSTEM_CFG_MGMT',		'default_account_type': ['SUPER_MAN']},
		                   {'cn_name': '设备厂商管理', 		'id': 'id_perm_manufacturer_mgmt', 		'perm_code': 'MANUFACTURER_MGMT',	'default_account_type': ['SUPER_MAN']},
		                   {'cn_name': '设备管理员管理', 	'id': 'id_perm_device_admin_mgmt', 		'perm_code': 'DEVICE_ADMIN_MGMT',	'default_account_type': ['SUPER_MAN']}];


//function filterWholePermissionByAcctType(accountType) {
function AcctTypeFilterForWholePermission(accountType) {
	var whole_perms_type_filted = WHOLE_PERMISSIONS.clone();

	if (accountType == null) {
		return whole_perms_type_filted;
	}
	
	if (accountType == ACCOUNT_TYPE_CONST.SUPER_MAN) {
		// super_man should not be displayable or editable.
		return whole_perms_type_filted;
	}
	
	// whole_permissions_lst add accountType filter
	for (var i = 0; i < WHOLE_PERMISSIONS.length ; i++) {
		if (WHOLE_PERMISSIONS[i].default_account_type.indexOf(accountType) < 0) {
			whole_perms_type_filted.remove(WHOLE_PERMISSIONS[i]);
		}
	}
	
	return whole_perms_type_filted;
}

var accounteditApp = function(){
	var curAccountId = ACCOUNT_ID;
	var curAccountType = null;
	var curAcctGeoLevel = null;
	var curAccountPermissions = null;
	var curAccountTags = null;
	var acctDetails = null;	
	
	
 //   alert(__CONTEXT_MERCHANT_CODE);
  //  alert(__CONTENT_GEOLEVEL);
   // alert(optAcctType);
//	alert(__CONTEXT_MERCHANT_CODE);
	var oldgeolevel="";
	var selected_subaccts = null;
	var removed_subaccts = null;	 
	var getAccountInfo =function(){
		
		if(curAccountId != "" || curAccountId != null){
			LoadAccountData(curAccountId);	
		}
		else{			
			// initial permission box for create new account
			refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
		}
		
		
		addr_selector_create('acct_geo_province', 'acct_geo_city', 'acct_geo_county');
		
	}
	
	function refreshPermissionBox(accountType, accountPermissions, whole_perm_lst_type) { 
	//	alert(accountPermissions.length);
		//var array=new Array("aaa","bbb","ccc")
		//var accty=array.clone();
		//alert(accty.length);
		var opt_acct_perm_lst = accountPermissions == null ? null : accountPermissions.clone();
		
		var whole_perm_lst_type_filted = AcctTypeFilterForWholePermission(accountType);

		var permissionBoxHtml = "<a href='#' class='list-group-item active'><strong>权限选择:</strong></a>";
		for ( var i = 0; i < whole_perm_lst_type_filted.length; i++) {
			var hasPermission = false;
			if (opt_acct_perm_lst != null) {
				for ( var j = 0; j < opt_acct_perm_lst.length; j++) {
					if (whole_perm_lst_type_filted[i].perm_code == opt_acct_perm_lst[j]) {
						permissionBoxHtml += "<a id='" + whole_perm_lst_type_filted[i].id + "' class='list-group-item perm-item' style='cursor:pointer;'><input type='checkbox' checked='true'>&nbsp;&nbsp;"
								+ whole_perm_lst_type_filted[i].cn_name
								+ "</a>";
						hasPermission = true;						
						break;
					}
				}
			}

			if (!hasPermission) {
				permissionBoxHtml += "<a id='" + whole_perm_lst_type_filted[i].id + "' class='list-group-item perm-item' style='cursor:pointer;'><input type='checkbox'>&nbsp;&nbsp;" + whole_perm_lst_type_filted[i].cn_name + "</a>";
			}			
		}
		        
		$("#acct_permissions").html(permissionBoxHtml);
		$(".perm-item").click(function() {
			for ( var i = 0; i < WHOLE_PERMISSIONS.length; i++) {
				if (this.id == WHOLE_PERMISSIONS[i].id) {
					onCheckPermission(WHOLE_PERMISSIONS[i].perm_code);
					break;
				}
			}
		});
	}
	function onCheckPermission(permCode) {
		/////////////////////
		// permCode validation
		var isValidPermCode = false;

		for ( var i = 0; i < WHOLE_PERMISSIONS.length; i++) {
			if (permCode == WHOLE_PERMISSIONS[i].perm_code) {
				isValidPermCode = true;
				break;
			}
		}

		if (!isValidPermCode) {
			return;
		}

		/////////////////////
		// change local permission
		if (curAccountPermissions == null || curAccountPermissions.length == 0) {
			curAccountPermissions = [];
		}
		
		var hasPermission = curAccountPermissions.remove(permCode);
		
		if (!hasPermission) {
			curAccountPermissions.push(permCode);
		}
		
		if (acctDetails != null) {
			acctDetails.permissions = curAccountPermissions.clone();
		}
		//alert(curAccountPermissions);

		refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
	}
	
	
	
	var LoadAccountLink = function(){
		var accountlinkhtml ="<a href='/account/subaccount.htm' data-accountid='"+ACCOUNT_ID+"' class='Account-Back-Button initAjax' >子帐号管理</a>";
		$("#linkforsubaccountlist").html(accountlinkhtml);
		if(curAccountId == ""||curAccountId==null){
			$("a#linkforsubaccountlist").hide();
		}
	}
	function LoadAccountData(accountId) {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/accountdetails.htm',
			data : {
				'accountId' : accountId
			},
			success : function(data) {
				if (data.result != 'FAIL' && data.account != null) {
					if (data.account != null) {
						acctDetails = data.account;
						curAccountType = acctDetails.type;
						curAcctGeoLevel = acctDetails.geoLevel;
						oldgeolevel = acctDetails.geoLevel;
						curAccountPermissions = acctDetails.permissions;
					//	alert(curAccountPermissions.length);
						curAccountTags = acctDetails.tags;
						refreshAccountData(acctDetails);						
						refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);
						if (acctDetails.type == "MERCHANT") {
							$("#td_merchant_name").show();
							$("#div_merchant_name").show();
							$("#linkforsubaccountlist").hide();
							$("#sub_account_set_btn").hide();
							$("#td_admin_level").hide();
							$("#acct_admin_geo_lv").hide();
						} else if(acctDetails.type == "REPRESENTATIVE") {
							$("#td_merchant_name").hide();
							$("#div_merchant_name").hide();
							$("#td_admin_level").hide();
							$("#acct_admin_geo_lv").hide();
					
						} else if (acctDetails.type == "ADMINISTRATOR") {
							$("#td_admin_level").show();
							$("#acct_admin_geo_lv").show();
							$("#td_merchant_name").hide();
							$("#div_merchant_name").hide();							
						} 						
						
					}
				} else {		
					return false;
				}
			},
			error : function(data) {		
				return false;
			}
		});
	}
	
	
			
		
		function loadSubSearchLocation(geoLevel, province, city, county){
			if(geoLevel == "2"){
				addr_selector_set("id_province", province, "id_city", "请选择", "id_county", "请选择");
			} else if(geoLevel == "3"){
				addr_selector_set("id_province", province, "id_city", city, "id_county", "请选择");
			} else if(geoLevel == "4"){
				addr_selector_set("id_province", province, "id_city", city, "id_county", county);
			}
		}
		
		 function refreshAccountData(account) {
			 if (account.avatarPath != null) {
					$("#acct_avatar").attr('src', account.avatarPath);
				}

				$("#acct_username").val(account.username);
				$("#acct_fullname").val(account.fullname);
				$("#acct_merchant_name").val(account.merchantName)
				$("#acct_email").val(account.email);
				$("#acct_cellphone").val(account.cellNumber);
				$('div.select-account-type').html('<input type="text" id="AccountType" name="AccountType">');
				$('div.select-account-levl').html('<input type="text" id="acct_admin_geo_lv" name="acct_admin_geo_lv">');
				var adminlevl=null;
				alert(account.geoLevel);
				if(account.geoLevel != null){
				 adminlevl =account.geoLevel;
				} 
				if (account != null && account.tags != null) {
					$("#acct_tags").val(account.tags.join(", "));
				//	$("#acct_tags").editable('setValue', account.tags.join(", "), true);
				}
				
		switch(__CONTENT_GEOLEVEL) 
		{
		case '0':
			if(curAccountType=="REPRESENTATIVE"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'REPRESENTATIVE',text:'代理商'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});					
			}else if(curAccountType=="MERCHANT"){
				  $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'MERCHANT',text:'商户'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				
			}else if(curAccountType=="ADMINISTRATOR"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'ADMINISTRATOR',text:'管理员'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				 
				 if(adminlevl !=null){
					 switch(adminlevl)
					 {
					 case "1":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'1',text:'L1-全国'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;
					 case "2":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'2',text:'L2-省级'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;
					 case "3":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'3',text:'L3-市级'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;
					 case "4":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'4',text:'L4-区县级'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;						 
					 }
				
					  
				 }
				
			}
			break;
		case '1':
			if(curAccountType=="REPRESENTATIVE"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'REPRESENTATIVE',text:'代理商'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});					
			}else if(curAccountType=="MERCHANT"){
				  $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'MERCHANT',text:'商户'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				
			}else if(curAccountType=="ADMINISTRATOR"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'ADMINISTRATOR',text:'管理员'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				 if(adminlevl !=null){
					 switch(adminlevl)
					 {
					
					 case "2":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'2',text:'L2-省级'},data:[{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;
					 case "3":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'3',text:'L3-市级'},data:[{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;
					 case "4":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'4',text:'L4-区县级'},data:[{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;						 
					 }
				
					  
				 }
				
			}
			break;
		case '2':
			if(curAccountType=="REPRESENTATIVE"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'REPRESENTATIVE',text:'代理商'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});					
			}else if(curAccountType=="MERCHANT"){
				  $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'MERCHANT',text:'商户'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				
			}else if(curAccountType=="ADMINISTRATOR"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'ADMINISTRATOR',text:'管理员'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				 if(adminlevl !=null){
					 switch(adminlevl)
					 {
					
					 case "3":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'3',text:'L3-市级'},data:[{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;
					 case "4":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'4',text:'L4-区县级'},data:[{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
						 break;						 
					 }
				
					  
				 }
				
			}
			break;
		case '3':
			if(curAccountType=="REPRESENTATIVE"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'REPRESENTATIVE',text:'代理商'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});					
			}else if(curAccountType=="MERCHANT"){
				  $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'MERCHANT',text:'商户'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				
			}else if(curAccountType=="ADMINISTRATOR"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'ADMINISTRATOR',text:'管理员'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				 if(adminlevl !=null){
					 switch(adminlevl)
					 {
					
					 case "4":
						 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'4',text:'L4-区县级'},data:[{value:'4',text:'L4-县区级'}]});
						 break;						 
					 }
				
					  
				 }
				
			}
			break;
		case '4':
			if(curAccountType=="REPRESENTATIVE"){
				 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'REPRESENTATIVE',text:'代理商'},data:[{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});					
			}else if(curAccountType=="MERCHANT"){
				  $('#AccountType').xiSelect({offsetSize:[0,3,0,3],onChange:GetTypechange(),defaultData:{value:'MERCHANT',text:'商户'},data:[{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
				
			}

			break;
		
		}
		        /*
				if(curAccountType=="REPRESENTATIVE"){
					 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'REPRESENTATIVE',text:'代理商'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});					
				}else if(curAccountType=="MERCHANT"){
					  $('#AccountType').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'MERCHANT',text:'商户'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
					
				}else if(curAccountType=="ADMINISTRATOR"){
					 $('#AccountType').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'ADMINISTRATOR',text:'管理员'},data:[{value:'ADMINISTRATOR',text:'管理员'},{value:'REPRESENTATIVE',text:'代理商'},{value:'MERCHANT',text:'商户'}]});
					 if(adminlevl !=null){
						 switch(adminlevl)
						 {
						 case "1":
							 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'1',text:'L1-全国'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
							 break;
						 case "2":
							 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'2',text:'L2-省级'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
							 break;
						 case "3":
							 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'3',text:'L3-市级'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
							 break;
						 case "4":
							 $('#acct_admin_geo_lv').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'4',text:'L4-区县级'},data:[{value:'1',text:'L1-全国'},{value:'2',text:'L2-省级'},{value:'3',text:'L3-市级'},{value:'4',text:'L4-县区级'}]});
							 break;						 
						 }
					
						  
					 }
					
				}
				*/

				var geoLocation = account.geoLocation;

				var province = "";
				var city = "";
				var county = "";
				var address = "";
				
				if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
					geoLocation = JSON.parse(geoLocation);
					
					province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province;
					city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city;
					county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county;
					address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address;					
				} 

				if (province != undefined && province != null && province != "") {					
					addr_selector_set('acct_geo_province', province, 'acct_geo_city', city, "acct_geo_county", county);
					if(account != null && isNotEmptyString(account.geoLevel)){
						loadSubSearchLocation(account.geoLevel, province, city, county);
					}
				}
				$("#acct_geo_address").val(address);
				

			}
		
		 
	var Edit_Account = function(){
		$("#acc_edit_opt").click(function(){
			var flag = validateAccountInfo();
			if(flag){
				SaveAccountData();	
			}
							
		});
	}
	function validateAccountInfo(){	
		var flag=true;
		var acctemail = $("#acct_email").val();
		if(!onCheckEmpty($("#acct_username").val())){
            onAlertErrorTip('请输入用户名', document.getElementById('acct_username'));
            flag=false;
        }
		if(!onCheckEmpty($("#acct_cellphone").val())){
            onAlertErrorTip('请输入手机号码', document.getElementById('acct_cellphone'));
            flag=false;
        }
        if(!onCheckEmpty($("#acct_email").val())){
            onAlertErrorTip('请输入邮箱地址', document.getElementById('acct_email'))
            flag = false;
        }
        if(!checkEmail(acctemail)){
            onAlertErrorTip('邮箱格式不正确', document.getElementById('acct_email'));
            return false;
        }
    			
		return flag;
	}
	function SaveAccountData() {
		if (acctDetails == null) {
			acctDetails = {};
		}
		acctDetails.username = $("#acct_username").val();
		acctDetails.fullname = $("#acct_fullname").val();

		acctDetails.type = $("#AccountType").val();
		//alert(acctDetails.type);
		acctDetails.geoLevel = $("#acct_admin_geo_lv").val();
		//alert(curAcctGeoLevel);
		acctDetails.merchantName = $("#acct_merchant_name").val();
		acctDetails.email = $("#acct_email").val();
		acctDetails.cellNumber = $("#acct_cellphone").val();
		acctDetails.geoLocation = JSON.stringify(getAddress());
		curAccountTags = $("#acct_tags").val();
		
		if(__CONTEXT_MERCHANT_CODE=="ADMINISTRATOR" && __CONTENT_GEOLEVEL == '4'){
			//displayableAcctTypes.removeOnIndex(0); 
			return false;
		}
		//curAccountPermissions = acctTypePermCodeFilter(curAccountType, curAccountPermissions);
		/*
		if(!locationValidate()){
			return false;
		}
		*/
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : '/account/editaccount.htm',
			data : {
				'account.id' : acctDetails.id,
				'account.username' : acctDetails.username,
				'account.avatarPath' : acctDetails.avatarPath,
				'account.fullname' : acctDetails.fullname,
				'account.type' : acctDetails.type,
				'account.merchantName' : acctDetails.merchantName,
				'account.email' : acctDetails.email,
				'account.cellNumber' : acctDetails.cellNumber,
				'account.geoLevel' : acctDetails.geoLevel,
				'account.geoLocation' : acctDetails.geoLocation,
				'tags' : curAccountTags == null ? "" : curAccountTags,
				'permissions' : curAccountPermissions == null ? "" : curAccountPermissions.join(",")
			},
			success : function(data) {
				if (data.result != 'FAIL') {
					/* if(!acctDetails.id){
						acctDetails.id = data.accountId;
					}
					LoadAccountData(acctDetails.id); */
					onAlertError("帐号修改成功","ok");
					reloadEditPage(data.accountId);
					
					
				} else {
					onAlertError(data.message);
					return false;
				}
			},
			error : function(data) {
				onAlertError("帐号修改失败");
				return false;
			}
		});
	}
	function reloadEditPage(accountid){
		LoadAccountData(accountid);
	}

	function getAddress() {
		var province = addr_selector_field_get('acct_geo_province');
		var city = addr_selector_field_get('acct_geo_city');
		var county = addr_selector_field_get('acct_geo_county');
		var detailAddress = $("#acct_geo_address").val();
		
		return getObjectAddress(province, city, county, detailAddress);
	}
	function getObjectAddress(province, city, county, detailAddress) {
		detailAddress = detailAddress.replace("\r\n", " ").replace("\n", " ").replace("\r", " ");
		var address = {
				"province": province,
				"city": city,
				"county": county,
				"address": detailAddress
		};
		
		return address;
	}
	 function GetTypechange(){
	//		 alert("ssssssssssssssssssss");
	//		 alert($(this).selectItem);
			 }
	function drawAcctTypeDropDown() {
		/*
			$("#AccountType").onChange(function() {
				alert("aaaaaaaaaaa");
				var currAcctType_cn = $(this).text();

				$("#acct_type").html(currAcctType_cn + "&nbsp;&nbsp;<span class='caret'></span>");
				
				var currAcctType_en = getAccountTypeEnName(currAcctType_cn);
				curAccountType = currAcctType_en;
				if (acctDetails != null) {
					acctDetails.type = currAcctType_en;
				}
				
				if (currAcctType_cn == getAccountTypeCnName(ACCOUNT_TYPE.MERCHANT)) {
					$("#div_merchant_name").show();
				} else {
					$("#div_merchant_name").hide();
				}
				
				if (currAcctType_cn == getAccountTypeCnName(ACCOUNT_TYPE.ADMINISTRATOR)) {
					$("#div_admin_geo_level").show();
				} else {
					$("#div_admin_geo_level").hide();
				}
				
				drawAcctAdminLevelDropDown(); 
				
				refreshPermissionBox(curAccountType, curAccountPermissions, WHOLE_PERMISSIONS);

			});
			*/
		
	}
	
	
	/*user head pic modify for liuhualuo*/
	 var fileUploadInit = function(){
		 /*
		 IFileUpload.init({
			 clickSelector: "#acct_avatar",//出发上传窗口打开的selector
			 fileInputSelector: "#input_upload_file",//input type=file 的文件选择器
			 imgSelector: "#acct_avatar",//图片上传成功后，替换src的路径图片选择器
			 typeSupportDesc: "支持的文件类型: jpg、jpeg、png",
			 fileupload:{
				 url : "/account/uploadavatar.htm"
			 }
		 });
		 */
	}
	
	return {init:function(){
		LoadAccountLink();				
		getAccountInfo();
		Edit_Account();  
		fileUploadInit();
		drawAcctTypeDropDown();
	}}
}();


