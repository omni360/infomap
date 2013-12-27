//屏蔽右键菜单
document.oncontextmenu = function (){
	return false;
};

var topo;
function loadStarmap() {
    topo = new AntiyTopo({
        views: [
            {
                adapterFunc: ["adapterSecurity"]
            }
        ],
        parentElementId: 'topo',
        displayMenu: false,
        displayPopup: true
    });
}

$(document).ready(function() {

	//加载网络靶场
	loadStarmap();

	var r = Raphael("login_div_4");
	var path1 = "M100,50L0,50L50,0L100,0z";
	//var path1 = "M150,50L0,50L50,0L150,0 z";
	var tri1= r.path(path1).attr({fill: "#0193FF"});
	tri1.translate(200, 0);
	
	reset = r.text(270, 25 , "重置").attr({fill: "#0B0F10", "font-size":16, "font-weight":"bold","font-family": "微软雅黑","cursor": "pointer"});
	
	reset.mouseover(function(){
		this.attr({fill:"#ddd"});
	}).mouseout(function(){
		this.attr({fill:"#0B0F10"});
	});
	
	var path2 = "M101,50L1,50L51,0L151,0z";
	var tri2= r.path(path2).attr({fill: "#0AA57D"});
	tri2.translate(100, 0);
	
	text2 = r.text(180, 25 , "确定").attr({fill: "#0B0F10", "font-size":16, "font-weight":"bold","font-family": "微软雅黑","cursor": "pointer"});
	
	text2.mouseover(function(){
		this.attr({fill:"#ddd"});
	}).mouseout(function(){
		this.attr({fill:"#0B0F10"});
	});
	
	/*登陆*/
	function login_click(){
		var _uname = $('#username'),
			_pwd = $('#password'),
			_winfo = $('#wrong_warn'),
			user_name = _uname.val(),
			pw = _pwd.val();
			
		_uname.removeClass('error');
		_pwd.removeClass('error');
		_winfo.text('');
		
		// if(user_name == ''){
			// _winfo.text('用户名不能为空');
			// _uname.addClass('error');
			// return;
		// }
		// if(pw == ''){
			// _winfo.text('密码不能为空');
			// _pwd.addClass('error');
			// return;
		// }
		// if(user_name != '' && pw != ''){
			// $.post('/scc/login/',{'user_name':user_name,'pw':pw},function(ajax){
				// if(ajax.res == "succeed"){
					generate_menu()
					// $('#user_id').text(ajax.login_id)
					// $('#user').text(ajax.name)
					_uname.val('');
					_pwd.val('');
					_winfo.text('');
				// }
				// else{
					// $('#wrong_warn').text('用户名或密码错误')
				// }
			// },"json")
		// }
	}
	text2.click(login_click);
	tri2.click(login_click);

	// 回车登陆 
	$('body').keydown(function(event){
		if( event.keyCode == 13 ) login_click(); 
	});
	
	/*修改个人密码*/
	$('#reset_pw').on("shown",function(){
		//distoryMenu()
		$('#reset_pw').load('/login_alter_pw.html',function(){
			$('#pw_submit').click(function(){
				alter_person_pw()
			})
			$('#pw_reset,#pw_cancel,.close').click(function(){
				$('#pw_new,#pw_again,#pw_old').val('')
				$('#pw_warn').text('')
			})
		})
	})
	
	/*修改个人密码*/
	function alter_person_pw(){
		pw_old = $('#pw_old').val()
		pw_new = $('#pw_new').val()
		pw_again = $('#pw_again').val()
		user_id = $('#user_id').text()
		if(pw_old == ''){
			$('#pw_warn').text('旧密码不能为空');
			$('#pw_warn').css("color","red");
			return;
		}
		if(pw_new == ''){
			$('#pw_warn').text('密码不能为空');
			$('#pw_warn').css("color","red");
			return;
		}
		if(pw_again == ''){
			$('#pw_warn').text('确认密码不能为空');
			$('#pw_warn').css("color","red");
			return;
		}
		if(pw_new != '' && pw_again != ''){
			if(pw_new != pw_again ){
				$('#pw_warn').text('两次输入的新密码不一致,请重新输入');
				$('#pw_warn').css("color","red");
				return;
			}
			else{
				$.post('/scc/alter_user_pw/',{"pw_old":pw_old,"pw":pw_new,"user_id":user_id},function(ajax){
					if(ajax == "ok"){
						$('#pw_warn').text("密码修改成功");
						$('#pw_warn').css("color","green");
						$('#pw_new,#pw_again,#pw_old').val('');
					}else
					{
						$('#pw_warn').text("旧密码输入错误");
						$('#pw_warn').css("color","red");
					}
				})
			}
		}
	}
	
	/*验证session*/
	function check_session(){
		var url = window.location.href
		// url_ch = url.substring(17)
		url_ch = url.split('/')[3];
		$.post('/scc/check_session/',{"url_ch":url_ch},function(ajax){
			if(ajax.res == "succeed" && ajax.flag == true){
				generate_menu()
				$('#user_id').text(ajax.user_id)
				$('#user').text(ajax.name)
			}
		},"json");
	}
	
	/*生成菜单*/
	function generate_menu(){
		$("#login_main").animate({
			top : "-2000px"
		}, 300);
		$("#main_div").delay(100).animate({
			top : "0px"
		}, 500);
		$("#nbmenu").delay(100).animate({
			top : "0px"
		}, 800);
		/* 演示Demo 暂时不从后台读取Menu */
		// $.get('/scc/get_menu/',function(ajax){
			// for (i = 0; i < ajax.length; i++){
			    // $('#group_ul').append('<li class="menu-r-li"><a class="first_menu_label" href="#">' + ajax[i].name + '</a></li>');
			    // function_ul_str = ""
			    // for (j = 0; j < ajax[i].funs.length; j++){
			        // function_ul_str += '<li title="' + ajax[i].funs[j].url + '"><span>' + ajax[i].funs[j].name + '</span><img src="'+ ajax[i].funs[j].img +'" alt=""></li>'
			    // }
			    // $('#fun_ul').append('<ul class="menu-node" style="display:none">' + function_ul_str + '</ul>');
			// }
			// $.getScript("/js/menu.js")
			// $("#ifarme_div").append("<iframe id='main_iframe' class='main_iframe' src='"+ajax[0].funs[0].url+"' ></iframe>")
		// },"json")
		// $.getScript("js/menu.js");
		$("#ifarme_div").html("<iframe id='main_iframe' class='main_iframe' src='pages/index/index.html' ></iframe>")
	}
	/*登陆重置*/
	function reset_info(){
		$('#username').val('')
		$('#password').val('')
		$('#wrong_warn').hide() 
	}
	
	tri1.click(reset_info)
	reset.click(reset_info)
	
	$("#nbmenu").css({
		top : "-2000px"
	});
	
	/*退出登陆*/
	$('#login_out').click(function(){
		$.get("/scc/del_session/", function(data) {
		});
		$("#login_main").delay(100).animate({
			top : "0px"
		}, 300);
		$("#main_div").delay(100).animate({
			top : "-2000px"
		}, 500);
		$("#nbmenu").delay(100).animate({
			top : "-2000px"
		}, 800);
		// $('#group_ul').children().remove()
		// $('#fun_ul').children().remove()
		// $("#ifarme_div").children().remove()
		$(".overflow").css({"display":"none"});

		topo.isRenderer = true;

	})
	/*验证session*/
	// check_session();
	// generate_menu();	
});