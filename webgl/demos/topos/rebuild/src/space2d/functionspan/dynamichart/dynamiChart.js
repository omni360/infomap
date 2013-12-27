
//======================================================================================
//  Description: 定位节点
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================

Space2D.dynamiChart = function (options){
	this.scene = options.scene;
	this.createHtmlDom();
	
	this.saveventnum = this.savepacketnum = null;
}

Space2D.dynamiChart.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	var initChart = this.initChart.bind(this);
	this.gateway = new OOPTEST.GatewayRequest();
	this.gateway.request(OOPTEST.Gateways['getdynamiChartPage'], function (page){
		_temp.append(page);
		initChart();
	});
}

Space2D.dynamiChart.prototype.initChart = function(){
	
	new Highcharts.Chart({
        chart: {
            renderTo: 'infec_target_num_chart',
            type: 'line',
            height: 150,
            marginRight: 10,
            marginLeft: 40,
            marginBottom: 19,
            events: {
                load: function() {

                    var series = this.series[0];
                    setInterval(function() {
                        var x = (new Date()).getTime();

                        $.getJSON("http://10.255.80.4/xc/event_num/", function (num){
                            if(this.saveventnum == null){
                                this.saveventnum = num.list[0].num;
                            }

                            series.addPoint([
                                (new Date()).getTime(), 
                                (num.list[0].num-this.saveventnum >= 0 ? num.list[0].num-this.saveventnum : 0)
                            ], true, true);
                            this.saveventnum = num.list[0].num;
                        });


                    }, 10000);
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            // max: 100,
            // maxPadding: 1,
            minRange: 1,
            plotLines: [{
                value: 0,
                width: 0.1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                return '<b>时间: </b>'+ Highcharts.dateFormat('%H:%M:%S', this.x) +'<br/>'+
                        '<b>数量: </b>'+ Highcharts.numberFormat(this.y, 0) + '个';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            // name: '感染目标数量',
            name: '安全事件数量',
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -5; i <= 0; i++) {
                    data.push({
                        x: time + i * 10000,
                        y: 0
                    });
                }
                return data;
            })()
        }]
    });
    new Highcharts.Chart({
        chart: {
            renderTo: 'infec_pack_num_chart',
            type: 'line',
            height: 150,
            marginRight: 10,
            marginLeft: 40,
            marginBottom: 19,
            events: {
                load: function() {
                    var series = this.series[0];
                    setInterval(function() {
                        var x = (new Date()).getTime();
                        $.getJSON("http://10.255.80.4/xc/packet_num/", { id : '86957'}, function (num){
                            if(num.list.length > 0){
                                if(this.savepacketnum == null){
                                    this.savepacketnum = num.list[0].packets;
                                }
                                series.addPoint([
                                    (new Date()).getTime(), 
                                    (num.list[0].packets-this.savepacketnum >= 0 ? num.list[0].packets-this.savepacketnum : 0)
                                ], true, true);
                                this.savepacketnum = num.list[0].packets;
                            }else{
                                series.addPoint([
                                    (new Date()).getTime(), 
                                    0
                                ], true, true);
                                this.savepacketnum = 0;
                            }
                            
                        })

                    }, 10000);
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 0,
            minRange: 1,
            plotLines: [{
                value: 0,
                width: 0.1,
                color: '#808080'
            }]
        },
        plotOptions: {
            series: {
                color: 'green'
            }
        },
        tooltip: {
            formatter: function() {
                return '<b>时间: </b>'+ Highcharts.dateFormat('%H:%M:%S', this.x) +'<br/>'+
                        '<b>数量: </b>'+ Highcharts.numberFormat(this.y, 0) + '个';
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '数据包数量',
            data: (function() {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -5; i <= 0; i++) {
                    data.push({
                        x: time + i * 10000,
                        y: 0
                    });
                }
                return data;
            })()
        }]
    });
}

