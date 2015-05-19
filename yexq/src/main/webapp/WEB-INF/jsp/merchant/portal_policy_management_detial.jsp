<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<div class="clear-line"></div>

<!-- portal body -->
<div class="wifi-portal-body">
    <div class="portal-menu">
        <a href="${pageContext.request.contextPath}/merchant/sites.htm">站点管理<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
        <a href="${pageContext.request.contextPath}/merchant/portalpolicies.htm" class="active">推送策略<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
    </div>
    
    <div class="portal-main">
        <div class="wifi-main-header">
            <div class="col-xs-3">
                <input type="text" class="form-control" placeholder="输入关键字">
            </div>
            <div class="col-xs-3 col-dx-3">
                <div class="input-group date form-datetime col-md-10" data-date="" data-date-format="yyyy-mm-dd">
                    <input class="form-control" size="16" type="text" value="">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
            </div>
            <div class="col-xs-3 col-dx-3">
                <div class="input-group date form-datetime col-md-10" data-date="" data-date-format="yyyy-mm-dd">
                    <input class="form-control" size="16" type="text" value="">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>
            </div>
            <div class="col-xs-3 col-bx-3">
                 <button type="button" class="btn btn-info">搜索</button>
                 <a class="btn btn-primary wp-right ajax-init" href="${pageContext.request.contextPath}/merchant/addportalpolicy.htm"><span class="glyphicon glyphicon-list"></span> 增加策略</a>
            </div>
        </div>
        
        <div class="clear-line"></div>
        
        <!-- policy item -->
        <div class="wifi-policy-site">
            <table id="tbl_policy_timesheet" class="table">
                <tbody id="tb_policy_timesheet">
                    
                </tbody>
            </table>
        </div>
        <!-- ./policy -->
        
        <div class="wifi-site-page">
            <ul class="pagination">
              <li><a href="#">&laquo;</a></li>
              <li><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li class="active"><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">&raquo;</a></li>
            </ul>
        </div>
    </div>
</div>
<!--  ./portal -->

<div class="clear-line"></div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/portal.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.dragdiv.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery.tablednd.js"></script>
<script type="text/javascript">portalJS.init();</script>
<!--

//-->
</script>
