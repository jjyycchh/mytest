<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="ChinaNet-Free-Body">
	<div class="ChinaNet-Form-Sheet">
		<div class="Form-Item-Input ChinaNet-Col-4">
			<input id="subaccountkeywords" class="Input-Control" type="text" placeholder="输入关键字">
		</div>
		<!--  
		<div class="ChinaNet-Left ChinaNet-Col-2" style="padding-top:3px">            
                <select id="id_province" name="province"  class='form-control'></select>
                
          </div>
          <div class="ChinaNet-Left ChinaNet-Col-2" style="padding-top:3px">                           
                <select id="id_city" name='city' class='form-control'></select>               
          </div>
          <div class="ChinaNet-Left ChinaNet-Col-2" style="padding-top:3px">                          
                <select id="id_county" name='county' class='form-control'></select>
          </div> -->
          <div id="edit_address_container">
              <div class="Form-Item-Select ChinaNet-Col-2" id="AccountProviceList"><input type="text" id="AccountProvice" name="AccountProvice" placeholder=""></div>
              <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCityList"><input type="text" id="AccountCity" name="AccountCity" placeholder=""></div>
              <div class="Form-Item-Select ChinaNet-Col-2" id="AccountCountyList"><input type="text" id="AccountCounty" name="AccountCounty" placeholder=""></div>
          </div>
		<div class="ChinaNet-Col-2 ChinaNet-Left subaccount-searchbox">
			<button id="btn_search_subaccount" class="Form-Primary">
				<span>查询</span>
			</button>
		</div>
	</div>
	<div class="ChinaNet-Free-Table">
					<table>
						
						<tbody id="subaccountlist_body">
							
						</tbody>
					</table>
	</div>
				<!-- Page Line -->
				<div class="ChinaNet-Page-Table">
					<a id="a_pagination_previous_subaccount">
					   <span class="Overly-Left"></span>
					   <span class="Overly-Right"></span>
					   <span>前一页</span>
					</a> 
					<a href="javascript:;" class="Active"> 
					   <span class="Overly-Left"></span> 
					   <span class="Overly-Right"></span>
					   <span id="lb_pagenumber_subaccount">1</span>
					</a>
					<a id="a_pagination_next_subaccount">
					    <span class="Overly-Left"></span>
					    <span class="Overly-Right"></span>
					    <span>后一页</span>
					</a>
				</div>
</div>



<script type="text/javascript" src="${pageContext.request.contextPath}/resources/merchant/js/subaccountlist.js"></script>
<script type="text/javascript">
var AccountId = null;
	$(document).ready(function(){
		subaccountlistApp.init();           
	 });
</script>