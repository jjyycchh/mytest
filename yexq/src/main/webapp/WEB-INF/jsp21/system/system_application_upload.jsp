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
    <a href="#">客户端软件管理</a>
    <a href="/system/applicationmanagementpage.htm" class="Action-Primary End-Button ChinaNet-Right initAjax">返回APP列表</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/system/system_management.htm" id="systemmanagement" class="initAjax"><span>平台设置</span></a>
    <a href="/system/portaltemplatemanagement.htm" id="portaltemplatemanagement" class="initAjax"><span>模板设置</span></a>
    <a href="/system/systemthirdpartaccess.htm" id="systemthirdpartaccess" class="initAjax"><span>第三方接入</span></a>
    <a href="/system/publishcomponent.htm" id="publishcomponent" class="initAjax"><span>组件库</span></a>
    <a href="/system/searchexceptionlogpage.htm" id="searchexceptionlogpage" class="initAjax"><span>异常日志管理</span></a>
    <a href="/system/searchauthenticationpage.htm" id="searchauthenticationpage" class="initAjax"><span>用户认证记录</span></a>
    <a href="/system/searchsmssentpage.htm" id="searchsmssentpage" class="initAjax"><span>短信发送记录</span></a>
    <a href="/system/applicationmanagementpage.htm" id="applicationmanagementpage" class="initAjax Active"><span>客户端软件管理</span></a>
	<a href="/platform10/searchthirdplatformpage.htm" id="searchthirdplatformpage" class="initAjax"><span>二级平台管理</span></a>
	<a href="/system/devicetasklogpage.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage.htm" id="accountoperationlogpage" class="initAjax"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
    <a href="/authentication/thirdapplicationsearchpage.htm" id="thirdapplicationsearchpage" class="initAjax"><span>第三方应用管理</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <!-- <div class="Account-Avatar-Editor">
                    <div class="Avatar-Image-Body Data-Adorn-Overly">
                        <div class="Overly-Top-Left"></div>
                        <div class="Overly-Top-Right"></div>
                        <div class="Overly-Bottom-Left"></div>
                        <div class="Overly-Bottom-Right"></div>
                        <div class="Avatar-Image-Sheet"><img src="/statics/img/no-image.png" id="AccountAvatarThumb"></div>
                        <a href="javascript:;" id="ChangeAvatarButton">更换/上传用户头像</a>
                    </div>
                </div> -->
                <!-- ./Account Avatar -->
				<div class="ChinaNet-Free-Title">
            		<div class="Title-Name">设置APP基本信息</div>
       			</div>
       			<!-- <div class="Account-Avatar-Editor">
                    <div class="Avatar-Image-Body Data-Adorn-Overly">
                        <div class="Overly-Top-Left"></div>
                        <div class="Overly-Top-Right"></div>
                        <div class="Overly-Bottom-Left"></div>
                        <div class="Overly-Bottom-Right"></div>
                        <div class="Avatar-Image-Sheet"><img src="/statics/img/no-image.png" id="AccountAvatarThumb"></div>
                        <a href="javascript:;" id="ChangeAvatarButton">更换/上传用户头像</a>
                    </div>
                </div> -->
                <!-- Account Data Form-->
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">平台</label>
                    <div class="Form-Item-Input ChinaNet-Col-2"><input type="text" class="Input-Control" id="application_platform" name="application_platform" placeholder="" readonly></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">版本号</label>
                    <div class="Form-Item-Input ChinaNet-Col-2"><input type="text" class="Input-Control" id="application_version" name="application_version"  placeholder=""></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">上传时间</label>
                    <div class="Form-Item-Input ChinaNet-Col-4"><input type="text" class="Input-Control" id="application_upload_datetime" name="application_upload_datetime" readonly></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">发布时间</label>
                    <div class="Form-Item-Input ChinaNet-Col-4"><input type="text" class="Input-Control" id="application_published_datetime" name="application_published_datetime" placeholder="" readonly></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">发布状态</label>
                    <div class="Form-Item-Input ChinaNet-Col-2"><input type="text" class="Input-Control" id="application_is_published" name="application_is_published" placeholder="未发布" readonly></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">存储路径</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="application_path" name="application_path" placeholder="" readonly></div>
                    <button id="btn_upload_app" class="Form-Primary ChinaNet-Left"><span>选择APP</span></button>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">版本描述</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="application_description" name="application_description" placeholder=""></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-5">&nbsp;&nbsp;&nbsp;&nbsp;</label>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <div class="ChinaNet-Left">
                        <button type="button" id="button_application_upload_submit" class="Form-Primary ChinaNet-Left"><span>完成</span></button>
                    </div>
                </div>
                <!-- ./Account Data Form -->
            
        </div>
    </div>			

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/applicationupload.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/fileupload.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/chinanet.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		applicationuploadApp.init();
	 }); 
</script>
