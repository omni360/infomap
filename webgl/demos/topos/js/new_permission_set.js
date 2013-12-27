/*部门信息树（左侧显示）*/
var setting = {
	view: {
		selectedMulti: false
	},
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},callback: {
		beforeDrag: beforeDrag,
	}
};
var setting_show = {
	view: {
		selectedMulti: false
	},
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	check:{
		enable:true
	}
};
/*角色树*/
var setting_role = {
	view: {
		showIcon: showIconForTree,
		showLine: false,
	},
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		simpleData: {
			enable: true
		}
	}
};
function showIconForTree(treeId, treeNode) {
	return treeNode.isParent;
};
$(document).ready(function(){
	var node_fid = 0 ,node_pid = 0, nodes = [],fun_id = 0 ,p_id = 0;
	  
  	$('#set_other').one("shown",function(){
  		$(this).load('/new_permission_set.html' ,function(){
		      /*添加和修改对话框中树*/
			$.get(show_department_url,function(ajax){
				$.fn.zTree.init($("#add_person_department"), setting, ajax);
				$.fn.zTree.init($("#department_show"), setting, ajax);
			},"json")
			   /*功能树*/
			$.get(show_function_url,function(ajax){ 
				$.fn.zTree.init($("#fun_tree"), setting, ajax);
				$.fn.zTree.init($("#add_fun_tree"), setting_show, ajax);
			},"json")
			/*获得功能URL*/
			function get_url(fun_id){
				$.get(get_url_function_url,{"child_id":fun_id},function(ajax){
					$('#function_url_alter').val(ajax[0]['function_url'])
				},"json")
			}
			/*角色树*/
			$.get(show_role_url,function(role_data){
				$.fn.zTree.init($("#role_tree"), setting_role, role_data);
			},"json")
		    /*部门相关操作*/
		    $('#set_other').on('click','#department_show',function(){
				var zTree = $.fn.zTree.getZTreeObj("department_show")
				nodes = zTree.getSelectedNodes()
				treeNode = nodes[0];
				node_name = treeNode['name']
				node_fid = treeNode['fId']
				$('#add_department_name').text(node_name)
				$('#del_department_name').text("确定要删除部门"+node_name+"吗？")
				$('#alter_department_name').val(node_name)
				$('#prompt_del').text('')
				node_pid = treeNode['id']
		    })
			  /*切換添加部門*/
		    $('#depart_add_btn').click(function(){
		  		if($('#department_add_right').css('display') == "none"){
					$('#click_warn').text("")
					$('#prompt_del').text("")
					$('#prompt_alter').text("")
			 		$('#department_add_right').show("slide",{direction:"right"})
			 		$('#alter_department,#del_department').css('display','none')
		 		}
		    })
		    /*切換部門編輯 */
			 $('#depart_edit_btn').click(function(){
				if (nodes.length == 0) {
					$('#click_warn').text("请先选择一个节点")
					return;
				}else
			 	if($('#alter_department').css('display') == "none"){
					$('#click_warn').text("")
					$('#prompt_del').text("")
					$('#prompt_alter').text("")
			 		$('#alter_department').show("slide",{direction:"right"})
			 		$('#department_add_right,#del_department').css('display','none')
			 	}
			 })
			 /*切换删除部门*/	
			 $('#depart_del_btn').click(function(){
				if (nodes.length == 0) {
					$('#click_warn').text("请先选择一个节点")
					return;
				}else
			 	if($('#del_department').css('display') == "none"){
					$('#prompt_del').text("")
					$('#prompt_alter').text("")
					$('#click_warn').text("")
			 		$('#del_department').show("slide",{direction:"right"})
			 		$('#alter_department,#department_add_right').css('display','none')
			 	}
			 })
			 /*添加部门*/
			 $('#add_depart_btn').click(function(){
			 	add_department(node_fid,node_pid);
			 })
			 
			$('#alter_depart_btn').click(function(){
				alter_department(node_pid)
			})
			$('#del_depart_btn').click(function(){
				del_department(node_pid)
			})
			/*重置部门*/
			$('#add_depart_reset,.close').click(function(){
				$('#add_department_name').text('在左侧选择父级部门,没有则不用选');
				$('#department_name').val('')
				$('#department_warn').text('')
				node_pid = 0;
			})
			
			/*角色操作*/
			  $('#set_other').on('click','#role_tree',function(){
					var zTree = $.fn.zTree.getZTreeObj("role_tree")
					nodes = zTree.getSelectedNodes()
					treeNode = nodes[0];
					role_name = treeNode['name']
					role_id = treeNode['id']
					$('#add_role_name').text(role_name)
					$('#del_role_name').text("确定要删除角色"+role_name+"吗？")
					$('#alter_role_name').val(role_name)
					$('#prompt_del_role').text('')
							
					$.get(show_dialog_fun_url,{"role_id":role_id},function(ajax){
						$.fn.zTree.init($("#alter_fun_tree"), setting_show, ajax);
					},"json")
					
			  })
			/*切换角色添加*/
			$('#role_add_btn').click(function(){
			 	if($('#add_role').css('display') == "none"){
					$('#click_role_warn').text("")
					$('#prompt_del_role').text("")
					$('#prompt_alter_role').text("")
			 		$('#add_role').show("slide",{direction:"right"})
			 		$('#alter_role,#del_role').css('display','none')
			 	}
			 })
			/*切换角色编辑*/
			 $('#role_edit_btn').click(function(){
				if (nodes.length == 0) {
					$('#click_role_warn').text("请先选择一个节点")
					return;
				}else
			 	if($('#alter_role').css('display') == "none"){
					$('#click_role_warn').text("")
					$('#prompt_del_role').text("")
					$('#prompt_alter_role').text("")
			 		$('#alter_role').show("slide",{direction:"right"})
			 		$('#add_role,#del_role').css('display','none')
			 	}
			 })
			/*切换角色删除*/
			 $('#role_del_btn').click(function(){
				if (nodes.length == 0) {
					$('#click_role_warn').text("请先选择一个节点")
					return;
				}else
			 	if($('#del_role').css('display') == "none"){
					$('#prompt_del_role').text("")
					$('#prompt_alter_role').text("")
					$('#click_role_warn').text("")
			 		$('#del_role').show("slide",{direction:"right"})
			 		$('#alter_role,#add_role').css('display','none')
			 	}
			 })
			
			 $('#add_role_btn').click(function(){
			 	add_role();
			 })
			 
			$('#alter_role_btn').click(function(){
				alter_role(role_id)
			})
			$('#del_role_btn').click(function(){
				del_role(role_id)
			})
					
			/*重置角色*/
			$('#add_role_reset,.close').click(function(){
				$.get(show_function_url,function(ajax){
					$.fn.zTree.init($("#add_fun_tree"), setting_show, ajax);
				},"json")
				$('#role_warn').text("")
				$('#add_role_name').val("")
			})
			/*重置修改角色*/
			$('#alter_role_reset').click(function(){
				$.get(show_dialog_fun_url,{"role_id":role_id},function(ajax){
						$.fn.zTree.init($("#alter_fun_tree"), setting_show, ajax);
					},"json")
				$('#alter_role_name').val(role_name)
				$('#alter_warn').text("")
			})
			
			/*功能操作*/
			$('#set_other').on('click','#fun_tree',function(){
				var zTree = $.fn.zTree.getZTreeObj("fun_tree")
				nodes = zTree.getSelectedNodes()
				treeNode = nodes[0];
				node_name = treeNode['name']
				fun_id = treeNode['id']
				p_id = treeNode['pId']
				if(p_id != null){
					$('#fun_warn').text("只有两级功能，不能在二级功能上添加功能，请选择一级功能")
					$('#function_url_add').attr("disabled","true")
				}
				if(p_id == null){
					p_id = 0;
					$('#function_url_alter').val('')
					$('#function_url_alter').attr("disabled","true")
					$('#function_url_add').removeAttr("disabled");
					$('#fun_warn').text("")
				}else{
					$('#function_url_alter').removeAttr("disabled");
					get_url(fun_id)
				}
				$('#parent_function_name').text(node_name)
				$('#del_function_name').text("确定要删除功能"+node_name+"吗？")
				$('#function_name_alter').val(node_name)
				$('#fun_prompt_del').text('')
			})
			  
			  /*切换功能添加*/
			 $('#func_add_btn').click(function(){
			 	if($('#function_add_right').css('display') == "none"){
					$('#click_fun_warn').text("")
					$('#fun_prompt_del').text("")
					$('#fun_prompt_alter').text("")
					$('#fun_warn').text('')
			 		$('#function_add_right').show("slide",{direction:"right"})
			 		$('#alter_function,#del_function').css('display','none')
			 	}
			 })
			  /*切换功能编辑*/
			 $('#func_edit_btn').click(function(){
				if (nodes.length == 0) {
					$('#click_fun_warn').text("请先选择一个节点")
					return;
				}else
			 	if($('#alter_function').css('display') == "none"){
					$('#click_fun_warn').text("")
					$('#fun_prompt_del').text("")
					$('#fun_prompt_alter').text("")
					$('#fun_warn').text('')
			 		$('#alter_function').show("slide",{direction:"right"})
			 		$('#function_add_right,#del_function').css('display','none')
			 	}
			 })
			  /*切换功能删除*/
			 $('#func_del_btn').click(function(){
				if (nodes.length == 0) {
					$('#click_fun_warn').text("请先选择一个节点")
					return;
				}else
			 	if($('#del_function').css('display') == "none"){
					$('#fun_prompt_del').text("")
					$('#fun_prompt_alter').text("")
					$('#click_fun_warn').text("")
					$('#fun_warn').text('')
			 		$('#del_function').show("slide",{direction:"right"})
			 		$('#alter_function,#function_add_right').css('display','none')
			 	}
			 })
			 
			 $('#add_func_btn').click(function(){
			 	add_function(fun_id);
			 })
			 
			$('#alter_func_btn').click(function(){
				alter_function(fun_id,p_id)
			})
			$('#del_func_btn').click(function(){
				del_function(fun_id,p_id)
			})
			
			/*重置功能*/
			$('#add_func_reset,.close').click(function(){
				$('#parent_function_name').text('在左侧选择父级功能,没有则不用选');
				$('#function_name_add').val('');
	       		$('#function_url_add').val('');
	       		$('#function_url_add').attr('disabled',"true");
				fun_id = 0;
			})
			
			
			/*关闭对话框*/
			$('.close').click(function(){
				$('#click_role_warn').text("")
				$('#prompt_del_role').text("")
				$('#prompt_alter_role').text("")
				$('#prompt_del').text("")
				$('#prompt_alter').text("")
				$('#click_warn').text("")
				$('#click_fun_warn').text("")
				$('#fun_prompt_del').text("")
				$('#fun_prompt_alter').text("")
				$('#fun_warn').text('')
				$('#alter_department,#del_department').css('display','none')
				$('#alter_role,#del_role').css('display','none')
				$('#alter_function,#del_function').css('display','none')
				$('#department_add_right,#add_role,#function_add_right').show()
			})
  		 })
	 })
	 
	 
	/*添加部门信息*/
	function add_department(node_fid,node_pid){
		var depart_name = $('#department_name').val();
		if (depart_name !='' ){
			$.get(add_department_url,{"department_name":depart_name,"parent_id":node_pid,"first_id":node_fid},
			function(add_data){
				$.fn.zTree.init($("#department_show"), setting, add_data);
				$.fn.zTree.init($("#add_person_department"), setting, add_data);
		       	$('#add_department_name').text("在左侧选择父级部门,没有则不用选")
		       	$('#department_name').val('')
		       	var nav = $('#left_color_nav');
		       	if(node_pid == 0){
		   			head = $('#left_color_nav_2 #head')
		   			head.nextAll().remove()
					depart_color_struct = {}
					depart_name = []
					for(i=0;i<add_data.length;i++){
						if(parseInt(add_data[i].fId) == parseInt(add_data[i].id)){
							de_key = add_data[i].fId
							depart_name.push(de_key)
						}
					}
					for(i=0;i<depart_name.length;i++){
						de_value = color_list[i]
						key = depart_name[i]
						depart_color_struct[key] = de_value
					}
					depart_nav_list(nav,add_data,false)
					head.next().find('button').addClass(color_list[parseInt(add_data.length - 1)])
					$('#container').isotope({ filter: '' ,})
					var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
				  	$optionLinks = $optionSets.find('button');
				  	$optionLinks.click(function(){
					  	var selector = $(this).attr('data-option-value');
					  	$('#container').isotope({ filter: selector,sortBy:'name' });
					  	return false;
					});
		       	}
			},"json")
		}else{
			$('#department_warn').text("部门名称不能为空")
		}
	}
	/*修改部门名称*/
	function alter_department(node_pid){
		var name = $('#alter_department_name').val();
		$.get(alter_department_url,{"department_id":node_pid,"department_name":name},function(alter_data){
			$.fn.zTree.init($("#department_show"), setting, alter_data);
			$.fn.zTree.init($("#add_person_department"), setting, alter_data);
			$('#prompt_alter').text("修改成功")
	       	var nav = $('#left_color_nav');
   			head = $('#left_color_nav_2 #head')
   			head.nextAll().remove()
			depart_color_struct = {}
			depart_name = []
			for(i=0;i<alter_data.length;i++){
				if(parseInt(alter_data[i].fId) == parseInt(alter_data[i].id)){
					de_key = alter_data[i].fId
					depart_name.push(de_key)
				}
			}
			for(i=0;i<depart_name.length;i++){
				de_value = color_list[i]
				key = depart_name[i]
				depart_color_struct[key] = de_value
			}
			depart_nav_list(nav,alter_data,false)
			$('#container').isotope({ filter: '' ,})
			var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
		  	$optionLinks = $optionSets.find('button');
		  	$optionLinks.click(function(){
			  	var selector = $(this).attr('data-option-value');
			  	$('#container').isotope({ filter: selector,sortBy:'name' });
			  	return false;
			});
		},"json")
	}	
	/*删除部门*/
	function del_department(node_pid){
		$.get(del_department_url,{"department_id":node_pid},function(del_data){
			$.fn.zTree.init($("#department_show"), setting, del_data);
			$.fn.zTree.init($("#add_person_department"), setting, del_data);
			$('#prompt_del').text("删除成功")
		       	var nav = $('#left_color_nav');
		       	if(node_pid == 0){
		   			head = $('#left_color_nav_2 #head')
		   			head.nextAll().remove()
					depart_color_struct = {}
					depart_name = []
					for(i=0;i<del_data.length;i++){
						if(parseInt(del_data[i].fId) == parseInt(del_data[i].id)){
							de_key = del_data[i].fId
							depart_name.push(de_key)
						}
					}
					for(i=0;i<depart_name.length;i++){
						de_value = color_list[i]
						key = depart_name[i]
						depart_color_struct[key] = de_value
					}
					depart_nav_list(nav,del_data,false)
					$('#container').isotope({ filter: '' ,})
					var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
				  	$optionLinks = $optionSets.find('button');
				  	$optionLinks.click(function(){
					  	var selector = $(this).attr('data-option-value');
					  	$('#container').isotope({ filter: selector,sortBy:'name' });
					  	return false;
					});
		       	}
		},"json")
	}
	
	/*添加角色*/
	function add_role(){
		var role_name = $('#add_role_name').val();
		var zTree = $.fn.zTree.getZTreeObj("add_fun_tree")
			nodes = zTree.getCheckedNodes();
		var id = []
		for (i=0;i<nodes.length;i++){
			temp = nodes[i]['id']
			id.push(temp)
		}
		tree_id = id.toString()
		if(role_name == ''){
			$('#role_warn').text("角色不能为空")
			return;
		}
		if(tree_id == ''){
			$('#role_warn').text("角色功能不能为空")
			return;
		}
		$.get(add_role_url,{"tree_id":tree_id,"role_name":role_name},function (ajax){
			$.fn.zTree.init($("#role_tree"), setting_role, ajax);
			$('#add_role_name').val("")
			$('#role_warn').text("")
   			var nav = $('#left_color_nav');
   			head = $('#left_color_nav_1 #head')
   			head.nextAll().remove()
			role_color_struct = {}
			for(i=0;i<ajax.length;i++){
				key = ajax[i].id
				value = color_list[i]
				role_color_struct[key] = value
			}
			role_nav_list(nav,ajax,false)
			head.next().find('button').addClass(color_list[parseInt(ajax.length - 1)])
			$('#container').isotope({ filter: '' ,})
			var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
		  	$optionLinks = $optionSets.find('button');
		  	$optionLinks.click(function(){
			  	var selector = $(this).attr('data-option-value');
			  	$('#container').isotope({ filter: selector,sortBy:'name' });
			  	return false;
			});
			$.get(show_function_url,function(ajax){
				$.fn.zTree.init($("#add_fun_tree"), setting_show, ajax);
			},"json")
		},"json")
	}
	
	/*修改角色*/
	function alter_role(role_id){
		var role_name = $('#alter_role_name').val();
		var zTree = $.fn.zTree.getZTreeObj("alter_fun_tree")
			nodes = zTree.getCheckedNodes();
		var id = []
		for (i=0;i<nodes.length;i++){
			temp = nodes[i]['id']
			id.push(temp)
		}
		tree_id = id.toString()
		if(role_name == ''){
			$('#alter_warn').text("角色不能为空")
			return;
		}
		if(tree_id == ''){
			$('#alter_warn').text("角色功能不能为空")
			return;
		}
		$.get(alter_role_url,{"tree_id":tree_id,"role_name":role_name,"role_id":role_id},function (ajax){
			$('#prompt_alter_role').text("修改成功")
			$('#alter_warn').text("")
			$.fn.zTree.init($("#role_tree"), setting_role, ajax);
   			var nav = $('#left_color_nav');
   			head = $('#left_color_nav_1 #head')
   			head.nextAll().remove()
			role_color_struct = {}
			for(i=0;i<ajax.length;i++){
				key = ajax[i].id
				value = color_list[i]
				role_color_struct[key] = value
			}
			role_nav_list(nav,ajax,false)
			$('#container').isotope({ filter: '' ,})
			var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
		  	$optionLinks = $optionSets.find('button');
		  	$optionLinks.click(function(){
			  	var selector = $(this).attr('data-option-value');
			  	$('#container').isotope({ filter: selector,sortBy:'name' });
			  	return false;
			});
		},"json")
	}
	
	/*删除角色*/
	function del_role(role_id){
		$.get(del_role_url,{"role_id":role_id},function(ajax){
			$('#prompt_del_role').text('删除成功')
			$.fn.zTree.init($("#role_tree"), setting_role, ajax);
   			var nav = $('#left_color_nav');
   			head = $('#left_color_nav_1 #head')
   			head.nextAll().remove()
			role_color_struct = {}
			for(i=0;i<ajax.length;i++){
				key = ajax[i].id
				value = color_list[i]
				role_color_struct[key] = value
			}
			role_nav_list(nav,ajax,false)
			$('#container').isotope({ filter: '' ,})
			var $optionSets = $('#left_color_nav_1 ,#left_color_nav_2 .color_part'),
		  	$optionLinks = $optionSets.find('button');
		  	$optionLinks.click(function(){
			  	var selector = $(this).attr('data-option-value');
			  	$('#container').isotope({ filter: selector,sortBy:'name' });
			  	return false;
			});
		},"json")
	}
	
	/*添加功能*/
	function add_function(fun_id){
		var function_name = $('#function_name_add').val();
		var function_url = $('#function_url_add').val();
		if(function_name == ''){
			$('#fun_warn').text("功能名称不能为空")
			return;
		}
		if(fun_id != 0){
			var function_url = $('#function_url_add').val();
			if(function_url == ''){
				$('#fun_warn').text("功能URL不能为空")
				return;
			}else{
				$.get(add_function_url,{"function_name":function_name,"function_url":function_url,"parent_fun_id":fun_id},
					function(ajax){
						$.fn.zTree.init($("#fun_tree"), setting, ajax);
						$.fn.zTree.init($("#function_show_left"), setting, ajax);
			       		$('#parent_function_name').text("在左侧选择父级功能,没有则不用选")
			       		$('#function_name_add').val('');
			       		$('#function_url_add').val('');
			       		$('#function_url_add').attr('disabled',"true");
				},"json")
			}
		}else{
			$.get(add_function_url,{"function_name":function_name,"function_url":function_url,"parent_fun_id":fun_id},
				function(ajax){
					$.fn.zTree.init($("#fun_tree"), setting, ajax);
		       		$('#parent_function_name').text("在左侧选择父级功能,没有则不用选")
		       		$('#function_name_add').val('');
		       		$('#function_url_add').val('');
		       		$('#function_url_add').attr('disabled',"true");
			},"json")
		}
	}
	/*修改功能*/
	function alter_function(fun_id,p_id){
		var function_name = $('#function_name_alter').val();
		var function_url = $('#function_url_alter').val();
		$.get(alter_function_url,{"function_name":function_name,"function_url":function_url,"function_id":fun_id,"p_id":p_id},
			function(ajax){
				$.fn.zTree.init($("#fun_tree"), setting, ajax);
				$('#fun_prompt_alter').text("修改成功")
		},"json")
	}
	/*删除功能*/
	function del_function(fun_id,p_id){
		$.get(del_function_url,{"child_id":fun_id,"p_id":p_id},
			function(ajax){
				$.fn.zTree.init($("#fun_tree"), setting, ajax);
				$('#fun_prompt_del').text("删除成功")
		},"json")
	}
	
	
})
