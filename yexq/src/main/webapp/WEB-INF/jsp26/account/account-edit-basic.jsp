<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<link type="text/css" href="${pageContext.request.contextPath}/resources/merchant/css/account.css" rel="stylesheet" media="screen">
<!-- Navigator -->
<div class="Page-Navigator-Body">
    <a href="/account/home2626.htm" class="Home">接入系统管理平台</a>
    <a href="/account/account_management2626.htm" class="initAjax">帐号管理</a>
    <a href="#">帐号配置</a>
</div>
<!-- ./Navigator -->

<div class="ChinaNet-Free-Content">
    <div class="ChinaNet-Free-Body ChinaNet-Free-Width">
        <div class="ChinaNet-Free-Title">
            <div class="Title-Name">配置帐户基本信息</div>
        </div>

        <div class="Account-Detail-Basic-Edit-Body">
            <ul>
                <li class="Account-Basic-Information">
                    <div class="Account-Edit-Data-Body Account-Edit-left">
                        <ul>
                            <li>
                                <div class="ChinaNet-Free-Table">
                                    <table class="ChinaNet-Free-Table">
                                        <tbody>
                                        <tr class="Edit-Table-Body">
                                            <td  class="Table-Name-Photo-Td">
                                                <span>头像图片</span>
                                            </td>
                                        </tr>
                                        <tr class="Edit-Table-Body">
                                            <td class="Table-Name-Photo-Td"><img src="resources/merchant/img/userimgbig.png" id="acct_avatar" height="180" width="180"></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="Account-Basic-Edit-Body">
                    <div class="Account-Edit-Data-Body">
                        <div class="ChinaNet-Form-Sheet">
                            <ul>
                                <li>
                                    <div class="ChinaNet-Free-Table">
                                        <table>
                                            <tbody>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>用户名：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text" class="Input-Control" id="acct_username" name="acct_username" placeholder="输入用户名">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>姓名：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text" class="Input-Control" id="acct_fullname" name="acct_fullname"  placeholder="输入姓名">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>帐号类型：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Select ChinaNet-Col-6">
                                                        <div class="ChinaNet-Left ChinaNet-Col-12">
                                                            <div class="xiSelect-Element-Body">
                                                                <div class="xiSelect-Element-Arrow">
                                                                    <span class="xiSelect-Arrow-Icon"> </span>
                                                                </div>
                                                                <div class="xiSelect-Input-Body select-account-type">
                                                                    <input class="xiSelect-Input-Text" type="text" value="" id="AccountType" name="AccountType" readonly="readonly" style="cursor: pointer;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <!--商户名称：-->
                                            <tr class="Edit-Table-Body ChinaNet-White" id="div_merchant_name">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>商户名称：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text" class="Input-Control" id="acct_merchant_name" placeholder="输入商户名称">
                                                    </div>
                                                </td>
                                            </tr>
                                            <!--管理员级别：-->
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>管理员级别：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Select ChinaNet-Col-6">
                                                        <div class="ChinaNet-Left  ChinaNet-Col-12">
                                                            <div class="xiSelect-Element-Body ChinaNet-Col-12">
                                                                <div class="xiSelect-Element-Arrow">
                                                                    <span class="xiSelect-Arrow-Icon"> </span>
                                                                </div>
                                                                <div class="xiSelect-Input-Body select-account-levl">
                                                                    <input class="xiSelect-Input-Text" type="text" value="" id="acct_admin_geo_lv" name="acct_admin_geo_lv" readonly="readonly" style="cursor: pointer;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>邮箱：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text" class="Input-Control" id="acct_email"  placeholder="输入邮箱">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>手机：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text" class="Input-Control" id="acct_cellphone"   placeholder="输入手机">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>所属区域：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Select ChinaNet-Col-6">
                                                        <div class="ChinaNet-Left ChinaNet-Col-4">
                                                         <select id="acct_geo_province" name="province"  class='form-control'></select>
                                                        <!-- 
                                                            <div class="xiSelect-Element-Body">
                                                                <div class="xiSelect-Element-Arrow">
                                                                    <span class="xiSelect-Arrow-Icon"> </span>
                                                                </div>
                                                                <div class="xiSelect-Input-Body">
                                                                    <input class="xiSelect-Input-Text" type="text" value="" name="DeviceStatus-text" readonly="readonly" style="cursor: pointer;">
                                                                </div>
                                                            </div>
                                                         -->
                                                        </div>
                                                        <div class="ChinaNet-Left ChinaNet-Col-4">
                                                         <select id="acct_geo_city" name='city' class='form-control'></select>
                                                        <!-- 
                                                            <div class="xiSelect-Element-Body">
                                                                <div class="xiSelect-Element-Arrow">
                                                                    <span class="xiSelect-Arrow-Icon"> </span>
                                                                </div>
                                                                <div class="xiSelect-Input-Body">
                                                                    <input class="xiSelect-Input-Text" type="text" value="" name="DeviceStatus-text" readonly="readonly" style="cursor: pointer;">
                                                                </div>
                                                            </div>
                                                        -->
                                                        </div>
                                                       
                                                        <div class="ChinaNet-Left ChinaNet-Col-4">
                                                          <select id="acct_geo_county" name='county' class='form-control'></select>
                                                           <!--  
                                                            <div class="xiSelect-Element-Body">
                                                                <div class="xiSelect-Element-Arrow">
                                                                    <span class="xiSelect-Arrow-Icon"> </span>
                                                                </div>
                                                                <div class="xiSelect-Input-Body">
                                                                    <input class="xiSelect-Input-Text" type="text" value="" name="DeviceStatus-text" readonly="readonly" style="cursor: pointer;">
                                                                </div>
                                                            </div>
                                                        </div>
                                                       --> 
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>&nbsp;</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text"  id="acct_geo_address"  class="Input-Control"  placeholder="输入详细地址">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-3">
                                                    <span>分组标签：</span>
                                                </td>
                                                <td class=" ChinaNet-Col-9 Account-Button-Td">
                                                    <div class="Form-Item-Input ChinaNet-Col-6">
                                                        <input type="text" class="Input-Control" id="acct_tags"  placeholder="输入分组标签">
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="Edit-Table-Body ChinaNet-White">
                                                <td class="Table-Name-Basic-Td ChinaNet-Col-1">
                                                    <span> </span>
                                                </td>
                                                <td colspan="3" class=" Account-Button-Td Account-Button-Td-Padding-Edit">
                                                    <a href="javascript:;" id="acc_edit_opt" class="Account-Save-Button">保存</a>
                                                    <a href="javascript:;" class="Account-Back-Button">返回</a>
                                                    <a href="javascript:;" class="Account-Back-Button">子帐号管理</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li><!--Account-Edit-Body-->
            </ul>
        </div>

    </div>
