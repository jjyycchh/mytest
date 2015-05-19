<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="ChinaNet-Search-Body">
	<div class="ChinaNet-Form-Sheet">
        <div class="Form-Item-Select  ChinaNet-Col-2" style="overflow: hidden;">
            <input type="text" id="interfaceType" name="interfaceType">
        </div>
		<div class="Form-Item-Input ChinaNet-Col-2">
			<input type="text" class="Input-Control"  name="ChoiceStartDate" id="ChoiceStartDate" readonly="readonly" placeholder="选择起始日期" value="" />
		</div>
		<div class="Form-Item-Input ChinaNet-Col-2">
			<input type="text" class="Input-Control"  name="ChoiceEndDate" id="ChoiceEndDate" readonly="readonly" placeholder="选择结束日期" value="" />
		</div>
        <div id="periodUnitLabel" class="Form-Item-Label">
            统计颗粒度：
        </div>
        <div class="Form-Item-Select ChinaNet-Col-1" style="overflow: hidden;">
            <input type="text" id="periodUnit" name="periodUnit">
        </div>
        <div class="ChinaNet-Col-2 ChinaNet-Left">
            <button id="btn_query_userstati" class="Form-Primary"><span>查询</span></button>
        </div>
        <%--
        <div class="Form-Item-Input ChinaNet-Col-2">
            <input type="text" class="Input-Control"  name="ChoiceDate" id="ChoiceDate" readonly="readonly" placeholder="选择日期" value="" />
        </div>
		<div id="divmerlist" class="Form-Item-Select  ChinaNet-Col-3">
			<input type="text" id="merchantList" name="merchantList">
		</div>
		<div id="divdevlist" class="Form-Item-Select  ChinaNet-Col-3">
			<input type="text" id="deviceList" name="deviceList">			
		</div>
		<div class="ChinaNet-Col-2 ChinaNet-Left">
            <button id="btn_search_userstati" class="Form-Primary"><span>查询</span></button>
        </div>
         --%>
	</div>
</div>

<div class="Statis-Chart-Body">

</div>
<%--
<div class="Statis-User-Title">
	<ul>
		<li>
			<div class="ChinaNet-Free-Title">
				<div class="Title-Name">24小时新老用户访问对比</div>
			</div>
		</li>
	</ul>
</div>

<div class="Statis-User-Body">
	<ul>
		<li class="Statistic-User-Photo">
			<div class="Statistic-User-Data-Body">				
				<div id="Statistic-User-Body" class="StatisticUserImage"></div>
			</div>
		</li>
		<li class="Statistic-User-Body">
			<div class="Statistic-User-Data-Body">
				<div class="StatisticList-Data">
					<ul>
						<li class="StatisticList-Data">
							<div class="ChinaNet-Free-Table">
								<table>
									<tr class="Statis-User-Table-Title">
										<th>&nbsp;</th>
										<th width="130">人数</th>
										<th width="130">相比24小时前</th>
										<th width="200">停留时间</th>
										<th width="200">相比24小时前</th>
									</tr>
									<tbody id="UserDetail_body">

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

<div class="Statis-User-Three-Body">
	<ul>
		<li class="Statis-User-Three-Body-One">
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
		<li class="Statis-User-Three-Body-One">
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
		<li class="Statis-User-Three-Body-One">
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
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/highslide/highslide-full.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/merchant/js/highslide/highslide.css" /> --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/userstatis.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        userstatisApp.init();
        var d = new Date();
        /*
        $("#ChoiceDate").datepicker({
        	regional:"zh-CN",
			dateFormat: "yy-mm-dd"
        });
        $("#ChoiceDate").datepicker('setDate', d);
        */
        $("#ChoiceStartDate").datepicker({
            regional:"zh-CN",
            dateFormat: "yy-mm-dd",
            //defaultDate: 0,
            maxDate: 0
        });
        $("#ChoiceStartDate").datepicker('setDate', (new Date(d - 1000*60*60*24)));
        $("#ChoiceEndDate").datepicker({
        	regional:"zh-CN",
			dateFormat: "yy-mm-dd",
            maxDate: 0
        });
        $("#ChoiceEndDate").datepicker('setDate', d);
        $("div.ui-datepicker").hide();
        $("#ChoiceStartDate").parent().hide();
        $("#ChoiceEndDate").parent().hide();
        $("#periodUnitLabel").hide();
        /* hs.graphicsDir = '${pageContext.request.contextPath}/resources/merchant/js/highslide/graphics/';
        hs.outlineType = 'rounded-white';
        hs.wrapperClassName = 'draggable-header';
        hs.captionEval = 'this.a.title';
        hs.showCredits = false;
        hs.marginTop = 20;
        hs.marginRight = 20;
        hs.marginBottom = 20;
        hs.marginLeft = 20; */
    });
</script>

