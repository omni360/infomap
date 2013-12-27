$(function(){
	window.parent && (window.parent.topo.isRenderer = true);
	
	var selectRowDom, // 被选中行 节点
		oridom = $('#orginModelsDialog'), // 原始数据对话框
		oriColBtndom = $('#orginModelsDialog .closed-btn'), // 原始数据对话框 - 关闭按钮
		baseVncdom = $('#Base-NewVNCDialog'), // Vnc对话框
		baseVncColBtndom = $('#Base-NewVNCDialog .closed-btn');// Vnc对话框 - 关闭按钮
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
	
	var base_pagination = new Pagination({
		'id': '.base-model-list',
		'data': custom_data_table,
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
			$('#createBaseBtn').addClass('btndisable');
		},
		'selectRowfun': function(dom){
			selectRowDom = dom;
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				$('#createBaseBtn').addClass('btndisable');
				return false;
			}
			$('#createBaseBtn').removeClass('btndisable');
		}
	});
	
	$('#createBaseBtn').click(function(){
		if(pagination.selectedRow == -1) return false;	
		
		var getDomData = selectRowDom.find('td');
		
		$('#modelType').html(getDomData.eq(3).html());
		$('#systemVersion').html(getDomData.eq(4).html());
		$('#systemType').html(getDomData.eq(2).html());
		$('#nemVal').html(getDomData.eq(5).html());
		$('#cpuVal').html(getDomData.eq(6).html());
		$('#diskVal').html(getDomData.eq(7).html());
		oridom.addClass('models-dialog-hide');
		newdom.addClass('models-dialog-show');
		window.setTimeout( function(){
			oridom.removeClass('models-dialog-show');
			oridom.removeClass('models-dialog-hide');
		}, 300);
	});
	
	newopenBtn.click(function(){	
		oridom.addClass('models-dialog-show');
	});
	
	vncopenBtn.click(function(){
		if(base_pagination.selectedRow == -1) return false;	
		baseVncdom.addClass('models-dialog-show');
	});
	
	delopenBtn.click(function(){
		if(base_pagination.selectedRow == -1) return false;	
		baseDeldom.addClass('models-dialog-show');
	});
	
	baseVncColBtndom.click(function(){
		ClosedDialog(baseVncdom);
	});
	baseDelColBtndom.click(function(){
		ClosedDialog(baseDeldom);
	});
	oriColBtndom.click(function(){
		ClosedDialog(oridom);
	});
	newColBtndom.click(function(){
		ClosedDialog(newdom);
	});
	
	function ClosedDialog(dom){
		dom.addClass('models-dialog-hide');
		 window.setTimeout( function(){
			dom.removeClass('models-dialog-show');
			dom.removeClass('models-dialog-hide');
		}, 300);
	}
	
})

function P(info){
	console.info(info);
}
