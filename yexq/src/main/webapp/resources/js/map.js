////////////////////////////////////////////////////
// baidu map javascript functions
function initialMapSelector(div_id, mapcenter_lng, mapcenter_lat) {
	var map = new BMap.Map(div_id, {enableAutoResize: true});    
	var point = new BMap.Point(mapcenter_lng, mapcenter_lat);
	map.centerAndZoom(point, 15);
	map.enableScrollWheelZoom();
	map.addControl(new BMap.NavigationControl());

	//addMarker(map, point, 0);
	return map; 
}

function autoResizeMapView(map, markers) {
    if (markers.length > 0) {
        var marker_points = [];

        for (var i = 0; i < markers.length; i++) {
            marker = markers[i];
            
            marker_points.push(marker.getPosition());
        }
        
        map.setViewport(marker_points);
        //alert(marker_points[0]);
        if (map.getZoom() > 15) {
            map.setZoom(15);
        }
    }
}

function getDefaultIcon() {
	return new BMap.Icon('http://localhost:8081/twifi-access/resources/img/tubiao.gif', new BMap.Size(46, 60), {
		// 指定定位位置。   
		// 当标注显示在地图上时，其所指向的地理位置距离图标左上    
		// 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
		// 图标中央下端的尖角位置。    
		offset: new BMap.Size(10, 25) // 设置图片偏移。   
		// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
		// 需要指定大图的偏移位置，此做法与css sprites技术类似。    
		// imageOffset: new BMap.Size(0, 0 - 25)   // 设置图片偏移    
	 });
}

function getSelectedIcon() {
	return selectedIcon = new BMap.Icon("../img/tubiao.gif", new BMap.Size(64, 64), {
		offset: new BMap.Size(10, 25)
		//imageOffset: new BMap.Size(0, 0 - 25)   // 设置图片偏移    
	});
}

function setDefaultIcon(marker) {
	var defaultIcon = getDefaultIcon();

    if (marker && marker.getIcon() != defaultIcon) {
        marker.setIcon(defaultIcon);
    }
}

function setSelectedIcon(marker) {
	var selectedIcon = getSelectedIcon();

    if (marker && marker.getIcon() != selectedIcon) {
        marker.setIcon(selectedIcon);
    }
}

function addMarker(map, point){  // 创建图标对象
	var defaultIcon = getDefaultIcon();
	var selectedIcon = getSelectedIcon();
	
	// 创建标注对象并添加到地图
	//var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat), {icon: defaultIcon});
    var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat));
    
	marker.addEventListener("click", function(e){
		// 点击事件切换图标， 实现选中、非选中功能
		/*
		if (this.getIcon().imageUrl  == defaultIcon.imageUrl ){
			this.setIcon(selectedIcon);
		}
		else {
			this.setIcon(defaultIcon);
		}
		*/
	});
	
	/*
	var html_infoWindow = "Position: " + point.lng + " " + point.lat + " index:" + index;
	marker.addEventListener("mouseover", function(e) {
		this.openInfoWindow(new BMap.InfoWindow(html_infoWindow, {enableMessage: false, title: "位于: "+point.lng+","+point.lat, enableCloseOnClick:true}));
	});
	marker.addEventListener("mouseout", function(e) {
		this.closeInfoWindow();
	});
	*/

	map.addOverlay(marker);
	
	return marker;
}

function GenerateRandomPoint(map, pointNumber, origin_lng, origin_lat) {
	var lngSpan = 0.01;    
	var latSpan = 0.01;
	
	var longtitude = origin_lng + lngSpan * (Math.random() * 0.7 + 0.15)
	var latitude = origin_lat + latSpan * (Math.random() * 0.7 + 0.15)
	var ipoint = new BMap.Point(longtitude.toFixed(3),latitude.toFixed(3));   

	return addMarker(map, ipoint, pointNumber);
}

function getDefaultMarker(){
	//空标点，位置默认位于上海市区
	return new BMap.Marker(new BMap.Point(121.48, 31.22));
}

function setMarkerReverseToAddrOn(map, markers) {
    if (markers.length > 0) {
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];

            marker.enableDragging();
            marker.addEventListener("dragend", function(e){
                //alert("当前位置：" + e.point.lng + ", " + e.point.lat);
                //PointReverseToAddr(e.point);

                if (map && markers && markers.length > 0) {
                    autoResizeMapView(map, markers);
                }
            });
        }
    }
}

function setMarkerReverseToAddrOff(marker) {
	marker.disableDragging(); 
}

function pointReverseToAddr(point) {
	var geo = new BMap.Geocoder();
	geo.getLocation(point, function(e) {
		alert("当前地址："+ e.address);
		//map.setZoom(map.getZoom() + 1);
	});
}

function showDevice(map, lng, lat) {
	//alert("aaa");
	return addMarker(map, new BMap.Point(lng, lat));
}

////////////////////////////////////////////////////

function emailValidate(emailaddress){
	var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return pattern.test(emailaddress);
}

function setActiveNavItem(handler) {
	$('#ul_content_tabs').children().removeClass("active");
	handler.addClass("active");
}
