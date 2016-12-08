onload=function(){
	document.querySelector(".left").onclick=function(){
		location.href="index.html";
	}
	$("#top_search").click(function(){
		if(localStorage.user_search){
			localStorage.user_search+=","+index_top_search.value;
		}else{
			localStorage.user_search=index_top_search.value;
		}
		
		location.href="search_content.html?sear="+escape(index_top_search.value);
	})
	if(localStorage.user_search){
		var search_arr=localStorage.user_search.split(",");
		for (var i=0;i<search_arr.length;i++) {
			for (var j=i+1;j<search_arr.length;j++) {
				if(search_arr[j]==search_arr[i]){
					search_arr.splice(j,1);
					j--;
				}
			}
		}
		for (var i=0;i<search_arr.length;i++) {
			$(".content:eq(0)").append("<i>"+search_arr[i]+"</i>");
			$(".content:eq(0) i").click(function(){
				$("#index_top_search").val($(this).text());
				$("#top_search").click();
			})
		}
	}else{
		$(".content:eq(0)").html("<p>暂无搜索记录</p>");
	}
	
	//热门搜索
	$(".content:eq(1) i").click(function(){
				$("#index_top_search").val($(this).text());
				$("#top_search").click();
			})
}
