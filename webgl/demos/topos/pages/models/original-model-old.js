var systemlist = {
	'windows': ['Windows 7','Windows 8','Windows XP'],
	'linux': ['Ubuntu 12.04 Server','RedHat 5.5','RedHat 9.0'],
	'ios': ['IOS-5','IOS-6','IOS-7'],
}

var tabledata = [
	['测试模板1','64位','Windows','win7','2M','1.6GHz','20G','测试模板','1'],
	['测试模板2','32位','Windows','window xp','2M','1.6GHz','10G','测试模板','0'],
	['测试模板3','64位','Linux','Ubuntu12.04','2M','1.6GHz','10G','测试模板','0'],
	['测试模板4','32位','Windows','win7','4M','1.6GHz','10G','测试模板','1'],
	['测试模板5','64位','Windows','win8','2M','1.6GHz','10G','测试模板','0'],
	['测试模板6','64位','Windows','window xp','2M','1.6GHz','10G','测试模板','0'],
	['测试模板7','64位','Windows','win7','2M','1.6GHz','10G','测试模板','1'],
	['测试模板8','32位','Windows','win8','2M','1.6GHz','10G','测试模板','1'],
	['测试模板9','64位','Linux','Ubuntu12.04','2M','1.6GHz','10G','测试模板','0'],
	['测试模板10','64位','Windows','win8','3M','1.6GHz','10G','测试模板','0'],
	['测试模板11','32位','Windows','win8','2M','1.6GHz','10G','测试模板','0'],
	['测试模板12','64位','Windows','win8','2M','1.6GHz','10G','测试模板','0'],
	['测试模板13','32位','IOS','IOS - 7','2M','1.6GHz','10G','测试模板','0'],
	['测试模板14','64位','Windows','win8','2M','1.6GHz','40G','测试模板','0'],
	['测试模板15','64位','Linux','win8','2M','1.6GHz','10G','测试模板','1'],
	['测试模板16','32位','Windows','window xp','2M','1.6GHz','10G','测试模板','0'],
	['测试模板17','64位','Windows','win8','2M','1.6GHz','10G','测试模板','1'],
	['测试模板18','32位','Linux','Ubuntu12.04','2M','1.6GHz','10G','测试模板','0'],
	['测试模板19','64位','Windows','win7','2M','1.6GHz','10G','测试模板','0'],
	['测试模板20','32位','Windows','win8','2M','1.6GHz','10G','测试模板','0'],
	['测试模板21','64位','Linux','Ubuntu12.04','2M','1.6GHz','10G','测试模板','0'],
	['测试模板22','64位','Windows','window xp','2M','1.6GHz','10G','测试模板','0'],
]
var selectedRow = -1,
	transform = function(element, value, key) {
		key = key || "Transform";
		["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
			element.style[prefix + key] = value;	
		});	
		return element;
	}

