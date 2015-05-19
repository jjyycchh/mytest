<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/account.css" rel="stylesheet" media="screen">

<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <!--<a href="/account/account_management26.htm" class="initAjax">帐号管理</a>-->
    <a href="#">商户设置</a>

    <!--<a href="/account/account_management26.htm" class="Action-Primary End-Button ChinaNet-Right initAjax">返回帐号列表</a>
    <a href="/account/addaccount26.htm" class="Action-Primary ChinaNet-Right initAjax">添加新帐号</a>-->
</div>
<!-- ./Navigator -->

<div class="ChinaNet-Free-Menu-Left">
    <a href="/account/viewaccountdetails26.htm?accountId=${sessionScope.login_account_info.id}" id="sites" class="initAjax Active"><span>商户基本信息</span></a>
    <a href="/device/devicelist26.htm" id="portalpolicies" class="initAjax"><span>AP设置</span></a>
    <a href="/system/get_message26.htm" id="portalpolicies" class="initAjax"><span>消息中心</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div class="Right-Body-Main">
        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">帐号详细信息</div>
        </div>

        <div class="ChinaNet-Account-Base-Body">
            <div class="ChinaNet-Account-Avatar">
                <img src="/resources/merchant/img/userimgbig.png" id="ChinaNetAccountAvatarImg">
            </div>
            <div class="ChinaNet-Account-Base-information">
                <div>
                    <span class="Info-Name">商户名称：</span>
                    <span></span>
                </div>
                <div>
                    <span class="Info-Name">联系人：</span>
                    <span></span>
                </div>
                <div>
                    <span class="Info-Name">联系电话：</span>
                    <span></span>
                </div>
                <div>
                    <span class="Info-Name">地址：</span>
                    <span></span>
                </div>
                <div>
                    <span class="Info-Name">描述：</span>
                    <span></span>
                </div>
            </div>

            <div class="ChinaNet-Account-Change-Line">
                <button class="ChinaNet-Left" id="ChinaNetChangeAvatar">更换/上传用户头像</button>
                <button class="ChinaNet-Right" id="ChinaNetEditAccountButton">编辑帐户信息</button>
            </div>

            <div class="ChinaNet-Account-Change-Line">
                <span class="ChinaNet-Left">用户已绑定手机号：</span><span class="Line-Data ChinaNet-Left">--</span>
                <button class="ChinaNet-Right" id="ChinaNetBindAccountMobile">更改绑定手机号</button>
            </div>

            <div class="ChinaNet-Account-Change-Line">
                <button class="ChinaNet-Right" id="ChangeAccountPwd">修改用户密码</button>
            </div>

            <!-- <div class="ChinaNet-Account-Change-Line">
                <button class="ChinaNet-Right" id="ChangeAdvertForm">修改商户广告形式</button>
            </div> -->
        </div>
    </div>
</div>


<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/accountinfo.js"></script>
<script type="text/javascript">var _AccountID='${accountId}';
$(document).ready(function(){
    accountinfoApp.init();
 });
</script>
