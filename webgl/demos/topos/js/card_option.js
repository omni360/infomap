$(document).ready(function(){
      	var $container = $('#container');
	// 点击卡片放大
      $container.delegate( '.username,.person_img', 'click', function(){
        pa = $(this).parent()
        person_id = pa.find('#person_id').text();
        other = pa.siblings()
      	if(pa.hasClass('large')){
      		pa.removeClass('large');
      		$container.isotope('reLayout');
        	distory_info(pa)
      	}else 
      	if(!pa.hasClass('large') ){
	        pa.addClass('large');
	        pa.siblings().removeClass('large')
      		$container.isotope('reLayout');
        	distory_info(other)
	        get_user(person_id,pa)
	        /*卡片放大后*/
	        after_large(pa)
        	
        }
      });
      /*卡片缩小后删除*/
      function distory_info(ee){
      	$('.user_del_btn,.user_add_btn,.user_edit_btn',ee).remove();
      }
      /*卡片放大后显示用户全部账号*/
      function get_user(person_id,pa){
        $.get(show_person_account_url,{"person_id":person_id},function(ajax){
        	 pa.find('#user_num').text(ajax[0][4])
        	 	if(ajax[0][1] != null){
        	 		pa.find('#user_name').attr('login_id',ajax[0][0])
        	 		pa.find('#user_name').attr('role_id',ajax[0][3])
        	 		pa.find('#user_name').attr('user_name',ajax[0][1])
        	 		pa.find('#role_name').attr('login_id',ajax[0][0])
        	 		pa.find('#role_name').attr('role_id',ajax[0][3])
        	 		pa.find('#role_name').attr('user_name',ajax[0][1])
        	 		pa.find('#user_name').text(ajax[0][1])
        		    pa.find('#role_name').text(ajax[0][2])
        	 	}
        	 	if(ajax.length> 1 && ajax[1][1] != null){
        	 		pa.find('#user_name_2').attr('login_id',ajax[1][0])
        	 		pa.find('#user_name_2').attr('role_id',ajax[1][3])
        	 		pa.find('#user_name_2').attr('user_name',ajax[1][1])
        	 		pa.find('#role_name_2').attr('login_id',ajax[1][0])
        	 		pa.find('#role_name_2').attr('role_id',ajax[1][3])
        	 		pa.find('#role_name_2').attr('user_name',ajax[1][1])
        	 		pa.find('#user_name_2').text(ajax[1][1])
        		    pa.find('#role_name_2').text(ajax[1][2])
        	 	}else
        	 	{
        	 		pa.find('#user_name_2').text('')
        		    pa.find('#role_name_2').text('')
        	 	}
        	 	if(ajax.length> 1 && ajax[2][1] != null){
        	 		pa.find('#user_name_3').attr('login_id',ajax[2][0])
        	 		pa.find('#user_name_3').attr('role_id',ajax[2][3])
        	 		pa.find('#user_name_3').attr('user_name',ajax[2][1])
        	 		pa.find('#role_name_3').attr('login_id',ajax[2][0])
        	 		pa.find('#role_name_3').attr('role_id',ajax[2][3])
        	 		pa.find('#role_name_3').attr('user_name',ajax[2][1])
        	 		pa.find('#user_name_3').text(ajax[2][1])
        		    pa.find('#role_name_3').text(ajax[2][2])
        	 	}else
        	 	{
        	 		pa.find('#user_name_3').text('')
        		    pa.find('#role_name_3').text('')
        	 	}
        },"json")
      }
      /*卡片放大后的所有操作*/
      function after_large(pa){
      	pa.append(
			'<img class="user_del_btn" href="#del_person" data-toggle="modal"  src="image/permission_img/trash.png"></img>'+
			'<img class="user_edit_btn" href="#edit_person" data-toggle="modal" src="image/permission_img/pencil.png"></img>'+
			'<img class="user_add_btn" href="#add_user" data-toggle="modal"  src="image/permission_img/sq_plus.png"></img>'
    	)
    	
    	//编辑账号有关btn
    	$('.large .user_role label').click(function(){
    		$('#edit_user').show();
    		acc_login_id = $(this).attr('login_id')
    		acc_role_id = $(this).attr('role_id')
    		user_name = $(this).attr('user_name')
    		$('#edit_user').attr('login_id',acc_login_id)
    		$('#edit_user').attr('role_id',acc_role_id)
    		$('#edit_user').attr('user_name',user_name)
    	})
    	$('#edit_user').on("shown",function(){
        	$(this).load('/card_option_edit_user.html',function(){
        		$.get(show_user_role_url,function(ajax){
		    		$('#acc_role').html('');
		    		for(i=0;i<ajax.length;i++){
		    			$('#acc_role').append("<option style='position:relative' value='"+ajax[i]['role_id']+"'>"+ajax[i]['role_name']+"</option>");
		    		}
		    	},"json")
	    		acc_login_id = $(this).attr('login_id')
	    		acc_role_id = $(this).attr('role_id')
	    		user_name = $(this).attr('user_name')
		    	$('#alter_user_name').text(user_name)
	    		$('.slide_del_btn').attr('acc_login_id',acc_login_id)
	    		$('.slide_del_btn').attr('user_name',user_name)
	    		$('#edit_user').ajaxStop(function(){
	    			$('#acc_role option[value="'+ acc_role_id + '"]').attr("selected",'true');
	    		})
	        	$('#pw_reset').click(function(){
	        		$.get(alter_user_url,{"login_id":acc_login_id,"flag":1},function(ajax){
	    				$("#pw_pro").text("重置成功,新密码:"+ajax)
	        		})
	        	})
	    		person_id = $('#person_id',pa).text();
	        	$('#role_sure').click(function(){
	    			role_id = $('#acc_role').val();
	        		$.get(alter_user_role_url,{"role_id":role_id,"login_id":acc_login_id,"flag":1},function(ajax){
	        			content = $('#container');
	    				content.children().remove();
	    				for(i=0;i<ajax.length;i++){
							person_div = insert_card_html(ajax,i)
							$('#container').append(person_div).isotope( 'addItems', person_div)
							$('#container').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
							if(person_div.attr('person_id') == person_id){
									person_div.addClass('large')
									person_div.append(
										'<img class="user_del_btn" href="#del_person" data-toggle="modal"  src="image/permission_img/trash.png"></img>'+
										'<img class="user_edit_btn" href="#edit_person" data-toggle="modal" src="image/permission_img/pencil.png"></img>'+
										'<img class="user_add_btn" href="#add_user" data-toggle="modal"  src="image/permission_img/sq_plus.png"></img>'
							    	)
							    	get_user(person_id,person_div)
			      					after_large(person_div)
								}
		      			}
	        		},"json")
	        	})
		    	$('#del_user_sure').click(function(){
	    			$.get(del_user_url,{"login_id":acc_login_id,"flag":1},function(ajax){
	    				content = $('#container');
	    				content.children().remove();
	    				for(i=0;i<ajax.length;i++){
							person_div = insert_card_html(ajax,i)
							$('#container').append(person_div).isotope( 'addItems', person_div)
							$('#container').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
							if(person_div.attr('person_id') == person_id){
									person_div.addClass('large')
									person_div.append(
										'<img class="user_del_btn" href="#del_person" data-toggle="modal"  src="image/permission_img/trash.png"></img>'+
										'<img class="user_edit_btn" href="#edit_person" data-toggle="modal" src="image/permission_img/pencil.png"></img>'+
										'<img class="user_add_btn" href="#add_user" data-toggle="modal"  src="image/permission_img/sq_plus.png"></img>'
							    	)
							    	get_user(person_id,person_div)
			      					after_large(person_div)
								}
		      			}
	    			},"json")
	    		})
		        $('#slide_close,#del_user_sure').click(function(){
		        	$('#pw_pro').text('');
		        })
        	})
        })
    		
        //删除用户
        $('.user_del_btn').click(function(){
        	$('#del_person').show()
        })
    	del_person_name = $('#person_name',pa).text();
        $('#del_person').one("shown",function(){
        	$(this).load('/card_option_del_person.html',function(){
	    		$('#del_person_label').text("确定删除用户"+del_person_name+"吗?")
	    		$('#del_person_sure').click(function(){
	    			person_id = $('#person_id',pa).text();
	    			$.get(del_person_url,{"person_id":person_id},function(ajax){
						content = $('#container');
	    				content.children().remove();
	    				for(i=0;i<ajax.length;i++){
							person_div = insert_card_html(ajax,i)
							$('#container').append(person_div).isotope( 'addItems', person_div)
							$('#container').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
		      			}
	    			},"json")
	    		})
        	})
        })
    		
        //编辑用户有关btn
        $('.user_edit_btn').click(function(){
        	$('#edit_person').show()
        })
    	$('#edit_person').one("shown",function(){
			$(this).load('/card_option_edit_person.html' ,function(){
		    	$.get(show_department_url,function(ajax){
		    		$('#depart_select').html('')
		    		for(i=0;i<ajax.length;i++){
		    			$('#depart_select').append("<option style='position:relative' value='"+ajax[i].id+"'>"+ajax[i].name+"</option>");
		    		}
		    	},"json");
		    	sex = $('#sexo',pa).text();
		    	depart = $('#department_id',pa).text();
	        	person_name_before = $('#person_name',pa).text();
	        	$('#depart_select').ajaxStop(function(){
	        		$('#depart_select option[value="'+ depart + '"]').attr("selected",'true');
	        	})
	        	$('#sex_select option[value="'+sex + '"]').attr("selected",'true');
	        	$('#edit_person_name').val(person_name_before)
	    		$('#alter_person_sure').click(function(){
	    			person_id = $('#person_id',pa).text();
	    			person_name = $('#edit_person_name').val()
	    			sex = $('#sex_select').val();
	    			depart_id = $('#depart_select').val();
	    			$.get(alter_person_url,{"person_id":person_id,"person_name":person_name,"sex":sex,"depart_id":depart_id},
	    				function(ajax){
	    					content = $('#container');
	        				content.children().remove();
	        				for(i=0;i<ajax.length;i++){
								person_div = insert_card_html(ajax,i)
								$('#container').append(person_div).isotope( 'addItems', person_div)
								$('#container').isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
								if(person_div.attr('person_id') == person_id){
									person_div.addClass('large')
									person_div.append(
										'<img class="user_del_btn" href="#del_person" data-toggle="modal"  src="image/permission_img/trash.png"></img>'+
										'<img class="user_edit_btn" href="#edit_person" data-toggle="modal" src="image/permission_img/pencil.png"></img>'+
										'<img class="user_add_btn" href="#add_user" data-toggle="modal"  src="image/permission_img/sq_plus.png"></img>'
							    	)
			      					get_user(person_id,person_div)
			      					after_large(person_div)
								}
			      			}
	    			},"json")
	    		})
		        $('#alter_person_reset,#close_edit').click(function(){
			        $('#edit_person_name').val(person_name_before)
		        })
			})
		})
        //添加账号确定按钮
        $('.user_add_btn').click(function(){
        	$('#add_user').show()
        })
        $('#add_user').on('shown',function(){
        	$(this).load('/card_option_add_user.html' ,function(){
        		$.get(show_user_role_url,function(ajax){
        			$('#add_acc_role').html('')
		    		for(i=0;i<ajax.length;i++){
		    			$('#add_acc_role').append("<option style='left:5px;' value='"+ajax[i]['role_id']+"'>"+ajax[i]['role_name']+"</option>");
		    		}
		    	},"json")
        		$('#add_user_sure').click(function(){
	    			user_num = $('#user_num',pa).text();
	    			person_id = $('#person_id',pa).text();
	    			user_name = $('#add_user_name').val();
	    			role = $('#add_acc_role').val();
	    			if(user_name == ''){
	    				$('#add_user_warn').text("账号名不能为空 ")
	    				return;
	    			}
	    			if(user_num >= 3){
	    				$('#add_user_warn').text("用户已经有三个账号，不能添加 ")
	    				return;
	    			}
	    			$.get(add_user_url,{"person_id":person_id,"user_name":user_name,"role":role,"flag":1},
	    				function(ajax){
	    					console.log(ajax)
	    					if(ajax.res == "fault"){
								$('#add_user_warn').text("此账号已存在")
								return;
							}
							else{
		    					if(user_num == 1){
		    						pa.find('#user_name_2').text(ajax[0].username)
		    		    			pa.find('#role_name_2').text(ajax[0].role_name)
				        	 		pa.find('#user_name_2').attr('login_id',ajax[0].login_id)
				        	 		pa.find('#user_name_2').attr('role_id',ajax[0].role_id)
				        	 		pa.find('#user_name_2').attr('user_name',ajax[0].username)
				        	 		pa.find('#role_name_2').attr('login_id',ajax[0].login_id)
				        	 		pa.find('#role_name_2').attr('role_id',ajax[0].role_id)
				        	 		pa.find('#role_name_2').attr('user_name',ajax[0].username)
		    		    			pa.find('#user_num').text(2)
		    					}
		    					if(user_num == 2){
		    						pa.find('#user_name_3').text(ajax[0].username)
		    		    			pa.find('#role_name_3').text(ajax[0].role_name)
				        	 		pa.find('#user_name_3').attr('login_id',ajax[0].login_id)
				        	 		pa.find('#user_name_3').attr('role_id',ajax[0].role_id)
				        	 		pa.find('#user_name_3').attr('user_name',ajax[0].username)
				        	 		pa.find('#role_name_3').attr('login_id',ajax[0].login_id)
				        	 		pa.find('#role_name_3').attr('role_id',ajax[0].role_id)
				        	 		pa.find('#role_name_3').attr('user_name',ajax[0].username)
		    		    			pa.find('#user_num').text(3)
		    					}
		    					$('#add_user_name').val('')
		    					$("#add_randow_pw").text("添加成功,初始密码为:"+ajax[0].pw)
					        }
	    			},"json")
	    		})
        
		        $('#add_close,#add_reset').click(function(){
	    			$('#add_user_name').val('')
			    	$('#add_randow_pw').text('')
			    	$('#add_user_warn').text('')
		        })
        	})
        })
    		
      }
})
