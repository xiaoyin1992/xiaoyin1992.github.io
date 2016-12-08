window.onload=function(){
	if(!document.cookie){
		location.href="allDeng.html";
	}
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
	
	
	var ajax_n=0;  //ajax次数的控制因子
	var jie_shu=0; //需要提交订单的次数
	var yy_price=[]; //获取 每件商品价格，因为每次返回一件商品信息，所以要放在for循环外边，做全局变量
	var img_addr="http://10.115.26.208/supermarket/img/";
	$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/get_commodity_car.php",
		async:false,
		data:{'user_phone':localStorage.user_phone},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
				ajax1(e);
		}
	});
	
	function ajax1(e){
		if(ajax_n!=e.length){
		$.ajax({
					type:"post",
					url:"http://10.115.26.208/supermarket/data/get_commodity_info.php",
					async:false,
					data:{'id':e[ajax_n].commodity_id},
					dataType:'jsonp',
					jsonp:'callback',
					jsonpCallback:"success_JsonpCallback",
					success:function(d){
						$(".yy_xiangq").append('<div class="yy_content"><div class="yy_chaoshi"><div class="yy_yua"><p class="yy_yuan" type="checked"></p><i class="yy_ctu"></i><p class="yy_chwz">天猫超市</p><i class="yy_jiant"></i><p class="yy_bianji1 yy_bianji">编辑</p></div></div><span class="yy_xiangqq"><p class="yy_xiy" type="checked"></p><i><img src="'+img_addr+d.img+'"/></i><div class="yy-aa"><span class="yy_quyo">'+d.name+'</span><span class="yy-jiaq"><p>¥'+d.price+'</p><p class="sul">X'+e[ajax_n].count+'</p></span></div></span></div>');
						$(".yy_xiangq").append('<div class="yy_xiugai"><div class="yy_chaoshi"><div class="yy_yua"><p class="yy_yuan2" type="checked"></p><i class="yy_ctu"></i><p class="yy_chwz">天猫超市</p><i class="yy_jiant"></i><p class="yy_bianji2 yy_bianji">完成</p></div></div><span class="yy_bianon"><p class="yy_xiy2"></p><i><img src="'+img_addr+d.img+'"></i><span class="yy_center"><p class="yy_jian"></p><p class="yy_shuzi">'+e[ajax_n].count+'</p><p class="yy_jia"></p></span><p class="yy_shanchu">删除</p></span></div>');
						ajax_n++;
						var yy_shuzi=document.getElementsByClassName("yy_shuzi");
						var Oyy_shanchu = document.getElementsByClassName("yy_shanchu");
						var yy_sul=document.getElementsByClassName("sul");
						var Oyy_xiugai = document.getElementsByClassName("yy_xiugai");
						var Oyy_content = document.getElementsByClassName("yy_content");
						var yy_jia=document.getElementsByClassName("yy_jia");
						var yy_jian=document.getElementsByClassName("yy_jian");
						var yy_shuzi=document.getElementsByClassName("yy_shuzi");
						var bianji1=document.getElementsByClassName("yy_bianji1");
						var bianji2=document.getElementsByClassName("yy_bianji2");
						var yy_yuan=document.getElementsByClassName("yy_yuan");
						var yy_yuan2=document.getElementsByClassName("yy_yuan2");
						var yy_xiy=document.getElementsByClassName("yy_xiy");
						var yy_xiy2=document.getElementsByClassName("yy_xiy2");
						var yy_yan=document.getElementsByClassName("yy_yan")[0];
						var shang=document.getElementsByClassName("yy_xiy");
						var shang2=document.getElementsByClassName("yy_xiy2");
						yy_price.push(Number(d.price));//将每件商品价格放入数组
						var yy_price_zong=0;
						var yy_zong=[];
						for (var i=0;i<yy_jia.length;i++) {
							yy_jia[i].index=i;
							yy_jian[i].index=i;
							bianji1[i].index=i;
							bianji2[i].index=i;
							Oyy_shanchu[i].index=i;
							yy_shuzi[i].index=i;
							yy_sul[i].index=i;
							yy_zong[i]=0; //给每个商品总价给初始值
							//增加数量
							yy_jia[i].onclick=function(){
								yy_price_zong=0;
								yy_shuzi[this.index].innerHTML=Number(yy_shuzi[this.index].innerHTML)+1;
								if(!yy_yuan[this.index].bool){//先判断 该商品是否被选中
								yy_zong[this.index]=yy_shuzi[this.index].innerHTML*yy_price[this.index];
								}else{
									yy_zong[this.index]=0;
								}
								for (var i=0;i<yy_zong.length;i++) {
								yy_price_zong=add(yy_price_zong,yy_zong[i]);
							}
								$(".yy_h").text("¥"+yy_price_zong);
							}
								
						
						//减少数量
							yy_jian[i].onclick=function(){
								if(yy_shuzi[this.index].innerHTML>1){
								yy_shuzi[this.index].innerHTML=Number(yy_shuzi[this.index].innerHTML)-1;
								yy_price_zong=0;
								if(!yy_yuan[this.index].bool){
									yy_zong[this.index]=yy_shuzi[this.index].innerHTML*yy_price[this.index];
								}else{
									yy_zong[this.index]=0;
								}
								for (var i=0;i<yy_price.length;i++) {
								yy_price_zong=add(yy_price_zong,yy_zong[i]);
							}
								$(".yy_h").text("¥"+yy_price_zong);
								}
							}
							
							//编辑
							bianji1[i].onclick=function(){
								Oyy_content[this.index].style.display="none";
								Oyy_xiugai[this.index].style.display="block";
							}
							
							//完成
							bianji2[i].onclick=function(){
								var num=this.index;
								$.ajax({
									type:"post",
									url:"http://10.115.26.208/supermarket/data/my_commodity_update_car.php",
									async:false,
									data:{'user_phone': localStorage.user_phone,'commodity_id':e[this.index].commodity_id,'count': yy_shuzi[this.index].innerHTML},
									dataType:'jsonp',
									jsonp:'callback',
									jsonpCallback:"success_JsonpCallback",
									success:function(m){
										if(m.msg=='success'){
											Oyy_content[num].style.display="block";
											Oyy_xiugai[num].style.display="none";
											yy_sul[num].innerHTML="×"+yy_shuzi[num].innerHTML;
										}
									}
								});
							}
							
							
							//删除
							Oyy_shanchu[i].onclick=function(){
								var num=this.index;
								$.ajax({
									type:"post",
									url:"http://10.115.26.208/supermarket/data/my_commodity_delete_car.php",
									async:false,
									data:{'user_phone': localStorage.user_phone,'commodity_id':e[num].commodity_id},
									dataType:'jsonp',
									jsonp:'callback',
									jsonpCallback:"success_JsonpCallback",
									success:function(m){
										if(m[0].msg=='success'){
											Oyy_content[num].remove();
											Oyy_xiugai[num].remove();
											yy_price.splice(num,1);
											yy_zong.splice(num,1);
											for (var k=0;k<yy_shuzi.length;k++) {
												yy_jia[k].index=k;
												yy_jian[k].index=k;
												bianji1[k].index=k;
												bianji2[k].index=k;
												yy_shuzi[k].index=k;
												yy_yuan[k].index=k;
												yy_yuan2[k].index=k;
												yy_xiy[k].index=k;
												yy_xiy2[k].index=k;
												Oyy_content[k].index=k;
												Oyy_xiugai[k].index=k;
												yy_sul[k].index=k;
												Oyy_shanchu[k].index=k;
											}
											//在计算一次总价
											yy_price_zong=0;
											for (var i=0;i<yy_price.length;i++) {
												yy_price_zong=add(yy_price_zong,yy_zong[i]);
											}
											$(".yy_h").text("¥"+yy_price_zong);
										}
									}
								});
							}
							
							
							
							//联动全选
							//店铺联动
							yy_yuan[i].index=i;
							yy_yuan2[i].index=i;
							yy_yuan[i].bool=true;
							yy_yuan2[i].bool=true;
							yy_yuan[i].onclick=liandong;
							yy_yuan2[i].onclick=liandong;
							function liandong(){
								//shang_xz=this.index;
								yy_yan.bool=0;
								var xiy_arr=Oyy_content[this.index].getElementsByClassName("yy_xiy");
								var xiy_arr2=Oyy_xiugai[this.index].getElementsByClassName("yy_xiy2");
//								console.log(this.index)
								if(yy_yuan[this.index].bool){
									shang[this.index].bool=false;
									shang2[this.index].bool=false;
									yy_yuan[this.index].bool=false;
									yy_yuan2[this.index].bool=false;
									yy_yuan[this.index].classList.add("yy_x");
									yy_yuan2[this.index].classList.add("yy_x");
									for (var k=0;k<xiy_arr.length;k++) {
										xiy_arr[k].classList.add("yy_x");
										xiy_arr2[k].classList.add("yy_x");
									}
									//计算单个商品总价总价
									yy_zong[this.index]=yy_price[this.index]*yy_shuzi[this.index].innerHTML;
									yy_price_zong=0;//总价清零
									for (var k=0;k<yy_zong.length;k++) {
											yy_price_zong=add(yy_price_zong,yy_zong[k]);
										}
									$(".yy_h").text("¥"+yy_price_zong);
								}else{
									shang[this.index].bool=true;
									shang2[this.index].bool=true;
									yy_yuan[this.index].bool=true;
									yy_yuan2[this.index].bool=true;
									yy_yuan[this.index].classList.remove("yy_x");
									yy_yuan2[this.index].classList.remove("yy_x");
									for (var k=0;k<xiy_arr.length;k++) {
										xiy_arr[k].classList.remove("yy_x");
										xiy_arr2[k].classList.remove("yy_x");
									}
									yy_price_zong=0;
									yy_zong[this.index]=0;
									for (var k=0;k<yy_zong.length;k++) {
											yy_price_zong=add(yy_price_zong,yy_zong[k]);
										}
									$(".yy_h").text("¥"+yy_price_zong);
								}
								for (var k=0;k<yy_yuan.length;k++) {
									if(yy_yuan[k].bool==false){
										yy_yan.bool+=1;
									}else{
//										yy_yan.bool-=1;
									}
								}
								if(yy_yan.bool==yy_yuan.length){
									yy_yan.classList.add("yy_x");
								}else{
									yy_yan.classList.remove("yy_x");
								}
							}
							
							//商品联动
							shang[i].index=i;
							shang[i].bool=true;
							shang2[i].index=i;
							shang2[i].bool=true;
							shang[i].onclick=liandong2;
							shang2[i].onclick=liandong2;
							function liandong2(){
								yy_yan.bool=0;
								if(shang[this.index].bool){
									shang[this.index].bool=false;
									shang2[this.index].bool=false;
									yy_yuan[this.index].bool=false;
									yy_yuan2[this.index].bool=false;
									shang[this.index].classList.add("yy_x");
									yy_yuan[this.index].classList.add("yy_x");
									shang2[this.index].classList.add("yy_x");
									yy_yuan2[this.index].classList.add("yy_x");
									//计算单个商品总价总价
									yy_zong[this.index]=yy_price[this.index]*yy_shuzi[this.index].innerHTML;
									yy_price_zong=0;//总价清零
									for (var k=0;k<yy_zong.length;k++) {
											yy_price_zong=add(yy_price_zong,yy_zong[k]);
										}
									$(".yy_h").text("¥"+yy_price_zong);
								}else{
									shang[this.index].bool=true;
									shang2[this.index].bool=true;
									yy_yuan[this.index].bool=true;
									yy_yuan2[this.index].bool=true;
									shang[this.index].classList.remove("yy_x");
									shang2[this.index].classList.remove("yy_x");
									yy_yuan2[this.index].classList.remove("yy_x");
									yy_yuan[this.index].classList.remove("yy_x");
									yy_zong[this.index]=0;
									yy_price_zong=0;
									for (var k=0;k<yy_zong.length;k++) {
											yy_price_zong=add(yy_price_zong,yy_zong[k]);
										}
									$(".yy_h").text("¥"+yy_price_zong);
								}
								//判断title是否需要改变样式 
								for (var k=0;k<yy_yuan.length;k++) {
									if(yy_yuan[k].bool==false){
										yy_yan.bool+=1;
									}
								}
								if(yy_yan.bool==yy_yuan.length){
									yy_yan.classList.add("yy_x");
								}else{
									yy_yan.classList.remove("yy_x");
								}
								
								
							}
							
							//获取需要结算的个数
							document.onclick=function(){
							for (var k=0;k<yy_xiy.length;k++) {
									if(yy_xiy.bool==false){
										jie_shu+=1;
									}
								}
							}
						
							
						}//for结束
						
							
						
							yy_yan.bool2=true;
							yy_yan.onclick=function(){
								if(yy_yan.bool2){
									yy_yan.bool2=false;
									yy_yan.classList.add("yy_x");
									yy_yan.bool=yy_yuan.length;
								for (var k=0;k<yy_yuan.length;k++) {
									yy_yuan[k].classList.add("yy_x");
									yy_yuan2[k].classList.add("yy_x");
									yy_xiy[k].classList.add("yy_x");
									yy_xiy2[k].classList.add("yy_x");
									yy_yuan[k].bool=false;
									yy_yuan2[k].bool=false;
									yy_xiy[k].bool=false;
									yy_xiy2[k].bool=false;
									yy_zong[k]=yy_price[k]*yy_shuzi[k].innerHTML;//往价钱数组里填元素
								}
									yy_price_zong=0;//总价清零
									for (var k=0;k<yy_zong.length;k++) {
											yy_price_zong=add(yy_price_zong,yy_zong[k]);
										}
									$(".yy_h").text("¥"+yy_price_zong);
								}else{
									yy_yan.bool=0;
									yy_yan.bool2=true;
									yy_yan.classList.remove("yy_x");
									for (var k=0;k<yy_yuan.length;k++) {
									yy_yuan[k].classList.remove("yy_x");
									yy_yuan2[k].classList.remove("yy_x");
									yy_xiy[k].classList.remove("yy_x");
									yy_xiy2[k].classList.remove("yy_x");
									yy_yuan[k].bool=true;
									yy_yuan2[k].bool=true;
									yy_xiy[k].bool=true;
									yy_xiy2[k].bool=true;
									yy_zong[k]=0;//往价钱数组里填元素
								}
									yy_price_zong=0;//总价清零
									for (var k=0;k<yy_zong.length;k++) {
											yy_price_zong=add(yy_price_zong,yy_zong[k]);
										}
									$(".yy_h").text("¥"+yy_price_zong);
								}
							}
							//结算按钮
	var ajax_jie=0;//控制次数
	var js_arr=[];
	$(".yy_heji").click(function(){
		for (var i=0;i<yy_yuan.length;i++) {
			if(yy_yuan[i].bool==false){
				js_arr.push(yy_yuan[i].index);
			}
		}
		if(ajax_jie<js_arr.length){
				var arr1=localStorage.user_addr.split(",");
				var arr2=arr1[2].split("-");
				var k_address=arr2[0]+arr2[1]+arr2[2];
				var a=js_arr[ajax_jie];
//				alert(d.id)
		$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/my_commodity_order.php",
		async:false,
		data:{'commodity_id': d.id,'user_phone':localStorage.user_phone,'count':Number(yy_shuzi[a].innerHTML),'user_name':arr1[0],'user_addr':k_address,'consignee_phone':arr1[1]},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
				if(ajax_jie=js_arr.length){
					window.location.href="success.html"
				}else{
					ajax_jie+=1;
			console.log(ajax_jie)
					js_ajax();
				}
		}
	});
		
		function js_ajax(){
				$.ajax({
		type:"post",
		url:"http://10.115.26.208/supermarket/data/my_commodity_order.php",
		async:false,
		data:{'commodity_id': d.id,'user_phone':localStorage.user_phone,'count':js_arr[ajax_jie],'user_name':arr1[0],'user_addr':k_address,'consignee_phone':arr1[1]},
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:"success_JsonpCallback",
		success:function(e){
			if(ajax_jie=e.length){
					window.location.href="success.html"
				}else{
					ajax_jie+=1;
					js_ajax();
				}
		}
	});

		}
		
		
			}
	
	})
						
						ajax1(e);
					}
				});
			}else{
			return;
		}
	}	


	
}	







//消除舍入误差函数
function add(num1, num2){
 var r1, r2, m;
 if((''+num1).split('.')[1]&&(''+num2).split('.')[1]){
 r1 = (''+num1).split('.')[1].length;
 r2 = (''+num2).split('.')[1].length;
 m = Math.pow(10,Math.max(r1,r2));
 return (Math.round(num1 * 100) + Math.round(num2 * 100)) / 100;
 }else if((''+num1).split('.')[1]){
 	r1 = (''+num1).split('.')[1].length;
 	m = Math.pow(10,r1);
 	return (Math.round(num1 * 100) + Math.round(num2 * 100)) / 100;
 }else if((''+num2).split('.')[1]){
 	r2 = (''+num2).split('.')[1].length;
 	m = Math.pow(10,r2);
 	return (Math.round(num1 * 100) + Math.round(num2 * 100)) / 100;
 }else{
 	return Number(num1)+Number(num2);
 }
}

