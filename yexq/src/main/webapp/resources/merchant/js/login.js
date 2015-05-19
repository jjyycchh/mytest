/**
 * Created by huanghanxian on 14-8-13.
 */

var loginApp = function(){
    var initLoginBody = function(){
        var height = $(window).height();
        if($('div.ChinaNet-Free-Login').length>0) {
            $('div.ChinaNet-Free-Login').height(height);
            //$('div.ChinaNet-Free-Login-Bottom').height(height-700);
        }
    }

    var onAccountLogin = function(){
        $('form#AccountSubmitForm').submit(function(){
            var username = $('input#AccountName').val();
            var password = $('input#AccountPassword').val();
            var action   = $(this).attr('action');
            if(!isNotEmptyString(username)){
                onAlertErrorTip('请输入用户名', document.getElementById('AccountName'));
                return false;
            }else if(!onCheckEmpty(username)){
                onAlertErrorTip('用户名不能含有空格', document.getElementById('AccountName'));
                return false;
            }

            if(!isNotEmptyString(password)){
                onAlertErrorTip('输入登录密码', document.getElementById('AccountPassword'))
                return false;
            }

            $.ajax({
                url:action,
                type:"POST",
                dataType:"JSON",
                data:{
                    "account.username":username,
                    "account.password":window.md5(password)
                },
                async:false,
                success:function(data){
                    if(data.result=='OK'){
                    	window.location.href = 'http://'+window.location.hostname+':'+data.httpport+'/account/home.htm';
                    }else{
                        onAlertError(data.message);
                        return false;
                    }
                }
            })

            return false;
        })
    }


    return {init:function(){
        initLoginBody();
        onAccountLogin();
        $('input#AccoutName').focus();
        $(window).resize(function(){
            initLoginBody();
        })
    }}
}();
