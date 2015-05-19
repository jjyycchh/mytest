<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/portal.css" rel="stylesheet" media="screen">
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/portalpolicy.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/portalpolicies.htm" class="initAjax">WIFI推送策略管理</a>
    <a href="#">添加新策略</a>

    <a href="/merchant/portalpolicies.htm" class="Action-Primary ChinaNet-Right End-Button initAjax">返回策略列表</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/sites.htm" id="sites" class="initAjax"><span>Portal站点管理</span></a>
    <a href="/merchant/portalpolicies.htm" id="portalpolicies" class="initAjax Active"><span>站点推送策略</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div class="Right-Body-Main">

        <div class="ChinaNet-Form-Sheet">
            <div class="ChinaNet-Free-Title">
                <div class="Title-Name">新增站点推送策略</div>
            </div>
        </div>

        <form action="" id="SavePolicyBaseForm" method="POST">
            <div class="ChinaNet-Form-Sheet">
                <label class="ChinaNet-Col-12 Form-Item-Title">&nbsp;</label>
            </div>
            <div class="ChinaNet-Form-Sheet ChinaNet-Form-Required">
                <label class="Form-Item-Title ChinaNet-Col-2">策略标题</label>
                <div class="Form-Item-Input ChinaNet-Col-6"><input id="portalPolicyNameInput" type="text" class="Input-Control"  placeholder="输入策略标题"></div>
            </div>
            <div class="ChinaNet-Form-Sheet">
                <label class="Form-Item-Title ChinaNet-Col-2">商户</label>
                <div class="Form-Item-Select ChinaNet-Col-6"><input type="text" id="PolicyAccountID"></div>
            </div>
            <div class="ChinaNet-Form-Sheet">
                <label class="Form-Item-Title ChinaNet-Col-2">策略设备列表</label>
                <div class="ChinaNet-Left ChinaNet-Col-6">
                    <div class="Portal-Policy-Devices-List">
                        <div class="Devices-List-Header"><div>&nbsp;</div></div>
                        <div class="Devices-List-Body">
                            <div class="Devices-List-Item-Body" id="portalPolicyDeviceArea">

                                <a href="javascript:;" class="Add-Device">
                                    <span>&nbsp;</span>
                                    添加设备
                                </a>
                            </div>
                        </div>
                        <div class="Devices-List-Bottom"><div>&nbsp;</div></div>
                    </div>
                </div>
            </div>
            <div class="ChinaNet-Form-Sheet">
                <label class="Form-Item-Title ChinaNet-Col-2">&nbsp;</label>
                <div class="ChinaNet-Left ChinaNet-Col-6">
                    <button type="submit" class="Form-Primary Submit-Button"><span>保存策略</span></button>
                </div>
            </div>
        </form>

    </div>
</div>

<script type="text/javascript" src="/statics/js/merchant/portalpolicyedit.js"></script>
<script type="text/javascript">var _isEdit = false;
	$(document).ready(function() {
        policyApp.init();
	});
</script>
