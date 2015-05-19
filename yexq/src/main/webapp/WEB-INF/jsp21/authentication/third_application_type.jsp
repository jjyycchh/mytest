<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/system.css" rel="stylesheet" media="screen">

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">系统设置</a>
    <a href="#">第三方应用管理</a>
    
    <a href="/authentication/thirdapplicationsearchpage.htm" class="initAjax Action-Primary ChinaNet-Right">第三方应用管理</a>
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
    <a href="/system/applicationmanagementpage.htm" id="applicationmanagementpage" class="initAjax"><span>客户端软件管理</span></a>
    <a href="/platform10/searchthirdplatformpage.htm" id="searchthirdplatformpage" class="initAjax"><span>二级平台管理</span></a>
    <a href="/system/devicetasklogpage.htm" id="searchdevicetasklogpage" class="initAjax"><span>设备任务日志管理</span></a>
    <a href="/system/accountoperationlogpage.htm" id="accountoperationlogpage" class="initAjax"><span>操作日志记录</span></a>
    <a href="/system/searchreportpage.htm" id="searchreportpage" class="initAjax"><span>举报记录管理</span></a>
    <a href="/system/searchsuggestpage.htm" id="searchsuggestpage" class="initAjax"><span>投诉与建议管理</span></a>
    <a href="/authentication/thirdapplicationsearchpage.htm" id="thirdapplicationsearchpage" class="initAjax Active"><span>第三方应用管理</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="ChinaNet-Search-Body">
            <div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Input ChinaNet-Col-4">
                	<input type="text" id="apptype_name" name="apptype_name" class="Input-Control" placeholder="类型名称">
                </div>
           		<!-- <div class="Form-Item-Input ChinaNet-Col-5">
					<input type="text" id="apptype_memo" name="apptype_memo" class="Input-Control" placeholder="类型简介">			
				</div> -->
				<div class="ChinaNet-Col-2 ChinaNet-Left">
              		<button id="btn_Add_apptype" class="Form-Primary"><span>新增第三方应用类型</span></button>
          		</div>
            </div>          
        </div>            
        <div class="Statis-Body">
            <div class="Statis-Body-Guest">
				<div id="third_applicationtype_list" class="ChinaNet-Free-Table">
					<table>
						<tr class="ChinaNet-Table-Title">
							<th  width="10%">ID</th>
							<th  width="20%">类型名称</th>
							<!-- <th  width="35%">类型简介</th> -->
							<th  width="20%">创建时间</th>
							<th  width="10%">操作</th>
						</tr>
						<tbody id="third_applicationtype_list_body"></tbody>
					</table>
				</div>				
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/thirdapplicationtypemgmt.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		thirdApplicationTypeMgmtApp.init();
	 });
</script> 