<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<script type="text/javascript">if(typeof __IS_INIT_CHINANET=='undefined'){location = '/account/home.htm';}</script>
<link type="text/css" href="/resources/merchant/css/user.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="#">用户管理</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/user/onlineusersuccess.htm" id="useronline" class="initAjax"><span>当前在线用户</span></a>
    <a href="/user/userssuccess.htm" id="useronlinehistory" class="initAjax"><span>历史在线用户</span></a>
    <a href="/user/getmemberssuccess.htm" id="uservip" class="initAjax"><span>VIP用户管理</span></a>
    <a href="/user/blacklistsuccess.htm" id="userblacklist" class="initAjax Active"><span>黑名单用户管理</span></a>
    <a href="/user/whitelistsuccess.htm" id="userwhitelist" class="initAjax"><span>白名单用户管理</span></a>
</div>
<div class="ChinaNet-Free-Body-Right">
    <div id="systemBody" class="Right-Body-Main">
        <!-- Search -->
        <div class="ChinaNet-Search-Body">
            <div class="ChinaNet-Form-Sheet">
                <!--<div class="Form-Item-Title ChinaNet-Col-2">OKOKOKOKOK</div>-->
                <div class="Form-Item-Input ChinaNet-Col-3">
                    <input type="text" id="keywords" class="Input-Control"
                           placeholder="输入用户手机号、关键字">
                </div>
                <!-- <div class="ChinaNet-Left ChinaNet-Col-2">
                    <input type="text" id="userStatus" name="userStatus">
                </div> -->
                <!--
                <div class="ChinaNet-Left ChinaNet-Col-2">
                    <input type="text" id="state" name="state">
                </div>-->
                <div class="ChinaNet-Col-2 ChinaNet-Left">
                    <button id="btn_search_user" class="Form-Primary">
                        <span>查询用户</span>
                    </button>
                </div>
            </div>
        </div>
        <!--  Search -->
        <div id="userstab" class="ChinaNet-Free-Table ChinaNet-Form-Sheet">
            <table>
                <tr class="ChinaNet-Table-Title">
                    <th width="20%">用户手机号</th>
                    <th width="24%">初次登录时间</th>
                    <th width="24%">最后登录时间</th>
                    <th width="24%">用户标志</th>
                    <th class="Width-For-Button">&nbsp;</th>
                </tr>
                <tbody id="tbl_user_lst" class="ChinaNet-Form-Sheet">

                </tbody>
            </table>
        </div>
        <!-- Page Line -->
        <div class="ChinaNet-Page-Table">
            <a id="a_pagination_previous">
                <span class="Overly-Left"></span>
                <span class="Overly-Right"></span>
                <span>前一页</span>
            </a>
            <a href="javascript:;" class="Active">
                <span class="Overly-Left"></span>
                <span class="Overly-Right"></span>
                <span id="lb_pagenumber">1</span>
            </a>
            <a id="a_pagination_next">
                <span class="Overly-Left"></span>
                <span class="Overly-Right"></span>
                <span>后一页</span>
            </a>
        </div>
        <div class="User-Type-List" data-uid="" data-mac="">
            <ul>
                <li tag="Vip" addurl="/user/addmember.htm" removeurl="/user/removemember.htm">VIP</li>
                <li tag="White" addurl="/user/adduserdevstowhite.htm" removeurl="/user/removefromwhite.htm">白名单</li>
                <li tag="Black" addurl="/user/adduserdevtoblack.htm" removeurl="/user/removefromblack.htm" class="Black-List-Li">黑名单</li>
            </ul>
        </div>
    </div>
</div>
<!-- Page Line -->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/user.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        userApp.init('black');
    });
</script>



