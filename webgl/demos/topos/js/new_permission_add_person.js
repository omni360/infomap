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
	function beforeDrag(treeId, treeNodes) {
		return false;
	}
$(document).ready(function(){
	var node_id,pw;
	$('#add_person').on("shown",function(){
  		$(this).load('/new_permission_add_person.html' ,function(){
				/*添加与修改对话框中角色*/
			  $.get(show_user_role_url,function(ajax){
				   for(var i=0;i<ajax.length;i++){
				  		$("#account_role").append("<option value='"+ajax[i]['role_id']+"'>"+ajax[i]['role_name']+"</option>")
				  	}
			  },"json")
			  
			  /*显示随便密码*/
			 pw = randomChar();
			 $('#add_person_randompw').text("默认随机密码为" + pw + ";添加用户时需告知用户本人")
			 
		      /*添加和修改对话框中树*/
			  $.get(show_department_url,function(ajax){
				   $.fn.zTree.init($("#add_person_department"), setting, ajax);
				   $.fn.zTree.init($("#department_show"), setting, ajax);
			  },"json")
			  /*点击部门树 ，左侧显示相应部门*/
			  $('#add_person').on('click','#add_person_department',function(){
					var zTree = $.fn.zTree.getZTreeObj("add_person_department")
					nodes = zTree.getSelectedNodes()
					treeNode = nodes[0];
					node_name = treeNode['name']
					$('#par_department_name').text(node_name)
					node_id = treeNode['id']
			  })
			  /*点击确定，添加用户*/	
			  $('#add_sure').click(function(){
			  		add_person_fun(node_id)
			  })
			  /*取消和重置按钮*/
			  $('#add_cancel,#add_reset,.close').click(function(){
				  	$('#warn').text("")
					$('#add_person_name').val('')
					$('#username').val('')
					$('#person_pw').val('')
					$('#person_pw_sure').val('')
					$('#remark').val('')
					$('#par_department_name').text('在右侧选择部门')
					$.get(show_department_url,function(ajax){
					   $.fn.zTree.init($("#add_person_department"), setting, ajax);
					   $.fn.zTree.init($("#department_show"), setting, ajax);
				    },"json")
			  })
  		 })
	})
	/*生成随机密码*/
	function randomChar() {
		 var x="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-";
		 var tmp="";
		 for(var i=0;i< 10;i++) {
		 	tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
		 }
		 return tmp;
	}
	  
	function add_person_fun(node_id){
  		var person = $('#add_person_name').val();
		var sex = $('#sex option:selected').val();
		var username = $('#username').val();
		var role = $('#account_role option:selected').val();
		var pw_after = pw;
		var remark = '';
		var depart = $('#par_department_name').val()
		if(person ==''){
			$('#warn').text("姓名不能为空")
			return;
		}
		if(depart =='在右侧选择部门'){
			$('#warn').text("请先点击右侧树选择部门")
			return;
		}
		if(username ==''){
			$('#warn').text("账号不能为空")
			return;
		}
		$.get(add_person_url,{"person":person,"sex":sex,"depart_id":node_id,"username":username,"pw":pw_after,
								"role":role,"remark":remark},
			function(ajax){
	       		$('#warn').text("")
    			$('#add_person_name').val('')
    			$('#username').val('')
    			$('#remark').val('')
    			$('#par_department_name').text('在右侧选择部门')
				$('#add_person').modal('hide')
				$('#container').isotope( 'insert', insert_card_html(ajax,ajax.length - 1) )
				$.get(show_department_url,function(ajax){
				   $.fn.zTree.init($("#add_person_department"), setting, ajax);
				   $.fn.zTree.init($("#department_show"), setting, ajax);
			  	},"json")
		},"json")
	}
})