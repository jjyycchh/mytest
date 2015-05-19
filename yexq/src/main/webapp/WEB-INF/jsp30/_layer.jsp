<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 导入layer JS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/statics/layer-v1.8.5/layer/skin/layer.css" type="text/css">

<script type="text/javascript" src="${pageContext.request.contextPath}/statics/layer-v1.8.5/layer/layer.min.js"></script>

<script type="text/javascript">
var layerKit = {
		iframe: function(title, src, width, height){
			$.layer({
			    type: 2,
			    border: [0],
			    move: false,
			    title: title,
			    maxmin: false,
			    iframe: {src : src},
			    area: [width, height]
			});
		},
		confirm: function(yes, no){
			$.layer({
			    shade: [0.5, '#000'],
			    area: ['auto','auto'],
			    dialog: {
			        msg: '是否确认删除？',
			        btns: 2,                    
			        type: 4,
			        btn: ['确定','取消'],
			        yes: yes,
			        no: no
			    }
			});
		}
};
</script>
</head>
</html>