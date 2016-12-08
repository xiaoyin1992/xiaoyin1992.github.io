window.onload=function(){
var oZ_left=document.getElementById("Z_left");
var oZL_sex=document.getElementById("zL_sex");
var oZL_sex_bg=document.getElementById("zL_sex_bg");
oZL_sex.addEventListener("click",xG_sex,false);
function xG_sex(){
	oZL_sex_bg.style.display="flex";
}

var aP=oZL_sex_bg.getElementsByTagName("p");
var oMySex=document.getElementById("mySex");
//for(var i=0; i<aP.length; i++){
//	aP[i].addEventListener("click",sz_sex,false);
//}
//function sz_sex(){
//	oMySex.innerHTML=this.title;
//	oZL_sex_bg.style.display="none";
//}

$("#user_nic").html(unescape(localStorage.user_name));

nan.onclick=function(){
	oZL_sex_bg.style.display="none";
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/user_update_sex.php",
		async:true,
		data:{'user_sex':"男",'user_phone':localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
			if(e=="success"){
				localStorage.user_sex="男";
				oMySex.innerHTML=localStorage.user_sex;
			}else{
				alert("error")
			}
		},
		error:function(){
			alert("error");
		}
	});
}

nv.onclick=function(){
		oZL_sex_bg.style.display="none";
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/user_update_sex.php",
		async:true,
		data:{'user_sex':"女",'user_phone':localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
			if(e=="success"){
				localStorage.user_sex="女";
				oMySex.innerHTML=localStorage.user_sex;
			}else{
				alert("error")
			}
		},
		error:function(){
			alert("error");
		}
	});
}
if(localStorage.user_sex){
	oMySex.innerHTML=localStorage.user_sex;
}else{
	oMySex.innerHTML="未填写";
}

}