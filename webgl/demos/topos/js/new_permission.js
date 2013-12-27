var fun_test,person_info = [];
function insert_card_html(para, i){
	person_div = $(
		//'<div class="element width2 '+ role_color_struct[para[i].role_id] + '">'+
		'<div class="element width2 " person_id=' + para[i].person_id + '>'+
		      '<p class="number">'+para[i].department_name+'</p>'+
		      '<p id="department_id" style="display:none;">'+para[i].department_id+'</p>'+
		      '<p id="father_id" style="display:none;">'+para[i].father_id+'</p>'+
		      '<p id="first_id" style="display:none;">'+para[i].first_id+'</p>'+
		      '<div class="person_img">'+
		      	// '<img src="imgs/permission_img/girl.gif" class="symbol"></img>'+
			  '</div>'+
		      '<div class="username">'+
		      	 '<h2 id="person_name" class="name">'+para[i].name+'</h2>'+
		      	 '<label id="person_id">'+para[i].person_id+'</label>'+
		      	 '<label id="sexo" style="display:none">'+para[i].sexo+'</label>'+
		      '</div>'+
		      '<div class="user_role">'+
		      	'<label id="user_num" class="weight role" style="display:none"></label>'+
		      	 '<label id="user_name" class="weight user" href="#edit_user" data-toggle="modal">'+para[i].user_name+'</label>'+
		      	 '<label id="role_name" class="weight role" href="#edit_user"  data-toggle="modal">'+para[i].role_name+'</label>'+
		      	 '<label id="user_name_2" class="weight user" href="#edit_user"  data-toggle="modal"></label>'+
		      	 '<label id="role_name_2" class="weight role" href="#edit_user"  data-toggle="modal"></label>'+
		      	 '<label id="user_name_3" class="weight user" href="#edit_user"  data-toggle="modal"></label>'+
		      	 '<label id="role_name_3" class="weight role" href="#edit_user"  data-toggle="modal"></label>'+
		      	 '<label id="role_id" class="role_id" style="display:none;">'+para[i].role_id+'</label>'+
		      	 '<label id="login_id" style="display:none;">'+para[i].login_id+'</label>'+
		      '</div>'+
		    '</div>'
	)
	if(para[i].sexo == 0){
		person_div.find(".person_img").append('<img src="image/permission_img/boy.png" class="symbol"></img>')
	}
	else{
		person_div.find(".person_img").append('<img src="image/permission_img/girl.png" class="symbol"></img>')
	}
	sets = $('#nav .option-set')
	linked = sets.find('.active')
	value = linked.find('a').attr('data-option-value')
	if(value == "role"){
		person_div.addClass(role_color_struct[para[i].role_id])
	}else{
		person_div.addClass(depart_color_struct[para[i].first_id])
	}
	return person_div;
}

//生成role_nav
function role_nav_list(p_nav, role_nav, is_creat_head){
	if(is_creat_head == true){
		roles_head = p_nav.append(
			'<div id="left_color_nav_1" class="span12 back_box">'+
				'<div id="head" class="span12 color_part" data-option-key="filter">'+
					'<button id="filter" class="color_block" data-option-value="*" style="background: #FFF;border: 1px solid #FFF">'+
						'<label class="color_label">全部</label>'+
					'</button>'+
				'</div>'+
			'</div>'
		)
	}
	head = $('#left_color_nav_1 #head')
	for(i=0;i<role_nav.length;i++){
		roles_other = head.after(
    		'<div class="span12 color_part" data-option-key="filter">'+
				'<button id="filter" class="color_block '+ role_color_struct[parseInt(role_nav[i].id)]  + '" data-option-value=".'+ color_list[i]+'">'+
					'<label class="color_label">'+role_nav[i].name+'</label>'+
					'<label id="left_role_id" style="display:none">'+role_nav[i].id+'</label>'+
				'</button>'+
			'</div>'
		);
	}
}

//生成depart_nav
function depart_nav_list(p_nav,depart_nav,is_creat_head){
	var depart_name = []
		depart_id = []
		depart_fId = []
	for(i=0;i<depart_nav.length;i++){
		if(parseInt(depart_nav[i].fId) == parseInt(depart_nav[i].id)){
			depart_name.push(depart_nav[i].name)
			depart_id.push(depart_nav[i].id)
			depart_fId.push(depart_nav[i].fId)
		}
	}
	if(is_creat_head == true){
		depart_head = p_nav.append(
			'<div id="left_color_nav_2" class="span12 back_box">'+
	    		'<div id="head" class="span12 color_part" data-option-key="filter">'+
					'<button id="color_1" class="color_block" data-option-value="*" style="background: #FFF;border: 1px solid #FFF">'+
						'<label class="color_label">全部</label>'+
					'</button>'+
				'</div>'+
			'</div>'
		)
	}
	head = $('#left_color_nav_2 #head')
	for (i=0;i<depart_name.length;i++){
		depart_other = head.after(
			'<div class="span12 color_part" data-option-key="filter">'+
				'<button id="color_1" class="color_block ' + depart_color_struct[parseInt(depart_id[i])]  + '" data-option-value=".'+color_list[i]+'">'+
					'<label class="color_label">'+ depart_name[i] +'</label>'+
					'<label class="depart_id" style="display:none">'+ depart_id[i] +'</label>'+
					'<label class="depart_fid" style="display:none">'+ depart_fId[i] +'</label>'+
				'</button>'+
			'</div>'
		)
	}
}

