<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>


<div class="wifi-main-header">
	<div class="col-xs-3 col-dx-5">
		<div class="input-group date form_date col-md-10" data-date=""
			data-date-format="yyyy-mm-dd" data-link-field="dtp_input2"
			data-link-format="yyyy-mm-dd">
			<input class="form-control" size="16" type="text" value="" readonly>
				<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
		</div>
		<input type="hidden" id="dtp_input2" value="" />
	</div>
	<div class="col-xs-3 col-dx-5">
		<input type="hidden" id="e21" placeholder="选择商户" style="width: 160px;" /> 
	</div>

	<div class="col-xs-3 col-dx-4">
	<input type="hidden" id="e22"
			placeholder="选择设备" style="width: 275px;" />
		<!-- <input type="text" id="keywords" class="form-control"
			placeholder="商户,设备"> -->
		
	</div>
	<div class="col-xs-3 col-dx-6">
		<button id="btn_search_userst" type="button" class="btn btn-info"><span class="glyphicon glyphicon-search"></span> 查询</button>
	</div>
</div>
<div class="clear-line"></div>
<div class="wifi-main-statis">
	<div class="portlet box red">
		<div class="portlet-title">
			<div class="caption">
				<i class="fa fa-reorder"></i>用户分析(X:时间点，Y：用户数)
			</div>
		</div>
		<div class="portlet-body">
			<div id="chart_2" class="chart"
				style="height: 350px; padding: 0px; position: relative;">					 
				<div id="placeholder" class="demo-placeholder"></div>
			</div>
		</div>
	</div>
</div>

	
<script type="text/javascript">
var preload_data = [];
var optAcctType = '${sessionScope.login_account_info.type}';
var optAcctId = null;
$(document).ready(function() {
	var myDate = new Date();
	
	$('.form_date').datetimepicker({
		language : 'zh-CN',
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 2,
		forceParse : 0,
		pickerPosition:"bottom-left"
		//setEndDate : myDate.toUTCString()
	});
	
	if(optAcctType==ACCOUNT_TYPE.MERCHANT){
		optAcctId = '${sessionScope.login_account_info.id}';
    	$('#e21').select2('enable', false);
    	
    	$('#e22').select2({
			 //minimumInputLength: 2,
			 allowClear: true,
			 ajax: {
				 type : 'GET',
				 dataType : 'json',
				 url: '${pageContext.request.contextPath}/user/user_devicelist.htm',
				 quietMillis: 100,
				 data: function (term, pageNo) { // page is the one-based page number tracked by Select2
				 return {
					 devicename: term, //search term
					 accountid: optAcctId, // page size
				 	 pageNo: pageNo // page number
				 	 
				 };
				 },
				 results: function (data, pageNo) {
					var more = true;
				 //var more = (pageNo * 10) < data.totalRecord; // whether or not there are more results available
				 // notice we return the value of more so Select2 knows if more results can be loaded
				 if(data.records.length==0){
					 more = false;
				 }
				 preload_data = [];
				 if (data.records != null && data.records.length > 0) {	
					 for ( var i = 0; i < data.records.length; i++) {
							preload_data.push({id: data.records[i].deviceId, merchantName: data.records[i].name});
						}
				 }
				 
				 return {results: preload_data, more: more};
				 }
				 },
				 formatResult: mFormatResult, // omitted for brevity, see the source of this page
				 formatSelection: mFormatSelection, // omitted for brevity, see the source of this page
				 dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
				 escapeMarkup: function (m) { return m; }
			});
    }else{
    	$('#e21').select2({
   		 minimumInputLength: 2,
   		 allowClear: true,
   		 ajax: {
   			 type : 'GET',
   			 dataType : 'json',
   			 url: '${pageContext.request.contextPath}/user/user_merchantlist.htm',
   			 quietMillis: 100,
   			 data: function (term, pageNo) { // page is the one-based page number tracked by Select2
   			 return {
   				 merchantname: term, //search term
   			 	 //page_limit: 10, // page size
   			 	 pageNo: pageNo // page number
   			 	 
   			 };
   			 },
   			 results: function (data, pageNo) {
   				var more = true;
   			 //var more = (pageNo * 10) < data.totalRecord; // whether or not there are more results available
   			 //alert(more);
   			 // notice we return the value of more so Select2 knows if more results can be loaded
   			 if(data.records.length==0){
   				 more = false;
   			 }
   			 return {results: data.records, more: more};
   			 }
   			 },
   			 formatResult: mctFormatResult, // omitted for brevity, see the source of this page
   			 formatSelection: mctFormatSelection, // omitted for brevity, see the source of this page
   			 dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
   			 escapeMarkup: function (m) { return m; }
   	});
    }
	
	//$("#e21").select2({tags:["red", "green", "blue", "orange", "white", "black", "purple", "cyan", "teal"]});
 	$("#e21").on("click", function() {
		 if($("#e21").val()==null || $("#e21").val()==''){
			 $("#e22").select2("enable", false);
		 }
		 else{
			 $("#e22").select2("enable", true);
		 }
 	});
 	
 	
	$("#e21").on("change", function() {
		$('#e22').select2({
			 //minimumInputLength: 2,
			 allowClear: true,
			 ajax: {
				 type : 'GET',
				 dataType : 'json',
				 url: '${pageContext.request.contextPath}/user/user_devicelist.htm',
				 quietMillis: 100,
				 data: function (term, pageNo) { // page is the one-based page number tracked by Select2
				 return {
					 devicename: term, //search term
					 accountid: $("#e21").val(), // page size
				 	 pageNo: pageNo // page number
				 	 
				 };
				 },
				 results: function (data, pageNo) {
					var more = true;
				 //var more = (pageNo * 10) < data.totalRecord; // whether or not there are more results available
				 // notice we return the value of more so Select2 knows if more results can be loaded
				 if(data.records.length==0){
					 more = false;
				 }
				 preload_data = [];
				 if (data.records != null && data.records.length > 0) {	
					 for ( var i = 0; i < data.records.length; i++) {
							preload_data.push({id: data.records[i].deviceId, merchantName: data.records[i].name});
						}
				 }
				 
				 return {results: preload_data, more: more};
				 }
				 },
				 formatResult: mFormatResult, // omitted for brevity, see the source of this page
				 formatSelection: mFormatSelection, // omitted for brevity, see the source of this page
				 dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
				 escapeMarkup: function (m) { return m; }
			}); 
	});
	
	
	getUserStatisticsData(null);
	
	$("#btn_search_userst").click(function() {
		
		getUserStatisticsData($("#dtp_input2").val());
	});
});



