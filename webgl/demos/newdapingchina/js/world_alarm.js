/**
 * @author whenlove
 */

function alarm_symbol_1(r, alarm_cx, alarm_cy) {
    //attr.r = 0;
    
    var dot = r.circle(alarm_cx, alarm_cy).attr({fill: "#ff0000",  "opacity": 1, "stroke-width": 0, r: 0}),
        dot1 = r.circle(alarm_cx, alarm_cy).attr({"stroke-width": 0, r: 0});
    dot.stop().animate({r: 3}, 2000, "easeIn");
    dot1.animate({r: 15, fill: "#ff0000", "opacity": 0.6}, 2000, "backOut");
    //dot1.animate({r: 15, fill: "#C8547B", "opacity": 0}, 5000, "backOut");
    
    setTimeout(function(){stopTimerWork_1(dot, dot1)},2100);
}

function stopTimerWork_1(t_alarm_dot1, t_alarm_dot2){
    var g1 = t_alarm_dot1.glow({color:"#D9B04C"});
    t_alarm_dot2.stop().animate({r: 0,  "opacity": 0}, 500, "easeIn");
    
    setTimeout(function(){removeTimerWork_1(t_alarm_dot1, t_alarm_dot2, g1)},8000);
}


function removeTimerWork_1(t_alarm_dot1, t_alarm_dot2, g1){
    t_alarm_dot1.remove();
    t_alarm_dot2.remove();
    g1.remove();
    //console.info('remove');
}

function alarm_symbol_2(r, alarm_cx, alarm_cy) {
    var alarm_r1 = 2,
        alarm_r2 = 4,
        alarm_r3 = 5,
        alarm_r4 = 7,
        alarm_r5 = 11;
    
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#AA393D" ,  "opacity": 0.0, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":""});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"-"});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":""});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":""});
    alarm_dot1.stop().animate({"opacity": 1,  "stroke-width": 0.2}, 2000, "backOut");
    alarm_dot2.animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 2000, "backOut");
    alarm_dot3.animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 2000, "backOut");
    alarm_dot4.animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 2000, "backOut");
    alarm_dot5.animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 2000, "backOut");
    //alarm_dot5.animate({"stroke-opacity": 0.7,  "stroke-width": 1, fill: "#AA393D" ,  "opacity": 0.4}, 2000, "backOut");
    
    setTimeout(function(){stopTimerWork_2(r, alarm_cx, alarm_cy,  alarm_r2,alarm_dot1, alarm_dot2, alarm_dot3, alarm_dot4, alarm_dot5)},2100);
}

function stopTimerWork_2(r, alarm_cx, alarm_cy,  alarm_r2,t_alarm_dot1, t_alarm_dot2, t_alarm_dot3, t_alarm_dot4, t_alarm_dot5){
    //var g1 = t_alarm_dot1.glow({color:"#D9B04C"});
    var g1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#FFAC25",  "stroke-width": 0.7, "stroke-opacity": 1, "stroke-dasharray":""});
    t_alarm_dot2.stop().animate({r: 1,  "opacity": 0}, 500, "backOut");
    t_alarm_dot3.stop().animate({r: 1,  "opacity": 0}, 500, "backOut");
    t_alarm_dot4.stop().animate({r: 1,  "opacity": 0}, 500, "backOut");
    t_alarm_dot5.stop().animate({r: 1,  "opacity": 0}, 500, "backOut");
    
    setTimeout(function(){removeTimerWork_2(t_alarm_dot1, t_alarm_dot2, t_alarm_dot3, t_alarm_dot4, t_alarm_dot5, g1)},20000);
}

function removeTimerWork_2(t_alarm_dot1, t_alarm_dot2, t_alarm_dot3, t_alarm_dot4, t_alarm_dot5, g1){
    t_alarm_dot1.remove();
    t_alarm_dot2.remove();
    t_alarm_dot3.remove();
    t_alarm_dot4.remove();
    t_alarm_dot5.remove();
    g1.remove();
    //console.info('remove');
}

function alarm_symbol_new(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var symbol_set = r.set();
    
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#ff0000" ,  "opacity": 0.5, stroke: "#ff0000",  "stroke-width": 1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#AA393D",  "stroke-width": 1, "stroke-opacity": 0.7, "stroke-dasharray":"."});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#ff0000",  "stroke-width": 1, "stroke-opacity": 0.9, "stroke-dasharray":"- "});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#AA393D",  "stroke-width": 1, "stroke-opacity": 0.7, "stroke-dasharray":"."});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#ff0000",  "stroke-width": 1, "stroke-opacity": 0.9, "stroke-dasharray":"- "});
    //alarm_dot1.stop().animate({"opacity": 0.5,  "stroke-width": 1}, 100, "elastic");
    //alarm_dot2.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 100, "elastic");
    //alarm_dot3.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 100, "elastic");
    //alarm_dot4.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 100, "elastic");
    //alarm_dot5.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 100, "elastic");
    
    symbol_set.push(alarm_dot1);
    symbol_set.push(alarm_dot2);
    symbol_set.push(alarm_dot3);
    symbol_set.push(alarm_dot4);
    symbol_set.push(alarm_dot5);
    
    return symbol_set;
}