$(document).ready(function(){
    $(window.parent.document).find('#main_iframe').css({'opacity':1});
    
	$('.option-set li').click(function(){
		$('.active').removeClass();
		$(this).addClass('active');
	})
	var public_function;
	//颜色属性名
	color_list = ["orange ","blue ","yellow ","green ","gray ","red ","green_2 ","blue_2 ","pink ","pink_2" ]
	
	var role_data, depart_data,role_nav = {},depart_nav = [];
	//角色与颜色属性的对应关系结构 同时获取role_nav数据
	role_color_struct = {}
	$.get(show_role_url,function(role_data){
		role_nav = role_data
		for(i=0;i<role_data.length;i++){
			key = role_data[i].id
			value = color_list[i]
			role_color_struct[key] = value
		}
	},"json")
	//部门与颜色属性的对应关系结构 同时获取depart_nav数据
	depart_color_struct = {}
	$.get(show_department_url,function(depart_data){
		depart_nav = depart_data
		depart_name = []
		for(i=0;i<depart_data.length;i++){
			if(parseInt(depart_data[i].fId) == parseInt(depart_data[i].id)){
				de_key = depart_data[i].fId
				depart_name.push(de_key)
			}
		}
		for(i=0;i<depart_name.length;i++){
			de_value = color_list[i]
			key = depart_name[i]
			depart_color_struct[key] = de_value
		}
	},"json")
	//获取卡片数据
	$.get(show_person_url,function(ajax){
		person_info = ajax;
		},"json")
		
	var $container = $('#container');

	//左侧的导航按键
    var nav = $('#left_color_nav');
    $('#left_color_nav').ajaxStop(function(){
    	if ($('#left_color_nav').children().length == 0){
    		role_nav_list(nav, role_nav,true);
	    	depart_nav_list(nav,depart_nav,true);
    		fun_test(person_info);
    	}
    })
    /*初始化卡片*/
	$('#container').isotope({ filter: '' ,})
	
	//显示用户信息卡片
	fun_test = function show_person(person_info){
		content = $('#container')
		for (i=0;i<person_info.length;i++){
			if(person_info[i].user_name == null){
				person_info[i].user_name = ''
				person_info[i].role_name = ''
			}
			person_div = insert_card_html(person_info,i)
			$('#container').isotope( 'insert', person_div)
		}
	 	var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
	  	$optionLinks = $optionSets.find('button');
	  	$optionLinks.click(function(){
		  	var selector = $(this).attr('data-option-value');
		  	$('#container').isotope({ filter: selector});
		  	return false;
		});
	}

	//点击头部过滤信息，改变左侧btn
	 var sets = $('#nav .option-set'),
      links = sets.find('a');
      links.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('active') ) {
          return false;
        }
        var set = $this.parents('.option-set');
        set.find('.active').removeClass('active');
        $this.addClass('active');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = set.attr('data-option-key'),
            value = $this.attr('data-option-value');
        options[ key ] = value;
        if(value == 'department'){
        	$('#left_color_nav_1').hide();
        	$('#left_color_nav_2').show();
        	$('.element').each(function(){
        		$(this).removeClass(role_color_struct[$('#role_id',this).text()]).addClass(depart_color_struct[$('#first_id',this).text()])
        	})
        }
        if(value == 'role'){
        	$('#left_color_nav_2').hide();
        	$('#left_color_nav_1').show();
        	$('.element').each(function(){
        		$(this).removeClass(depart_color_struct[$('#first_id',this).text()]).addClass(role_color_struct[$('#role_id',this).text()])
        	})
        }
      });
      //搜索过滤
      function search(){
      	search_info = $('#search_text').val()
  		$.get(show_person_url,{"search_info":search_info},function(ajax){
  			content = $('#container');
    		content.children().remove();
  			for(i=0;i<ajax.length;i++){
				person_div = insert_card_html(ajax,i)
				$('#container').append(person_div).isotope( 'addItems', person_div)
				$('#container').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
  			}
  		},"json")
      }
      /*搜索框中输入完点击btn搜索结果*/
      $('#search_btn').click(function(){
      		search()
      })
      /*搜索框输入完后回车搜索结果*/
      $('#search_text').keydown(function(){
		    if(event.keyCode == 13){
		      	search();
		    }
	  });
})