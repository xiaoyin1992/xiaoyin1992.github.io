onload=function(){
	$(".top_back").click(function(){
		location.href="index.html";
	})
		var ajax_n=0;  //ajax次数的控制因子
		var img_addr="http://10.115.26.208/supermarket/img/";
		var arr=[];//获取商品id
		var arr2=[];//获取商品数量
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_order.php",
		async:false,
		data: {'user_phone': localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
//				console.log(e);
				$("#y_shou_name").text("收货人："+e[0].user_name)
				$("#y_shou_tel").text(e[0].user_phone)
				$("#y_shou_addr").text("收货地址："+e[0].user_addr)
				$("#y_shou_top").text("发票抬头  "+e[0].user_name)
				for(var i=0;i<e.length;i++){
					arr.push(e[i].commodity_id);
					arr2.push(e[i].count);
				}
					if(arr.length>0){
						ajax1();
					}
//				console.log(arr);
		}
	});
	
	function ajax1(){
		$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_info.php",
		async:false,
		data: {'id': arr[ajax_n]},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
				if(ajax_n<arr.length){
					$(".buyed_Thing_box").append('<div class="buyed_Thing"><div class="buyed_Thing_title">天猫超市<div class="intoShop"><img src="img/t6.jpg"></div></div><div class="buyed_Thing_detail"><div class="buyed_Thing_detail_left"><img src="'+img_addr+e.img+'"></div><div class="buyed_Thing_detail_center"><h3>'+e.name+'</h3><p>颜色分类：黑白随机</p><p>七天退换</p>	</div><div class="buyed_Thing_detail_right"><h3>¥'+e.price+'</h3><p></p><p>x'+arr2[ajax_n]+'</p></div><div class="evalute">买了换钱</div><div class="apply">申请售后</div></div></div>');
					ajax_n++;
					ajax1();
				}else{
					return;
				}
		}
	});
		
		
		
		
				}
	
	
	}
	

