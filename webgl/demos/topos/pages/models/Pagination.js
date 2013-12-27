/* 自定义table分页控件 */
Pagination = function(params){
	var _me = this;
	_me.options = {
		id: '',
		data: [],
		everypageNum: 5, // 每页显示条数
		currentpage : -1, // 当前页数--初始化后将执行下一页
		pageNum: 0,
		tdfun: function(){},
		pagefun: function(){},
		selectRowfun: function(){},
	};
	
	$.extend(true,_me.options, params);
	
	_me.pdom = $(_me.options.id);
	
	if(_me.pdom.length == 0) { console.info("con't found document node") ; return false;}
	
	// 内部初始化
	_me.tabledom = _me.pdom.find('table.models-table-list');
	_me.preBtn = _me.pdom.find('.page-control .prepagebtn');
	_me.nextBtn = _me.pdom.find('.page-control .nextpagebtn');
	
	_me.initTable = function(){
		_me.tdhtml = '';
		/* 重置表格 */
		for(var i = 1 ; i <= _me.options.everypageNum; i++){
			_me.tdhtml += '<tr><td>&nbsp;</td>';
			for(var j = 0 ; j < _me.tabledom.find('thead th').length-1; j++){
				_me.tdhtml += ('<td></td>');
			}
			_me.tdhtml += '</tr>';
		}
		_me.tabledom.find('tbody').html(_me.tdhtml);
		// 获取每个tr 节点...
		_me.listDom = _me.tabledom.find('tbody tr');
	}
	
	_me.dataPagination = function(){
		_me.pageData = [];
		_me.selectedRow = -1;
		_me.options.currentpage = -1;
		_me.pageBtnStatus = true;
		
		/* 按照分页规则 ，将数据分成数组 */
		_me.options.pageNum = (_me.options.data.length == _me.options.everypageNum) ? 1 : parseInt(_me.options.data.length/_me.options.everypageNum)+1 ;
		
		for(var i = 0 ; i < _me.options.pageNum; i++){
			var _temp_page_data = [];
			for(var j = i* _me.options.everypageNum ; j < (i+1)* _me.options.everypageNum; j++){
				_me.options.data[j] ? _temp_page_data.push(_me.options.data[j]) : _temp_page_data.push([]);
			}
			_me.pageData.push(_temp_page_data);
		}
	}
	
	_me.changePageHtml = function(_v){
		_me.listDom.find('.selected').removeClass('selected');
		_me.selectedRow = -1;
		
		// 执行分页切换函数
		_me.options.pagefun();
		
		if(_v == '0'){
			_me.options.currentpage--;
			_me.changepageBtnStatus(0,_me.options.currentpage);	
		}else{
			_me.options.currentpage++;
			_me.changepageBtnStatus(1,_me.options.currentpage);
		}
		
		$.each(_me.pageData[_me.options.currentpage],function(i,n){
			_me.options.tdfun(i,n,_me.listDom,_me.options.currentpage,_me.options.everypageNum);
		});	
		
		_me.pdom.find('.recordCount').html('当前显示第'+(_me.options.currentpage+1)+'页 , 共'+_me.options.pageNum+'页('+_me.options.data.length+'条)');
		
	}
	
	_me.changepageBtnStatus = function(_i,c){
		if (_i == 1){ 
			(c != 0) && _me.preBtn.removeClass('btndisable'); 
			((c+1) >= _me.options.pageNum) && _me.nextBtn.addClass('btndisable'); 
		}else{
			_me.nextBtn.removeClass('btndisable'); 
			(c == 0) && _me.preBtn.addClass('btndisable'); 
		}
	}
	
	_me.pageBtnFun = function(_v){
		if(_v == '1'){
			if ((_me.options.currentpage+1) >= _me.options.pageNum || !_me.pageBtnStatus) return false;
		}else{
			if (_me.options.currentpage == 0 || !_me.pageBtnStatus) return false;
		}
		_me.pageBtnStatus = false;
		_me.listDom.addClass('changerow');
		window.setTimeout( function(){
			_me.changePageHtml(_v);
		}, 200);
		window.setTimeout( function(){
			_me.listDom.removeClass('changerow');
			_me.pageBtnStatus = true;
		}, 400);
	}
	
	_me.bindevent = function(){
		//tr 双击事件
		_me.listDom.each(function(i){
			$(this).click(function(){
				if($(this).has('.selected').length != 0){
					$(this).find('.selected').removeClass('selected');
					_me.selectedRow = -1;
					_me.options.pagefun();
				}else{
					_me.listDom.find('.selected').removeClass('selected');
					$(this).find('td').addClass('selected');
					_me.selectedRow = i;
					_me.options.selectRowfun($(this));
				}
			});
		});
		// 分页按钮
		_me.preBtn.click(function(){
			_me.pageBtnFun('0');
		});
		_me.nextBtn.click(function(){
			_me.pageBtnFun('1');
		});
	}
	
	_me.update = function(_data){
		_data && (_me.options.data = _data);
		_me.preBtn.addClass('btndisable'); 
		_me.nextBtn.removeClass('btndisable'); 
		_me.dataPagination();
		_me.changePageHtml('1');
	}
	
	_me.initTable();
	_me.dataPagination();
	_me.changePageHtml('1');
	_me.bindevent();
}

function CustomPaginations(){
	return paginations = {
		'id': arguments[0] || '',
		'data': arguments[1] || [],
		'everypageNum': arguments[2] || 3,
		'tdfun': arguments[3] || function(i,n,dom,c,num){
			if(n.length == 0){
				dom.eq(i).find('td').html('&nbsp;');
			}else{
				dom.eq(i).find('td').eq(0).html((i+1)+c*num);
				$.each(n,function(j,m){
					dom.eq(i).find('td').eq(j+1).html(m);		
				});
			}
		},
		'pagefun': arguments[4] || function(){
		},
		'selectRowfun': arguments[5] || function(dom){
			selectRowDom = dom;
		}
	};
}
