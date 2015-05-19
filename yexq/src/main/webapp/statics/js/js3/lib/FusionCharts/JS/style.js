/** textarea中显示只读内容，去掉textarea的滚动条**/
function speak(){
   	alert("fuck!!!");
}

/** 让textarea只显示几列，超出部分显示滚动条**/
function textareaAdjust(object,rows,height){
    if(object.rows> rows){
        object.style.height = height*rows + 'px';
     } else {
        object.style.height = object.scrollHeight + 'px';
        object.rows = (object.scrollHeight/height) ;
     }
}

/** 判断字数是否是符合规定的长度 **/
function isOverLength(value,length){
	if(value.length >= length){
		alert("内容长度：" + value.length + ",超出最大长度：" + length);
		return true;
	}
	return false;
}