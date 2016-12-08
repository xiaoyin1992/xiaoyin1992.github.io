window.onload=function(){
	var aD_arrow=document.getElementById("aD_arrow");	
	var login=document.getElementById("login");
	login.addEventListener("click",denglu,false);
	aD_arrow.addEventListener("click",aD_back,false);
	$("#user_name").val(sessionStorage.user_tel);
	$("#user_pass").val(sessionStorage.user_pass);
//if(user_name.value&&user_pass.value){
//	user_name.value=sessionStorage.user_tel;
//	user_pass.value=sessionStorage.user_pass;
//}
			if(document.cookie){
				$.ajax({
					type:"post",
					url:"http://10.115.26.208/supermarket/data/login.php",
					async:true,
					dataType:"jsonp",
					jsonp:"callback",
					jsonpCallback:"success_JsonpCallback",
					data :{'user_phone':get_Cookie("user_tel"),'user_pass_word':get_Cookie("user_pass")},
					success:function(e){
						localStorage.user_name=unescape(e.info.user_name);
						localStorage.user_phone=e.info.user_phone;
						localStorage.user_psd=e.info.user_psd;
						localStorage.user_sex=e.info.user_sex;
						localStorage.user_addr=unescape(e.info.user_addr);
						window.location.href="index.html";
					}
				});
			}
}
function aD_back(){
	window.history.back();
}
function denglu(){
	var tel_reg=/^1[3,4,5,7,8]\d{9}$/;
	var pass_reg=/^[\w]{6,}$/;
	var user_tel=$("#user_name").val();
	var user_pass=$("#user_pass").val();
	if(tel_reg.test(user_tel)&&pass_reg.test(user_pass)){
		$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/login.php",
			async:true,
			dataType:'jsonp',
			jsonp:'callback',
			jsonpCallback:'success_JsonpCallback',
			data :{'user_phone':user_tel,'user_pass_word':user_pass},
			success:function(e){
				if(e.msg=="success"){
					localStorage.user_name=unescape(e.info.user_name);
					localStorage.user_phone=e.info.user_phone;
//					localStorage.user_psd=e.info.user_psd;
					localStorage.user_sex=unescape(e.info.user_sex);
					localStorage.user_addr=unescape(e.info.user_addr);
						setCookie("user_tel",user_tel,7,"/");
						setCookie("user_pass",user_pass,7,"/");
						window.location.href="index.html";
				}
				if(e.msg=="error"){
					alert(e.reason);
				}
			}
		});
	}else{
		alert("格式输入不正确！");
	}
}


function setCookie(cookie_key,cookie_value,timer,path){
	var now_time=new Date();
	var guo_time=now_time.getTime()+timer*24*3600*1000;
	now_time.setTime(guo_time)
	document.cookie=cookie_key+"="+cookie_value+";expires="+now_time.toGMTString()+";Path="+path;
}

function get_Cookie(cookie_key){
	var arr_str=document.cookie.split("; ");
	for (var i=0;i<arr_str.length;i++) {
		var key_value=arr_str[i].split("=");
		if(cookie_key==key_value[0]){
			return key_value[1];
		}
	}
	return "";
}


//setCookie("username1","xiaoyin",7,"/");
//setCookie("password1","0902yky",7,"/");

