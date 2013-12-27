Process = function (step, x, y){
    
	var world_width = 1000;
    var world_height = 100;
    
    step == undefined && (step = 1);
    x == undefined && (x = parent.innerWidth / 2 - world_width / 2);
    y == undefined && (y = parent.innerHeight - world_height - 10);
    
    $('body').append('<div id="ProcessSvg"></div>');
    
    $('#ProcessSvg').css({
    	'position': 'absolute',
    	'bottom': 15,
    	'left': x
    });
    
    Raphael('ProcessSvg', world_width, world_height, function () {
	
	    
        // 定义整体空间
        var r = this;
        
        r.customAttributes.arc = function (cx, cy, r, R, d1, d2, the_color, type) {
            //console.info('111');
            d2 == 360 && (d2 = 359.9);
            d1 = d1;
            d2 = d2;
            a1 = (d1 % 360) * Math.PI / 180;
            a2 = (d2 % 360) * Math.PI / 180;
            
            var tx1 = cx + r * Math.cos(a1);
            var ty1 = cy + r * Math.sin(a1);
            var tx2 = cx + R * Math.cos(a1);
            var ty2 = cy + R * Math.sin(a1);
            var tx3 = cx + R * Math.cos(a2);
            var ty3 = cy + R * Math.sin(a2);
            var tx4 = cx + r * Math.cos(a2);
            var ty4 = cy + r * Math.sin(a2);
            
            if(d2 <180){
                if(type == 1){
                    return {
                        path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 1, 1, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 1, 1, 0, tx1, ty1], ["z"]]
                    };
                }
                else{
                    return {
                        path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 0, 0, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 0, 0, 0, tx1, ty1], ["z"]]
                    };
                }
            }
            else{
                if(type == 0){
                    return {
                        path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 1, 1, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 1, 1, 0, tx1, ty1], ["z"]]
                    };
                }
                else{
                    return {
                        path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 0, 0, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 0, 0, 0, tx1, ty1], ["z"]]
                    };
                }
            }
            
        }
        
        
        r.rect(0, 0, world_width, world_height, 6).attr({
            stroke: "none",
            fill: "#444A5A",
            opacity: 0.9
        });
        
        var typeParams = {
            stroke: "#888",
            "stroke-width": 0.5,
            fill: "#12C2F6",
            "fill-opacity": 0.8,
            "stroke-opacity": 0.0
        };
        
        var type_text_params = {
            fill: "#ffffff", 
            "font-family":"微软雅黑", 
            "font-size":13, 
            "font-weight": "bold", 
            "text-anchor":"middle"
        };
        
        r.rect(50, 30, 120, 40, 6).attr({
            stroke: "#12C2F6",
            "stroke-width": 2,
            fill: "#12C2F6",
            "fill-opacity": 0.8,
            "stroke-opacity": 0.8
        });
        r.text(95, 50 , "环境配置").attr(type_text_params);
        
        rect_2 = r.rect(250, 30, 120, 40, 6).attr({
            stroke: "#12C2F6",
            "stroke-width": 2,
            fill: "#12C2F6",
            "fill-opacity": 0.3,
            "stroke-opacity": 0.8
        });
        text_2 = r.text(295, 50 , "应用配置").attr(type_text_params);
        
        rect_3 = r.rect(450, 30, 120, 40, 6).attr({
            stroke: "#12C2F6",
            "stroke-width": 2,
            fill: "#12C2F6",
            "fill-opacity": 0.3,
            "stroke-opacity": 0.8
        });
        text_3 = r.text(495, 50 , "监控配置").attr(type_text_params);
        
        rect_4 = r.rect(650, 30, 120, 40, 6).attr({
            stroke: "#12C2F6",
            "stroke-width": 2,
            fill: "#12C2F6",
            "fill-opacity": 0.3,
            "stroke-opacity": 0.8
        });
        text_4 = r.text(695, 50 , "展示配置").attr(type_text_params);
        
        r.path("M170,50L250,50").attr({stroke: "#12C2F6", "stroke-width": 3, "stroke-opacity": 0.8});
        
        r.path("M370,50L450,50").attr({stroke: "#12C2F6", "stroke-width": 3, "stroke-opacity": 0.8});
        
        r.path("M570,50L650,50").attr({stroke: "#12C2F6", "stroke-width": 3, "stroke-opacity": 0.8});
        
        r.path("M770,50L870,50").attr({stroke: "#12C2F6", "stroke-width": 3, "stroke-opacity": 0.8});
        
        oo1 = r.path("M25.06,13.719c-0.944-5.172-5.461-9.094-10.903-9.094v4c3.917,0.006,7.085,3.176,7.094,7.094c-0.009,3.917-3.177,7.085-7.094,7.093v4.002c5.442-0.004,9.959-3.926,10.903-9.096h4.69v-3.999H25.06zM20.375,15.719c0-3.435-2.784-6.219-6.219-6.219c-2.733,0-5.05,1.766-5.884,4.218H1.438v4.001h6.834c0.833,2.452,3.15,4.219,5.884,4.219C17.591,21.938,20.375,19.153,20.375,15.719z")
        .attr({stroke: "#ffffff", "stroke-width": 2, "stroke-opacity": 1});
        oo1.transform("t130,35s0.8");
        
        oo2 = r.path("M24.946,9.721l-2.872-0.768l-0.771-2.874l3.188-3.231c-1.992-0.653-4.268-0.192-5.848,1.391c-1.668,1.668-2.095,4.111-1.279,6.172l-3.476,3.478l-3.478,3.478c-2.062-0.816-4.504-0.391-6.173,1.277c-1.583,1.581-2.043,3.856-1.39,5.849l3.231-3.188l2.874,0.77l0.769,2.872l-3.239,3.197c1.998,0.665,4.288,0.207,5.876-1.384c1.678-1.678,2.1-4.133,1.271-6.202l3.463-3.464l3.464-3.463c2.069,0.828,4.523,0.406,6.202-1.272c1.592-1.589,2.049-3.878,1.384-5.876L24.946,9.721z")
        .attr({stroke: "#ffffff", "stroke-width": 2, "stroke-opacity": 1});
        oo2.transform("t330,35s0.8");
        
        oo3 = r.path("M25.083,18.895l-8.428-2.259l2.258,8.428l1.838-1.837l7.053,7.053l2.476-2.476l-7.053-7.053L25.083,18.895zM5.542,11.731l8.428,2.258l-2.258-8.428L9.874,7.398L3.196,0.72L0.72,3.196l6.678,6.678L5.542,11.731zM7.589,20.935l-6.87,6.869l2.476,2.476l6.869-6.869l1.858,1.857l2.258-8.428l-8.428,2.258L7.589,20.935zM23.412,10.064l6.867-6.87l-2.476-2.476l-6.868,6.869l-1.856-1.856l-2.258,8.428l8.428-2.259L23.412,10.064z")
        .attr({stroke: "#ffffff", "stroke-width": 2, "stroke-opacity": 1});
        oo3.transform("t530,35s0.8");
        
        oo4 = r.path("M4.083,14H14V4.083H4.083V14zM17,4.083V14h9.917V4.083H17zM17,26.917h9.917v-9.918H17V26.917zM4.083,26.917H14v-9.918H4.083V26.917z")
        .attr({stroke: "#ffffff", "stroke-width": 2, "stroke-opacity": 1});
        oo4.transform("t730,35s0.8");
        
        r.circle(910, 50, 40).attr({stroke: "#12C2F6", "stroke-opacity": 0.8, "stroke-width": 2, "fill-opacity": 0});
        the_circle = r.circle(910, 50, 30).attr({stroke: "#12C2F6", "stroke-opacity": 0.8, "stroke-width": 2,fill: "#12C2F6", "fill-opacity": 0.3});
        
        circle_text = r.text(910, 50 , "完成").attr(type_text_params);
        
        //the_loop = draw_loop(r, 910, 50, 32, 38, "#12C2F6", 90);
        //the_loop.animate({arc: [910, 50, 32, 38, 0, 90, "#12C2F6", 0]}, 750, "elastic");
        the_loop = r.path().attr({"stroke-opacity": 0,"opacity":1, fill:"#12C2F6"}).attr({arc: [910, 50, 32, 38, 0, 90, "#12C2F6", 0]});
        
        select_2 = false,
        select_3 = false,
        select_4 = false;
        
        
        function jumpData2(){
        	parent.page_jump('pages/example_config/example_app_config.html')
        }
        
        rect_2.click(function () {
            selectData2();
            jumpData2();
        });
        text_2.click(function () {
            selectData2();
            jumpData2();
        });
        oo2.click(function () {
            selectData2();
            jumpData2();
        });
        
        
        function selectData2() {
            if (!select_2){
                select_2 = true;
                rect_2.attr({"fill-opacity": 0.8});
                //draw_loop(r, 910, 50, 32, 38, "#12C2F6", 180);
                //console.info('sss');
                the_loop.animate({arc: [910, 50, 32, 38, 0, 180, "#12C2F6", 0]}, 750, "linear");
            }
        }
        
        Process.prototype.selectData2 = selectData2;
        
        function jumpData3(){
        	parent.page_jump('pages/example_config/example_monitor_config.html')
        }
        
        rect_3.click(function () {
            selectData3();
            jumpData3();
        });
        text_3.click(function () {
            selectData3();
            jumpData3();
        });
        oo3.click(function () {
            selectData3();
            jumpData3();
        });
        
        function selectData3() {
            selectData2();
            if (!select_3){
                select_3 = true;
                rect_3.attr({"fill-opacity": 0.8});
                //draw_loop(r, 910, 50, 32, 38, "#12C2F6", 270);
                the_loop.animate({arc: [910, 50, 32, 38, 0, 270, "#12C2F6", 0]}, 750, "linear");
            }
        }
        
        Process.prototype.selectData3 = selectData3;
        
        
        function jumpData4(){
        	parent.page_jump('pages/example_config/example_show_config.html')
        }
        
        rect_4.click(function () {
            selectData4();
            jumpData4();
        });
        text_4.click(function () {
            selectData4();
            jumpData4();
        });
        oo4.click(function () {
            selectData4();
            jumpData4();
        });
        
        the_circle_flag = false;
        
        function selectData4() {
            selectData2();
            selectData3();
            if (!select_4){
                select_4 = true;
                rect_4.attr({"fill-opacity": 0.8});
                //draw_loop(r, 910, 50, 32, 38, "#12C2F6", 360);
                the_loop.animate({arc: [910, 50, 32, 38, 0,360, "#12C2F6", 0]}, 750, "linear",function () {
                    
                    the_circle_flag = true;
                    
                    the_circle.attr({
                    	"fill-opacity": 0.8,
                    	"cursor": 'pointer'
                    }).toFront();
                    circleglow = the_circle.glow({
                    	'width': 7,
                    	'color': '#444',
                    	'opacity': 0.1
                    });
//                     
                    the_circle.hover(function(){
                    	circleglow.animate({'opacity': '0.4'},550);
                    },function(){
                    	circleglow.animate({'opacity': '0.1'},550);
                    });
                    
                    circle_text.attr({
                    	"cursor": 'pointer'
                    }).toFront();
                    
                    circle_text.hover(function(){
                    	circleglow.animate({'opacity': '0.4'},550);
                    },function(){
                    	circleglow.animate({'opacity': '0.1'},550);
                    });
                    
                });
            }
        }
        
        Process.prototype.selectData4 = selectData4;
        
        the_circle.click(function () {
            finish();
        });
        circle_text.click(function () {
            finish();
        });
        
        function finish() {
            if(!the_circle_flag) return false; 
            parent.page_jump('pages/example_show/example_show.html');
        }
        
        Process.prototype.finish = finish;
        
        step == 2 && selectData2();
	    step == 3 && selectData3();
	    step == 4 && selectData4();
        
    });
}