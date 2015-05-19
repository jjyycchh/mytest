<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<style>
.popover{
max-height:900px;
margin-top:335px;
}
</style>


<script type="text/javascript">var __base_path= '${pageContext.request.contextPath}';</script>
<div class="clear-line"></div>

<!-- portal body -->
<div class="wifi-portal-body">
    <div class="portal-menu" >
        <a href="${pageContext.request.contextPath}/merchant/sites.htm" class="active">站点管理<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
        <a href="${pageContext.request.contextPath}/merchant/portalpolicies.htm">推送策略<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
    </div>
    
    <div class="portal-main">
        <div class="wifi-main-navigator" >
        <div class="pull-right" style="margin-top:7px"><a href="#" id="span_popover"  data-toggle="popover"><i class="glyphicon glyphicon-question-sign"></i><span style="margin-left:1px">帮助</span></a></div>
            <ol class="breadcrumb">
                <li><a href="${pageContext.request.contextPath}/merchant/sites.htm" class="ajax-init">站点管理</a></li>
                <li class="active">添加站点</li>
            </ol>
             
        </div>
       
        
        <!-- policy item -->
        <div class="wifi-policy-site">
            

            <form class="form-horizontal" role="form">
                        
              <input type="hidden" name="SiteID" id="SiteID" value="">
             
              
              <div class="form-group">
                 <div class="wifi-site-editor">
                     <div class="editor-header">
                        <div class="editor-main"><span>标题</span></div>
                        <div class="editor-main"><span>类型</span></div>
                     </div>
                    
                     <div class="editor-site">
                        <div class="editor-site-new"><a href="javascript:;" id="siteAddNewPageButton" class="btn btn-primary">添加页面</a></div>
                        <div class="editor-page-list">
                            <!-- <a href="javascript:;" pageid=""><img src="${pageContext.request.contextPath}/resources/portal/template/2/img/login.png"><div>&nbsp;</div></a>
                            <a href="javascript:;" pageid="" class="active"><img src="${pageContext.request.contextPath}/resources/portal/template/2/img/auth.png"><div>&nbsp;</div></a> -->
                        </div>
                     </div>
                     <div class="editor-frame">
                        <table class="editor-table">
                            <tr>
                                <td class="editor-td">
                                <!-- editor page -->
                                
                                <div class="editor-page-main page-vertical">
                                    <div class="no-pages-in">请“添加页面”...</div>
                                </div>
                                
                                <!-- ./editor page -->
                                </td>
                            </tr>
                        </table>
                     </div>
                 </div>
              </div>
              
                <div class="form-group">
                <label for="SiteName" class="col-sm-2 control-label" style="text-align:right;padding-top:7px;padding-right:10px">站点名称</label>
                <div class="col-sm-3">
                  <input type="text" class="form-control" id="SiteName" name="SiteName" placeholder="站点名称" >
                </div>
                <div id="SiteAccountList">
                 <label for="text" class="col-sm-1 control-label" style="text-align:left;padding:0px;padding-top:7px;">所属商家</label>
                <div class="col-sm-3">
                  <input type="text" id="AccountID" name="AccountID" placeholder="商家">
                </div>
                </div>
                
                 <div class="col-sm-2" style="margin-left:20px" >
                  <button type="button" class="btn btn-primary" id="SavePortalSiteButton" >保存站点</button>
                  <!-- <button type="button" class="btn btn-primary">站点另存为</button> -->
                </div>
              </div>  
               <div class="clear-line"></div>               
            </form>

            
        </div>
        <!-- ./policy -->
        
    </div>
</div>
<!--  ./portal -->

<div class="clear-line"></div>
<div class="modal fade" role="dialog" id="sitePageTemplateDialog"></div>
<div class="modal fade" role="dialog" id="pageModulesEditor"></div>
<div class="modal fade" role="dialog" id="pageAuthorizeDialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header wp-dialog-title">
                <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
                <h4 class="modal-title" id="myModalLabel">设置登录WIFI验证方式</h4>
                <a href="javascript:;" class="wpd-close"  data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
            </div>
            <div class="modal-body">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" id="AuthTypeID" name="AuthTypeID" value="OPTION"> 免认证登录
                    </label>
                    <p class="help-block">用户只须点击页面“免费上网”，即可实现上网</p>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" id="AuthTypeID" name="AuthTypeID" value="WECHAT"> 微信认证登录
                    </label>
                    <p class="help-block">用户进入微信，并通过微信扫描商户提供的上网二维码，完成微信关注后，实现上网</p>
                </div>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" id="AuthTypeID" name="AuthTypeID" value="MOBILE"> 手机短信认证登录
                    </label>
                    <p class="help-block">用户通过手机申请上网验证码，并使用手机号与验证码登陆完成验证上网</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id="configAuthSettings">确定</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<!--
<div class="auth-type-components">
    <div class="auth-type-components-view"></div>
    <div class="auth-type-list-item">
        <ul>
            <li><a href="javascript:;" class="mobile">&nbsp;</a></li>
            <li><a href="javascript:;" class="wechat">&nbsp;</a></li>
        </ul>
    </div>
    <div class="auth-component-button">
        <button type="button">我要上网</button>
    </div>
</div>
-->

<script type="text/javascript">
$(document).ready(function(){	
	//	$("#popover_help").popover('show');
	var helpcontents="<span style='color:#ffdd55'>1 如何添加页面？</span></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示：用户按照图中“页面添加过程”进行操作，可完成一个页面的添加，若要添加多个不同类型的页面，重复以上操作步骤即可。</br><span style='color:#ffdd55'>2 如何添加站点？</span></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;添加站点操作流程：添加站点分2步骤： 1> 添加页面：参考“如何添加页面”。 2> 添加站点：在“站点名称”输入框中，输入站点名称，并选择所属商家，保存站点即可。</br><img style='height:380px;margin-right:20px' src='${pageContext.request.contextPath}/resources/img/help_pic1.jpg' /> </br><span style='color:#ffdd55'>3 页面类型备注：</span></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户可添加三种类型的页面，分别是内容页，验证页，和登录页。添加次序依次为登录页——验证页——内容页,其中，登录页和验证页只能添加一个页面，内容页可添加多个。</br><span style='color:#ffdd55'>4 页面模板备注：</span></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;模板定义了页面元素的呈现方式，用户从已有的模板集合中选择需要的模板，页面会根据用户的选择，生成该模板的一个布局实例。";
	var options={placement:"left",title:"<span style='margin-left:170px'>添加站点常见问题</span>",content:helpcontents,trigger:"click",html:true};
		$("#span_popover").popover(options);
});
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/portal.js"></script>
<script type="text/javascript">var __OwnerType = '${sessionScope.login_account_info.type}';$(document).ready(function(){MAIN_MENU.setActiveMenuItem("id_mm_portal");portalJS.init();onPortalSiteEditor.init();})</script>