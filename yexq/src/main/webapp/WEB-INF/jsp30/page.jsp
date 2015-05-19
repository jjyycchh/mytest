<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<script id="page_template" type="text/x-dot-template">
  <table border=0 cellpadding=0 cellspacing=0 width=99% align=center>
	<tr>
	  <td width=95% height=31 valign=middle align=center  class=table5>

		  共{{=it.totalRecord}}条记录，
		  每页{{=it.pageSize}}条&nbsp;
			{{=it.pageNo}}/{{=it.totalPage}}
			<A HREF="javascript:goPage(1)">【首页】</a>
console.log({{=it.totalPage}})
		    {{? it.totalPage != '1' }}
			<A HREF="javascript:goPage({{=it.pageNo-1}})"><b>【上一页】</b></A>
			{{??}}
			
			{{?}}
			{{ for (var i =it.pageStart;i <= it.pageEnd; i++) { 
				if( i==it.pageNum){ }}
					<font color=red>{{=it.pageNum}}</font>
			{{	}else{ }}
				    <A HREF="javascript:goPage({{=i}})">{{=i}}</A>
            {{ } } }}
			{{? it.pageNum < Math.ceil(it.total/it.pageSize)}}
			<A HREF="javascript:goPage({{=it.pageNo+1}})"><b>【下一页】</b></A>
			{{??}}
			<b>下一页</b>
			{{?}}
		<A HREF="javascript:goPage({{=3}})">【尾页】</a>

<%--
		<input name="Submit" type="button" class="textfield45" value="跳转到" onclick="goPage();">
         <input type="text" class="textfield45" name="pageNum" id="pageNum" size="3"
onKeyDown="if(event.keyCode==13){ goPage();}">
		页</td>
--%>

	</tr>
  </table>
</script>
</html>