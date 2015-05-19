<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/resources/merchant/css/index.css" media="screen">

<!-- Navigator -->
<!--<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#" class="initAjax">帐号概览</a>
</div>-->
<!-- ./Navigator -->
<!-- Statis Chart -->
<div class="Index-Top-Statis">
    <ul>
        <li class="First-Item">
            <!-- Working Statis -->
            <div class="ChinaNet-Free-Title">
                <div class="Title-Name">实时用户信息</div>
            </div>
            <div class="Index-Statis-Chart-Item">
                <div class="Chart-Item-Figure Chart-Online-Guest"></div>
                <div class="Statis-Data-District">
                    <ul class="Statis-Data-Row">
                        <li>
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">当前在线用户数：</span>
                                <span id="userOnLineCount" class="Index-Data-Number66"></span>
                            </div>
                        </li>
                        <li class="Special-Item-Href">
                            <div class="Data-Row-Item First-Item">
                                <span id="userNewUserCount" class="Index-Data-Number-OrangeA"></span>
                                <span class="Index-Data-Name14">新用户</span>
                            </div>
                        </li>
                        <li class="Special-Item-Href">
                            <div class="Data-Row-Item">
                                <span id="userOldUserCount" class="Index-Data-NumberB"></span>
                                <span class="Index-Data-Name14">老用户</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
        <li>
            <!-- Working Statis -->
            <div class="ChinaNet-Free-Title">
                <div class="Title-Name">实时广告投放信息</div>
            </div>
            <div class="Index-Statis-Chart-Item Index-Statis-Chart-Item-Device">
                <div class="Chart-Item-Figure Chart-Online-AD"></div>
                <div class="Statis-Data-District">
                    <ul class="Statis-Data-Row">
                        <li>
                            <div class="Data-Row-Item First-Item">
                                <span class="Index-Data-Name">历史广告投放次数：</span>
                                <span id="adPushTimeHistory" class="Index-Data-Number"></span>
                            </div>
                        </li>
                        <li class="Special-Item">
                            <div class="Data-Row-Item">
                                <span class="Index-Data-Name">今日广告投放次数：</span>
                                <span id="adPushTimeToday" class="Index-Data-Number-OrangeB"></span>
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
<div class="Index-TP-Infos">
    <div class="ChinaNet-Free-Title">
        <div class="Title-Name">运营信息</div>
    </div>
    <ul id="Index-TP-Infos-List">
        <!--li class="Info-User-Icon">
            <div class="Index-TP-Info-Time">1小时前</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-Msg-Icon">
            <div class="Index-TP-Info-Time">12小时前</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-List-Icon">
            <div class="Index-TP-Info-Time">2014-05-28</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-User-Icon">
            <div class="Index-TP-Info-Time">1小时前</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-Msg-Icon">
            <div class="Index-TP-Info-Time">12小时前</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-List-Icon">
            <div class="Index-TP-Info-Time">2014-05-28</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-User-Icon">
            <div class="Index-TP-Info-Time">2014-05-28</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-Msg-Icon">
            <div class="Index-TP-Info-Time">12小时前</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li>
        <li class="Info-List-Icon">
            <div class="Index-TP-Info-Time">2014-05-28</div>
            <a href="javascript:;" class="Index-TP-Info-Title">test测试测试测试！！！</a><span class="Index-TP-Info-Intro">我是摘要！~~~我是摘要！~~~</span>
        </li-->
    </ul>
</div>
<!-- Flow Statis Chart
<div class="Index-Flow-Statis">
    <div class="Flow-Statis-Chart"></div>
</div>
<!-- ./Flow Statis Chart -->


<!-- Portal Statis
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
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/index.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
	    indexApp.init();
	 });
</script>