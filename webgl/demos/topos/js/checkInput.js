/* 文本框输入校对库 */

// 1. 校对是否是数字...  param: 被检验数字 , 是否除去空格
function checkIsNumber(num,trim){
	return $.isNumeric( trim ? $.trim(num) : num ); 
}

// 2. 校验字符串长度 param: str , 最小值 （-1表示不判断）, 最大值（-1表示不判断） , 是否除去空格 
function checkStrLength(str,min,max,trim){
	
}
// 
function P(){
	console.info(arguments);
}