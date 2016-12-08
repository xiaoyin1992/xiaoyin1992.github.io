window.onload=function(){
var opJ_top_fh=document.getElementById("pJ_top_fh");	
opJ_top_fh.addEventListener("click",pJ_fh,false);
function pJ_fh(){
	window.history.back();
}
var pingjia_val=1;//声明一个变量默认为1  默认好评
$(".pJ_qin_ping img").attr("src","img_dd/pp14.jpg");
$(".pJ_qin_ping:eq(0) img").attr("src","img_dd/pp13.jpg");
$(".pJ_qin_ping").click(function(){
	pingjia_val=$(this).attr("title");
	$(".pJ_qin_ping img").attr("src","img_dd/pp14.jpg");
	$(this).children("img").attr("src","img_dd/pp13.jpg")
});

$(".pJ_qin_txt").focus(function(){
	$(this).text("");
})

//发表评价
$(".pJ_Niming_right").click(function(){
	var a_url=location.href;
	var arr=a_url.split("?");
	var arr2=arr[1].split("=");
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/evaluate.php",
		async:true,
		data: {'evaluate':pingjia_val,'commodity_id': arr2[1], 'user_name':localStorage.user_name,'evaluate_info':$(".pJ_qin_txt").text(),'user_phone':localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
			if(e[0].msg=="success"){
				location.href="myDan.html";
			}
		}
	});
})
}
