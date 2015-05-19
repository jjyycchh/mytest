<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/portal.css" rel="stylesheet" media="screen">
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/portalpolicy.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/merchant/portalpolicies26.htm" class="initAjax">WIFI推送策略管理</a>
    <a href="#">策略详细信息</a>

    <a href="/merchant/portalpolicies26.htm" class="Action-Primary ChinaNet-Right End-Button initAjax">返回策略列表</a>
    <a href="/merchant/addportalpolicy26.htm" class="Action-Primary ChinaNet-Right initAjax">添加新策略</a>
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Menu-Left">
    <a href="/merchant/sites26.htm" id="sites" class="initAjax"><span>Portal设置</span></a>
    <a href="/merchant/portalpolicies26.htm" id="portalpolicies" class="initAjax Active"><span>广告推送</span></a>
</div>

<div class="ChinaNet-Free-Body-Right">
    <div class="Right-Body-Main">


        <div class="Policy-Form-Editor-Body Data-Adorn-Overly">
            <div class="Overly-Top-Left"></div>
            <div class="Overly-Top-Right"></div>

            <div class="Policy-Editor-Plan-Body">
                <div class="Policy-Data-Body">
                    <div class="Policy-Data-Title" id="PolicyDataTitle"></div>
                    <div class="Policy-Data-Info" id="PolicyDataInfoSite"></div>
                    <div class="Policy-Data-Info" id="PolicyDataInfoDevice"></div>
                    <a href="javascript:;" class="Edit-Icon" title="编辑策略" id="PolicyBaseEdit">&nbsp;</a>
                    <a href="/merchant/editportalpolicy26.htm?policyId=${policyId}" title="刷新策略" class="Refresh-Icon initAjax">&nbsp;</a>
                </div>
                <div class="Policy-Data-Plan-Body">
                    <table>
                        <tr class="Policy-Plan-Header">
                            <th class="Policy-Plan-Site-Title"><span>站点信息</span></th>
                            <th class="Policy-Plan-Edit-NO"><span>优先</span></th>
                            <th>00</th>
                            <th>01</th>
                            <th>02</th>
                            <th>03</th>
                            <th>04</th>
                            <th>05</th>
                            <th>06</th>
                            <th>07</th>
                            <th>08</th>
                            <th>09</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                            <th>17</th>
                            <th>18</th>
                            <th>19</th>
                            <th>20</th>
                            <th>21</th>
                            <th>22</th>
                            <th>23</th>
                        </tr>
                        <tbody class="Policy-Plan-Item-List">
                            <tr>
                                <td class="Item-Site-Opera"></td>
                                <td class="Item-No"><span>#01</span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                            </tr>
                            <tr>
                                <td class="Item-Site-Opera"></td>
                                <td class="Item-No"><span>#02</span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                            </tr>
                            <tr>
                                <td class="Item-Site-Opera"></td>
                                <td class="Item-No"><span>#03</span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Normal"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                                <td class="Item-Disabled"><span></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="ChinaNet-Form-Sheet Policy-Time-Line-Add">
                    <button type="button" class="Form-Primary" id="PolicyItemAdd"><span>添加策略时间计划</span></button>
                    <button type="button" class="Form-Important" id="PolicyItemSaveButton"><span>保存当前编辑信息</span></button>
                </div>
            </div>

            <div class="Policy-Editor-Base-Body">
                <div class="Policy-Data-Body">
                    <div class="Policy-Data-Title" id="PolicyDataTitle"></div>
                    <div class="Policy-Data-Info" id="PolicyDataInfoSite"></div>
                    <div class="Policy-Data-Info" id="PolicyDataInfoDevice"></div>
                    <a href="/merchant/editportalpolicy26.htm?policyId=${policyId}" class="Refresh-Icon initAjax">&nbsp;</a>
                </div>
                <form action="" id="SavePolicyBaseForm" method="POST">
                    <div class="ChinaNet-Form-Sheet">
                        <label class="ChinaNet-Col-12 Form-Item-Title">&nbsp;</label>
                    </div>
                    <div class="ChinaNet-Form-Sheet">
                        <label class="Form-Item-Title ChinaNet-Col-2">策略标题</label>
                        <div class="Form-Item-Input ChinaNet-Col-6"><input id="portalPolicyNameInput" type="text" class="Input-Control"  placeholder="输入策略标题"></div>
                    </div>
                    <div class="ChinaNet-Form-Sheet">
                        <label class="Form-Item-Title ChinaNet-Col-2">商户</label>
                        <div class="Form-Item-Select ChinaNet-Col-6"><input type="text" id="PolicyAccountID"></div>
                    </div>
                    <div class="ChinaNet-Form-Sheet">
                        <label class="Form-Item-Title ChinaNet-Col-2">策略设备列表</label>
                        <div class="ChinaNet-Left ChinaNet-Col-6">
                            <div class="Portal-Policy-Devices-List">
                                <div class="Devices-List-Header"><div>&nbsp;</div></div>
                                <div class="Devices-List-Body">
                                    <div class="Devices-List-Item-Body" id="portalPolicyDeviceArea">

                                        <a href="javascript:;" class="Add-Device">
                                            <span>&nbsp;</span>
                                            添加设备
                                        </a>
                                    </div>
                                </div>
                                <div class="Devices-List-Bottom"><div>&nbsp;</div></div>
                            </div>
                        </div>
                    </div>
                    <div class="ChinaNet-Form-Sheet">
                        <label class="Form-Item-Title ChinaNet-Col-2">&nbsp;</label>
                        <div class="ChinaNet-Left ChinaNet-Col-6">
                            <button type="submit" class="Form-Primary Submit-Button"><span>保存策略</span></button>
                            <button type="button" class="Form-Default Cancel-Button" id="CancelEditPolicyButton"><span>取消编辑</span></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/merchant/portalpolicyedit.js"></script>
<script type="text/javascript">var _PolicyID='${policyId}';var _isEdit = true;
	$(document).ready(function() {
		//portalpolicyeditApp.editInit("${sessionScope.login_account_info.id}", "${policyId}", '${sessionScope.login_account_info.type}');
        policyApp.edit();
	});
</script>
