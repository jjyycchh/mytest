function goPage(pageNum){
		if(!pageNum){
			pageNum = $("#pageNum").val();
		}
		var pageTotal = $("#pageTotal").val();
		if(pageNum>pageTotal){
			pageNum = pageTotal;
			$("#pageNum").val(pageNum);
		}
		if(pageNum < 1){
			pageNum = 1;
			$("#pageNum").val(1);
		}
		initPage(pageNum);
}
/**
 * @param totalRecord 总记录数
 * @param pageNo 当前页码
 * @param pageSize 页显示记录数
 * 
 * @returns 分页HTML
 * */
function pageCreateHtml(totalRecord,pageNo,pageSize){
	var totalPage = (totalRecord % pageSize) == 0 ? 
			parseInt(totalRecord/pageSize) : parseInt(totalRecord/pageSize) + 1;
	if(totalRecord == 0) 
		pageNo = 0;
	var HtmlContent = "";
	HtmlContent += "共" + totalRecord + "条记录，";
	HtmlContent += "每页" + pageSize + "条&nbsp;";
	HtmlContent += pageNo + "/" + totalPage;
	if(pageNo != 0){
		
		if(pageNo != 1){
			HtmlContent += "<A HREF=\"javascript:goPage(1)\">【首页】</a>";
			HtmlContent += "<A HREF=\"javascript:goPage(" + (pageNo - 1) + ")\">【上一页】</a>";
		}
		if(pageNo != totalPage){
			HtmlContent += "<A HREF=\"javascript:goPage(" + (pageNo + 1) + ")\">【下一页】</a>";
			HtmlContent += "<A HREF=\"javascript:goPage(" + totalPage + ")\">【尾页】</a>";
		}
	}
	return HtmlContent;
}
var device_info = null;
function initPage(i){
	/*if(i){
		var pageParams={
			start : (i-1)*$.pageSize,
			pageSize : $.pageSize
		}
		$.apply(queryParams,pageParams);
	}*/
	var keywords = document.getElementById("keywords").value;
	var type= document.getElementById("type").value;
	var province = document.getElementById("SelectDeviceProviceList").value;
	var city = document.getElementById("SelectDeviceCityList").value;
	if(!onCheckMaxLength(keywords,20)) {
		onAlertErrorTip('关键字不能超过20个字符', document.getElementById('keywords'));
		return false;
	}
	$.ajax({
		url:'/device/searchdevice.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{
			merchantid:"",
			devicename:"",
			status:"",
			keywords:keywords,
			type:type,
			province:province,
			city:city,
			pageNo:i
		},
		success:function(data){
			if(data.result=='OK'){
				//数据
				device_info = data;
				var evalText = doT.template($("#dataList_template").html());
				$("#data_list_div").html(evalText(data));
				//分页
				var htmlText = pageCreateHtml(data.totalRecord,data.pageNo,data.pageSize);
				$("#page_div").html(htmlText);
			} else {
//				$.msgBox.alert("数据加载失败!"+data.message);
				alert("数据加载失败!"+data.message);
			}
		}
	});
}
function enterSubmit() {
	$(".contentMain").keypress(function (e){
		var code = e.keyCode;
		if (13 == code) {
			initPage(1);
		}
		});
}

function doSubmit(theform) {
	initPage(1);
	event.stopPropagation(); 
}
	
