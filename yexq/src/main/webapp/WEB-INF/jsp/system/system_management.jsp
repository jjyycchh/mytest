<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<style>
.wifi-portal-body{
padding-bottom:150px;
}
.permited-auth-types {
    background: none repeat scroll 0 0 #FAFAFA;
    border: 1px solid #DFDFDF;
    border-radius: 6px;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 5px;
}

.auth-type-item {
    background: none repeat scroll 0 0 #FAFAFA;
    border: 1px solid #DFDFDF;
    border-radius: 6px;
    overflow-x: hidden;
    overflow-y: hidden;
    padding: 5px;
    cursor: pointer;
    margin:5px;
}
.auth-type-item:hover { 
	background: none repeat scroll 0 0 #FFFFFF; 
}
</style>
<div class="clear-line"></div>

<div class="wifi-portal-body">
	<div class="portal-menu">
		<a href="${pageContext.request.contextPath}/system/system_management.htm" id="platformsetting" class="active">平台设置<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
		<a href="${pageContext.request.contextPath}/system/portaltemplatemanagement.htm" id="portalsetting">模板设置<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/systemthirdpartaccess.htm" id="portalsetting">第三方接入<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/publishcomponent.htm" id="componentsetting">组件库<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/super_searchsms.htm">短信查询<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/user/super_authen_mgmt.htm">用户认证记录<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/super_exception_log.htm">异常日志导出<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/super_device_status.htm">设备状态查询<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
	   	<a href="${pageContext.request.contextPath}/system/letsmakeitinaneasyway.htm" >设备导入<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
 	   <%-- <a href="${pageContext.request.contextPath}/system/system_firmware_publish.htm">固件发布<span class="glyphicon glyphicon-circle-arrow-right"></span></a> --%>
	</div>
	<div class="portal-main">
	<div class="col-md-12">
		<form class="form-horizontal bs-example bs-example-form" role="form">
			<div class="form-group">
				<label for="sms_telcom_gateway" class="col-sm-3 control-label">电信短信网关</label>
				<div class="col-sm-7">
					<TEXTAREA id="sms_telcom_gateway" name="sms_telcom_gateway" type="text" class="form-control" placeholder="电信短信网关" rows="3"></TEXTAREA>
					<!-- <input type="text" class="form-control" id="sms_telcom_gateway" placeholder="短信网关"> -->
				</div>
			</div>
			<div class="form-group">
				<label for="sms_unicom_gateway" class="col-sm-3 control-label">联通短信网关</label>
				<div class="col-sm-7">
					<TEXTAREA id="sms_unicom_gateway" name="sms_unicom_gateway" type="text" class="form-control" placeholder="联通短信网关" rows="3"></TEXTAREA>
				</div>
			</div>
			<div class="form-group">
				<label for="sms_mobile_gateway" class="col-sm-3 control-label">移动短信网关</label>
				<div class="col-sm-7">
					<TEXTAREA id="sms_mobile_gateway" name="sms_mobile_gateway" type="text" class="form-control" placeholder="移动短信网关" rows="3"></TEXTAREA>
				</div>
			</div>
			<div class="form-group">
				<label for=""sms_unit_price"" class="col-sm-3 control-label">短信价格</label>
				<div class="col-sm-7">
					<input type="text" class="form-control" id="sms_unit_price" name="sms_unit_price" placeholder="短信价格(单位：元)" required>
				</div>
								</div>
			<div class="form-group">
				<label for="permited_auth_types" class="col-sm-3 control-label">用户认证方式</label>
				<div class="col-sm-7">
			    	<div id="permited_auth_types" class="permited-auth-types">
						
			    	</div>
				</div>
			</div>
            <div class="form-group">
                <label for="siteid" class="col-sm-3 control-label">系统默认门户站点</label>
                <div class="col-sm-7"><input type="text" id="siteid" name="SiteID"></div>
            </div>
<!-- 		<div class="form-group">
				<label for="operation_log_size" class="col-sm-3 control-label">日志存储空间</label>
				<div class="col-sm-7">
					<input type="text" class="form-control" id="operation_log_size" placeholder="日志存储空间">
				</div>
			</div> -->
			<div class="form-group">
				<div class="col-sm-offset-3 col-sm-5">
					<div class="bs-example">
						<button type="button" class="btn btn-warning" id="btn_save_configs">保存配置</button>
						<button type="button" class="btn btn-info" id="btn_cancel_changes" style="margin-left: 20px">取消修改</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
