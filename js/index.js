
var img_addr="http://10.115.26.208/supermarket/img/";
//var scroll_top=0;
window.onload=function(){
	$("#index_top_search").focus(function(){
		location.href="index_search.html";
	})
	var shang_ul=$(".l_rexiao_list:eq(0) ul:eq(0)");
	var view_top=document.documentElement.clientHeight;
	var start=0;
	var xuan="jingxuan";
	creatEle(start,xuan);
	
	window.onscroll=function(){
		var all_top=document.documentElement.offsetHeight||document.body.offsetHeight;
		var scroll_top=document.body.scrollTop||document.documentElement.scrollTop;
		var leftheader=document.querySelector(".l_leftHader");
		if(scroll_top+view_top==all_top){
			start+=4;
			creatEle(start,xuan)
		}
		if(scroll_top!=0){
			leftheader.style.display="none";
			$(".l_search span").css("display","none");
			$(".l_search").css("width","auto");
			
			$(".l_search").css({"left":"0.4rem"})
			if(scroll_top>=$("header:eq(0)").height()){
				$(".l_search").css({"position":"fixed"});
				$(".l_search").css({"top":0});
			}
//			console.log(scroll_top)
		}else{
			leftheader.style.display="block";
			$(".l_search").css("left","0");
			$(".l_search").css({"top":"0.85rem"});
			$(".l_search").css("position","");
			$(".l_search span").css("display","block");
			$(".l_search input:eq(0)").css("marginLeft","0.2rem");
			$(".l_search span").css("display","block");
		}
	}
	
	var xuan_li=$(".l_rexiao_subnav:eq(0) li");
	$.each(xuan_li, function(index) {
//		console.log(xuan_li);
		$(this).click(function(){
//			$(".l_rexiao_subnav:eq(0) li").css("background","#fff");
//			this.style.background="#f00";
			shang_ul.html("");
			xuan=this.title;
			start=0;
			creatEle(start,xuan);
		})
	});
}


	function creatEle(n,xuanxiang){
	var shang_ul=$(".l_rexiao_list:eq(0) ul:eq(0)");
	var shang_li=[],shang_div=[],shang_a=[],shang_img=[];
	var shang_p=[],shang_div_div=[],shang_div_div_div1=[],shang_div_div_div2=[];
	var shang_div_div_div_p1=[],shang_div_div_div_p2=[],shang_div_div_div_a=[],shang_div_div_div_img=[];
	$.ajax({
		type:"get",
		url:"http://10.115.26.208/supermarket/data/get_commodity.php",
		async:true,
		dataType:"jsonp",//使用jsonp开始跨域
		jsonp:"callback",//告诉后台我需要回调函数
//		jsonpCallback:"success_JsonpCallback",//回调函数的名称
		data:{'start': n,'classify':xuanxiang},
		success:function(d){
			if(d==null){
//				alert()
			}else{
//				console.log(d)
			for (var j=0;j<d.length;j++) {
					shang_div[j]=document.createElement("div");
					shang_a[j]=document.createElement("a");
					shang_a[j].href="DetailPages.html"+"?id="+d[j].id;
					shang_img[j]=document.createElement("img");
					shang_img[j].src=img_addr+d[j].img;
					shang_div[j].appendChild(shang_a[j]);
					shang_a[j].appendChild(shang_img[j]);
					shang_p[j]=document.createElement("p");
					shang_div[j].appendChild(shang_p[j]);
					shang_p[j].innerHTML=d[j].name;
					shang_div_div[j]=document.createElement("div");
					shang_div[j].appendChild(shang_div_div[j]);
					shang_div_div_div1[j]=document.createElement("div");
					shang_div_div[j].appendChild(shang_div_div_div1[j]);
					shang_div_div_div2[j]=document.createElement("div");
					shang_div_div[j].appendChild(shang_div_div_div2[j]);
					shang_div_div_div_p1[j]=document.createElement("p");
					shang_div_div_div_p1[j].innerHTML=d[j].count+"人已购买";
					shang_div_div_div1[j].appendChild(shang_div_div_div_p1[j]);
					shang_div_div_div_p2[j]=document.createElement("p");
					shang_div_div_div_p2[j].innerHTML="¥"+d[j].price;
					shang_div_div_div1[j].appendChild(shang_div_div_div_p2[j]);
					shang_div_div_div_a[j]=document.createElement("a");//购物车链接
					shang_div_div_div2[j].appendChild(shang_div_div_div_a[j]);
					shang_div_div_div_img[j]=document.createElement("img");
					shang_div_div_div_a[j].appendChild(shang_div_div_div_img[j]);
					shang_div_div_div_img[j].src="img/tu81.png";
					//购物车
					shang_div_div_div_a[j].index=j;
					shang_div_div_div_a[j].onclick=function(){
						var num=this.index;
						$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/my_commodity_car.php",
			async:true,
			data: {'user_phone': localStorage.user_phone,'commodity_id':d[num].id,'count': 1},
			jsonp:'callback',
			dataType:'jsonp',
			jsonpCallback:"success_JsonpCallback",
			success:function(e){
				if(e.msg=="success"){
				$(".shan_que").fadeToggle("slow","linear",function(){
					setTimeout(function(){
						$(".shan_que").fadeOut("slow","linear","");
					},200)
				})
				}
			}
		});
					}
			}
			if(d.length==4||d.length==3){
				for (var i=0;i<2;i++) {
					shang_li[i]=document.createElement("li");
					shang_ul.append(shang_li[i]);
				}
				if(d.length==4){
					shang_li[0].appendChild(shang_div[0]);
					shang_li[0].appendChild(shang_div[1]);
					shang_li[1].appendChild(shang_div[2]);
					shang_li[1].appendChild(shang_div[3]);
				}
				else if(d.length==3){
					shang_li[0].appendChild(shang_div[0]);
					shang_li[0].appendChild(shang_div[1]);
					shang_li[1].appendChild(shang_div[2]);
				}
			}else if(d.length==1||d.length==2){
				for (var i=0;i<1;i++) {
					shang_li[i]=document.createElement("li");
					shang_ul.append(shang_li[i]);
				}
				if(d.length==1){
					shang_li[0].appendChild(shang_div[0]);
				}else{
					shang_li[0].appendChild(shang_div[0]);
					shang_li[0].appendChild(shang_div[1]);
					}
				}
			}
		}
	});
}