//初始化所在地
var initLocationSelect = function(){
	$("#SelectDeviceProvinceList").show();
	$("#SelectDeviceCityList").hide();
	$("#SelectDeviceCountyList").hide();
	loadProvice();
}
//取省份数据列表
var  loadProvice = function() {
	var sel_provice = $("#SelectDeviceProviceList");  
    for(var cx=0;cx<arrCity.length;cx++){
    	if(arrCity[cx].name == "请选择" || arrCity[cx].name == "其他") {
    		sel_provice.append("<option value = ''>"+arrCity[cx].name+"</option>");
    	} else {
    		sel_provice.append("<option value = '"+arrCity[cx].name+"'>"+arrCity[cx].name+"</option>");
    	}
    }
}
//获取城市列表
function loadCity() {
	var prov = document.getElementById("SelectDeviceProviceList").value;
	var sel_city = $("#SelectDeviceCityList"); 
	if(prov != "请选择" && prov != "") {
		$("#SelectDeviceCityList").show();
		document.getElementById("SelectDeviceCityList").options.length = 0;
		for(var cx=0;cx<arrCity.length;cx++){
	        if(arrCity[cx].name==prov){
	            for(var ix=0;ix<arrCity[cx].sub.length;ix++){
	            	if(arrCity[cx].sub[ix].name == "请选择" || arrCity[cx].sub[ix].name == "其他") {
	            		sel_city.append("<option value = ''>"+arrCity[cx].sub[ix].name+"</option>");
	            	} else {
	            		sel_city.append("<option value = '"+arrCity[cx].sub[ix].name+"'>"+arrCity[cx].sub[ix].name+"</option>");
	     	        }
	            }
	            break;
	        }
	    }
	} else {
		$("#SelectDeviceCityList").hide();
		document.getElementById("SelectDeviceCityList").options.length = 0;
	}
}
//获取区县数据列表
function loadCountyList() {
	var prov = document.getElementById("SelectDeviceProviceList").value;
	var city = document.getElementById("SelectDeviceCityList").value;
	var sel_county = $("#SelectDeviceCountyList"); 
	if(city != "请选择" && city != "") {
		$("#SelectDeviceCountyList").show();
		for(var cx=0;cx<arrCity.length;cx++){
	        if(arrCity[cx].name==prov){
	            var proObj = arrCity[cx].sub;
	            for(var cv=0;cv<proObj.length;cv++){
	                if(proObj[cv].name==city){
	                    var cityObj = proObj[cv].sub;
	                    if(typeof cityObj!='undefined') {
	                        for (var cz = 0; cz < cityObj.length; cz++) {
	                        	if(cityObj[cz].name == "请选择" || cityObj[cz].name == "其他") {
	                        		sel_county.append("<option value = ''>"+cityObj[cz].name+"</option>");
	                        	} else {
	                        		sel_county.append("<option value = '"+cityObj[cz].name+"'>"+cityObj[cz].name+"</option>");
	                        	}
	                        }
	                    }
	                    break;
	                }
	            }
	            break;
	        }
	    }
	} else {
		$("#SelectDeviceCountyList").hide();
		document.getElementById("SelectDeviceCountyList").options.length = 0;
	}
}

