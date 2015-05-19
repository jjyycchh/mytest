var sites=[];
var thirdpartmgmtApp = function(){
	
	var searchthirdpart = function(){	
		showLoading();
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : '/system/thirdpartinfos.htm',
			data : {},
			success : function(data) {
				if (data.result != 'FAIL' && data.thirdparts != null) {
					$("#thirdpartlist_body").html(generateThirdPartsHtml(data.thirdparts));					
				} else {
					closeLoading();
					onAlertError(data.message);
					return false;
				}
				closeLoading();
			},
			error : function(data) {
				closeLoading();
				onAlertError(data.message);
				return false;
			}
		});
	}
	
	var generateThirdPartsHtml = function(thirdParts) {
		var thirdPartsLstHtml = "";		
		if (thirdParts != null && thirdParts.length > 0) {
			for (var i = 0; i < thirdParts.length; i++) {
				var third_part_id = thirdParts[i].id;
				var business_name = thirdParts[i].name;
				var virtual_device_id = thirdParts[i].vdeviceid;
				var site_id = thirdParts[i].siteid;
				var status = thirdParts[i].status;
				var create_datetime = thirdParts[i].createdatetime;	
				var siteid = thirdParts[i].siteid;
				var thirdPartsItemHtml = "";				
				thirdPartsItemHtml += "<tr class='ChinaNet-Table-Body'>";
				thirdPartsItemHtml += 	"<td><span class='Table-Data-Name'>" + business_name + "</span></td>";
				thirdPartsItemHtml += 	"<td><span class='Table-Data-Name'>" + virtual_device_id + "</span></td>";
				thirdPartsItemHtml += 	"<td><span class='Table-Data-Name'>" + generateSiteName(siteid) + "</span></td>";
				thirdPartsItemHtml += 	"<td><span class='Table-Data-Name' id='status_" + third_part_id + "'>" + THIRD_PART_ACCESS_STATUS.convertStatusToCn(status) + "</span></td>";
				thirdPartsItemHtml += 	"<td class='ChinaNet-Form-Sheet Width-For-Button' id='lock_" + third_part_id + "'>";
				thirdPartsItemHtml += 		generateLockBtn(third_part_id, status);
				thirdPartsItemHtml += 	"</td>";
				thirdPartsItemHtml += "</tr>";
				
				thirdPartsLstHtml += thirdPartsItemHtml;
			}
		}		
		return thirdPartsLstHtml;
	}
	
	var initPortalSelect = function(){		
		$.ajax({
			url:'/merchant/thirdpartsites.htm',
			type:'GET',
			dataType:'json',
			async:false,
			success:function(data){
				if(data.result=='OK'){
					sites = data.records;
					
					var jsonObj2={DefaultSites:[]};
					var DefaultSites=jsonObj2.DefaultSites; 
					for(i=0;i<data.records.length;i++){
						jsonObj2.DefaultSites.push({value:data.records[i].id,text:data.records[i].name});
					}					
					$('#ThirdPartSites').xiSelect({offsetSize:[0,3,0,3],data:DefaultSites});
				}
			}
		});
		    	
    }
	
	function generateSiteName(siteid){
		if(siteid !=""){			
			for(var i =0;i<sites.length;i++){				
				if(siteid == sites[i].id){
					
					return sites[i].name;
				}
					
			}
		}
		
	}
	
	var onAddDevice = function(){
		
		$("#btn_Add_device").click(function() {
			var siteId = $('input#ThirdPartSites').val();
			var siteName = $("#new_name").val();
			if(!onCheckEmpty(siteName)){
				onAlertErrorTip('第三方接入名称为必填项', document.getElementById('new_name'));
	            return false;
			}
			if(!onCheckEmpty(siteId)){
				onAlertErrorTip('站点为必选项', document.getElementById('divsite'));
	            return false;
			}
			if(!onCheckLength(siteName)){
				onAlertErrorTip('您输入的字数太多，请重新输入', document.getElementById('new_name'));
	            return false;
			}
			$.ajax({
                type: 'POST',
                dataType: 'json',
                url:'/system/addthirdpartaccess.htm',
                data: {
    				name: $("#new_name").val(),
    				siteid: $('input#ThirdPartSites').val()
                },
                success: function (data) {
                    if (data.result == 'OK') {
                    	onAlertError('添加第三方认证成功!',"ok");
                    	searchthirdpart();
                    } else {
                    	onAlertError('第三方认证名称已经存在');
                    	return false;
                    }
                },
                error: function (data) {
                	onAlertError('添加第三方认证失败');
                	return false;
                }
            });
		});
	}
	return {init:function(){
		
		initPortalSelect();
		searchthirdpart();
		onAddDevice();
	}}
}();

