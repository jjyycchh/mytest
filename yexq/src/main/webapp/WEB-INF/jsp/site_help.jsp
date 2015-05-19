<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setHeader("Cache-Control", "no-store");
response.setDateHeader("Expires", 0);
%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="-1" />
<meta http-equiv="pragma" content="no-cache" />
<title>用户帮助说明</title>

<link href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css" rel="stylesheet" media="screen">
<style>
body{
	width:90%;
	margin:0 auto 50px;
	font-family: '微软雅黑';
	font-size:14px;
}
.bgDiv{
	width:90%;
	margin:0 auto;
}
.head{
	width:80%;
	margin:auto;
	margin-bottom:40px;
}
h1,h2,h3,h4,h5{
font-family: '微软雅黑';
}
h3{
	text-align:center;
}
h5{
	font-weight:bold;
}
h4{
	line-height:40px;
	color:white
}
p {text-indent: 1cm}
img.normal{ 
  width:100%;
}
img.small_pic{
	vertical-align:bottom;
}


.div_img{
	width:650px;
	margin:0 auto;
}
.img_text{
	text-align:center;
}
.div_title_h4{
height:40px;
background-color:#ccdff0;
margin-bottom:10px	
}
.main_header {
	width:100%;	
	height:50px;	
	background-image: url(img/index_04.jpg);
    background-repeat: repeat-x;
}
</style>

</head>
<body>

<div class="head">
<h3>接入系统平台(3.0)帮助说明</h3>
<h5 class="pull-right"><a href="javascript: window.location.href = '${pageContext.request.contextPath}/account/home.htm';"><span class="glyphicon glyphicon-user"></span>返回主页</a></h5>

</div>
<div class="container">
<div id="part1">
<div class="div_title_h4">
<h4>1 平台概述</h4>
</div>
<h5>1.1 版本信息:</h5><p>接入系统平台V3.0</p>
<h5>1.2 平台功能简介:</h5><p>接入系统平台3.0 提供了对WiFi设备、站点内容、站点模板、商户等内容的统一管理和维护。</p>
<h5>1.3 服务对象:</h5><p>各级管理员、客户经理、商户等平台的使用者。</p>
</div>
  <div id="part2">
  <div class="div_title_h4">
  <h4>2 平台结构及功能模块介绍</h4>
  </div>
   <h5>2.1 平台结构</h5>
   <div class="div_img">
   <img  src="${pageContext.request.contextPath}/resources/img/site_help/jgt.jpg" />
   <p style="text-align:center">图2.1 平台结构图</p>
   </div>
   <h5>2.2 功能模块简介</h5>
<p class="text-danger">接入系统平台3.0包括7个功能模块，分别是<a href="#zhgl">账号概览，</a> <a href="#sbgl">设备管理，</a> <a href="#wifigl">wifi门户，</a><a href="#yhgl">用户管理，</a><a href="#tjfx">统计分析，</a> <a href="#zhgl">账号管理，</a><a href="#xtgl">系统管理。</a></p>
<p><strong>账号概览：</strong>显示登录用户的基本信息和该用户的操作记录，以及用户的最近24小时接入用户数、最近24小时新增商户、连接用户数等数据信息。并提供了系统配置、设备管理、统计分析、站点管理等的快捷面板操作。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/zhgl.jpg"></img>
<p style="text-align:center">图2.2 账号概览</p>
</div>
<p><strong>设备管理：</strong>对提供wifi的设备进行集中管理，用户对其管辖下的设备可进行查看设备、配置设备、锁定设备等操作。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/sbgl.jpg"></img>
<p style="text-align:center">图2.3 设备管理列表</p>
</div>

<p><strong>用户管理</strong>：登录用户可对管辖范围内的设备使用者进行管理，可查看使用某个设备的用户、使用流量、使用时间、在线状态等信息，可对使用者进行锁定操作，使用者被锁定之后，该用户将无法使用对应的设备继续上网。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/yhgl_1.jpg"></img>
<p style="text-align:center">图2.4 用户管理</p>
</div>

