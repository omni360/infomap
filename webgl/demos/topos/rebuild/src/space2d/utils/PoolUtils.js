
//======================================================================================
//  Description: 存储对象池
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

OOPTEST.PoolUntils = function (options){
	options = options || {};
	
	this.pool = options.poolary;
	
}

OOPTEST.PoolUntils.prototype.initPool = function (){
	
}

OOPTEST.PoolUntils.prototype.getOutAElement = function (){
	return this.pool.length == 0 ? null :this.pool.shift();
}

OOPTEST.PoolUntils.prototype.addAElement = function (_element){
	this.pool.push(_element);
}

