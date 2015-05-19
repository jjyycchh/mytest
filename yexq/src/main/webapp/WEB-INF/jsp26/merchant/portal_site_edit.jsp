<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){
    location = '/account/home.htm';
}</script>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/portal.css" rel="stylesheet" media="screen">

<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/sites26.htm" class="initAjax">WIFI站点管理</a>
    <a href="#">编辑站点</a>

    <a href="/merchant/sites26.htm" class="Action-Primary End-Button ChinaNet-Right initAjax">返回站点列表</a>
    <!--<a href="/merchant/editsite26.htm?siteid=${siteid}" class="Action-Primary ChinaNet-Right initAjax">重新加载当前页面</a>-->
    <a href="/merchant/addsite26.htm" class="Action-Primary ChinaNet-Right initAjax">添加新站点</a>
</div>
<!-- ./Navigator -->

<!-- Left Menu -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/sites26.htm" id="sites" class="initAjax Active"><span>Portal设置</span></a>
    <a href="/merchant/portalpolicies26.htm" id="portalpolicies" class="initAjax"><span>广告推送</span></a>
</div>
<!-- ./Left Menu -->

<div class="ChinaNet-Free-Body-Right">
    <div class="Right-Body-Main-Portal">
        <div class="ChinaNet-Portal-Detail-Body">
            <div class="Portal-Detail-Body-Action Portal-Detail-Edit">

                <form action="/merchant/sitedetails.htm" method="POST" id="FormSiteDetialSave">
                    <!-- Site Detail Issue -->
                    <div class="Portal-Detail-Body-Easy">
                        <div class="Portal-Site-Thumb Data-Adorn-Overly">
                            <div class="Overly-Top-Left"></div>
                            <div class="Overly-Top-Right"></div>
                            <div class="Overly-Bottom-Left"></div>
                            <div class="Overly-Bottom-Right"></div>
                            <img src="/resources/merchant/img/no-image.png" id="SiteThumbID">
                        </div>
                        <div class="Portal-Site-Data Data-Content-Body">
                            <span class="Data-Name" id="SiteNameView">浙江电信公共信息产业有限公司</span>
                            <span id="SiteLastUpdate">2014-02-19 23:10:32</span>
                        </div>
                        <a href="javascript:;" class="Edit-Site-Button Data-Adorn-Overly">
                            <div class="Overly-Top-Left"></div>
                            <div class="Overly-Top-Right"></div>
                            <div class="Overly-Bottom-Left"></div>
                            <div class="Overly-Bottom-Right"></div>编辑站点信息
                        </a>
                        <div class="Portal-Site-Number ChinaNet-Right Data-Adorn-Overly">
                            <div class="Overly-Top-Left"></div>
                            <div class="Overly-Top-Right"></div>
                            <div class="Overly-Bottom-Left"></div>
                            <div class="Overly-Bottom-Right"></div>
                            <span>已被推送</span>
                            <span class="Data-Number" id="SiteResponseNumber">0</span>
                        </div>
                        <div class="Portal-Site-Number ChinaNet-Right Data-Adorn-Overly">
                            <div class="Overly-Top-Left"></div>
                            <div class="Overly-Top-Right"></div>
                            <div class="Overly-Bottom-Left"></div>
                            <div class="Overly-Bottom-Right"></div>
                            <span>关联设备</span>
                            <span class="Data-Number" id="SiteRelationDevices">0</span>
                        </div>
                        <div class="Portal-Site-Number ChinaNet-Right Data-Adorn-Overly">
                            <div class="Overly-Top-Left"></div>
                            <div class="Overly-Top-Right"></div>
                            <div class="Overly-Bottom-Left"></div>
                            <div class="Overly-Bottom-Right"></div>
                            <span>策略数量</span>
                            <span class="Data-Number" id="SiteStrategyNubmer">0</span>
                        </div>
                        <div class="Portal-Site-Number ChinaNet-Right Data-Adorn-Overly">
                            <div class="Overly-Top-Left"></div>
                            <div class="Overly-Top-Right"></div>
                            <div class="Overly-Bottom-Left"></div>
                            <div class="Overly-Bottom-Right"></div>
                            <span>页面数量</span>
                            <span class="Data-Number" id="SiteInitPagesNubmer">0</span>
                        </div>
                    </div>
                    <!-- ./Site Detail Issue -->


                    <!-- Site Edit Form  -->
                    <div class="ChinaNet-Form-Sheet Portal-Detail-Body-Edit">
                        <div class="Form-Item-Title ChinaNet-Col-2">站点名称</div>
                        <div class="Form-Item-Input ChinaNet-Col-6"><input type="text" class="Input-Control" name="SiteName" id="sitename" value="" placeholder="请输入站点名称"></div>
                    </div>
                    <div class="ChinaNet-Form-Sheet Portal-Detail-Body-Edit">
                        <div class="Form-Item-Title ChinaNet-Col-2">商户</div>
                        <div class="ChinaNet-Left ChinaNet-Col-6"><input type="text" id="AccountID" name="AccountID"></div>
                    </div>
                    <div class="ChinaNet-Form-Sheet Portal-Detail-Body-Edit">
                        <div Class="Form-Item-Title ChinaNet-Col-2">描述</div>
                        <div class="Form-Item-Textarea ChinaNet-Col-6">
                            <textarea id="Description" name="Description"></textarea>
                        </div>
                    </div>
                    <div class="ChinaNet-Form-Sheet Portal-Detail-Body-Edit">
                        <div class="Form-Item-Title ChinaNet-Col-2">&nbsp;</div>
                        <div class="ChinaNet-Left ChinaNet-Col-6">
                            <button type="submit" class="Form-Primary">
                                <span>保存站点</span>
                            </button>

                            <button type="button" class="Form-Default Edit-Site-Page-Button">
                                <span>编辑站点页面</span>
                            </button>
                        </div>
                    </div>
                    <!-- ./Site Edit Form -->

                    <div class="Portal-Detail-Body-Page-Comment Portal-Detail-Body-Page Data-Adorn-Overly">
                        <div class="Overly-Top-Left"></div>
                        <div class="Overly-Top-Right"></div>
                        <div class="Overly-Bottom-Left"></div>
                        <div class="Overly-Bottom-Right"></div>
                        你可以点击 “+”来给添加站点新页面，或者点击页面的编辑，删除对页面进行相应的操作;
                    </div>

                    <div class="Portal-Detail-Body-Page">
                        <ul>
                            <li id="ButtonForNewPage">
                                <div class="Portal-Page-Body Data-Adorn-Overly">
                                    <div class="Overly-Top-Left"></div>
                                    <div class="Overly-Top-Right"></div>
                                    <div class="Overly-Bottom-Left"></div>
                                    <div class="Overly-Bottom-Right"></div>
                                    <a href="javascript:;" class="New-Page" id="AddNewPageForSite"><span>&nbsp;</span></a>
                                    <div class="Page-Edit-Status"></div>
                                    <div class="Page-Edit-Status-Icon"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>


        <div class="ChinaNet-Portal-Editor-Page">
            <div class="Page-Editor-Header Data-Adorn-Overly">
                <div class="Overly-Top-Left"></div>
                <div class="Overly-Top-Right"></div>

                <div class="Page-Edit-Header-Body">
                    <a href="javascript:;" class="ChinaNet-Left Page-Template-Type Template-Type-LOGIN">
                        <span class="Type-Icon"></span>
                        <span>登录页</span>
                        <span class="Type-Select"></span>
                    </a>
                    <input type="hidden" id="PageTradeType" name="PageTradeType" value="">
                    <input type="hidden" id="PageTemplateType" name="PageTemplateType" value="">
                    <input type="hidden" id="PageTemplateId" name="PageTemplateId" value="0">
                    <div class="Template-Page-Title"><div><input type="text" id="PageTitle" name="PageTitle" value="页面标题"></div></div>
                    <a href="javascript:;" class="Editor-Button ChinaNet-Right On-PageEdit-Button" id="CancelEditPage">取消编辑</a>
                    <a href="javascript:;" class="Editor-Button ChinaNet-Right On-PageEdit-Button" id="RefreshEditPage">刷新页面</a>
                    <a href="javascript:;" class="Editor-Save ChinaNet-Right On-PageEdit-Button" id="SaveEditorOnPage">保存页面</a>
                </div>

                <div class="Page-Template-Change-Body">
					<span class="Page-Template-Tips">请在下面模板列表中选择你需要的模板EDIT</span>
                    <a href="javascript:;" class="ChinaNet-Left Page-Template-Type Template-Type-LOGIN">
                        <span class="Type-Icon"></span>
                        <span>登录页</span>
                        <span class="Type-Select"></span>
                    </a>
                    <a href="javascript:;" class="ChinaNet-Left Page-Trade-Type">
                        <span>所有行业模板</span>
                        <span class="Type-Select"></span>
                    </a>
                </div>
            </div>
            <div class="Page-Editor-Body">
                <iframe src="about:blank" id="PageEditorIframeID" name="PageEditorIframeID" frameborder="0" width="100%" scrolling="NO"></iframe>
            </div>
        </div>
    </div>
