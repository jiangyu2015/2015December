var rtH5 = function(){
	var init = function(bg_url){
		var maxW = 740;
		var maxH = 1136;
		var minW = 640;
		var minH = 960;
		var minS = minH / minW;
		var myW = $(document).width();
		var myH = $(document).height();
		var myS = myH / myW;
		var scaleW = myW / minW;
		var scaleH = myH / minH;
		
		$(".rt-bg").css('height', myH + 'px');
		$(".rt-bg").css('width', '100%');
		$(".rt-bg").css('background-position', 'center');
		$(".rt-bg").css('background-repeat', 'no-repeat');
		if(bg_url != undefined && bg_url != null && bg_url != ''){
			$(".rt-bg").css('background-image', "url('" + bg_url + "')");
		}
		
		$(".rt-content").css('position', 'absolute');
		$(".rt-content").css('width', minW + 'px');
		$(".rt-content").css('height', minH + 'px');
		$(".rt-content").css("-webkit-transform-origin", "0% 0%");
		
		if(myS < minS) {  //宽屏，则高度100%，宽度需添加
			$(".rt-bg").css('background-size', 'auto '+ maxH/minH*100 + '%');
		
			var contentW = myH /minS;
			var contentMaginLeft = (myW - contentW)/2;
			$(".rt-content").css('margin-left', contentMaginLeft + 'px');			
			$(".rt-content").css("-webkit-transform", "scale("+scaleH+")");
			
		}else {	//长屏，则宽度100%，高度需添加
			$(".rt-bg").css('background-size', maxW/minW*100 + '% auto');
		
			var contentH = minS * myW;
			var contentMaginTop = (myH - contentH)/2;
			$(".rt-content").css('margin-top', contentMaginTop + 'px'); 
			$(".rt-content").css("-webkit-transform", "scale("+scaleW+")");
		}
	};
	
	return {
		init: function(bg_url){
			init(bg_url);
		}
	}	
}();

$(function(){
	rtH5.init();
});