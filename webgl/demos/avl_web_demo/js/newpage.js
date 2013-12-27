var repheal,objDiv;
$(function(){
    objDiv = document.getElementById("log");
    var detailFlag = [false,false,false,false];

    initRaphael();

    $('#upload').click(function(){
        repheal.setViewBox(10,10,1000,300);
    });

    $( ".area-content-detail" ).hide();

    // $(".area").each(function(i){
    //     $(this).find('.area-foot').click(function(){
    //         if(detailFlag[i]){
                
    //             $(this).parent().find('.area-content-detail').hide(
    //                 'slide',
    //                 {'direction': 'down'},500,function(){
    //                     $(this).parent().css({
    //                         'border-color': '#FFF'
    //                     });
    //                 }
    //             );
                
    //             $(this).find('i').removeClass('icon-chevron-down').addClass('icon-chevron-up');
    //         }else{
    //             $(this).parent().find('.area-content').css({
    //                 'border-color': '#184D5A'
    //             });
    //             $(this).parent().find('.area-content-detail').show(
    //                 'slide',
    //                 {'direction': 'down'}
    //                 ,500
    //             );
    //             $(this).find('i').removeClass('icon-chevron-up').addClass('icon-chevron-down');
    //         }
    //         detailFlag[i] = !detailFlag[i];
    //     })
    // });

    $(".area").each(function(i){
        $(this).find('.area-foot').mouseenter(function(){
            $(this).parent().find('.area-content').css({
                'border-color': '#184D5A'
            });
            $(this).parent().find('.area-content-detail').show(
                'slide',
                {'direction': 'down'}
                ,500
            );  
            $(this).find('i').removeClass('icon-chevron-up').addClass('icon-chevron-down');
        });
        $(this).find('.area-content-detail').mouseleave(function(){
            $(this).hide(
                'slide',
                {'direction': 'down'},500,function(){
                    $(this).parent().css({
                        'border-color': '#FFF'
                    });
                }
            );
            $(this).find('i').removeClass('icon-chevron-down').addClass('icon-chevron-up');
        });
    });    
        
    


    var chart = new Highcharts.Chart({
    
        chart: {
            renderTo: 'gauge',
            type: 'gauge',
            plotBackgroundColor: '#13424E',
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            spacingTop: 0,
            spacingLeft: 0,
            spacingBottom: 0,
            spacingRight: 0
        },
        
        title: {
            text: ''
        },

        
        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [ {
                backgroundColor: '#000',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        plotOptions: {
            gauge: {
                dial: {
                    backgroundColor: '#f2f2f2',
                    borderColor: '#f2f2f2',
                },
                pivot:{
                    backgroundColor: '#f2f2f2',
                    borderColor: '#f2f2f2',
                },
                dataLabels: {
                    color: 'red'
                }
            }
        },
           
        // the value axis
        yAxis: {
            min: 0,
            max: 180,
            
            minorTickInterval: 'auto',
            minorTickWidth: 0,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: 'red',
    
            tickPixelInterval: 30,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#333',
            labels: {
                step: 3,
                rotation: '60',
                style: {
                    color: '#f5f5f5',
                    fontWeight: 'bold',
                    fontSize: '10px'
                }
            },
            lineColor: '#13424E',
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 60,
                color: '#55BF3B' // green
            }, {
                from: 60,
                to: 120,
                color: '#DDDF0D' // yellow
            }, {
                from: 120,
                to: 180,
                color: '#DF5353' // red
            }]        
        },
    
        series: [{
            name: 'Result',
            data: [80],
            dataLabels: {
                enabled: false
            },
            tooltip: {
                valueSuffix: ''
            }
        }]
    
    });

    animate();
});

var startPoint,
    startPointGlow,
    setupline_i1,setupline_i2,setupline_i3,
    arrowLineOld = {
      stroke: '#bbb',
      // fill: '#bbb',
      "stroke-width": 2
    },
    uploadFileIcon,
    processAttr = {
      stroke: "#CCCCCC",
      fill: '#E7E7E7'
    },
    aniArrow,
    waitIconClass,
    process_a;


