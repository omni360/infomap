/**
 * @author whenlove
 */

/*
 * 左下统计模块
 */
function draw_statistics_div(raphael, world_statis){
    var start_cx = 40;
    //var start_cy = 790;
    var start_cy = 775;
    
    //var text_color = "#835166";
    //var text_color = "#E65188";
    //var text_color = "#75BDE0";
    var text_color = "#80f8eb";
    
    draw_hexagon(raphael, start_cx + 50, start_cy , 30, "#4272A1", "源地址", text_color);
    draw_hexagon(raphael, start_cx + 50, start_cy + 5 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 50, start_cy + 15, world_statis[4]).attr({fill: "#ffffff", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 84) +  "," + (start_cy + 30) + "L" + (start_cx + 110) +  "," + (start_cy + 40)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx, start_cy + 63 , 30, "#4272A1", "捕获样本", text_color);
    draw_hexagon(raphael, start_cx, start_cy + 68 , 20, text_color ,"", text_color);
    raphael.text(start_cx, start_cy + 78, world_statis[5]).attr({fill: "#ffffff", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 42) +  "," + (start_cy + 76) + "L" + (start_cx + 100) +  "," + (start_cy + 76)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 50, start_cy + 130 , 30, "#5EAC9D", "恶意代码", text_color);
    draw_hexagon(raphael, start_cx + 50, start_cy + 135 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 50, start_cy + 145, world_statis[6]).attr({fill: "#ffffff", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 102) +  "," + (start_cy + 120) + "L" + (start_cx + 110) +  "," + (start_cy + 115)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 260, start_cy , 30, "#5EAC9D", "放马域名", text_color);
    draw_hexagon(raphael, start_cx + 260, start_cy + 5 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 260, start_cy + 15, world_statis[2]).attr({fill: "#ffffff", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 230) +  "," + (start_cy + 30) + "L" + (start_cx + 204) +  "," + (start_cy + 40)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 310, start_cy + 63 , 30, "#565980", "放马URL", text_color);
    draw_hexagon(raphael, start_cx + 310, start_cy + 68 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 310, start_cy + 78, world_statis[1]).attr({fill: "#ffffff", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 211) +  "," + (start_cy + 76) + "L" + (start_cx + 267) +  "," + (start_cy + 76)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    draw_hexagon(raphael, start_cx + 260, start_cy + 130 , 30, "#565980", "放马IP", text_color);
    draw_hexagon(raphael, start_cx + 260, start_cy + 135 , 20, text_color ,"", text_color);
    raphael.text(start_cx + 260, start_cy + 145, world_statis[3]).attr({fill: "#ffffff", "font-size":10, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.path("M" + (start_cx + 228) +  "," + (start_cy + 125) + "L" + (start_cx + 204) +  "," + (start_cy + 115)).attr({stroke: text_color, "stroke-width": 2, "stroke-opacity": 1, "stroke-dasharray":"-"})
    
    raphael.rect(start_cx + 115, start_cy + 40, 84, 35, 1).attr({stroke: "#4272A1", "stroke-width": 2, "stroke-opacity": 1});
    raphael.text(start_cx + 158, start_cy + 57, "昨日全网捕获").attr({fill: "#eeffff", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
    raphael.rect(start_cx + 115, start_cy + 80, 84, 35, 1).attr({stroke: "#6E5778", "stroke-width": 2, "stroke-opacity": 1});
    raphael.text(start_cx + 158, start_cy + 96, world_statis[0]).attr({fill: "#cccccc", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑"});
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