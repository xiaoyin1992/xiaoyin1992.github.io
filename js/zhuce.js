window.onload=function(){
	var zC_back=document.getElementById("zC_back");	
	var zhuce=document.getElementById("zhuce_button");
//	var user_tel=document.getElementById("user_tel").value;
//	var user_pass=document.getElementById("user_pass").value;
	zC_back.addEventListener("click",zCback,false);
	zhuce.addEventListener("click",zc,false);
	$("#user_tel").blur(function(){
		var tel_reg=/^1[3,4,5,7,8]\d{9}$/;
		var pass_reg=/^[\w]{6,}$/;
		if(!tel_reg.test($("#user_tel").val())){
			$(".shan_que").css("display","block");
			$("body").append("<div class='hei'></div>");
		}
	});
	$("#user_pass").blur(function(){
		var tel_reg=/^1[3,4,5,7,8]\d{9}$/;
		var pass_reg=/^[\w]{6,}$/;
		if(!pass_reg.test($("#user_pass").val())){
			$(".shan_que").css("display","block");
			$("body").append("<div class='hei'></div>");
		}
	});
	$("#k_quxiao").click(function(){
		$(".shan_que").css("display","none");
		$(".hei").remove();
	})
}
function zCback(){
	window.history.back();
}
function zc(){
	var user_tel=document.getElementById("user_tel").value;
	var user_pass=document.getElementById("user_pass").value;
	var tel_reg=/^1[3,4,5,7,8]\d{9}$/;
	var pass_reg=/^[\w]{6,}$/;
	if(tel_reg.test(user_tel)&&pass_reg.test(user_pass)){
		$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/register.php",
			async:true,
			dataType:'jsonp',
			jsonp:"callback",//告诉后台我需要回调函数
			jsonpCallback:"success_JsonpCallback",//回调函数的名称
			data :{'user_phone':user_tel,'user_pass_word':user_pass},
			success:function(e){
				if(e.msg=="success"){
					sessionStorage.user_tel=user_tel;
					sessionStorage.user_pass=user_pass;
					window.location.href="allDeng.html";
				}
				if(e.msg=="error"){
					$(".shan_que").css("display","block");
					$(".shan_que p:eq(0)").text(e.reason);
					$("body").append("<div class='hei'></div>");
				}
			}
		});
	}
}
