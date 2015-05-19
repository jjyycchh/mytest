<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header wp-dialog-title">
      <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
      <h4 class="modal-title" id="myModalLabel">选择内容组件</h4>
      <a href="javascript:;" class="wpd-close"  data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
    </div>
    <form class="form-horizontal" role="form">
    <div class="modal-body">
      <div class="page-module-sheet">
        <div class="module-mode">
            <a href="javascript:;" class="active">所有组件</a>
        </div>
        <div class="module-body">
            <!-- module item -->
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">图片轮播组件</div>
                <div>多图片左右轮播</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">大图文组件</div>
                <div>图片与多文本信息组合，图片回置左，多文字信息置右</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">小图文组件</div>
                <div>图片与多文字信息组合</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">多类文字信息内容</div>
                <div>内容包含标题、描述、其他等三类信息</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">文本信息组件</div>
                <div>文本内容组件</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">超链信息组件</div>
                <div>文本内容超链组件</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">图片组件</div>
                <div>显示单图片，包含图片标题和点击图片超链</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">用户验证组件</div>
                <div>用户注册、登录验证</div>
            </div>
            <div class="module-item">
                <img src="${pageContext.request.contextPath}/resources/img/no-image.png">
                <div class="md-title">内容间隔组件</div>
                <div>内容块上下间隔组件</div>
            </div>
            <!-- ./module item -->
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      <button type="button" class="btn btn-primary">确定</button>
    </div>
    </form>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
<style type="text/css">
.modal-dialog {width:660px !important;}
</style>
<script type="text/javascript">
$(function(){
	
});
</script>