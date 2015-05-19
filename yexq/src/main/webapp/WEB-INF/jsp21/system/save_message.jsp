<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/system.css" rel="stylesheet" media="screen">

<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">系统信息</a>
    <a href="#">发送信息</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/system/get_message.htm" id="showmsg" class="initAjax "><span>收件箱</span></a>
    <a href="/system/sentmessage.htm" id="sentmsg" class="initAjax"><span>已发信息</span></a>
    <a href="/system/sendoutmessage.htm" id="savemsg" class="initAjax Active"><span>发送信息</span></a>
</div>


<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
    
		<div class="System-Body">
            <div class="System-Body-Guest">
            	<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">信息标题</label>
        			<div class="Form-Item-Input ChinaNet-Col-7">
        				<input type="text" id="msg_title" placeholder="请输入信息标题" class="Input-Control">
        			</div>
    			</div>
    			<!--  <div class="ChinaNet-Form-Sheet" id="msgselectecacct">
        			<label class="Form-Item-Title ChinaNet-Col-3">选中的接收者</label>
        			<div class="Form-Item-Input ChinaNet-Col-7">
        				<input type="text" id="msg_selected" placeholder="" class="Input-Control" ReadOnly ="true">
        			</div>
    			</div> -->
    			<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">选中的接收者</label>
        			<div class="ChinaNet-Col-10">
        				<div class="Portal-Policy-Devices-List">
                        <div class="Devices-List-Header"><div>&nbsp;</div></div>
                        <div class="Devices-List-Body">
                            <div class="Devices-List-Item-Body" id="portalPolicyDeviceArea">

                                <a href="javascript:;" class="Add-Account">
                                   
                                </a>
                            </div>
                        </div>
                        <div class="Devices-List-Bottom"><div>&nbsp;</div></div>
                    </div>
        			</div>
    			</div>
    			 <div class="ChinaNet-Form-Sheet Portal-Detail-Body-Edit">
                        <div class="Form-Item-Title ChinaNet-Col-3">信息接收者</div>
                        <div class="ChinaNet-Left ChinaNet-Col-7" id="divAccountID"><input type="text" id="AccountID" name="AccountID"></div>
                 </div>
                                            
    			<!--  
    			<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">接收者</label>
        			
        			
        			<div class="Form-Item-Input ChinaNet-Col-7">
        			  
        				<input type="text" id="msg_reciveids" placeholder="请输入用户名" class="Input-Control"> 
        				<input id="msg_receivers" name="msg_receivers" type="text" placeholder="添加收件人" class="msg-receiver-input">
        			</div>
    			</div>-->
    			<div class="ChinaNet-Form-Sheet">
        			<label class="Form-Item-Title ChinaNet-Col-3">信息内容</label>
        			<div class="Form-Item-Textarea ChinaNet-Col-7">
        				<TEXTAREA id="msg_content" name="msg_content" type="text" placeholder="请输入信息内容" rows="6"></TEXTAREA>
        			</div>
    			</div>
    	      			
    			<div class="ChinaNet-Form-Sheet">
					<label class="Form-Item-Title ChinaNet-Col-3">&nbsp;</label>
					<div class="Form-Item-Label ChinaNet-Col-2">
						<button id="btn_save_msg" type="submit" class="Form-Primary"><span>发送信息</span></button>
					</div>
					
				</div>
            </div>
        </div>
      
    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/savemessage.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		//if(__DATA_PUBLIC_KEY != null)
			savemessageApp.init();
	 });
</script>