function generateLockBtn(third_part_id, status) {
	var lockBtnHtml = "";
	if (status == THIRD_PART_ACCESS_STATUS.NORMAL) {
		lockBtnHtml += "<button class='Form-Primary' onclick='javascript:blockaccess(\"" + third_part_id + "\")'>";
		lockBtnHtml += "<span>锁定</span>";
		lockBtnHtml += "</button>";
	}
	else {
		lockBtnHtml += "<button class='Form-Default' onclick='javascript:unblockaccess(" + third_part_id + ");'>";
		lockBtnHtml += "<span>解锁</span>";
		lockBtnHtml += "</button>";
	}
	
	return lockBtnHtml;
}


function blockaccess(id) {
	$.ajax({
		type:'POST',
		dataType:'json',
		url: '/system/blockthirdpartstatus.htm',
		data: {
			'id': id
		},
		success: function(data) {
			if (data.result != 'FAIL') {
				if (data.thirdpart != null) {
					var third_part_id = data.thirdpart.id;
					var status = data.thirdpart.status;
					
					var lockbtnHtml = generateLockBtn(third_part_id, status);
					
					$("#lock_" + third_part_id).children().remove();
					$("#lock_" + third_part_id).html("");
					$("#lock_" + third_part_id).html(lockbtnHtml);
					
					$("#status_" + third_part_id).children().remove();
					$("#status_" + third_part_id).html("");
					$("#status_" + third_part_id).html(THIRD_PART_ACCESS_STATUS.convertStatusToCn(status));
				}
			}
		},
		error: function() {
            onAlertError("第三方接入锁定失败");
		}									
	});
}
function unblockaccess(id) {
	$.ajax({
		type:'POST',
		dataType:'json',
		url: '/system/unblockthirdpartstatus.htm',
		data: {
			'id': id
		},
		success: function(data) {
			if (data.result != 'FAIL') {
				if (data.thirdpart != null) {
					var third_part_id = data.thirdpart.id;
					var status = data.thirdpart.status;
					
					var lockbtnHtml = generateLockBtn(third_part_id, status);
					
					$("#lock_" + third_part_id).children().remove();
					$("#lock_" + third_part_id).html("");
					$("#lock_" + third_part_id).html(lockbtnHtml);
					
					$("#status_" + third_part_id).children().remove();
					$("#status_" + third_part_id).html("");
					$("#status_" + third_part_id).html(THIRD_PART_ACCESS_STATUS.convertStatusToCn(status));
				}
			}
		},
		error: function() {
            onAlertError("第三方接入解锁失败");
		}									
	});
}
var THIRD_PART_ACCESS_STATUS = new function() {			
	this.NORMAL = "NORMAL";
	this.LOCKED = "LOCKED";
	this.DELETED = "DELETED";
	
	this.NORMAL_CN = "正常";
	this.LOCKED_CN = "锁定";
	this.DELETED_CN = "删除";
	
	this.convertStatusToCn = function(status) {
		var cnName = null;
		if (status == THIRD_PART_ACCESS_STATUS.NORMAL) {
			cnName = "<span class='Table-Data-Status-Photo Table-Flow-Unlocked'></span>";
		} else if (status == THIRD_PART_ACCESS_STATUS.LOCKED) {
			cnName = "<span class='Table-Data-Status-Photo Table-Flow-Locked'></span>";
		} else if (status == THIRD_PART_ACCESS_STATUS.DELETED) {
			cnName = THIRD_PART_ACCESS_STATUS.DELETED_CN;
		}
		
		return cnName;
	}
};