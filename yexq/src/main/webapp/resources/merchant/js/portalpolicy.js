/**
 * Created by wj on 2014/8/13.
 */

var policySearchHandler = null;
policySearchHandler = new searchUtil(generatePortalListHtml, searchFailCallBack, searchErrorCallBack, null, onShowPolicyData,
        "pp_list_tbr", "lb_pagenumber", "a_pagination_previous", "a_pagination_next", 
        "/merchant/searchportalpolicies.htm","");
var portalpolicyApp = function(){
    var search_policy_keyword = null;
    var policy_status = "";    
    var keywordsSearch = function() {
        /*policy_status = $("#PolicyStatus").val();
        policySearchHandler.setSearchParemeter('status', policy_status);*/
        $("div.ChinaNet-Page-Table").show();
        policySearchHandler.clearResultSetpageNo();
        var keywords = policySearchHandler.convertKeywordsSearchable($("#keywords").val());
        policySearchHandler.setSearchParemeter('keywords', keywords);
        policySearchHandler.setSearchParemeter('startdate', $("#startdate").val());
        policySearchHandler.setSearchParemeter('enddate', addoneday($("#enddate").val()));
        //policySearchHandler.searchWithPreload();    
        if(onCheckLength(keywords)){
            policySearchHandler.searchWithPreload();
        }
        else{
            onAlertError('您输入的关键字太多，请重新输入');
        }
    }
    
    var onsearchpolicy = function(){
        $("#btn_search_policy").click(function() {
            keywordsSearch();
        });
    }
    
    var initDatepicker = function(){
        var startDateTextBox = $('#startdate');
        var endDateTextBox = $('#enddate');
        startDateTextBox.datepicker({
            regional:"zh-CN",
            dateFormat: "yy-mm-dd",
            onClose: function(dateText, inst) {
                if (endDateTextBox.val() != '') {
                    var testStartDate = startDateTextBox.datetimepicker('getDate');
                    var testEndDate = endDateTextBox.datetimepicker('getDate');
                    if (testStartDate > testEndDate)
                        endDateTextBox.datetimepicker('setDate', testStartDate);
                }
                else {
                    endDateTextBox.val(dateText);
                }
            },
            onSelect: function (selectedDateTime){
                endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate') );
            }
        });
        
        endDateTextBox.datepicker({
            regional:"zh-CN",
            dateFormat: "yy-mm-dd",
            onClose: function(dateText, inst) {
                if (startDateTextBox.val() != '') {
                    var testStartDate = startDateTextBox.datetimepicker('getDate');
                    var testEndDate = endDateTextBox.datetimepicker('getDate');
                    if (testStartDate > testEndDate)
                        startDateTextBox.datetimepicker('setDate', testEndDate);
                }
                else {
                    startDateTextBox.val(dateText);
                }
            },
            onSelect: function (selectedDateTime){
                startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
            }
        });
        $("div.ui-datepicker").hide();
    }

    // load sub account list
    /**
     * 显示子帐号下拉框
     *
     */
    var initSelectAccount = function(){
        var owner = getSiteOwner();
        $('#AccountID').xiSelect({
            offsetSize:[0,3,0,3],
            height:320,
            width:500,
            ajaxData:function(){
                return '<div class="ChinaNet-Free-Body">' +
                    '       <div class="Select-SubAccount-Search"></div>' +
                    '       <div class="Select-SubAccount-Body"></div>' +
                    '       <div class="Select-SubAccount-Page"></div>' +
                    '</div>' +
                    '<input type="hidden" id="AccountPage" value="1">' +
                    '<script type="text/javascript">getSelectAccountList();</script>'
            },
            skinClass:'Portal-Site-Editor-Account',
            disabled:((__CONTEXT_MERCHANT_CODE=='SUPER_MAN'||__CONTEXT_MERCHANT_CODE=='MERCHANT')?true:false),
            defaultData:{value:owner.id,text:owner.name}
        });
    }

    return {init:function(){        
        policySearchHandler.searchWithPreload();    
        $("#keywords").keypress(function(e) {
            if(e.which == 13) {
                keywordsSearch();
                return false;
            }
        });
        onsearchpolicy();    
        //initpolicySelect(); 
        initDatepicker();
    }}
}();