</div>
<script src="${pageContext.request.contextPath}/resources/js/statis.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">statisJS.init();</script>
<script type="text/javascript">
	MAIN_MENU.setActiveMenuItem("id_mm_system");
	var permitedAuthTypes = null;
	
	$(document).ready(function() {
		onLoadSiteList();
        LoadSettings();
		
		$("#btn_save_configs").click(function() {
			SaveConfigurations();
		});
		
		$("#btn_cancel_changes").click(function() {
			LoadSettings();
		});
		$("#platformsetting").click(function() {
			$.get(
					'${pageContext.request.contextPath}/system/system_management.htm',	
					function(data) {
					    $('#id_main_content').html(data);
			});
		});
		$("#portalsetting").click(function() {
			$.get(
					'${pageContext.request.contextPath}/system/portaltemplatemanagement.htm',	
					function(data) {
					    $('#id_main_content').html(data);
			});
		});

		$("#componentsetting").click(function() {
			$.get(
					'${pageContext.request.contextPath}/system/publishcomponent.htm',	
					function(data) {
					    $('#id_main_content').html(data);
			});
		});
		
		
});
	
	function onLoadSiteList(){
		$.ajax({
			url:'${pageContext.request.contextPath}/merchant/getdefaultsites.htm',
			type:'GET',
			dataType:'json',
			async:false,
			success:function(data){
				if(data.result=='OK'){
					var temp = [];
					for(i=0;i<data.records.length;i++){
						temp.push({id:data.records[i].id,text:data.records[i].name});
					}
					$('input#siteid').select2({data:temp,width:387});
				}
			}
		});
	}
	
	function LoadSettings(){
		$.ajax({
            type: 'GET',
            dataType: 'json',
            url: "${pageContext.request.contextPath}/system/platformsettings.htm",
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
    								$('input#siteid').select2('val', settings[i].cfg_value);
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
                    $.pnotify({
                        title: "查询系统配置失败",
                        text: data.message,
                        type: 'error'
                    });
                }
            },
            error: function (data) {
                $.pnotify({
                    title: "无法连接服务器",
                    text: "系统配置查询失败",
                    type: 'error'
                });
            }
		});
	}
	
	function renderAuthTypes(authTypes) {
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
	
	function SaveConfigurations() {
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
			alert('请设置默认WIFI门户站点');
			return false;
		}else{
			settings.push({cfg_key:'default_site_id',cfg_value:$('input#siteid').val()});
		}
		
		var smsUnitPrice = $("#sms_unit_price").val();
		var regu = /^(\d+)(\.?)(\d{0,2})$/; 
		var re = new RegExp(regu); 
		if(!re.test(smsUnitPrice)){
			alert(smsUnitPrice);
			alert('短信价格格式不正确');
			return false;
		}else{
			settings.push({cfg_key:SYSTEM_ITEMS.SMS_UNIT_PRICE, cfg_value:smsUnitPrice});
		}
		
		$.ajax({
            type: 'POST',
            dataType: 'json',
            url: "${pageContext.request.contextPath}/system/saveplatformsettings.htm",
            data: { "settings": JSON.stringify(settings) },
            success: function (data) {
                if (data.result == 'OK') {
                    $.pnotify({
                        title: "保存系统配置成功",
                        type: 'success'
                    });
                } else {
                    $.pnotify({
                        title: "保存系统配置失败",
                        text: data.message,
                        type: 'error'
                    });
                }
            },
            error: function (data) {
                $.pnotify({
                    title: "无法连接服务器",
                    text: "系统配置保存失败",
                    type: 'error'
                });
            }
		});
	}
	
	function generateAuthTypeHtml(permitedAuthTypes) {
		var authTypeHtml = "";
		
		for (var i =0; i< PORTAL_AUTH_TYPE.ALL_TYPES.length; i++) {
			var enName = PORTAL_AUTH_TYPE.ALL_TYPES[i].en_name;
			var cnName = PORTAL_AUTH_TYPE.ALL_TYPES[i].cn_name;
			var oneAuthTypeHtml = "";
			var isAuthTypePermitd = false;
			
			oneAuthTypeHtml += 	"<div class='auth-type-item'>";
			oneAuthTypeHtml += 		"<a href='javascript:;' style='text-decoration: none;'>";
			
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
	
	function encodeSmsGateway(telcomeGw, unicomGw, mobileGw) {
		telcomeGw = telcomeGw == null ? "" : telcomeGw;
		unicomGw = unicomGw == null ? "" : unicomGw;
		mobileGw = mobileGw == null ? "" : mobileGw;
		
		return {"TELCOM": telcomeGw, "UNICOM": unicomGw, "MOBILE": mobileGw}
	}
</script>
