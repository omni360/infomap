
//======================================================================================
//  Description: 消息Card 池
//  Created Date: 2013-01-07
//  Modify Date: 2013-01-07
//  Author: xfc
//======================================================================================

OOPTEST.CardModelLibrary = [];

OOPTEST.MsgCardPool = function (){
	OOPTEST.PoolUntils.apply(this,arguments);
}

OOPTEST.MsgCardPool.prototype = Object.create(OOPTEST.PoolUntils.prototype);

