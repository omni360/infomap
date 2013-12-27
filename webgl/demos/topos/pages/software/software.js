var _tempsoftware_data = [];


$(function(){
	window.parent && (window.parent.topo.isRenderer = true);
	
	var selectRowDom, // 被选中行 节点
		updatedom = $('#UpdateDialog'), 
		updateColBtndom = $('#UpdateDialog .closed-btn'),
		deldom = $('#DelDialog'), 
		delColBtndom = $('#DelDialog .closed-btn'),
		newdom = $('#NewDialog'), 
		newColBtndom = $('#NewDialog .closed-btn'), 
		
		newBtn = $('#NewBtn'), 
		updateBtn = $('#UpdateBtn'),  
		delBtn = $('#DelBtn');  
		
	$('input[type=file]').bootstrapFileInput();
	
	var pagination = new Pagination({
		'id': '.app-software-list',
		'data': software_data,
		'everypageNum': 15,
		'tdfun': function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					if( j == 3 ){
						dom.eq(i).find('td').eq(j+1).html('<span class="img-system '+m+'"></span>'+m);
					}else if( j == 2){
						switch(m){
							case '浏览器':
								dom.eq(i).find('td').eq(j+1).html('<span class="img-softtype ie"></span>'+m);
								break;
							case '开发工具':
								dom.eq(i).find('td').eq(j+1).html('<span class="img-softtype codetool"></span>'+m);
								break;
							case '音频播放':
								dom.eq(i).find('td').eq(j+1).html('<span class="img-softtype muisc"></span>'+m);
								break;
							case '聊天沟通':
								dom.eq(i).find('td').eq(j+1).html('<span class="img-softtype qq"></span>'+m);
								break;
						}
						
					}else{
						dom.eq(i).find('td').eq(j+1).html(m);
					}				
				});
			}
		},
		'pagefun': function(){
			delBtn.addClass('btndisable');
			updateBtn.addClass('btndisable');
		},
		'selectRowfun': function(dom){
			selectRowDom = dom;
			
			if(!$.isNumeric(parseInt(dom.find('td').eq(0).html()))) {
				delBtn.addClass('btndisable');
				updateBtn.addClass('btndisable');
				return false;
			}
			delBtn.removeClass('btndisable');
			updateBtn.removeClass('btndisable');
		}
	});
	
	$('.searchDiv .searchInput input').addClass('active');
	
	// $('.searchDiv .searchInput input').focusin(function(){
		// $(this).addClass('active');
	// });
	$('.searchDiv').focusout(function(){
		// $(this).find('.searchInput input').removeClass('active');
	});
	
	$('.showPanelBtn').click(function(){
		var _tempdom = $(this).parent().find('.search-panel');
		if($(this).find('input').val() == 0){
			_tempdom.addClass('search-panel-show');
			$(this).find('input').val('1');
		}
		else{
			_tempdom.removeClass('search-panel-show');
			$(this).find('input').val('0');
		}
	});
	
	$('.closeSearchBtn').click(function(){
		$('.showPanelBtn').parent().find('.search-panel').removeClass('search-panel-show');
		$('.showPanelBtn').find('input').val('0');
	});
	
	$('.okSearchBtn').click(function(){
		// $('.showPanelBtn').parent().find('.search-panel').removeClass('search-panel-show');
		// $('.showPanelBtn').find('input').val('0');
		_tempsoftware_data = [];
		$.each(software_data,function(i,n){
			
			if( ($('#searchSoftName').val() == '' ? true : n[0] == $('#searchSoftName').val()) &&
				(($('#searchsoftType').val() == '全部') ? true : n[2] == $('#searchsoftType').val()) && 
				(($('#searchsystemType').val() == '全部') ? true : n[3] == $('#searchsystemType').val())){
				_tempsoftware_data.push(n);
			}
		});
		pagination.update(_tempsoftware_data);
	});
	
	$('.resetSearchBtn').click(function(){
		$('.searchNameipt').val('');
		$('#searchSoftName').val('');
		$('#searchsoftType').val('全部');
		$('#searchsystemType').val('全部');
		pagination.update(software_data);
	})
	
	newBtn.click(function(){
		newdom.addClass('models-dialog-show');
	});
	newColBtndom.click(function(){
		ClosedDialog(newdom);
	});
	
	updateBtn.click(function(){
		if(pagination.selectedRow == -1) return false;	
		
		var getDomData = selectRowDom.find('td');

		$('#updateSoftName').val(getDomData.eq(1).html());
		$('#updateSoftVersion').val(getDomData.eq(2).html());
		$("#updatesoftType").val(getDomData.eq(3).html());
		
		$('input[name="updateradio"][value="'+getDomData.eq(4).html()+'"]').attr('checked',true)

		$('#updateSoftInfo').val(getDomData.eq(6).html());
		
		updatedom.addClass('models-dialog-show');
	});
	updateColBtndom.click(function(){
		ClosedDialog(updatedom);
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

function P(info){
	console.info(info);
}