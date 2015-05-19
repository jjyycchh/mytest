<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/system.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">系统设置</a>
    <a href="#">平台设置</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/system/system_management26.htm" id="systemmanagement" class="initAjax Active"><span>平台设置</span></a>
    <a href="/system/portaltemplatemanagement26.htm" id="portaltemplatemanagement" class="initAjax"><span>模板设置</span></a>
    <a href="/system/systemthirdpartaccess26.htm" id="systemthirdpartaccess" class="initAjax"><span>第三方接入</span></a>
    <a href="/system/publishcomponent26.htm" id="publishcomponent" class="initAjax"><span>组件库</span></a>
    <a href="/system/searchexceptionlogpage26.htm" id="searchexceptionlogpage" class="initAjax"><span>异常日志管理</span></a>
    <a href="/system/searchauthenticationpage26.htm" id="searchauthenticationpage" class="initAjax"><span>用户认证记录</span></a>
    <a href="/system/searchsmssentpage26.htm" id="searchsmssentpage" class="initAjax"><span>短信发送记录</span></a>
    <a href="/system/applicationmanagementpage26.htm" id="applicationmanagementpage" class="initAjax"><span>客户端软件管理</span></a>
    <a href="/platform10/searchthirdplatformpage26.htm" id="searchthirdplatformpage" class="initAjax"><span>二级平台管理</span></a>
    <a href="/system/devicetasklogpage26.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage26.htm" id="accountoperationlogpage" class="initAjax"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage26.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage26.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
    <a href="/authentication/thirdapplicationsearchpage26.htm" id="thirdapplicationsearchpage" class="initAjax"><span>第三方应用管理</span></a>
</div>


<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
		<div class="System-Body">
            <div class="System-Body-Guest">
            	<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">电信短信网关</label>
        			<div class="Form-Item-Textarea ChinaNet-Col-7">
        				<TEXTAREA id="sms_telcom_gateway" name="sms_telcom_gateway" type="text" placeholder="电信短信网关" rows="3"> </TEXTAREA>
        			</div>
    			</div>
    			<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">联通短信网关</label>
        			<div class="Form-Item-Textarea ChinaNet-Col-7">
        				<TEXTAREA id="sms_unicom_gateway" name="sms_unicom_gateway" type="text" placeholder="联通短信网关" rows="3"> </TEXTAREA>
        			</div>
    			</div>
    			<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">移动短信网关</label>
        			<div class="Form-Item-Textarea ChinaNet-Col-7">
        				<TEXTAREA id="sms_mobile_gateway" name="sms_mobile_gateway" type="text" placeholder="移动短信网关" rows="3"> </TEXTAREA>
        			</div>
    			</div>
    			<div class="ChinaNet-Form-Sheet">
       				 <label class="Form-Item-Title ChinaNet-Col-3">短信价格</label>
        			 <div class="Form-Item-Input ChinaNet-Col-7">
        			 	<input type="text" id="sms_unit_price" placeholder="短信价格(单位：元)" class="Input-Control">
        			 </div>
    			</div>
    			<div class="ChinaNet-Form-Sheet">
       				 <label class="Form-Item-Title ChinaNet-Col-3">用户认证方式</label>
        			 <div class="Form-Item-Label ChinaNet-Col-7">
        			 	<div id="permited_auth_types">
						
			    		</div>
        			 </div>
    			</div>
    			<div class="ChinaNet-Form-Sheet">
       				 <label class="Form-Item-Title ChinaNet-Col-3">系统默认门户站点</label>
        			 <div class="Form-Item-Select ChinaNet-Col-7">
						<input type="text" id="siteid" name="siteid">
					 </div>
    			</div>
    			<div class="ChinaNet-Form-Sheet">
					<label class="Form-Item-Title ChinaNet-Col-3">&nbsp;</label>
					<div class="Form-Item-Label ChinaNet-Col-2">
						<button id="btn_save_configs" type="submit" class="Form-Primary"><span>保存配置</span></button>
					</div>
					<div class="Form-Item-Label ChinaNet-Col-2">
						<button id="btn_cancel_changes" type="submit" class="Form-Default"><span>取消修改</span></button>
					</div>
				</div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/systemmgmt.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		//if(__DATA_PUBLIC_KEY != null)
			systemmgmtApp.init();
	 });
</script>
