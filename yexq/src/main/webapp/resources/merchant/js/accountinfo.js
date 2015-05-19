

var accountinfoApp = function(){
	var LoadAccountData = function() {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/account/accountdetails.htm',
			data : {
				'accountId' : __CONTEXT_MERCHANT_KEY
			},
			async:false,
			success : function(data) {			
				if (data.result != 'FAIL' && data.account != null) {
					if (data.account != null) {
						acctDetails = data.account;
                        refreshAccountData(acctDetails);
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

    var uploadAvatar = function(){
        IFileUpload.init({
            clickSelector: "#ChinaNetChangeAvatar",  //出发上传窗口打开的selector
            fileInputSelector: "#input_upload_file", //input type=file 的文件选择器
            imgSelector: "#ChinaNetAccountAvatarImg",      //图片上传成功后，替换src的路径图片选择器
            headImg: "#ChinaNetAccountAvatarImg",
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
                        $("#ChinaNetAccountAvatarImg").attr('src', __CONTEXT_PATH + __CONTENT_AVATAR);
                        $("#AccountAvatarImg").attr('src', __CONTEXT_PATH + __CONTENT_AVATAR);
                        //$("#AccountAvatarThumb").attr('src', __CONTEXT_PATH + __CONTENT_AVATAR);
                    }else{
                        onAlertError(data.result.message);
                        IFileUpload.close();
                    }
                }

            }
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
        /*
        userinfoHtml+="    <div class='ChinaNet-Form-Sheet ChinaNet-Form-Required'>";
        userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>手机号码</label>";
        userinfoHtml+="        <div id='id_acct_info_cellphone'  class='Form-Item-Label ChinaNet-Col-5'></div>";
        userinfoHtml+="        <div id='edit_acct_info_cellphone' class='Form-Item-Input ChinaNet-Col-9'><input type='text' id='input_acct_cellphone' class='Input-Control'></div>";
        userinfoHtml+="    </div>";
        */
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
        /*userinfoHtml+="    <div id='div_acct_info_geoLocation' class='ChinaNet-Form-Sheet'>";
        userinfoHtml+="        <label class='Form-Item-Title ChinaNet-Col-2'>地址</label>";
        userinfoHtml+="        <div id='id_acct_info_geoLocation'  class='Form-Item-Label ChinaNet-Col-5'></div>";
        userinfoHtml+="    </div>";*/
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

        var d_UserInfo_edit = dialog({
            id: 'Dailogin:UserInfoedit',
            title: '编辑帐号',
            content: userinfoHtml,
            okValue: '确定',
            ok: function () {
                SubmitAccountProfile();
                return false;
            },

            cancelValue: '取消',
            cancel: function () {},
            width:620,
            height:460,
            skin:'ChinaNet-Dialog'
        });

        d_UserInfo_edit.showModal();
        refreshAccountInfo();

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
        /*
        if(!onCheckEmpty(acctphone)){
            onAlertErrorTip('请输入手机号码', document.getElementById('input_acct_cellphone'));
            return false;
        }else if(!checkMobile(acctphone)){
            onAlertErrorTip('手机号码格式不正确', document.getElementById('input_acct_cellphone'));
            return false;
        }
        */
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
                    refreshAccountData(data.account);
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
         /*$("#id_acct_info_fullname").text(tmp_full_name);
        $("#id_acct_info_email").text(tmp_email);
        $("#id_acct_info_cellphone").text(tmp_cellPhone);
        $("#id_acct_info_merchantName").text(tmp_merchantName);
        $("#id_acct_info_merchantDescription").text(tmp_merchantDesc);*/

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

        //$("#id_acct_info_geoLocation").text(geoLocationStr);

       $("#id_acct_profile_address").text(address);

        if (tmp_accountType != ACCOUNT_TYPE.MERCHANT) {
            $("#div_merchantName").hide();
            $("#div_merchantDescription").hide();
        }
    }

    var openAccountEditor = function(){
        $('button#ChinaNetEditAccountButton').click(function(){
            showUserEdit();
        })
    }

    // 修改密码
    var onChangePassword = function(){
        $('button#ChangeAccountPwd').unbind('click').click(function(){
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

   // 修改商户广告形式
    var onEditAdvertCode = function(){
        $('button#ChangeAdvertForm').unbind('click').click(function(){
            var pwdHtml="";
            pwdHtml += "<div class='Password-Settings-Body'>";
            pwdHtml += "   <div class='ChinaNet-Form-Sheet'>";
            pwdHtml += "       <label class='Form-Item-Title ChinaNet-Col-2'>广告平台1</label>";
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
                title: '广告形式选择',
                content: pwdHtml,
                okValue: '确定',
                ok: ChangePassWord,
                cancelValue: '取消',
                cancel: function () {},
                width:520,
                height:220,
                skin:'ChinaNet-Dialog'
            });
            
            $.ajax({
    			type : 'GET',
    			dataType : 'json',
    			url : '/account/accountdetails.htm',
    			data : {
    				'accountId' : __CONTEXT_MERCHANT_KEY
    			},
    			async:false,
    			success : function(data) {			
    				if (data.result != 'FAIL' && data.account != null) {
    					if (data.account != null) {
    						//acctDetails = data.account;
                            //refreshAccountData(acctDetails);
    					}
    				} else {
    					return false;
    				}
    			},
    			error : function(data) {
    				return false;
    			}
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


    var initUserPhone = function(){
        var bindPhoneHTML = [
            '<div class="Phone-Binded-Body">',
            '<div class="Phone-Binded-Title">',
            '欢迎登录爱wifi商户服务系统<br/>为了您的账号安全，请您先绑定手机号码',
            '</div>',
            '<div class="Phone-Binded-Sheet">',
            '<label>手机号码：</label>',
            '<div class="Phone-Binded-Input"><input id="input_bdphone_cellphone" type="text" placeholder="请输入手机号码" value=""/></div>',
            '<input id="btn_bdphone_submitPhone" class="Phone-Binded-Button" type="button" value="提交号码" timer="60"/>',
            '</div>',
            '<div class="Phone-Binded-Sheet">',
            '<label>&emsp;验证码：</label>',
            '<div class="Phone-Binded-Input"><input id="input_bdphone_verification" type="text" placeholder="请输入验证码" value=""/></div>',
            '</div>',
            '</div>'
        ];

        var bindPhoneShow = dialog({
            id: 'Dailogin:BindPhoneShow',
            title: '重要提示',
            content: bindPhoneHTML.join(''),
            okValue: '确定',
            ok: function(){
                return BindPhone();
            },
            cancelValue: '取消',
            cancel: function(){ },
            width: 620,
            height: 260,
            skin: 'ChinaNet-Dialog'
        });
        bindPhoneShow.showModal();

        // 获取验证码按钮事件
        $('input#btn_bdphone_submitPhone').off('click').on('click', function(){
            var phone  = $("#input_bdphone_cellphone").val();
            if(!onCheckEmpty(phone)){
                onAlertErrorTip('请输入手机号码', document.getElementById('input_bdphone_cellphone'));
                return;
            }

            $.ajax({
                type : 'GET',
                dataType : 'json',
                url : '/account/sendbindingcode.htm',
                data : {
                    account_id: __CONTEXT_MERCHANT_KEY,
                    cell_number: $('#input_bdphone_cellphone').val()
                },
                async:false,
                success:function(data) {
                    console.log(data);
                    if (data.result == 'OK') {
                        //  请求成功，限制60秒后重发
                        getMsgcodeTimer();
                    }else{
                        onAlertErrorTip(data.message || '系统异常', document.getElementById('input_bdphone_cellphone'));
                    }
                }
            });
        });

    }

    // 验证码获取60秒计时
    var getMsgcodeTimer  = function(){
        var btn  = document.getElementById('btn_bdphone_submitPhone');
        btn.disabled = true;

        var getMsgcodeTimerHandle = setInterval(function(){
            var $btn  = $("#btn_bdphone_submitPhone");
            if($btn.length == 0){
                clearInterval(getMsgcodeTimerHandle);
            }
            var timer = (parseInt($btn.attr('timer'), 10) || 0) - 1;
            $btn.attr('timer', timer);
            $btn.val('（' + timer + '秒）');
            if(timer == 0){
                clearInterval(getMsgcodeTimerHandle);
                $btn.val('重新获取').attr('timer', 60);
                $btn[0].disabled = false;
            }
        }, 1000);
    }
    // 绑定手机
    var BindPhone = function(){
        var flag = false;
        var phone  = $("#input_bdphone_cellphone").val();
        var msgcode  = $("#input_bdphone_verification").val();

        if(!onCheckEmpty(phone)){
            onAlertErrorTip('请输入手机号码', document.getElementById('input_bdphone_cellphone'));
            return flag;
        }
        if(!onCheckEmpty(msgcode)){
            onAlertErrorTip('请输入验证码', document.getElementById('input_bdphone_verification'));
            return flag;
        }
        showLoading();
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/account/bindcellnumber.htm',
            data: {
                account_id: __CONTEXT_MERCHANT_KEY,
                cell_number: phone,
                binding_code: msgcode
            },
            async: false,
            success: function(data) {
                if (data.result == 'OK') {
                    __CONTENT_PHONEBINDED = 'true';
                    LoadAccountData();
                    flag = true;
                }else{
                    onAlertError(data.message || '系统异常');
                }
            },
            complete: function() {
                closeLoading();
            }
        });
        return flag;
    }

    var onBindMobile = function(){
        $('button#ChinaNetBindAccountMobile').click(function(){
            initUserPhone();
        })
    }

	return {
		init:function(){
			LoadAccountData();
            uploadAvatar();
            openAccountEditor();
            onChangePassword();
            onBindMobile();
            onEditAdvertCode();
		}
	}
}();

function refreshAccountData(data){
    if(!data) return false;
    var address = eval('('+data.geoLocation+')');

    $('div.ChinaNet-Account-Base-information div').eq(0).find('span').eq(1).html(data.merchantName);
    $('div.ChinaNet-Account-Base-information div').eq(1).find('span').eq(1).html(data.merchantName);
    $('div.ChinaNet-Account-Base-information div').eq(2).find('span').eq(1).html(data.cellNumber);
    $('div.ChinaNet-Account-Base-information div').eq(3).find('span').eq(1).html(address.province+address.city+address.county+address.address);
    $('div.ChinaNet-Account-Base-information div').eq(4).find('span').eq(1).html(data.merchantDescription);

    $('div.ChinaNet-Account-Change-Line').eq(1).find('.Line-Data').html(data.cellNumber);
    if(data.avatarPath!='') $('div.ChinaNet-Account-Avatar img').attr('src', data.avatarPath);
    $('div.ChinaNet-Account-Avatar img').error(function(){
        $('div.ChinaNet-Account-Avatar img').attr('src', '/statics/img/userimgbig.png');
    });

    // 更新后更新当前常量
    __CONTENT_MERCHANT_NAME = data.username;
    __CONTEXT_MERCHANT_FULLNAME = data.fullname;
    __CONTENT_GEOLEVEL = data.geoLevel;
    __CONTENT_MERCHANT_CELL = data.cellNumber;
    __CONTEXT_MERCHANT_CODE = data.type;
    __CONTENT_EMAIL = data.email;
    __CONTENT_MERCHANTNAME = data.merchantName;
    __CONTENT_MERCHANTDESCRIPTION = data.merchantDescription;
    __CONTENT_GEOLOCATION = data.geoLocation;
}