function initRaphael(){
    repheal = Raphael('mainWindows',1350, 540);

    // for(var i=1;i<=67;i++){
    //   for(var j=1;j<=27;j++){
    //     if(i%5==0 || j%5 == 0){
    //       repheal.circle(i*20, j*20, 0.5).attr({
    //         stroke: "blue"
    //       })
    //     }else{
    //       repheal.circle(i*20, j*20, 0.5).attr({
    //         opacity: 0.5
    //       })
    //     }
    //   }
      
    // }
    setupline_i1 = repheal.path(drawLineArrow(63,201,35,'')).attr(arrowLineOld);
    setupline_i2 = repheal.path(drawLineArrow(100,237,35,'')).attr(arrowLineOld).transform("r90");
    setupline_i3 = repheal.path(drawLineArrow(100,311,35,'')).attr(arrowLineOld).transform("r90");
    setupline_i4 = repheal.path(drawLineArrow(142,347,40,'')).attr(arrowLineOld);
    setupline_ii1 = repheal.path(drawLineArrow(200,311,35,'')).attr(arrowLineOld).transform("r-90");
    setupline_ii2 = repheal.path(drawLineArrow(207,246,20,'')).attr(arrowLineOld).transform("r-90");
    setupline_ii3 = repheal.path(drawLineArrow(195,142,45,'')).attr(arrowLineOld).transform("r-90");
    setupline_ii4 = repheal.path(drawLineArrow(251,100,67,'')).attr(arrowLineOld);
    setupline_ii5 = repheal.path(drawLineArrow(327,163,55,'')).attr(arrowLineOld).transform("r90");
    setupline_ii7 = repheal.path(drawLineArrow(327,256,55,'')).attr(arrowLineOld).transform("r90");
    setupline_ii6 = repheal.path(drawLineArrow(381,300,40,'')).attr(arrowLineOld);
    setupline_iii1 = repheal.path(drawLineArrow(435,341,45,'')).attr(arrowLineOld).transform("r90");
    setupline_iii3 = repheal.path(drawLineArrow(491,385,82,'')).attr(arrowLineOld);
    setupline_iii4 = repheal.path(drawLineArrow(569,318,75,'')).attr(arrowLineOld).transform("r-90");
    setupline_iii6 = repheal.path(drawLineArrow(579,213,55,'')).attr(arrowLineOld).transform("r-90");
    setupline_iii7 = repheal.path(drawLineArrow(635,168,66,'')).attr(arrowLineOld);
    setupline_iv1 = repheal.path(drawLineArrow(715,210,45,'')).attr(arrowLineOld).transform("r90");
    setupline_iv2 = repheal.path(drawLineArrow(720,390,35,'')).attr(arrowLineOld).transform("r90");
    setupline_iv3 = repheal.path(drawLineArrow(768,440,78,'')).attr(arrowLineOld);
    setupline_iv4 = repheal.path(drawLineArrow(810,351,145,'')).attr(arrowLineOld).transform("r-90");
    setupline_iv6 = repheal.path(drawLineArrow(912,246,99,'')).attr(arrowLineOld);
    setupline_v2 = repheal.path(drawLineArrow(1030,209,35,'')).attr(arrowLineOld).transform("r-90");
    setupline_v3 = repheal.path(drawCLineA(1050,144,-30,164,84)).attr(arrowLineOld);
    setupline_v5 = repheal.path(drawLineArrow(1273,250,35,'')).attr(arrowLineOld);
    setupline_iv5 = repheal.path(drawCLineC(740,468,30,448)).attr(arrowLineOld);

    aniArrow = repheal.image("img/aniarrow.png", 50, 195, 12, 10);

    waitIconClass = new WaitIconClass();

    // waitIconClass.Init();

    // start point 
    startPoint = repheal.circle(50, 200, 12).attr({
      'arrow-end':'block-wide-long',
      stroke: "#009B0A",
      fill: '#CAFFCE',
      "stroke-width": 1.5
    }).glow({
      'color': '#59D64D',
      'width': '1'
    });
    // setupline_i1
    uploadFileIcon = repheal.image("img/file.png", 102, 183, 36, 36);
    // setupline_i2
    process_fa = process(90,260,60,30,'Transport',30,15);
    // setupline_i3
    data_fa = data(118,347,25,13,'package',0,0);
    // setupline_i4
    process_sa = process(190,332,60,30,'前置过滤',30,15);
    // setupline_ii1
    process_sb = process(190,260,60,30,'URL检测',30,15);
    // setupline_ii2
    judeg_sa = judge(198,177,45,45,'是否存在\n恶意',22,24);
    // setupline_ii3
    setupline_ii8 = repheal.path(drawCLineB(253,199,290,20,905)).attr(arrowLineOld);
    // repheal.image("img/no.png", 210, 135, 24, 24);
    process_sc = process(190,84,60,30,'格式识别',30,15);
    // setupline_ii4
    judeg_sb = judge(335,78,45,45,'是否为可\n跳过格式',22,22);
    repheal.path(drawCLineA(358,69,-15,952,175)).attr(arrowLineOld);
    // repheal.image("img/yes.png", 702, 30, 24, 24);
    // setupline_ii5
    // repheal.image("img/no.png", 345, 139, 24, 24);
    process_sd = process(327,196,60,30,'流还原',30,15);
    // setupline_ii7
    data_sa = data(355,300,25,13,'流',0,0);
    // setupline_ii6
    process_ta = process(430,285,60,30,'快速检测',30,15);
    setupline_iii2 = repheal.path(drawLineArrow(435,259,45,'')).attr(arrowLineOld).transform("r-90");
    process(430,200,60,30,'信息提取',30,15);
    repheal.image("img/information.png", 420, 80, 80, 60);
    setupline_iii2 = repheal.path(drawLineArrow(435,174,45,'')).attr(arrowLineOld).transform("r-90");
    process_tb = process(430,370,60,30,'流行恶意\n样本检测',30,15);
    // setupline_iii3
    judge_ta = judge(590,365,40,40,'是否发现\n恶意',20,22);
    // setupline_iii4
    setupline_iii5 = repheal.path(drawCLineC(610,412,86,578)).attr(arrowLineOld);
    // repheal.image("img/no.png", 600, 320, 24, 24);
    process_tc = process(580,244,60,30,'文件还原',30,15);
    // setupline_iii6
    data_ta = data(610,168,25,13,'文件',0,0);
    // setupline_iii7
    process_fra = process(710,154,60,30,'文件检测',30,15);
    repheal.path(drawLineArrow(720,134,35,'')).attr(arrowLineOld).transform("r-90");
    process(710,81,60,30,'信息提取',30,15);
    setupline_iii5 = repheal.path(drawLineArrow(770,98,26,'')).attr(arrowLineOld);
    repheal.image("img/information.png", 798, 72, 80, 60);
    // setupline_iv1
    process_frc = repheal.rect(670, 240, 151, 130).attr({
      'stroke-dasharray': '-',
      fill: '#f3f3f3'
    });
    process(680,250,60,30,'木马检测',30,15);
    process(750,250,60,30,'病毒检查',30,15);
    process(680,290,60,30,'脚本检测',30,15);
    process(750,290,60,30,'溢出检测',30,15);
    process(680,330,60,30,'基因检测',30,15);
    process(750,330,60,30,'.....',30,15);
    // setupline_iv2
    judge_fra = judge(720,421,40,40,'是否发现\n恶意',20,22);
    // setupline_iv3
    // setupline_iv5
    // repheal.image("img/no.png", 800, 430, 24, 24);
    process_frb = process(855,426,60,30,'VCS',30,15);
    // setupline_iv4
    judge_frb = judge(865,226,40,40,'是否发现\n可疑',20,22);
    setupline_iv5 = repheal.path(drawLineArrow(865,199,35,'')).attr(arrowLineOld).transform("r-90");
    process(855,145,60,30,'警告',30,15);
    repheal.path(drawCLineA(884,144,-50,330,105)).attr(arrowLineOld);
    // repheal.image("img/yes.png", 875, 190, 24, 24);
    // setupline_iv6
    // repheal.image("img/no.png", 960, 233, 24, 24);
    process_fia = process(1020,230,60,30,'异步检测',30,15);
    setupline_v1 = repheal.path(drawLineArrow(1030,281,35,'')).attr(arrowLineOld).transform("r90");
    repheal.rect(947, 305, 210, 120).attr({
      'stroke-dasharray': '-',
      fill: '#f3f3f3'
    });
    process(970,325,60,30,'深度静态\n检测',30,15);
    process(1070,325,60,30,'轻量级\n沙箱',30,15);
    process(1020,385,60,30,'深度静态\n检测',30,15);
    // setupline_v2
    cloudy = repheal.image("img/grew-cloudy.png", 1010, 130, 72, 72);
    // setupline_v3
    repheal.image("img/infomation2.png", 1180, 210, 100, 72);
    // setupline_v5
    // repheal.image("img/yes.png", 900, 500, 24, 24);
    process(1204,492,60,30,'阻断',30,15);
    process(1204,28,60,30,'放行',30,15);
    setupline_v4 = repheal.path(drawLineArrow(1129,388,202,'')).attr(arrowLineOld).transform("r-90");
    repheal.circle(1330, 250, 12).attr({
      'arrow-end':'block-wide-long',
      stroke: "#009B0A",
      fill: '#CAFFCE',
      "stroke-width": 1.5
    })

    function process(x,y,w,h,text,tx,ty){
        processobj = repheal && repheal.rect(x, y, w, h, 5).attr(processAttr);
        repheal && repheal.text((x+tx), (y+ty), text).attr({
          // 'text-anchor': 'start'
          // fill: '#FFF'
        });
        return processobj;
    }
    function data(x,y,w,h,text,tx,ty){
        dataobj = repheal.ellipse(x, y, w, h).attr(processAttr);
        repheal.text((x+tx), (y+ty), text).attr({
          // 'text-anchor': 'start'
          // fill: '#FFF'
        });
        return dataobj;
    }
    function judge(x,y,w,h,text,tx,ty){
        judgeobj = repheal.rect(x, y, w, h).attr(processAttr).transform("r45");
        repheal.text((x+tx), (y+ty), text).attr({
          // 'text-anchor': 'start'
          // fill: '#FFF'
        });
        return judgeobj;
    }


    

} 



