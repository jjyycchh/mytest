<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/device.css" rel="stylesheet" media="screen">
	<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home.htm" class="Home">接入系统管理平台</a>
    <a href="/device/devicelist26.htm" class="initAjax">设备管理</a>
	<a href="#">设备信息</a>
    <!-- <a href="/merchant/sites26.htm" class="Action-Button End-Button ChinaNet-Right">返回站点列表</a> -->
    <!-- <a href="/merchant/" class="Action-Primary ChinaNet-Right">用户流量时长管理</a> -->
</div>
<!-- ./Navigator -->
<div class="ChinaNet-Free-Title">
	<div class="Title-Name">设备详细信息</div>
</div>

<!-- <div class="ChinaNet-Prompt-Column Column-Important Data-Adorn-Overly">
	<div class="Overly-Top-Left"></div>
	<div class="Overly-Top-Right"></div>
	<div class="Overly-Bottom-Left"></div>
	<div class="Overly-Bottom-Right"></div>
	当前有新组件版本可以升级，组件版本号为：0.9.1
</div> -->

<div class="Device-Detail-Abstract">
	<div class="Abstract-Device-Name Data-Content-Body">
		<span class="Data-Name" id="spanDevid"></span> <span id="spanMerName"></span>
		<span id="spanaddr"></span>
	</div>
	<div class="Abstract-Device-Data">
		<ul>
			<li>
				<div class="SSID-Icon SSID-Icon-1"></div>
				<div class="SSID-Data Data-Content-Body">
					<span class="Data-Name" id="spandevName"></span> <span
						class="Data-Flow">
						<div class="Data-Flow-Icon Data-Flow-Up"></div>
						<span id="spanupstream"></span>
					</span> <span class="Data-Flow">
						<div class="Data-Flow-Icon Data-Flow-Down"></div>
						<span id="spandownstream"></span>
					</span>
				</div>
			</li>
		</ul>
	</div>
</div>

