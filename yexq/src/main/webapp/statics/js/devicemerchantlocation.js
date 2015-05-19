var locationListSearchHandler = null;
locationListSearchHandler = new searchUtil(generateLocationHtml, searchFailCallBack, searchErrorCallBack, null, null,
    "location_list_body", "lb_pagenumber_location", "a_pagination_previous_location", "a_pagination_next_location", 
    "/system/searchmerchantdevicelocation.htm","");

var devicemerchantlocationApp = function(){
    var keywordsSearchLocation = function() {
        locationListSearchHandler.clearResultSetpageNo();
        var locationKeywords = locationListSearchHandler.convertKeywordsSearchable($("#locationKeywords").val());
        locationListSearchHandler.setSearchParemeter('keywords', locationKeywords);
        locationListSearchHandler.setSearchParemeter('accountId', _AccountID);
        locationListSearchHandler.searchWithPreload();
    }
    
    //初始化查询按钮
    var initSearchLocationBtn = function() {
    	$('#btn_search_location').click(function() {
    		keywordsSearchLocation();
    	});
    }
    
    //初始化地区选择框
	var initLocationSelect = function() {
		$('input#select_new_province').xiSelect({
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            defaultData:{value:'',text:''},
            onChange:function(obj) {
            	onChangeProviceSelect($(obj).attr('data-value'));         	            	
            }
        });
		$('input#select_new_city').xiSelect({
	    		offsetSize:[0,3,0,3],
	            onChange:function(obj){
	                onChangeCity($(obj).attr('data-value'));
	            }
	        });
		$('input#select_new_county').xiSelect({offsetSize:[0,3,0,3]});
    }
	
	var initNewLocationBtn = function() {
		$("#btn_new_location").click(function() {
            addNewLocation();
        });
	}

    return {init:function(){
    	locationListSearchHandler.setSearchParemeter('accountId', _AccountID);
    	initSearchLocationBtn();
    	initLocationSelect();
    	initNewLocationBtn();
        locationListSearchHandler.searchWithPreload();
    }}
}();

function generateLocationHtml(locationList){
    var locationListHtml = "";
    if (locationList.length > 0) {            
        for ( var i = 0; i < locationList.length; i++) {
            var locationId = locationList[i].id
        	var province = locationList[i].province;
            var city = locationList[i].city;
            var countyDistrict = 
                (locationList[i].countyDistrict == null) ? "" : locationList[i].countyDistrict;
            var address = 
                (locationList[i].address == null) ? "" : locationList[i].address;
            var location = province + " " + city + " " +
                    countyDistrict + " " + address;
            locationListHtml += "<tr class='ChinaNet-Table-Body-devicelist'>";
            locationListHtml += "<td><span class='Table-Data-Text'>"+ location +"</span></td>";
            locationListHtml += "<td id='btn_" + i + "'>";
            locationListHtml += generateBtn(locationId);
            locationListHtml += "</td></tr>";
        }            
    }        
    return locationListHtml;        
}

function generateBtn(locationId) {
	var locationBtnHtml = "";
	if (locationId != null) {
		locationBtnHtml += "<button class='Form-Primary' onclick='javascript:toMerchantLocation(" + locationId + ")'>";
		locationBtnHtml += "<span>选择</span>";
		locationBtnHtml += "</button> ";
	}
	return locationBtnHtml;
}

function toMerchantLocation(locationId) {
	onConfirmDialog('<p>您确定要将设备转移到这个地址吗？</p>', 
			function(){generateToMerchantOK(locationId)}, function(){});
}

function generateToMerchantOK(locationId) {
	$.ajax({
        url : '/system/radiustomerchant.htm',
        type : 'POST',
        data : {
        	"deviceId" : _DeviceID,
        	"locationId" : locationId,
        	"accountId" : _AccountID
        },
        dataType : 'json',
        async : false,
        success : function(data) {
            if(data.result=='OK') {
                onAlertError("转移成功！");
                dialog.list['Dailogin:MerchantDeviceLocation'].remove().close();
                dialog.list['Dailogin:Device:toMerchant'].remove().close();
                /*deviceSearchHandler.clearResultSetpageNo();
                deviceSearchHandler.searchWithPreload();*/
                loadDeviceInfo();
            } else {
                onAlertError(data.message);
            }
        }
    });
}

function addNewLocation() {
	var province = $("#select_new_province").val();
	var city = $("#select_new_city").val();
	var countyDistrict = $("#select_new_county").val();
	var address = $("#input_new_address").val();
	
	if(!onCheckEmpty(province) || province == '请选择') { 
		onAlertErrorTip('请选择省', document.getElementById('div_new_province'));
		return false;
	}
	if(!onCheckEmpty(city) || city == '请选择') { 
		onAlertErrorTip('请选择市', document.getElementById('div_new_city'));
		return false;
	}
	if(!onCheckMaxLength(address, 150)) {
		onAlertErrorTip('街道信息不能超过150个字符', document.getElementById('div_new_address'));
		return false;
	}
	if(!onCheckLocationExits()) {
		onAlertErrorTip('地址信息已存在', document.getElementById('div_new_province'));
		return false;
	}
	
	$.ajax({
        url : '/system/addnewlocation.htm',
        type : 'POST',
        data : {
        	"accountId" : _AccountID,
        	"province" : province,
        	"city" : city,
        	"countyDistrict" : countyDistrict,
        	"address" : address
        },
        dataType : 'json',
        async : false,
        success : function(data) {
            if(data.result == 'OK') {
            	onAlertError("添加成功！");
            	locationListSearchHandler.clearResultSetpageNo();
            	locationListSearchHandler.searchWithPreload();
            } else {
                onAlertError(data.message);
            }
        }
    });
}

function onCheckLocationExits() {
	var result = false;
	$.ajax({
        url : '/system/locationisexits.htm',
        type : 'GET',
        data : {
        	"accountId" : _AccountID,
        	"province" : $("#select_new_province").val(),
        	"city" : $("#select_new_city").val(),
        	"countyDistrict" : $("#select_new_county").val(),
        	"address" : $("#input_new_address").val()
        },
        dataType : 'json',
        async : false,
        success : function(data) {
            if(data.result == 'OK' && data.message == 'inexistence') {
                result = true;
            } else if(data.result == 'OK' && data.message == 'exits') {
            } else {
                onAlertError(data.message);
            }
        }
    });
	return result;
}

/**
 * 根据地区获取城市列表
 * @param city
 */
function onChangeProviceSelect(provice){
    $('div#div_new_city').html('<input type="text" id="select_new_city" name="select_new_city">');
    $('div#div_new_county').html('<input type="text" id="select_new_county" name="select_new_county">');
    $('input#select_new_city').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCitySelect($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#select_new_county').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}

/**
 * 根据市名获取区/县列表
 * @param city
 */
function onChangeCitySelect(city){
	$('div#div_new_county').html('<input type="text" id="select_new_county" name="select_new_county">');
    $('input#select_new_county').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#select_new_province').val(),city),
        defaultData:{value:'',text:''}
    });
}

function searchFailCallBack(data, message) {
    onAlertError('加载设备数据请求提交失败！');
    return false;
}
        
function searchErrorCallBack(data, message) {
    onAlertError('加载设备数据请求提交失败！');
    return false;
}