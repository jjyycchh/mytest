<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/system.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/system/system_management.htm" class="initAjax">系统设置</a>
    <a href="/system/portaltemplatemanagement.htm" class="initAjax">模板设置</a>
    <a href="#">模板编辑</a>

    <!-- <a href="/merchant/sites.htm" class="Action-Button End-Button ChinaNet-Right">返回站点列表</a> -->
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/system/system_management.htm" id="systemmanagement" class="initAjax"><span>平台设置</span></a>
    <a href="/system/portaltemplatemanagement.htm" id="portaltemplatemanagement" class="initAjax Active"><span>模板设置</span></a>
    <a href="/system/systemthirdpartaccess.htm" id="systemthirdpartaccess" class="initAjax"><span>第三方接入</span></a>
    <a href="/system/publishcomponent.htm" id="publishcomponent" class="initAjax"><span>组件库</span></a>
    <a href="/system/searchexceptionlogpage.htm" id="searchexceptionlogpage" class="initAjax"><span>异常日志管理</span></a>
    <a href="/system/searchauthenticationpage.htm" id="searchauthenticationpage" class="initAjax"><span>用户认证记录</span></a>
	<a href="/system/searchsmssentpage.htm" id="searchsmssentpage" class="initAjax"><span>短信发送记录</span></a>
	<a href="/system/applicationmanagementpage.htm" id="applicationmanagementpage" class="initAjax"><span>客户端软件管理</span></a>
	<a href="/platform10/searchthirdplatformpage.htm" id="searchthirdplatformpage" class="initAjax"><span>二级平台管理</span></a>
	<a href="/system/devicetasklogpage.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage.htm" id="accountoperationlogpage" class="initAjax"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
    <a href="/authentication/thirdapplicationsearchpage.htm" id="thirdapplicationsearchpage" class="initAjax"><span>第三方应用管理</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="System-Body">
            <div class="System-Body-Guest">
            	<!-- Working Statis -->
				<div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
					<label class="Form-Item-Title ChinaNet-Col-3">模板名称</label>
					<div class="Form-Item-Input ChinaNet-Col-7">
						<input type="text" id="input_templatename" name="input_templatename" class="Input-Control">
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet">
					<label class="Form-Item-Title ChinaNet-Col-3">缩略图地址</label>
					<div class="Form-Item-Input ChinaNet-Col-7">
						<input type="text" id="input_templateimg" name="input_templateimg" class="Input-Control">
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet">
					<label class="Form-Item-Title ChinaNet-Col-3">模板描述</label>
					<div class="Form-Item-Input ChinaNet-Col-7">
						<input type="text" id="input_templatedescription" name="input_templatedescription" class="Input-Control">
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
					<label class="Form-Item-Title ChinaNet-Col-3">行业分类</label>
					<div class="Form-Item-Select ChinaNet-Col-7" id='div_templateindustry'>
						<input type="text" id="input_templateindustry" name="input_templateindustry">
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
					<label class="Form-Item-Title ChinaNet-Col-3">模板类型</label>
					<div class="Form-Item-Select ChinaNet-Col-7" id='div_templatetype'>
						<input type="text" id="input_templatetype" name="input_templatetype">
					</div>
				</div>
				<div id="authtype_div" class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
					<label class="Form-Item-Title ChinaNet-Col-3">认证方式</label>
					<div class="Form-Item-Select ChinaNet-Col-7" id='div_authtype'>
						<input type="text" id="input_authtype" name="input_authtype">
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
					<label class="Form-Item-Title ChinaNet-Col-3">模板框架</label>
					<div class="Form-Item-Textarea ChinaNet-Col-7">
						<TEXTAREA id="input_templateframe" name="input_templateframe" type="text" class="Input-Control"
												placeholder="模板框架" rows="5"> </TEXTAREA>
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet">
					<label class="Form-Item-Title ChinaNet-Col-3">默认数据</label>
					<div class="Form-Item-Textarea ChinaNet-Col-7">
						<TEXTAREA id="input_templatedata" name="input_templatedata" type="text" class="Input-Control"
												placeholder="默认数据" rows="5"> </TEXTAREA>
					</div>
				</div>
				<div class="ChinaNet-Form-Sheet">
					<label class="Form-Item-Title ChinaNet-Col-3">&nbsp;</label>
					<div class="Form-Item-Label ChinaNet-Col-2">
						<button id="btn_save_pt" type="submit" class="Form-Primary"><span>保存模板</span></button>
					</div>
					<div class="Form-Item-Label ChinaNet-Col-2">
						<button id="btn_upload_portals" type="submit" class="Form-Important"><span>重新上传模板文件</span></button>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/portalmgmtedit.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		//if(__DATA_PUBLIC_KEY != null)
			portalmgmteditApp.init();
	 });
</script>