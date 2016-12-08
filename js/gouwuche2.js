onload=function(){
	$("#shouye").click(function(){
		location.href="index.html";
	})
	$("#myBao").click(function(){
		location.href="myBao.html";
	})
	$("#gouwuche").click(function(){
		location.href="gouwuche.html";
	})
	
	$(".yy_nbk em").click(function(){
		window.history.back();
	})
	
	
	var img_addr="http://10.115.26.208/supermarket/img/";
	var arr=[];//获取商品的id
	var arr2=[];//获取商品的数量
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_car.php",
		async:false,
		data:{'user_phone':localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
			if(e.length>0){
				for (var i=0;i<e.length;i++) {
					arr.push(e[i].commodity_id);
					arr2.push(e[i].count);
				}
			}
		}
	});
	
	//手动循环 查看购物车
	var ajax_n=0;
		$.ajax({
					type:"post",
					url:"http://10.115.26.208/supermarket/data/get_commodity_info.php",
					async:false,
					data:{'id':arr[ajax_n].commodity_id},
					dataType:'jsonp',
					jsonp:'callback',
					jsonpCallback:"success_JsonpCallback",
					success:function(d){
						if(ajax_n<arr.length){
							ajax_n++;
							
						}else{
							return;
						}
					}
			})
	
}