/*
 * 圆环轮状告警标示
 */
function alarm_symbol(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_sectorsCount, color_0, color_1,color_2) {               
    //console.info("ttt");
    // 绘制每个wind_rose花瓣的函数
    r.customAttributes.draw_wind_rose = function (cx, cy, r, R, d1, d2, the_color) {
        /* 
         * cx, cy为中心点坐标
         * r为内圆半径。R为wind_rose花瓣的半径，注意，不是圆的半径
         * d1起点角度
         * d2终点角度
         * the_color为wind_rose的颜色。默认为统一的 */
        d1 = d1 + 270;
        d2 = d2 + 270;
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
        
        return {
            path: [["M", tx1, ty1], ["L", tx2, ty2], ["A", R, R, 0, 0, 1, tx3, ty3], ["L", tx4, ty4], ["z"]],
            //fill: the_color
            fill: the_color
        };
    }             
    
    var alarm_sectors = [],
        color_3 = "",
        alarm_start_angle = 0,//起始角度
        //每个花瓣的角度
        alarm_val = 360/alarm_sectorsCount,
        symbol_set = r.set();
    
    alarm_dot1 = r.circle(alarm_cx, alarm_cy, alarm_r1).attr({fill: color_0 ,  "stroke-width": 0}),
    alarm_dot2 = r.circle(alarm_cx, alarm_cy, alarm_r2).attr({stroke: color_1,  "stroke-width": 4, "stroke-opacity": 0.9 }),
    alarm_dot3 = r.circle(alarm_cx, alarm_cy, alarm_r3).attr({stroke: color_0,  "stroke-width": 4}),
    //alarm_dot1.stop().animate({r: alarm_r1}, 20, "elastic");
    //alarm_dot2.stop().animate({r: alarm_r2}, 20, "elastic");
    //alarm_dot3.stop().animate({r: alarm_r3}, 20, "elastic");
    
    symbol_set.push(alarm_dot1, alarm_dot2, alarm_dot3);
    
    for (i = 0; i < alarm_sectorsCount; i++) {
        (function (i, val) {
            if(i%2 == 0){
                alarm_sectors[i] = r.path().attr({draw_wind_rose: [alarm_cx, alarm_cy, alarm_r3-2, alarm_r3+2, alarm_start_angle, alarm_start_angle + alarm_val, color_1], stroke: color_1, "stroke-width": 2,"opacity":0.5});
            }
            else{
                alarm_sectors[i] = r.path().attr({draw_wind_rose: [alarm_cx, alarm_cy, alarm_r3-2, alarm_r3+2, alarm_start_angle, alarm_start_angle + alarm_val, color_2], stroke: color_1, "stroke-width": 0,"opacity":0.5});
            }
        })(i, alarm_val);
        alarm_start_angle += alarm_val;
        
        symbol_set.push(alarm_sectors[i]);
    }
    
    // var tick;
    // (function ticker() {
        // for (var i = 0; i < alarm_sectorsCount; i++) {
            // if(i%2 == 0){
                // alarm_sectors[i].attr("fill", color_2);
            // }
            // else{
                // alarm_sectors[i].attr("fill", color_1);
            // }
        // }
        // color_3 = color_1;
        // color_1 = color_2;
        // color_2 = color_3;
        // r.safari();
        // tick = setTimeout(ticker, 250);
    // })();
    
    return symbol_set;
}

function alarm_circle_1(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#ff0000" ,  "opacity": 0.0, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#DB1D2B",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"."});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"- "});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#DB1D2B",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"."});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"- "});
    
    var anim_1 = Raphael.animation({"opacity": 0.5,  "stroke-width": 1}, "elastic");
    alarm_dot1.animate(anim_1.delay(100));
    var anim_2 = Raphael.animation({"stroke-opacity": 0.9,  "stroke-width": 1}, "elastic");
    alarm_dot2.animate(anim_2.delay(150));
    var anim_3 = Raphael.animation({"stroke-opacity": 0.9,  "stroke-width": 1}, "elastic");
    alarm_dot3.animate(anim_3.delay(200));
    var anim_4 = Raphael.animation({"stroke-opacity": 0.9,  "stroke-width": 1}, "elastic");
    alarm_dot4.animate(anim_4.delay(250));
    var anim_5 = Raphael.animation({"stroke-opacity": 0.9,  "stroke-width": 1}, "elastic");
    alarm_dot5.animate(anim_5.delay(300));
    
    setTimeout(function(){timerWork(alarm_dot1, alarm_dot2, alarm_dot3,alarm_dot4,alarm_dot5)},6000);
}

