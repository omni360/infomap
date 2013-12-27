
//======================================================================================
//  Description: 工具类
//  Created Date: 2013-01-08
//  Modify Date: 2013-01-08
//  Author: lvmy
//======================================================================================

Space3D.Utils = {
	//生成DetectObject之用
	generateDetectObject: function (detect_list, detect_type){
		
		var detect_obj = {};
		
	    for (i = 0; i < detect_list.length; i++){
	    	
	    	detect_obj.detect_type = detect_type;
	    	
	        switch(detect_list[i].type){
	        	
	            case 'worm':
	                detect_obj.worm_id = detect_list[i].id;
	                detect_obj.worm_start_event_id = detect_list[i].start_event_id;
	                break;
	                
	            case 'trojan':
	                detect_obj.trojan_id = detect_list[i].id;
	                detect_obj.trojan_start_event_id = detect_list[i].start_event_id;
	                break;
	                
	            case 'ftp':
	                detect_obj.ftp_id = detect_list[i].id;
	                detect_obj.ftp_start_event_id = detect_list[i].start_event_id;
	                break;
	                
	            case 'mail':
	                detect_obj.mail_id = detect_list[i].id;
	                detect_obj.mail_start_event_id = detect_list[i].start_event_id;
	                break;
	                
	        }
	        
	    }
	    
	    return detect_obj;
	}, 
	
	worldToScreen: function (worldVectorObj, cameraObj ){
		
		projectorObj = Space3D.Projector;
		
		var vector = projectorObj.projectVector(worldVectorObj, cameraObj);
		
		var halfWidth = window.innerWidth / 2;
		
		var halfHeight = window.innerHeight / 2;
		
		return result = {
		
			x: Math.round(vector.x * halfWidth + halfWidth),
			y: Math.round(-vector.y * halfHeight + halfHeight)
		
		}
		
	}
	
}