</div>

<div class="ChinaNet-Portal-Type-Panel" id="PortalTemplateTypeMenu">
    <a href="javascript:;" data-templateType="AUTH">
        <span class="Type-Icon Type-AUTH"></span>
        <span>验证页</span>
        <span class="Type-Comment">设备接收推送第一页</span>
    </a>
    <a href="javascript:;" data-templateType="LOGIN">
        <span class="Type-Icon Type-LOGIN"></span>
        <span>登录页</span>
        <span class="Type-Comment">设备验证成功后显示的页面</span>
    </a>
    <!--<a href="javascript:;" data-templateType="CONTENT">
        <span class="Type-Icon Type-CONTENT"></span>
        <span>内容页</span>
        <span class="Type-Comment">站内页，点击访问</span>
    </a>-->
</div>
<div class="ChinaNet-Portal-Type-Panel" id="PortalTradeTypeMenu">
    <a href="javascript:;" data-tradeType="">
        <span>所有行业模板</span>
    </a>
    <a href="javascript:;" data-tradeType="restaurant">
        <span>餐饮行业模板</span>
    </a>
    <a href="javascript:;" data-tradeType="finance">
        <span>银行行业模板</span>
    </a>
    <a href="javascript:;" data-tradeType="travel">
        <span>旅游行业模板</span>
    </a>
    <a href="javascript:;" data-tradeType="others">
        <span class="Last-xiSelect-Item">其他行业模板</span>
    </a>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/portal.js"></script>
<script type="text/javascript">var _SiteID='${siteid}';
    $(document).ready(function(){
        portalApp.edit();
    });
</script>