<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="ChinaNet-Search-Body">
	<div class="ChinaNet-Form-Sheet">
		<div class="Form-Item-Input ChinaNet-Col-2">
			<input type="text" class="Input-Control" name="ChoiceDate"
				id="ChoiceDate" readonly="readonly" placeholder="选择日期" value="" />
		</div>
		<div id="divmerlist" class="Form-Item-Select  ChinaNet-Col-3">
			<input type="text" id="merchantList" name="merchantList">
		</div>
		<div id="divdevlist" class="Form-Item-Select  ChinaNet-Col-3">
			<input type="text" id="deviceList" name="deviceList">
		</div>
		<div class="ChinaNet-Col-2 ChinaNet-Left">
			<button id="btn_search_portalstati" class="Form-Primary">
				<span>查询</span>
			</button>
		</div>
	</div>
</div>

<div class="Statis-Body">
	<div class="Statis-Body-Guest"></div>
</div>
<div class="Statistic-List">
	<ul>
		<li class="Statistic-Photo">
			<div class="Statistic-Data-Body">
				<div class="Statistic-Data-Body-Title">WiFi门户饼图（前五）</div>
				<div id="Statistic-Body" class="StatisticImage"></div>
			</div>
		</li>
		<li class="Statistic-Body">
			<div class="Statistic-Data-Body">
				<div class="Statistic-Data-Body-Title">推送站点统计排行（前五）</div>
				<div class="StatisticList-Data">
					<ul>
						<li class="StatisticList-Data">
							<div class="ChinaNet-Free-Table">
								<table>
									<tr class="Statis-Wifi-Table-Title">
										<th>WiFi站点</th>
										<th width="100">推送次数</th>
										<!-- <th width="80">认证次数</th>
										<th width="80">认证率</th> -->
										<th width="120">推送策略总数</th>
										<!-- <th width="100">推送策略比例</th> -->
									</tr>
									<tbody id="tb_sitePushRanking">
										<%-- <tr class="ChinaNet-Table-Body-High">
											<td><span class="Table-Data-Text-Link">商户aaa</span>
											</td>
											<td><span class="Table-Data-Text">100</span></td>
											<td><span class="Table-Data-Text">90</span></td>
											<td><span class="Table-Data-Text-Blod">75%</span></td>
											<td><span class="Table-Data-Text">1200</span></td>
											<td><span class="Table-Data-Text-Blod">90%</span></td>
										</tr> --%>
									</tbody>
								</table>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</li>
	</ul>
</div>


<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/portalsstatis.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        portalsstatisApp.init();
        $("#ChoiceDate").datepicker({
        	regional:"zh-CN",
        	/* showOn: "button",
        	buttonImage: "./css/images/icon_calendar.gif",
			buttonImageOnly: true, */
			dateFormat: "yy-mm-dd"
        });
        $("div.ui-datepicker").hide();
        $("#ChoiceDate").datepicker('setDate', (new Date()));
    });
</script>