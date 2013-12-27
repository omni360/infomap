/**
 * @author whenlove
 */


/*
 * 中间
 */
Raphael("raphael_div", 1900, 1060, function () {
    var raphael = this,
        r_width = 1900,
        r_height = 1060,
        R;
        
    for (var i = 0; i < 800; i++) {
        var cx = Math.random() * r_width;
        var cy = Math.random() * r_height;
        
        if(Math.random() > 0.7){
            R = 2;
        }
        else{
            R = 1;
        }
        
        //var max = Math.round(cx / 2) - 1;
        //var color = "hsb(" + [Math.random(), Math.random(), Math.random()] + ")";
        
        raphael.circle(cx, cy, R).attr({fill: "#E7F9FD", "stroke-width": 0, "opacity": 0.8});
    }
    
    /*
    raphael.circle(r_width / 2, r_height / 2).attr({r: 320, "opacity": 0.8, stroke: "#25C3FD",  "stroke-width": 2, "stroke-opacity": 1}).glow({color:"#25C3FD", width:8, opacity:0.25});
    raphael.circle(r_width / 2, r_height / 2).attr({r: 324, "opacity": 0.6, stroke: "#25C3FD",  "stroke-width": 2, "stroke-opacity": 1}).glow({color:"#ffffff", width:8, opacity:0.25});
    raphael.circle(r_width / 2, r_height / 2).attr({r: 328, "opacity": 0.8, stroke: "#25C3FD",  "stroke-width": 2, "stroke-opacity": 1}).glow({color:"#25C3FD", width:8, opacity:0.25});
    raphael.circle(r_width / 2, r_height / 2).attr({r: 350, "opacity": 0.6, stroke: "#25C3FD",  "stroke-width": 2, "stroke-opacity": 1}).glow({color:"#ffffff", width:8, opacity:0.25});
    raphael.circle(r_width / 2, r_height / 2).attr({r: 354, "opacity": 0.8, stroke: "#25C3FD",  "stroke-width": 2, "stroke-opacity": 1}).glow({color:"#25C3FD", width:8, opacity:0.25});
     
    raphael.rect(500, r_height / 2, 920, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    */
    
    // raphael.rect(350, r_height / 2, 100, 3, 0).attr({
        // "stroke-width": 0,
        // fill: "#0F89A8",
        // "fill-opacity": 0.8
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    // raphael.rect(1470, r_height / 2, 100, 3, 0).attr({
        // "stroke-width": 0,
        // fill: "#0F89A8",
        // "fill-opacity": 0.8
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    /*
    raphael.path("M475 500S478 400 480 350S483 300 485 250").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    raphael.path("M475 570S478 670 480 720S483 770 485 820").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    raphael.path("M1445 500S1442 400 1440 350S1437 300 1435 250").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    raphael.path("M1445 570S1442 670 1440 720S1437 770 1435 820").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    */
    
    
    /*
    raphael.path("M75 529S78 400 80 350S83 300 85 250S88 210 95 150").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    raphael.path("M75 531S78 670 80 720S83 770 85 820S88 880 95 920").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    
    
    
    raphael.path("M85 250L205 250").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M85 240L205 240").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M78 400L138 400").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M78 410L138 410").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M78 660L138 660").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M78 670L138 670").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M85 820L205 820").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M85 810L205 810").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    
    
    
    
    raphael.path("M1845 529S1842 400 1840 350S1837 300 1835 250S1832 210 1825 150").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    raphael.path("M1845 531S1842 670 1840 720S1837 770 1835 820S1832 880 1825 920").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:8, opacity:0.25});
    
    raphael.path("M1835 250L1715 250").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M1835 240L1715 240").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    
    raphael.path("M1842 400L1782 400").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M1842 410L1782 410").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M1842 660L1782 660").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M1842 670L1782 670").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M1835 820L1715 820").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    raphael.path("M1835 810L1715 810").attr({
        "stroke-width": 0,
        fill: "#0096D4",
        "fill-opacity": 0.6
        , stroke: "#0096D4",  "stroke-width": 3, "stroke-opacity": 0.6
    }).glow({color:"#ffffff", width:4, opacity:0.25});
    */
    
});

