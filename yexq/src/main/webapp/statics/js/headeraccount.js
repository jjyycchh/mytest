/**
 * Created by cx on 2014/8/25.
 */
var _dataTemp = null;
var headerAccountApp = function(){
	/*var onChangeAvatarImg = function(){
        $('a#ChangeAvatarBtn').click(function(){
            onChangePicture('#AccountAvatarThumb', false,640,640);
        });
        $('a#ChangeAvatarBtn').live('click',function(){
        	onChangePicture('#AccountAvatarThumb', false,640,640);
        });
    }*/
	var imgUploadInit = function(){
		if(isNotEmptyString(__CONTENT_AVATAR)){
			$("#AccountAvatarImg").attr('src', __CONTEXT_PATH + __CONTENT_AVATAR);
		}
		IFileUpload.init({
			 clickSelector: "#ChangeAvatarBtn",//出发上传窗口打开的selector
			 fileInputSelector: "#input_upload_file",//input type=file 的文件选择器
			 imgSelector: "#AccountAvatarThumb",//图片上传成功后，替换src的路径图片选择器
			 headImg: "#AccountAvatarImg",
			 typeSupportDesc: "支持的文件类型: PNG、JPG、JPEG",
			 filetype: ".jpeg .png .jpg",
			 fileupload: {
				 url: "/account/uploadavatar.htm",
				 done: function(e, data){
					 if(data.result && data.result.result == "OK"){
				    		var uptime = window.setTimeout(function(){
				    			IFileUpload.close();
				    			clearTimeout(uptime);
				    		},2000);
				    		__CONTENT_AVATAR = data.result.avatarpath;
				    		$("#AccountAvatarImg").attr('src', __CONTEXT_PATH + __CONTENT_AVATAR);
				    		$("#AccountAvatarThumb").attr('src', __CONTEXT_PATH + __CONTENT_AVATAR);
				    	}else{
				    		onAlertError(data.result.message);
							 IFileUpload.close();
				    	}
				 }
					 
			 }
		 });		
    }
	var showUserInfo = function(){
    	$('a#UserInfo').unbind('click').click(function(){
    		var userinfoHtml="";
    		userinfoHtml+="<div class='UserInfo-Settings-Body'>";
    		userinfoHtml+="	<div class='Account-Avatar-Editor'>";
    		userinfoHtml+="	   <div class='Avatar-Image-Body Data-Adorn-Overly'>";
    		userinfoHtml+="    <div class='Overly-Top-Left'></div>";
    		userinfoHtml+="    <div class='Overly-Top-Right'></div>";
    		userinfoHtml+="    <div class='Overly-Bottom-Left'></div>";
    		userinfoHtml+="    <div class='Overly-Bottom-Right'></div>";
    		userinfoHtml+="    <div class='Thumb-Edit-Overly' style='display: none;'></div>";
    		userinfoHtml+="    <div class='Avatar-Image-Sheet'><img src='/statics/img/no-image.png' id='AccountAvatarThumb'></div>";
    		userinfoHtml+="    <a href='javascript:;' id='ChangeAvatarBtn'>更换/上传用户头像</a>";
    		userinfoHtml+="	</div>";
    		userinfoHtml+="</div>";
    		
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>用户名</label>";
    		userinfoHtml+="        <div id='id_acct_info_username'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>帐号类型</label>";
    		userinfoHtml+="        <div id='id_acct_info_type'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>姓名</label>";
    		userinfoHtml+="        <div id='id_acct_info_fullname'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_fullname' class='Form-Item-Input ChinaNet-Col-5'><input type='text' id='input_acct_fullname' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>电子邮件</label>";
    		userinfoHtml+="        <div id='id_acct_info_email'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_email' class='Form-Item-Input ChinaNet-Col-5'><input type='text' id='input_acct_email' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>手机号码</label>";
    		userinfoHtml+="        <div id='id_acct_info_cellphone'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_cellphone' class='Form-Item-Input ChinaNet-Col-5'><input type='text' id='input_acct_cellphone' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='div_merchantName' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>商户名称</label>";
    		userinfoHtml+="        <div id='id_acct_info_merchantName'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_merchantName' class='Form-Item-Input ChinaNet-Col-5'><input type='text' id='input_acct_merchantName' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='div_merchantDescription' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>商户描述</label>";
    		userinfoHtml+="        <div id='id_acct_info_merchantDescription'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_merchantDescription' class='Form-Item-Input ChinaNet-Col-5'><input type='text' id='input_acct_merchantDescription' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='div_acct_info_geoLocation' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地址</label>";
    		userinfoHtml+="        <div id='id_acct_info_geoLocation'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='edit_address_container' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地区</label>";
    		userinfoHtml+="        <div class='Form-Item-Select ChinaNet-Col-3'><select id='id_acct_profile_province' name='province' class='form-control'></select></div>";
    		userinfoHtml+="        <div class='Form-Item-Select ChinaNet-Col-3'><select id='id_acct_profile_city' name='city' class='form-control'></select></div>";
    		userinfoHtml+="        <div class='Form-Item-Select ChinaNet-Col-3'><select id='id_acct_profile_county' name='county' class='form-control'></select></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='edit_addr_container' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>详细地址</label>";
    		userinfoHtml+="        <div class='Form-Item-Textarea ChinaNet-Col-5'><TEXTAREA id='id_acct_profile_address' name='Location' type='text' placeholder='详细地址（可选）' rows='3'> </TEXTAREA></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="</div>";
    		
    		//onOpenDialog('Dailogin:User', '我的帐号', userinfoHtml,{ok:function(){editUserInfo();}});
    		var d_UserInfo = dialog({
		     	 id: 'Dailogin:UserInfo',
		         title: '我的帐号',
		         content: userinfoHtml,
		         okValue: '编辑',
		         ok: function () {
		             this.close().remove();
		             showUserEdit();
		         },
		         
		         cancelValue: '取消',
		         cancel: function () {},
		         width:620,
		         height:420,
		         skin:'ChinaNet-Dialog'
		     });
    		/*d_UserInfo.addEventListener('remove', function () {
    			showUserEdit();
    		});*/
    		refreshAccountInfo(_dataTemp);
    		viewAccountProfile();
    		d_UserInfo.showModal();
    		imgUploadInit();
    	});
    }
	
	var showUserEdit = function(){
    	
    		var userinfoHtml="";
    		userinfoHtml+="<div class='UserInfo-Settings-Body'>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>用户名</label>";
    		userinfoHtml+="        <div id='id_acct_info_username'  class='Form-Item-Label ChinaNet-Col-9'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>帐号类型</label>";
    		userinfoHtml+="        <div id='id_acct_info_type'  class='Form-Item-Label ChinaNet-Col-9'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>姓名</label>";
    		userinfoHtml+="        <div id='id_acct_info_fullname'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_fullname' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_acct_fullname' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>电子邮件</label>";
    		userinfoHtml+="        <div id='id_acct_info_email'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_email' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_acct_email' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>手机号码</label>";
    		userinfoHtml+="        <div id='id_acct_info_cellphone'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_cellphone' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_acct_cellphone' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='div_merchantName' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>商户名称</label>";
    		userinfoHtml+="        <div id='id_acct_info_merchantName'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_merchantName' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_acct_merchantName' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='div_merchantDescription' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>商户描述</label>";
    		userinfoHtml+="        <div id='id_acct_info_merchantDescription'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="        <div id='edit_acct_info_merchantDescription' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_acct_merchantDescription' class='Input-Control'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='div_acct_info_geoLocation' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地址</label>";
    		userinfoHtml+="        <div id='id_acct_info_geoLocation'  class='Form-Item-Label ChinaNet-Col-5'></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='edit_address_container' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地区</label>";
    		userinfoHtml+="        <div class='Form-Item-Select ChinaNet-Col-3' id='AccountProviceList'><input type='text' id='AccountProvice' name='AccountProvice' placeholder=''></div>";
    		userinfoHtml+="        <div class='Form-Item-Select ChinaNet-Col-3' id='AccountCityList'><input type='text' id='AccountCity' name='AccountCity' placeholder=''></div>";
    		userinfoHtml+="        <div class='Form-Item-Select ChinaNet-Col-3' id='AccountCountyList'><input type='text' id='AccountCounty' name='AccountCounty' placeholder=''></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="    <div id='edit_addr_container' class='ChinaNet-Form-Sheet'>";
    		userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>详细地址</label>";
    		userinfoHtml+="        <div class='Form-Item-Textarea ChinaNet-Col-9'><TEXTAREA id='id_acct_profile_address' name='Location' type='text' placeholder='详细地址（可选）' rows='3'> </TEXTAREA></div>";
    		userinfoHtml+="    </div>";
    		userinfoHtml+="</div>";
    		
    		//onOpenDialog('Dailogin:User', '我的帐号', userinfoHtml,{ok:function(){editUserInfo();}});
    		var d_UserInfo_edit = dialog({
		     	 id: 'Dailogin:UserInfoedit',
		         title: '编辑帐号',
		         content: userinfoHtml,
		         okValue: '确定',
		         ok: function () {
		        	 SubmitAccountProfile();return false;
		         },
		         
		         cancelValue: '取消',
		         cancel: function () {},
		         width:620,
		         height:460,
		         skin:'ChinaNet-Dialog'
		     });
    		
    		d_UserInfo_edit.showModal();
    		refreshAccountInfo(_dataTemp);
    		editUserInfo();
    	
    }
	
    var SubmitAccountProfile = function (){
    	var acctemail = $("#input_acct_email").val();
    	var acctfullname = $("#input_acct_fullname").val();
    	var acctphone  = $("#input_acct_cellphone").val();
    	var acctmerchantname = $("#input_acct_merchantName").val();
    	if(!checkUserName(acctfullname)){
            onAlertErrorTip('姓名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('input_acct_fullname'));
            return false;
        }
    	if(!checkEmail(acctemail)){
            onAlertErrorTip('邮箱格式不正确', document.getElementById('input_acct_email'));
            return false;
        }
    	if(!onCheckEmpty(acctphone)){
    		onAlertErrorTip('请输入手机号码', document.getElementById('input_acct_cellphone'));
	        return false;
    	}else if(!checkMobile(acctphone)){    		 
	        onAlertErrorTip('手机号码格式不正确', document.getElementById('input_acct_cellphone'));
	        return false;	         
    	}
    	if(!onCheckEmpty($("input#AccountProvice").val()) || $("input#AccountProvice").val()=='请选择'){
        	onAlertErrorTip('请选择省', $("div#AccountProviceList")[0]);
			return false;
        }
        if(!onCheckEmpty($("input#AccountCity").val()) || $("input#AccountCity").val()=='请选择'){
        	onAlertErrorTip('请选择市', $("div#AccountCityList")[0]);
			return false;
        }
		$.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/account/updateprofile.htm',
            data: {
            	"accountid" : __CONTEXT_MERCHANT_KEY,
            	"email" : $("#input_acct_email").val(),
            	"fullname" : $("#input_acct_fullname").val(),
            	"cellPhone" : $("#input_acct_cellphone").val(),
            	"merchantName" : $("#input_acct_merchantName").val().replace(/[~'!<>]/g, ''),
            	"merchantDescription" : $("#input_acct_merchantDescription").val().replace(/[~'!<>]/g, ''),
            	"geoLocation" : '{"province":"'+$('input#AccountProvice').val()+'","city":"'+
            			$('input#AccountCity').val()+'","county":"'+(($('input#AccountCounty').val()=="请选择")?"":$('input#AccountCounty').val())+'","address":"'+string2Json($('#id_acct_profile_address').val().replace(/[~'!<>]/g, ''))+'"}'
            },
            success: function (data) {
                if (data.result == 'OK') {
                	_dataTemp = data.account;
                	onAlertError('个人信息修改成功!',"ok");
                    refreshAccountInfo(data.account); 
                    dialog.list['Dailogin:UserInfoedit'].remove().close();
                    //viewAccountProfile();
                } else {                   
                    onAlertError(data.message);
                }
            },
            error: function (data) {
            	onAlertError('个人信息修改失败!');
            }
        });
	}

    var refreshAccountInfo = function(updatedAcctInfo) {
		// load current loged in account info
		var tmp_username = __CONTENT_MERCHANT_NAME;
		var tmp_full_name = __CONTEXT_MERCHANT_FULLNAME;
		var tmp_geoLv = __CONTENT_GEOLEVEL;
		var tmp_cellPhone = __CONTENT_MERCHANT_CELL;
		var tmp_accountType = __CONTEXT_MERCHANT_CODE;
		var tmp_email = __CONTENT_EMAIL;
		var tmp_merchantName =  __CONTENT_MERCHANTNAME;
		var tmp_merchantDesc =  __CONTENT_MERCHANTDESCRIPTION;
		var tmp_geoLocation =  __CONTENT_GEOLOCATION;
		
		if (updatedAcctInfo != null) {
			account_id = updatedAcctInfo.id;
			username = updatedAcctInfo.username;
			full_name = updatedAcctInfo.fullname;
			geo_lv = updatedAcctInfo.geoLevel;
			cell_phone = updatedAcctInfo.cellNumber;
			account_type = updatedAcctInfo.type;//role matrix was defined in resources.js
			acct_permissions = updatedAcctInfo.permissions; 
			
			tmp_username = updatedAcctInfo.username;
			tmp_full_name = updatedAcctInfo.fullname;
			tmp_geoLv = updatedAcctInfo.geoLevel;
			tmp_cellPhone = updatedAcctInfo.cellNumber;
			tmp_accountType = updatedAcctInfo.type;//role matrix was defined in resources.js
			tmp_email = updatedAcctInfo.email;
			tmp_merchantName = updatedAcctInfo.merchantName;
			tmp_merchantDesc = updatedAcctInfo.merchantDescription;
			tmp_geoLocation = updatedAcctInfo.geoLocation;
		}
		var account_avatar_url = __CONTEXT_PATH + __CONTENT_AVATAR;
		
		if (account_avatar_url != null && account_avatar_url != "") {
			$("#AccountAvatarThumb").attr('src', account_avatar_url);
		}
		$("#id_acct_info_username").text(tmp_username);
		$("#id_acct_info_type").text(getAccountTypeCnName(tmp_accountType));
		$("#id_acct_info_fullname").text(tmp_full_name);
		$("#id_acct_info_email").text(tmp_email);
		$("#id_acct_info_cellphone").text(tmp_cellPhone);
		$("#id_acct_info_merchantName").text(tmp_merchantName);
		$("#id_acct_info_merchantDescription").text(tmp_merchantDesc);
	
		$("#input_acct_fullname").val(tmp_full_name);
		$("#input_acct_email").val(tmp_email);
		$("#input_acct_cellphone").val(tmp_cellPhone);
		$("#input_acct_merchantName").val(tmp_merchantName);
		$("#input_acct_merchantDescription").val(tmp_merchantDesc);
		var Local = '';
		if (tmp_geoLocation != null && tmp_geoLocation != undefined && tmp_geoLocation != "") {
			tmp_geoLocation = tmp_geoLocation.replace(/\r\n/ig, " ").replace(/\n/ig, " ").replace(/\r/ig, " ");			
			Local = JSON.parse(tmp_geoLocation);			
		}
		 
        var provice = {
            offsetSize:[0,3,0,3],
            data:getProviceList(),
            onChange:function(obj){
                onChangeProvice($(obj).attr('data-value'));
            }
        };
        var city = {offsetSize:[0,3,0,3],
            onChange:function(obj){
                onChangeCity($(obj).attr('data-value'));
            }
        };
        var county = {offsetSize:[0,3,0,3]};
        
        if(typeof Local.province!='undefined'&&Local.province!=''){
            provice.defaultData = {value:Local.province,text:Local.province}
            city.data = getCityList(Local.province);
        }
        $('input#AccountProvice').xiSelect(provice);

        if(typeof Local.city!='undefined'&&Local.city!=''){
            city.defaultData = {value:Local.city,text:Local.city}
            county.data = getCountyList(Local.province, Local.city);
        }
        $('input#AccountCity').xiSelect(city);
        if(typeof Local.county!='undefined'&&Local.county!=''){
            county.defaultData = {value:Local.county, text:Local.county}
        }
        $('input#AccountCounty').xiSelect(county);
        
		var provincetxt = "";
		var citytxt = "";
		var countytxt = "";
		var address = "";
		
		if (isNotEmptyString(tmp_geoLocation)) {
			tmp_geoLocation = JSON.parse(tmp_geoLocation);
			
			provincetxt = tmp_geoLocation.province == undefined || tmp_geoLocation.province == null ? "" : tmp_geoLocation.province;
			citytxt = tmp_geoLocation.city == undefined || tmp_geoLocation.city == null ? "" : tmp_geoLocation.city;
			countytxt = tmp_geoLocation.county == undefined || tmp_geoLocation.county == null ? "" : tmp_geoLocation.county;
			address = tmp_geoLocation.address == undefined || tmp_geoLocation.address == null ? "" : tmp_geoLocation.address;
		}
		var geoLocationStr = provincetxt + " " + citytxt + " " + countytxt + " " + address;
		if(geoLocationStr.trim() == '请选择'){
			geoLocationStr = '未选择';
		}
		
		$("#id_acct_info_geoLocation").text(geoLocationStr);
					        
        $("#id_acct_profile_address").text(address);
        
        if (tmp_accountType != ACCOUNT_TYPE.MERCHANT) {
	        $("#div_merchantName").hide();
	        $("#div_merchantDescription").hide();
        }
	}
    var editUserInfo = function(){
    	$("#id_acct_info_fullname").hide();
		$("#id_acct_info_email").hide();
		$("#id_acct_info_cellphone").hide();
		$("#id_acct_info_merchantName").hide();
		$("#id_acct_info_merchantDescription").hide();
		$("#id_address_container").hide();
		$("#id_acct_info_geoLocation").hide();
		$("#div_acct_info_geoLocation").hide();
		
		$("#edit_acct_info_fullname").show();
		$("#edit_acct_info_email").show();
		$("#edit_acct_info_cellphone").show();
		$("#edit_acct_info_merchantName").show();
		$("#edit_acct_info_merchantDescription").show();
		$("#edit_address_container").show();		
		$("#edit_addr_container").show();
		
    }
    var viewAccountProfile = function(){
		$("#id_acct_info_fullname").show();
		$("#id_acct_info_email").show();
		$("#id_acct_info_cellphone").show();
		$("#id_acct_info_merchantName").show();
		$("#id_acct_info_merchantDescription").show();
		$("#id_address_container").show();
		$("#id_acct_info_geoLocation").show();
		$("#div_acct_info_geoLocation").show();
		
		$("#edit_acct_info_fullname").hide();
		$("#edit_acct_info_email").hide();
		$("#edit_acct_info_cellphone").hide();
		$("#edit_acct_info_merchantName").hide();
		$("#edit_acct_info_merchantDescription").hide();
		$("#edit_address_container").hide();
		$("#edit_addr_container").hide();
		
	}
    var onChangePassword = function(){        
    	$('a#ChangePwd').unbind('click').click(function(){
    		 var pwdHtml="";
    		 pwdHtml += "<div class='Password-Settings-Body'>";
    		 pwdHtml += "   <div class='ChinaNet-Form-Sheet'>";
    		 pwdHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>原密码</label>";
    		 pwdHtml += "   	<div class='Form-Item-Input ChinaNet-Col-5'><input type='password' id='oldpassword' placeholder='原密码' class='Input-Control'></div>";
    		 pwdHtml += "   </div>";
			 pwdHtml += "   <div class='ChinaNet-Form-Sheet'>";
			 pwdHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>新密码</label>";
			 pwdHtml += "   	<div class='Form-Item-Input ChinaNet-Col-5'><input type='password' id='newpassword' placeholder='新密码' class='Input-Control'></div>";
			 pwdHtml += "	</div>";
			 pwdHtml += "	<div class='ChinaNet-Form-Sheet'>";
			 pwdHtml += "		<label class='Form-Item-Title ChinaNet-Col-2'>新密码</label>";
			 pwdHtml += "		<div class='Form-Item-Input ChinaNet-Col-5'><input type='password' id='repassword' placeholder='重复新密码' class='Input-Control'></div>";
			 pwdHtml += "	</div>";	    
			 pwdHtml += "</div>";    		 
		     var d_PassWord = dialog({
		     	 id: 'Dailogin:PassWord',
		         title: '修改密码',
		         content: pwdHtml,
		         okValue: '确定',
		         ok: ChangePassWord,
		         /*button: [
		                  {
		                      value: '确定',
		                      callback: function(){ChangePassWord();return false;},
		                      autofocus: true
		                  }
		              ],*/
		         cancelValue: '取消',
		         cancel: function () {},
		         width:520,
		         height:220,
		         skin:'ChinaNet-Dialog'
		     });
		     d_PassWord.showModal();
		     $("#oldpassword").blur(function() {
		    	 if(!isPasswd($("#oldpassword").val())){
		             onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('oldpassword'));
		             return false;
		         }
		     });
		     
		     $("#newpassword").blur(function() {	
		    	 if(!isPasswd($("#newpassword").val())){
		             onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('newpassword'));
		             return false;
		         }
        		if($("#oldpassword").val() == $("#newpassword").val()){
        			 onAlertErrorTip('新密码与原密码一致，请重新输入新密码', document.getElementById('newpassword'));
	    	         return false;
        		}
		     });
		     $("#repassword").blur(function() {
		    	 if($("#newpassword").val() !== $("#repassword").val()){
		             onAlertErrorTip('2次密码输入不一致', document.getElementById('repassword'));
		             return false;
		         }
		     });
    	});
    }
  
    var ChangePassWord = function(){
    	var oldpwd = $("#oldpassword").val();
    	var newpwd = $("#newpassword").val();
    	var repwd  = $("#repassword").val();
    	if(!isPasswd(oldpwd)){
            onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('oldpassword'));
            return false;
        }
        if(!isPasswd(newpwd)){
            onAlertErrorTip('请输入6-20位长度的密码', document.getElementById('newpassword'))
            return false;
        }
        if(oldpwd == newpwd){
        	onAlertErrorTip('新密码与原密码一致，请重新输入新密码', document.getElementById('newpassword'));
	         return false;
        }
        if(newpwd !== repwd){
            onAlertErrorTip('2次密码输入不一致', document.getElementById('repassword'))
            return false;
        }
    	
    	$.ajax({
		    type: 'POST',
		    dataType: 'json',
		    url: '/account/changepassword.htm',
		    data: {
		        oldPassword: window.md5($("#oldpassword").val()),
		        newPassword: window.md5($("#newpassword").val())
		    },
		    success: function (data) {
		        if (data.result != 'FAIL') {
		        	onAlertError('密码修改成功，请使用新密码重新登录。',data.message);
		        	var uptime = window.setTimeout(function(){		        		
			            window.location.href = '/account/logout.htm';
			            clearTimeout(uptime);
	                },2000);		        	
		        } else {
		            onAlertError(data.message);
		            return false;
		        }
		    },
		    error: function (data) {
		        onAlertError('密码修改请求提交失败!');
		        return false;
		    }
		});
    	return false;
    }
    var logoClick = function(){
    	$('div .Header-Body-Logo').die().live('click',function(e){
    		window.location.href = '/account/home.htm';
    	});
    }
    var showImgBtn = function(){
    	//$('div.Module-Component-Edit-Overly').fadeIn(100);
        //$('div.Module-Component-Edit-Form').animate({right:0},100);
        $('div.Account-Avatar-Editor').mouseenter(function(){
            $(this).find('div.Thumb-Edit-Overly').fadeIn(100);
            $(this).find('a').fadeIn(100);
        });
        $('div.Account-Avatar-Editor').mouseleave(function(){
            $(this).find('div.Thumb-Edit-Overly').fadeOut(100);
            $(this).find('a').fadeOut(100);
        });
    }
    return {init:function(){
    	//showImgBtn();
    	logoClick();
        showUserInfo();
        onChangePassword();
        imgUploadInit();
    }}
}();
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