</div>



























<div id="div_set_subaccount_modal" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog" style="width: 850px">
		<div class="panel panel-primary">
			<div class="panel-heading" style="padding-top: 10px">
				
					
				
				<div class="row">
				    <div class="col-md-2">
						<h4 class="panel-title" style="padding-top:5px;">
							<span class="glyphicon glyphicon-arrow-right"></span>添加子帐号
						</h4>
					</div>
					<div class="col-md-4">
						<div class="col-md-4">
					        <select id="id_province" name="province" class="form-control"></select>
					    </div>
					    <div class="col-md-4">
					        <select id="id_city" name="city" class="form-control"></select>
					    </div>
					    <div class="col-md-4">
					        <select id="id_county" name="county" class="form-control"></select>
					    </div>
					</div>
					
					
					<div class="col-md-5" style="padding-left:0px;">
						<input type="text" id="input_search_subaccount" style="width:330px;" class="form-control" placeholder="关键字">
						
					</div>
					<div class="col-md-1" style="padding-left:0px;">
						
						<input id="btn_search_subaccount" type="button" class="btn btn-default" style="width:50px;height:30px;padding:5px 12px" value="过滤" >
					</div>
					
				</div>
				
				
			</div>
			<div class="panel-body" style="padding-bottom: 0px; max-height: 600px">
				<div class="row">
					<div class="col-md-12">
						<div style="padding-bottom: 0px">
							<!-- BEGIN SAMPLE TABLE PORTLET-->
							<div class="portlet box white" style="margin-bottom: 2px">
								<div id="modaltab" class="portlet-body">
									<table class="table table-hover" style=" margin-bottom: 0px;">
										<thead>
											<tr>
												<th width="5%">操 作</th>
												<th width="10%">帐号</th>
												<th width="10%">名称</th>
												<th width="7%">类型</th>
												<th width="20%">所属区域</th>
												<!-- <th width="20%">分组标签</th> -->
											</tr>
										</thead>
										<tbody id="tbl_subaccount_lst">
										</tbody>
									</table>
								</div>
								<div class="row">
									<div class="col-md-6" style="padding-left: 25px">
										<h6>第 <span class="label label-info" id="lb_subacct_pagenumber"></span> 页</h6>
									</div>
									<div class="col-md-6">
										<div id="div_subacct_pagination" class="col-md-offset-3">
											<ul id="ul_pagination" class="pager">
												<li><a id="a_subacct_pagination_previous"style="cursor: pointer;"> 前一页 </a></li>
												<li><a id="a_subacct_pagination_next" style="cursor: pointer;"> 后一页 </a></li>
											</ul>
										</div>
									</div>
								</div>
							</div><!-- END SAMPLE TABLE PORTLET-->
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer" style="max-height: 80px; margin-top: 0px">
				<button id="btn_set_sub_acct" type="button" class="btn btn-success btn-vote">选定</button>
				<button type="button" class="btn btn-default btn-close" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>




















<div id="direct_sub_account">
<div class="ChinaNet-Free-Title">
    <div class="Title-Name">子帐号信息列表</div>
</div>


<div class="ChinaNet-Free-Table">
    <table>
        <tr class="Account-Table-Title">
            <th width="50">&nbsp;</th>
            <th width="200">帐号</th>
            <th width="200">名称</th>
            <th width="200">类型</th>
            <th width="200">所属区域</th>           
            <th width="200">创建时间</th>
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
            </td>
            <td>
                <span class="Table-Data-Text">2014-08-18 10:00:00</span>
            </td>
        </tr>
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
            </td>
            <td>
                <span class="Table-Data-Text">2014-08-18 10:00:00</span>
            </td>
        </tr>
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
            </td>
            <td>
                <span class="Table-Data-Text">2014-08-18 10:00:00</span>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<div class="ChinaNet-Search-Body">
    <div class="Account-Form-Sheet">

        <div class="ChinaNet-Col-1 ChinaNet-Left">
            <button class="Form-Primary" id="btn_open_sub_acct"><span>添加子帐户</span></button>
        </div>

        <div class="ChinaNet-Col-1 ChinaNet-Left">
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
   
</div>