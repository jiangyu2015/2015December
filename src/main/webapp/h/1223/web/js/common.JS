//图片切换延迟加载
function prevNext(){
	var $prev = $("#prev")
		$next = $("#next"),
		$imgList = $("#imgList"),
		$w = $(".popImg").width(),
		$boxImg = $imgList.children("div"),
		len = $boxImg.length,
		$boxImg.width( $w ),
		$imgList.width( $w*len ),
		num=0,
		page = Math.ceil(len),
		$numOn = $("#numOn"),
		$numAll = $("#numAll");
	
	// 设置图片初始状态
	$imgList.children("div:eq(0)").addClass("on");
	//默认加载第一张
	$imgList.children("div.on").children("img.lazy").trigger("appear");
	//取图片总数
	$numAll.text(len);
	
	//下一张
	$next.click(function(){
		if(!$imgList.is(":animated")){
			num++;
			if(num==page){
				num = 0;
				$imgList.animate({"left":0},"slow")
				$imgList.children("div").eq(num).addClass("on").siblings().removeClass("on");
			}else{
				$imgList.animate({"left":'-='+$w},"slow");
				$imgList.children("div").eq(num).addClass("on").siblings().removeClass("on");
			}
			$numOn.text(num+1);
		}
		
		$imgList.children("div.on").children("img.lazy").trigger("appear");
	});
	
	//上一张
	$prev.click(function(){
		if(!$imgList.is(":animated")){
			if(num==0){
				num = page-1;
				$imgList.animate({"left":'-='+$w*(page-1)},"slow");
				$imgList.children("div").eq(num).addClass("on").siblings().removeClass("on");
			}else{
				$imgList.animate({"left":'+='+$w},"slow");
				num--;
				$imgList.children("div").eq(num).addClass("on").siblings().removeClass("on");
			}
			$numOn.text(num+1);
			$imgList.children("div.on").children("img.lazy").trigger("appear");
		};
	});
	
};

/* 显示图片弹窗 */
function  popShow(){
	$(".popBg").show();
}

/* 关闭显示图片 */
function popClose(){
	$(".popBg").click(function(){
		$(this).hide();
		
		$("#imgList").css({left:0}).children("div").removeClass("on");
		$("#numOn").text("1");
	});
	$(".popImg").click(function(e){
		e.stopPropagation();
	});
}
popClose();


/* 表格隔行换色 */
$(".tableInfo a:odd").addClass("odd");