<div class="Device-Detail-Content-Body">
	<ul>
		<li class="Detail-Content-Data">
			<div class="Device-Detail-Body Data-Adorn-Overly">
				<div class="Overly-Top-Left">&nbsp;</div>
				<div class="Overly-Top-Right">&nbsp;</div>
				<div class="Overly-Bottom-Left">&nbsp;</div>
				<div class="Overly-Bottom-Right">&nbsp;</div>
				<div class="ChinaNet-Free-Table">
					<table>
						<tbody>
							<tr class="ChinaNet-Table-Body">
								<td class="Table-Name-Td Device-Detail-Tag" colspan="4">&nbsp;</td>
							</tr>
							<tr class="ChinaNet-Table-Body ChinaNet-White">
								<td class="Table-Name-Td ChinaNet-Col-2"><span>设备型号</span>
								</td>
								<td id="lb_devType" class="ChinaNet-Col-3"></td>
								<td class="Table-Name-Td ChinaNet-Col-2"><span>所属商户</span>
								</td>
								<td id="lb_devMerName" class="ChinaNet-Col-5"></td>
							</tr>
							<tr class="ChinaNet-Table-Body">
								<td class="Table-Name-Td"><span>设备名称</span></td>
								<td id="lb_devName"></td>
								<td class="Table-Name-Td"><span>地址</span></td>
								<td id="lb_devFAddr"></td>
							</tr>
							<tr class="ChinaNet-Table-Body ChinaNet-White">
								<td class="Table-Name-Td"><span>设备ID</span></td>
								<td id="lb_devID"></td>
								<td class="Table-Name-Td"><span>公网IP地址</span></td>
								<td id="lb_devPubIp"></td>
							</tr>
							<tr class="ChinaNet-Table-Body">
								<td class="Table-Name-Td"><span>SSID</span></td>
								<td id="lb_devSSID"></td>
								<td class="Table-Name-Td"><span>网络连接方式</span></td>
								<td id="lb_devwanprotocol"></td>
							</tr>
							<tr class="ChinaNet-Table-Body ChinaNet-White">
								<td class="Table-Name-Td"><span>MAC地址</span></td>
								<td id="lb_devMac"></td>
								<td class="Table-Name-Td"><span>上行流量</span></td>
								<td id="lb_devUpstream"></td>
							</tr>
							<tr class="ChinaNet-Table-Body">
								<td class="Table-Name-Td"><span>固件版本</span></td>
								<td id="lb_devComversion"></td>
								<td class="Table-Name-Td"><span>下行流量</span></td>
								<td id="lb_devdownstream"></td>
							</tr>
							<tr class="ChinaNet-Table-Body ChinaNet-White">
								<td class="Table-Name-Td"><span>激活时间</span></td>
								<td id="lb_devRegtime"></td>
								<td class="Table-Name-Td"></td>
								<td></td>
							</tr>
							<tr class="ChinaNet-Table-Body">
								<td class="Table-Name-Td"><span>&nbsp;</span></td>
								<td colspan="3"></td>
							</tr>
							<tr class="ChinaNet-Table-Body">
								<%-- <td class="Table-Name-Td"><span>&nbsp;</span></td> --%>
								<td colspan="4"><a href="javascript:;"
									id="Device-Settings-Done" class="Device-Settings-Button"
									data-device-id="">编辑和配置该设备信息</a> <a href="javascript:;"
									id="Device-Settings-Sync" class="Device-Settings-Button"
									data-device-id="">同步配置到同类设备</a> 
									<s:if test="#session.login_account_info.type != 'REPRESENTATIVE' &&
											#session.login_account_info.type != 'MERCHANT'">
										<a href="javascript:;"
									id="Device-Settings-Transfer" class="Device-Settings-Button"
									data-device-id="">过户到商户</a> 
									</s:if>
									<a href="javascript:;"
									id="Device-Settings-RestartDevice"
									class="Device-Settings-Restart" data-device-id="">重启设备</a> <a
									href="javascript:;" id="Device-Settings-RestartPortal"
									class="Device-Settings-Restart" data-device-id="">重启Portal</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</li>
		<li class="Detail-Content-Hard">
			<div class="Device-Detail-Body">
				<!-- Statis Online Guest-->
				<div class="Connect-Wifi-Online Data-Adorn-Overly">
					<div class="Overly-Top-Left">&nbsp;</div>
					<div class="Overly-Top-Right">&nbsp;</div>
					<div class="Overly-Bottom-Left">&nbsp;</div>
					<div class="Overly-Bottom-Right">&nbsp;</div>
					<ul>
						<li>
							<div class="Connect-Statis-Number">
								<span>当前在线人数</span> <span id="span_curUserCount"
									class="Statis-Number"></span>
							</div>
						</li>
						<li>
							<div class="Connect-Statis-Number">
								<span>历史在线人数</span> <span id="span_allUserCount"
									class="Statis-Number"></span>
							</div>
						</li>
					</ul>
				</div>
				<!-- ./Statis Online Guest -->

				<!-- CPU Chart -->
				<div class="Device-Hard-Load-Body Data-Adorn-Overly">
					<div class="Overly-Top-Left">&nbsp;</div>
					<div class="Overly-Top-Right">&nbsp;</div>
					<div class="Overly-Bottom-Left">&nbsp;</div>
					<div class="Overly-Bottom-Right">&nbsp;</div>

					<div class="Hard-Load-Chart">
						<div class="Device-Hard-Load-Chart Device-Hard-Chart-CPU"></div>
					</div>

					<div class="Hard-Load-Text">
						<table>
							<tr>
								<td><span>CPU品牌</span> <span id="cpuBrand" class="Load-Value"></span>
								</td>
								<td><span>CPU型号</span> <span id="cpuModel" class="Load-Value"></span>
								</td>
							</tr>
							<tr>
								<td><span>最大超频</span> <span id="maxTurboFrequency" class="Load-Value"></span>
								</td>
								<td><span>CPU占用</span> <span id="sysLoad" class="Load-Alert"></span>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<!--./CPU Chart -->

				<!-- Memory Chart -->
				<div class="Device-Hard-Load-Body Data-Adorn-Overly">
					<div class="Overly-Top-Left">&nbsp;</div>
					<div class="Overly-Top-Right">&nbsp;</div>
					<div class="Overly-Bottom-Left">&nbsp;</div>
					<div class="Overly-Bottom-Right">&nbsp;</div>

					<div class="Hard-Load-Chart">
						<div class="Device-Hard-Load-Chart Device-Hard-Chart-Memory"></div>
					</div>

					<div class="Hard-Load-Text">
						<table>
							<tr>
								<td><span>最大容量</span> <span id="totalMem" class="Load-Value"></span>
								</td>
								<td><span>空闲内存</span> <span id="sysMemfree" class="Load-Value"></span>
								</td>
							</tr>
							<tr>
								<td><span></span> <span class="Load-Value"></span>
								</td>
								<td></td>
							</tr>
						</table>
					</div>
				</div>
				<!--./Memory Chart -->

			</div>
		</li>
	</ul>