//重置
function reset(i) {
	document.getElementById("keywords").value = "";
	if(i) {
		document.getElementById("type")[0].selected = true;//选中
	}
//	document.getElementById("group")[0].selected = true;//选中
	document.getElementById("SelectDeviceProviceList")[0].selected = true;//选中
	document.getElementById("SelectDeviceCityList")[0].selected = true;
//	document.getElementById("SelectDeviceCountyList")[0].selected = true;
	initLocationSelect();
}
//查询详情
function showhideinfo(it) {
	var dev_id = it.id;
	var type = it.name;
	for(var mx=0;mx<device_info.records.length;mx++){
		var dev_data = device_info.records[mx];
		if(dev_data.deviceId == dev_id) {
			if(dev_data.type == "FIT_AP") {
            	dev_type = "瘦AP";
            	showFitApDetails();
            	document.getElementById("title:fitAPInfo").innerHTML = "设备类型——"+dev_type;
            	document.getElementById("win_versions").innerHTML=dev_data.framewareVersion+"/"+dev_data.componentVersion;
            	document.getElementById("win_brand_model").innerHTML=dev_data.brand+"/"+dev_data.model;
            	//document.getElementById("win_merchant").innerHTML=dev_data.manufacturerId;
            } else if(dev_data.type == "FAT_AP") {
            	dev_type = "胖AP";
            	showFatApDetails();
            	document.getElementById("win_versions").innerHTML=dev_data.framewareVersion+"/"+dev_data.componentVersion;
            	document.getElementById("win_brand_model").innerHTML=dev_data.brand+"/"+dev_data.model;
            	document.getElementById("win_xy_pox").innerHTML=dev_data.xPos+"/"+dev_data.yPos;
            	document.getElementById("title:fatAPInfo").innerHTML = "设备类型——"+dev_type;
				
            } else if(dev_data.type == "BAS") {
            	dev_type = "专用BAS";
            	showBasDetails();
            	document.getElementById("win_brand").innerHTML=dev_data.brand;
            	document.getElementById("win_model").innerHTML=dev_data.model;
            	document.getElementById("title:basInfo").innerHTML = "设备类型——"+dev_type;
				
            } else if(dev_data.type == "AC" ) {
            	dev_type = "AC";
            	showBasDetails();
            	document.getElementById("win_brand").innerHTML=dev_data.brand;
            	document.getElementById("win_model").innerHTML=dev_data.model;
            	document.getElementById("title:basInfo").innerHTML = "设备类型——"+dev_type;
				
            } else {
            	dev_type = dev_data.type;
            	showBasDetails();
            	document.getElementById("title:basInfo").innerHTML = "设备类型——"+dev_type;
				
            }
			  document.getElementById("win_devid").innerHTML=dev_data.deviceId;
              document.getElementById("win_type").innerHTML=dev_type;
              document.getElementById("win_group").innerHTML=dev_data.groupName;
              document.getElementById("win_mac").innerHTML=dev_data.mac;
              document.getElementById("win_location").innerHTML=dev_data.province+"--"+dev_data.city;
              document.getElementById("win_create_datatime").innerHTML=dev_data.createDatetime;
              //document.getElementById("win_merchant").innerHTML=dev_data.ssid;
             break;
		}
	}
	 $.ajax({
   		url:'/device/searchdevicedetail.htm',
   		type:'GET',
   		dataType:'JSON',
   		async:false,
   		data:{merchantid:"",devicename:"",status:"",device_id:dev_id,type:type},
   		success:function(data){
   			if(data.result=='OK'){
   				//数据
   					var detailData = data.record;
   					if(detailData != "") {
                       if(type == "FIT_AP") {
                       	/*document.getElementById("win_versions").innerHTML=detailData.framewareVersion+"/"+detailData.componentVersion;
                       	document.getElementById("win_brand_model").innerHTML=detailData.brand+"/"+detailData.model;*/
                       	document.getElementById("win_ssid").innerHTML=detailData.ssid;
                       	document.getElementById("win_p_ac").innerHTML=detailData.acDeviceId;
                       	document.getElementById("win_merchant").innerHTML=detailData.ssid;
                       } else if(type == "FAT_AP") {
                       	document.getElementById("win_versions").innerHTML=detailData.framewareVersion+"/"+detailData.componentVersion;
                       	document.getElementById("win_brand_model").innerHTML=detailData.brand+"/"+detailData.model;
                       	document.getElementById("win_xy_pox").innerHTML=detailData.xPos+"/"+detailData.yPos;
                       	//document.getElementById("win_merchant").innerHTML=detailData.manufacturerId;
                       	
                       } else if(type == "BAS" || type == "AC" ) {
                    	   document.getElementById("win_ip_port").innerHTML =detailData.ipAddr+"/"+detailData.port;
                       	
                       } else {
           				
                       }
   					}
   			} else {
//   				$.msgBox.alert("数据加载失败!"+data.message);
   				alert("数据加载失败!"+data.message);
   			}
   		}
   	});
}
//胖AP详情
var showFatApDetails = function() {
	var fatApDetailsHtml="";
	fatApDetailsHtml+="<table width='100%' align='center' cellpadding='1' cellspacing='1'>";
	fatApDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备ID： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_devid'></td>";
	fatApDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>类型： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_type'></td></tr>";
	fatApDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>所属组 ：</div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_group'></td>";
	fatApDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>所在地： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_location'></td></tr>";
	fatApDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备MAC ：</div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_mac'></td>";
	fatApDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>创建时间： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_create_datatime'></td></tr>";
	
	fatApDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>固件/组件版本： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_versions'></td>";
	fatApDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>品牌/型号： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_brand_model'></td></tr>";
	fatApDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>经/纬度：</div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_xy_pox'></td>";
	fatApDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>所属商户： </div></td>"
	fatApDetailsHtml+="<td class='qryTD02' width='25%' id='win_merchant'></td></tr>";
	fatApDetailsHtml+="</table>";
	
	var d_ModelInfo_add = dialog({
    	id: 'fatAPInfo',
        title: '设备类型——',
        style: 'float:right',
        content: fatApDetailsHtml,
        /*okValue: '完成',
        ok: function () {
        	submitDeviceModelAdd();
        	return false;
        },
        cancelValue: '取消',
        cancel: function () {},*/
        width:700,
        height:200,
        skin:'ChinaNet-Dialog'
    });
	
	d_ModelInfo_add.showModal();
//	getDeviceManuName();
}

