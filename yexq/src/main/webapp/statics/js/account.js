/**
 * Created by wj on 2014/8/15.
 */

var ACCOUNT_TYPE = {'SUPER_MAN': 'SUPER_MAN', 'ADMINISTRATOR': 'ADMINISTRATOR', 'REPRESENTATIVE': 'REPRESENTATIVE', 'MERCHANT': 'MERCHANT', 'MANUFACTURER': 'MANUFACTURER', 'DEVICE_ADMIN': 'DEVICE_ADMIN'};
var ACCOUNT_TYPE_CONST = [{'SUPER_MAN': 'SUPER_MAN', 			'en_name': 'SUPER_MAN', 'cn_name': '超级管理员'},
    {'ADMINISTRATOR': 'ADMINISTRATOR', 	'en_name': 'ADMINISTRATOR', 'cn_name': '管理员'},
    {'REPRESENTATIVE': 'REPRESENTATIVE', 	'en_name': 'REPRESENTATIVE', 'cn_name': '代理商'},
    {'MERCHANT': 'MERCHANT', 				'en_name': 'MERCHANT', 'cn_name': '商户'},
    {'DEVICE_ADMIN': 'DEVICE_ADMIN',        'en_name': 'DEVICE_ADMIN', 'cn_name': '设备管理员'},
    {'MANUFACTURER': 'MANUFACTURER',        'en_name': 'MANUFACTURER', 'cn_name': '设备厂商'}];

var _ACCOUNT_TYPE = [
    //{'ACCOUNT_KEY': 'SUPER_MAN', 	   'en_name': 'SUPER_MAN',     'cn_name': '超级管理员'},
    {'ACCOUNT_KEY': 'ADMINISTRATOR',   'en_name': 'ADMINISTRATOR', 'cn_name': '管理员'},
    {'ACCOUNT_KEY': 'REPRESENTATIVE',  'en_name': 'REPRESENTATIVE','cn_name': '代理商'},
    {'ACCOUNT_KEY': 'MERCHANT', 	   'en_name': 'MERCHANT',      'cn_name': '商户'},
    {'ACCOUNT_KEY': 'DEVICE_ADMIN',    'en_name': 'DEVICE_ADMIN',  'cn_name': '设备管理员'},
    {'ACCOUNT_KEY': 'MANUFACTURER',    'en_name': 'MANUFACTURER',  'cn_name': '设备厂商'}];

var _WHOLE_PERMISSIONS = [{'cn_name': '下属管理员管理', 		'id': 'id_perm_subadmin_mgmt', 			'perm_code': 'SUBADMIN_MGMT', 		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR']},
    {'cn_name': '代理商管理', 		'id': 'id_perm_representative_mgmt', 	'perm_code': 'REPRESENTATIVE_MGMT', 'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR']},
    {'cn_name': '商户管理', 		'id': 'id_perm_merchant_mgmt', 			'perm_code': 'MERCHANT_MGMT',		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE']},
    {'cn_name': '用户管理', 		'id': 'id_perm_user_mgmt', 				'perm_code': 'USER_MGMT',			'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT']},
    {'cn_name': '设备管理', 		'id': 'id_perm_device_mgmt', 			'perm_code': 'DEVICE_MGMT',			'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT']},
    {'cn_name': 'WiFi门户管理', 	'id': 'id_perm_portal_mgmt', 			'perm_code': 'PORTAL_MGMT', 		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT']},
    {'cn_name': '基本信息管理', 		'id': 'id_perm_profile_mgmt', 			'perm_code': 'PROFILE_MGMT',		'default_account_type': ['SUPER_MAN', 'ADMINISTRATOR', 'REPRESENTATIVE', 'MERCHANT', 'MANUFACTURER', 'DEVICE_ADMIN']},
    {'cn_name': '系统设置管理', 		'id': 'id_perm_system_cfg_mgmt', 		'perm_code': 'SYSTEM_CFG_MGMT',		'default_account_type': ['SUPER_MAN']},
    {'cn_name': '设备厂商管理', 		'id': 'id_perm_manufacurer_mgmt', 		'perm_code': 'MANUFACTURER_MGMT',	'default_account_type': ['SUPER_MAN']},
    {'cn_name': '设备管理员管理', 	'id': 'id_perm_device_admin_mgmt', 		'perm_code': 'DEVICE_ADMIN_MGMT',	'default_account_type': ['SUPER_MAN']},
    {'cn_name': '厂商设备管理', 		'id': 'id_perm_manu_device_mgmt', 		'perm_code': 'MANU_DEVICE_MGMT',	'default_account_type': ['SUPER_MAN', 'MANUFACTURER', 'DEVICE_ADMIN']}];

var _ACCOUNT_GEO_LEVEL = [{"level": 1, "cn_name": "L1 - 全国"},
            {"level": 2, "cn_name": "L2 - 省级"},
            {"level": 3, "cn_name": "L3 - 市级"},
            {"level": 4, "cn_name": "L4 - 县区级"}];