function draw_logo(r, cx, cy, color){
    r.path('M{0},{1},L{2},{3}L{4},{5}Z',cx+1,cy,cx+13,cy,cx+7,cy+10).attr({fill:color});
    
    r.path('M{0},{1},L{2},{3}L{4},{5}Z',cx-1,cy,cx-13,cy,cx-7,cy+10).attr({fill:color});
    
    r.path('M{0},{1},L{2},{3}L{4},{5}Z',cx,cy-1,cx-6,cy+11,cx+6,cy+11).attr({fill:color});
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
    R.path("M" + cx1 + "," + cy1 + "L" + cx6 + "," + cy6 + "L" + cx5 + "," + cy5 + "L" + cx4 + "," + cy4 + "L" + cx3 + "," + cy3 + "L" + cx2 + "," + cy2 + "z").attr({stroke: color, "stroke-width": 2, "stroke-opacity": 1});
    
    r_data = r_data - 7;
    cy = cy + 3;
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
        text_cx = cx1,
        text_cy = (cy1 + cy4)/2;
    R.path("M" + cx1 + "," + cy1 + "L" + cx6 + "," + cy6 + "L" + cx5 + "," + cy5 + "L" + cx4 + "," + cy4 + "L" + cx3 + "," + cy3 + "L" + cx2 + "," + cy2 + "z").attr(
        {stroke: color, "stroke-width": 4, "stroke-opacity": 1});
    
    R.text(text_cx, text_cy, title_text).attr({fill: text_color, "font-size":16, "font-weight": "bold", "font-family": "微软雅黑"});
}

