
	
var subaccountlistApp = function(){
	 var subaccountSearchHandler = null;
	 var selected_subaccts = null;
	 var removed_subaccts = null;	
	subaccountSearchHandler = new searchUtil(generateaccountlistHtml, searchFailCallBack, searchErrorCallBack, null, null,
	"subaccountlist_body", "lb_pagenumber_subaccount", "a_pagination_previous_subaccount", "a_pagination_next_subaccount", 
	"/account/search_all_sub.htm","");
//	console.log(__DATA_PUBLIC_KEY);
	subaccountSearchHandler.setSearchParemeter("totalParentId", __DATA_PUBLIC_KEY);
//	addr_selector_create('id_province', 'id_city', 'id_county');
		
	var keywordsSearch = function(key,province,city,county) {
		if (selected_subaccts == null) {
			selected_subaccts = [];
		}	
	//	var SearchKeywords = subaccountSearchHandler.convertKeywordsSearchable($("#subaccountkeywords").val());
      //  alert($('input#AccountProvice').val()+$('input#AccountCity').val()+$('input#AccountCounty').val());
	//	alert(province+city+county);
		subaccountSearchHandler.setSearchParemeter('keywords', key);
		subaccountSearchHandler.setSearchParemeter("province",province);
		subaccountSearchHandler.setSearchParemeter("city", city);
		subaccountSearchHandler.setSearchParemeter("county", county);
		subaccountSearchHandler.searchWithPreload();
	}
	function LoadAccountData(accountId) {
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
						refreshAccountData(data.account);							
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
		var tmp_geoLocation = account.geoLocation; 		
		var Local = JSON.parse(tmp_geoLocation);
		var provice = {
		            offsetSize:[0,3,0,3],
		            data:getProviceList(),
		            defaultData:{value:'',text:''},
		            onChange:function(obj){
		                onChangeProvice($(obj).attr('data-value'));
		            }
		        };
	    var city = {offsetSize:[0,3,0,3],
	    		    data:[],
	    		    defaultData:{value:'',text:''},
		            onChange:function(obj){
		                onChangeCity($(obj).attr('data-value'));
		            }
		        };
		 var county = {offsetSize:[0,3,0,3], data:[],defaultData:{value:'',text:''}};		        
		        if(typeof Local.province!='undefined'&&Local.province!=''){
		            provice.defaultData = {value:Local.province,text:Local.province};
		            city.data = getCityList(Local.province);		           
		        }
		        $('input#AccountProvice').xiSelect(provice);

		        if(typeof Local.city!='undefined'&&Local.city!=''){
		            city.defaultData = {value:Local.city,text:Local.city};
		            county.data = getCountyList(Local.province, Local.city);
		        }
		        $('input#AccountCity').xiSelect(city);
		        if(typeof Local.county!='undefined'&&Local.county!=''){
		            county.defaultData = {value:Local.county, text:Local.county};
		        }
		        $('input#AccountCounty').xiSelect(county);
		     //   alert('aaaaaaaa');
		     //   loadDefaultSubSearchLocation(account.geoLevel, provice, city, county,local);
		      //  alert($('#AccountProvice').val()+$('#AccountCity').val()+$('#AccountCounty').val());
		       var pro= $('#AccountProvice').val();
		       var city= $('#AccountCity').val();
		       var county = $('#AccountCounty').val()
		        if(pro==""||pro == "请选择"){
		        	pro="";
		        }
		       if(city==""||city == "请选择"){
		    	   city="";
		        }
		       if(county==""||county == "请选择"){
		    	   county="";
		        }
		        keywordsSearch("",pro,city,county);
	}
	 function showSetSubAcctModal() {	   	    	
														
			$("#btn_search_subaccount").unbind("click");
			$("#btn_search_subaccount").click(function() {
				var keywords = $("#subaccountkeywords").val();
				keywords = subaccountSearchHandler.convertKeywordsSearchable(keywords);
				
				 var pro= $('#AccountProvice').val();
			       var city= $('#AccountCity').val();
			       var county = $('#AccountCounty').val()
			        if(pro==""||pro == "请选择"){
			        	pro="";
			        }
			       if(city==""||city == "请选择"){
			    	   city="";
			        }
			       if(county==""||county == "请选择"){
			    	   county="";
			        }

				subaccountSearchHandler.setSearchParemeter("keywords", keywords);
				subaccountSearchHandler.setSearchParemeter("province", pro);
				subaccountSearchHandler.setSearchParemeter("city", city);
				subaccountSearchHandler.setSearchParemeter("county", county);
				subaccountSearchHandler.searchWithPreload();
			});
	    }
	
	return {init:function(){		
		LoadAccountData(__DATA_PUBLIC_KEY);
	//	subaccountSearchHandler.searchWithPreload();		
		showSetSubAcctModal();	
		
		
	}}
}();

