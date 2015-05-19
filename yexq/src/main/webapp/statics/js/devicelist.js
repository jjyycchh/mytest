

var devicelistApp = function(){
	var devicelistSearchHandler = null;
	var devsyn_status = null;

	devicelistSearchHandler = new searchUtil(generatedevicelistHtml, searchFailCallBack, searchErrorCallBack, null, null,
	"devicelist_body", "lb_pagenumber_syn", "a_pagination_previous_syn", "a_pagination_next_syn", 
	"/device/searchdevice.htm","");

	var keywordsSearchsyn = function() {
		devicelistSearchHandler.clearResultSetpageNo();
		devsyn_status = $("#DeviceStatussyn").val();
		devicelistSearchHandler.setSearchParemeter('status', devsyn_status);
		var deviceSearchKeywords = devicelistSearchHandler.convertKeywordsSearchable($("#synkeywords").val());
		devicelistSearchHandler.setSearchParemeter('keywords', deviceSearchKeywords);
		devicelistSearchHandler.searchWithPreload();
	}
	var onsearchDevicesyn = function(){
		$("#btn_search_devicesyn").click(function() {
			keywordsSearchsyn();
		});
	}
	var initDeviceSelect = function(){
        $('#DeviceStatussyn').xiSelect({offsetSize:[0,3,0,3],defaultData:{value:"",text:"全部"}, data:[{value:'',text:'全部'},{value:'ONLINE',text:'在线'},{value:'OFFLINE',text:'离线'},{value:'LOCKED',text:'锁定'}]})
    }
	
	var selectDevice = function(){		
		$('.ChinaNet-Table-Body-devicelist input').die().live('click',function(e){						
			if($(this).attr("checked")){
				select_device_ids.push($(this).attr('value'));
			}else{
				select_device_ids.remove($(this).attr('value'));
			}
			//console.log(select_device_ids);
		});
	}
	return {init:function(){
		select_device_ids = [];
		devicelistSearchHandler.searchWithPreload();	
		initDeviceSelect();
		onsearchDevicesyn();
		selectDevice();
	}}
}();

function generatedevicelistHtml(deviceList){
	var devListHtml = "";
	if (deviceList.length > 0) {			
		for ( var i = 0; i < deviceList.length; i++) {
			var device_id = deviceList[i].deviceId;
			var device_ssid = null;
			var device_config = deviceList[i].configItems;
			if (isNotEmptyString(device_config)) {
				var objConfig = JSON.parse(device_config);
				device_ssid = objConfig.ssid;
			}
			var device_name = deviceList[i].name;
			if (!isNotEmptyString(device_name)) {
				device_name = "";
			}
			else {
				if (isNotEmptyString(device_ssid)) {
					device_name += " (" + device_ssid + ")";
				}
			}				
			var disabledstr = device_id==__DATA_PUBLIC_KEY?'disabled=\'disabled\'':'';
			
			devListHtml += "<tr class='ChinaNet-Table-Body-devicelist'>";
			devListHtml += "<td><input type='checkbox'  "+disabledstr+"  class=''  value="+device_id+"></td>";
			devListHtml += "<td><span class='Table-Data-Text'>"+ device_id +"</span></td>";
			devListHtml += "<td><span class='Table-Data-Text'>"+ device_name +"</span></td>";
			devListHtml += "</tr>";
		}			
	}		
	return devListHtml;		
}

function searchFailCallBack(data, message) {
	onAlertError('加载设备数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载设备数据请求提交失败！');
	return false;
}