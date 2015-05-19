<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/statics/css/index.css" media="screen">

<!-- Navigator -->
<!--<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#" class="initAjax">帐号概览</a>
</div>-->
<!-- ./Navigator -->

<!-- Working Statis -->
<div class="ChinaNet-Free-Title">
    <div class="Title-Name">实时数据统计信息</div>
</div>

<!-- Statis Chart -->
<div class="Index-Top-Statis">
    <ul>
        <li>
            <div class="Index-Statis-Chart-Item Index-Statis-Chart-Item-Guest">
                <div class="Chart-Item-Figure Chart-Online-Guest"></div>
                <div class="Statis-Data-District">
                    <ul class="Statis-Data-Row">
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">在线用户</span>
                                <span id="userOnLineCount" class="Index-Data-Number"></span>
                            </div>
                        </li>
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">离线用户</span>
                                <span id="userOffLineCount" class="Index-Data-Number"></span>
                            </div>
                        </li>
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">用户总数</span>
                                <span id="userAllCount" class="Index-Data-Number"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
        <li>
            <div class="Index-Statis-Chart-Item Index-Statis-Chart-Item-Device">
                <div class="Chart-Item-Figure Chart-Online-Device"></div>
                <div class="Statis-Data-District">
                    <ul class="Statis-Data-Row">
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">在线设备</span>
                                <span id="deviceOnLineCount" class="Index-Data-Number"></span>
                            </div>
                        </li>
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">离线设备</span>
                                <span id="deviceOffLineCount" class="Index-Data-Number"></span>
                            </div>
                        </li>
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">设备总数</span>
                                <span id="deviceAllCount" class="Index-Data-Number"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>
<!-- ./Statis Charts -->
<!-- ./Working Statis -->


<!-- Flow Statis Chart -->
<div class="Index-Flow-Statis">
    <div class="Flow-Statis-Chart"></div>
</div>
<!-- ./Flow Statis Chart -->


<!-- Portal Statis -->
<div class="Index-Statis-Sheet">
    <ul>
        <li>
            <div class="Statis-Sheet-Item">
                <div class="ChinaNet-Free-Title">
                    <div class="Title-Name">24小时用户认证方式</div>
                </div>
                <div class="ChinaNet-Free-Table">
                    <table>
                        <tbody id="AuthDetails_body">
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
        <li>
            <div class="Statis-Sheet-Item">
                <div class="ChinaNet-Free-Title">
                    <div class="Title-Name">24小时用户访问设备</div>
                </div>
                <div class="ChinaNet-Free-Table">
                    <table>
                        <tbody id="TerminalDetails_body">
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
        <li>
            <div class="Statis-Sheet-Item">
                <div class="ChinaNet-Free-Title">
                    <div class="Title-Name">24小时用户访问浏览器</div>
                </div>
                <div class="ChinaNet-Free-Table">
                    <table>
                        <tbody id="BrowserDetails_body">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    </ul>
</div>
<!-- ./Portal Statis -->
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/index.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	    indexApp.init();
	 });
</script>