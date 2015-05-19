<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/smspurchasemgmt.htm" class="initAjax">商户设置</a>
    <a href="#">短信管理</a>
</div>
<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/smspurchasemgmt.htm" id="smspurchasemgmt" class="initAjax"><span>短信消费</span></a>
    <a href="/merchant/smsmanagement.htm" id="smsmanagement" class="initAjax Active"><span>短信管理</span></a>
    <a href="/authentication/setwechataccountpage.htm" id="setwechataccountpage" class="initAjax"><span>微信公众号设置</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
	<div class="Right-Body-Main">
		<div class="ChinaNet-Search-Body">
			<div class="ChinaNet-Form-Sheet">
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="startdate" class="Input-Control" type="text" value="" placeholder="选择起始日期" readonly="readonly" name="startdate">
                </div>
                <div class="Form-Item-Input ChinaNet-Col-2">
                    <input id="enddate" class="Input-Control" type="text" value="" placeholder="选择截至日期" readonly="readonly" name="enddate">
                </div>
                <div class="ChinaNet-Col-2 ChinaNet-Left">
                    <button id="btn_search_smslog" class="Form-Primary"><span>查询</span></button>
                </div>
            </div>
		</div>
		<div class="Statis-Body">
			<div class="Statis-Body-Guest">
				<!-- Working Statis -->
				<div class="ChinaNet-Free-Table">
					<table>
						<tr class="ChinaNet-Table-Title">
							<th width="100">手机号码</th>
							<th width="360">短信内容</th>
							<th width="100">发送时间</th>							
						</tr>
						<tbody id="smssendlog_body">
							
						</tbody>
					</table>
				</div>
				<!-- Page Line -->
				<div class="ChinaNet-Page-Table">
					<a id="a_pagination_previous"> 
						<span class="Overly-Left"></span>
						<span class="Overly-Right"></span> 
						<span>前一页</span>
					</a> 
					<a href="javascript:;" class="Active"> 
						<span class="Overly-Left"></span> 
						<span class="Overly-Right"></span> 
						<span id="lb_pagenumber">1</span>
					</a> 
					<a id="a_pagination_next"> 
						<span class="Overly-Left"></span> 
						<span class="Overly-Right"></span> 
						<span>后一页</span>
					</a>
				</div>
				<!-- Page Line -->
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/smssendlog.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		smssendApp.init();
	 });
</script>