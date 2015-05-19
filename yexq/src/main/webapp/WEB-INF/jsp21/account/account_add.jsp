<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/account.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/account/account_management.htm" class="initAjax">帐号管理</a>
    <a href="#">帐号信息</a>

    <a href="/account/account_management.htm" class="Action-Primary End-Button ChinaNet-Right initAjax">返回帐号列表</a>
</div>
<!-- ./Navigator -->

<div class="ChinaNet-Free-Content">
    <div class="ChinaNet-Free-Body ChinaNet-Free-Width">
        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">配置帐户基本信息</div>
        </div>

        <div class="Account-Detail-Basic-Edit-Body Account-Editor-Form">

            <form id="SaveAccountDataForm" method="POST">
                <!-- Account Avatar -->
                <div class="Account-Avatar-Editor">
                    <div class="Avatar-Image-Body Data-Adorn-Overly">
                        <div class="Overly-Top-Left"></div>
                        <div class="Overly-Top-Right"></div>
                        <div class="Overly-Bottom-Left"></div>
                        <div class="Overly-Bottom-Right"></div>
                        <div class="Avatar-Image-Sheet"><img src="/statics/img/no-image.png" id="AccountAvatarThumb"></div>
                        <a href="javascript:;" id="ChangeAvatarButton">更换/上传用户头像</a>
                    </div>
                </div>
                <!-- ./Account Avatar -->

                <!-- Account Data Form-->
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">&nbsp;</label>
                    <div class="Form-Item-Info">带 <span class="Form-Required">*</span> 的项目为必填(选)项</div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">用户名</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountUsername" name="AccountUsername" placeholder="请输入登录用户名。允许50位以内中英文、数字、下划线、单引号."></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">姓名</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountFullname" name="AccountFullname"  placeholder="请输入用户姓名。允许50位以内中英文、数字、下划线，单引号."></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">帐号类型</label>
                    <div class="Form-Item-Select ChinaNet-Col-6"><input type="text" value="" id="AccountType" name="AccountType"></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required" id="AccountForMerchant" style="display:none;">
                    <label class="Form-Item-Title ChinaNet-Col-2">商户名称</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="MerchantName" name="MerchantName" placeholder=""></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required" id="AccountForAdministrator" style="display:none;">
                    <label class="Form-Item-Title ChinaNet-Col-2">管理员级别</label>
                    <div class="Form-Item-Select ChinaNet-Col-6"><input type="text" value="" id="AccountGeoLevel" name="AccountGeoLevel"></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">手机号码</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountCellNumber" name="AccountCellNumber" placeholder="请输入11位手机号码"></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">邮箱</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountEmail" name="AccountEmail" placeholder="user@domain.com"></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">所属区域</label>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountProviceList"><input type="text" id="AccountProvice" name="AccountProvice" placeholder="输入商户名称"></div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCityList"><input type="text" id="AccountCity" name="AccountCity" placeholder="输入商户名称"></div>
                    <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCountyList"><input type="text" id="AccountCounty" name="AccountCounty" placeholder="输入商户名称"></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">详细地址</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountAddress" name="AccountAddress" placeholder="详细地址"></div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">标签</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountTags" name="AccountTags" placeholder="标签之间请用空格符隔开"></div>
                </div>
                <div class="ChinaNet-Form-Sheet" id="AccountDescriptionDiv" style="display:none;">
                    <label class="Form-Item-Title ChinaNet-Col-2">商户描述</label>
                    <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" id="AccountDescription" name="AccountDescription" placeholder="..."></div>
                </div>
                <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                    <label class="Form-Item-Title ChinaNet-Col-2">帐户权限</label>
                    <div class="ChinaNet-Left ChinaNet-Col-6" id="AccountPermissionModule">
                        <div class="Form-Item-Checkbox ChinaNet-Col-4" style="display:none;">
                            <span class="CheckInput"><input type="checkbox"></span>
                            <span class="CheckText">通信协议太平</span>
                        </div>
                        <div class="Form-Item-Checkbox ChinaNet-Col-4" style="display:none;">
                            <span class="CheckInput"><input type="checkbox"></span>
                            <span class="CheckText">通信协议太平</span>
                        </div>
                        <div class="Form-Item-Checkbox ChinaNet-Col-4" style="display:none;">
                            <span class="CheckInput"><input type="checkbox"></span>
                            <span class="CheckText">通信协议太平</span>
                        </div>
                    </div>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-5">&nbsp;</label>
                </div>
                <div class="ChinaNet-Form-Sheet">
                    <label class="Form-Item-Title ChinaNet-Col-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <div class="ChinaNet-Left">
                        <button class="Form-Primary ChinaNet-Left" type="submit"><span>保存帐号</span></button>
                        <button type="button" id="AccountEditCancel" class="Form-Default initAjax ChinaNet-Left"><span>取消编辑</span></button>
                    </div>
                </div>
                <!-- ./Account Data Form -->
            </form>
        </div>

    </div>
</div>


<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/account.js"></script>
<script type="text/javascript">var _AccountData=null;
$(document).ready(function(){
    accountApp.add();
});
</script>