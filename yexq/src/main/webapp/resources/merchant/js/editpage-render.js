/**
 * Created by huanghanxian on 14-8-24.
 */


var editpageApp = function(){



    var reSizeIframe = function(){
        alert(window.parent._EditPageID);
    }

    return {init:function(){
        reSizeIframe();
    }}
}();