function drawLineArrow(x,y,l,a){
    return "M"+x+" "+y+"h"+l+'v-3L'+(x+l+6)+' '+y+'L'+(x+l)+' '+(y+3)+'v-3';
}

function drawCLineA(x,y,h,l,h2){
    return 'M'+x+','+y+'v'+h+'A10,10,45,0,1,'+(x+10)+','+(y+h-10)+'h'+l+
    'A10,10,45,0,1,'+(x+l+20)+','+(y+h)+'v'+h2+'h3L'+(x+l+20)+','+
    (y+h+h2+6)+'L'+(x+l+17)+','+(y+h+h2)+'h3';
}

function drawCLineB(x,y,h,l1,l){
    return 'M'+x+','+y+'h'+l1+'A10,10,45,0,1,'+(x+l1+10)+','+(y+10)+'v'+h+
    'A10,10,45,0,0,'+(x+l1+20)+','+(y+h+20)+'h'+l+
    'v-3L'+(x+l+l1+26)+','+(y+h+20)+'L'+(x+l+l1+20)+','+(y+h+23)+'v-3';
}

function drawCLineC(x,y,h,l){
    return 'M'+x+','+y+'v'+h+'A10,10,45,0,0,'+(x+10)+','+(y+h+10)+'h'+l+
    'v3L'+(x+l+16)+','+(y+h+10)+'L'+(x+l+10)+','+(y+h+7)+'v3';
}





