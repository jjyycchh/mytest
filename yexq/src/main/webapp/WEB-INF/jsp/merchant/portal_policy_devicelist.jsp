<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header wp-dialog-title">
      <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
      <h4 class="modal-title" id="myModalLabel">选择设备</h4>
      <a href="javascript:;" class="wpd-close"  data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
    </div>
    <form class="form-horizontal" role="form" id="portalPageFormID">
    <div class="modal-body">
      <div class="device-search-box">
            <div class="deviceSeaDiv">
			    <div class="col-xs-8">
			      <input type="text" class="form-control" id="keywords" placeholder="设备关键字">
			    </div>
			    <div class="col-xs-2">
	                <input type="text" id="status" placeholder="状态">
			    </div>
			    <div class="col-xs-2"><button type="button" class="btn btn-default" id="searchdevice">查询</button></div>
		    </div>
		    <div class="deviceResultList"></div>
		    <div class="devicePagDiv"></div>
      </div>
    </div>
    <div class="modal-footer">
      <input type="hidden" name="PortalPageID" id="PortalPageID" value="0">
      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
    </div>
    </form>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
<style type="text/css">
.modal-dialog {width:720px;}
.modal-body {padding:15px !important;padding-bottom:0px !important;}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript">
var choosed_device_ids = [];

function getChoosedDevice(){
    choosed_device_ids = [];
    if($('div.wifi-portal-device a').length>0){
        $('div.wifi-portal-device a').each(function(x){
            choosed_device_ids.push($('div.wifi-portal-device a').eq(x).attr('deviceid'));
        });
    }
}

function isSelectedDevice(id){
    var check = false;
    for(j=0;j<choosed_device_ids.length;j++){
        if(choosed_device_ids[j]==id){
            check=true;
            break;
        }
    }
    
    return check;
}

function getDeviceList2(){
	$.ajax({
		url:'${pageContext.request.contextPath}/device/searchmerchantsdevice.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{merchantid:__portal_policyOwnerId,devicename:$('div.deviceSeaDiv input#keywords').val(),status:status = $('div.deviceSeaDiv input#status').val()},
		success:function(data){
			if(data.result=='OK'){
				getChoosedDevice();
				$('.deviceResultList').html('');
				for(i=0;i<data.records.length;i++){
					var devname = data.records[i].name;
					var devmac = isNotEmptyString(data.records[i].mac)?data.records[i].mac:'';
					if (!isNotEmptyString(devname)) {
						devname = devmac;
					}
					if(isSelectedDevice(data.records[i].deviceId)===true){
						$('div.deviceResultList').append('<a href="javascript:;" class="choose" deviceid="'+data.records[i].deviceId+'" devicename="'+devname+'"><input type="checkbox" class="" value="'+data.records[i].deviceId+'" checked> '+devname+'</a>');
					}else{
						$('div.deviceResultList').append('<a href="javascript:;" deviceid="'+data.records[i].deviceId+'" devicename="'+devname+'"><input type="checkbox" class="" value="'+data.records[i].deviceId+'"> '+devname+'</a>');
					}
				}
			}
		}
	});
}

function onAddDevice(id,name){
	$('div.wifi-portal-device').append('<a href="javascript:;" deviceid="'+id+'">'+name+' <span class="glyphicon glyphicon-remove delete-device" deviceid="'+id+'"></span></a>');
}

function onDeleteDevice(id){
	$('div.wifi-portal-device a').each(function(){
		if($(this).attr('deviceid')==id) $(this).remove();
    });
}

$(function(){
	$('#status').select2({minimumResultsForSearch:-1,width:100,data:[{id:DEVICE_STATUS_ONLINE,text:'在线'},{id:DEVICE_STATUS_OFFLINE,text:'离线'},{id:DEVICE_STATUS_LOCKED,text:'冻结'}]})
	//getDeviceList2();
	
	$(document).off('div.deviceResultList a');
	$(document).on('click','div.deviceResultList a', function(e){
		if($(this).find('input')[0].checked){
			$(this).find('input')[0].checked=false;
			$(this).removeClass('choose');
			onDeleteDevice($(this).attr('deviceid'));
		}else{
			$(this).find('input')[0].checked=true;
			$(this).addClass('choose');
			onAddDevice($(this).attr('deviceid'), $(this).attr('devicename'));
		}
	});
	
	//$(document).off('div.deviceResultList a input');
	$(document).on('click', 'div.deviceResultList a input', function(e){
		$(this).parent().click();
	});
	
	$('button#searchdevice').click(function(){
		getDeviceList2();
	});

    $('div#ChangeDeviceList').on('show.bs.modal', function(){
    	getDeviceList2();
    });
})
</script>