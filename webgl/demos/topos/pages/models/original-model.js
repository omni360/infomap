var systemlist = {
	'windows': ['Windows 7','Windows 8','Windows XP'],
	'linux': ['Ubuntu 12.04 Server','RedHat 5.5','RedHat 9.0'],
	'ios': ['IOS-5','IOS-6','IOS-7'],
}

$(function(){
	window.parent && (window.parent.topo.isRenderer = true);
	
	var selectRowDom, // 被选中行 节点
		isodom = $('#NewISODialog'), // 原始数据对话框
		isoColBtndom = $('#NewISODialog .closed-btn'), // 原始数据对话框 - 关闭按钮
		baseVncdom = $('#NewVNCDialog'), // Vnc对话框
		baseVncColBtndom = $('#NewVNCDialog .closed-btn'),// Vnc对话框 - 关闭按钮
		baseDeldom = $('#DelDialog'), // 删除对话框
		baseDelColBtndom = $('#DelDialog .closed-btn'),// 删除对话框 - 关闭按钮
		newdom = $('#NewModelsDialog'), // 新建模板对话框
		newColBtndom = $('#NewModelsDialog .closed-btn'), // 新建模板对话框  - 关闭按钮
		
		newopenBtn = $('#Ori-NewModelsBtn'), // 打开按钮 新建模板对话框 
		isoopenBtn = $('#NewIsoBtn'), // 打开按钮 新建Iso
		vncopenBtn = $('#Ori-NewVNCBtn'),  // 打开按钮 Vnc对话框
		delopenBtn = $('#Ori-DelModelsBtn');  // 打开按钮 删除对话框
	
	$('input[type=file]').bootstrapFileInput();
	
	$('.searchDiv input').addClass('active');
	// $('.searchDiv input').focusin(function(){
		// $('.searchDiv input').addClass('active');
	// }).focusout(function(){
		// $('.searchDiv input').removeClass('active');
	// });
	
	var pagination = new Pagination({
		'id': '.origin-model-list',
		'data': origin_data_table,
		'everypageNum': 10,
		'tdfun': function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num+'<input type="hidden" value="'+n[n.length-1]+'">');
				$.each(n,function(j,m){
					if(n.length-1 != j){
						dom.eq(i).find('td').eq(j+1).html(m);
					}else{
						dom.eq(i).find('td').eq(j+1).html('<i class="icon-'+((m == '0') ? 'un': '')+'lock"></>');
					}				
				});
			}
		},
		'pagefun': function(){
			$('#Ori-NewVNCBtn').addClass('btndisable');
			$('#Ori-DelModelsBtn').addClass('btndisable');
		},
		'selectRowfun': function(dom){
			
			selectRowDom = dom;
			
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				$('#Base-NewVNCBtn').addClass('btndisable');
				$('#Base-DelModelsBtn').addClass('btndisable');
				return false;
			}
			(dom.find('input[type=hidden]').val() == 0) ? $('#Ori-DelModelsBtn').removeClass('btndisable') : $('#Ori-DelModelsBtn').addClass('btndisable');
			$('#Ori-NewVNCBtn').removeClass('btndisable');
		}
	});
	
	$('#systemVersion').html(changeSelect(systemlist.windows));

	$("input[name='radio-set']").change(function(){
		$('#systemVersion').html(changeSelect(systemlist[$("input[name='radio-set']:checked").val()]));
	});
	
	newopenBtn.click(function(){
		newdom.addClass('models-dialog-show');
	});
	
	isoopenBtn.click(function(){
		isodom.addClass('models-dialog-show');
	});
	
	vncopenBtn.click(function(){
		if(pagination.selectedRow == -1) return false;	
		baseVncdom.addClass('models-dialog-show');
	});
	
	delopenBtn.click(function(){
		if(pagination.selectedRow == -1) return false;	
		if(selectRowDom.find('input[type=hidden]').val() != 0) return false;
		baseDeldom.addClass('models-dialog-show');
	});
	
	newColBtndom.click(function(){
		ClosedDialog(newdom);
	});
	
	isoColBtndom.click(function(){
		ClosedDialog(isodom);
	});
	
	baseVncColBtndom.click(function(){
		ClosedDialog(baseVncdom);
	});
	
	baseDelColBtndom.click(function(){
		ClosedDialog(baseDeldom);
	});
	
	function ClosedDialog(dom){
		dom.addClass('models-dialog-hide');
		 window.setTimeout( function(){
			dom.removeClass('models-dialog-show');
			dom.removeClass('models-dialog-hide');
		}, 300);
	}
	
	function changeSelect(_list){
		var _temp = '';
		$.each(_list,function(i,n){
			_temp += ('<option>'+n+'</option>');
		});
		return _temp;
	}
});

function P(info){
	console.info(info);
}