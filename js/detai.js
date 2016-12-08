function pageName()
     {
         var strUrl=location.href;
         var arrUrl=strUrl.split("=");
         var strPage=arrUrl[1];
//       console.log(strPage);
         return strPage;
     }

window.onload=function(){
	var img_addr="http://10.115.26.208/supermarket/img/";
	var re_ymd = /\d{4}([\/\-\.])\d{1,2}(\1)\d{1,2}/;
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_info.php",
		async:true,
		data:{"id":pageName()},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
//			console.log(e);
			var s_date=new Date();
			var shang_date=new Date().getDate()+Number(e.arrival_time);
			s_date.setDate(shang_date);
			var t_date=s_date.toISOString();
			$("#shang_img").attr("src",img_addr+e.img);
			$(".y_nLeft:eq(0) p").text(e.name);
			$(".y_nLeft:eq(0) i").css("margin-right","0.1rem");
			$(".y_jql:eq(0)").text("¥"+e.price);
			if(e.privilege=="no"){
				$(".y_jqr:eq(0)").css("display","none");
			}
			$("#shang_count").text("月销"+e.count+"笔");
			var time_arr2=t_date.match(re_ymd);
			var timer=time_arr2[0];
			var arrival_time=timer.split("-");
			$(".y_btix:eq(0)").text("23:00之前付款，预计"+arrival_time[1]+"月"+arrival_time[2]+"日送达，可选送货时间")
		}
	});
	
	$("#jiagou").click(function(){
		$.ajax({
			type:"post",
			url:"http://10.115.26.208/supermarket/data/my_commodity_car.php",
			async:true,
			data: {'user_phone': localStorage.user_phone,'commodity_id':pageName(),'count': 1},
			jsonp:'callback',
			dataType:'jsonp',
			jsonpCallback:"success_JsonpCallback",
			success:function(e){
				console.log(e);
				if(e.msg=="success"){
				$(".shan_que").fadeToggle("slow","linear",function(){
					setTimeout(function(){
						$(".shan_que").fadeOut("slow","linear","");
					},200)
				})
				}
			}
		});
	})
	$("#a_gou").click(function(){
		location.href="gouwuche.html";
	})
	$("#top_back").click(function(){
		history.back();
	})
	
	//好中差评数量
	var evaluate1=0,evaluate2=0,evaluate3=0;
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_evluate.php",
		async:true,
		data: {'commodity_id': pageName()},
		jsonp:'callback',
			dataType:'jsonp',
//			jsonpCallback:"success_JsonpCallback",
			success:function(m){
				$(".allValuate").text(m.length);
				for(var i=0;i<m.length;i++){
					if(m[i].evaluate=="1"){
						evaluate1+=1;
					}else if(m[i].evaluate=="2"){
						evaluate2+=1;
					}else if(m[i].evaluate=="3"){
						evaluate3+=1;
					}
				}
				$(".goodValuate").text(evaluate1);
				$(".commonValuate").text(evaluate2);
				$(".badValuate").text(evaluate3);
			}
	});
	//查看评论
	var look_ping=0;
	$(".more_valuate").click(function(){
		$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_evluate_info.php",
		async:true,
		data: {'commodity_id': pageName(),'start': look_ping},
		jsonp:'callback',
			dataType:'jsonp',
//			jsonpCallback:"success_JsonpCallback",
			success:function(m){
				for (var i=0;i<m.length;i++) {
					$(".valuateList").append('<div class="valuateList_one"><div><div class="user"><img src="img/porttrait.jpg"></div><div class="user_name">'+m[i].user_name+'</div><div class="heart"><img src="img/heart.jpg"><img src="img/heart.jpg"><img src="img/heart.jpg"><img src="img/heart.jpg"></div></div><p>'+m[i].evaluate_info+'</p><p>2016-10-13</p></div>')
				}
			}
	})
		look_ping+=4;
})
	}
