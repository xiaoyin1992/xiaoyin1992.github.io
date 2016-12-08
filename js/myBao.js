window.onload = function() {
	if(!document.cookie){
		location.href="allDeng.html";
	}
	var oMB_top = document.getElementById("mB_top");
	window.addEventListener("scroll", xiding, false);
	function xiding() {
		var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(oScrollTop >= oMB_top.offsetHeight) {
			oMB_top.style.background = "#f81131";
		} else {
			oMB_top.style.background = "transparent";
		}
	}
	document.getElementsByClassName("Z_footer_bottom_one")[0].onclick=function(){
		location.href="index.html";
}	
	document.getElementsByClassName("Z_footer_bottom_one")[3].onclick=function(){
		location.href="gouwuche.html";
}
		
			
}