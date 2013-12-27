/**
 * @author whenlove
 */



/*
 * 左下统计模块
 */
function draw_statistics_div(raphael, china_statis){
    var start_cx = 80;
    var start_cy = 40;
    var text_color = "#80f8eb";
    
    draw_hexagon(raphael, start_cx + 50, start_cy , 30, "#F6A972", "源地址", text_color);
    draw_hexagon(raphael, start_cx + 50, start_cy + 5 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 50, start_cy + 15, china_statis[4]).attr({fill: "#ffeeee", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 84) +  "," + (start_cy + 30) + "L" + (start_cx + 110) +  "," + (start_cy + 40)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx, start_cy + 63 , 30, "#8A654A", "捕获样本", text_color);
    draw_hexagon(raphael, start_cx, start_cy + 68 , 20, text_color ,"", text_color);
    raphael.text(start_cx, start_cy + 78, china_statis[5]).attr({fill: "#ffeeee", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 42) +  "," + (start_cy + 76) + "L" + (start_cx + 100) +  "," + (start_cy + 76)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 50, start_cy + 130 , 30, "#F09C81", "恶意代码", text_color);
    draw_hexagon(raphael, start_cx + 50, start_cy + 135 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 50, start_cy + 145, china_statis[6]).attr({fill: "#ffeeee", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 102) +  "," + (start_cy + 120) + "L" + (start_cx + 110) +  "," + (start_cy + 115)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 260, start_cy , 30, "#F09C81", "放马域名", text_color);
    draw_hexagon(raphael, start_cx + 260, start_cy + 5 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 260, start_cy + 15, china_statis[2]).attr({fill: "#ffeeee", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 230) +  "," + (start_cy + 30) + "L" + (start_cx + 204) +  "," + (start_cy + 40)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 310, start_cy + 63 , 30, "#8A654A", "放马URL", text_color);
    draw_hexagon(raphael, start_cx + 310, start_cy + 68 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 310, start_cy + 78, china_statis[1]).attr({fill: "#ffeeee", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 211) +  "," + (start_cy + 76) + "L" + (start_cx + 267) +  "," + (start_cy + 76)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 260, start_cy + 130 , 30, "#F6A972", "放马IP", text_color);
    draw_hexagon(raphael, start_cx + 260, start_cy + 135 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 260, start_cy + 145, china_statis[3]).attr({fill: "#ffeeee", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 228) +  "," + (start_cy + 125) + "L" + (start_cx + 204) +  "," + (start_cy + 115)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    raphael.rect(start_cx + 115, start_cy + 40, 84, 35, 1).attr({stroke: "#8A654A", "stroke-width": 2, "stroke-opacity": 1});
    raphael.text(start_cx + 158, start_cy + 57, "昨日境内捕获").attr({fill: "#ffeeee", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.rect(start_cx + 115, start_cy + 80, 84, 35, 1).attr({stroke: "#AD4B6C", "stroke-width": 2, "stroke-opacity": 1});
    raphael.text(start_cx + 158, start_cy + 96, china_statis[0]).attr({fill: text_color, "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
}



/*
 * 绘制六边形
 */
function draw_hexagon(R, cx, cy , r_data, color, title_text, text_color){
    // 最上点往右，共6个坐标
    var cx1 = cx,
        cy1 = cy - r_data/2,
        cx2 = cx + r_data * Math.cos(30*0.017453293),
        cy2 = cy,
        cx3 = cx2,
        cy3 = cy2 + r_data,
        cx4 = cx,
        cy4 = cy + r_data + r_data/2,
        cx5 = cx - r_data * Math.cos(30*0.017453293),
        cy5 = cy3,
        cx6 = cx - r_data * Math.cos(30*0.017453293),
        cy6 = cy,
        text_cx = (cx1 + cx2)/2,
        text_cy = (cy1 + cy2)/2;
    R.path("M" + cx1 + "," + cy1 + "L" + cx6 + "," + cy6 + "L" + cx5 + "," + cy5 + "L" + cx4 + "," + cy4 + "L" + cx3 + "," + cy3 + "L" + cx2 + "," + cy2).attr({stroke: color, "stroke-width": 2, "stroke-opacity": 1});
    R.text(text_cx + 10, text_cy, title_text).attr({fill: text_color, "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
}


/*
 * 圆环
 */
function draw_loop(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, color_0, color_1, angle) {               
                  
    // 绘制每个wind_rose花瓣的函数
    r.customAttributes.draw_wind_rose = function (cx, cy, r, R, d1, d2, the_color, type) {
        /* 
         * cx, cy为中心点坐标
         * r为内圆半径。R为wind_rose花瓣的半径，注意，不是圆的半径
         * d1起点角度
         * d2终点角度
         * the_color为wind_rose的颜色。默认为统一的 */
        d1 = d1 + 90;
        d2 = d2 + 90;
        a1 = (d1 % 360) * Math.PI / 180;
        a2 = (d2 % 360) * Math.PI / 180;
        
        /*
         * 计算四个点的坐标
         * */
        var tx1 = cx + r * Math.cos(a1);
        var ty1 = cy + r * Math.sin(a1);
        var tx2 = cx + R * Math.cos(a1);
        var ty2 = cy + R * Math.sin(a1);
        var tx3 = cx + R * Math.cos(a2);
        var ty3 = cy + R * Math.sin(a2);
        var tx4 = cx + r * Math.cos(a2);
        var ty4 = cy + r * Math.sin(a2);
        
        if(angle <180){
            if(type == 1){
                return {
                    path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 1, 1, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 1, 1, 0, tx1, ty1], ["z"]],
                    fill: the_color
                };
            }
            else{
                return {
                    path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 0, 0, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 0, 0, 0, tx1, ty1], ["z"]],
                    //fill: the_color
                    fill: the_color
                };
            }
        }
        else{
            if(type == 0){
                return {
                    path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 1, 1, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 1, 1, 0, tx1, ty1], ["z"]],
                    fill: the_color
                };
            }
            else{
                return {
                    path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 0, 0, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 0, 0, 0, tx1, ty1], ["z"]],
                    //fill: the_color
                    fill: the_color
                };
            }
        }
        
    }
    r.path().attr({draw_wind_rose: [alarm_cx, alarm_cy, alarm_r1, alarm_r2, angle, 360, color_1, 1], "stroke-opacity": 0,"opacity":1});
    r.path().attr({draw_wind_rose: [alarm_cx, alarm_cy, alarm_r1, alarm_r2, 0, angle, color_0, 0], "stroke-opacity": 0,"opacity":1});
    //path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 1, 1, 1, tx3, ty3], ["L", tx4, ty4], ["A", r, r, 1, 1, 0, tx1, ty1], ["z"]],
}