//BAS详情
var showBasDetails = function() {
	var basDetailsHtml="";
	basDetailsHtml+="<table width='100%' align='center' cellpadding='1' cellspacing='1'>";
	basDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备ID： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_devid'></td>";
	basDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>类型： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_type'></td></tr>";
	basDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>所属组 ：</div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_group'></td>";
	basDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>所在地： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_location'></td></tr>";
	basDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备MAC ：</div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_mac'></td>";
	basDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>创建时间： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_create_datatime'></td></tr>";
	basDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备品牌： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_brand'></td>";
	basDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>设备型号： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_model'></td></tr>";
	basDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备IP/端口号： </div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_ip_port'></td>";
	basDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>所属帐号 ：</div></td>"
	basDetailsHtml+="<td class='qryTD02' width='25%' id='win_mac'></td></tr>";
	basDetailsHtml+="</table>";
	
	var d_ModelInfo_add = dialog({
    	id: 'basInfo',
        title: '设备类型——',
        style: 'float:right',
        content: basDetailsHtml,
        /*okValue: '完成',
        ok: function () {
        	submitDeviceModelAdd();
        	return false;
        },
        cancelValue: '取消',
        cancel: function () {},*/
        width:700,
        height:210,
        skin:'ChinaNet-Dialog'
    });
	
	d_ModelInfo_add.showModal();
//	getDeviceManuName();
}

//FIT_AP详情
var showFitApDetails = function() {
	var fitDetailsHtml="";
	fitDetailsHtml+="<table width='100%' align='center' cellpadding='1' cellspacing='1'>";
	fitDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备ID： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_devid'></td>";
	fitDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>类型： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_type'></td></tr>";
	fitDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>所属组 ：</div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_group'></td>";
	fitDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>所在地： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_location'></td></tr>";
	fitDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备MAC ：</div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_mac'></td>";
	fitDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>创建时间： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_create_datatime'></td></tr>";
	
	fitDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>设备SSID： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_ssid'></td>";
	fitDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>设备信息： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_device_info'></td></tr>";
	fitDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>固件/组件版本： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_versions'></td>";
	fitDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>品牌/型号： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_brand_model'></td></tr>";
	fitDetailsHtml+="<tr><td width='15%' class='qryTD01'><div align='center'>所属帐号 ：</div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_mac'></td>";
	fitDetailsHtml+="<td width='15%' class='qryTD01'><div align='center'>所属AC： </div></td>"
	fitDetailsHtml+="<td class='qryTD02' width='25%' id='win_p_ac'></td></tr>";
	fitDetailsHtml+="</table>";
	
	var d_ModelInfo_add = dialog({
    	id: 'fitAPInfo',
        title: '设备类型——',
        style: 'float:right',
        content: fitDetailsHtml,
        /*okValue: '完成',
        ok: function () {
        	submitDeviceModelAdd();
        	return false;
        },
        cancelValue: '取消',
        cancel: function () {},*/
        width:700,
        height:240,
        skin:'ChinaNet-Dialog'
    });
	
	d_ModelInfo_add.showModal();
//	getDeviceManuName();
}