<p><strong>Wifi门户管理：</strong>该模块分为站点管理和推送策略管理，用户可新增、编辑、锁定、删除站点；用户可新增、编辑、锁定、删除策略。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/wifi_1.jpg"></img>
<p style="text-align:center">图2.5 站点管理</p>
</div>
<p><strong>系统管理：</strong>包括平台设置和模板设置。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/xxsz.jpg"></img>
<p style="text-align:center">图2.6 系统设置</p>
</div>
<p><strong>统计分析：</strong>包括用户分析，流量分析，wifi门户分析。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/yhfx.jpg"></img>
<p style="text-align:center">图2.7 用户量统计分析</p>
</div>

<p><strong>账号管理：</strong>账号和权限管理。包括新增账号、修改账号基本信息、修改账号权限、删除账号、锁定账号等操作。</p>
<div class="div_img">
<img style="width:640px" src="${pageContext.request.contextPath}/resources/img/site_help/zhgl_1.jpg"></img>
<p style="text-align:center">图2.8 账号管理</p>
</div>

</div>

  <div id="part3">
  <div class="div_title_h4">
 <h4> 3 操作指南 </h4> 
 </div>
<p class="text-danger">接入系统平台3.0平台与用户的交互在以上功能模块中都有涉及，本部分内容聚焦与平台的交互，将用户与平台的各项交互，按照功能模块的划分来组织。</p>
    <h5>3.1 商户注册</h5><p>点击登录页的注册按钮，进入商户注册界面：</p>
    <div class="highlight">
     <div class="div_img">
    <img class="normal"  src="${pageContext.request.contextPath}/resources/img/site_help/zc.jpg" />
    <p class="img_text">图3.1 用户注册</p>
    </div>
    </div>
    <h5>3.2用户修改密码</h5> <p>用户点击页面右上角<img class="small_pic"  src="${pageContext.request.contextPath}/resources/img/site_help/cjgly.jpg"/> ，选择修改密码项，可在弹出的页面中修改密码。</p>
    <div class="div_img">
    <img class="tanchu"  src="${pageContext.request.contextPath}/resources/img/site_help/xgmima.jpg"/>
    <p class="img_text">图3.2 修改密码</p>
    </div>
   <h5>3.3 用户修改自身信息</h5> <p>用户点击页面右上角<img class="small_pic"  src="${pageContext.request.contextPath}/resources/img/site_help/cjgly.jpg"/>  ，选择账号信息项，弹出个人信息页面，如下图所示：</p>
    <div class="div_img">
   <img  src="${pageContext.request.contextPath}/resources/img/site_help/grxx.jpg"/>
   <p class="img_text">图3.3 个人信息</p>
   </div>
   <p>点击编辑按钮，可对信息进行编辑，如下图所示：</p>
   <div class="div_img">
   <img class="tanchu" src="${pageContext.request.contextPath}/resources/img/site_help/grxxxg.jpg" />
   <p class="img_text">图3.4 个人信息编辑</p>
   </div>
   
   <h5><span id="zhgl">3.4 账号及权限管理———添加用户</span></h5>
   <p>点击账号管理菜单项中的"账号管理"，进入账号管理页面，点击<img class="small_pic" src="${pageContext.request.contextPath}/resources/img/site_help/cjzh.jpg"/> 按钮，进入账户添加页面：如下图所示：输入账号相关信息之后，在权限选择中，鼠标单击选择相应权限，保存即可。</p>
   <div class="div_img">
   <img class="normal"  src="${pageContext.request.contextPath}/resources/img/site_help/cjzhym.jpg"/>
   <p class="img_text">图3.5 添加用户</p>
   </div>
   
  <h5> 3.5 账号及权限管理———修改下属用户</h5>
  <p>用户选择账号列表中的某个用户，点击"编辑"按钮，进入用户编辑页面：如下图所示，在编辑页面，可进行用户信息的编辑和用户权限的编辑。</p>
  <div class="div_img">
  <img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/bjyhxx.jpg"/>
  <p class="img_text">图3.6 编辑用户信息</p>
  </div>
  <p>编辑页面，用户可设置其直属下级账号，只需点击<img class="small_pic" src="${pageContext.request.contextPath}/resources/img/site_help/zsxjzhan.jpg"/>按钮，在弹出的页面中，选择相应账号的用户，单击选定，之后在直属下级账号列表中，就可看到新添加的直属账号信息。若要解除直属关系，只需选中要解除关系的账号，然后点击<img class="small_pic" src="${pageContext.request.contextPath}/resources/img/site_help/jczsgx.jpg"/>即可。</p>
  <div class="div_img"><img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/zsxjzh.jpg"/>
       <p class="img_text">图3.7 直属下级账号列表</p>
  </div>
  <div class="div_img">
  <img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/tjzzh.jpg"/>
  <p class="img_text">图3.8 设置直属下级账号</p>
  </div>
  <h5> 3.6 账号及权限管理——锁定/解锁用户</h5>
