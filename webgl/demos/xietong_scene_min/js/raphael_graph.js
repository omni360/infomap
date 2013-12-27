/**
 * @author whenlove
 */

Raphael(50, 50, 400, 400, function () {
    var raphael = this;
    //系统辅助线
    var source_flag = false;
    var source_border = raphael.rect(60, 40, 160, 30, 4).attr({
        "stroke-width": 6,
        stroke: "#E5E5E5",
        "fill-opacity": 0
    });
    var source_rect = raphael.rect(60, 40, 160, 30, 4).attr({
        "stroke-width": 0,
        fill: "#2B8AFF",
        "fill-opacity": 1
    });
    var source_text = raphael.text(140, 55, "系统辅助线").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    source_text.click(sourceClick);
    source_rect.click(sourceClick);
    source_border.hide();
    
    function sourceClick() {
        if(source_flag){
            source_border.hide();
        }
        else{
            source_border.show();
        }
        source_flag = !source_flag;
        
        topo.setSysInfo(source_flag);
        
    }
    
    //系统辅助线
    var table_flag = false;
    var table_border = raphael.rect(60, 120, 160, 30, 4).attr({
        "stroke-width": 6,
        stroke: "#E5E5E5",
        "fill-opacity": 0
    });
    var table_rect = raphael.rect(60, 120, 160, 30, 4).attr({
        "stroke-width": 0,
        fill: "#2B8AFF",
        "fill-opacity": 1
    });
    var table_text = raphael.text(140, 135, "系统详细数据").attr({fill: "#FAFAFA", "font-size":12, "font-weight":"bold","font-family": "微软雅黑"});
    table_text.click(tableClick);
    table_rect.click(tableClick);
    table_border.hide();
    
    function tableClick() {
        if(table_flag){
            table_border.hide();
            $("#raphael_div").hide();
        }
        else{
            table_border.show();
            $("#raphael_div").show();
        }
        table_flag = !table_flag;
        
    }
});

/*
 * 左侧
 */
Raphael("raphael_div", 1920, 280, function () {
    var raphael = this,
        r_width = 1920,
        r_height = 270;
    
    raphael.rect(0, 0, r_width, r_height, 0).attr({
        "stroke-width": 0,
        //fill: "#0E1519",
        fill: "#25C3FD",
        "fill-opacity": 0.3,
        stroke: "#ffffff"
    });
    
    
    var r_set = raphael.set();
    
    var sys_text_li = [
        ['报文监测和恶意代码捕获系统', 1200, 200, "60", "#FF6600"],
        
        ['流监测系统', 1200, 200, "60", "#FFFF00"],
        ['蜜网系统', 1200, 200, "60", "#DE2F6F"],
        ['恶意代码分析系统', 1200, 200, "60", "#663399"],
        ['协同联动系统', 1200, 200, "60", "#33CC99"],
        ['域名监测系统', 1200, 200, "60", "#990066"],
        ['路由监测系统', 1200, 200, "60", "#0000ff"],
        ['网站监测系统', 1200, 200, "60", "#00ff00"],
        
        ['轻载扫描系统', 1200, 200, "60", "#FF0033"],
    ]
    
    var rect_cx = 30,
        rect_cy = 26,
        rect_height = 20,
        rect_width = 136;
    for(i=0; i < sys_text_li.length; i++){
        rect_cy = rect_cy + 24;
        r_set.push(raphael.rect(rect_cx, rect_cy, rect_width, rect_height, 2).attr({
            "stroke-width": 0,
            fill: sys_text_li[i][4],
            "fill-opacity": 0.8
        }));
        r_set.push(raphael.text(rect_cx + 68, rect_cy + 10, sys_text_li[i][0]).attr({fill: "#ffffff", "font-size":10, "font-family": "微软雅黑", "text-anchor":"middle"}));
        
    }
    
    var rect_cx = 176,
        rect_width = 50,
        color = "#25C3FD";
    
    
    for(i=0; i < data_list.length; i++){
        var rect_cy = 20,
            rect_height = 26;
        
        r_set.push(raphael.rect(rect_cx, rect_cy, rect_width, rect_height, 2).attr({
            "stroke-width": 0,
            fill: color,
            "fill-opacity": 1
        }));
        r_set.push(raphael.text(rect_cx + 23, rect_cy + 13, data_list[i][0]).attr({fill: "#ffffff", "font-size":12, "font-weight": "bold", "font-family": "微软雅黑", "text-anchor":"middle"}));
        
        rect_cy = 26;
        rect_height = 20;
        for(j=0; j < sys_text_li.length; j++){
            rect_cy = rect_cy + 24;
            r_set.push(raphael.rect(rect_cx, rect_cy, rect_width, rect_height, 2).attr({
                "stroke-width": 0,
                fill: sys_text_li[j][4],
                "fill-opacity": 0.6
            }));
            if(data_list[i][j + 1]){
                r_set.push(raphael.text(rect_cx + 23, rect_cy + 10, data_list[i][j + 1]).attr({fill: "#ffffff", "font-size":12,  "text-anchor":"middle"}));
            }
        }
        rect_cx = rect_cx + 54;
    }
    
    //r_set.hide();
    $("#raphael_div").hide();
});