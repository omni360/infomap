
//======================================================================================
//  Description: 网关接口类
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-08
//  Author: lvmy
//======================================================================================



OOPTEST.GatewayRequest = function (){}

OOPTEST.GatewayRequest.prototype.request = function (gateway, callback, type, flag){
	
	if ( flag !== "timer" && this.timer ) {
		
		console.log(" Method 'timerRequest' is already in used. It will be forced to stop.");
		this.stopTimer();
		
	}
	
	this.gateway = gateway || {};
	
	this.url = gateway['url'] !== undefined ? gateway['url'] : "#";
	this.paras = gateway['paras'] !== undefined ? gateway['paras'] : {};
	this.callback = callback !== undefined ? callback : new Function();
	this.type = type !== undefined ? type : (gateway['type'] !== undefined ? gateway['type'] : "text");
	
	this.get();
	
}

OOPTEST.GatewayRequest.prototype.post = function ( gateway, callback, type, flag ){
	
	if ( flag !== "timer" && this.timer ) {
		
		console.log(" Method 'timerRequest' is already in used. It will be forced to stop.");
		this.stopTimer();
		
	}
	
	this.gateway = gateway || {};
	
	this.url = gateway['url'] !== undefined ? gateway['url'] : "#";
	this.paras = gateway['paras'] !== undefined ? gateway['paras'] : {};
	this.callback = callback !== undefined ? callback : new Function();
	this.type = type !== undefined ? type : (gateway['type'] !== undefined ? gateway['type'] : "text");
	
	switch (this.type){
		
		case "text":
			this.getText(this.url, this.paras, this.callback, 'post');
			break;
			
		case "json":
			this.getJson(this.url, this.paras, this.callback, 'post');
			break;
			
		case "xml":
			this.getXml(this.url, this.paras, this.callback, 'post');
			break;
			
		default:
			this.getText(this.url, this.paras, this.callback, 'post');
			break;
			
	}
	
}

OOPTEST.GatewayRequest.prototype.get = function (){
	
	switch (this.type){
		
		case "text":
			this.getText(this.url, this.paras, this.callback);
			break;
			
		case "json":
			this.getJson(this.url, this.paras, this.callback);
			break;
			
		case "xml":
			this.getXml(this.url, this.paras, this.callback);
			break;
			
		default:
			this.getText(this.url, this.paras, this.callback);
			break;
			
	}
	
}


OOPTEST.GatewayRequest.prototype.timerRequest = function (gateway, callback, timerout, type){
	
	timerout === undefined && (timerout = 1000);
	
	this.timer = window.setInterval(
		
		this.request.bind( this, gateway, callback, type, 'timer' ),
		timerout
		
	)
	
}

OOPTEST.GatewayRequest.prototype.stopTimer = function (){

	this.timer ? ( window.clearInterval(this.timer), this.timer = null ) : console.log( " This is not a timerRequest, you can not use method 'stopTimer'. " );

}


OOPTEST.GatewayRequest.prototype.getText = function (url, paras, callback, type){
	
	switch (type){
		
		case "post":
			$.post( url, paras,  callback.bind(this), 'text');
			break;
			
		case "get":
			$.get( url, paras,  callback.bind(this), 'text');
			break;
			
		default:
			$.get( url, paras,  callback.bind(this), 'text');
			break;
			
	}
}

OOPTEST.GatewayRequest.prototype.getJson = function (url, paras, callback, type){
	
	var callback = callback.bind(this);
	
	switch (type){
		
		case "post":
			$.post( url, paras,  function (result){
		
				result = eval( "(" + result + ")" );
				callback( result );
				
			}, 'text');
			break;
			
		case "get":
			$.get( url, paras,  function (result){
		
				result = eval( "(" + result + ")" );
				callback( result );
				
			}, 'text');
			break;
			
		default:
			$.get( url, paras,  function (result){
		
				result = eval( "(" + result + ")" );
				callback( result );
				
			}, 'text');
			break;
			
	}
}

OOPTEST.GatewayRequest.prototype.getXml = function (url, paras, callback, type){
	
	switch (type){
		
		case "post":
			$.post( url, paras,  callback.bind(this), 'xml');
			break;
			
		case "get":
			$.get( url, paras,  callback.bind(this), 'xml');
			break;
			
		default:
			$.get( url, paras,  callback.bind(this), 'xml');
			break;
			
	}
	
}

