$(function () {

    
        // Create the chart
        $('#container2').highcharts({
            chart: {
                type: 'pie',
                marginLeft: 10,
                marginTop: -4,
                marginRight: 20,
            },
            credits:{
            	enabled: false
            },
            title: {
                text: ''
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%'],
                    dataLabels:{
                    	color: '#FFF',
                    	style: {
                    		'font-size': '14px'
                    	}
                    }
                }
            },
            tooltip: {
        	    valueSuffix: '%'
            },
            series: [ {
                name: 'Versions',
                data: [
			        {
			            name: '模拟节点应用',
			            y: 55,
			        },
			        {
			            name: '仿真节点应用',
			            y: 12,
			        },
			        {
			            name: '流量应用',
			            y: 34,
			        }
			    ],
                size: '90%',
                innerSize: '70%'
            }]
        });
    });
    