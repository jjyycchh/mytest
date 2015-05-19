

var accountinfoApp = function(){
	
	var subacctSearchUtil = null;
	var logSearchUtil = null;
	var logSearch = function(){	
	logSearchUtil = new searchUtil(	generateSimpleSelfOptLogHtml, searchLogFailCallBack, searchLogErrorCallBack, null, null,
			"optlog_lst", "lb_log_pagenumber", "a_log_pagination_previous", "a_log_pagination_next",
			'/account/account_log.htm', "");
	logSearchUtil.setSearchParemeter('accountid', _AccountID);
	logSearchUtil.setSearchParemeter('display', 'complex');
	
	}
	var subacctSearch = function(){
		subacctSearchUtil = new searchUtil(	generateAcctListHtml, searchFailCallBack, searchErrorCallBack, null, null,
				"subacct_lst", "lb_pagenumber", "a_pagination_previous", "a_pagination_next",
				'/account/search_direct_sub.htm', "");
		subacctSearchUtil.setSearchParemeter('directParentId', _AccountID);
		subacctSearchUtil.setSearchParemeter('display', 'complex');
	}
	
	
	function generateSimpleSelfOptLogHtml(records) {
		records = records || {};				
		var optLogHtml = null;
		if (records.length > 0) {
			optLogHtml = "";
			
			for (var i = 0; i < records.length ; i++) {
				optLogHtml += "<tr class='ChinaNet-Table-Body'><td><span class='Table-Data-Text'>" + records[i].createDatetime + "</span></td><td><span class='Table-Data-Text'>" + records[i].description + "</span></td><tr>";
			}
		}
		else{
			$("#optlogpage").hide();
		}
					
		return optLogHtml;
	}
	
	var resetPWD = function(){
		$("#rsetpwd").click(function(){
			$.ajax({
    			url: "/account/resetpwd.htm", 
    		    type: 'GET',
    		    dataType: 'json',
    		    data: {'accountid' : accountid},
    		    success: function (data) {
    				if (data.result == 'OK') {
    					onAlertError('重置密码操作成功！');
    				} 
    				else {    					
    						onAlertError('重置密码操作失败！');   					
    				}
    				
    		    },
    		    error: function (data) {
    		    }
    		});	
			
		});
		
	}
	
	var initresetOPT = function(){
		if(__CONTEXT_MERCHANT_CODE =='SUPER_MAN' || __CONTEXT_MERCHANT_CODE == 'ADMINISTRATOR'){
			$('#linkforedit').append('<a href="javascript:;" id="rsetpwd" class="Device-Settings-Restart">重置密码</a>');
			$('#linkforedit').append('<a href="javascript:;" id="setadjs" class="Device-Settings-Adjs"><span>修改商户广告代码</span></a>');
		}
	}
	
	// 修改商户广告代码
    var onEditAdvertCode = function(){
        $('#setadjs').unbind('click').click(function(){
            var AdHtml="";
            AdHtml += "<div class='Password-Settings-Body'>";
            AdHtml += "   <div class='ChinaNet-Form-Sheet'>";
            AdHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>广告JS代码</label>";
            AdHtml += "   	<div class='Form-Item-TextareaHigh ChinaNet-Col-9'><TEXTAREA id='txt_adjs' name='txt_adjs' type='text' rows='5'> </TEXTAREA></div>";
            AdHtml += "   </div>";
            AdHtml += "   <div class='ChinaNet-Form-Sheet'>";
            AdHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>广告状态</label>";
            AdHtml += "   	<div class='Form-Item-Select ChinaNet-Col-5'><input type='text' id='input_adjs_status'></div>";
            AdHtml += "	  </div>";
            AdHtml += "</div>";
            var d_AD = dialog({
                id: 'Dailogin:AD',
                title: '商户广告代码',
                content: AdHtml,
                okValue: '确定',
                ok: function(){editAdJS();return false;},
                cancelValue: '取消',
                cancel: function () {},
                width:600,
                height:300,
                skin:'ChinaNet-Dialog'
            });
            _initStatus = 'OPEN';
            $.ajax({
    			type : 'GET',
    			dataType : 'json',
    			url : '/merchant/supergetadvertjs.htm',
    			data : {
    				'accountId' : _AccountID
    			},
    			async:false,
    			success : function(data) {
    				if (data.result == 'OK' && data.data != null) {
    						$("#txt_adjs").val(data.data);
    						_initStatus = data.status;
    				} else {
    					return false;
    				}
    			},
    			error : function(data) {
    				return false;
    			}
    		});
            var _statusData = {dataList:[{'value':'OPEN','text':'使用中'},{'value':'CLOSE','text':'停用'},{'value':'CHECK','text':'待审核'}], data:{OPEN:'使用中',CLOSE:'停用',CHECK:'待审核'}};
            $('#input_adjs_status').xiSelect({offsetSize:[0,3,0,3],data:_statusData.dataList,defaultData:{value:_initStatus,text:_statusData.data[_initStatus]}});
            d_AD.showModal();           
        });
    }
	var editAdJS = function(){
		//console.log("edit");
		var adjs = $("#txt_adjs").val();
		var adstatus = $("#input_adjs_status").val();
		$.ajax({
	        type: 'POST',
	        dataType: 'json',
	        url: '/merchant/updateadvertjs.htm',
	        data: {
	        	"accountId" : _AccountID,
	        	"js" : adjs,
	        	"status" : adstatus
	        },
	        success: function (data) {
	        	if (data.result == 'OK') {
	            	onAlertError('广告代码修改成功！',"ok");
	            	dialog.list['Dailogin:AD'].remove().close();
	            } else {                   
	                onAlertError('广告代码修改失败!' + data.message);
	            }
	        },
	        error: function (data) {
	        	onAlertError('广告代码修改失败!' + data.message);
	        }
	    });
	}
	function generateAcctListHtml(account_lst) {
		var acctListHtml = "";

		if (account_lst != null && account_lst.length > 0 ) {
			for ( var i = 0; i < account_lst.length; i++) {
				var acctListItemHtml = "<tr class='ChinaNet-Table-Body' >";
				var geoLocation = account_lst[i].geoLocation;
				var username=account_lst[i].username;
				var merchantname="";
				var fullname="";
				if(account_lst[i].type == ACCOUNT_TYPE.MERCHANT){
					merchantname = account_lst[i].merchantName;
				}
				else{
					fullname = account_lst[i].fullname;
				}
				var province = "";
				var city = "";
				var county = "";
				var address = "";
				
				if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
					geoLocation = JSON.parse(geoLocation);
					
					province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
					city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
					county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
					address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
				}
				
				
				if(username.length > 20){
					username = username.substring(0,20);
					acctListItemHtml += "<td><span class='Table-Data-Text'>" + username ;
					acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+ account_lst[i].username+"' id=''></i></a>";	
					acctListItemHtml +=  "</span></td>";
				}
				else{
					acctListItemHtml += "<td><span class='Table-Data-Text'>" + account_lst[i].username + "</span></td>";
				}				
				if (account_lst[i].type == ACCOUNT_TYPE.MERCHANT) {
					if(merchantname.length > 20){						
						merchantname = merchantname.substring(0,20);
						acctListItemHtml += "<td><span class='Table-Data-Text'>" + merchantname ;
						acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+ account_lst[i].merchantName+"' id=''></i></a>";	
						acctListItemHtml += "</span></td>";
					}
					else{
						acctListItemHtml += "<td><span class='Table-Data-Text'>" + account_lst[i].merchantName + "</span></td>";
					}
					
					
				} else {
					if(fullname.length > 20){
						//alert(fullname.length);	
						fullname = fullname.substring(0,20);
						acctListItemHtml += "<td><span class='Table-Data-Text'>" + fullname ;
						acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+ account_lst[i].fullname+"' id=''></i></a>";
						acctListItemHtml += "</span></td>";
					}
					else{
						acctListItemHtml += "<td><span class='Table-Data-Text'>" + account_lst[i].fullname + "</span></td>";
					}
					
				}
				acctListItemHtml += "<td><span class='Table-Data-Text'>" + generate_cn_typename(getAccountTypeCnName(account_lst[i].type)) + "</span></td>";					
				var wholeAddress = province + city + county ;
				var wholeAddress1 = province + city + county ;
				/*
				if (wholeAddress.length > 10) {
					wholeAddress = wholeAddress.substring(0, 10);
				}
				*/
				
				acctListItemHtml += "<td><span class='Table-Data-Text'>";
				acctListItemHtml += wholeAddress;
				/*
				if (wholeAddress1.length > 10){
					acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+wholeAddress1+"' id=''></i></a>";				
				}
				*/
				acctListItemHtml += 	"</span></td>";
				/*
				acctListItemHtml += "<td><span class='Table-Data-Text'>" + account_lst[i].createDatetime + "</span></td>";
				*/
				acctListItemHtml += "</tr>"

				acctListHtml += acctListItemHtml;
			}
		}
		else{
			$(".ChinaNet-Page-Table").hide();
		}
		
		return acctListHtml;

	}
	
	function Getgeolevl(geoLevel){
		if(geoLevel !="" && geoLevel !=null ){
			switch(geoLevel){
			case '1':
				return "全国级";
				break;
			case '2':
				return "省级";
				break;
			case '3':
				return "市级";
				break;
			case '4':
				return "县区级";
				break;			
			}
			
		}
	}
	
	function searchLogFailCallBack(result, message)  {
		//	onAlertError(message);
		}	
    function searchLogErrorCallBack(result, message)  {
	    //	onAlertError(message);
		}
    function searchFailCallBack(result, message) {
    	//	onAlertError(message);
    			}

    function searchErrorCallBack(result, message) {
    	//	onAlertError(message);
    			}
		
	
	var LoadAccountData = function() {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/accountdetails.htm',
			data : {
				'accountId' : _AccountID
			},
			async:false,
			success : function(data) {			
				if (data.result != 'FAIL' && data.account != null) {
					if (data.account != null) {
						acctDetails = data.account;
						refreshAccountData(acctDetails);
                        //closeLoading();
					}
				} else {
					return false;
				}
			},
			error : function(data) {
				return false;
			}
		});
	}
	function refreshAccountData(account) {
		if(account.id != null){
			accountid = account.id;	
		}
		
		if (account.avatarPath != null) {
			$("#acct_avatar").attr('src', account.avatarPath);
		}
		else{
			$("#acct_avatar").attr('src','/statics/img/userimg.png')
		}
		if(account.deviceCount !="" && account.deviceCount !=null){
			$("#account_deviceCount").text(account.deviceCount);
		}
		else{
			$("#account_deviceCount").text("0");
			}
		if(account.childCountAll !="" && account.childCountAll != null){
			$("#account_childCountAll").text(account.childCountAll);
		}
		else
		{
		$("#account_childCountAll").text("0");
		}
		if(account.childCountNormal !="" && account.childCountNormal != null){
			$("#account_childCountNormal").text(account.childCountNormal);
		}
		else
		{
		$("#account_childCountNormal").text("0");
		}
		//alert(account.type);
				
		if (account.type != null && account.type.toLowerCase() != 'null') {
			for(var i = 0; i < ACCOUNT_TYPE_CONST.length; i++) {
				if (ACCOUNT_TYPE_CONST[i].en_name.toUpperCase() == account.type.toUpperCase()) {
					$("#acct_type").text(ACCOUNT_TYPE_CONST[i].cn_name);
					break;
				}				
			}
			if(account.type =="ADMINISTRATOR"){
				$("#tr_merchantname").hide();
				$("#tr_adminlevel").show();
			//	alert(account.geoLevel);
				var level = Getgeolevl(account.geoLevel);				
				$("#acct_level").text(level);
				
			}
			if(account.type =="MERCHANT"){
				$("#tr_merchantname").show();
				$("#tr_adminlevel").hide();
				$("#sublisttitle").hide();
				$("#sublistbody").hide();
				$("#subaccountpage").hide();
				$("#sub_account_total").hide();
			}
			if(account.type == "REPRESENTATIVE"){				
				$("#tr_merchantname").hide();
				$("#tr_adminlevel").hide();
				$("#tr_cellphone").addClass("ChinaNet-White");
				$("#tr_email").removeClass("ChinaNet-White");
				$("#tr_area").addClass("ChinaNet-White");
				$("#tr_tag").removeClass("ChinaNet-White");
				
			}
			if(account.type=="MANUFACTURER") {
				$("#tr_merchantname").hide();
				$("#tr_adminlevel").hide();
				$("#sublisttitle").hide();
				$("#sublistbody").hide();
				$("#subaccountpage").hide();
				$("#sub_account_total").hide();
			}
			if(account.type=="DEVICE_ADMIN") {
				$("#tr_merchantname").hide();
				$("#tr_adminlevel").hide();
				$("#sublisttitle").hide();
				$("#sublistbody").hide();
				$("#subaccountpage").hide();
				$("#sub_account_total").hide();
			}
	
		}
		if (account.username != null && account.username.toLowerCase() != 'null') {
			$("#acct_username").text(account.username);
		}
		if (account.createDatetime != null && account.createDatetime.toLowerCase() != 'null') {
			$("#createtime").text("注册时间："+account.createDatetime);
		}

		if (account.lastLoginDatetime != null && account.lastLoginDatetime.toLowerCase() != 'null') {
			$("#lastlogintime").text("登录时间："+account.lastLoginDatetime);
		}

		if (account.fullname != null && account.fullname.toLowerCase() != 'null') {
			$("#acct_fullname").text(account.fullname);
		}
		if (account.merchantName != null && account.merchantName.toLowerCase() != 'null') {
			$("#acct_merchant_name").text(account.merchantName);
		}
		if (account.email != null && account.email.toLowerCase() != 'null') {
			$("#acct_email").text(account.email);
		}
		if (account.cellNumber != null && account.cellNumber.toLowerCase() != 'null') {
			$("#acct_cellphone").text(account.cellNumber);
		}
		if (account.email != null && account.email.toLowerCase() != 'null') {
			$("#acct_email").text(account.email);
		}
		if (account.geoLocation != undefined && account.geoLocation != null && account.geoLocation.toLowerCase() != 'null') {
			var geoLocation=eval("("+account.geoLocation+")"); 
			province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
			city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
			county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
			address = geoLocation.address == undefined || geoLocation.address == null ? "" : geoLocation.address + " ";
			
			$("#acct_geo_location").text(province + city + county + address);
		}

		if (account != null && account.tags != null && account.tags.length > 0
				&& account.tags != 'null' && account.tags != 'empty') {

			var accounttags = account.tags;			
			var tagsHtml="";
			for(var i = 0 ;i< accounttags.length; i++ )
			{
				tagsHtml+=accounttags[i]+"&nbsp;&nbsp;";
				
				}
			$("#acct_tags").html(tagsHtml);
		}
		
	//	alert(_AccountID);
	}
	
	return {
		init:function(){
			LoadAccountData();
			initresetOPT();
			resetPWD();
			onEditAdvertCode();
			logSearch();
			logSearchUtil.searchWithPreload();	
			subacctSearch();
			subacctSearchUtil.searchWithPreload();	
			
		}
	}
}();