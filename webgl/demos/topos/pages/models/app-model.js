$(function(){
	window.parent && (window.parent.topo.isRenderer = true);
	
	var selectRowDom, // 被选中行 节点
		oridom = $('#orginModelsDialog'), // 原始数据对话框
		oriColBtndom = $('#orginModelsDialog .closed-btn'), // 原始数据对话框 - 关闭按钮
		baseVncdom = $('#Base-NewVNCDialog'), // Vnc对话框
		baseVncColBtndom = $('#Base-NewVNCDialog .closed-btn'),// Vnc对话框 - 关闭按钮
		baseDeldom = $('#Base-DelDialog'), // 删除对话框
		baseDelColBtndom = $('#Base-DelDialog .closed-btn'),// 删除对话框 - 关闭按钮
		newdom = $('#Base-NewModelsDialog'), // 新建模板对话框
		newColBtndom = $('#Base-NewModelsDialog .closed-btn'), // 新建模板对话框  - 关闭按钮
		
		newopenBtn = $('#Base-NewModelsBtn'), // 打开按钮 新建模板对话框 
		vncopenBtn = $('#Base-NewVNCBtn'),  // 打开按钮 Vnc对话框
		delopenBtn = $('#Base-DelModelsBtn');  // 打开按钮 删除对话框
	
	$('.searchDiv input').addClass('active');
	// $('.searchDiv input').focusin(function(){
		// $('.searchDiv input').addClass('active');
	// }).focusout(function(){
		// $('.searchDiv input').removeClass('active');
	// });
	
	var app_pagination = new Pagination({
		'id': '.app-model-list',
		'data': app_data_table,
		'everypageNum': 10,
		'tdfun': function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					dom.eq(i).find('td').eq(j+1).html(m);			
				});
			}
		},
		'pagefun': function(){
			vncopenBtn.addClass('btndisable');
			delopenBtn.addClass('btndisable');
		},
		'selectRowfun': function(dom){
			
			selectRowDom = dom;
			
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				vncopenBtn.addClass('btndisable');
				delopenBtn.addClass('btndisable');
				return false;
			}
			delopenBtn.removeClass('btndisable');
			vncopenBtn.removeClass('btndisable');
		}
	});
	
	var pagination = new Pagination({
		'id': '.origin-model-list',
		'data': origin_data_create,
		'everypageNum': 7,
		tdfun : function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					dom.eq(i).find('td').eq(j+1).html(m);				
				});
			}
		},
		'pagefun': function(){
			$('#createOAppBtn').addClass('btndisable');
		},
		'selectRowfun': function(dom){
			selectRowDom = dom;
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				$('#createOAppBtn').addClass('btndisable');
				return false;
			}
			$('#createOAppBtn').removeClass('btndisable');
		}
	});
	
	var base_pagination = new Pagination({
		'id': '.base-model-list',
		'data': base_data_create,
		'everypageNum': 7,
		tdfun : function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					dom.eq(i).find('td').eq(j+1).html(m);				
				});
			}
		},
		'pagefun': function(){
			$('#createBAppBtn').addClass('btndisable');
		},
		'selectRowfun': function(dom){
			selectRowDom = dom;
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				$('#createBAppBtn').addClass('btndisable');
				return false;
			}
			$('#createBAppBtn').removeClass('btndisable');
		}
	});
	
	$('#createOAppBtn').click(function(){
		if(pagination.selectedRow == -1) return false;	
		createModel(true);
	});
	$('#createBAppBtn').click(function(){
		if(base_pagination.selectedRow == -1) return false;	
		createModel();
	});
	
	function createModel(_v){
		var getDomData = selectRowDom.find('td');
		
		$('#modelType').html(getDomData.eq(3).html());
		$('#systemVersion').html(getDomData.eq(4).html());
		$('#systemType').html(getDomData.eq(2).html());
		$('#nemVal').html(getDomData.eq(5).html());
		$('#cpuVal').html(getDomData.eq(6).html());
		$('#diskVal').html(getDomData.eq(7).html());
		
		_v ? $('#orginModelsDialog').addClass('models-dialog-hide') : $('#baseModelsDialog').addClass('models-dialog-hide');
		
		newdom.addClass('models-dialog-show');
		
		 window.setTimeout( function(){
		 	if(_v){
		 		$('#orginModelsDialog').removeClass('models-dialog-show');
				$('#orginModelsDialog').removeClass('models-dialog-hide');
		 	}else{
		 		$('#baseModelsDialog').removeClass('models-dialog-show');
				$('#baseModelsDialog').removeClass('models-dialog-hide');
		 	}
			
			
		}, 300);
	}
	
	$('#selectBaseBtn').click(function(){	
		$('#baseModelsDialog').addClass('models-dialog-show');
		$('#orginModelsDialog').addClass('models-dialog-hide');
		window.setTimeout( function(){
			$('#orginModelsDialog').removeClass('models-dialog-show');
			$('#orginModelsDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#selectOriginBtn').click(function(){	
		$('#orginModelsDialog').addClass('models-dialog-show');
		$('#baseModelsDialog').addClass('models-dialog-hide');
		window.setTimeout( function(){
			$('#baseModelsDialog').removeClass('models-dialog-show');
			$('#baseModelsDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#Base-NewModelsBtn').click(function(){	
		$('#orginModelsDialog').addClass('models-dialog-show');
	});
	
	vncopenBtn.click(function(){
		if(app_pagination.selectedRow == -1) return false;	
		baseVncdom.addClass('models-dialog-show');
	});
	
	delopenBtn.click(function(){
		if(app_pagination.selectedRow == -1) return false;	
		baseDeldom.addClass('models-dialog-show');
	});
	
	baseVncColBtndom.click(function(){
		baseVncdom.addClass('models-dialog-hide');
		 window.setTimeout( function(){
			baseVncdom.removeClass('models-dialog-show');
			baseVncdom.removeClass('models-dialog-hide');
		}, 300);
	});
	
	baseDelColBtndom.click(function(){
		baseDeldom.addClass('models-dialog-hide');
		 window.setTimeout( function(){
			baseDeldom.removeClass('models-dialog-show');
			baseDeldom.removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#orginModelsDialog #closed-btn').click(function(){
		$('#orginModelsDialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#orginModelsDialog').removeClass('models-dialog-show');
			$('#orginModelsDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	$('#baseModelsDialog #closed-btn').click(function(){
		$('#baseModelsDialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#baseModelsDialog').removeClass('models-dialog-show');
			$('#baseModelsDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#Base-NewModelsDialog #closed-btn').click(function(){
		$('#Base-NewModelsDialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#Base-NewModelsDialog').removeClass('models-dialog-show');
			$('#Base-NewModelsDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
})

function P(info){
	console.info(info);
}
