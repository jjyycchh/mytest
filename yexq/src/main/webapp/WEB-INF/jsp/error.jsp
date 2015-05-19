<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<style>
html {
	position: relative;
	min-height: 100%;
}

body {
	font-family: '微软雅黑';
	margin: 0 0 50px;
}

a:focus {
	outline: 0;
}

.panel-footer .pagination {
	margin: 0;
}

#main_bord {
	height: 460px;
}

.error_board {
	height: 157px;
	border: 1px solid #aaccee;
}

.error_board_head {
	border: 1px solid #aaccee;
	background-color: #ddebf8;
	height: 30px;
}

#text_and_img {
	padding-top: 5px;
	padding-left: 19px;
}

#error_info {
	padding-top: 25px;
	margin-bottom: 10px;
}

.shadow {
	background: -webkit-radial-gradient(30% 30%, #fff 0%, #000 100%);
	box-shadow: 3px 3px 3px 3px #104e8b;
}
</style>

<div class="container" style="padding-top: 40px; margin-bottom: 50px">
	<div class="row">
		<div class="col-md-1"></div>
		<div class="col-md-8">
			<div id="main_bord">
				<div class="row">
					<div class="col-md-offset-2 col-md-7">
						<div class="error_board">
							<div class="error_board_head">
								<div class="row">
									<div class="col-md-12" id="text_and_img">
										<img src="${pageContext.request.contextPath}/resources/img/tishi_tu.png">
										提示信息
									</div>
								</div>
								<div class="row">
									<div class="col-md-3" style="padding-top: 5px">
										<img src="${pageContext.request.contextPath}/resources/img/tishi_tu1.jpg">
									</div>
									<div class="col-md-9">
										<div id="error_info">
											<span style="color: #236B8E">出错了，该页面无法显示！</span>
										</div>
										<div style="color: #236B8E">
											<span id="showbox" style="color: red">5</span>秒钟跳转，
											<a href="${pageContext.request.contextPath}/login.htm" style="text-decoration: underline">点击进入</a>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
					<div class="col-md-3"></div>
				</div>
			</div>

		</div>
		<div class="col-md-2"></div>

	</div>

</div>
<script>
var t=3;//设定跳转的时间 
var ID = setInterval("refer()",1000); //启动定时 
function refer(){  
    if(t==0){ 
    	window.opener = null;

    	clearInterval(ID);

        window.location.href = '${pageContext.request.contextPath}/account/login.htm';

    } 
    $("#showbox").html(t); // 显示倒计时 
    t--; // 计数器递减 
} 

</script>