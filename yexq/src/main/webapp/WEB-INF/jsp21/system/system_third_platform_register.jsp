<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/system.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">系统设置</a>
    <a href="#">二级平台管理</a>
    <a href="/platform10/searchthirdplatformpage.htm" class="Action-Primary End-Button ChinaNet-Right initAjax">返回二级平台列表</a></div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/system/system_management.htm" id="systemmanagement" class="initAjax"><span>平台设置</span></a>
    <a href="/system/portaltemplatemanagement.htm" id="portaltemplatemanagement" class="initAjax"><span>模板设置</span></a>
    <a href="/system/systemthirdpartaccess.htm" id="systemthirdpartaccess" class="initAjax"><span>第三方接入</span></a>
    <a href="/system/publishcomponent.htm" id="publishcomponent" class="initAjax"><span>组件库</span></a>
    <a href="/system/searchexceptionlogpage.htm" id="searchexceptionlogpage" class="initAjax"><span>异常日志管理</span></a>
    <a href="/system/searchauthenticationpage.htm" id="searchauthenticationpage" class="initAjax"><span>用户认证记录</span></a>
    <a href="/system/searchsmssentpage.htm" id="searchsmssentpage" class="initAjax"><span>短信发送记录</span></a>
    <a href="/system/applicationmanagementpage.htm" id="applicationmanagementpage" class="initAjax"><span>客户端软件管理</span></a>
	<a href="/platform10/searchthirdplatformpage.htm" id="searchthirdplatformpage" class="initAjax Active"><span>二级平台管理</span></a>
	<a href="/system/devicetasklogpage.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage.htm" id="accountoperationlogpage" class="initAjax"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
    <a href="/authentication/thirdapplicationsearchpage.htm" id="thirdapplicationsearchpage" class="initAjax"><span>第三方应用管理</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
		<div class="ChinaNet-Free-Title">
            <div class="Title-Name">注册二级平台</div>
       	</div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">平台名称</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_name" placeholder="二级平台名称"></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">域名</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_domain" placeholder=""></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">公网IP</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_ip_addr" placeholder=""></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">端口号</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_ip_port" placeholder=""></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">电话</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_phone" placeholder="请输入正确的手机号码或电话号码"></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">认证类型</label>
            <div class="Form-Item-Select ChinaNet-Col-6" id="third_platform_auth_type_list">
                <input type="text" id="third_platform_auth_type" name="third_platform_auth_type" placeholder="">
            </div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">放行接口</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_online_url" placeholder="二级平台放行接口"></div>
            <div class="Form-Item-Select ChinaNet-Col-2"><input type="text" id="select_submit_type_1" class="Input-Control"></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">下线接口</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_offline_url" placeholder="二级平台强行下线接口"></div>
            <div class="Form-Item-Select ChinaNet-Col-2"><input type="text" id="select_submit_type_2" class="Input-Control"></div>
        </div>
        <div class="ChinaNet-Form-Sheet">
            <label class="Form-Item-Title ChinaNet-Col-2">欢迎界面</label>
            <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="third_platform_welcome_url" placeholder="欢迎界面URL"></div>
        </div>
        <div class="ChinaNet-Form-Sheet">
            <label class="Form-Item-Title ChinaNet-Col-2">平台描述</label>
                <div class="Form-Item-Textarea ChinaNet-Col-6"><TEXTAREA id="third_platform_description" type="text" placeholder="平台描述" rows="3"></TEXTAREA></div>
        </div>
        <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
            <label class="Form-Item-Title ChinaNet-Col-2">所在地区</label>
            <div class="Form-Item-Select ChinaNet-Col-2" id="third_platform_province_list"><input type="text" id="third_platform_province" name="third_platform_province" placeholder=""></div>
            <div class="Form-Item-Select ChinaNet-Col-2" id="third_platform_city_list"><input type="text" id="third_platform_city" name="third_platform_city" placeholder=""></div>
            <div class="Form-Item-Select ChinaNet-Col-2" id="third_platform_county_list"><input type="text" id="third_platform_county" name="third_platform_county" placeholder=""></div>
            <div class="Form-Item-Input ChinaNet-Col-2" id="third_platform_province_text" style="display: none"><input type="text" class="Input-Control" id="third_platform_province_readonly" name="third_platform_province_readonly"></div>
            <div class="Form-Item-Input ChinaNet-Col-2" id="third_platform_city_text" style="display: none"><input type="text" class="Input-Control" id="third_platform_city_readonly" name="third_platform_city_readonly"></div>
            <div class="Form-Item-Input ChinaNet-Col-2" id="third_platform_county_text" style="display: none"><input type="text" class="Input-Control" id="third_platform_county_readonly" name="third_platform_county_readonly"></div>
        </div>
        <div class="ChinaNet-Form-Sheet">
            <label class="Form-Item-Title ChinaNet-Col-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <div class="ChinaNet-Left">
                    <button type="button" id="button_third_platform_submit" class="Form-Primary ChinaNet-Left"><span>完成</span></button>
                </div>
            </div>
        </div>
    </div>			
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/thirdplatformregister.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		thirdPlatformRegisterApp.init();
	 }); 
</script>
