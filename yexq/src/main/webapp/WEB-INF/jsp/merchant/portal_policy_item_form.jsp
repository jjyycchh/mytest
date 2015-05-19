<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header wp-dialog-title">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h4 class="modal-title" id="myModalLabel">添加时间计划</h4>
      <a href="javascript:;" class="wpd-close"  data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
    </div>
    <form class="form-horizontal" role="form">
    <div class="modal-body">
      <div class="policy-form-dialog">
          <div class="form-group">
	    <label for="inputPassword3" class="col-sm-2 control-label">开始时间</label>
	    <div class="col-sm-6">
	      <input type="text" id="starttime" placeholder="00:00">
	    </div>
	</div>
          <div class="form-group">
	    <label for="inputPassword3" class="col-sm-2 control-label">结束时间</label>
	    <div class="col-sm-6">
	      <input type="text" id="closetime" placeholder="00:00">
	    </div>
   </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      <button type="button" class="btn btn-primary">保存计划</button>
    </div>
    </form>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">
$('#starttime').select2({
 data:[{id:0,text:'00:00'},{id:1,text:'01:00'},{id:2,text:'02:00'},{id:3,text:'03:00'},{id:4,text:'04:00'},{id:4,text:'05:00'},{id:4,text:'06:00'},{id:4,text:'07:00'},{id:4,text:'08:00'},{id:4,text:'09:00'},{id:4,text:'10:00'},{id:4,text:'11:00'},{id:4,text:'12:00'},{id:4,text:'13:00'},{id:4,text:'14:00'},{id:4,text:'15:00'},{id:4,text:'16:00'},{id:4,text:'17:00'},{id:4,text:'18:00'},{id:4,text:'19:00'},{id:4,text:'20:00'},{id:4,text:'21:00'},{id:4,text:'22:00'},{id:4,text:'23:00'}],
 width:120,
 minimumResultsForSearch: -1
});
$('#closetime').select2({
 data:[{id:0,text:'00:00'},{id:1,text:'01:00'},{id:2,text:'02:00'},{id:3,text:'03:00'},{id:4,text:'04:00'},{id:4,text:'05:00'},{id:4,text:'06:00'},{id:4,text:'07:00'},{id:4,text:'08:00'},{id:4,text:'09:00'},{id:4,text:'10:00'},{id:4,text:'11:00'},{id:4,text:'12:00'},{id:4,text:'13:00'},{id:4,text:'14:00'},{id:4,text:'15:00'},{id:4,text:'16:00'},{id:4,text:'17:00'},{id:4,text:'18:00'},{id:4,text:'19:00'},{id:4,text:'20:00'},{id:4,text:'21:00'},{id:4,text:'22:00'},{id:4,text:'23:00'}],
 width:120,
 minimumResultsForSearch: -1
});
</script>