$(function(){
	window.parent && (window.parent.topo.isRenderer = true);
	
	var newdom = $('#NewDialog'), 
		newColBtndom = $('#NewDialog .closed-btn'), 
		newBtn = $('#NewBtn'), 
		deldom = $('#DelDialog'), 
		delColBtndom = $('#DelDialog .closed-btn'),
		delBtn = $('#DelBtn'),
		subBtn = $('#subServerBtn');
	
	var pagination = new Pagination({
		'id': '.natural-list',
		'data': n_data,
		'everypageNum': 15,
		'tdfun': function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					if( j == 6 || j == 7 || j == 8){
						dom.eq(i).find('td').eq(j+1).html( 
							(m == '1') ? '<div class="server-ok-flag"><i class="icon-ok"></div>' : '<div class="server-waring-flag"><i class="icon-remove"></div>'
						);
					}else{
						dom.eq(i).find('td').eq(j+1).html(m);
					}				
				});
			}
		},
		'pagefun': function(){
			delBtn.addClass('btndisable');
			// updateBtn.addClass('btndisable');
		},
		'selectRowfun': function(dom){
			selectRowDom = dom;
// 			
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				delBtn.addClass('btndisable');
				// updateBtn.addClass('btndisable');
				return false;
			}
			delBtn.removeClass('btndisable');
			// updateBtn.removeClass('btndisable');
		}
	});
	
	newBtn.click(function(){
		newdom.addClass('models-dialog-show');
	});
	newColBtndom.click(function(){
		ClosedDialog(newdom);
	});
	
	// 添加数据
	subBtn.click(function(){
		console.info($(this).attr('data'));
	});
	
	delBtn.click(function(){
		if(pagination.selectedRow == -1) return false;	
		deldom.addClass('models-dialog-show');
	});
	delColBtndom.click(function(){
		ClosedDialog(deldom);
	});
	function ClosedDialog(dom){
		dom.addClass('models-dialog-hide');
		 window.setTimeout( function(){
			dom.removeClass('models-dialog-show');
			dom.removeClass('models-dialog-hide');
		}, 300);
	}
})
