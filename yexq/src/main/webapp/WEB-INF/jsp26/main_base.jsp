<!DOCTYPE HTML>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", 0);
%>

<html>
<head>
<title id="frame_title_text">接入系统平台3.0</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="-1" />
	<meta http-equiv="pragma" content="no-cache" />
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/jquery-ui-1.8.3.css" rel="stylesheet" media="screen">
    <link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/js/artDialog/css/ui-dialog.css" rel="stylesheet" media="screen">
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/chinanet-free.css" rel="stylesheet" media="screen">
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/xiSelect.css" rel="stylesheet" media="screen">
	<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/jquery-ui-timepicker-addon.css" rel="stylesheet" media="screen">
	<!--[if lt IE 9]>
	<script>
	    document.execCommand("BackgroundImageCache", false, true);
	</script>
	<![endif]-->
    <script type="text/javascript">
        var __CONTEXT_PATH="${pageContext.request.contextPath}";
        var __IS_INIT_CHINANET= 1;
        var __LOAD_HOME_PAGE = 0;
        var __CONTEXT_MERCHANT_KEY = "${sessionScope.login_account_info.id}";
        var __CONTEXT_MERCHANT_CODE = "${sessionScope.login_account_info.type}";
        var __CONTEXT_MERCHANT_FULLNAME = "${sessionScope.login_account_info.fullname}";
        var __CONTENT_MERCHANT_NAME = "${sessionScope.login_account_info.username}";
        var __CONTENT_MERCHANT_CELL = "${sessionScope.login_account_info.cellNumber}";
        var __CONTENT_MERCHANT_PERS = "${sessionScope.login_account_info.permissions}";
        var __CONTENT_GEO = '${sessionScope.login_account_info.geoLevel} - ${sessionScope.login_account_info.geoLocation}';
        var __CONTENT_GEOLEVEL= '${sessionScope.login_account_info.geoLevel}';
        var __CONTENT_EMAIL= '${sessionScope.login_account_info.email}';
        var __CONTENT_MERCHANTNAME= '${sessionScope.login_account_info.merchantName}';
        var __CONTENT_MERCHANTDESCRIPTION= '${sessionScope.login_account_info.merchantDescription}';
        var __CONTENT_GEOLOCATION = '${sessionScope.login_account_info.geoLocation}';
        var __CONTENT_AVATAR = '${sessionScope.login_account_info.avatarPath}';
        var __CONTENT_PHONEBINDED = '${sessionScope.login_account_info.phoneBinded}';
        var __CONTENT_ADHOST = 'http://192.168.10.146:8080';
        var __DATA_PUBLIC_KEY  = null;
    </script>
