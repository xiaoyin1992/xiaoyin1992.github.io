onload=function(){
	var bian=document.querySelectorAll(".k_bian");
	var bao=document.querySelector(".k_bao");
	var shan=document.querySelectorAll(".k_shan");
	var tan=document.querySelector(".shan_que");
	for (var i=0;i<bian.length;i++) {
		bian[i].addEventListener("click",bian_fn,false);
		shan[i].addEventListener("click",shan_fn,false);
	}
	k_shanchu.addEventListener("click",shanchu_fn,false);
	k_quxiao.addEventListener("click",quxiao_fn,false);
}
function bian_fn(){
	location.href="xiugai_address.html";
}
function shan_fn(){
	var hei=document.createElement("div");
	var tan=document.querySelector(".shan_que");
	guanli.appendChild(hei);
	hei.className="heis";
	tan.style.display="block";
}
function shanchu_fn(){
	var tan=document.querySelector(".shan_que");
	var hei=document.querySelector(".heis");
	tan.style.display="none";
	hei.remove();
}
function quxiao_fn(){
	var tan=document.querySelector(".shan_que");
	var hei=document.querySelector(".heis");
	tan.style.display="none";
	hei.remove();
}
