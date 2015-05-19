/**
 * @param totalRecord 总记录数
 * @param pageNo 当前页码
 * @param pageSize 页显示记录数
 * 
 * @returns 分页HTML
 * */
function apGroupPageCreateHtml(totalRecord,pageNo,pageSize){
	var totalPage = (totalRecord % pageSize) == 0 ? 
			parseInt(totalRecord/pageSize) : parseInt(totalRecord/pageSize) + 1;
	if(totalRecord == 0) 
		pageNo = 0;
	var HtmlContent = "";
	HtmlContent += "共" + totalRecord + "条记录，";
	HtmlContent += "每页" + pageSize + "条&nbsp;";
	HtmlContent += pageNo + "/" + totalPage;
	if(pageNo != 0){
		
		if(pageNo != 1){
			HtmlContent += "<A HREF=\"javascript:goPageApGroup(1)\">【首页】</a>";
			HtmlContent += "<A HREF=\"javascript:goPageApGroup(" + (pageNo - 1) + ")\">【上一页】</a>";
		}
		if(pageNo != totalPage){
			HtmlContent += "<A HREF=\"javascript:goPageApGroup(" + (pageNo + 1) + ")\">【下一页】</a>";
			HtmlContent += "<A HREF=\"javascript:goPageApGroup(" + totalPage + ")\">【尾页】</a>";
		}
	}
	return HtmlContent;
}
function goPageApGroup(i){
	initPageApGroup(i);
	bindAction();
}
//ap组分页生成
function initPageApGroup(i,bindAction){
	var keywords = document.getElementById("keywords").value;
	var province = document.getElementById("SelectDeviceProviceList").value;
	var city = document.getElementById("SelectDeviceCityList").value;
	if(!onCheckMaxLength(keywords,20)) {
		onAlertErrorTip('关键字不能超过20个字符', document.getElementById('keywords'));
		return false;
	}
	$.ajax({
		url:'/device/searchdevicegroup.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{
			keywords:keywords,
			province:province,
			city:city,
			pageNo:i
		},
		success:function(data){
			if(data.result=='OK'){
				//数据
				var evalText = doT.template($("#dataGroupList_template").html());
				$("#data_group_list_div").html(evalText(data));
				//分页
				var htmlText = apGroupPageCreateHtml(data.totalRecord,data.pageNo,data.pageSize);
				$("#page_div").html(htmlText);
			} else {
				alert("数据加载失败!"+data.message);
			}
		}
	});
	//绑定事件初始化
	if(bindAction)
		bindAction();
}
function initgroupdetail(groupId) {
	$.ajax({
		url:'/device/searchgroupinfo.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{
			groupId:groupId
		},
		success:function(data){
			if(data.result=='OK'){
				//Ap组模板doT.js生成
				var apGroupText = doT.template($("#apGroupShow").html());
				$("#data_group_content_div").html(apGroupText(data));
				//Ap组对应设备列表生成
				var evalText = doT.template($("#deviceList").html());
				$("#data_group_show_div").html(evalText(data));
			} else {
				alert("数据加载失败!"+data.message);
			}
		}
	});
}
//获取未分组的ap
function initUnGroupAp(groupId){
	$.ajax({
		url:'/device/searchungroupap.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{
			groupId:groupId
		},
		success:function(data){
			if(data.result=='OK'){
				var apGroupText = doT.template($("#apUnGroup").html());
				$("#apUnGroup_div").html(apGroupText(data));
			} else {
				alert("数据加载失败!"+data.message);
			}
		}
	});
}

//获取未分组的ap修改页面
function initUnGroupAp_edit(groupId){
	$.ajax({
		url:'/device/searchungroupap.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{
			groupId:groupId
		},
		success:function(data){
			if(data.result=='OK'){
				var apGroupText = doT.template($("#apUnGroupLi").html());
				$("#apUnGroup_li").html(apGroupText(data));
			} else {
				alert("数据加载失败!"+data.message);
			}
		}
	});
}

function initgroupdetail_edit(groupId) {
	$.ajax({
		url:'/device/searchgroupinfo.htm',
		type:'GET',
		dataType:'JSON',
		async:false,
		data:{
			groupId:groupId
		},
		success:function(data){
			if(data.result=='OK'){
				//Ap组对应设备列表生成
				var evalText = doT.template($("#apGroupLi").html());
				$("#apGroup_li").html(evalText(data));
				//生成相应的组的信息（名字，城市。。。最关键是城市）
				document.getElementById("SelectDeviceProviceList").value = data.record.province;
				loadCity();
				if(data.record.province)
					$("#SelectDeviceCityList").show();
				document.getElementById("SelectDeviceCityList").value = data.record.city;
				document.getElementById("new_group_name").value = data.record.groupName;
				document.getElementById("new_group_note").value = data.record.note;
			} else {
				alert("数据加载失败!"+data.message);
			}
		}
	});
}

/**
 * 下拉框拷贝，保留已有的
 */
function copySelect(from,to) {
	 var fromObj = document.all[from];
	 var toObj = document.all[to];
	 var hasSelect = false;
	 for (i=0;i<fromObj.options.length;i++){
		var current = fromObj.options[i];
		if (current.selected)
		{
		  hasSelect = true;
		  txt = current.text;
		  val = current.value;
		  toObj.options[toObj.length] = new Option(txt,val);
		  fromObj.options[i] = null;
		  i--;
		}
	 }
	 if (!hasSelect){
		alert ('请先选中');
	 }
}

function selectedAll(itemName,selected){
//  var items = document.all(itemName);
  var items = document.getElementsByName(itemName);
  if(items){
  	 if(items.length){
	    	for(var i=0;i<items.length;i++){
				items[i].checked = selected;
				if(items[i].onchange){
		    		items[i].onchange();
		    	}
			}
	    }else{
	    	items.checked =selected;
	    	if(items.onchange){
	    		items.onchange();
	    	}
	    }
  }
}


//检查是否有重复的选项在，未分配AP组查询后检查已分配AP组的选项
function checkHasRepeat(){
	//将已分配AP组的数据存放入数组中
	var hasArrayJQ = $("#haveRole option");
	var hasArray = new Array();
	for(var i = 0; i < hasArrayJQ.length; i++){
		hasArray.push(hasArrayJQ[i].value);
	}
	//获取未分配AP组的数据
	var unhasArrayJQ = $("#unHaveRole option");
	var unhasArray = new Array();
	for(var i = 0; i < unhasArrayJQ.length; i++){
		unhasArray.push(unhasArrayJQ[i].value);
	}
	
	//这里的效率不怎么高，S(n) = M * N (M,N是 未分配，已分配AP组的数据量)
	for(var i = 0; i < unhasArray.length; i++){
		for(var j = 0; j < hasArray.length; j++){
			//如果存在重复就删除掉
			if(unhasArray[i] == hasArray[j]){
				$("#unHaveRole option[value='" + unhasArray[i] + "']")[0].remove();
				//删除缓存数据，减少遍历成本
//				hasArray.splice(0,j);
				unhasArray.splice(i,1);
				i--;
				break;
			}
		}
	}
}