function onShowPolicyData(){
    $('div.ChinaNet-Settings-Button a').each(function(x){
        var id = $(this).attr('data-public-params');
        var status = $(this).attr('data-status');        
            $(this).attr('id', id);
            $('a#'+id).xiMenu({
            menuItem:[
                {url:'/merchant/editportalpolicy26.htm?policyId='+id,className:'initAjax',text:'编辑'},
                {url:'javascript:DelPolicy(\'' + id + '\');',text:'删除'}
            ],
            skinClass:'public-Settings-MenuForXiMenu',
            activeClass:'Open',
            align:'right',
            paramAttr:['data-status','data-public-params']
        });
    });
}
function DelPolicy(policyid){
    onConfirmDialog('<p>您确定删除该推送策略吗？</p><p>删除后将不能恢复！</p>',function(){DelPolicyOk(policyid)},function(){});
    
}
function DelPolicyOk(policyid){
    $.ajax({
        type : 'POST',
        dataType : 'json',
        url : '/merchant/policydelete.htm',
        data : {
            'policyid' : policyid,
            'type' : ''
        },
        success : function(data) {
            if (data.result != 'FAIL') {
                //onAlertError("策略删除成功!","ok");
                policySearchHandler.refreshCurrentPage();
            } else {
                onAlertError("策略删除失败!");
            }
        },
        error : function() {
            onAlertError("策略删除失败!");
        }
    });
}

function generatePortalListHtml(ppList) {
    var ppListHtml = "";
      
    if (typeof ppList!='undefined'&&ppList!=null&&ppList.length>0) {
        for ( var i = 0; i < ppList.length; i++) {
            var policyid = ppList[i].policyid; 
            var policyname = ppList[i].name;
            var location = ppList[i].location;
            var updatetime = '';
            var status  = ppList[i].status;
            //var editor = isNotEmptyString(ppList[i].editor)?ppList[i].editor:"";
            //var editorusername = (typeof ppList[i].editorusername!='undefined')?ppList[i].editorusername:"";
            var deviceids = (ppList[i].deviceids)?JSON.parse(ppList[i].deviceids):[];
            var displayitems = (ppList[i].displayitems)?JSON.parse(ppList[i].displayitems):[];
            
            var editor = ppList[i].editor;
            var editorusername = ppList[i].editorusername;
            var username = ppList[i].username;
            var fullname = ppList[i].fullname;
            var merchantname = ppList[i].merchantname;

            updatetime  = ppList[i].updatetime == undefined || ppList[i].updatetime == null ? "":ppList[i].updatetime.replace('T', ' ');    
            ppListHtml += "<tr  class='ChinaNet-Table-Body'>";
            ppListHtml += "    <td><a href='/merchant/editportalpolicy26.htm?policyId="+policyid+"' data-public-params='"+policyid+"' class='initAjax Table-Data-Name-Link'>"
                       +"<div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 20em;' title='"+policyname+"'>"
                       +policyname+"</div>"+"</a>";
            ppListHtml += "    <span class='Table-Data-Text'>"+updatetime+"</span></td>";
            ppListHtml += "    <td><span class='Table-Data-Name'>"+displayitems.length+"</span></td>";
            ppListHtml += "    <td><span class='Table-Data-Name'>"+editorusername+"</span><span class='Table-Data-Text'>"+editor+"</span></td>";                            
            ppListHtml += "    <td><span class='Table-Data-Name'>"+username+"</span><span class='Table-Data-Text'>"+fullname+"</span></td>";                            
            ppListHtml += "    <td><span class='Table-Data-Text-Two'>"+deviceids.length+"</span></td>";
            ppListHtml += "    <td class='Table-Data-Name'>" + statusPPSpan(status) + "</td>";                            
            ppListHtml += "<td class='ChinaNet-Form-Sheet Width-For-Button'>";
            ppListHtml += "<button class='Form-Primary' onclick='DelPolicy(\"" + policyid +"\");'><span>删除</span></button>";
            ppListHtml += "</td>";
            ppListHtml += "</tr>";
        }
    }
    else{
        $(".ChinaNet-Page-Table").hide();
    }
    return ppListHtml;
}
function statusPPSpan(status)
{
    var statusHtml="";
    if(status != null){
        if (status == "LOCKED") {
            statusHtml += "<span class='Table-Data-Status-Photo Table-Flow-Locked'></span>";
        }            
        else{
            statusHtml += "<span class='Table-Data-Status-Photo Table-Flow-Unlocked'></span>";
        }
    }
    return statusHtml;
}

function searchFailCallBack(data, message) {
    onAlertError('加载策略数据请求提交失败！');
    return false;
}
        
function searchErrorCallBack(data, message) {
    onAlertError('加载策略数据请求提交失败！');
    return false;
}