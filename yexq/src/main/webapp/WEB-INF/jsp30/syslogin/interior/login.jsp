<%--
  
  User: outuo2
  Date: 2008-12-16
  Time: 10:53:50 
--%>
<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<LINK href="css/zzsoft/zzsoft.css" type=text/css rel=stylesheet>
<title>爱WiFi网络运维管理系统</title>
<style type="text/css">
<!--
body {
	background-image: url(images/syslogin/bg1.gif);
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
    <script language="javascript" >
function CheckMloginSubmit(){
	if (document.zzLoginActionForm.LOGINNAME.value.length==0){
		alert("请输入用户号");
		return;
	}
	if (document.zzLoginActionForm.PASSWD.value.length==0){
		alert("请输入密码");
		return;
	}
	if (document.zzLoginActionForm.randNum.value.length==0){
		alert("请输入校验码");
		return;
	}
	document.zzLoginActionForm.submit();
}
</script>
</head>

<body>
<html:form action="/zzLoginAction.do?action=loginin" method="POST">
<TABLE WIDTH=741 BORDER=0 align="center" CELLPADDING=0 CELLSPACING=0>
  <TR>
    <TD COLSPAN=3><IMG SRC="images/syslogin/Newlogin_1.jpg" WIDTH=741 HEIGHT=45 ALT=""></TD>
  </TR>
  <TR>
    <TD COLSPAN=3><IMG SRC="images/syslogin/Newlogin_2.jpg" WIDTH=741 HEIGHT=78 ALT=""></TD>
  </TR>
  <TR>
    <TD><img src="images/syslogin/Newlogin_3.gif" width="336" height="261"></TD>
    <TD width="310" height="261" background="images/syslogin/Newlogin_4.jpg" style="padding-top:10px; "><table width="100%"  border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="23%" height="30"><div align="right">用户名：</div></td>
        <td width="77%" height="30"><html:text property="LOGINNAME" styleClass="input" maxlength="20"  size="20" onkeydown="if(event.keyCode==13)event.keyCode=9"/></td>
        </tr>
      <tr>
        <td height="30"><div align="right">密码：</div></td>
        <td height="30"><html:password property="PASSWD" styleClass="input" maxlength="20"  size="20" onkeydown="if(event.keyCode==13)event.keyCode=9"/></td>
      </tr>
      <tr>
        <td height="30"><div align="right">验证码：</div></td>
        <td height="30"><table width="100%"  border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td width="25%"><html:text property="randNum" maxlength="4"  style="width:50px;" size="8" onkeydown="if(event.keyCode==13) CheckMloginSubmit()"/></td>
              <td width="75%"><img src="randimage" width="60" height="20" border="1" ></td>
            </tr>
        </table></td>
        
      </tr>
      
    </table>
      <table width="200"  border="0" align="center" cellpadding="0" cellspacing="0" style="margin-right:40px; margin-top:10px; ">
        <tr>
          <td><a href="javascript:CheckMloginSubmit()"><img src="images/syslogin/login.gif" width="75" height="26" border="0"></a></td>
          <td><a href="./zzLoginAction.do"><img src="images/syslogin/reset.gif" width="75" height="26" border="0"></a></td>
        </tr>
        <tr><td colspan="2"><font color="red">系统支持IE8及以上，兼容模式</font></td></tr>
      </table></TD>
     
    <TD><IMG SRC="images/syslogin/Newlogin_5.jpg" WIDTH=98 HEIGHT=261 ALT=""></TD>
  </TR>
  <TR>
    <TD COLSPAN=3><IMG SRC="images/syslogin/Newlogin_6.gif" WIDTH=741 HEIGHT=116 ALT=""></TD>
  </TR>
  
</TABLE>
</html:form>
</body>
</html>