<p>账号列表中，选择"锁定"即可。被锁定的用户将无法使用该平台。</p>

<h5 id="sbgl">3.7 设备管理——配置设备</h5>
<p>设备列表中，选择"配置"按钮，进入配置页面：可修改设备名称、无线SSID，保存配置。</p>
<div class="div_img">
<img  src="${pageContext.request.contextPath}/resources/img/site_help/pzsb.jpg"/>
<p class="img_text">图3.9 配置设备</p>
</div>
<h5> 3.8 设备管理——锁定设备</h5>
<p>设备列表中，选择"锁定"即可。</p>

<h5 id="wifigl">3.9 WiFi门户——站点管理</h5>

<p>站点管理：提供了站点的查询、编辑、添加、锁定/解锁、删除操作。</p>
<div class="div_img">
<img  src="${pageContext.request.contextPath}/resources/img/site_help/zdlb.jpg"/>
<p class="img_text">图3.10 站点管理列表</p>
</div>
<p class="text-primary">WiFi门户——站点管理——添加页面</p>
<p>用户点击"添加页面"按钮，在弹出的窗口中输入页面标题，并选择页面类型和模板类型，点击"保存页面"按钮完成一个页面的添加。若要添加多个不同类型的页面，只需要重复以上操作步骤即可。</p>

<p class="text-primary">WiFi门户——站点管理——添加站点</p>	

<p>1 添加站点操作流程：添加站点分2步骤：</p>
       <p> 1> 添加页面：参考"如何添加页面"。</p>
        <p>2> 添加站点：在"站点名称"输入框中，输入站点名称，并选择所属商家，保存站点即可。</p>
 <p>2 站点添加过程：站点列表页，用户点击<img src="${pageContext.request.contextPath}/resources/img/site_help/tjzd.jpg" class="small_pic"/>，进入添加页面，点击"添加页面"按钮，弹出框中输入页面标题、选择页面类型和模板，之后保存页面；若要添加多个页面，重复以上步骤即可；添加完页面之后，输入"站点名称"和所属商家，之后保存站点，新的站点添加完毕。操作过程如下图所示：</p>
 <div class="div_img">
 <img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/tjzd1.jpg"/>
 <p class="img_text">图3.11 添加站点1</p>
 </div>
 <p>点击"添加页面"，输入信息后，保存页面。</p>
 <div class="div_img">
 <img style="width:640px" class="tanchu" src="${pageContext.request.contextPath}/resources/img/site_help/tjym111.jpg"/>
 <p class="img_text">图3.12 添加页面</p>
 </div>
<p>保存页面成功之后，在站点添加页面中，可看到新添加的页面标题和模板信息以及模板内容，用户可对模板内容进行编辑、重置操作。</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/tjhymzh.jpg"/>
<p class="img_text">图3.13 添加完成的页面</p>
</div>
<p> 用户可编辑和重置模板内容信息：上图中，用户可对引导图层和广告轮播等内容进行编辑，现以编辑引导图层为例进行说明：点击"编辑"，弹出引导图层编辑对话框：</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/bjydtc.jpg"/>
<p class="img_text">图3.14 编辑引导图层</p>
</div>
<p>上图中，点击图片区域，弹出图片集框，如下图所示，用户可选中要替换引导图层的图片，选中即可完成操作，此项操作。在编辑引导图层时，支持用户本地图片上传到图片集和用户删减图片集中的图片等但使用中的图片不允许用户进行删除操作。</p>
<div class="div_img" >
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/bjydtc2.jpg"/>
<p class="img_text">图3.15 选择引导图层的图片</p>
</div>
<p>最后，输入站点名称，选择所属商户，保存站点。如下图所示：</p>
<div class="div_img">
<img  class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/bczdwb.jpg"/>
<p class="img_text">图3.16 保存站点</p>
</div>
<p>3 添加站点注意事项：</p>
<p> 1> 页面类型：添加页面的时候，需要选择页面类型，用户可添加三种类型的页面，分别是<span class="text-danger">内容页，验证页，和登陆页</span>。添加次序可按照登录页——验证页——内容页的次序进行添加。,其中，登录页和验证页只能添加一个页面，内容页可添加多个。</p>
<p> 2> 页面模板：模板定义了页面元素的呈现方式，用户从已有的模板集合中选择需要的模板，页面会根据用户的选择，生成该模板的一个布局实例。</p>
<p> 3> 所属商家：以管理员或客户经理身份登录系统，在进行站点添加的时候，会让选择商家，该站点会对应到选定的商家。</p>