var _UserName_Def = null;
var accountApp = function(){
	var accountSearchHandler = null;
	var search_account_keyword = null;
	var account_status = "";
	var checkacctflag = true;
	accountSearchHandler = new searchUtil(generateAcctListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"tbl_account_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
			"/account/searchaccount.htm","");

	var keywordsSearch = function() {
		$("div.ChinaNet-Page-Table").show();
		accountSearchHandler.clearResultSetpageNo();
		account_status = $("#accountStatus").val();
		accountSearchHandler.setSearchParemeter('status', account_status);
		var accountSearchKeywords = accountSearchHandler.convertKeywordsSearchable($("#accountkeywords").val());
		accountSearchHandler.setSearchParemeter('keywords', accountSearchKeywords);
		//accountSearchHandler.searchWithPreload();
		var searchAccountType = '';
		var searchAccountLevel = '';
		var searchSubAccount = '';
		if($("#accountType").val() == 'ADMIN_Lv1') {
			searchAccountType = 'ADMINISTRATOR';
			searchAccountLevel = 1;
		} else if($("#accountType").val() == 'ADMIN_Lv2') {
			searchAccountType = 'ADMINISTRATOR';
			searchAccountLevel = 2;
		} else if($("#accountType").val() == 'ADMIN_Lv3') {
			searchAccountType = 'ADMINISTRATOR';
			searchAccountLevel = 3;
		} else if($("#accountType").val() == 'ADMIN_Lv4') {
			searchAccountType = 'ADMINISTRATOR';
			searchAccountLevel = 4;
		} else if($("#accountType").val() == 'REPRESENTATIVE') {
			searchAccountType = 'REPRESENTATIVE';
			searchAccountLevel = 4;
		} else if($("#accountType").val() == 'MERCHANT') {
			searchAccountType = 'MERCHANT';
			searchAccountLevel = 4;
		} else if($("#accountType").val() == 'MANUFACTURER') {
			searchAccountType = 'MANUFACTURER';
			searchAccountLevel = 4;
		} else if($("#accountType").val() == 'DEVICE_ADMIN') {
			searchAccountType = 'DEVICE_ADMIN';
			searchAccountLevel = 4;
		} else if($("#accountType").val() == 'DIRECTSUB') {
			searchSubAccount = 'true';
		} 
		accountSearchHandler.setSearchParemeter('searchAccountType', searchAccountType);
		accountSearchHandler.setSearchParemeter('searchAccountLevel', searchAccountLevel);
		accountSearchHandler.setSearchParemeter('searchSubAccount', searchSubAccount);
		if(onCheckLength(accountSearchKeywords)){
			accountSearchHandler.searchWithPreload();
		}
		else{
			onAlertError('您输入的关键字太多，请重新输入');
		}
	}
	var onsearchAccount = function(){
		$("#btn_search_account").click(function() {
			keywordsSearch();
		});
	}
	

	var onCheckUserName = function(){   
	    	$("#AccountUsername").blur(function(){
	    		if($('input#AccountUsername').val() !== _UserName_Def){
	    		var username = $("#AccountUsername").val();		
	    		
	    		$.ajax({
	    			url: "/account/usernamevalidation.htm", 
	    		    type: 'GET',
	    		    dataType: 'json',
	    		    data: {id: "", username: username},
	    		    beforeSend :function(xmlHttp){ 
	    		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
	    		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
	    		    }, 
	    		    success: function (data) {
	    				if (data.result == 'OK') {
	    					checkacctflag = true;
	    				} 
	    				else { 
	    					
	    					if(data.message =="用户名已经存在"){
	    						checkacctflag=false;
	    						$("#acct_add").addClass("disabled");
	    						onAlertErrorTip('该用户名已经被使用，请重新输入', $('input#AccountUsername')[0]);
	    					}
	    					
	    				}
	    				
	    		    },
	    		    error: function (data) {
	    		    }
	    		});	
	    		}
	    	});		    	
	    }

    var initAccountSelect = function(){
        $('#accountStatus').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:'',text:'全部'},data:[{value:'',text:'全部'},{value:'NORMAL',text:'正常'},{value:'LOCKED',text:'锁定'}]})

    }
    
    var initAccountTypeSelect = function(){
    	if(__CONTEXT_MERCHANT_CODE == 'SUPER_MAN') {
        	$('#accountType').xiSelect({
        		offsetSize:[0,3,0,3],
        		defaultData:{value:'',text:'全部帐户类型'},
        		data:[{value:'',text:'全部'},
        		      {value:'ADMIN_Lv1',text:'全国级管理员'},
        		      {value:'ADMIN_Lv2',text:'省级管理员'},
        		      {value:'ADMIN_Lv3',text:'市级管理员'},
        		      {value:'ADMIN_Lv4',text:'区县级管理员'},
        		      {value:'REPRESENTATIVE',text:'代理商'},
        		      {value:'MERCHANT',text:'商户'},
        		      {value:'MANUFACTURER',text:'设备厂商'},
        		      {value:'DEVICE_ADMIN',text:'设备管理员'}]})
        } else if(__CONTEXT_MERCHANT_CODE == 'ADMINISTRATOR' && __CONTENT_GEOLEVEL == 1) {
        	$('#accountType').xiSelect({
        		offsetSize:[0,3,0,3],
        		defaultData:{value:'',text:'全部帐户类型'},
        		data:[{value:'',text:'全部'},
        		      {value:'DIRECTSUB',text:'直属下级帐户'},
        		      {value:'ADMIN_Lv2',text:'省级管理员'},
        		      {value:'ADMIN_Lv3',text:'市级管理员'},
        		      {value:'ADMIN_Lv4',text:'区县级管理员'},
        		      {value:'REPRESENTATIVE',text:'代理商'},
        		      {value:'MERCHANT',text:'商户'}]})
        } else if(__CONTEXT_MERCHANT_CODE == 'ADMINISTRATOR' && __CONTENT_GEOLEVEL == 2) {
        	$('#accountType').xiSelect({
        		offsetSize:[0,3,0,3],
        		defaultData:{value:'',text:'全部帐户类型'},
        		data:[{value:'',text:'全部'},
        		      {value:'DIRECTSUB',text:'直属下级帐户'},
        		      {value:'ADMIN_Lv3',text:'市级管理员'},
        		      {value:'ADMIN_Lv4',text:'区县级管理员'},
        		      {value:'REPRESENTATIVE',text:'代理商'},
        		      {value:'MERCHANT',text:'商户'}]})
        } else if(__CONTEXT_MERCHANT_CODE == 'ADMINISTRATOR' && __CONTENT_GEOLEVEL == 3) {
        	$('#accountType').xiSelect({
        		offsetSize:[0,3,0,3],
        		defaultData:{value:'',text:'全部帐户类型'},
        		data:[{value:'',text:'全部'},
        		      {value:'DIRECTSUB',text:'直属下级帐户'},
        		      {value:'ADMIN_Lv4',text:'区县级管理员'},
        		      {value:'REPRESENTATIVE',text:'代理商'},
        		      {value:'MERCHANT',text:'商户'}]})
        } else if(__CONTEXT_MERCHANT_CODE == 'ADMINISTRATOR' && __CONTENT_GEOLEVEL == 4) {
        	$('#accountType').xiSelect({
        		offsetSize:[0,3,0,3],
        		defaultData:{value:'',text:'全部帐户类型'},
        		data:[{value:'',text:'全部'},
        		      {value:'DIRECTSUB',text:'直属下级帐户'},
        		      {value:'REPRESENTATIVE',text:'代理商'},
        		      {value:'MERCHANT',text:'商户'}]})
        } else if(__CONTEXT_MERCHANT_CODE == 'REPRESENTATIVE') {
        	$('#accountType').xiSelect({
        		offsetSize:[0,3,0,3],
        		defaultData:{value:'',text:'全部帐户类型'},
        		data:[{value:'',text:'全部'},
        		      {value:'DIRECTSUB',text:'直属下级帐户'},
        		      {value:'MERCHANT',text:'商户'}]})
        } else {
        	$("#account_type_select").hide();
        }
    }

    var initAccountData = function(){
        if(typeof _AccountID!='undefined'){
            $.ajax({
                url:'/account/accountdetails.htm',
                type:'GET',
                dataType:'JSON',
                data:{accountId:_AccountID},
                async:false,
                success:function(data){
                    if(data.result=='OK'){
                        var Local = JSON.parse(data.account.geoLocation);
                        var provice = {
                            offsetSize:[0,3,0,3],
                            data:getProviceList(),
                            onChange:function(obj){
                                onChangeProvice($(obj).attr('data-value'));
                            }
                        };
                        var city = {offsetSize:[0,3,0,3],
                            onChange:function(obj){
                                onChangeCity($(obj).attr('data-value'));
                            }
                        };
                        var county = {offsetSize:[0,3,0,3]};
                        _AccountData = data.account;

                        _UserName_Def = data.account.username;
                        $('input#AccountUsername').val(data.account.username);
                        $('input#AccountFullname').val(data.account.fullname);
                        $('input#AccountType').xiSelect({
                            offsetSize:[0,3,0,3],
                            data:getAccountTypeList(),
                            defaultData:{value:data.account.type,text:getAccountTypeName(data.account.type)},
                            onChange:function(obj){
                                var changeKey = $(obj).attr('data-value');
                                if(changeKey=='MERCHANT'){
                                    $('div#AccountForMerchant').show();
                                    $('div#AccountForAdministrator').hide();
                                    $('div#AccountDescriptionDiv').show();
                                }else if(changeKey=='ADMINISTRATOR'){
                                    $('div#AccountForMerchant').hide();
                                    $('div#AccountForAdministrator').show();
                                    $('input#AccountGeoLevel').val(data.account.geoLevel);
                                    $('input#AccountGeoLevel-text').val(getAccountStepName(data.account.geoLevel));
                                    $('div#AccountDescriptionDiv').hide();
                                }else if(changeKey=='REPRESENTATIVE') {
                                    $('div#AccountForMerchant').hide();
                                    $('div#AccountForAdministrator').hide();
                                    $('input#AccountGeoLevel').val(4);
                                    $('input#AccountGeoLevel-text').val(getAccountStepName(4));
                                    $('div#AccountDescriptionDiv').hide();
                                } else if(changeKey=='MANUFACTURER') {
                                	$('div#AccountForAdministrator').hide();
                                	$('div#AccountForMerchant').hide();
                                } else if(changeKey=='DEVICE_ADMIN') {
                                	$('div#AccountForAdministrator').hide();
                                	$('div#AccountForMerchant').hide();
                                }

                                getAccountPermissionList(changeKey, data.account.permissions);
                            }
                        });
                        $('input#MerchantName').val(data.account.merchantName);
                        $('input#AccountGeoLevel').xiSelect({
                            offsetSize:[0,3,0,3],
                            data:getAccountStepList(),
                            defaultData:{value:data.account.geoLevel,text:getAccountStepName(data.account.geoLevel)}
                        });
                        $('input#AccountCellNumber').val(data.account.cellNumber);
                        $('input#AccountEmail').val(data.account.email);

                        if(typeof Local.province!='undefined'&&Local.province!=''){
                            provice.defaultData = {value:Local.province,text:Local.province}
                            city.data = getCityList(Local.province);
                        }
                        $('input#AccountProvice').xiSelect(provice);

                        if(typeof Local.city!='undefined'&&Local.city!=''){
                            city.defaultData = {value:Local.city,text:Local.city}
                            county.data = getCountyList(Local.province, Local.city);
                        }
                        $('input#AccountCity').xiSelect(city);
                        if(typeof Local.county!='undefined'&&Local.county!=''){
                            county.defaultData = {value:Local.county, text:Local.county}
                        }
                        $('input#AccountCounty').xiSelect(county);
                        $('input#AccountAddress').val((typeof Local.address!='undefined'?Local.address:''));
                        $('input#AccountTags').val(data.account.tags.join(' '));
                        $('input#AccountDescription').val(data.account.merchantDescription);

                        if(data.account.type=='MERCHANT') $('div#AccountForMerchant').show();
                        if(data.account.type=='ADMINISTRATOR') $('div#AccountForAdministrator').show();
                        getAccountPermissionList(data.account.type, data.account.permissions);
                        
                        if (isNotEmptyString(data.account.avatarPath)) {
                			$("#AccountAvatarThumb").attr('src', data.account.avatarPath);
                		}
                    }
                }
            });
        }
    }

    var onSaveAccountData = function(){
        $('form#SaveAccountDataForm').submit(function(){
        	var filterHtmlRe = /<script[\d\D]*>[\d\D]*<\/script>/g;
            var AccountData = {},SaveData={};
                showLoading();
                AccountData.username = $('input#AccountUsername').val().replace(filterHtmlRe, '');
                AccountData.fullname = $('input#AccountFullname').val().replace(filterHtmlRe, '');
                AccountData.type     = $('input#AccountType').val();
                AccountData.merchant = $('input#MerchantName').val().replace(filterHtmlRe, '').replace(/[~'!<>]/g, '');
                AccountData.geolevel = $('input#AccountGeoLevel').val();
                AccountData.cellnumber= $('input#AccountCellNumber').val();
                AccountData.email    = $('input#AccountEmail').val();
                AccountData.geolocation = '{"province":"'+$('input#AccountProvice').val()+'","city":"'+$('input#AccountCity').val()+'","county":"'+$('input#AccountCounty').val()+'","address":"'+string2Json($('input#AccountAddress').val().replace(/[~'!<>]/g, ''))+'"}';
                AccountData.tags = ($('input#AccountTags').val()+'').replace(/[~'!<>]/g, '').replace(/\s+/ig, ',');
                AccountData.merchantDescription = $('input#AccountDescription').val().replace(/[~'!<>]/g, '');
                AccountData.permissions = [];
                $('div.Form-Item-Checkbox').each(function(){
                    if($(this).hasClass('Form-Checked')){
                        AccountData.permissions.push($(this).find('input').val());
                    }
                });
                AccountData.permissions = AccountData.permissions.join(',');
                if(_AccountData!=null){
                    AccountData.accountId=_AccountData.id;
                }else{
                    AccountData.accountId=null;
                }

            /**
             * 检查数据完整性
             */
            if(!chkUserName(AccountData.username)){
                closeLoading();
                onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线或.组成', $('input#AccountUsername')[0]);
                return false;
            }
            if(AccountData.username.length > 50){
            	closeLoading();
            	onAlertErrorTip('用户名不能超过50个字符', $('input#AccountUsername')[0]);
            	return false;
            }
                        
            /*
            if(!onCheckLength(AccountData.username)){
                closeLoading();
                onAlertErrorTip('您输入的字数太多，请重新输入', $('input#AccountUsername')[0]);
                return false;
            }
            */          
            if(!checkacctflag){          	
                closeLoading();
                onAlertErrorTip('该用户名已经被使用，请重新输入', $('input#AccountUsername')[0]);
                return false;
            }
            if(!chkUserName(AccountData.fullname)){
                closeLoading();
                onAlertErrorTip('姓名不能为空，且必须由中英文、数字、下划线或.组成', $('input#AccountFullname')[0]);
                return false;
            }
            if(AccountData.fullname.length > 50){
                closeLoading();
                onAlertErrorTip('姓名不能超过50个字符', $('input#AccountFullname')[0]);
                return false;
            }
            if(!onCheckLength(AccountData.merchant)){
                closeLoading();
                onAlertErrorTip('您输入的字数太多，请重新输入', $('input#MerchantName')[0]);
                return false;
            }
            if(!onCheckEmpty(AccountData.type)){
                closeLoading();
                onAlertErrorTip('请选择帐号类型', $('input#AccountType-text')[0]);
                return false;
            }
            if(AccountData.type=='MERCHANT' && !onCheckEmpty(AccountData.merchant)){
                closeLoading();
                onAlertErrorTip('请输入商户名称', $('input#MerchantName')[0]);
                return false;
            }
            if(AccountData.type=='ADMINISTRATOR'){
                if(!onCheckEmpty(AccountData.geolevel)){
                    closeLoading();
                    onAlertErrorTip('请选择管理员级别', $('input#AccountGeoLevel-text')[0]);
                    return false;
                }
            }
            //if(AccountData.type=='ADMINISTRATOR'){
                if(!checkMobile(AccountData.cellnumber)){
                    closeLoading();
                    onAlertErrorTip('请填写正确的手机号码', $('input#AccountCellNumber')[0]);
                    return false;
                }
            //}
            if(!onCheckEmpty(AccountData.email)){
                closeLoading();
                onAlertErrorTip('请填写正确的邮箱帐号', $('input#AccountEmail')[0]);
                return false;
            }else{
                if(!checkEmail(AccountData.email)){
                    closeLoading();
                    onAlertErrorTip('邮箱格式不正确！', $('input#AccountEmail')[0]);
                    return false;
                }
            }
            
            if(!onCheckEmpty($("input#AccountProvice").val()) || $("input#AccountProvice").val()=='请选择'){
            	closeLoading();
	        	onAlertErrorTip('请选择省', $("div#AccountProviceList")[0]);
				return false;
	        }
	        if(!onCheckEmpty($("input#AccountCity").val()) || $("input#AccountCity").val()=='请选择'){
	        	closeLoading();
	        	onAlertErrorTip('请选择市', $("div#AccountCityList")[0]);
				return false;
	        }
	        if(AccountData.tags.length>150){
	        	closeLoading();
	        	onAlertErrorTip('您输入的字数太多，请重新输入', $('input#AccountTags')[0]);
                return false;
	        }
	        if(AccountData.type=='MANUFACTURER'){
                if(!onCheckEmpty(AccountData.fullname)){
                    closeLoading();
                    onAlertErrorTip('请填写姓名', $('input#AccountFullname')[0]);
                    return false;
                }
            }
	        if(AccountData.permissions.length==0){
                closeLoading();
                onAlertErrorTip('请选择帐号系统权限', $('div.Form-Item-Checkbox').eq(0).find('input')[0]);
                return false;
            }
            /* 结束检查 */

            $.ajax({
                url:'/account/editaccount.htm',
                type:'POST',
                dataType:'JSON',
                data:{
                    'account.id':AccountData.accountId,
                    'account.username' : AccountData.username,
                    'account.fullname' : AccountData.fullname,
                    'account.type' : AccountData.type,
                    'account.merchantName' : AccountData.merchant,
                    'account.email' : AccountData.email,
                    'account.cellNumber' : AccountData.cellnumber,
                    'account.geoLevel' : AccountData.geolevel,
                    'account.geoLocation' : AccountData.geolocation,
                    'account.merchantDescription':AccountData.merchantDescription,
                    'tags' : AccountData.tags,
                    'permissions' : AccountData.permissions
                },
                async:false,
                success:function(data){
                    if(data.result=='OK'){
                        $.ajax({
                            url:'/account/viewaccountdetails.htm?accountId='+data.accountId,
                            type:'GET',
                            dataType:'HTML',
                            async:false,
                            success:function(msg){
                                $('div.ChinaNet-Free-Body').html(msg);
                                //closeLoading();
                            }
                        });
                    }else{
                        closeLoading();
                        onAlertError(data.message);
                        return false;
                    }
                }
            })
            return false;
        });
    }

    var initAccountType = function(){
        $('input#AccountType').xiSelect({
            offsetSize:[0,3,0,3],
            data:getAccountTypeList(),
            defaultData:{value:'',text:''},
            onChange:function(obj){
                var changeKey = $(obj).attr('data-value');

                if(changeKey=='MERCHANT'){
                    $('div#AccountForMerchant').show();
                    $('div#AccountForAdministrator').hide();
                    $('div#AccountDescriptionDiv').show();
                }else if(changeKey=='ADMINISTRATOR'){
                    $('div#AccountForMerchant').hide();
                    $('div#AccountForAdministrator').show();
                    $('div#AccountDescriptionDiv').hide();
                }else if(changeKey=='REPRESENTATIVE'){
                    $('div#AccountForMerchant').hide();
                    $('div#AccountForAdministrator').hide();
                    $('input#AccountGeoLevel').val(4);
                    $('input#AccountGeoLevel-text').val(getAccountStepName(4));
                    $('div#AccountDescriptionDiv').hide();
                }else if(changeKey=='MANUFACTURER') {
                    $('div#AccountForAdministrator').hide();
                    $('div#AccountForMerchant').hide();
                    $('input#AccountGeoLevel').val(4);
                }else if(changeKey=='DEVICE_ADMIN') {
                    $('div#AccountForAdministrator').hide();
                    $('div#AccountForMerchant').hide();
                    $('input#AccountGeoLevel').val(4);
                }
                getAccountPermissionList(changeKey,'');
            }
        });
    }

    var onCancelAccountEdit = function(){
        $('button#AccountEditCancel').click(function(){
            if(_AccountData!=null){
                $.ajax({
                    url:'/account/viewaccountdetails.htm?accountId='+_AccountData.id,
                    type:'GET',
                    dataType:'HTML',
                    async:false,
                    success:function(data){
                        $('div.ChinaNet-Free-Body').html(data);
                    }
                });
            }else{
                $.ajax({
                    url:'/account/account_management.htm',
                    type:'GET',
                    dataType:'HTML',
                    async:false,
                    success:function(data){
                        $('div.ChinaNet-Free-Body').html(data);
                    }
                });
            }
        })
    }

    var onChangeAvatarImage = function(){
        $('a#ChangeAvatarButton').click(function(){
            onChangePicture('#AccountAvatarThumb', false,640,640);
        });
    }
    
   

    var initLocationSelect = function(){
        $('input#AccountProvice').xiSelect({
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            defaultData:{value:'',text:''},
            onChange:function(obj){
                onChangeProvice($(obj).attr('data-value'));
            }
        });
        $('input#AccountCity').xiSelect({
            offsetSize:[0,3,0,3],
            data:[],
            defaultData:{value:'',text:''},
            onChange:function(obj){
                onChangeCity($(obj).attr('data-value'));
            }
        });
        $('input#AccountCounty').xiSelect({
            offsetSize:[0,3,0,3],
            data:[],
            defaultData:{value:'',text:''}
        });
    }

    var initAccountStep = function(){
        $('input#AccountGeoLevel').xiSelect({
            offsetSize:[0,3,0,3],
            data:getAccountStepList(),
            defaultData:{value:'',text:''}
        });
    }


	return {init:function(){
		accountSearchHandler.searchWithPreload();
		$("#keywords").keypress(function(e) {
			if(e.which == 13) {
				keywordsSearch();
				return false;
		    }
		});
		onsearchAccount();
		initAccountSelect();
		initAccountTypeSelect();
	},
    veiw:function(){

    },
    edit:function(){
        initAccountData();
        onChangeAvatarImage();                        	
        onCheckUserName();        
        onSaveAccountData();
        onCancelAccountEdit();
    },
    add:function(){
        initAccountType();
        initLocationSelect();
        initAccountStep();
        onCheckUserName();
        onSaveAccountData();
        onCancelAccountEdit();
    }}
}();

/**
 * 获取地区列表
 * @param provice
 */
function onChangeProvice(provice){
    $('div#AccountCityList').html('<input type="text" id="AccountCity" name="AccountCity">');
    $('div#AccountCountyList').html('<input type="text" id="AccountCounty" name="AccountCounty">');
    $('input#AccountCity').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#AccountCounty').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}


/**
 * 根据地区获取城市列表
 * @param city
 */
function onChangeCity(city){
    $('div#AccountCountyList').html('<input type="text" id="AccountCounty" name="AccountCounty">');
    $('input#AccountCounty').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#AccountProvice').val(),city),
        defaultData:{value:'',text:''}
    });
}


/**
 * 帐号类型权限表
 * @param type
 * @returns {Array}
 */
function getAccountPermissions(type){
    var perm = [];
    for(var px=0;px<_WHOLE_PERMISSIONS.length;px++){
        var pstr = ','+_WHOLE_PERMISSIONS[px].default_account_type.join(',')+',';
        if(pstr.indexOf(type)>-1){
            perm.push({text:_WHOLE_PERMISSIONS[px].cn_name,value:_WHOLE_PERMISSIONS[px].perm_code});
        }
    }
    return perm;
}


/**
 * 打开帐号类型的权限
 * @param type
 * @param account
 */
function getAccountPermissionList(type,account){
    var p = getAccountPermissions(type);
    var m = account.length>0?','+account.join(',')+',':'';
    var t = '';
    if(p.length>0){
        for(var px=0;px<p.length;px++){
        	if(p[px].value == 'PROFILE_MGMT'){
        		t += '<div class="Form-Item-Checkbox Form-Checked ChinaNet-Col-4 noread">' +
                '<span class="CheckInput"><input type="Checkbox" checked disabled onclick="return false" id="AccountPermission" value="'+ p[px].value +'"></span>' +
                '<span class="CheckText">'+p[px].text+'</span>' +
                 '</div>';
        	}else if(m.indexOf(p[px].value)>-1){
                t += '<div class="Form-Item-Checkbox Form-Checked ChinaNet-Col-4">' +
                   '<span class="CheckInput"><input type="Checkbox" checked id="AccountPermission" value="'+ p[px].value +'"></span>' +
                   '<span class="CheckText">'+p[px].text+'</span>' +
                    '</div>';
            }else{
                t += '<div class="Form-Item-Checkbox ChinaNet-Col-4">' +
                    '<span class="CheckInput"><input type="Checkbox" id="AccountPermission" value="'+ p[px].value +'"></span>' +
                    '<span class="CheckText">'+p[px].text+'</span>' +
                    '</div>';
            }
        }
    }

    $('div#AccountPermissionModule').html(t);
}





function generateAcctListHtml(accountList) {
	var acctListHtml = "";

	if (accountList.length > 0) {

		for (var i = 0; i < accountList.length;i++) {
			var id = accountList[i].id;
			var username = accountList[i].username;
			var fullname = accountList[i].fullname;
			fullname = !isNotEmptyString(fullname) ? "": fullname;
			var cellphone = accountList[i].cellNumber;
			var type = accountList[i].type;
			var cn_type_name = accountList[i].type;
			var status = accountList[i].status;
			var geoLocation = accountList[i].geoLocation;
			var cellNumber = accountList[i].cellNumber;
			var deviceCount = accountList[i].deviceCount;

			var province = "";
			var city = "";
			var county = "";
			var address = "";

			if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
				geoLocation = JSON.parse(geoLocation);

				province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
				city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
				county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
				address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
			}


			var tags = accountList[i].tags.join(", ");
			var tags1 = accountList[i].tags.join(", ");

			if (tags.length > 12) {
				//tags = tags.substring(0, tags.indexOf(",", 9));
				tags = tags.substring(0, 12);
			}

			var createDatetime = accountList[i].createDatetime;

			acctListHtml += "<tr id='account_" +id+ "' class='ChinaNet-Table-Body'>";
			acctListHtml +=     "<td><a href='viewaccountdetails.htm?accountId="+id+"' data-public-params='"+id+"' class='initAjax Table-Data-Name-Link'>" + username + "</a>";
			acctListHtml +=     "<span class='Table-Data-Text'>" + fullname + "</span></td>";
			acctListHtml +=     "<td><span class='Table-Data-Name'>" + generate_cn_typename(cn_type_name)+ "</span></td>";
			//var wholeAddress = address;
			acctListHtml += 	"<td>";
			//acctListHtml += wholeAddress;
			acctListHtml += 	"<span class='Table-Data-Name'>"+province + city + county;
			acctListHtml += 	"</span><span class='Table-Data-Text'>"+ cellNumber +"</span>" ;
			acctListHtml += 	"</td>";
			acctListHtml +=     "<td><span class='Table-Data-Name'>"+deviceCount+"</span></td>"
			acctListHtml +=     "<td><span class='Table-Data-Name-Nobold'>"+createDatetime+"</span></td>"
			acctListHtml += "<td id='td_account_"+id+"'> <span class='Table-Data-Status'> "+ StatusSpan(status) +"</span></td>";
			acctListHtml += "<td class='ChinaNet-Form-Sheet Width-For-Button' id='account_opt_btn_" + id + "'>";

			acctListHtml += generateAccountOptBtn(id,status);

			acctListHtml +=     "</td>";
			acctListHtml += "</tr>";
		}
	}
	else{
		$("#accountlistpage").hide();
	}

	return acctListHtml;
}
function generate_cn_typename(cn_type_name){
	var cn_typenamehtml="";
	if(cn_type_name=="SUPER_MAN")
	{
		cn_typenamehtml="超级管理员";
	}
	else if(cn_type_name=="ADMINISTRATOR"){
			cn_typenamehtml="管理员";
		}
	else if(cn_type_name=="REPRESENTATIVE"){
		cn_typenamehtml="代理商";
	}
	else if(cn_type_name=="MERCHANT") {
		   cn_typenamehtml="商户";
	}
	else if(cn_type_name=="MANUFACTURER") {
		cn_typenamehtml="设备厂商";
	}
	else if(cn_type_name=="DEVICE_ADMIN") {
		cn_typenamehtml="设备管理员";
	}

return cn_typenamehtml;

}
function generateAccountOptBtn(accountid, accountStatus) {
	var accountOptBtnHtml = "";
	if (accountid != null) {
		if (accountStatus == "NORMAL") {
			accountOptBtnHtml += 	"<button class='Form-Primary' id='acct_inactive_" + accountid + "' onclick='javascript:setstatus(" + accountid + ",\"LOCK\")'>";
			accountOptBtnHtml +=    	"<span>锁定</span>";
			accountOptBtnHtml +=    "</button>";
		} else if (accountStatus == "LOCKED") {
			accountOptBtnHtml += 	"<button class='Form-Default' id='acct_active_" + accountid + "' onclick='javascript:setstatus(" + accountid + ",\"UNLOCK\")'>";
			accountOptBtnHtml +=    	"<span>解锁</span>";
			accountOptBtnHtml +=    "</button>";
		}
	}

	return accountOptBtnHtml;
}


function getAccountTypeName(account,name){
    for(var ax=0;ax<_ACCOUNT_TYPE.length;ax++){
        if(_ACCOUNT_TYPE[ax].ACCOUNT_KEY==account){
            if(typeof name!='undefined'){
                return _ACCOUNT_TYPE[ax].en_name;
            }else{
                return _ACCOUNT_TYPE[ax].cn_name;
            }
        }
    }
}

function getAccountTypeList(name){
    var menu = [];
    for(var ax=0;ax<_ACCOUNT_TYPE.length;ax++){
        if(typeof name!='undefined') {
            menu.push({value: _ACCOUNT_TYPE[ax].ACCOUNT_KEY, text:_ACCOUNT_TYPE[ax].en_name})
        }else{
            menu.push({value: _ACCOUNT_TYPE[ax].ACCOUNT_KEY, text:_ACCOUNT_TYPE[ax].cn_name})
        }
    }
    // 请说明解决问题？
    if(__CONTEXT_MERCHANT_CODE == ACCOUNT_TYPE.ADMINISTRATOR && __CONTENT_GEOLEVEL == _ACCOUNT_GEO_LEVEL[3].level){
    	menu.shift();
    }
    // 代理商只能添加商户
    if(__CONTEXT_MERCHANT_CODE=='REPRESENTATIVE'){
    	menu.shift();
    	menu.shift();
    }
    // 非超级管理员不允许添加设备厂商
    if(__CONTEXT_MERCHANT_CODE!='SUPER_MAN'){
    	menu.pop();
    	menu.pop();
    }
    return menu;
}

function getAccountStepName(key){
    for(var sx=0;sx<_ACCOUNT_GEO_LEVEL.length;sx++){
        if(_ACCOUNT_GEO_LEVEL[sx].level==key){
            return _ACCOUNT_GEO_LEVEL[sx].cn_name;
        }
    }
}
function accountGeoLevelSort() {
	return _ACCOUNT_GEO_LEVEL.sort(function(a, b) {return a.level - b.level;});
}
function getEditableGeoLevel(optAcctGeoLevel, optAcctType) {
	var geo_levels = accountGeoLevelSort();
	var retGeoLevels = [];	
	if (((optAcctGeoLevel == null || optAcctGeoLevel == undefined) && (optAcctType == null || optAcctType == undefined))
			|| optAcctType == ACCOUNT_TYPE.SUPER_MAN) {
		return geo_levels;
	}	
	var nAcctGeoLevel = parseInt(optAcctGeoLevel);
	
	if (typeof nAcctGeoLevel === 'number') {
		for (var i = 0; i < geo_levels.length; i++) {
			if (nAcctGeoLevel < geo_levels[i].level) {
				retGeoLevels.push(geo_levels[i]);
			}
		}		
		return retGeoLevels.sort(function(a, b) {return a.level - b.level;});
	}	
	return null;
}
function getAccountStepList(){
    var step = [];
    var adminLevels = null;	
	adminLevels = getEditableGeoLevel(__CONTENT_GEOLEVEL, __CONTEXT_MERCHANT_CODE);
    for(var sx=0;sx<adminLevels.length;sx++){
        step.push({value:adminLevels[sx].level,text:adminLevels[sx].cn_name});
    }

    return step;
}


function setstatus(accountid,type){
	  $.ajax({
			type:'POST',
			dataType:'json',
			url: '/account/accountlock.htm',
			data: {
				'accountid': accountid,
				'type': type
			},
			success: function(data) {
				if (data.result != 'FAIL' && data.accountstatus != null) {
					var accountOptBtnHtml = generateAccountOptBtn(accountid, data.accountstatus);
					// alert(accountOptBtnHtml);
					$("#account_opt_btn_" + accountid).html(accountOptBtnHtml);
					var accountstatusHtml = generateAccountStatusHtml(accountid, data.accountstatus);

					$("#td_account_" + accountid).html(accountstatusHtml);
				}
				else {
		           return false;
				}
			},
			error: function() {
	           return false;
			}
		});

}
function blockAccount(accountid) {
	setstatus(accountid, "LOCK");
}

function unblockAccount(accountid) {
	setstatus(accountid, "UNLOCK");
}


function generateAccountStatusHtml(accountid,status){
	var statushtml="";
	statushtml += "<span class='Table-Data-Status'> "+ StatusSpan(status) +"</span>";
	$("#td_account_"+accountid).html(statushtml);

}
function StatusSpan(Status) {
	var statushtml="";
	if(Status != null){
		if (Status == "NORMAL" || Status == "normal") {
			statushtml += "<span class='Table-Data-Status-Photo Table-Flow-Unlocked'></span>";
		}
		else{
			statushtml += "<span class='Table-Data-Status-Photo Table-Flow-Locked'></span>";
		}
	}
	return statushtml;
}
function searchFailCallBack(result, message) {
	onAlertError(message);
	return false;
}

function searchErrorCallBack(data, message) {
	onAlertError('加载帐号数据请求提交失败！');
	return false;
}

//检测用户名、姓名是否包含非法字符
function chkUserName(str){
	var reg = /^[A-Za-z0-9\._'\u4e00-\u9fa5]+$/ig;
	return (reg.test(str));
}


var deviceButton = function(accountid,status){
	var jsonMenu={menuItems:[{url:'javascript:;',text:'设置'}]};
	var menuItems=jsonMenu.menuItems;
	var state="";
	if(status == "LOCKED"){
		state="UNLOCK";
		jsonMenu.menuItems.unshift({url:'javascript:setstatus(' +accountid + ',\''+state+'\');',text:'解锁'});
	}else{
		state="LOCK";
		jsonMenu.menuItems.unshift({url:'javascript:setstatus(' +accountid + ',\''+state+'\');',text:'锁定'});
	}

	return menuItems;
}


