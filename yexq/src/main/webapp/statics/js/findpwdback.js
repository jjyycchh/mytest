

var registerApp = function(){
	
	var initfindpwd = function(){
		$("#id_pwdbtn").click(function() {
			
			if(!checkUserName($("#username").val())){
	            onAlertErrorTip('用户名不能为空，且必须由中英文、数字、下划线或.组成', document.getElementById('username'));
	            return false;
	        }
			if($("#username").val().length > 50){
            	onAlertErrorTip('用户名不能超过50个字符', document.getElementById('username'));
            	return false;
            }
			$.ajax({
	            type: 'POST',
	            dataType: 'json',
	            url: '/account/findpwdback.htm',
	            data: {
	            	"username":$("#username").val()               	
	            },
	            success: function (data) {
	                if (data.result == 'OK') {
	                	onAlertError("验证信息已发送到您的邮箱","ok");
	                	//$("#inputdiv").hide();
	                	//$("#resultdiv").show();
	                    
	                } else {
	                	onAlertError(data.message);
	                }
	            },
	            error: function (data) {
	                onAlertError("提交验证失败！");
	            }
	        });
		});
    }
	return {init:function(){
				initfindpwd();
    		}
		}
}()