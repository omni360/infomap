
//======================================================================================
//  Description: 字符串通用处理类
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================


Space2D.StringUils = function (){}

/*
 * 删除字符串两端空格 all:两侧 left:左侧 right:右侧  默认两侧
 */
Space2D.StringUils.prototype.Trim = function(_str,_param){
	switch(_param){
		case 'left':
			this.nStr = _str.replace(/(^[\s]*)/g, "");
			break;
		case 'right':
			this.nStr = _str.replace(/([\s]*$)/g, "");
			break;
		default:
			this.nStr = _str.replace(/(^[\s]*)|([\s]*$)/g, "");
	}
	return this.nStr;
}

/*
 * 判断是否为数字
 */
Space2D.StringUils.prototype.isNaN = function(_str){
	return isNaN(_str);
}

Space2D.StringUils.prototype.widthCheck = function(name, maxLength){  
    if(!maxLength){  
        maxLength = 20;  
    }  
    if(name==null||name.length<1){  
        return ["", ""];  
    }  
    var w = 0;//字符串长度，一个汉字长度为2  
    var s = 0;//汉字个数  
    var p = false;//判断字符串当前循环的前一个字符是否为汉字  
    var b = false;//判断字符串当前循环的字符是否为汉字  
    var nameSub;  
    for (var i=0; i<name.length; i++) {  
       if(i>1 && b==false){  
            p = false;  
       }  
       if(i>1 && b==true){  
            p = true;  
       }  
       var c = name.charCodeAt(i);  
       //单字节加1  
       if( c >= "a".charCodeAt(0) && c <= "z".charCodeAt(0)){
            w++;  
            b = false;  
       }else {  
            w+=2;  
            s++;  
            b = true;  
       } 

       if(w>maxLength && i<=name.length-1){  
            if(b==true && p==true){  
                nameSub = name.substring(0,i-2)+"...";  
            }  
            if(b==false && p==false){  
                nameSub = name.substring(0,i-3)+"...";  
            }  
            if(b==true && p==false){  
                nameSub = name.substring(0,i-2)+"...";  
            }  
            if(p==true){  
                nameSub = name.substring(0,i-2)+"...";  
            }  
            break;  
       }  
    }  
    if(w<=maxLength){  
        return [name, ""];  
    }  
    return [nameSub, name];  
} 
