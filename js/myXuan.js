window.onload=function(){
var oZX_fh=document.getElementById("zX_fh");
var zX_Nav=document.querySelector(".zX_Nav");
oZX_fh.addEventListener("click",OX_fh,false);
function OX_fh(){
	window.history.back();
}

var zX_wenzi=document.querySelector(".zX_wenzi");
var aA=zX_Nav.getElementsByTagName("a");
var azX_name_title=document.querySelectorAll(".zX_name_title");
var aA2=document.querySelectorAll(".have");
var timer=null;
for(var i=0; i<aA.length; i++){
	aA[i].addEventListener("click",ZX_show,false);
}
function ZX_show(){
	clearTimeout(timer);
	zX_wenzi.style.display="block";
	zX_wenzi.innerHTML=this.title;
	timer=setTimeout(function(){
		zX_wenzi.style.display="none";
	},1500);
}

for(var i=0; i<aA2.length; i++){
	aA2[i].index=i;
	aA2[i].addEventListener("click",ZX_tiaozhuan,false);
}
function ZX_tiaozhuan(){
	var top=azX_name_title[this.index+1].offsetTop;
	window.scrollTo(0,top);
}





}
