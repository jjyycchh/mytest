<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/smspurchasemgmt26.htm" class="initAjax">商户设置</a>
    <a href="#">微信公众号设置</a>
</div>
<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/smspurchasemgmt26.htm" id="smspurchasemgmt" class="initAjax"><span>短信消费</span></a>
    <a href="/merchant/smsmanagement26.htm" id="smsmanagement" class="initAjax"><span>短信管理</span></a>
    <a href="/authentication/setwechataccountpage26.htm" id="setwechataccountpage" class="initAjax Active"><span>微信公众号设置</span></a>
</div>
					
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <div class="ChinaNet-Search-Body">
            <div class="ChinaNet-Form-Sheet">
            	<label class="Form-Item-Title ChinaNet-Col-1">微信公众号：</label>
                <div class="Form-Item-Input ChinaNet-Col-3"><input type="text" id="wechat_account" class="Input-Control" placeholder=""></div>
				<div class="ChinaNet-Col-1 ChinaNet-Left">
              		<button id="btn_submit_wechat" class="Form-Primary"><span>保存</span></button>
          		</div>
            </div>          
        </div>
    </div>
</div>					

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/setwechatacct.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		setwechatacctApp.init();
	 });
</script>	
		
	