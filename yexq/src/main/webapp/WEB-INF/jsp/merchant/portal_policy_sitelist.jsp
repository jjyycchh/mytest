<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header wp-dialog-title">
      <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
      <h4 class="modal-title" id="myModalLabel">选择策略站点</h4>
      <a href="javascript:;" class="wpd-close"  data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
    </div>
    <form class="form-horizontal" role="form" id="portalPageFormID">
    <div class="modal-body">
      <div class="policy-form-box">
        <div class="LVsiteSheet">
            <div class="siteSeaDiv">选择策略站点</div>
            
            <div class="SiteListResults">
                <ul></ul>
            </div>
            
            <div class="sitePagDiv"></div>
        </div>
        <div class="LVpolicyTime">
            <div class="LV-P-Title">设置时间</div>
            <div class="form-group"><input type="text" id="PlanStartTime" placeholder="开始时间"></div>
            <div class="form-group"><input type="text" id="PlanEndTime" placeholder="结束时间"></div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <input type="hidden" name="PolicyPriorityID" id="PolicyPriorityID" value="0">
      <button type="button" class="btn btn-default" data-dismiss="modal" id="policySiteCancel">关闭</button>
      <button type="button" class="btn btn-primary" id="SetPolicyItemSiteAndTime">确定</button>
    </div>
    </form>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
<style type="text/css">
.modal-dialog {width:720px;}
.modal-body {padding:15px !important;padding-bottom:0px !important;}
.LVpolicyTime .form-group {margin:9px 0 0 9px !important;}
</style>
<script type="text/javascript">
var PP_TimeList = [{id:'0',text:'00:00'},{id:'1',text:'01:00'},{id:'2',text:'02:00'},{id:'3',text:'03:00'},{id:'4',text:'04:00'},
                   {id:'5',text:'05:00'},{id:'6',text:'06:00'},{id:'7',text:'07:00'},{id:'8',text:'08:00'},{id:'9',text:'09:00'},
                   {id:'10',text:'10:00'},{id:'11',text:'11:00'},{id:'12',text:'12:00'},{id:'13',text:'13:00'},{id:'14',text:'14:00'},
                   {id:'15',text:'15:00'},{id:'16',text:'16:00'},{id:'17',text:'17:00'},{id:'18',text:'18:00'},{id:'19',text:'19:00'},
                   {id:'20',text:'20:00'},{id:'21',text:'21:00'},{id:'22',text:'22:00'},{id:'23',text:'23:00'}];
                   
                   




$(function(){
	$('#PlanStartTime').select2({minimumResultsForSearch:-1,width:100,data:PP_TimeList});
	$('#PlanEndTime').select2({minimumResultsForSearch:-1,width:100,data:PP_TimeList});
	getPolicySiteList();
	
	
	$('#ChangePortalSiteList').on('show.bs.modal', function(){
		getPolicySiteList();
		if(__policy_editItem!=null){
			$('#PlanStartTime').select2('val', __policy_editItem.starttime);
			$('#PlanEndTime').select2('val', __policy_editItem.endtime);
		}
	});
	
	$('button#SetPolicyItemSiteAndTime').click(function(){
		var obj = {};
		var starttime = $('input#PlanStartTime').val();
		var endtime = $('input#PlanEndTime').val();
		$('div.SiteListResults span.wpcheckbox').each(function(x){
			if($('div.SiteListResults span.wpcheckbox').eq(x).hasClass('wpchecked')){
				obj.siteid = $('div.SiteListResults span.wpcheckbox').eq(x).parent().attr('siteid');
				obj.sitename = $('div.SiteListResults span.wpcheckbox').eq(x).parent().attr('sitename');
			}
		});
		
		if(typeof obj.siteid=='undefined'){
			alert('请选择站点');
			return false;
		}
		
		if(starttime==''||endtime==''){
			alert('请设置策略时间');
			return false;
		}
		
		if(parseFloat(starttime)>=parseFloat(endtime)){
			alert('时间设置错误');
			return false;
		}
		
		obj.starttime = starttime;
		obj.endtime = endtime;
		
		if(__policy_editItem!=null){
			obj.priority = __policy_editItem.priority;
			editPolicyItem(obj);
		}else{
			obj.priority = (__portal_policyItems!=null)?(__portal_policyItems.length+1):1;
			addPolicyItem(obj);
		}
		
		__policy_editItem = null;
		portalPolicyDisplay();
		$('button#policySiteCancel').click();
	});
	
});

function getPolicySiteList(){
	var ownerid = (__OwnerType!='MERCHANT'&&$('#MerchantID').length>0)?$('#MerchantID').val():__portal_policyOwnerId;
	
    $.ajax({
        url:'${pageContext.request.contextPath}/merchant/merchantsitelist.htm',
        type:'GET',
        dataType:'JSON',
        async:false,
        data:{ownerid:ownerid},
        success:function(data){
            if(data.result=='OK'){
                $('div.SiteListResults ul').html('');
                for(i=0;i<data.sites.length;i++){
                	if(__policy_editItem!=null&&__policy_editItem.siteid==data.sites[i].siteid){
                		$('div.SiteListResults ul').append('<li siteid="'+data.sites[i].siteid+'" sitename="'+data.sites[i].sitename+'"><img src="'+(data.sites[i].thumbpath!=null?data.sites[i].thumbpath:contextPath+'/resources/img/no-image.png')+'"><span class="wpcheckbox wpchecked"></span><span class="MerchantSiteName">'+data.sites[i].sitename+'</span></li>');
                	}else{
                	    $('div.SiteListResults ul').append('<li siteid="'+data.sites[i].siteid+'" sitename="'+data.sites[i].sitename+'"><img src="'+(data.sites[i].thumbpath!=null?data.sites[i].thumbpath:contextPath+'/resources/img/no-image.png')+'"><span class="wpcheckbox"></span><span class="MerchantSiteName">'+data.sites[i].sitename+'</span></li>');
                	}
                }
            }
        }
    });
    
    $('div.SiteListResults li').click(function(){
    	if($(this).find('span.wpcheckbox').hasClass('wpchecked')){
            $(this).removeClass('checked').find('span.wpcheckbox').removeClass('wpchecked');
        }else{
            $(this).addClass('checked').find('span.wpcheckbox').addClass('wpchecked').parent().siblings().removeClass('checked').find('.wpcheckbox').removeClass('wpchecked');
        }
    });

    /*$('div.SiteListResults span.wpcheckbox').click(function(){
        if($(this).hasClass('wpchecked')){
            $(this).removeClass('wpchecked');
        }else{
            $(this).addClass('wpchecked').parent().siblings().find('.wpcheckbox').removeClass('wpchecked');
        }
    });*/
}
</script>