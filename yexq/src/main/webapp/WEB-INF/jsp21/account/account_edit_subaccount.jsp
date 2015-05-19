<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link type="text/css" href="${pageContext.request.contextPath}/statics/css/account.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/account/account_management.htm" class="initAjax">帐号管理</a>
    <a href="#">帐号配置</a>
    
    <a href="/account/viewaccountdetails.htm?accountId=${accountId}" class="Action-Primary End-Button ChinaNet-Right initAjax">返回帐号信息</a>
</div>
<!-- ./Navigator -->

<div class="ChinaNet-Free-Content">
    <div class="ChinaNet-Free-Body ChinaNet-Free-Width">
        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">配置直属子帐号</div>
        </div>

        <div class="Account-Detail-Subaccount-Edit-Body">
            <ul>
                <li class="Account-Subaccount-Information">
                    <div class="Account-Edit-Data-Body Account-Edit-left">
                        <ul>
                            <li>
                                <div class="ChinaNet-Free-Table">
                                    <table>
                                        <tbody>
                                        <tr class="Edit-Left-Table-Body">
                                            <td class="Table-Name-Photo-Td ChinaNet-Col-12" colspan="2"><img id="AccountAvatarImgsrc" src="/statics/img/no-image.png" height="180" width="180"></td>
                                        </tr>
                                        <tr class="Edit-Left-Table-Body">
                                            <td class="Table-Name-Subaccount-Td ChinaNet-Col-12" colspan="2">
                                                <span>&nbsp;</span>
                                            </td>
                                        </tr>
                                        <tr class="Edit-Left-Table-Body ChinaNet-White">
                                            <td class="Table-Name-Td ChinaNet-Col-6">
                                                <span>当前帐号：</span>
                                            </td>
                                            <td class="Table-Name-Subaccount-Td ChinaNet-Col-6 ">
                                                <span id="account_user">pubinfo</span>
                                            </td>
                                        </tr>
                                        <tr class="Edit-Left-Table-Body ChinaNet-White">
                                            <td class="Table-Name-Td ChinaNet-Col-6">
                                                <span>帐号类型：</span>
                                            </td>
                                            <td class="Table-Name-Subaccount-Td ChinaNet-Col-6 ">
                                                <span id="account-typename">代理商</span>
                                            </td>
                                        </tr>
                                        <tr class="Edit-Left-Table-Body ChinaNet-White">
                                            <td class="Table-Name-Td ChinaNet-Col-6">
                                                <span>所有子帐号数：</span>
                                            </td>
                                            <td class="Table-Name-Subaccount-Td ChinaNet-Col-6 ">
                                                <span id="account_childCountAll">59</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="Account-Subaccount-Edit-Body">
                	<div class="ChinaNet-Search-Body">
            			<div class="ChinaNet-Form-Sheet">
                			<div class="Form-Item-Input ChinaNet-Col-3"><input type="text" id="keywords" class="Input-Control" placeholder="关键字"></div>
           					<div class="ChinaNet-Col-1 ChinaNet-Left">
              					<button id="btn_Search_directSub" class="Form-Primary"><span>查询</span></button>
          					</div>
            			</div>          
        			</div>
                    <div class="ChinaNet-Free-Table">
                        <table>
                            <tr class="Account-Table-Title">
                                <th width="5%">&nbsp;</th>
                                <th width="25%">帐号</th>
                                <th width="25%">名称</th>
                                <th width="15%">类型</th>
                                <th>所属区域</th>                                
                               <!--  <th width="150">创建时间</th> -->
                            </tr>
                            <tbody id="tbl_direct_subacct_lst">
                            <tr class="ChinaNet-Table-Body">
                                <td>
                                    <div  class="Form-Item-Input">
                                        <input name="" type="checkbox" class="Checkbox-Control" value="">
                                    </div>
                                </td>
                                <td>
                                    <span class="Table-Data-Text">pubinfotese</span>
                                </td>
                                <td>
                                    <span class="Table-Data-Text-Account">信产商户测试帐号</span>
                                </td>
                                <td>
                                    <span class="Table-Data-Text">商户</span>
                                </td>
                                <td>
                                    <span class="Table-Data-Text">浙江省杭州市拱墅区</span>
                                    <span class="Table-Data-Text">米市巷街道莫干山路118号</span>
                                </td>
                                <td>
                                    <span class="Table-Data-Text">标签一，标签二，标签三，标签四，标签五</span>
                               <%--  </td>
                                
                                    <span class="Table-Data-Text">2014-08-18 10:00:00</span>
                                </td> --%>
                            </tr>                           
                            </tbody>
                        </table>
                    </div>
                    <div class="ChinaNet-Search-Body">
                        <div class="Account-Form-Sheet">

                            <div class="ChinaNet-Col-2 ChinaNet-Left">
                                <button class="Form-Primary initAjax" data-subid="" id="btn_open_sub_acct"><span>添加子帐户</span></button>
                            </div>

                            <div class="ChinaNet-Col-2 ChinaNet-Left">
                                <button class="Form-Primary-Relieve" id="remove_sub_acct"><span>解除帐户关系</span></button>
                            </div>
                        </div>
                    </div>
                   <div class="ChinaNet-Page-Table">
      <a id="a_dir_subacct_pagination_previous">
          <span class="Overly-Left"></span>
          <span class="Overly-Right"></span>
          <span>前一页</span>
      </a>
      
      <a href="javascript:;" class="Active">
          <span class="Overly-Left"></span>
          <span class="Overly-Right"></span>
          <span id="lb_dir_subacct_pagenumber">1</span>
      </a>
      
      <a id="a_dir_subacct_pagination_next">
          <span class="Overly-Left"></span>
          <span class="Overly-Right"></span>
          <span>后一页</span>
      </a>
 </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/subAccount.js"></script>
<script type="text/javascript">var _AccountID='${accountId}';
	$(document).ready(function(){
		accounteditApp.init();           
	 });
</script>