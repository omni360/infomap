
//======================================================================================
//  Description: 纹理材质库
//  Created Date: 2012-12-18
//  Modify Date: 2012-12-18
//  Author: lvmy
//======================================================================================

Space3D.TexturesLibrary = {
    
    //temp
    
    Hexagon : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/hexagon_2.png" ),
    FW : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/fw.png" ),
    
    //Space3D.Gyroscope
    AxisX : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/axis_x.png" ),
    AxisY : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/axis_y.png" ),
    AxisZ : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/axis_z.png" ),
    
    //Space3D.Floor
    FloorDisc : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/disc.png" ),
    FloorWater : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/water.png" ),
    
    //Space3D.Star
    Star : THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/star.png" ),
    
    //Space3D.TopoSystem
    Server: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_server.png" ),
    Host: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_host.png" ),
    Router: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_router.png" ),
    Switch: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_switch.png" ),
    Ids: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_ids.png" ),
    Ips: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_ips.png" ),
    Firewall: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/topo_firewall.png" ),
    
    //Space3D.FtpEvent
    Folder: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/folder.png" ),
    FtpClient: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/ftp_client2.png" ),
    FtpServer: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/ftp_server2.png" ),
    
    //Space3D.MailEvent
    Mail: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/mail.png" ),
    MailClient: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/mail_client2.png" ),
    MailServer: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/mail_server2.png" ),
    
    //Space3D.WormEvent
    Worm: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/worm.png" ),
    
    //Space3D.TrojanEvent //leak-start
    TrojanStart: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/theft_source.png" ),
    TrojanEnd: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/theft_target.png" ),
    
    //System 多选节点标记
    //MultiMark: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/record.png" ),
    
    //System 平台监控图标
    Disconnect: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/delete.png" ),
    //Warning: THREE.ImageUtils.loadTexture( "../../rebuild/src/space3d/textures/images/warning.png" ),
    Warning: createDot
    
}

img = new Image;
img.src = "data:image/png;base64,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";       
img.onload = function() {
	Space3D.TexturesLibrary.MultiMark = new THREE.Texture(img);
	Space3D.TexturesLibrary.MultiMark.needsUpdate = !0;
}

function createDot(para) {
	
	var canvas = document.createElement('canvas');
	canvas.width = 1000;
	canvas.height = 1000;
	
	var r = canvas.width / 2.5;
	
	var alpha = .8;
	var context = canvas.getContext('2d');
	context.globalAlpha = alpha;
	context.translate(canvas.width / 2, canvas.height / 2);
	
	for (var i = 0; i < para.length; i++){
		
		switch(para[i]){
			case "warning":
				drawWarning(0.3, '#FF0000', r, context, Math.PI / 3 * i);
				break;
			case "disconnect":
				drawDisconnect(0.3, 'gray', r, context, Math.PI / 3 * i);
				break;
			case "delete":
				drawDelete(0.3, '#0000FF', r, context, Math.PI / 3 * i);
				break;
			default:
				drawWarning(0.3, '#FF0000', r, context, Math.PI / 3 * i);
				break;
		}
	}
		
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	
	return texture;
	
}

function drawWarning(size, color, radius, context, angle){
    
   	side_len =  size * radius;
   	height = Math.tan(Math.PI / 6) * side_len;
   	context.save();
   	context.rotate(angle);
   	context.beginPath();
    context.fillStyle = color;
	context.moveTo(0, -radius);
	context.lineTo(-height, -radius + side_len );
	context.lineTo( height, -radius + side_len );
	context.lineTo(0, -radius);
	context.closePath();
    context.fill();
	context.clearRect( -side_len / 16, -radius + side_len / 3 ,side_len / 8 ,side_len / 2.5);
	context.clearRect( -side_len / 16, -radius + side_len / 1.25 ,side_len / 8 ,side_len / 8);
	context.restore();
	
}

function drawDisconnect(size, color, radius, context, angle){
    	
	circle_radius = size * radius / 2;
	context.save();
	context.beginPath();
	context.rotate(angle);
	context.lineWidth = 5;
    context.fillStyle = color;
    context.arc(0, -radius + circle_radius , circle_radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
	context.clearRect( -( circle_radius - circle_radius / 4), -(radius - circle_radius) -  circle_radius / 3,( circle_radius - circle_radius / 4) * 2 ,circle_radius / 6);
	context.clearRect( -( circle_radius - circle_radius / 4), -(radius - circle_radius) + circle_radius / 3 - circle_radius / 6 ,( circle_radius - circle_radius / 4) * 2 ,circle_radius / 6);
    context.restore();
    
}

function drawDelete(size, color, radius, context, angle){
	width = size * radius;
	context.save();
	context.beginPath();
	context.rotate(angle);
	context.lineWidth = 5;
    context.fillStyle = color;
    context.fillRect(-width / 2, -radius , width, width);
    context.closePath();
    context.fill();
    context.restore();
}