</div>


<!-- Data Content Tab -->
<div class="Data-Content-Tab">
	<!--<ul>
            <li>
                <a href="javascript:;" class="Active Data-Adorn-Overly">
                    <span class="Overly-Top-Left"></span>
                    <span class="Overly-Top-Right"></span>

                    <span class="Tab-Data-Name">设备用户激活记录</span>
                    <span>13605718840</span>
                    <span>2014-02-23 23:18:22</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" class="Data-Adorn-Overly">
                    <span class="Overly-Top-Left"></span>
                    <span class="Overly-Top-Right"></span>
                    <span class="Tab-Data-Name">设备流量示图表</span>
                    <span>233GB</span>
                    <span>1231GB</span>
                </a>
            </li>
        </ul>-->

	<!-- Tab Content Body One -->
	<div class="Tab-Data-Content-Body">
		<div id="userstab" class="ChinaNet-Free-Table">
			<table>
				<tr class="ChinaNet-Table-Subject">
					<td colspan="7"></td>
				</tr>
				<tr class="ChinaNet-Table-Title">

					<th width="25%">用户</th>
					<!-- <th width="13%">商户</th> -->
					<th width="25%">登录设备</th>
					<th width="15%">MAC</th>
					<th width="15%">登录时间</th>
					
					<th width="9%">状态</th>
					<th width="8%">流量</th>
					<!--  <th width="7%" class="text-center">操作</th>  -->

				</tr>
				<tbody id="tbl_user_lst">

				</tbody>
			</table>
		</div>
		<!-- Page Line -->
		<div class="ChinaNet-Page-Table">
			<a id="a_pagination_previous_useron"> 
				<span class="Overly-Left"></span>
				<span class="Overly-Right"></span> 
				<span>前一页</span>
			</a> 
			<a href="javascript:;" class="Active"> 
				<span class="Overly-Left"></span> 
				<span class="Overly-Right"></span> 
				<span id="lb_pagenumber_useron">0</span>
			</a> 
			<a id="a_pagination_next_useron"> 
				<span class="Overly-Left"></span> 
				<span class="Overly-Right"></span> 
				<span>后一页</span>
			</a>
		</div>
		<!-- Page Line -->
	</div>
	<!-- ./Tab Content Body On -->
	<!-- Tab Content Body Two -->
	<div class="Tab-Data-Content-Body"></div>
	<!-- ./Tab Content Body Two -->
</div>
<!-- Data Content Tab -->
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/deviceinfo.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		if(__DATA_PUBLIC_KEY != null)
			deviceinfoApp.init();
            //deviceApp.init();
	 });
</script>