function generateaccountlistHtml(account_lst){
	var acctListHtml = "";

	if (account_lst != null) {
		for ( var i = 0; i < account_lst.length; i++) {
			var acctListItemHtml = "<tr class='ChinaNet-Table-Body'>";			
			acctListItemHtml += 	"<td>";
			acctListItemHtml += 		"<div class='Form-Item-Input'>";
			acctListItemHtml += 			"<input id='acct_selector_" + account_lst[i].id + "' name='add_redirect_account' value='"+account_lst[i].id+"'  type='checkbox'>";
			acctListItemHtml += 		"</div>";
			acctListItemHtml += 	"</td>";
			var geoLocation = account_lst[i].geoLocation;
			
			var province = "";
			var city = "";
			var county = "";
			var address = "";
			
			if (geoLocation != null && geoLocation != undefined && geoLocation != "") {
				geoLocation = JSON.parse(geoLocation);
				
				province = geoLocation.province == undefined || geoLocation.province == null ? "" : geoLocation.province + " ";
				city = geoLocation.city == undefined || geoLocation.city == null ? "" : geoLocation.city + " ";
				county = geoLocation.county == undefined || geoLocation.county == null ? "" : geoLocation.county + " ";
				address = isNotEmptyString(geoLocation.address)&&geoLocation.address!='undefined' ? geoLocation.address + " " : "";
			}		
			
			var fullname="";
			var fullname1="";
			if(account_lst[i].fullname != null){
				fullname = account_lst[i].fullname;
				fullname1 = account_lst[i].fullname;
				if(fullname.length > 5){
					fullname=fullname.substring(0,5);
				}
			}
			var merchantname ="";
			var merchantname1="";
			if(account_lst[i].merchantName != null){
				merchantname = account_lst[i].merchantName;
				merchantname1 = account_lst[i].merchantName;
				if(merchantname.length > 5){
					merchantname=merchantname.substring(0,5);
				}
			}
			var usernamestr = account_lst[i].username;
			if(isNotEmptyString(usernamestr)){usernamestr = usernamestr.substring(0,15);}
			acctListItemHtml += "<td><span class='Table-Data-Text Table-Text'>"+usernamestr;
			if (account_lst[i].username.length > 15){
				acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+account_lst[i].username+"' id=''></i></a>";				
			}
			acctListItemHtml += 	"</span></td>";
			if (account_lst[i].type == ACCOUNT_TYPE.MERCHANT) {
				acctListItemHtml += "<td><span class='Table-Data-Text'>" + merchantname;
				//alert(merchantname1);
				if(merchantname.length > 4){
					acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+merchantname1+"' id=''></i></a>";
					//alert(merchantname1);
				}
				acctListItemHtml +=	"</span></td>";
			} 
			else {
				acctListItemHtml += "<td><span class='Table-Data-Text-Account'>" + fullname;
				if(fullname1.length > 5){
				acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+fullname1+"' id=''></i></a>";				
				}
				acctListItemHtml +=	"</span></td>";
				
				
			}
			acctListItemHtml += "<td><span class='Table-Data-Text'>"
					+ generate_cn_typename(getAccountTypeCnName(account_lst[i].type)) + "</span></td>";
			
			var tags = "";
			var tags1 = "";
			if(account_lst[i].tags){
				tags = account_lst[i].tags.join(", ");
				tags1 = account_lst[i].tags.join(", ");
				
				if (tags.length > 15) {
					tags = tags.substring(0, 15);
				}		
			}
			
			
			
			var wholeAddress = province + city + county + address;
			var wholeAddress1 = province + city + county + address;
			if (wholeAddress.length > 15) {
				wholeAddress = wholeAddress.substring(0, 15);
			}
			acctListItemHtml += "<td><span class='Table-Data-Text'>";
			acctListItemHtml += wholeAddress;
			if (wholeAddress1.length > 15){
				acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+wholeAddress1+"' id=''></i></a>";				
			}
			acctListItemHtml += 	"</span></td>";
			acctListItemHtml += "<td><span class='Table-Data-Text'>";
			acctListItemHtml += tags;
			if (tags1.length > 15){
				acctListItemHtml += 	" <a style='color:#17bd9b;'><i class='glyphicon glyphicon-comment' rel='tooltip' title='"+tags1+"' id=''></i></a>";				
			}		
			acctListItemHtml += 	"</span></td>";
			/*acctListItemHtml += "<td><span class='Table-Data-Text'>" + account_lst[i].createDatetime
					+ "</span></td>";*/
			acctListItemHtml += "</tr>"
			acctListHtml += acctListItemHtml;
		}
	}
	return acctListHtml;
}

function searchFailCallBack(data, message) {
	onAlertError('加载子帐号数据请求提交失败！');
	return false;
}
		
function searchErrorCallBack(data, message) {
	onAlertError('加载子帐号数据请求提交失败！');
	return false;
}
/**
 * 获取地区列表
 * @param provice
 */
function onChangeProvice(provice){
    $('div#AccountCityList').html('<input type="text" id="AccountCity" name="AccountCity">');
    $('div#AccountCountyList').html('<input type="text" id="AccountCounty" name="AccountCounty">');
    $('input#AccountCity').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCityList(provice),
        onChange:function(obj){
            onChangeCity($(obj).attr('data-value'));
        },
        defaultData:{value:'',text:''}
    });
    $('input#AccountCounty').xiSelect({offsetSize:[0,3,0,3],defaultData:{text:'',value:''}});
}


/**
 * 根据地区获取城市列表
 * @param city
 */
function onChangeCity(city){
    $('div#AccountCountyList').html('<input type="text" id="AccountCounty" name="AccountCounty">');
    $('input#AccountCounty').xiSelect({
        offsetSize:[0,3,0,3],
        data:getCountyList($('input#AccountProvice').val(),city),
        defaultData:{value:'',text:''}
    });
}