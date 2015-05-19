var $$ = document.getElementById;
/**
 * 检查有没有被选中
 */
function hasChecked(itemName){
	var items = document.all(itemName);
    if(items){
	  if(items.length){
        for(var i=0;i<items.length;i++){
			if(items[i].checked){
				return true;
			}
		}
	  }else{
		return items.checked;
	  }
   }
   return false;
}

/**
 * 检查多选框有没有被选中
 */
function hasCheckedOne(itemName){
	var count = 0;
	var items = document.all(itemName);
    if(items){
	  if(items.length){
        for(var i=0;i<items.length;i++){
			if(items[i].checked){
				count++;
			}
		}
	  }else{
		 if(items.checked){
			 count++;
		 }
	  }
   }
   if(count == 0){
	   alert("请选中一项");
	   return false;
   }
   if(count > 1){
	   alert("有多项被选中，请只选择一项");
	   return false;
   }
   return true;
}

/**
 * 取选中的多选框
 */
function getCheckedObj(itemName){
	var items = document.all(itemName);
	var checkedItems = new Array();
    if(items){
	  if(items.length){
        for(var i=0;i<items.length;i++){
			if(items[i].checked){
				 checkedItems[checkedItems.length]=items[i];
			}
		}
	  }else{
		if(items.checked){
			return items;
		}
	  }
   }
   if(checkedItems.length == 1){
	   return checkedItems[0];
   }else{
	   return checkedItems;
   }
}


/**
 * 全选功能
 */
function checkedAll(itemName,checked){
    var items = document.all(itemName);
    if(items){
	  if(items.length){
        for(var i=0;i<items.length;i++){
 			items[i].checked = checked;
		}
	  }else{
			items.checked = checked;
	  }
   }
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

/**
 * 全选功能
 */
function selectedAll(itemName,selected){
    var items = document.all(itemName);
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



/**
 * 是否有字母数字
 */
function hasLettersNumber(passwd){
	 if(passwd == ""){
		return false;
	 }
     passwd = passwd.toLowerCase();
  	 var hasNumber = false;
  	 var hasLetters = false;
  	 for(var i=0;i<9;i++){
  	 	if(passwd.indexOf(""+i) != -1){
  	 	   hasNumber = true;
  	 	   break;
  	 	}
  	 }
  	 var lettersArray = new Array();
  	 lettersArray[lettersArray.length] = "a";
  	 lettersArray[lettersArray.length] = "b";
  	 lettersArray[lettersArray.length] = "c";
  	 lettersArray[lettersArray.length] = "d";
  	 lettersArray[lettersArray.length] = "e";
  	 lettersArray[lettersArray.length] = "f";
  	 lettersArray[lettersArray.length] = "g";
  	 lettersArray[lettersArray.length] = "h";
  	 lettersArray[lettersArray.length] = "i";
  	 lettersArray[lettersArray.length] = "j";
  	 lettersArray[lettersArray.length] = "k";
  	 lettersArray[lettersArray.length] = "l";
  	 lettersArray[lettersArray.length] = "m";
  	 lettersArray[lettersArray.length] = "n";
  	 lettersArray[lettersArray.length] = "o";
  	 lettersArray[lettersArray.length] = "p";
  	 lettersArray[lettersArray.length] = "q";
  	 lettersArray[lettersArray.length] = "r";
  	 lettersArray[lettersArray.length] = "s";
  	 lettersArray[lettersArray.length] = "t";
  	 lettersArray[lettersArray.length] = "u";
  	 lettersArray[lettersArray.length] = "v";
  	 lettersArray[lettersArray.length] = "w";
  	 lettersArray[lettersArray.length] = "x";
  	 lettersArray[lettersArray.length] = "y";
  	 lettersArray[lettersArray.length] = "z";
  	 for(var i=0;i<lettersArray.length;i++){
  	 	if(passwd.indexOf(lettersArray[i]) != -1){
  	 	   hasLetters = true;
  	 	   break;
  	 	}
  	 }
  	 return hasNumber && hasLetters;
  }
