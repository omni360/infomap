var name_info,type_info,cpu_info,mem_info,disk_info,flow_info;
var obj1_list=[],obj2_list=[],obj3_list=[],obj4_list=[];
var page_num = 1,page_size = 8;
var public_data;
	  var temp_length, length;
$(document).ready(function(){
	window.parent && (window.parent.topo.isRenderer = true);
	
    $(window.parent.document).find('#main_iframe').css({'opacity':1});
	/*验证session*/
		/*$.get('/scc/check_session/',function(ajax){
			if(ajax.res == "succeed"){
				// generate_menu()
				// $('#user_id').text(ajax.user_id)
				// $('#user').text(ajax.name)
			}
			else{
				console.log("false")
				location.href = "/login.html "; 
			}
		},"json");*/
	  $.get('monitor-data.js',{'page_numb':page_num,'page_size':page_size},
	  	function(ajax){
	  		public_data = ajax;
	  		public_part(public_data)
	 	},"json");
	  $.get('monitor-data.js',{'page_numb':1,'page_size':100000},
	  	function(ajax){
	  		temp_length = ajax.length;
	  		length = Math.ceil(temp_length/8)
	  		$("#page").paginate({
			count 		: length,
			start 		: 1,
			display     : length,
			border					: false,
			text_color  			: '#1D5987',
			background_color    	: 'rgba(0,0,0,0)',	
			text_hover_color  		: '#000000',//#2573AF
			background_hover_color	: '#898989', 
			images		: false,
			mouse		: 'press',
			onChange: function(count){
				page_num = count;
				$.get('monitor-data.js',{'page_numb':page_num,'page_size':page_size},
					function(ajax){
			 		  name_info,type_info,cpu_info,mem_info,disk_info,flow_info;
			  		  public_data = ajax;
			 		  for (i=0;i<obj1_list.length;i++){
			 		  	obj1_list[i].destroy();
			 		  	obj2_list[i].destroy();
			 		  	obj3_list[i].destroy();
			 		  	obj4_list[i].destroy();
			 		  }
			 		  for (i=0;i<obj1_list.length;i++){
			 		  	obj1_list=[];
			 		  	obj2_list=[];
			 		  	obj3_list=[];
			 		  	obj4_list=[];
			 		  }
			 		  $('#title').nextAll().remove();
			  		  public_part(public_data)
			 	},"json");
			}
		});
	  },"json");
	 	
	setInterval(function(){
	 	$.get('monitor-data.js',{'page_numb':page_num,'page_size':page_size},
	 	function(ajax){
	 		console.log(page_num)
	 		  name_info,type_info,cpu_info,mem_info,disk_info,flow_info;
	  		  public_data = ajax;
	 		  for (i=0;i<obj1_list.length;i++){
	 		  	obj1_list[i].destroy();
	 		  	obj2_list[i].destroy();
	 		  	obj3_list[i].destroy();
	 		  	obj4_list[i].destroy();
	 		  }
	 		  for (i=0;i<obj1_list.length;i++){
	 		  	obj1_list=[];
	 		  	obj2_list=[];
	 		  	obj3_list=[];
	 		  	obj4_list=[];
	 		  }
	 		  $('#title').nextAll().remove();
	 		  public_part(public_data);
	 	},"json");
 	},30000);
	function public_part(ajax){
		var dd = $("#title").parent();
		for(i=0;i<ajax.length;i++){
			name_info = ajax[i].machine_name;
			type_info = ajax[i].machine_type_name;
			mem_info = ajax[i].mem;
			cpu_info = ajax[i].cpu;
			disk_info = ajax[i].disk;
			flow_info = ajax[i].flow;
			dd.append(
				'<div class="span12 babox " style = "margin-left:-5px">'+
					'<div class="span1">'+
					    '<label class="font_name" id="name' + i + '"></label>'+
					    '</br>'+
					    '<label class="font" id="type' + i + '"></label>'+
					'</div>'+
					'<div class="span11">'+
						'<div class="span3">'+
						    '<div id="cpu-' + i + '" class="chart"></div>'+
						'</div>'+
						'<div class="span3">'+
						    '<div id="ram-' + i + '" class="chart"></div>'+
						'</div>'+
						'<div class="span3">'+
						    '<div id="disk-' + i + '" class="chart"></div>'+
						'</div>'+
						'<div class="span3">'+
						    '<div id="flow-' + i + '" class="chart"></div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			
			$('#name'+i).text(name_info);
			$('#type'+i).text(type_info);
			cpu_init(i);
	 		mem_init(i);
	 		disk_init(i);
	 		flow_init(i);
		}
	}
// //CPU使用率
function cpu_init(index){
 	var options = {
            chart: {
                renderTo: 'cpu-' + index,
                backgroundColor:'rgba(0,0,0,0)',
                marginBottom : '25',
            },
            
            title: {
                text: '',
                fontSize : '10px'
            },
            subtitle : {
            	text :''
            },
            xAxis: {
                
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0,
                max:50,
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +'<br/>'+
                        Highcharts.numberFormat(this.y, 0)+'%';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'CPU使用率',
            }]
        };
        options.series[0].data = cpu_info.y;
	 	options.xAxis.categories = cpu_info.x;
 		var chart = new Highcharts.Chart(options);
	 	obj1_list.push(chart);
 }
 //内存占用率
 function mem_init(index){
 	var options = {
            chart: {
                renderTo: 'ram-' +index,
                backgroundColor:'rgba(0,0,0,0)',
                marginBottom : '25',
            },
            
            title: {
                text: '',
                fontSize : '10px'
            },
            subtitle : {
            	text :''
            },
            xAxis: {
                
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0,
                max:50,
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +'<br/>'+
                        Highcharts.numberFormat(this.y, 0)+'%';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '内存占用率',
            }]
        };
	 	options.series[0].data = mem_info.y;
	 	options.xAxis.categories = mem_info.x;
	 	var chart = new Highcharts.Chart(options);
	 	obj2_list.push(chart);
 }
 

//磁盘占用率
 function disk_init(index){
 	var options = {
            chart: {
                renderTo: 'disk-' + index,
                backgroundColor:'rgba(0,0,0,0)',
                marginBottom : '25',
            },
            
            title: {
                text: '',
                fontSize : '10px'
            },
            subtitle : {
            	text :''
            },
            xAxis: {
                
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0,
                max:50,
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +'<br/>'+
                        Highcharts.numberFormat(this.y, 0)+'%';
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '磁盘占用率',
            }]
        };
	 	options.series[0].data = disk_info.y;
	 	options.xAxis.categories = disk_info.x;
	 	var chart = new Highcharts.Chart(options);
	 	obj3_list.push(chart);
 }



//网络流量
function flow_init(index){
 	var options = {
            chart: {
                renderTo: 'flow-' + index,
                backgroundColor:'rgba(0,0,0,0)',
                marginBottom : '25',
            },
            
            title: {
                text: '',
                fontSize : '10px'
            },
            subtitle : {
            	text :''
            },
            xAxis: {
                
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min : 0,
                // max:100000,
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +'<br/>'+
                        Highcharts.numberFormat(this.y, 0);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '收包字节数',
            },{
                name: '收包个数',
            },{
                name: '发包字节数',
            },{
                name: '发包个数',
            }]
        };
   		options.series[0].data = flow_info[0].y;
        options.series[1].data = flow_info[1].y;
        options.series[2].data = flow_info[2].y;
        options.series[3].data = flow_info[3].y;
   		options.xAxis.categories = flow_info[0].x;
	 	var chart = new Highcharts.Chart(options);
	 	obj4_list.push(chart);
 }

});
