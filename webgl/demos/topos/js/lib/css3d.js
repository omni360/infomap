var transformFun = function(element, staticvalue, anivalue, key) {
	var _tempCssObejct = {},
		_tempAniObject = {},
		_tempaniStr = anivalue.join(' '),
		key = key || "Transform";
	
	["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
		_tempAniObject[prefix + key] = _tempaniStr;
	});
	
	$.extend(_tempCssObejct, staticvalue, _tempAniObject);
	
	return element.css(_tempCssObejct);
}