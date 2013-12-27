
//======================================================================================
//  Description: 封装的根基
//  Created Date: 2012-12-13
//  Modify Date: 2013-01-10
//  Author: lvmy
//======================================================================================

var OOPTEST = OOPTEST ||  { Space2D: { AUTHOR: 'XuFengchao' }, Space3D: { AUTHOR: 'LvMingyan' } };

Space2D = OOPTEST.Space2D;
Space3D = OOPTEST.Space3D;

Space3D.Projector = new THREE.Projector();

OOPTEST.CompareDate = function (a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {
        //alert('开始时间大于离开时间，请检查');
        return false;
    }else{
    	return true;
    }
}

OOPTEST.CompareTime = function (beginTime, endTime) {
    //var beginTime = "2009-09-21 00:00:00";
    //var endTime = "2009-09-21 00:00:01";
    
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    
    if (a < 0) {
        alert("endTime小!");
    } else if (a > 0) {
        alert("endTime大!");
    } else if (a == 0) {
        alert("时间相等!");
    } else {
        return 'exception'
    }
}