$(function(){
	
	$('input[type=file]').bootstrapFileInput();
	
	$('.searchDiv input').focusin(function(){
		$('.searchDiv input').addClass('active');
	});
	
	$('.searchDiv input').focusout(function(){
		$('.searchDiv input').removeClass('active');
	});
	
	//-------------------------------------------------------------
	
	var tdhtml = '',
		pageBtnStatus = true,
		pageData = [],
		everypageNum = 13,
		currentpage = -1,
		pageNum = parseInt(tabledata.length/everypageNum)+1,
		preBtn = $('#prepagebtn'),
		nextBtn = $('#nextpagebtn');
	
	for(var i = 0 ; i < pageNum; i++){
		var _temp_page_data = [];
		for(var j = i*everypageNum ; j < (i+1)*everypageNum; j++){
			tabledata[j] ? _temp_page_data.push(tabledata[j]) : _temp_page_data.push([]);
		}
		pageData.push(_temp_page_data);
	}

	for(var i = 1 ; i <= everypageNum; i++){
		tdhtml += '<tr><td>&nbsp;</td>';
		for(var j = 0 ; j < 9; j++){
			tdhtml += ('<td></td>');
		}
		tdhtml += '</tr>';
	}
	$('#models-table-list tbody').html(tdhtml);
	var listDom = $('#models-table-list tbody tr');
	
	changePageHtml('next');
// 	
	function changePageHtml(_v){
		listDom.find('.selected').removeClass('selected');
		selectedRow = -1;
		$('#NewVNCBtn').addClass('btndisable');
		$('#DelModelsBtn').addClass('btndisable');
		if(_v == 'pre'){
			currentpage--;
			changepageBtnStatus(0,currentpage);	
		}else{
			currentpage++;
			changepageBtnStatus(1,currentpage);
		}
		
		$.each(pageData[currentpage],function(i,n){
			if(n.length == 0){
				listDom.eq(i).find('td').html('&nbsp;');
			}else{
				listDom.eq(i).find('td').eq(0).html((i+1)+currentpage*everypageNum+'<input type="hidden" value="'+n[n.length-1]+'">');
				$.each(n,function(j,m){
					if(n.length-1 != j){
						listDom.eq(i).find('td').eq(j+1).html(m);
					}else{
						listDom.eq(i).find('td').eq(j+1).html('<i class="icon-'+((m == '0') ? 'un': '')+'lock"></>');
					}				
				});
			}
		});	
		
		$('#recordCount').html('当前显示第'+(currentpage+1)+'页 , 共'+pageNum+'页('+tabledata.length+'条)');
	}
	
	listDom.each(function(i){
		$(this).dblclick(function(){
			if(!$.isNumeric(parseInt($(this).find('td').eq(0).html()))) return false;
			listDom.find('.selected').removeClass('selected');
			$(this).find('td').addClass('selected');
			selectedRow = i;
			P($(this).find('input[type=hidden]').val());
			($(this).find('input[type=hidden]').val() == 0) ? $('#DelModelsBtn').removeClass('btndisable') : $('#DelModelsBtn').addClass('btndisable');
			$('#NewVNCBtn').removeClass('btndisable');
		});
	});
	
	preBtn.click(function(){
		if (currentpage == 0 || !pageBtnStatus) return false;
		pageBtnStatus = false;
		listDom.addClass('changerow');
		window.setTimeout( function(){
			changePageHtml('pre');
		}, 200);
		window.setTimeout( function(){
			listDom.removeClass('changerow');
			pageBtnStatus = true;
		}, 400);
		
	});
	
	nextBtn.click(function(){
		if ((currentpage+1) >= pageNum || !pageBtnStatus) return false;
		pageBtnStatus = false;
		listDom.addClass('changerow');
		window.setTimeout( function(){
			changePageHtml('next');
		}, 200);
		window.setTimeout( function(){
			listDom.removeClass('changerow');
			pageBtnStatus = true;
		}, 400);
	});
	
	function changepageBtnStatus(_i,c){
		if (_i == 1){ 
			(c != 0) && preBtn.removeClass('btndisable'); 
			((c+1) >= pageNum) && nextBtn.addClass('btndisable'); 
		}else{
			nextBtn.removeClass('btndisable'); 
			(c == 0) && preBtn.addClass('btndisable'); 
		}
	}
	
	//-------------------------------------------------------------
	
	
	$('#systemVersion').html(changeSelect(systemlist.windows));

	$("input[name='radio-set']").change(function(){
		$('#systemVersion').html(changeSelect(systemlist[$("input[name='radio-set']:checked").val()]));
	});
	
	$('#NewModelsBtn').click(function(){
		$('#NewModelsDialog').addClass('models-dialog-show');
	});
	
	$('#NewIsoBtn').click(function(){
		$('#NewISODialog').addClass('models-dialog-show');
	});
	
	$('#NewVNCBtn').click(function(){
		if(selectedRow == -1) return false;	
		$('#NewVNCDialog').addClass('models-dialog-show');
	});
	
	$('#DelModelsBtn').click(function(){
		if(selectedRow == -1) return false;	
		$('#DelDialog').addClass('models-dialog-show');
	});
	
	$('#NewModelsDialog #closed-btn').click(function(){
		$('#NewModelsDialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#NewModelsDialog').removeClass('models-dialog-show');
			$('#NewModelsDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#NewISODialog #closed-btn').click(function(){
		$('#NewISODialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#NewISODialog').removeClass('models-dialog-show');
			$('#NewISODialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#NewVNCDialog #closed-btn').click(function(){
		$('#NewVNCDialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#NewVNCDialog').removeClass('models-dialog-show');
			$('#NewVNCDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
	$('#DelDialog #closed-btn').click(function(){
		$('#DelDialog').addClass('models-dialog-hide');
		 window.setTimeout( function(){
			$('#DelDialog').removeClass('models-dialog-show');
			$('#DelDialog').removeClass('models-dialog-hide');
		}, 300);
	});
	
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

