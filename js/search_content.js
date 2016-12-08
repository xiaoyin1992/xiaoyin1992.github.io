function pageName()
     {
         var strUrl=location.href;
         var arrUrl=strUrl.split("=");
         var strPage=arrUrl[1];
//       console.log(strPage);
         return strPage;
     }
window.onload=function(){
	var top_back=document.querySelector(".left");
	var img_addr="http://10.115.26.208/supermarket/img/";
	var goods_data,goods;
	top_back.onclick=function(){
		history.back();
	}
	var search_con=unescape(pageName());
	$(".center input").val(search_con);
		$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/getcommditybykw.php",
			async:false,
			data:{'kw':search_con},
			dataType:"jsonp",
			jsonp:'callback',
			jsonpCallback:"success_JsonpCallback",
			success:function(e){
				goods_data=e;
				goods=goods_data;
				if(goods_data){
					for (var i=0;i<goods_data.length;i++) {
						$(".content").append('<div class="section"><span class="yy_xiangqq"><i><img src='+img_addr+goods_data[i].img+'></i><div class="yy-aa"><span class="yy_quyo">'+goods_data[i].name+'</span><span class="count">月销'+goods_data[i].count+'笔</span><span class="yy-jiaq"><p>¥'+goods_data[i].price+'</p><p class="search_go"></p></span></div></span></div>');
					}
					search_go=document.getElementsByClassName("search_go");
				}else{
					$(".content").html("<p>暂无搜索内容</p>");
				}
			}
		});
		$("#zonghe").click(function(){
			$(".content").html("");
			$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/getcommditybykw.php",
			async:true,
			data:{'kw':search_con},
			dataType:"jsonp",
			jsonp:'callback',
			jsonpCallback:"success_JsonpCallback",
			success:function(e){
				if(e){
					goods=e;
					for (var i=0;i<e.length;i++) {
						$(".content").append('<div class="section"><span class="yy_xiangqq"><i><img src='+img_addr+e[i].img+'></i><div class="yy-aa"><span class="yy_quyo">'+e[i].name+'</span><span class="count">月销'+e[i].count+'笔</span><span class="yy-jiaq"><p>¥'+e[i].price+'</p><p class="search_go"></p></span></div></span></div>');
					}
					search_go=document.getElementsByClassName("search_go");
				}else{
					$(".content").html("<p>暂无搜索内容</p>");
				}
			}
		});
		})
		var count_bool=true;
		$("#count").click(function(){
		var goods_data2=goods_data;
		if(count_bool){
			count_bool=false;
		for (var i=0;i<goods_data2.length;i++) {
			for (var j=0;j<goods_data2.length;j++) {
			if(Number(goods_data2[j].count)<Number(goods_data2[i].count)){
				var a=goods_data2[i];
				goods_data2[i]=goods_data2[j];
				goods_data2[j]=a;
			}
		}
	}
		}else{
			count_bool=true;
		for (var i=0;i<goods_data2.length;i++) {
			for (var j=0;j<goods_data2.length;j++) {
			if(Number(goods_data2[j].count)>Number(goods_data2[i].count)){
				var a=goods_data2[i];
				goods_data2[i]=goods_data2[j];
				goods_data2[j]=a;
			}
		}
	}
		}
		goods=goods_data2;
		if(goods){
			$(".content").html("");
		}else{
			$(".content").html("<p>暂无搜索内容</p>");
		}
		for (var i=0;i<goods.length;i++) {
			$(".content").append('<div class="section"><span class="yy_xiangqq"><i><img src='+img_addr+goods[i].img+'></i><div class="yy-aa"><span class="yy_quyo">'+goods[i].name+'</span><span class="count">月销'+goods[i].count+'笔</span><span class="yy-jiaq"><p>¥'+goods[i].price+'</p><p class="search_go"></p></span></div></span></div>');
					}
		search_go=document.getElementsByClassName("search_go");
	})
		var price_bool=true;
		$("#price").click(function(){
			var goods_data2=goods_data;
			if(price_bool){
				price_bool=false;
		for (var i=0;i<goods_data2.length;i++) {
			for (var j=0;j<goods_data2.length;j++) {
			if(Number(goods_data2[j].price)<Number(goods_data2[i].price)){
				var a=goods_data2[i];
				goods_data2[i]=goods_data2[j];
				goods_data2[j]=a;
			}
		}
	}
		}else{
			price_bool=true;
			for (var i=0;i<goods_data2.length;i++) {
			for (var j=0;j<goods_data2.length;j++) {
			if(Number(goods_data2[j].price)>Number(goods_data2[i].price)){
				var a=goods_data2[i];
				goods_data2[i]=goods_data2[j];
				goods_data2[j]=a;
			}
		}
	}
		}
		goods=goods_data2;
		if(goods){
			$(".content").html("");
		}else{
			$(".content").html("<p>暂无搜索内容</p>");
		}
		for (var i=0;i<goods.length;i++) {
			$(".content").append('<div class="section"><span class="yy_xiangqq"><i><img src='+img_addr+goods[i].img+'></i><div class="yy-aa"><span class="yy_quyo">'+goods[i].name+'</span><span class="count">月销'+goods[i].count+'笔</span><span class="yy-jiaq"><p>¥'+goods[i].price+'</p><p class="search_go"></p></span></div></span></div>');
					}
		search_go=document.getElementsByClassName("search_go");
		})
		var search_go;
		setTimeout(function(){
//			function searchGo(){
			for (var i=0;i<goods.length;i++) {
						search_go[i].title=i;
						search_go[i].onclick=function(){
						var num=this.title;
						$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/my_commodity_car.php",
			async:true,
			data: {'user_phone': localStorage.user_phone,'commodity_id':goods[num].id,'count': 1},
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
//			}
			
		},2000)
		
		
		
		
		
}
