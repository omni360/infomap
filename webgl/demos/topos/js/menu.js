$(document).ready(function(){
  	var menustatus = true;  //控制菜单状态
  	var delay_time = 0;     //菜单动画时间
  	var left_num = 0;       //菜单移动位置

    var index_num;
	/*20120803*/
  	// 隐藏一级菜单
  	$("#nbmenu").css({"display":""});
  	// 隐藏二级菜单
  	$(".menu-node").css({"display":"none"});
  	// 隐藏遮罩
  	$(".overflow").css({"display":"none"});
	
  	$("#nbmenu").css({opacity : 1});
  	
  	// 一级菜单鼠标事件
	//$(".menu-r-li").each(function(){
		//$(this).mouseenter(function(e){
		$(".menu-r-li").click(function(e){
      		// 这里index是从0开始的
      		$('.menu-r-li a').removeClass('selected');
      		$(this).find('a').addClass('selected');
      		
      		ControlMenu(menustatus,false);
      		menustatus = false;
      		
      		index_num = $(this).index();
      		var index_last = $('#group_ul').children().last().index() - index_num;
      		left_num = 300 - (180 * index_num);
      		right_num = -320 - (180 * index_last)
      		
      		
      		// 整个二级菜单左移，根据一级菜单的序号。来计算左移的大小
      		$(".sub-menu").animate({"left": left_num}, 200);
      		$(".sub-menu").animate({"right": right_num}, 200);
      		
      		// 找到一级菜单相应的二级菜单，变亮
      		delay_time = 0;
      		$(".menu-node:eq("+index_num+")").children().each(function(){
        		delay_time =  delay_time + 80 
        		$(this).delay(delay_time).animate({"opacity": "0.8"}, 100);
      		});

    	});
  	//});
  	
  	
  	//二级菜单鼠标事件
  	//$(".menu-node").each(function(){
    	//$(this).mouseenter(function(e){
    	$(".menu-node").mouseenter(function(e){

      	  index_num = $(this).index()
      		// 点中的二级菜单，变亮
      		$(".menu-node:eq("+index_num+")").children().each(function(){
        		$(this).animate({"opacity": "0.8"}, 100);
      		});
    	});
  	//});
  	
  	// 二级菜单项被单击时触发事件
  	$('.sub-menu ul li').click(function(){
      // $("#main_iframe").css({'opacity':0});
      
      // if( index_num == 0){
        // topo.isRenderer = false;
      // }else{
        // topo.isRenderer = true;
      // }
      
  	  $("#main_iframe").attr("src", $(this).attr("title"));
      // $("#main_iframe").css({'opacity':1});
      // 判断是否隐藏背景// 点击菜单给后台传值
      
  	})
  	
  	// 点击遮罩和二级菜单后，关闭菜单和遮罩
  	$(".overflow").click(distoryMenu);
  	$(".sub-menu").click(distoryMenu);
  	
  	//菜单--------
  	//菜单开关控制
  	function ControlMenu(menustatus,distory){
    	// 第一次加载
    	if(menustatus){
      		// 加上遮罩，显示菜单
      		$(".overflow").css({"display":""});
      		$(".menu-node").css({"display":""});
    	}
    	if(distory){
      		// 关闭菜单
      		$(".overflow").css({"display":"none"});
      		$(".menu-node").css({"display":"none"});
    	}
  	}
  	
  	/*
  	* 销毁菜单
  	*/
  	function distoryMenu(){
    	ControlMenu(false,true);
    	menustatus = true;
    	$('.menu-r-li a').removeClass('selected');
  	}// end 菜单--------

});

function change_page(){
	$("#main_iframe").attr("src", "/topology/attack_flow_timer_topo/index.html");
}

function page_jump(url){
	
	$("#main_iframe").attr("src", url);
	//$("#main_iframe").attr("src", $(this).attr("title"));
	
}