function alarm_circle_2(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#ff0000" ,  "opacity": 0.0, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"."});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"- "});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"."});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"- "});
    alarm_dot1.stop().animate({"opacity": 0.5,  "stroke-width": 1}, 500, "elastic");
    alarm_dot2.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 1500, "elastic");
    alarm_dot3.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 3000, "elastic");
    alarm_dot4.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 4000, "elastic");
    alarm_dot5.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 5000, "elastic");
    
    setTimeout(function(){timerWork(alarm_dot1, alarm_dot2, alarm_dot3,alarm_dot4,alarm_dot5)},6000);
}

function alarm_circle_3(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({fill: "#ff0000" ,  "opacity": 0.5, stroke: "#ff0000",  "stroke-width": 1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({stroke: "#AA393D",  "stroke-width": 1, "stroke-opacity": 1, "stroke-dasharray":"."});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({stroke: "#ff0000",  "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"- "});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({stroke: "#AA393D",  "stroke-width": 1, "stroke-opacity": 1, "stroke-dasharray":"."});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({stroke: "#ff0000",  "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"- "});
    alarm_dot1.stop().animate({r: alarm_r1}, 2000, "elastic");
    alarm_dot2.stop().animate({r: alarm_r2}, 2000, "elastic");
    alarm_dot3.stop().animate({r: alarm_r3}, 2000, "elastic");
    alarm_dot4.stop().animate({r: alarm_r4}, 2000, "elastic");
    alarm_dot5.stop().animate({r: alarm_r5}, 2000, "elastic");
    
    

    
    setTimeout(function(){timerWork(alarm_dot1, alarm_dot2, alarm_dot3,alarm_dot4,alarm_dot5)},6000);
}

function alarm_circle_4(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#D9B04C" ,  "opacity": 0.0, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":""});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"-"});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":""});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":""});
    alarm_dot1.stop().animate({"opacity": 1,  "stroke-width": 0.2}, 500, "elastic");
    alarm_dot2.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 1500, "elastic");
    alarm_dot3.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 3000, "elastic");
    alarm_dot4.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 3000, "elastic");
    alarm_dot5.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1, fill: "#AA393D" ,  "opacity": 0.4}, 3000, "elastic");
    
    setTimeout(function(){timerWork(alarm_dot1, alarm_dot2, alarm_dot3,alarm_dot4,alarm_dot5)},6000);
}

function static_source_alarm(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#ff0000" ,  "opacity": 0.5, stroke: "#ff0000",  "stroke-width": 1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#AA393D",  "stroke-width": 0.5, "stroke-opacity": 1, "stroke-dasharray":"."});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#ff0000",  "stroke-width": 1, "stroke-opacity": 1, "stroke-dasharray":"- "});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#AA393D",  "stroke-width": 0.5, "stroke-opacity": 1, "stroke-dasharray":"."});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#ff0000",  "stroke-width": 1.5, "stroke-opacity": 1, "stroke-dasharray":"- "});
}

function static_target_alarm(r, alarm_cx, alarm_cy, alarm_r1, alarm_r2, alarm_r3, alarm_r4, alarm_r5) {
    var alarm_dot1 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r1, fill: "#ff0000" ,  "opacity": 0.0, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-dasharray":""});
    var alarm_dot2 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r2, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"."});
    var alarm_dot3 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r3, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"- "});
    var alarm_dot4 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r4, stroke: "#AA393D",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"."});
    var alarm_dot5 = r.circle(alarm_cx, alarm_cy).attr({r: alarm_r5, stroke: "#ff0000",  "stroke-width": 0.1, "stroke-opacity": 0.1, "stroke-dasharray":"- "});
    alarm_dot1.stop().animate({"opacity": 0.5,  "stroke-width": 1}, 100, "elastic");
    alarm_dot2.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 100, "elastic");
    alarm_dot3.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 100, "elastic");
    alarm_dot4.stop().animate({"stroke-opacity": 0.7,  "stroke-width": 1}, 100, "elastic");
    alarm_dot5.stop().animate({"stroke-opacity": 0.9,  "stroke-width": 1}, 100, "elastic");
}

function timerWork(t_alarm_dot1, t_alarm_dot2, t_alarm_dot3,t_alarm_dot4,t_alarm_dot5){
    t_alarm_dot1.remove();
    t_alarm_dot2.remove();
    t_alarm_dot3.remove();
    t_alarm_dot4.remove();
    t_alarm_dot5.remove();
}