</head>
<body>

    <!-- ChinaNet Page Header -->
    <div class="ChinaNet-Free-Header">
        <div class="Header-Body ChinaNet-Free-Width">
            <div class="Header-Body-Logo">
                &nbsp;
            </div>
            <div class="Header-Body-Menu">
                <div class="ChinaNet-WIFI-Menu">
                    <s:if test="#session.login_account_info.type != 'MANUFACTURER' && #session.login_account_info.type != 'DEVICE_ADMIN'">
                    	<a href="/account/home.htm" class="Active"><span>首&emsp;&emsp;页</span></a>
                        <a href="/merchant/sites26.htm" class="menuAjax Has-Child"><span>客户界面</span></a>
                        <a href="/user/onlineusersuccess.htm" class="menuAjax Has-Child"><span>用户管理</span></a>
                        <a href="/system/statistics26.htm" class="menuAjax Has-Child"><span>统计分析</span></a>
                        <s:if test="#session.login_account_info.type != 'MERCHANT'">
                            <a href="/account/account_management26.htm" class="menuAjax"><span>帐号管理</span></a>
                        </s:if>
                        <s:if test="#session.login_account_info.type == 'MERCHANT'">
                            <%-- <a href="/device/devicelist26.htm" class="menuAjax"><span>设备管理</span></a> --%>
                            <a href="/account/viewaccountdetails26.htm?accountId=${sessionScope.login_account_info.id}" class="menuAjax Has-Child"><span>商户设置</span></a>
                            <a href="/authentication/merchanthasthirdapplicationpage26.htm" class="menuAjax Has-Child"><span>商户应用</span></a>
                        </s:if>
                        <%--  --%>
                    </s:if>
                    <s:if test="#session.login_account_info.type == 'SUPER_MAN'">
                    	<a href="/system/platformsettings26.htm" class="menuAjax Has-Child"><span>系统设置</span></a>
                    </s:if>
                    <s:if test="#session.login_account_info.type == 'MANUFACTURER' || 
                    		#session.login_account_info.type == 'DEVICE_ADMIN' || 
                    		#session.login_account_info.type == 'SUPER_MAN'">
                    	<a href="/system/searchdevicepage26.htm" class="menuAjax Has-Child"><span>厂商设备</span></a>
                    </s:if>                    
            	</div>
            </div>

            <!-- Account Menu -->
            <div class="Header-Body-Account">
                <a href="javascript:;">
                    <div class="Avatar-Frame">
                        <img src="${pageContext.request.contextPath}/resources/merchant/img/avatar-demo.png" id='AccountAvatarImg'>
                        <div class="Avatar-Overly"></div>
                        <!--<div class="Avatar-Message">9</div>-->
                    </div>
                    ${sessionScope.login_account_info.username}
                </a>
            </div>
            <!-- ./Account Menu -->

            <div class="Account-Menu-Dropdown" id="ChinaNetAccountDropdown">
                <%--
                <a href="javascript:;" id="UserInfo">我的帐号</a>
                <a href="javascript:;" id="ChangePwd">修改密码</a>
                <!--
                <a href="/system/get_message26.htm" id="showmsg" class="initAjax">系统信息<span class="glyphicon glyphicon-envelope"></span></a>
                 -->
                <s:if test="#session.login_account_info.type != 'MANUFACTURER' && #session.login_account_info.type != 'DEVICE_ADMIN'">
                	<a href="/system/get_message26.htm" id="showmsg" class="initAjax">
                   		<div>
                        	<span class="Adpats-Left"></span>
                        	<span class="Adpats-Right"></span>
                        	8
                    	</div>
                    	系统信息
                	</a>
                </s:if>
                <s:if test="#session.login_account_info.type == 'MANUFACTURER' || #session.login_account_info.type == 'DEVICE_ADMIN'">
                	<a href="javascript:;" class="disabled">系统信息</a>
                </s:if>
                --%>
                <a href="javascript:;" id="Report">举报</a>
                <a href="javascript:logOut();">安全退出</a>
            </div>

        </div>
    </div>
    <!-- ./ChinaNet Page Header -->

    <!-- ChinaNet Page Content Body -->
    <div class="ChinaNet-Free-Content">
        <div class="ChinaNet-Free-Body ChinaNet-Free-Width">
        <!-- ChinaNet-Free-Body -->
        </div>
    </div>
    <!-- ./ChinaNet Page Content Body -->

    <!-- ChinaNet Page Bottom -->
    <div class="ChinaNet-Free-Bottom">
        <div class="ChinaNet-Bottom-Body ChinaNet-Free-Width">
            <div class="Bottom-Copy-Right ChinaNet-Free-Width">版权所有 &copy; 中国电信爱WIFI运营中心</div>
        </div>
    </div>
    <!-- ChinaNet Page Bottom -->

    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-ui.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/json2.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery.blockUI.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/artDialog/dist/dialog-min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/highcharts/js/highcharts.js"></script>
    <script type="text/javascript" src="${pageContent.request.contextPath}/resources/merchant/js/jquery.menu.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery.select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/md5.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/address.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/deviceRefresh.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/chinanet.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/pager.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-file-upload/js/vendor/jquery.ui.widget.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-file-upload/js/jquery.iframe-transport.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-file-upload/js/jquery.fileupload.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/fileupload.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/headeraccount.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/jquery-ui-timepicker-zh-CN.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/smsmessage.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/report.js"></script>
    <!--[if (gte IE 8)&(lt IE 10)]>
	<script src="${pageContext.request.contextPath}/resources/merchant/js/jquery-file-upload/js/cors/jquery.xdr-transport.js"></script>
	<![endif]-->
    <script type="text/javascript">
        $(document).ready(function(){
        	messageApp.getmailcount();
            chinanetApp.init();
            headerAccountApp.init();
            reportApp.init();
            if(__CONTEXT_MERCHANT_CODE == 'DEVICE_ADMIN' || __CONTEXT_MERCHANT_CODE == 'MANUFACTURER'){
                loadDevicePage();
            }else{
                loadHomePage();
            }
            document.onkeypress=banBackSpace;
            document.onkeydown=banBackSpace;
        });
        function logOut(){
            	onConfirmDialog('<p>您确定要退出本系统？</p>',function(){window.location.href='/account/logout.htm'},function(){});	
            }
    </script>
</body>
</html>
