<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header wp-dialog-title">
            <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
            <h4 class="modal-title" id="myModalLabel">页面图文内容管理</h4>
            <a href="javascript:;" class="wpd-close"  data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
        </div>
        <div class="modal-body">
            <div class="portal-module-editor">
                <div class="module-editor-header">
                    <ul class="wifi-portal-tabnav nostyle">
                        <li><a href="#" class="active">图文内容管理</a></li>
                        <li><a href="#">编辑图文内容</a></li>
                    </ul>
                </div>
                <div class="clear-line"></div>
                <div class="portal-module-datalist editor-data-body">
                    <div class="module-data-item">
                        <table>
                            <tr>
                                <td><img src="${pageContext.request.contextPath}/resources/img/no-image.png"></td>
                            </tr>
                        </table>
                        <div>标题</div>
                        <div>http://dfadsfasfdasdf.dfoasfasdfas</div>
                        <div>说明</div>
                        <a href="javascript:;" class="da-remove">删除</a>
                    </div>
                </div>
                <div class="portal-module-form editor-data-body" style="display:none;">
                    <div class="editor-file">
                        <div class="form-upload">
                            <!-- <input type="file" id="siteimagethumb" onchange="uploadImagePreview(this)">-->
                            <table>
                                <tr>
                                    <td align="center" valign="middle"><img alt="" src="${pageContext.request.contextPath}/resources/img/no-image.png" id="btn_show_upload_modal">
                                     <span style="color:#cccccc">点击图片区域编辑图片</span></td>
                                </tr>
                            </table>
                         
                        </div>
                    </div>
                    <input type="hidden" id="SliderThumb" name="SliderThumb">
                    <div class="form-content form-horizontal">
                        <div class="form-group">
                            <label for="SliderTitle" class="col-sm-3 control-label">标题</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" name="SliderTitle" id="SliderTitle" placeholder="...">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="SliderUrl"  class="col-sm-3 control-label">链接URL</label>
                            <div class="col-sm-9">
                              <input type="email" class="form-control" id="SliderUrl" name="SliderUrl" placeholder="http://">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="SliderRemark"  class="col-sm-3 control-label">其他/描述</label>
                            <div class="col-sm-9">
                              <textarea class="form-control" rows="9" placehodler="..." id="SliderDescription" name="SliderDescription"></textarea>
                            </div>
                        </div>
                        <!-- <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-9">
                              <button type="submit" class="btn btn-primary">保存内容</button>
                            </div>
                          </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <input type="hidden" id="SliderID" name="SliderID" value="">
          <button type="button" class="btn btn-default" id="cancelButton">取消</button>
          <button type="button" class="btn btn-primary" id="confirmButton">确定</button>
        </div>
    </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
<style type="text/css">
.modal-dialog {width:720px;}
.modal-body {padding-bottom:0px;}
</style>
<script type="text/javascript">
function loadEditAction(){
    $(document).on('click', 'a#editComponent', function(){
        var componentid = $(this).attr('componentid');
        var data        = __edit_sitepage.data.modules;
        var content     = null;
        
        for(i=0;i<data.length;i++){
            if(data[i].moduleid=='siteImageLineModule'){
                var components = data[i].components;
                for(j=0;j<components.length;j++){
                    if(components[j].componentid==componentid){
                        content = components[j].content;
                        break;
                    }
                }
                break;
            }
        }
        
        if(content!=null){
            $('div#portalModuleImagetextID').find('input#SliderID').val(componentid);
            //$('div#portalModuleImagetextID').find('input#SliderThumb').val(content.thumb);
            $('div#portalModuleImagetextID').find('input#SliderTitle').val(content.title);
            $('div#portalModuleImagetextID').find('#SliderDescription').val(content.description);
            $('div#portalModuleImagetextID').find('input#SliderUrl').val(content.url);
            if(content.thumb!=''&&typeof content.thumb!='undefined'){
                $('div#portalModuleImagetextID').find('div.form-upload table img').attr('src', __base_path+content.thumb);
            }
            
            $('div#portalModuleImagetextID').find('ul.wifi-portal-tabnav li').eq(1).find('a').addClass('active');
            $('div#portalModuleImagetextID').find('ul.wifi-portal-tabnav li').eq(0).find('a').removeClass('active');
            $('div#portalModuleImagetextID').find('div.editor-data-body').eq(0).hide();
            $('div#portalModuleImagetextID').find('div.editor-data-body').eq(1).show();
        }
    });
};

