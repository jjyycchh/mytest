<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<link href="${pageContext.request.contextPath}/resources/css/wifi-portal.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<link href="${pageContext.request.contextPath}/resources/css/select2.css" rel="stylesheet" media="screen">
<style>
.popover{
max-height:900px;
width:550px;
height:260px;
margin-top:120px;
}
</style>
<div class="clear-line"></div>

<!-- portal body -->
<div class="wifi-portal-body">
    <div class="portal-menu">
        <a href="${pageContext.request.contextPath}/merchant/sites.htm">站点管理<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
        <a href="${pageContext.request.contextPath}/merchant/portalpolicies.htm" class="active">推送策略<span class="glyphicon glyphicon-circle-arrow-right"></span></a>
    </div>
    
    <div class="portal-main">
        <div class="wifi-main-navigator">
         <div class="pull-right" style="margin-top:7px"><a href="#" id="span_popover"  data-toggle="popover"><i class="glyphicon glyphicon-question-sign"></i><span style="margin-left:1px">帮助</span></a></div>
            <ol class="breadcrumb">
                <li><a href="${pageContext.request.contextPath}/merchant/portalpolicies.htm" class="ajax-init">推送策略</a></li>
                <li class="active">编辑策略</li>
               </ol>
        </div>
        
        
        <!-- policy item -->
        <div class="wifi-policy-site">
            
			<form class="form-horizontal" role="form">
			<div class="row">
			<div class="col-md-6">
			  <div class="form-group">
			    <label for="titl" class="col-sm-4 control-label">策略标题</label>
			    <div class="col-sm-8">
			      <input type="text" class="form-control" id="PolicyTitle" placeholder="...">
			    </div>
			  </div>
              <div class="form-group" id="SiteAccountList" style="display:none;">
                <label for="titl" class="col-sm-4 control-label">选择商家</label>
                <div class="col-sm-8">
                  <input type="text" id="MerchantID" name="MerchantID" placeholder="...">
                </div>
              </div>
			</div>
			<div class="col-md-6">
			<div class="form-group">
			    <div class="col-sm-8">
			      <div class="wifi-portal-device">
			         
			      </div>
			    </div>
			    <label class="control-label"><a href="javascript:;" id="getMerchantDeviceIDs" class="btn btn-default">选择设备</a></label>
			  </div>
			</div>
			  			 
			  </div>
			  <div class="row" style="padding-bottom:0px">
			   <div class="form-group">
			    <div class="col-md-offset-2 col-md-2">
			      <button type="button" style="margin-left:9px" class="btn btn-primary" id="btn_save_policy">保存策略</button>
			    </div>
			     <div class="col-md-offset-4 col-md-4">
			     <a style="margin-left:70px" href="javascript:;" class="btn btn-info showPortalSiteList">添加策略时间计划</a>
			     </div>
			  </div>
			  </div>
			</form>

            <div class="modal fade" id="ChangeDeviceList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
            <!-- policy item -->
                     
            <div class="portal-policy-main">         
                <div class="portal-site">策略时间计划表</div>
            
	            <div class="policy-content">
	                <table id="tbl_policy_timesheet">
	                    <thead>
	                        <tr>
	                            <td> 优先级</td>
	                            <td class="wpp-hours">00</td>
	                            <td class="wpp-hours">01</td>
	                            <td class="wpp-hours">02</td>
	                            <td class="wpp-hours">03</td>
	                            <td class="wpp-hours">04</td>
	                            <td class="wpp-hours">05</td>
	                            <td class="wpp-hours">06</td>
	                            <td class="wpp-hours">07</td>
	                            <td class="wpp-hours">08</td>
	                            <td class="wpp-hours">09</td>
	                            <td class="wpp-hours">10</td>
	                            <td class="wpp-hours">11</td>
	                            <td class="wpp-hours">12</td>
	                            <td class="wpp-hours">13</td>
	                            <td class="wpp-hours">14</td>
	                            <td class="wpp-hours">15</td>
	                            <td class="wpp-hours">16</td>
	                            <td class="wpp-hours">17</td>
	                            <td class="wpp-hours">18</td>
	                            <td class="wpp-hours">19</td>
	                            <td class="wpp-hours">20</td>
	                            <td class="wpp-hours">21</td>
	                            <td class="wpp-hours">22</td>
	                            <td class="wpp-hours">23</td>
	                        </tr>
	                    </thead>
	                    <tbody id="tb_policy_timesheet"></tbody>
	                </table>
	            </div>
            <!-- ./policy item -->
            </div>
            
        </div>
        <!-- ./policy -->
        
    </div>
</div>
<!--  ./portal -->

