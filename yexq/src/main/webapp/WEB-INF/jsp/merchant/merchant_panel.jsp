<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="container" style="padding-top: 5px;">
	<div class="row">

		<div class="col-md-6">
			<ul id="id_mcnav" class="nav nav-pills nav-justified">
			</ul>
		</div>
		 
		<div id="id_mcpmain_content" class="container main_content"></div>

	</div>

</div>
<script type="text/javascript">
	var MCcurid = "id_mcm_device";
	var permitted_main_menu_mc = null; 
	$(document).ready(function () {
        //loadResources();
        loadMcMenu();
        show_mcpmaincontent('id_mcpmain_content',MCcurid);
    });
	
	
	function show_mcpmaincontent(id_dest_div, id) {
		if (id != MCcurid) {
			MCcurid = id;
		}

		var destination_url = contextPath +  getDestUrl(permitted_main_menu_mc, id);

		if (destination_url != null && destination_url != false) {
			$.get(destination_url, function (data) {
			    $('#' + id_dest_div).html(data);
			    $('html').unmask();
			});
			
			onDrawMainMenuMC(permitted_main_menu_mc, id);
			$('html').mask('加载...');
		}
	}
	function loadMcMenu() {
		var permitted_menu_ids = null;

		
			permitted_menu_ids = [{'id': 'id_mcm_device'},
			                      {'id': 'id_mm_portal'},
			                      {'id': 'id_mm_user'},
			                      {'id': 'id_mm_statistics'}];

		if (permitted_menu_ids != null && permitted_menu_ids.length > 0) {
			var html_menu = '';
			permitted_main_menu_mc = [];
			for (var i = 0; i < permitted_menu_ids.length;i++) {
				var menu_id = permitted_menu_ids[i]['id'];
				
				for (var j = 0; j < merchant_menu.length;j++) {
					if (menu_id == merchant_menu[j]['id']) {
						permitted_main_menu_mc.push(merchant_menu[j]);
						break;
					} 
				}
			}
		
			return true;
		}
		else {
			return false;
		}
	}
	
	
	
	
	function onDrawMainMenuMC(menu_items, active_item_id) {
		if (menu_items != null && menu_items.length > 0) {
			
			if ($(".MCmain-nav-item").length == 0) {
				var html_menu = '';
				for (var i = 0; i < menu_items.length ; i++) {
					var menu_id = menu_items[i]['id'];
					var menu_name = menu_items[i]['name'];
					var menu_icon_class = menu_items[i]['icon'];
					
					html_menu += "<li class='MCmain-nav-item' id='" + menu_id + "'>";
					html_menu += 	"<a href=\"javascript:show_mcpmaincontent('id_mcpmain_content','" + menu_id + "');\">";
					html_menu += 		"<i class='" + menu_icon_class + "'></i>"
					html_menu += 		menu_name
					html_menu += 	"</a>";
					html_menu += "</li>";
				}
				$("#id_mcnav").html(html_menu);
			}
			
			// 默认设置 菜单item list 中第一项为激活状态
			$(".MCmain-nav-item").removeClass('active');
			if (active_item_id != null && typeof active_item_id == "string") {
				$("#" + active_item_id).addClass('active');
			}
			else {
				$("#" + menu_items[0]['id']).addClass('active');
			}

		}
		
		return true;
	}

</script>

