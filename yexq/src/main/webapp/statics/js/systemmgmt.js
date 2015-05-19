/**
 * Created by cx on 14-8-23.
 */

var _initSiteID=null;
var _siteData = null;
var systemmgmtApp = function(){
	var permitedAuthTypes = null;
	var LoadSystemData = function() {
		$.ajax({
            type: 'GET',
            dataType: 'json',
            url: "/system/platformsettings.htm",
            data: { "details": "true" },
		    beforeSend :function(xmlHttp){ 
		    	xmlHttp.setRequestHeader("If-Modified-Since","0"); 
		    	xmlHttp.setRequestHeader("Cache-Control","no-cache"); 
		    }, 
            success: function (data) {
                if (data.result == 'OK') {
                	if (isNotEmptyString(data.settings)) {
    					var settings = data.settings;
    					if (settings != null && settings.length > 0) {
    						for (var i = 0; i < settings.length;i++) {
    							if (settings[i].cfg_key == SYSTEM_ITEMS.AUTH_TYPES) {
    								permitedAuthTypes = JSON.parse(settings[i].cfg_value);
    								
    								renderAuthTypes(permitedAuthTypes);
    							}
    							else if (settings[i].cfg_key == SYSTEM_ITEMS.SMS_GATEWAY) {
    								if (isNotEmptyString(settings[i].cfg_value)) {
        								var sms_gatewaies = JSON.parse(settings[i].cfg_value);
        								/* {"TELCOM": telcomeGw, "UNICOM": unicomGw, "MOBILE": mobileGw} */
        								$("#sms_telcom_gateway").text(sms_gatewaies.TELCOM);
        								$("#sms_unicom_gateway").text(sms_gatewaies.UNICOM);
        								$("#sms_mobile_gateway").text(sms_gatewaies.MOBILE);
    								}
    							}
    							else if (settings[i].cfg_key == SYSTEM_ITEMS.OPERATION_LOG_SIZE) {
    								
    							}else if(settings[i].cfg_key=='default_site_id'){
    								//alert(settings[i].cfg_value);
    								_initSiteID = settings[i].cfg_value;
    								if(_siteData){
    									$('#siteid').xiSelect({offsetSize:[0,3,0,3],data:_siteData.dataList,defaultData:{value:_initSiteID,text:_siteData.data[_initSiteID]}});
    								}
    								//$('#siteid').xiSelect({defaultData:{value:settings[i].cfg_value,text:'广告测试勿动'}});
    							}else if(settings[i].cfg_key == SYSTEM_ITEMS.SMS_UNIT_PRICE){
    								$('#sms_unit_price').val(settings[i].cfg_value);
    							}
    						}
    					}
                	}
                	else {
                		renderAuthTypes(null);
                	}
                } else {
                   
                }
            },
            error: function (data) {
                
            }
		});
    }
	var onCancel = function(){
		$("#btn_cancel_changes").click(function() {
			LoadSystemData();
		});
	}
	var onSave = function(){
		$("#btn_save_configs").click(function() {
			var settings = [];
			
			if (permitedAuthTypes != null && permitedAuthTypes.length > 0) {
				var authTypes = [];
				for (var i = 0; i < permitedAuthTypes.length;i++) {
					authTypes.push(permitedAuthTypes[i]);
				}
				settings.push({ "cfg_key": SYSTEM_ITEMS.AUTH_TYPES, "cfg_value": JSON.stringify(authTypes)});
			}
			
			var smsTelcomGateway = $("#sms_telcom_gateway").val();
			var smsUnicomGateway = $("#sms_unicom_gateway").val();
			var smsMobileGateway = $("#sms_mobile_gateway").val();
			var smsGatewaies = encodeSmsGateway(smsTelcomGateway, smsUnicomGateway, smsMobileGateway);

			if (isNotEmptyString(smsGatewaies)) {
				settings.push({ "cfg_key": SYSTEM_ITEMS.SMS_GATEWAY, "cfg_value": JSON.stringify(smsGatewaies)});
			}
			
			if($('input#siteid').val()==''){
				onAlertErrorTip('请设置默认WIFI门户站点', document.getElementById('siteid'));
				return false;
			}else{
				settings.push({cfg_key:'default_site_id',cfg_value:$('input#siteid').val()});
			}
			
			var smsUnitPrice = $("#sms_unit_price").val();
			var regu = /^(\d+)(\.?)(\d{0,2})$/; 
			var re = new RegExp(regu); 
			if(!re.test(smsUnitPrice)){
				onAlertErrorTip('短信价格格式不正确', document.getElementById('sms_unit_price'));
				return false;
			}else{
				settings.push({cfg_key:SYSTEM_ITEMS.SMS_UNIT_PRICE, cfg_value:smsUnitPrice});
			}
			
			$.ajax({
	            type: 'POST',
	            dataType: 'json',
	            url: "/system/saveplatformsettings.htm",
	            data: { "settings": JSON.stringify(settings) },
	            success: function (data) {
	                if (data.result == 'OK') {
	                	onAlertError("系统配置保存成功 ","ok");
	                } else {	                    
	                    onAlertError("系统配置保存失败 ,"+data.message);
	                    return false;
	                }
	            },
	            error: function (data) {	                
	                onAlertError("系统配置保存失败");
	                return false;
	            }
			});
			
		});
	}
	var initPortalSelect = function(){		
		$.ajax({
			url:'/merchant/getdefaultsites.htm',
			type:'GET',
			dataType:'json',
			async:false,
			success:function(data){
				if(data.result=='OK'){
//					var jsonObj2={DefaultSites:[]};
//					var DefaultSites=jsonObj2.DefaultSites;
					_siteData = {dataList:[], data:{}};
					for(i=0;i<data.records.length;i++){
//						jsonObj2.DefautSites.push({value:data.records[i].id,text:data.records[i].name});
						_siteData.dataList.push({value:data.records[i].id,text:data.records[i].name});
						_siteData.data[data.records[i].id] = data.records[i].name;
					}
					if(_initSiteID){
						$('#siteid').xiSelect({offsetSize:[0,3,0,3],data:_siteData.dataList,defaultData:{value:_initSiteID,text:_siteData.data[_initSiteID]}});
					}
				}
			}
		});
		    	
    }
	var renderAuthTypes = function(authTypes) {
		var div_permited_auth_types = $("#permited_auth_types");
		div_permited_auth_types.children().remove();
		div_permited_auth_types.html(generateAuthTypeHtml(authTypes));
		
		$(".auth-type-selector").change(function() {
			var selector_id = this.id.substring('selector_'.length);
			
			if (permitedAuthTypes == null) {
				permitedAuthTypes = [];
			}
			if (this.checked) {
				var isExisted = false;
				for (var i =0; i < permitedAuthTypes.length; i++) {
					if (permitedAuthTypes[i] == selector_id){
						isExisted = true;
					}
				}
				if (!isExisted) {
					permitedAuthTypes.push(selector_id);
				}
			}
			else {
				permitedAuthTypes.remove(selector_id);
			}
		});
	}
	var generateAuthTypeHtml = function(permitedAuthTypes) {
		var authTypeHtml = "";
		
		for (var i =0; i< PORTAL_AUTH_TYPE.ALL_TYPES.length; i++) {
			var enName = PORTAL_AUTH_TYPE.ALL_TYPES[i].en_name;
			var cnName = PORTAL_AUTH_TYPE.ALL_TYPES[i].cn_name;
			var oneAuthTypeHtml = "";
			var isAuthTypePermitd = false;
			
			oneAuthTypeHtml += 	"<div class='Auth-Type-Item'>";
			oneAuthTypeHtml += 		"<a href='javascript:;'>";
			
			if (permitedAuthTypes != null && permitedAuthTypes.length > 0) {
				for (var j =0; j < permitedAuthTypes.length;j++) {
					if (permitedAuthTypes[j] == enName) {
						isAuthTypePermitd = true;
						break;
					}
				}
			}
			if (isAuthTypePermitd) {
				oneAuthTypeHtml +=			"<input id='selector_" + enName + "' checked='checked' class='auth-type-selector' type='checkbox'>";
			}
			else {
				oneAuthTypeHtml +=			"<input id='selector_" + enName + "' class='auth-type-selector' type='checkbox'>";
			}
			oneAuthTypeHtml +=				cnName;
			
			oneAuthTypeHtml += 		"</a>";
			oneAuthTypeHtml += 	"</div>";
			
			authTypeHtml += oneAuthTypeHtml;
		}

		return authTypeHtml;
	}
	var encodeSmsGateway = function(telcomeGw, unicomGw, mobileGw) {
		telcomeGw = telcomeGw == null ? "" : telcomeGw;
		unicomGw = unicomGw == null ? "" : unicomGw;
		mobileGw = mobileGw == null ? "" : mobileGw;
		
		return {"TELCOM": telcomeGw, "UNICOM": unicomGw, "MOBILE": mobileGw}
	}
	return {init:function(){	
		LoadSystemData();
		initPortalSelect();
		onSave();
		onCancel();
    }}
}();
/**
 * system configuration
 *
 * @param
 */
var SYSTEM_ITEMS = {
		"AUTH_TYPES": "auth_types", 
		"SMS_GATEWAY": "sms_gateway",
		"OPERATION_LOG_SIZE":"operation_log_size",
		"SMS_UNIT_PRICE": "sms_unit_price"
};