<h5>WiFi门户——站点管理——添加推送策略</h5>	
<p>推送策略列表：</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/cllb.jpg"/>
<p class="img_text">图3.17 推送策略列表</p>
</div>
<p>点击"增加策略"，如下图所示，输入策略标题并进行商家选择</p> 
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/cltj001.jpg"/>
<p class="img_text">图3.18 添加策略</p>
</div>
<p>之后点击"选择设备"，弹出框中，选中需要添加策略的设备，如下图所示：</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/tjcebtsb.jpg"/>
<p class="img_text">图3.19 添加策略——选择设备</p>
</div>
<p>"点击添加策略时间计划"，弹出窗口中，选择该策略要应用到的站点，然后选择策略的播放时间，点击"确定"，如下图所示：</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/xzclzd2.jpg"/>
<p class="img_text">图3.20 添加策略——选择策略站点</p>
</div>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/xzcewc.jpg"/>
<p class="img_text">图3.21 保存策略</p>
</div>
<p>最后，点击"保存策略"按钮，新增策略操作完毕。</p>
<h5>WiFi门户——站点管理——锁定/解锁策略：</h5>
<p>策略列表中，点击"锁定"or "解锁"按钮，完成操作。锁定的策略不能进行编辑。</p>

<h5 id="yhgl">3.10 用户管理</h5>
<p>查看使用设备的用户信息，包括用户手机号，用户使用流量，用户登录时间，用户状态、用户使用设备等信息。并可对用户进行锁定操作，用户被锁定之后，无法再通过对应的设备连接网络。如下图所示:</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/yhgl.jpg"/>
<p class="img_text">图3.22 用户列表</p>
</div>
<%-- 
<h5 id="tjfx">3.11 统计分析</h5>
<p>对用户、WiFi门户、流量等进行分析。</p>
<h5 id="xtgl">3.12 系统管理——平台设置：</h5>
<p>设置短信网关，用户认证方式等。</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/xtsz.jpg"/>

<p class="img_text">图3.23 系统设置-平台设置</p>
</div>
<h5>3.13 系统管理——模板设置</h5>
<p>站点布局风格的呈现是通过模板来完成的，模板设置提供不同类型模板页的集中管理，管理员可添加、编辑模板。该处的模板均可被应用到站点中，呈现站点的布局风格。</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/mbkjlb.jpg"/>
<p class="img_text">图3.24 系统设置-模板列表</p>
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/mbbj.jpg"/>
<p class="img_text">图3.25 系统设置-模板设置</p>
</div>
<h5>3.14 系统管理——第三方接入</h5>
<p>用户通过第三方设备接入时，提供对接入用户的身份认证和管理。接入系统平台提供第三方认证管理。如下图所示，添加第三方认证接入和第三方认证显示列表，系统管理员可添加、锁定/解锁第三方认证项。</p>
<div class="div_img">
<img class="normal" src="${pageContext.request.contextPath}/resources/img/site_help/dsfjr.jpg"/>
<p class="img_text">图3.26 系统设置-第三方接入</p>
</div>

--%>

<div class="div_title_h4">
<h4> 4服务与支持</h4>
</div>
<p>建立完善的客户档案，依据客户需求及时提供个性化服务;限时到达客户现场服务，限时处理客户投诉;通过高科技手段，远程支持、监控，在第一时间帮助客户发现问题，解决问题;制定客户回访制度，定期回访客户，免费为客户提供技术培训;提供7X24小时服务热线，为客户提供统一的咨询、投诉平台。</p>

<h5>地址：杭州市莫干山路118号    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;    邮编：310005     </h5>
<h5>客户服务热线：4008 899 899 &nbsp;&nbsp;&nbsp;&nbsp; 传真：0571-87025973</h5>
<h5>电子邮箱：zjxcpubinfo@189.cn</h5> 


</div>

</div>
</body>
</html>