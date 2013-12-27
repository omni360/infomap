$(function(){
	var tabContentsDom = $('#m_nConfigtab').children(),
		tabActiveIndex = 1;
	
	$('#m_nConfigtabLink li').each(function(i,n){
		$(this).click(function(){
			$('#m_nConfigtabLink').find('.'+$(this).attr('data')).attr({'checked': true});
			if(tabActiveIndex == 0){
				// transformFun(
					// tabContentsDom.eq(tabActiveIndex),
					// { opacity:0, 'z-index': -100},
					// ['translateX(100px)']
				// );
				// transformFun(
					// tabContentsDom.eq(i),
					// { opacity: 1, 'z-index': 10},
					// ['translateX(0)']
				// );
			}else if(tabActiveIndex == 1){
				// transformFun(
					// tabContentsDom.eq(tabActiveIndex),
					// { opacity:0, 'z-index': -100},
					// ['translateX(-100px)']
				// );
				// transformFun(
					// tabContentsDom.eq(i),
					// { opacity: 1, 'z-index': 10},
					// ['translateX(0)']
				// );
				
				tabContentsDom.eq(tabActiveIndex).addClass('block-dialog-content-tab-contents-hide');
			}
			tabActiveIndex = i;
		})
	});
	
	
	var cardDom = [
			$('#monitor_network_config_div'),
			$('#xen_app_config_div'),
			$('#sim_app_config_div')
		],
		R = 600,
		current = -45;
		switchStatus = 0;
	
	function transfromCard(dom,val){
		$('.silderList li').removeClass('active');
		if(switchStatus == 0){
			$('.config-scene').css({
				right: 10
			});
			
		}else if(switchStatus == 1 && val == current){
			$('.config-scene').css({
				right: -490
			})
			switchStatus = 0;
			current = 1;
			dom.removeClass('active');
			return false;
		}
		dom.addClass('active');
		current = val;
		for(var i = 2; i >= 0 ; i-- ){
			var d = (val+i*45),
				radius = Math.PI*d/180;
			transformFun(
				cardDom[i],
				(((-val/45) == i) ? { opacity: 1, 'z-index': 10} : { opacity: 0, 'z-index': -10}),
				['translate3d('+Math.sin(radius)*R+'px,0,'+(Math.cos(radius)*R-R)+'px)','rotateY('+d+'deg)']
			);
		}
		switchStatus = 1;
	}
	
	// transfromCard(-45);
	
	//模拟节点应用配置窗口动画
	$("#monitor_app_toggle_btn").click(function(e) {
	
		transfromCard($(this),-90);
	})
	//仿真节点应用配置窗口动画
	$("#xen_app_toggle_btn").click(function(e) {
		transfromCard($(this),-45);
	});
	//流量应用配置窗口动画
	$("#flow_toggle_btn").click(function(e) {
		transfromCard($(this),0);
	})
})