var reqAniFrCounter = 0;
    currentAnimateId = 0,
    currentAnimateFlag = true,
    aniArrowStr = 'r90',
    aniArrowAniTime = '900',
    lineColor = ['#C1920F','#0F9702'];

    

function animate() {
    reqAniFrCounter++;
    if(reqAniFrCounter > 30){
    waitIconClass.playAnimate();

    if(currentAnimateId == 0 && currentAnimateFlag){
        currentAnimateFlag = false;
        setupline_i1.attr({stroke: lineColor[0]})
        aniArrow.animate({
            x: 115 
        },aniArrowAniTime,'linear',function(){
            waitIconClass.position(70,45);
            waitIconClass.show();
            setupline_i1.attr({stroke: lineColor[1]});
            addLogInfo('Start Upload File');
            aniArrow.animate({transform: aniArrowStr}, 2000, "<>",function(){
                waitIconClass.hide();
                currentAnimateFlag = true;
                currentAnimateId++;
                addLogInfo('Upload File Compelete .');
            });
        });
    }else if(currentAnimateId == 1 && currentAnimateFlag){
        aniClass("T0,75",'',setupline_i2,50,125,process_fa);
    }else if(currentAnimateId == 2 && currentAnimateFlag){
        aniClass("T0,72",'R-90',setupline_i3,50,205,data_fa);
    }else if(currentAnimateId == 3 && currentAnimateFlag){
        aniClass("T99,0",'R-90',setupline_i4,230,200,process_sa);
    }else if(currentAnimateId == 4 && currentAnimateFlag){
        aniClass("T0,-73",'',setupline_ii1,230,120,process_sb);
    }else if(currentAnimateId == 5 && currentAnimateFlag){
        aniClass("T0,-75",'',setupline_ii2,220,40,judeg_sa);
    }else if(currentAnimateId == 6 && currentAnimateFlag){
        aniClass("T0,-100",'R90',setupline_ii3,230,-60,process_sc);
    }else if(currentAnimateId == 7 && currentAnimateFlag){
        aniClass("T138,0",'R90',setupline_ii4,300,-60,judeg_sb);
    }else if(currentAnimateId == 8 && currentAnimateFlag){
        aniClass("T0,115",'',setupline_ii5,290,50,process_sd);
    }else if(currentAnimateId == 9 && currentAnimateFlag){
        aniClass("T0,85",'R-90',setupline_ii7,290,150,data_sa);
    }else if(currentAnimateId == 10 && currentAnimateFlag){
        aniClass("T103,0",'R90',setupline_ii6,390,150,process_ta);
    }else if(currentAnimateId == 11 && currentAnimateFlag){
        aniClass("T0,85",'R-90',setupline_iii1,390,230,process_tb);
    }else if(currentAnimateId == 12 && currentAnimateFlag){
        aniClass("T148,0",'R-90',setupline_iii3,550,230,judge_ta);
    }else if(currentAnimateId == 13 && currentAnimateFlag){
        aniClass("T0,-120",'',setupline_iii4,540,100,process_tc);
    }else if(currentAnimateId == 14 && currentAnimateFlag){
        aniClass("T0,-97",'R90',setupline_iii6,555,20,data_ta);
    }else if(currentAnimateId == 15 && currentAnimateFlag){
        aniClass("T132,0",'R90',setupline_iii7,660,20,process_fra);
    }else if(currentAnimateId == 16 && currentAnimateFlag){
        aniClass("T0,180",'',setupline_iv1,800,180,process_frc);
    }else if(currentAnimateId == 17 && currentAnimateFlag){
        aniClass("T0,93",'R-90',setupline_iv2,680,280,judge_fra);
    }else if(currentAnimateId == 18 && currentAnimateFlag){
        aniClass("T144,0",'R-90',setupline_iv3,820,280,process_frb);
    }else if(currentAnimateId == 19 && currentAnimateFlag){
        aniClass("T0,-195",'R90',setupline_iv4,820,100,judge_frb);
    }else if(currentAnimateId == 20 && currentAnimateFlag){
        aniClass("T164,0",'R-90',setupline_iv6,980,100,process_fia);
    }else if(currentAnimateId == 21 && currentAnimateFlag){
        aniClass("T0,-80",'',setupline_v2,980,20,null,function(){
            cloudy.attr({src: 'img/blue-cloudy.png'});
        });
    }else if(currentAnimateId == 22 && currentAnimateFlag){
        // aniClass("T0,-80",'',setupline_v2,980,20);
        currentAnimateFlag = false;
        aniArrowStr+='T0,-60';
        setupline_v3.attr({stroke: lineColor[0]})
        aniArrow.animate({
            transform: aniArrowStr
        },aniArrowAniTime*2/5,'linear',function(){
            aniArrowStr+='R90';
            aniArrow.animate({transform: aniArrowStr}, aniArrowAniTime/5, "<>",function(){
                aniArrowStr+='T185,0';
                aniArrow.animate({transform: aniArrowStr}, aniArrowAniTime*2/5, "<>",function(){
                    aniArrowStr+='R90';
                    aniArrow.animate({transform: aniArrowStr}, aniArrowAniTime/5, "<>",function(){
                        aniArrowStr+='T0,145';
                        waitIconClass.position(1180,60);
                        waitIconClass.show();
                        setupline_v3.attr({stroke: lineColor[1]});
                        aniArrow.animate({transform: aniArrowStr}, aniArrowAniTime*2/5, "<>",function(){
                            aniArrowStr+='R-90';
                            aniArrow.animate({transform: aniArrowStr}, 2000, "<>",function(){
                                waitIconClass.hide();
                                currentAnimateFlag = true;
                                currentAnimateId++;
                            });
                            addLogInfo('End .');
                        });
                    });
                });
            });
        });
    }else if(currentAnimateId == 23 && currentAnimateFlag){
        currentAnimateFlag = false;
        aniArrowStr+='T100,0';
        setupline_v5.attr({stroke: lineColor[0]})
        aniArrow.animate({
            transform: aniArrowStr
        },aniArrowAniTime,'linear',function(){
            setupline_v5.attr({stroke: lineColor[1]});
        });
    }

    }
    requestAnimationFrame( animate );
}

function aniClass(strA,strB,lineDom,x,y,objDom,callbackFun){
    // addLogInfo('Start Do Something ' + strA + '-' + strB + ' .');
    currentAnimateFlag = false;
    aniArrowStr+=strA;
    lineDom.attr({stroke: lineColor[0]})
    aniArrow.animate({
        transform: aniArrowStr
    },aniArrowAniTime,'linear',function(){
        waitIconClass.position(x,y);
        waitIconClass.show();
        lineDom.attr({stroke: lineColor[1]});
        aniArrowStr+=strB;
        aniArrow.animate({transform: aniArrowStr}, 1200, "<>",function(){
            addLogInfo('End '+aniArrowStr+' .');
            waitIconClass.hide();
            currentAnimateFlag = true;
            currentAnimateId++;
        });
        if(objDom){
            objDom.animate({
                'fill': '#B5E2FF'
            }, 500, "<>");
        }
        callbackFun && callbackFun();
    });
}




function addLogInfo(loghtml){
    $('#log ul li').last().html(loghtml);
    // $('#log').mCustomScrollbar("scrollTo","#endScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
    $('#log ul').append('<li>&nbsp;</li>');
}

