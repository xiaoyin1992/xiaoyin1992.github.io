window.onload=function(){	
$("#mD_back").click(function(){
	window.location.href="myBao.html";
})
	
	var ajax_n=0;  //ajax次数的控制因子
		var img_addr="http://10.115.26.208/supermarket/img/";
		var arr=[];//获取商品id
		var arr2=[];//获取商品数量
		var arr3=[];//获取订单时间
		var arr4=[];//获取收货人
		var arr5=[];//获取收货地址
		var arr6=[];//获取收货人电话
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_order.php",
		async:false,
		data: {'user_phone': localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
				$("#y_shou_name").text("收货人："+e[0].user_name)
				$("#y_shou_tel").text(e[0].user_phone)
				$("#y_shou_addr").text("收货地址："+e[0].user_addr)
				$("#y_shou_top").text("发票抬头  "+e[0].user_name)
				for(var i=0;i<e.length;i++){
					arr.push(e[i].commodity_id);
					arr2.push(e[i].count);
					arr3.push(e[i].order_time);
					arr4.push(e[i].user_name);
					arr5.push(e[i].user_addr);
					arr6.push(e[i].consignee_phone);
				}
					if(arr.length>0){
						ajax1();
					}
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
		success:function(d){
			var price2=Number(d.price)+5;
				$("body").append('<div class="mD_top_dingdan"><div class="mD_top_dingdan_top"><div class="mD_top_dingdan_top_left"><img src="img_dd/pp8.jpg">天猫超市</div><div class="mD_top_dingdan_top_right">交易成功</div></div><div class="mD_top_dingdan_center"><div class="mD_top_dingdan_center_top"><div class="mD_book"><img src="'+img_addr+d.img+'" alt=""></div><div class="mD_txt">'+d.name+'</div><div class="mD_price"><h1>¥'+d.price+'</h1><p>¥'+d.price+'</p><span>x'+arr2[ajax_n]+'</span></div></div><div class="mD_top_dingdan_center_bottom"></div></div><div class="mD_top_dingdan_bottom"><div class="mD_top_dingdan_bottom_top">共一件商品&nbsp;合计：<span>￥<span>'+price2+'</span>(含运费￥5.00)</span></div><div class="mD_top_dingdan_bottom_bot"><a href="">更多</a><p class="cha_ping">查看详情</p><p class="del_ping" id='+arr[ajax_n]+' order_time='+arr3[ajax_n]+'>删除该项</p><a class="pingjia_a" id='+arr[ajax_n]+'>评价</a></div></div><div class="dingdan_detail"><p>收货人：'+arr4[ajax_n]+'</p><p>收货人电话：'+arr6[ajax_n]+'</p><p>收货地址：'+arr5[ajax_n]+'</p></div></div>');
				$(".del_ping").each(function(index){
					$(this).click(function(){
						_this = $(this);
						$.ajax({
							type:"post",
							url:"http://10.115.26.208/supermarket/data/my_commodity_delete_order.php",
							async:false,
							data: {'order_time':_this.attr("order_time"),'commodity_id': _this.attr("id"),'user_phone':localStorage.user_phone},
							dataType:'jsonp',
							jsonp:'callback',
//							jsonpCallback:"success_JsonpCallback",
							success:function(m){
								arr.splice(index,1);
								arr2.splice(index,1);
								arr3.splice(index,1);
								arr4.splice(index,1);
								arr5.splice(index,1);
								arr6.splice(index,1);
								_this.parent().parent().parent().remove();
							}
					})
					})
				});
				
				//评价
				$(".pingjia_a").click(function(){
					$(this).attr("href","Pingjia.html?id="+$(this).attr("id"));
				})
				
				
				if(ajax_n<arr.length){
					ajax_n++;
					ajax1();
				}else{
					return;
				}
		}
	});
}
	//查看详情
				$("body").delegate(".cha_ping","click",function(){
					$(this).parent().parent().next().toggle("fast")
				})
	
}
