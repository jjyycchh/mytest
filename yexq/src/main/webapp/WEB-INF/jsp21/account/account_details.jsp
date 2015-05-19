<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<link type="text/css" href="${pageContext.request.contextPath}/statics/css/account.css" rel="stylesheet" media="screen">

<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/account/account_management.htm" class="initAjax">帐号管理</a>
    <a href="#">帐号信息</a>

    <a href="/account/account_management.htm" class="Action-Primary End-Button ChinaNet-Right initAjax">返回帐号列表</a>
    <a href="/account/addaccount.htm" class="Action-Primary ChinaNet-Right initAjax">添加新帐号</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Content">
    <div class="ChinaNet-Free-Body ChinaNet-Free-Width">

        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">帐号详细信息</div>
        </div>

        <div class="Account-Detail-Abstract">
            <div class="Abstract-Account-Data">
                <ul>
                    <li>
                        <div class="SSID-Icon"><img id="acct_avatar" src="${pageContext.request.contextPath}/statics/img/userimg.png" width="54" height="54"></div>
                        <div class="SSID-Data Data-Content-Body">
                            <span class="Data-Name" id="acct_username"></span>
                            <span id="createtime"></span>
                            <span id="lastlogintime"></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="Account-Detail-Status-Body">
            <ul>
                <li class="Account-Detail-Body">
                    <div class="Account-Detail-Data-Body Account-Detail-Left Data-Adorn-Overly">
                        <div class="Overly-Top-Left">&nbsp;</div>
                        <div class="Overly-Top-Right">&nbsp;</div>
                        <div class="Overly-Bottom-Left">&nbsp;</div>
                        <div class="Overly-Bottom-Right">&nbsp;</div>

                        <div class="Account-Detail-Data-Body">
                            <ul>
                                <li>
                                    <div class="ChinaNet-Free-Table">
                                        <table>
                                            <tbody>
                                            <tr class="ChinaNet-Table-Body">
                                                <td class="Table-Name-Td Account-Detail-Tag" colspan="2">&nbsp;</td>
                                            </tr>
                                            <tr class="ChinaNet-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>帐号类型：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_type"></span>
                                                </td>
                                            </tr>
                                            <tr class="ChinaNet-Table-Body">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>姓名：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_fullname"></span>
                                                </td>
                                            </tr>
                                            <tr id="tr_merchantname" class="ChinaNet-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>商户名：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_merchant_name"></span>
                                                </td>
                                            </tr>
                                              <tr id="tr_adminlevel" class="ChinaNet-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>管理员级别：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_level"></span>
                                                </td>
                                            </tr>
                                            <tr id="tr_cellphone" class="ChinaNet-Table-Body">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>手机：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_cellphone"></span>
                                                </td>
                                            </tr>
                                            <tr id="tr_email" class="ChinaNet-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>邮箱：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_email"></span>
                                                </td>
                                            </tr>
                                            <tr id="tr_area" class="ChinaNet-Table-Body">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>所属区域：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_geo_location"></span>
                                                </td>
                                            </tr>
                                            <tr id="tr_tag" class="ChinaNet-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span>分组标签：</span>
                                                </td>
                                                <td  class="Table-Name-Td-Content">
                                                    <span id="acct_tags"></span>
                                                </td>
                                            </tr>
                                            <tr class="ChinaNet-Table-Body">
                                                <td class="Table-Name-Td ChinaNet-Col-2">
                                                    <span> </span>
                                                </td>
                                                <td id="linkforedit">
                                                    <a href="/account/editaccount.htm?accountId=${accountId}" id="editsettingsbutton" class="Account-Settings-Button  initAjax">编辑帐号信息</a>
                                                    
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="Account-Detail-Hard">
                    <div class="Account-Detail-Data-Body Account-Detail-Right">
                        <div class="Connect-Wifi-Online Data-Adorn-Overly">
                            <div class="Overly-Top-Left">&nbsp;</div>
                            <div class="Overly-Top-Right">&nbsp;</div>
                            <div class="Overly-Bottom-Left">&nbsp;</div>
                            <div class="Overly-Bottom-Right">&nbsp;</div>

                            <div class="Account-Detail-Data-Body">
                                <ul>
                                    <li>
                                        <div class="ChinaNet-Free-Table">
                                            <div class="ChinaNet-Free-Table">
                                                <table>
                                                    <tbody >
                                                    <tr class="ChinaNet-Table-Body">
                                                        <td class="Account-Table-Name-Td ChinaNet-Col-8">
                                                            <span>该帐号管理的设备总数：</span>
                                                        </td>
                                                        <td class="Account-Table-Name-Td-Content">
                                                            <span id="account_deviceCount"></span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                        </div>

