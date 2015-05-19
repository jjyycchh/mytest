<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="modal-dialog">
	<div class="modal-content">
		<div class="modal-header wp-dialog-title">
			<!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
			<h4 class="modal-title" id="myModalLabel">文本内容管理</h4>
			<a href="javascript:;" class="wpd-close" data-dismiss="modal"><span
				class="glyphicon glyphicon-remove"></span></a>
		</div>
		<div class="modal-body">
			<div class="portal-module-editor">
				<div class="module-editor-header">
					<ul class="wifi-portal-tabnav nostyle">
						<li><a href="#" class="active">文本内容管理</a></li>
					</ul>
				</div>
				<div class="clear-line"></div>
				<div class="portal-module-form editor-data-body">

					<div class="form-horizontal">
						<div class="form-group">
							<label for="ContentTitle" class="col-sm-3 control-label">标题</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="ContentTitle" name="ContentTitle" placeholder="...">
							</div>
						</div>
						<div class="form-group">
							<label for="ContentDescription" class="col-sm-3 control-label">内容</label>
							<div class="col-sm-6">
								<textarea class="form-control" rows="9" id="ContentDescription" name="ContentDescription" placehodler="..."></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
		    <input type="hidden" id="ContentID" name="ContentID" value="Content001">
			<button type="button" class="btn btn-default" id="cancelButton">取消</button>
			<button type="button" class="btn btn-primary" id="confirmButton">确定</button>
		</div>
	</div>
	<!-- /.modal-content -->
</div>
<!-- /.modal-dialog -->
<style type="text/css">
.modal-dialog {width: 720px;}
.modal-body {padding-bottom: 0px;}
</style>
<script type="text/javascript">
function loadData(){
    var data = __edit_sitepage.data;
    
    for(i=0;i<data.modules.length;i++){
        if(data.modules[i].moduleid=='siteContentModule'){
            var components = data.modules[i].components;
            for(j=0;j<components.length;j++){
                $('input#ContentTitle').val(components[j].content.title.replace(/<h3.*?>(.*?)<\/h3>/ig, '$1'));
                $('textarea#ContentDescription').val(components[j].content.description);
                $('input#ContentID').val(components[j].componentid);
            }
        }
    }
    
}


function onCancelButton(){
    $('div#portalModuleContentID').find('button#cancelButton').click(function(){
         $('div#portalModuleContentID').find('a.wpd-close').click();
    });
}

function onSaveSliderData(){
    $('div#portalModuleContentID').find('button#confirmButton').click(function(){
	    var componentid = $('div#portalModuleContentID').find('input#ContentID').val();
	    var title       = $('div#portalModuleContentID').find('input#ContentTitle').val();
	    var description = $('div#portalModuleContentID').find('#ContentDescription').val();
	    
	    setComponentData('siteContentModule', componentid, {title:'<h3>'+title+'</h3>', description:description});
	    $('div#portalModuleContentID').on('hide.bs.modal', function(e){
	        onChangePage(__edit_sitepage);
	    });
	    $('div#portalModuleContentID').modal('hide');
    })
}

loadData();
onCancelButton();
onSaveSliderData();
</script>