/*
 * url源告警（源ip）
 */
function alarm_src_symbol(r, alarm_cx, alarm_cy) {
    var alarm_r1 = 2;
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#AA393D" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0.2, "stroke-dasharray":""});
    var g1 = alarm_dot1.glow({color:"#D9B04C"});
    
    setTimeout(function(){remove_src_symbol(alarm_dot1, g1)},20000);
}

function remove_src_symbol(alarm_dot1, g1){
    alarm_dot1.remove();
    g1.remove();
}

/*
 * 感染告警（目的ip）
 */
function alarm_dst_symbol(r, alarm_cx, alarm_cy) {
    var alarm_r1 = 2;
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#D9B04C" ,  "opacity": 1, stroke: "#D9B04C",  "stroke-width": 0.2, "stroke-dasharray":""});
    var g1 = alarm_dot1.glow({color:"#AA393D"});
    
    setTimeout(function(){remove_dst_symbol(alarm_dot1, g1)},20000);
}

function remove_dst_symbol(alarm_dot1, g1){
    alarm_dot1.remove();
    g1.remove();
}

/*
 * url源告警（源ip）
 */
function alarm_src_symbol_hlj(r, alarm_cx, alarm_cy) {
    var alarm_r1 = 3;
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#AA393D" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0.2, "stroke-dasharray":""});
    
    setTimeout(function(){remove_src_symbol_hlj(alarm_dot1)},20000);
}

function remove_src_symbol_hlj(alarm_dot1){
    alarm_dot1.remove();
}

/*
 * 感染告警（目的ip）
 */
function alarm_dst_symbol_hlj(r, alarm_cx, alarm_cy) {
    var alarm_r1 = 3;
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#D9B04C" ,  "opacity": 1, stroke: "#D9B04C",  "stroke-width": 0.2, "stroke-dasharray":""});
    
    setTimeout(function(){remove_dst_symbol_hlj(alarm_dot1)},20000);
}

function remove_dst_symbol_hlj(alarm_dot1){
    alarm_dot1.remove();
}

/*
 * url告警，源和目的通过颜色区分
 */
function alarm_symbol(color, r, alarm_cx, alarm_cy) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: 0, fill: color ,  "opacity": 1, "stroke-opacity": 0});
    alarm_dot1.stop().animate({"opacity": 0,  r: 20}, 1500, "ase-out");
    
    setTimeout(function(){remove_symbol(alarm_dot1)},3000);
}

function remove_symbol(alarm_dot1){
    alarm_dot1.remove();
}