function loadData(){
    var data = __edit_sitepage.data;
    
    $('div#portalModuleImagetextID').find('div.portal-module-datalist').html('');
    for(i=0;i<data.modules.length;i++){
        if(data.modules[i].moduleid=='siteImageLineModule'){
            var components = data.modules[i].components;
            for(j=0;j<components.length;j++){
                var html = '<div class="module-data-item" componentid="'+components[j].componentid+'">'
                      +'     <table>'
                      +'        <tr>'
                      +'            <td><img src="'+__base_path+components[j].content.thumb+'"></td>'
                      +'        </tr>'
                      +'    </table>'
                      +'    <div>'+components[j].content.title+'</div>'
                      +'    <div>'+components[j].content.url+'</div>'
                      +'    <div>'+components[j].content.description+'</div>'
                      +'</div>';
                      $('div#portalModuleImagetextID').find('div.portal-module-datalist').append(html);
            }
        }
    }
    
    //
    loadDataPermission();
    loadEditAction();
}

function loadDataPermission(){
    var data = __edit_sitepage.template;
    for(i=0;i<data.modules.length;i++){
        var components = data.modules[i].components;
        for(j=0;j<components.length;j++){
              if(components[j].permission=='true'){
                  $('div#portalModuleImagetextID').find('div.module-data-item').each(function(x){
                     if($('div#portalModuleImagetextID').find('div.module-data-item').eq(x).attr('componentid')==components[j].componentid){
                         $('div#portalModuleImagetextID').find('div.module-data-item').eq(x).append('<a href="javascript:;" class="da-remove" id="editComponent" componentid="'+components[j].componentid+'">编辑</a>')
                     } 
                  });
              }
        }
    }
}

function onCancelButton(){
    $('div#portalModuleImagetextID').find('button#cancelButton').click(function(){
        if(!$('div#portalModuleImagetextID').find('div.editor-data-body').eq(1).is(':hidden')){
            $('div#portalModuleImagetextID').find('div.editor-data-body').eq(1).hide();
            $('div#portalModuleImagetextID').find('div.editor-data-body').eq(0).show();
            $('div#portalModuleImagetextID').find('ul.wifi-portal-tabnav li').eq(0).find('a').addClass('active');
            $('div#portalModuleImagetextID').find('ul.wifi-portal-tabnav li').eq(1).find('a').removeClass('active');
        }else{
            $('div#portalModuleImagetextID').find('a.wpd-close').click();
        }
    });
}

function onSaveSliderData(){
    $('div#portalModuleImagetextID').find('button#confirmButton').click(function(){
        if(!$('div#portalModuleImagetextID').find('div.editor-data-body').eq(1).is(':hidden')){
            var componentid = $('div#portalModuleImagetextID').find('input#SliderID').val();
            var title       = $('div#portalModuleImagetextID').find('input#SliderTitle').val();
            var thumb       = $('div#portalModuleImagetextID').find('div.form-upload').find('img').attr('src');
            var description = $('div#portalModuleImagetextID').find('#SliderDescription').val();
            var url         = $('div#portalModuleImagetextID').find('input#SliderUrl').val();
            
            if(title==''){
                alert('请填写内容标题');
                return false;
            }
            
            if(thumb==''){
                alert('请上传图片');
                return false;
            }
            
            if(title!=''&&thumb!=''&&componentid!=''&&url!=''){
                setComponentData('siteImageLineModule',componentid, {title:title,url:url,thumb:thumb.replace(__base_path,''),description:description})
                $('div#portalModuleImagetextID').find('div.module-data-item').each(function(x){
                    if($('div#portalModuleImagetextID').find('div.module-data-item').eq(x).attr('componentid')==componentid){
                        $('div#portalModuleImagetextID').find('div.module-data-item').eq(x).find('img').attr('src', thumb);
                        $('div#portalModuleImagetextID').find('div.module-data-item').eq(x).find('div').eq(0).html(title);
                        $('div#portalModuleImagetextID').find('div.module-data-item').eq(x).find('div').eq(1).html(url);
                        $('div#portalModuleImagetextID').find('div.module-data-item').eq(x).find('div').eq(2).html(description);
                    }
                });
                
                 $('div#portalModuleImagetextID').find('div.editor-data-body').eq(1).hide();
                 $('div#portalModuleImagetextID').find('div.editor-data-body').eq(0).show();
                 $('div#portalModuleImagetextID').find('ul.wifi-portal-tabnav li').eq(0).find('a').addClass('active');
                 $('div#portalModuleImagetextID').find('ul.wifi-portal-tabnav li').eq(1).find('a').removeClass('active');
            }
            
        }else{
            $('div#portalModuleImagetextID').on('hide.bs.modal', function(e){
                onChangePage(__edit_sitepage);
            });
            $('div#portalModuleImagetextID').modal('hide');
        }
    })
}

function uploadSliderImage(){
    initialResourceDlg();
    $("#btn_show_upload_modal").click(function() {
        showResourceDlg();
    });
}

function onChangeThumb(){
    $('#div_resource').on('hide.bs.modal', function(e){
        $('div#portalModuleImagetextID').find('div.form-upload').find('img').attr('src',__base_path+selected_resource_relative_url);
    })
}

uploadSliderImage();
loadData();
onCancelButton();
onSaveSliderData();
onChangeThumb();
</script>