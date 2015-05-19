<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/system/system_management.htm" class="initAjax">系统设置</a>
    <a href="#">第三方接入</a>
    <!-- <a href="/merchant/sites.htm" class="Action-Button End-Button ChinaNet-Right">返回站点列表</a> -->
    <!-- <a href="#" class="Action-Primary ChinaNet-Right">新增设备</a> -->
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
    <a href="/authentication/thirdapplicationsearchpage.htm" id="thirdapplicationsearchpage" class="initAjax"><span>第三方应用管理</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="ChinaNet-Search-Body">
            <div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Input ChinaNet-Col-3"><input type="text" id="new_name" class="Input-Control" placeholder="名称"></div>
           		<div id="divsite" class="Form-Item-Select  ChinaNet-Col-3">
					<input type="text" id="ThirdPartSites" name="ThirdPartSites">			
				</div>
				<div class="ChinaNet-Col-2 ChinaNet-Left">
              		<button id="btn_Add_device" class="Form-Primary"><span>新增设备</span></button>
          		</div>
            </div>          
        </div>
        <div class="Statis-Body">
            <div class="Statis-Body-Guest">
            	<!-- Working Statis -->
				<div class="ChinaNet-Free-Table">
					<table>
						<tr class="ChinaNet-Table-Title">
							<th width="22%">名称</th>
							<th width="45%">虚拟设备id</th>
							<th width="20%">站点名称</th>
							<th width="10%">状态</th>
							<th class="Width-For-Button">&nbsp;</th>
						</tr>
						<tbody id="thirdpartlist_body">
							
						</tbody>
					</table>
				</div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/thirdpartmgmt.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		thirdpartmgmtApp.init();
	 });
</script>