function getUserStatisticsData(chkdate) {
	if(optAcctType==ACCOUNT_TYPE.MERCHANT){
		optAcctId = '${sessionScope.login_account_info.id}';
	}
	else{
		optAcctId = $("#e21").val();
	}
	//alert(optAcctId);
	$.ajax({
		type : 'GET',
		dataType : 'json',
		url : '${pageContext.request.contextPath}/user/usersstatis.htm',
		data : {
			'date' : chkdate,
			'deviceid' : $("#e22").val(),
			'accountid' : optAcctId
		},
		
		success : function(data) {
			//data  = {"usersstatis":{"9":1},"result":"OK","date":"date"};
			if (data.result != 'FAIL' && data.usersstatis != null) {
				 	//分析数据-----				 	
				 	/* if(JSON.stringify(data.usersstatis)!="{}"){
				 		FlotlineChart(data.usersstatis);
				 	} */
				 	UsersChart(data.usersstatis);
			} else {
/* 				$.pnotify({
					title : "数据加载失败",
					type : 'error'
				}); */
				return false;
			}
		},
		error : function(data) {
/*  			$.pnotify({
				title : "无法连接服务器",
				text : "加载数据请求提交失败！",
				type : 'error'
			}); */

			return false;
		}
	});
}
function UsersChart(usersStatis){
	var sin = [];
	var ticks= [];
	if (usersStatis != null) {
		for(var i=0;i<24;i++){
			if(typeof(usersStatis[i])=="undefined"){				
				sin.push(0);
			}else{
				sin.push(usersStatis[i]);
			}
			ticks.push(i);	
		}
	}
	//sin = [0,1,2,3,4,5,6,7,8,9,20,11,12,23,14,15,16,17,1,8,20,2,1,22];
	$('#placeholder').highcharts({
		credits:false,
		chart: {
			type: 'area',
            borderRadius:2,
            backgroundColor:'#fff'
		},
		
		title: { text: '' }, 
		subtitle: { text: '' }, 
		xAxis: { 
			categories:ticks,
			gridLineWidth:1,
			gridLineColor:'#eee'
		}, 
		yAxis: { 
			title: {
                text: ''
            },
            min:0,
            gridLineWidth:1,
            gridLineColor:'#eee'
		}, 
		tooltip: { 
			//pointFormat: '接入用户数: <b>{point.y:,.0f}（人）</b>'
			formatter: function() { 
				return this.x +'点接入用户数: <b>'+ this.y +' </b>人'; } 
		},
		
		legend: { 
			 	align:'right',
                verticalAlign:'top',
                floating:true,
                symbolRadius:2,
                symbolHeight:12,
                symbolWidth:12
		},
		series: [{
		name: '用户数(个)',
		data: sin
		}]
	});
}
</script>