<div class="modal fade" id="ChangePortalSiteList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
<div class="clear-line"></div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/select2.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/portal.js"></script>
<script type="text/javascript">portalJS.init();</script>
<script type="text/javascript">
$(document).ready(function(){	
	//	$("#popover_help").popover('show');
	var helpcontents="<span style='color:#ffdd55'>1 如何添加策略？</span></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如下图所示：用户按照图中添加过程进行操作即可。允许用户添加多条策略，多个策略的优先级顺序调节通过操作策略时间计划表来实现。</br><span style='color:#ffdd55;'>2 策略时间计划备注</span></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示用户已添加的策略的个数和优先级顺序，其中，优先级顺便通过鼠标的拖拽进行调整。</br><img style='margin-right:20px;width:450px;height:80px' src='${pageContext.request.contextPath}/resources/img/help_pic2.jpg' />";
	var options={placement:"left",title:"<span style='margin-left:170px'>添加策略常见问题</span>",content:helpcontents,trigger:"click",html:true};
		$("#span_popover").popover(options);
});
</script>
<script type="text/javascript">
var AccountMerchants = [];
var choosed_device_ids = [];
var __base_path = '${pageContext.request.contextPath}';
var __OwnerType      = '${sessionScope.login_account_info.type}';

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

  $(document).ready(function() {
  	__portal_policyId = "${policyId}";

    getAccountList();
    AccountMerchants = __Account_Merchants;
    $('#MerchantID').select2({width:218,data:AccountMerchants});
    $('#MerchantID').on('change', function(){$('div.wifi-portal-device').html('')});
    $('#SiteAccountList').show();
    $('#MerchantID').select2('enable', false);
    if(__OwnerType=='MERCHANT'){
        __portal_policyOwnerId = '${sessionScope.login_account_info.id}';
    }
  	
  	if (isNotEmptyString(__portal_policyId)) {
          LoadPortalDisplayPolicy();
  	}

    $('a#getMerchantDeviceIDs').click(function(){
    	if(__portal_policyOwnerId!=null){
    		$.ajax({
                url:'${pageContext.request.contextPath}/device/getdevicelist.htm',
                type:'GET',
                dataType:'html',
                async:false,
                success:function(data){
                	$('#ChangeDeviceList').html('');
                    $('#ChangeDeviceList').html(data);
                    $('#ChangeDeviceList').modal('show');
                }
            });
    	}
        
    });

  	$('a.showPortalSiteList').click(function(){
        if(__OwnerType!='MERCHANT'&&$('#MerchantID').val()==''){
            alert('请选择商家');
            return false;
        }else{
            $.ajax({
                url:'${pageContext.request.contextPath}/merchant/getpolicysite.htm',
                type:'GET',
                dataType:'html',
                async:false,
                success:function(data){
                	$('#ChangePortalSiteList').html('');
                    $('#ChangePortalSiteList').html(data)
                    $('#ChangePortalSiteList').modal('show');
                }
            });
        }
        
    });
  	
  	
  	//refreshAllItems();
  	//portalPolicyDisplay();
  	onInitPortalPolicyForm();
  });
  
  function LoadPortalDisplayPolicy() {
  	$.ajax({
	type : 'GET',
	dataType : 'json',
	url : '${pageContext.request.contextPath}/merchant/portalpolicydetails.htm',
	data : {
		"policyid": __portal_policyId,
	},
	success : function(data) {
		if (data.result != "FAIL") {
			if (data.portalpolicy != null) {
				/* 		
				policyItems = [{"priority": 2, "starttime": 2, "endtime": 10, "siteid": 1, "sitename": "asdffdsaf"},
                      {"priority": 3, "starttime": 8, "endtime": 12, "siteid": 2, "sitename": "afddsaf"},
                      {"priority": 1, "starttime": 11, "endtime": 22, "siteid": 3, "sitename": "afdssafd"}];  
				*/	
				__portal_policyOwnerId = data.portalpolicy.accountId;
				__portal_deviceIds = data.portalpolicy.devices;
				__portal_policyItems = JSON.parse(data.portalpolicy.displayItems);
				
				$('#MerchantID').select2('val',__portal_policyOwnerId);
			    $('#SiteAccountList').show();
			    $('#merchantID').select2('enable', false);

				$("#PolicyTitle").val(data.portalpolicy.name);
				for(i=0;i<__portal_deviceIds.length;i++){
					$('div.wifi-portal-device').append('<a href="javascript:;" deviceid="'+__portal_deviceIds[i].id+'">'+(__portal_deviceIds[i].name!=''?__portal_deviceIds[i].name:__portal_deviceIds[i].mac)+' <span class="glyphicon glyphicon-remove delete-device" deviceid="'+__portal_deviceIds[i].id+'"></span></a>');
				}
				portalPolicyDisplay();
			}
		}else {
/* 			$.pnotify({
				title : "显示策略加载失败",
				text : data.message,
				type : 'error'
			}); */
			return false;
		}
		},
		error : function(data) {
/* 			$.pnotify({
				title : "无法连接服务器",
				text : "加载显示策略请求提交失败！",
				type : 'error'
			}); */
	
			return false;
		}
		
	});
  }
    
    
</script>