<!-- 
                        <div class="Account-Hard-Status-Item Data-Adorn-Overly">
                            <div class="Overly-Top-Left">&nbsp;</div>
                            <div class="Overly-Top-Right">&nbsp;</div>
                            <div class="Overly-Bottom-Left">&nbsp;</div>
                            <div class="Overly-Bottom-Right">&nbsp;</div>

                            <div class="Account-Detail-Data-Body">
                                <ul>
                                    <li>
                                        <div class="ChinaNet-Free-Table">
                                            <div class="ChinaNet-Free-Table">
                                                <table>
                                                    <tbody>
                                                    <tr class="ChinaNet-Table-Body">
                                                        <td class="Account-Table-Name-Td ChinaNet-Col-8" colspan="2">    
                                                                                                               
                                                               <div class="Index-Flow-Statis">
                                                                  <div class="Flow-Statis-Chart"></div>
                                                               </div>
                                                               
                                                        </td>
                                                       
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                        </div>
 -->                        
                        <div class="Account-Hard-Status-Item Data-Adorn-Overly" id="sub_account_total">
                            <div class="Overly-Top-Left">&nbsp;</div>
                            <div class="Overly-Top-Right">&nbsp;</div>
                            <div class="Overly-Bottom-Left">&nbsp;</div>
                            <div class="Overly-Bottom-Right">&nbsp;</div>

                            <div class="Account-Detail-Data-Body">
                                <ul>
                                    <li>
                                        <div class="ChinaNet-Free-Table">
                                            <div class="ChinaNet-Free-Table">
                                                <table>
                                                    <tbody>
                                                    <tr class="ChinaNet-Table-Body">
                                                        <td class="Account-Table-Name-Td ChinaNet-Col-8">
                                                            <span>该帐号名下的子帐号总数：</span>
                                                        </td>
                                                        <td class="Account-Table-Name-Td-Content">
                                                            <span id="account_childCountAll">+25365</span>
                                                        </td>
                                                    </tr>
                                                    <tr class="ChinaNet-Table-Body">
                                                        <td class="Account-Table-Name-Td ChinaNet-Col-8">
                                                            <span>其中正常使用状态的子帐号总数：</span>
                                                        </td>
                                                        <td class="Account-Table-Name-Td-Content">
                                                            <span id="account_childCountNormal">+16365</span>
                                                        </td>
                                                    </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </li>


            </ul>
        </div>
        <div class="ChinaNet-Free-Title" id="sublisttitle">
            <div class="Title-Name">直属子帐号信息列表</div>
            <div class="Page-Navigator-Body-right">
            <a href="/account/subaccount.htm?accountId=${accountId}" class="Action-Primary  ChinaNet-Right End-Button initAjax">更多</a>
           </div> 
        </div>
        <div class="ChinaNet-Free-Table" id="sublistbody">
            <table>
                <tr class="Account-Table-Title">                   
                    <th width="300">帐号</th>
                    <th width="200">名称</th>
                    <th width="100">类型</th>
                    <th width="200">所属区域</th>                  
                    <!-- <th width="150">创建时间</th> -->
                </tr>
                <tbody id="subacct_lst">
                       
                </tbody>

            </table>
        </div>
        <div class="ChinaNet-Page-Table" id="subaccountpage">
	      <a id="a_pagination_previous"> <span class="Overly-Left"></span> <span
		      class="Overly-Right"></span> <span>前一页</span>
	      </a> <a href="javascript:;" class="Active"> <span class="Overly-Left"></span>
		  <span class="Overly-Right"></span> <span id="lb_pagenumber">1</span>
	</a> <a id="a_pagination_next"> <span class="Overly-Left"></span> <span
		class="Overly-Right"></span> <span>后一页</span>
	</a>
</div>

        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">帐号操作日志记录</div>
        </div>
        <div class="ChinaNet-Free-Table">
            <table>
                <tr class="Account-Table-Title">
                    <th width="150">操作时间</th>
                   <!-- <th width="150">操作人</th> --> 
                    <th width="300">操作行为</th>
                    <!-- <th>描述</th> -->
                   <!--<th width="100">结果</th>  --> 
                </tr>
                <tbody id="optlog_lst">
               
                </tbody>

            </table>
        </div>
        <div class="ChinaNet-Page-Table" id="optlogpage">
	      <a id="a_log_pagination_previous"> <span class="Overly-Left"></span> <span
		      class="Overly-Right"></span> <span>前一页</span>
	      </a> <a href="javascript:;" class="Active"> <span class="Overly-Left"></span>
		  <span class="Overly-Right"></span> <span id="lb_log_pagenumber">1</span>
	</a> <a id="a_log_pagination_next"> <span class="Overly-Left"></span> <span
		class="Overly-Right"></span> <span>后一页</span>
	</a>
</div>

    </div>
</div>


<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/accountinfo.js"></script>
<script type="text/javascript">var _AccountID='${accountId}';
$(document).ready(function(){
//	alert('111111111111111');
    accountinfoApp.init();
 });
</script>