function drawAngle(raphael, cx, cy, R, d1, d2, the_color, type) {
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
    var tx2 = cx + R * Math.cos(a1);
    var ty2 = cy + R * Math.sin(a1);
    var tx3 = cx + R * Math.cos(a2);
    var ty3 = cy + R * Math.sin(a2);
    if(type == 0){
        raphael.path("M" + tx2 + " " + ty2 + "A" + " " + R + " " +  R + " 1 1 1 " +  tx3+ " " +  ty3).attr({ stroke: the_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    }
    else{
        raphael.path("M" + tx2 + " " + ty2 + "A" + " " + R + " " +  R + " 0 0 1 " +  tx3+ " " +  ty3).attr({ stroke: the_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    }
}

function drawAll(raphael, cx, cy,r, R, d1, d2, the_color, type, tx4) {
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
    var tx1 = cx + r * Math.cos(a2);
    var ty1 = cy + r * Math.sin(a2);
    var tx2 = cx + R * Math.cos(a1);
    var ty2 = cy + R * Math.sin(a1);
    var tx3 = cx + R * Math.cos(a2);
    var ty3 = cy + R * Math.sin(a2);
    
    raphael.path("M" + tx1 + " " + ty1 + "L" + tx3 + " " +  ty3).attr({ stroke: the_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    
    raphael.path("M" + tx4 + " " + ty2 + "L" + tx2 + " " +  ty2).attr({ stroke: the_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    
    if(type == 0){
        raphael.path("M" + tx2 + " " + ty2 + "A" + " " + R + " " +  R + " 1 1 1 " +  tx3+ " " +  ty3).attr({ stroke: the_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    }
    else{
        raphael.path("M" + tx2 + " " + ty2 + "A" + " " + R + " " +  R + " 0 0 1 " +  tx3+ " " +  ty3).attr({ stroke: the_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    }
    
    return ty2
}

function drawPolygon(raphael, cx, cy, r, R1, d1, R2, d2,R3,d3,R4,d4,R5,d5,R6,d6, the_color, type) {
    d1 = d1 + 270;
    d2 = d2 + 270;
    d3 = d3 + 270;
    d4 = d4 + 270;
    d5 = d5 + 270;
    d6 = d6 + 270;
    a1 = (d1 % 360) * Math.PI / 180;
    a2 = (d2 % 360) * Math.PI / 180;
    a3 = (d3 % 360) * Math.PI / 180;
    a4 = (d4 % 360) * Math.PI / 180;
    a5 = (d5 % 360) * Math.PI / 180;
    a6 = (d6 % 360) * Math.PI / 180;
    
    var tx7 = cx + r * Math.cos(a1);
    var ty7 = cy + r * Math.sin(a1);
    
    var tx8 = cx + r * Math.cos(a6);
    var ty8 = cy + r * Math.sin(a6);
    
    var tx1 = cx + R1 * Math.cos(a1);
    var ty1 = cy + R1 * Math.sin(a1);
    var tx2 = cx + R2 * Math.cos(a2);
    var ty2 = cy + R2 * Math.sin(a2);
    var tx3 = cx + R3 * Math.cos(a3);
    var ty3 = cy + R3 * Math.sin(a3);
    var tx4 = cx + R4 * Math.cos(a4);
    var ty4 = cy + R4 * Math.sin(a4);
    var tx5 = cx + R5 * Math.cos(a5);
    var ty5 = cy + R5 * Math.sin(a5);
    var tx6 = cx + R6 * Math.cos(a6);
    var ty6 = cy + R6 * Math.sin(a6);
    
    raphael.path("M" + tx1 + " " + ty1 + "L" + tx2 + " " +  ty2 + "L" + tx3 + " " +  ty3 + "L" + tx4 + " " +  ty4
     + "L" + tx5 + " " +  ty5 + "L" + tx6 + " " +  ty6  + "L" + tx8 + " " +  ty8
     + "A" + " " + r + " " +  r + " 0 0 0 " +  tx7+ " " +  ty7 +"z").attr({ fill: the_color, "stroke-opacity": 0,"opacity":0.8});
    
}
                
function drawTower (rap, circle_x, circle_y, storke_color, width,height,r1,r2,r3) {
    var tower_x = circle_x,
        tower_y = circle_y + 5
    
    
    var left_x = tower_x - width,
        left_y = tower_y + height,
        right_x = tower_x + width,
        right_y = tower_y + height;
    
    var r_set = rap.set();
    
    r_set.push(rap.path("M" + tower_x + "," + tower_y + "L" + left_x + "," + left_y).attr({stroke: storke_color, "stroke-width": 2, "stroke-opacity": 1}));
    r_set.push(rap.path("M" + tower_x + "," + tower_y + "L" + right_x + "," + right_y).attr({stroke: storke_color, "stroke-width": 2, "stroke-opacity": 1}));
    
    var left_middle_1_x = (tower_x + left_x)/2;
    var left_middle_1_y = (tower_y + left_y)/2;
    var right_middle_1_x = (tower_x + right_x)/2;
    var right_middle_1_y = (tower_y + right_y)/2;
    r_set.push(rap.path("M" + left_middle_1_x + "," + left_middle_1_y + "L" + right_middle_1_x + "," + right_middle_1_y).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    
    var left_middle_2_x = (tower_x + left_middle_1_x)/2;
    var left_middle_2_y = (tower_y + left_middle_1_y)/2;
    var right_middle_2_x = (tower_x + right_middle_1_x)/2;
    var right_middle_2_y = (tower_y + right_middle_1_y)/2;
    r_set.push(rap.path("M" + left_middle_2_x + "," + left_middle_2_y + "L" + right_middle_2_x + "," + right_middle_2_y).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    
    var left_middle_3_x = (left_x + left_middle_1_x)/2;
    var left_middle_3_y = (left_y + left_middle_1_y)/2;
    var right_middle_3_x = (right_x + right_middle_1_x)/2;
    var right_middle_3_y = (right_y + right_middle_1_y)/2;
    r_set.push(rap.path("M" + left_middle_3_x + "," + left_middle_3_y + "L" + right_middle_3_x + "," + right_middle_3_y).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    
    
    
    r_set.push(rap.circle(circle_x, circle_y).attr({stroke: storke_color,"stroke-width": 2, r: 5}).glow({color:storke_color,opacity:0.6}));
    
    var d1 = 35,
        d2 = 145,
        d3 = 215,
        d4 = 325,
        R1 = r1,
        R2 = r2,
        R3 = r3;
    
    d1 = d1 + 270;
    d2 = d2 + 270;
    a1 = (d1 % 360) * Math.PI / 180;
    a2 = (d2 % 360) * Math.PI / 180;
    
    d3 = d3 + 270;
    d4 = d4 + 270;
    a3 = (d3 % 360) * Math.PI / 180;
    a4 = (d4 % 360) * Math.PI / 180;
    
    var tx1R1 = circle_x + R1 * Math.cos(a1);
    var ty1R1 = circle_y + R1 * Math.sin(a1);
    var tx2R1 = circle_x + R1 * Math.cos(a2);
    var ty2R1 = circle_y + R1 * Math.sin(a2);
    
    var tx1R2 = circle_x + R2 * Math.cos(a1);
    var ty1R2 = circle_y + R2 * Math.sin(a1);
    var tx2R2 = circle_x + R2 * Math.cos(a2);
    var ty2R2 = circle_y + R2 * Math.sin(a2);
    
    var tx1R3 = circle_x + R3 * Math.cos(a1);
    var ty1R3 = circle_y + R3 * Math.sin(a1);
    var tx2R3 = circle_x + R3 * Math.cos(a2);
    var ty2R3 = circle_y + R3 * Math.sin(a2);
    
    r_set.push(rap.path("M" + tx1R1 + "," + ty1R1 + "A" + R1 + ", " + R1 + ", 0, 0, 1," + tx2R1 + "," + ty2R1).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    r_set.push(rap.path("M" + tx1R2 + "," + ty1R2 + "A" + R2 + ", " + R2 + ", 0, 0, 1," + tx2R2 + "," + ty2R2).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    r_set.push(rap.path("M" + tx1R3 + "," + ty1R3 + "A" + R3 + ", " + R3 + ", 0, 0, 1," + tx2R3 + "," + ty2R3).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}).glow({color:storke_color,opacity:0.6}));
    
    var tx3R1 = circle_x + R1 * Math.cos(a3);
    var ty3R1 = circle_y + R1 * Math.sin(a3);
    var tx4R1 = circle_x + R1 * Math.cos(a4);
    var ty4R1 = circle_y + R1 * Math.sin(a4);
    
    var tx3R2 = circle_x + R2 * Math.cos(a3);
    var ty3R2 = circle_y + R2 * Math.sin(a3);
    var tx4R2 = circle_x + R2 * Math.cos(a4);
    var ty4R2 = circle_y + R2 * Math.sin(a4);
    
    var tx3R3 = circle_x + R3 * Math.cos(a3);
    var ty3R3 = circle_y + R3 * Math.sin(a3);
    var tx4R3 = circle_x + R3 * Math.cos(a4);
    var ty4R3 = circle_y + R3 * Math.sin(a4);
    
    r_set.push(rap.path("M" + tx3R1 + "," + ty3R1 + "A" + R1 + ", " + R1 + ", 0, 0, 1," + tx4R1 + "," + ty4R1).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    r_set.push(rap.path("M" + tx3R2 + "," + ty3R2 + "A" + R2 + ", " + R2 + ", 0, 0, 1," + tx4R2 + "," + ty4R2).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}));
    r_set.push(rap.path("M" + tx3R3 + "," + ty3R3 + "A" + R3 + ", " + R3 + ", 0, 0, 1," + tx4R3 + "," + ty4R3).attr({stroke: storke_color, "stroke-width": 1, "stroke-opacity": 1}).glow({color:storke_color,opacity:0.6}));
    
    return r_set;
}


/*
 * 左侧
 */
Raphael(70, 180, 480, 750, function () {
    var raphael = this,
        r_width = 480,
        r_height = 750;
    
    raphael.rect(0, 0, r_width, r_height, 0).attr({
        "stroke-width": 0,
        //fill: "#0E1519",
        fill: "#25C3FD",
        "fill-opacity": 0.1,
        stroke: "#ffffff"
    });
    
    //数据总揽
    raphael.rect(0, 33, r_width, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    raphael.rect(0, 40, r_width, 1, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        // fill: "#13748D",
        "fill-opacity": 1
    });
    
    //draw_logo(raphael, 30, 12, "#A7EDF3");
    
    raphael.rect(22, 8, 1, 20, 0).attr({
        "stroke-width": 0,
        fill: "#31474E",
        "fill-opacity": 1
    });
    
    raphael.text(35, 17, "数据总揽").attr({fill: "#C3CFD1", "font-size":15, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    raphael.rect(30, 50, 200, 200, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 0.15
    });
    
    draw_hexagon(raphael, 130, 120 , 60, "#C4D2D5", "中国", "#C4D2D5");
    
    raphael.rect(260, 80, 130, 1, 0).attr({
        "stroke-width": 0,
        fill: "#13748D",
        "fill-opacity": 1
    });
    raphael.text(265, 70, "URL总数  : 1,234,787").attr({fill: "#80DCEA", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    raphael.rect(310, 120, 130, 1, 0).attr({
        "stroke-width": 0,
        fill: "#13748D",
        "fill-opacity": 1
    });
    raphael.text(315, 110, "恶意代码检出数  : 9,522").attr({fill: "#80DCEA", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    raphael.rect(260, 160, 130, 1, 0).attr({
        "stroke-width": 0,
        fill: "#13748D",
        "fill-opacity": 1
    });
    raphael.text(265, 150, "探针数  : 1,014").attr({fill: "#80DCEA", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    raphael.rect(310, 200, 130, 1, 0).attr({
        "stroke-width": 0,
        fill: "#13748D",
        "fill-opacity": 1
    });
    raphael.text(315, 190, "源地址  : 38,967").attr({fill: "#80DCEA", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    raphael.rect(260, 240, 130, 1, 0).attr({
        "stroke-width": 0,
        fill: "#13748D",
        "fill-opacity": 1
    });
    raphael.text(265, 230, "目标地址  : 34,754").attr({fill: "#80DCEA", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    
    //高危域名
    raphael.rect(0, 300, r_width, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    raphael.rect(0, 307, r_width, 1, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        // fill: "#13748D",
        "fill-opacity": 1
    });
    
    //draw_logo(raphael, 30, 272, "#A7EDF3");
    
    raphael.rect(22, 275, 1, 20, 0).attr({
        "stroke-width": 0,
        fill: "#31474E",
        "fill-opacity": 1
    });
    
    raphael.text(35, 284, "高危域名").attr({fill: "#C3CFD1", "font-size":15, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    
    //趋势图
    var angle_color = "#E11668";
    //var angle_color = "#782657";
    var cx = 130,
        cy = 440,
        sectorsCount = 20,
        beta = 2 * Math.PI / sectorsCount,
        angle = 0,
        temp_angle = 360 / sectorsCount;
    
    raphael.circle(cx, cy, 35).attr({fill: angle_color, "stroke-width": 0, "opacity": 1});
    raphael.text(130, 440, "高危域名").attr({fill: "#FFFFFF", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
    
    var num_data = [1,2,3,4,5,6,7,9,10,11,13,14,15,17,18,20,22,25,29,30];
    
    for (var i = 0; i < sectorsCount; i++) {
        var alpha = beta * i - Math.PI / 2,
            cos = Math.cos(alpha),
            sin = Math.sin(alpha);
        
        angle = angle + temp_angle;
        
        r3 = 55;
        //if(i%2 == 0){
            if(i == 0){
                raphael.text(cx + r3 * cos, cy + r3 * sin, num_data[i]).attr({fill: "#ffffff", "font-size":7});
            }
            else{
                raphael.text(cx + r3 * cos, cy + r3 * sin, num_data[i]).attr({fill: "#ffffff", "font-size":7}).transform("r" + angle);
            }
        //}
    }
    
    
    drawAngle(raphael, cx, cy, 65, 210, 330, angle_color, 1);
    var ty = drawAll(raphael, cx, cy, 65, 110, 90, 210, angle_color, 1, 290);
    raphael.path("M" + 290 + " " + ty + "L" + 310 + " " +  (ty - 90)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.path("M" + 310 + " " + (ty - 90) + "L" + 340 + " " +  (ty - 90)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.text(350, (ty - 90), "xasrc.ctfs.ftn.qq.com").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold", "text-anchor":"start"});
    
    var ty = drawAll(raphael, cx, cy, 65, 113, 92, 225, angle_color, 1, 290);
    raphael.path("M" + 290 + " " + ty + "L" + 310 + " " +  (ty - 60)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.path("M" + 310 + " " + (ty - 60) + "L" + 340 + " " +  (ty - 60)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.text(350, (ty - 60), "download.cpudln.com").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold", "text-anchor":"start"});
    
    var ty = drawAll(raphael, cx, cy, 65, 116, 94, 260, angle_color, 1, 290);
    raphael.path("M" + 290 + " " + ty + "L" + 310 + " " +  (ty - 30)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.path("M" + 310 + " " + (ty - 30) + "L" + 340 + " " +  (ty - 30)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.text(350, (ty - 30), "webdiskdtj.store.qq.com").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold",  "text-anchor":"start"});
    
    var ty = drawAll(raphael, cx, cy, 65, 119, 96, 290, angle_color, 0, 290);
    raphael.path("M" + 290 + " " + ty + "L" + 310 + " " +  (ty + 10)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.path("M" + 310 + " " + (ty + 10) + "L" + 340 + " " +  (ty + 10)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.text(350, (ty + 10), "znwt.jz5u.com").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold",  "text-anchor":"start"});
    
    var ty = drawAll(raphael, cx, cy, 65, 122, 98, 310, angle_color, 0, 290);
    raphael.path("M" + 290 + " " + ty + "L" + 310 + " " +  (ty + 30)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.path("M" + 310 + " " + (ty + 30) + "L" + 340 + " " +  (ty + 30)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.text(350, (ty + 30), "down.zhuoku.com").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold", "text-anchor":"start"});
    
    var ty = drawAll(raphael, cx, cy, 65, 125, 100, 330, angle_color, 0, 290);
    raphael.path("M" + 290 + " " + ty + "L" + 310 + " " +  (ty + 60)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.path("M" + 310 + " " + (ty + 60) + "L" + 340 + " " +  (ty + 60)).attr({ stroke: angle_color, "stroke-width": 1.5, "stroke-opacity": 1,"opacity":1});
    raphael.text(350, (ty + 60), "dl.airplayme.com").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold", "text-anchor":"start"});
    
    drawPolygon(raphael, cx, cy, 65, 70, 210, 88, 225, 99, 260, 97, 290, 86, 310, 80, 330, angle_color, 0);
    
    //探针流量排行
    raphael.rect(0, 623, r_width, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    raphael.rect(0, 630, r_width, 1, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        // fill: "#13748D",
        "fill-opacity": 1
    });
    
    //draw_logo(raphael, 30, 602, "#A7EDF3");
    
    raphael.rect(22, 598, 1, 20, 0).attr({
        "stroke-width": 0,
        fill: "#31474E",
        "fill-opacity": 1
    });
    
    raphael.text(35, 607, "各省探针流量排行").attr({fill: "#C3CFD1", "font-size":15, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    /*
    drawTower(raphael, 50,660, "#00BFF3", 20, 50,10,15,20);
    drawTower(raphael, 120,675, "#25C3FD", 14, 35,7,10.5,14);
    drawTower(raphael, 184,675, "#00BFF3", 14, 35,7,10.5,14);
    drawTower(raphael, 242,680, "#25C3FD", 12, 30,6,9,12);
    drawTower(raphael, 292,690, "#25C3FD", 10, 20,5,7.5,10);
    drawTower(raphael, 340,694, "#25C3FD", 8, 15,4,6,8);
    drawTower(raphael, 388,694, "#25C3FD", 8, 15,4,6,8);
    drawTower(raphael, 432,694, "#25C3FD", 8, 15,4,6,8);
    */
    
    var dev_num = 0,
        max_dev_num = 0,
        pro_dev_perhour = 0,
        max_pro_dev_perhour = 0;
    
    for (x in vds_data) { 
        monitor_data = vds_data[x];
        dev_num = monitor_data["dev_num"];
        pro_dev_perhour = monitor_data["pro_dev_perhour"];
        if(dev_num > max_dev_num){
            max_dev_num = dev_num;
        }
        if(pro_dev_perhour > max_pro_dev_perhour){
            max_pro_dev_perhour = pro_dev_perhour;
        }
        
    }
    
    var h_cx = 30,
        h_cy = 650,
        h_height = 0,
        t_cy = 660,
        t_height = 0;
    
    for (x in vds_data) {
        //流量
        h_height = (vds_data[x]["pro_dev_perhour"]/max_pro_dev_perhour) * 70;
        if(h_height > 70){
            h_height = 70;
        }
        if(h_height < 1){
            h_height = 1;
        }
        raphael.rect(h_cx, h_cy + (70 - h_height), 10, h_height, 0).attr({
            "stroke-width": 0,
            fill: "#25C3FD",
            "fill-opacity": 1
        });
        raphael.text(h_cx, 732, vds_data[x]["name"]).attr({fill: "#C3CFD1", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
        
        //探针数量
        t_height = (vds_data[x]["dev_num"]/max_dev_num)*20;
        raphael.rect(h_cx, t_cy - t_height, 10, 3, 0).attr({
            "stroke-width": 0,
            fill: "#E11668",
            "fill-opacity": 1
        });
        
        h_cx = h_cx + 12;
    }
    
    //图例
    raphael.rect(420, 660, 45, 5, 0).attr({
        "stroke-width": 0,
        fill: "#E11668",
        "fill-opacity": 1
    });
    raphael.text(420, 675, "探针数量").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    raphael.rect(420, 700, 45, 5, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(420, 715, "捕获流量").attr({fill: "#C3CFD1", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    // for (var i = 0; i < 32; i++) {
//         
        // h_height = Math.random() * 80;
        // if(h_height > 80){
            // h_height = 80;
        // }
//         
        // raphael.rect(h_cx, h_cy + (80 - h_height), 10, h_height, 0).attr({
            // "stroke-width": 0,
            // fill: "#25C3FD",
            // "fill-opacity": 1
        // });
        // h_cx = h_cx + 12;
    // }
    
    //draw_wind_rose(raphael, 80, 500, 30, 0, 270, "#075675");
    
    // raphael.rect(8, 60, 6, 6, 0).attr({
        // "stroke-width": 0,
        // fill: "#13748D",
        // "fill-opacity": 1
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
//     
    // raphael.rect(345, 60, 6, 6, 0).attr({
        // "stroke-width": 0,
        // fill: "#13748D",
        // "fill-opacity": 1
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
//     
    // raphael.rect(8, 260, 6, 6, 0).attr({
        // "stroke-width": 0,
        // fill: "#13748D",
        // "fill-opacity": 1
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
//     
    // raphael.rect(345, 260, 6, 6, 0).attr({
        // "stroke-width": 0,
        // fill: "#13748D",
        // "fill-opacity": 1
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
//     
    // raphael.rect(8, 450, 6, 6, 0).attr({
        // "stroke-width": 0,
        // fill: "#13748D",
        // "fill-opacity": 1
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
//     
    // raphael.rect(345, 450, 6, 6, 0).attr({
        // "stroke-width": 0,
        // fill: "#13748D",
        // "fill-opacity": 1
    // }).glow({color:"#ffffff", width:8, opacity:0.25});
    
});



/*
 * 底部操作栏
 */
Raphael(660, 890, 700, 100, function () {
    var raphael = this;
    raphael.rect(0, 0, 700, 100, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 0.1
    });
    
    raphael.rect(40, 40, 520, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    raphael.rect(40, 60, 520, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    var now_select = raphael.circle(500, 52).attr({r: 9, fill: "#E5E5E5" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0});
    var old_select_id = 5;
    var year = "1996";
    
    raphael.circle(100, 52).attr({r: 5, fill: "#25C3FD" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0});
    var select_1 = raphael.circle(100, 52).attr({r: 16, fill: "#13748D" ,  "opacity": 0, stroke: "#ff0000",  "stroke-width": 0});
    select_1.click(function () {
        moveButton(1);
        year = "1992";
        selectCountry();
    });
    raphael.text(100, 75 , "2012/10").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    
    raphael.circle(200, 52).attr({r: 5, fill: "#25C3FD" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0});
    var select_2 = raphael.circle(200, 52).attr({r: 16, fill: "#13748D" ,  "opacity": 0, stroke: "#ff0000",  "stroke-width": 0});
    select_2.click(function () {
        moveButton(2);
        year = "1993";
        selectCountry();
    });
    raphael.text(200, 75 , "2012/11").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    
    raphael.circle(300, 52).attr({r: 5, fill: "#25C3FD" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0});
    var select_3 = raphael.circle(300, 52).attr({r: 16, fill: "#13748D" ,  "opacity": 0, stroke: "#ff0000",  "stroke-width": 0});
    select_3.click(function () {
        moveButton(3);
        year = "1994";
        selectCountry();
    });
    raphael.text(300, 75 , "2012/12").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    
    raphael.circle(400, 52).attr({r: 5, fill: "#25C3FD" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0});
    var select_4 = raphael.circle(400, 52).attr({r: 16, fill: "#13748D" ,  "opacity": 0, stroke: "#ff0000",  "stroke-width": 0});
    select_4.click(function () {
        moveButton(4);
        year = "1995";
        selectCountry();
        
    });
    raphael.text(400, 75 , "2013/1").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    
    raphael.circle(500, 52).attr({r: 5, fill: "#25C3FD" ,  "opacity": 1, stroke: "#ff0000",  "stroke-width": 0});
    var select_5 = raphael.circle(500, 52).attr({r: 16, fill: "#13748D" ,  "opacity": 0, stroke: "#ff0000",  "stroke-width": 0});
    select_5.click(function () {
        moveButton(5);
        year = "1996";
        selectCountry();
        
    });
    raphael.text(500, 75 , "2013/2").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    
    
    
    
    //源
    // var source_flag = true;
    var source_border = raphael.rect(600, 20, 60, 30, 4).attr({
        "stroke-width": 6,
        stroke: "#E5E5E5",
        "fill-opacity": 0
    });
    var source_rect = raphael.rect(600, 20, 60, 30, 4).attr({
        "stroke-width": 0,
        fill: "#2B8AFF",
        "fill-opacity": 1
    });
    var source_text = raphael.text(630, 35, "源").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    source_text.click(sourceClick);
    source_rect.click(sourceClick);
    source_border.hide();
    
    function sourceClick() {
        if(source_flag){
            source_border.hide();
            // selectionData.importCategories["mil"] = false;
            // selectionData.importCategories["civ"] = false;
            // selectionData.importCategories["ammo"] = false;
        }
        else{
            source_border.show();
            // selectionData.importCategories["mil"] = true;
            // selectionData.importCategories["civ"] = true;
            // selectionData.importCategories["ammo"] = true;
        }
        source_flag = !source_flag;
        selectCountry();
    }
    
    
    //目标
    //var target_flag = false;
    var target_border = raphael.rect(600, 55, 60, 30, 4).attr({
        "stroke-width": 6,
        stroke: "#E5E5E5",
        "fill-opacity": 0
    });
    var target_rect = raphael.rect(600, 55, 60, 30, 4).attr({
        "stroke-width": 0,
        fill: "#FF6114",
        "fill-opacity": 1
    });
    
    var target_text = raphael.text(630, 70, "目标").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    target_text.click(targetClick);
    target_rect.click(targetClick);
    
    
    function targetClick() {
        if(target_flag){
            target_border.hide();
            // selectionData.exportCategories["mil"] = false;
            // selectionData.exportCategories["civ"] = false;
            // selectionData.exportCategories["ammo"] = false;
        }
        else{
            target_border.show();
            // selectionData.exportCategories["mil"] = true;
            // selectionData.exportCategories["civ"] = true;
            // selectionData.exportCategories["ammo"] = true;
        }
        target_flag = !target_flag;
        selectCountry();
    }
    
    function moveButton(select_id){
        if(select_id != old_select_id){
            // if(select_id > old_select_id){
                // move_dis = (old_select_id - select_id) * 100;
            // }
            // else{
                // move_dis = (select_id - old_select_id) * 100;
            // }
            now_select.attr({cx: 100*select_id, cy: 52});
            old_select_id = select_id;
            
        }
    };
    
    function selectCountry(){
        var source_list = [],
            target_list = [];
            
        if(source_flag){
            source_list = ['Military Weapons','Civilian Weapons', 'Ammunition']
            
        }
        if(target_flag){
            target_list = ['Military Weapons','Civilian Weapons', 'Ammunition']
            
        }
        
        selectionData.selectedYear = year;
        selectVisualization(timeBins, year, [selectionData.selectedCountry], source_list, target_list);
    }
});


function draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num){
    var color = "#F6FAAA";
    if(num > 10){
        if(num < 50){
            color = "#FFAE4E";
        }
        else{
            if(num < 100){
                color = "#F46D43";
            }
            else{
                if(num < 1000){
                    color = "#D53E4F";
                }
                else{
                    color = "#9E0142";
                }
            }
        }
    }
    raphael.rect(rect_cx, rect_cy, rect_width, rect_height, 2).attr({
        "stroke-width": 0,
        fill: color,
        "fill-opacity": 1
    });
}

/*
 * 右侧
 */
Raphael(1400, 180, 360, 750, function () {
    var raphael = this,
        r_width = 360,
        r_height = 750;
    
    raphael.rect(0, 0, r_width, r_height, 0).attr({
        "stroke-width": 0,
        //fill: "#0E1519",
        fill: "#25C3FD",
        "fill-opacity": 0.1,
        stroke: "#ffffff"
    });
    
    //国家统计
    raphael.rect(0, 33, r_width, 3, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    raphael.rect(0, 40, r_width, 1, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        // fill: "#13748D",
        "fill-opacity": 1
    });
    
    //draw_logo(raphael, 30, 12, "#A7EDF3");
    
    raphael.rect(22, 8, 1, 20, 0).attr({
        "stroke-width": 0,
        fill: "#31474E",
        "fill-opacity": 1
    });
    
    raphael.text(35, 17, "高危国家感染趋势").attr({fill: "#C3CFD1", "font-size":15, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
    
    // 感染源
    raphael.rect(48, 75, 76, 2, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.rect(48, 75, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.rect(86, 70, 2, 15, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.rect(124, 75, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(86, 60, "感染源").attr({fill: "#25C3FD", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
    
    // 被感染
    raphael.rect(172, 75, 76, 2, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.rect(172, 75, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.rect(210, 70, 2, 15, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.rect(248, 75, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(210, 60, "感染目标").attr({fill: "#25C3FD", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
    
    //刻度
    raphael.rect(30, 670, 300, 2, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    
    raphael.rect(48, 660, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(48, 680, "2012/12").attr({fill: "#25C3FD", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    raphael.rect(86, 660, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(86, 680, "2013/1").attr({fill: "#25C3FD", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    raphael.rect(124, 660, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(124, 680, "2013/2").attr({fill: "#25C3FD", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    raphael.rect(172, 660, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(172, 680, "2012/12").attr({fill: "#25C3FD", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    raphael.rect(210, 660, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(210, 680, "2013/1").attr({fill: "#25C3FD", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    raphael.rect(248, 660, 2, 10, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(248, 680, "2013/2").attr({fill: "#25C3FD", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    raphael.rect(330, 655, 2, 17, 0).attr({
        "stroke-width": 0,
        fill: "#25C3FD",
        "fill-opacity": 1
    });
    raphael.text(330, 680, "国家").attr({fill: "#25C3FD", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    
    //图例,10,50,100,1000
    raphael.rect(30, 710, 50, 15, 0).attr({
        "stroke-width": 0,
        fill: "#F6FAAA",
        "fill-opacity": 1
    });
    raphael.text(30, 732, "0").attr({fill: "#C3CFD1", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.rect(80, 710, 50, 15, 0).attr({
        "stroke-width": 0,
        fill: "#FFAE4E",
        "fill-opacity": 1
    });
    raphael.text(80, 732, "10").attr({fill: "#C3CFD1", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.rect(130, 710, 50, 15, 0).attr({
        "stroke-width": 0,
        fill: "#F46D43",
        "fill-opacity": 1
    });
    raphael.text(130, 732, "50").attr({fill: "#C3CFD1", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.rect(180, 710, 50, 15, 0).attr({
        "stroke-width": 0,
        fill: "#D53E4F",
        "fill-opacity": 1
    });
    raphael.text(180, 732, "100").attr({fill: "#C3CFD1", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.rect(230, 710, 50, 15, 0).attr({
        "stroke-width": 0,
        fill: "#9E0142",
        "fill-opacity": 1
    });
    raphael.text(230, 732, "1000").attr({fill: "#C3CFD1", "font-size":8, "font-weight": "bold", "font-family": "微软雅黑"});
    
    
    //console.info(world_statis.length);
    var rect_cx = 30,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_1) { 
        monitor_data = world_statis_s_1[x];
        num = monitor_data["v"];
        draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num);
        rect_cy = rect_cy + rect_height + 2;
    }
    
    var rect_cx = 68,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_2) { 
        monitor_data = world_statis_s_2[x];
        num = monitor_data["v"];
        draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num);
        rect_cy = rect_cy + rect_height + 2;
    }
    
    var rect_cx = 106,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_3) { 
        monitor_data = world_statis_s_3[x];
        num = monitor_data["v"];
        draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num);
        rect_cy = rect_cy + rect_height + 2;
    }
    
    var rect_cx = 154,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_1) { 
        monitor_data = world_statis_d_1[x];
        num = monitor_data["v"];
        draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num);
        rect_cy = rect_cy + rect_height + 2;
    }
    
    var rect_cx = 192,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_2) { 
        monitor_data = world_statis_d_2[x];
        num = monitor_data["v"];
        draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num);
        rect_cy = rect_cy + rect_height + 2;
    }
    
    var rect_cx = 230,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_3) { 
        monitor_data = world_statis_d_3[x];
        num = monitor_data["v"];
        draw_rect(raphael, rect_cx, rect_cy, rect_width, rect_height, num);
        rect_cy = rect_cy + rect_height + 2;
    }
    
    var rect_cx = 286,
        rect_cy = 90,
        rect_width = 36,
        rect_height = 26;
    for (x in world_statis_s_3) { 
        monitor_data = world_statis_d_3[x];
        name = monitor_data["e"];
        
        raphael.text(rect_cx, rect_cy + 13, name).attr({fill: "#C3CFD1", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"start"});
        
        rect_cy = rect_cy + rect_height + 2;
    }

});