//======================================================================================
//  Description: 回放条
//  Created Date: 2013-01-09
//  Modify Date: 2013-01-09
//  Author: xfc
//======================================================================================
Space2D.replayTimeCard = function (options){
	this.scene = options.scene;
	
	this.topoData = [
        {
            name: '模拟',
            y: 55,
            color: '#A1D8E6'
        },
        {
            name: '仿真',
            y: 12,
            color: '#00A7DC'
        },
        {
            name: '实物',
            y: 34,
            color: '#3D62AD'
        }
    ];
	
	this.createHtmlDom();
	
}

Space2D.replayTimeCard.prototype.createHtmlDom = function(){
	var _temp = this.scene.sceneDom;
	var _this = this;
	this.scene.gateway.request(OOPTEST.Gateways['getreplayTimeCardPage'], function (page){
		_temp.append(page);
		OOPTEST.Gateways['getTopoInfoData']['paras']['id'] = 182;
		_this.scene.gateway.request(OOPTEST.Gateways['getTopoInfoData'], function (_resule){
	        if(_resule.length > 0){
	            $('#replayTopoName').html(_resule[0].name); 
	        }
	        for(i=0;i<_resule.length;i++){
	            if(_resule[i].type == 'sim'){
	                _this.topoData[0].y = _resule[i].num
	            }else if(_resule[i].type == 'xen'){
	                _this.topoData[1].y = _resule[i].num
	            }else{
	                _this.topoData[2].y = _resule[i].num
	            }
	        }
	        _this.pie_chart('topoInfoChart');
		});
		

	});
}

Space2D.replayTimeCard.prototype.pie_chart = function(chart_id){
	var _this = this;
	chart = new Highcharts.Chart({
        chart: {
            renderTo: chart_id,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor:'rgba(0,0,0,0)',
            marginLeft: -90
        },
        title: {
            text: ''
        },
        tooltip: {
        	enabled:false,
        },
        plotOptions: {
            pie: {
            	size:'99%',
                innerSize:'75%',
                allowPointSelect: true,
                borderWidth:0,
                shadow:false,
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend:{
            verticalAlign:'middle',
            y:-4,
            x:50,
            layout:'vertical',
            borderWidth:0,
            symbolWidth: 10,
            //width:50,
            labelFormatter: function() {
                return this.name + ' : ' + this.y
            },
            itemStyle: {
			   cursor: 'pointer',
			   color: '#ddd',
			   fontSize: '10px'
			}
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: _this.topoData
        }]
    });
}

