var devicemerchantlistApp = function(){
    var deviceMerchantListSearchHandler = null;

    deviceMerchantListSearchHandler = new searchUtil(generateDeviceMerchentListHtml, searchFailCallBack, searchErrorCallBack, null, null,
    "merchant_list_body", "lb_pagenumber_merchant", "a_pagination_previous_merchant", "a_pagination_next_merchant", 
    "/system/searchdevicemerchant.htm","");

    var keywordsSearchMerchant = function() {
        deviceMerchantListSearchHandler.clearResultSetpageNo();
        var merchantKeywords = deviceMerchantListSearchHandler.convertKeywordsSearchable($("#merchantKeywords").val());
        deviceMerchantListSearchHandler.setSearchParemeter('merchantKeywords', merchantKeywords);
        deviceMerchantListSearchHandler.searchWithPreload();
    }
    var onsearchMerchant = function(){
        $("#btn_search_merchant").click(function() {
            keywordsSearchMerchant();
        });
    }

    return {init:function(){
        deviceMerchantListSearchHandler.searchWithPreload();
        onsearchMerchant();
    }}
}();

function generateDeviceMerchentListHtml(merchantList){
    var merchantListHtml = "";
    if (merchantList.length > 0) {            
        for ( var i = 0; i < merchantList.length; i++) {
            var accountId = merchantList[i].id;
            var accountUsername = merchantList[i].username;
            var accountMerchantName = null;
            if(merchantList[i].merchantName != null) {
            	accountMerchantName = merchantList[i].merchantName;
            } else if(merchantList[i].fullname != null) {
            	accountMerchantName = merchantList[i].fullname;
            }
            
            merchantListHtml += "<tr class='ChinaNet-Table-Body-devicelist'>";
            merchantListHtml +=     "<td><a href='javascript:selectMerchantDeviceLocation(" + accountId + ");' data-public-params='"+accountId+"' class='Table-Data-Name-Link'>" + accountUsername + "</a>";
            merchantListHtml +=     "<td><span class='Table-Data-Text'>"+ accountMerchantName +"</span></td>";
            merchantListHtml += "</tr>";
        }            
    }        
    return merchantListHtml;        
}

function selectMerchantDeviceLocation(accountId) {
	$.ajax({
        url : '/system/merchantdevicelocationpage.htm?accountId='+accountId+'&deviceId='+_DeviceID,
        type : 'GET',
        dataType : 'HTML',
        async : false,
        success : function(data) {
            if(data.result=='FAIL') {
                error = data.message;
            } else {
                content = data;
            }
        }
    });
    var d = dialog({
        id: 'Dailogin:MerchantDeviceLocation',
        title: '选择商户设备的所在地',
        content: content,
        cancelValue: '取消',
        cancel: function () {},
        width:800,
        height:640,
        zIndex:20,
        skin:'ChinaNet-Dialog'
    });
        d.showModal();
}

function searchFailCallBack(data, message) {
    onAlertError('加载设备数据请求提交失败！');
    return false;
}
        
function searchErrorCallBack(data, message) {
    onAlertError('加载设备数据请求提交失败！');
    return false;
}