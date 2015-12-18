var webScroll=function(){
	var options={
			control:true//页面是否循环轮播
	};
	function init(op){
		if(op){
			if(op.control!=null){
				options.control=op.control;
			}
		}
		var $element=$("body");
		var touchEvents = {
			touchstart: "touchstart",
			touchmove:"touchmove",
			touchend:"touchend"
		},
			startX,startY,x,y;
		$element.bind(touchEvents.touchstart,function(event){
			var touch = event.originalEvent.touches[0];
			startX = touch.pageX;
			startY = touch.pageY;
		});
		$element.bind(touchEvents.touchmove,function(event){
			event.preventDefault();
			var touch = event.originalEvent.touches[0];
		    x = touch.pageX - startX,
		    y = touch.pageY - startY;
		});
		$element.bind(touchEvents.touchend,function(event){
			if (Math.abs(x) < Math.abs(y)){
				if(y<0){
					showA();
				}else{
					showB();
				}
				x=0;y=0;
			}
		});
	}
	function showA(){
		var $pages=$(".page");
		var len=$pages.length;
		var index=0;
		var $pageOut=$(".page.in");
		index=$pages.index($pageOut);
		if(index+1<len){
			var pageIn=$pages[index+1];
		}else{
			if(!options.control) return;
			var pageIn=$pages[0];
		}
		Mobilebone.transition(pageIn,$pageOut[0],false, {
		    history: false
		});
	}
	function showB(){
		var $pages=$(".page");
		var len=$pages.length;
		var index=0;
		var $pageOut=$(".page.in");
		index=$pages.index($pageOut);
		if(index-1>=0){
			var pageIn=$pages[index-1];
		}else{
			if(!options.control) return;
			var pageIn=$pages[len-1];
		}
		Mobilebone.transition(pageIn,$pageOut[0],true, {
		    history: false
		});
	}
	
	function pre(){
		showB();
	}
	function next(){
		showA();
	}
	function hide(name){
		name=name || "";
		var $element=$("#"+name);
		$element.removeClass("page");
		$element.hide();
	}
	function show(name){
		name=name || "";
		var $element=$("#"+name);
		$element.addClass("page");
	}
	return {
		init:init,
		hide:hide,
		show:show,
		pre:pre,
		next:next
	};
}();