<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ChinaNet-Free-Body">
    <div class="ChinaNet-Form-Sheet">
        <div class="Form-Item-Input ChinaNet-Col-3">
            <input id="merchantKeywords" class="Input-Control" type="text"
                placeholder="输入关键字">
        </div>
        <!-- <div class="ChinaNet-Left ChinaNet-Col-3">
            <input type="text" id="DeviceStatussyn" name="DeviceStatussyn">
        </div> -->
        <div class="ChinaNet-Col-2 ChinaNet-Left">
            <button id="btn_search_merchant" class="Form-Primary">
                <span>查询</span>
            </button>
        </div>
    </div>
    <div class="ChinaNet-Free-Table">
        <table>
            <tr class="ChinaNet-Table-Title">
              <th width="24%">用户名</th>
              <th width="70%">商户名</th>
              <th></th>
            </tr>
            <tbody id="merchant_list_body">
            </tbody>
        </table>
    </div>
    <!-- Page Line -->
    <div class="ChinaNet-Page-Table">
        <a id="a_pagination_previous_merchant"> 
            <span class="Overly-Left"></span>
            <span class="Overly-Right"></span> 
            <span>前一页</span>
        </a> 
        <a href="javascript:;" class="Active"> 
            <span class="Overly-Left"></span> 
            <span class="Overly-Right"></span> 
            <span id="lb_pagenumber_merchant">0</span>
        </a> 
        <a id="a_pagination_next_merchant"> 
            <span class="Overly-Left"></span> 
            <span class="Overly-Right"></span> 
            <span>后一页</span>
        </a>
    </div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/statics/js/devicemerchantlist.js"></script>
<script type="text/javascript">
	var _DeviceID='${deviceId}';
    $(document).ready(function(){
        devicemerchantlistApp.init();
     });
</script>