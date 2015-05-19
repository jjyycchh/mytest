/**
 * Created by wj on 2014/8/13.
 */
var directSubSearchHandler = null;
directSubSearchHandler = new searchUtil(generateAcctListHtml, searchFailCallBack, searchErrorCallBack, null, null,
			"tbl_direct_subacct_lst", "lb_dir_subacct_pagenumber", "a_dir_subacct_pagination_previous", "a_dir_subacct_pagination_next",
			"/account/search_direct_sub.htm", "");
var accounteditApp = function(){
	var curAccountId = null;
	var getAccountid = function(){
		curAccountId = _AccountID;		
	}
	var curAccountType = null;
	var curAcctGeoLevel = null;
	var curAccountPermissions = null;
	var curAccountTags = null;
	var acctDetails = null;
	
	var subacctSearchHandler = null;
	
	var selected_subaccts = null;
	var removed_subaccts = null;	 
	var getAccountInfo =function(){
		
		addr_selector_create('id_province', 'id_city', 'id_county');		
	}
	var initSubAccountList = function(){
		directSubSearchHandler.setSearchParemeter('keywords', '');
		directSubSearchHandler.setSearchParemeter("directParentId", _AccountID);
		directSubSearchHandler.searchWithPreload();
	}
		//查询已有的直属下级用户
	var directSubSearch = function(){		
		$("div.ChinaNet-Page-Table").show();
		directSubSearchHandler.clearResultSetpageNo();
		var keywords = directSubSearchHandler.convertKeywordsSearchable($("#keywords").val());
		directSubSearchHandler.setSearchParemeter('keywords', keywords);
		directSubSearchHandler.setSearchParemeter("directParentId", _AccountID);
		directSubSearchHandler.searchWithPreload();
	}
	
	var onsearchDirectSub = function() {
		$("#btn_Search_directSub").click(function() {
			directSubSearch();
		});
	}
	
	var LoadAccountInfo = function(accountId){
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/accountdetails.htm',
			data : {
				'accountId' : accountId
			},
			success : function(data) {
				if (data.result != 'FAIL' && data.account != null) {
					if (data.account != null) {
						acctDetails = data.account;
						if (acctDetails.type != null && acctDetails.type.toLowerCase() != 'null') {
								if (acctDetails.type.toUpperCase()=="REPRESENTATIVE") {
									$("#account-typename").text("代理商");									
								}
								else if(acctDetails.type.toUpperCase()=="ADMINISTRATOR"){
									//alert("aaaaaaaaaaaa");
									$("#account-typename").text("管理员");		
								}
							
						}
						/*if(acctDetails.avatarPath !="" && acctDetails.avatarPath != null){
							$("#account_img").attr('src',acctDetails.avatarPath);
						}
						else{
							$("#account_img").attr('src',"/statics/img/no-image.png");
						}*/
						
						if (isNotEmptyString(acctDetails.avatarPath)) {
                			$("#AccountAvatarImgsrc").attr('src', acctDetails.avatarPath);
                		}
						if (acctDetails.username != null && acctDetails.username.toLowerCase() != 'null') {
							$("#account_user").text(acctDetails.username);
						}
						if(acctDetails.childCountAll !="" && acctDetails.childCountAll != null){
							$("#account_childCountAll").text(acctDetails.childCountAll);
						}
						else
						{
						$("#account_childCountAll").text("0");
						}

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
			
	function reloadEditPage(accountid){
		LoadAccountData(accountid);
	}
				
	function setSubAccount() {
		// alert("aaaaaa");
		 if (selected_subaccts == null) {
				selected_subaccts = [];
			}
	    	SubmitSubAccount();
	    }
	 function SubmitSubAccount() {
	    	selected_subaccts = [];
	    	$('input[name="add_redirect_account"]:checked').each(function(){    
	    		selected_subaccts.push(this.value);
	     	  }); 
	    	
	    	if (selected_subaccts.length == 0) {
	    		onAlertError("请至少选择一个子账号");
	    		return false;
	    	}
			$.ajax({
				url: "/account/updateparentid.htm", 
			    type: 'POST',
			    dataType: 'json',
			    data: {
			    	operation: "add",
			    	accountId: curAccountId,
			    	directsubaccountids: JSON.stringify(selected_subaccts)
			    	},
			    success: function (data) {
			    	if (data.result != 'FAIL') {
			    	//	curAccountId(curAccountId);
			    		onAlertError("子帐号添加成功","ok");
			    		dialog.list['Dailogin:SubAccount:Setting'].remove().close();
			    		LoadAccountInfo(curAccountId);
			    		//directSubSearchHandler.setSearchParemeter('keywords', '');
			    		//directSubSearchHandler.setSearchParemeter("directParentId", _AccountID);
			    		//directSubSearchHandler.searchWithPreload();
			    		//directSubSearchHandler.refreshCurrentPage();
			    		$("#keywords").val('');
			    		initSubAccountList();
			    		
			    	}
			    },
			    error: function (data) {
			    	onAlertError("子帐号添加失败","ok");
					return false;
			    }
			});
	    }
	
	/***---解除直属关系--***/
	$("#remove_sub_acct").click(function() {
		RemoveSubAccount();
	});
	
  function RemoveSubAccount() {
 		removed_subaccts = [];
 	var checkedStr = "";
 	$('input[name="removecheck"]:checked').each(function(){    
 		removed_subaccts.push(this.value);
  	   //checkedStr +=$(this).val();
  	   //checkedStr +=",";
  	  }); 
 	//checkedStr = checkedStr.substring(0,checkedStr.length-1);
 	if(removed_subaccts.length>0){
 		$.ajax({
			url: "/account/updateparentid.htm", 
			operation: 'POST',
		    dataType: 'json',
		    data: {
		    	operation: "remove",
		    	accountId: curAccountId,
		    	directsubaccountids: JSON.stringify(removed_subaccts)
		    	},
		    success: function (data) {
		    	if (data.result != 'FAIL') {
		    		onAlertError("子帐号解除成功","ok");
		    		LoadAccountInfo(curAccountId);
					directSubSearchHandler.refreshCurrentPage();
		    	}
		    },
		    error: function (data) {

		    }
		});
 	}
 	else{
 		onAlertError("请选择要解除的子帐号！");
 	}
		
   }
  
	  var onSettingssubAccount = function(){
	        $('#btn_open_sub_acct').click(function(){
	        	__DATA_PUBLIC_KEY = curAccountId;
	        	
	            var content = '';
	            var error   = '';
	      
	            $.ajax({
	                url:'/account/subsetting.htm',
	                type:'GET',
	                dataType:'HTML',
	                async:false,
	                success:function(data){
	                    if(data.result=='FAIL'){
	                        error = data.message;
	                    }else{
	                        content = data;
	                    }
	                }
	            });

	            if(content!=''){
	            	//alert(content);
	                var d = dialog({
	                	id: 'Dailogin:SubAccount:Setting',
	                    title: '子帐号设置',
	                    content: content,	                    
	                    okValue: '确定',
	                    ok: function(){setSubAccount();return false;},	                  
	                    cancelValue: '取消',
	                    cancel: function () {},
	                    width:600,
	                    height:500,
	                    skin:'ChinaNet-Dialog'
	                });
	                d.showModal();
	                //return false;
	            }else {
	                onAlertError(error);
	                return false;
	            }
	        });
	    }
	    


	return {init:function(){
		getAccountid();
		getAccountInfo();       
		LoadAccountInfo(curAccountId);
		//directSubSearch();
		onsearchDirectSub();
		//directSubSearchHandler.searchWithPreload();	
		initSubAccountList();
		onSettingssubAccount();
		
	}}
}();

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
			
			acctListItemHtml += 	"<td>";
			acctListItemHtml += 		"<div class='Form-Item-Input'>";
			acctListItemHtml += 			"<input id='acct_remove_" + account_lst[i].id + "' class='Checkbox-Control' name='removecheck' value='"+account_lst[i].id+"' type='checkbox'>";
			acctListItemHtml += 		"</div>";
			acctListItemHtml += 	"</td>";
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

function searchFailCallBack(result, message) {
	onAlertError("加载子帐号数据请求提交失败");

}

function searchErrorCallBack(result, message) {
	onAlertError("加载子帐号数据请求提交失败");
}
