var productId;

var index = 36;
var i = 36;
var scale = 0.003333333;
var pre, cur, next, ci;

var preOffsize = 0;
var curOffsize = 100;
var nextOffsize = 200;
var flag=true;
apiready = function() {


	j("#goBuy").click(function() {
		var uid = $api.getStorage('uid');

	});

	j('#current').click(function() {
		api.execScript({
			name : 'root',
			script : 'openTab("invest");'
		});
	});
	j('#sliders').click(function(event) {
		var width = api.winWidth/2;
		if(width-30>event.pageX) {
			rotate(j(".pre")[0])
		}else if(width+30<event.pageX){
			rotate(j(".next")[0])
		}
	});

	api.addEventListener({
		name : 'swiperight'
	}, function(ret, err) {
		pre = j(".pre")[0];
		rotate(pre);
	});

	api.addEventListener({
		name : 'swipeleft'
	}, function(ret, err) {
		next = j(".next")[0];
		rotate(next);
	})
	getData();
};

function getData() {
	
	$api.html(j(".cur p")[0], "");
	$api.html(j(".pre p")[0], "");
	$api.html(j(".next p")[0], "");
	productId = NaN;
	$api.text($api.byId('investMin'), "起投金额：");
	$api.text($api.byId('availableAmt'), "产品剩余金额：");
	var url = $api.getStorage('investUrl') + '/api/invest/finance/getRegularProduct';
	var cycle = j(".cur")[0].id;
	var bodyParam = {
		cycle : cycle
	}

	ajaxPost(url, bodyParam, function(ret, err) {
		$api.text($api.byId('investMin'), "起投金额：" + ret.data.investMin + '元');
		$api.text($api.byId('availableAmt'), "产品剩余金额：" + ret.data.canInvestAmountFmt + '元');
		$api.html(j(".cur p")[0], "<strong>" + ret.data.yearRate + "%</strong>年化收益率");
		productId = ret.data.id;
		flag = true;
	});
}

//旋转图片方法，输入参数为点击对象
function rotate(obj) {
	if(flag){
		flag = false;
		pre = j(".pre")[0];
		cur = j(".cur")[0];
		next = j(".next")[0];
		//获取对象的translateX()的坐标值正则表达式
		var reg = /\.*translateX\((.*)px\)/i;

		//左边对象的转移坐标值X
		preOffsize = parseInt(reg.exec(pre.style.cssText)[1]);
		//中间对象的转移坐标值X
		curOffsize = parseInt(reg.exec(cur.style.cssText)[1]);
		//右边对象的转移坐标值X
		nextOffsize = parseInt(reg.exec(next.style.cssText)[1]);
		//旋转角度初始值，旋转10次  18*10 = 180
		index = 36;
		//清除定时
		clearInterval(ci);
		if (obj == next) {
			ci = setInterval("moveTo(-1)", 25);
		} else if (obj == pre) {
			ci = setInterval("moveTo(1)", 	25);
		}
	}
}

//计算偏移坐标，输入参数obj：要转移的对象，arrow转移方向 -1 为向左移动，1为向右移动
function calcOffsize(obj, arrow) {
	//此次转移的坐标值 循环次数 *20(每次移动的步长)*方向
	var offsize = (index / 36) * 10 * arrow;

	if (obj == pre) {//如果需要移动的是左边对象需要加上当前左边的坐标值
		offsize = offsize + preOffsize;
	} else if (obj == cur) {//如果需要移动的是中间对象需要加上当前中间的坐标值
		offsize = offsize + curOffsize;
	} else if (obj == next) {//如果需要移动的是右边对象需要加上当前右边的坐标值
		offsize = offsize + nextOffsize;
	}

	if (offsize < 0 && obj == j("#sliders > li")[0]) {//如果需要移动的是左边对象，当坐标值小于0时需要将左边对象移动到最右边
		offsize = 200;
	} else if (offsize > 200 && obj == j("#sliders > li")[0]) {//如果需要移动的是左边对象，当坐标值大于400时需要将左边对象移动到最左边
		offsize = 0;
	} else if (offsize > 100 && obj == j("#sliders > li")[1]) {//如果需要移动的是中间对象，当坐标值大于200时需要将中间对象移动到最左边
		offsize = -100;
	} else if (offsize < -100 && obj == j("#sliders > li")[1]) {//如果需要移动的是中间对象，当坐标值小于200时需要将中间对象移动到最右边
		offsize = 100;
	} else if (offsize > 0 && obj == j("#sliders > li")[2]) {//如果需要移动的是右边对象，当坐标值大于0时需要将右边对象移动到最左边
		offsize = -200
	} else if (offsize < -200 && obj == j("#sliders > li")[2]) {//如果需要移动的是右边对象，当坐标值小于-400时需要将右边对象移动到最右边
		offsize = 0
	}

	return offsize;
}

//移动方法，arrow为移动方向 -1 为向左移动，1为向右移动
function moveTo(arrow) {
	//对象缩小值
	var min = 2 - (index / 36 * 0.16);
	//对象放大值
	var max = 0.4 + (index / 36 * 0.16);

	var miny = 0 + (index / 36 * 5);
	var maxy = 50 - (index / 36 * 5);
	//设置右边对象移动坐标、旋转角度与缩放比例
	//next.style.transform = "translateX(" + calcOffsize(next, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? max : 0.4) + ")";
	//next.style.msTransform = "translateX(" + calcOffsize(next, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? max : 0.4) + ")";
	next.style.cssText = (arrow < 0 ? "" : "-webkit-transform-origin:left;") + " -webkit-transform: translateX(" + calcOffsize(next, arrow) + "px)  rotateY(" + (arrow < 0 ? (360 - index) : index) + "deg) scale(" + (arrow < 0 ? max : 0.4) + ")";
	//next.style.mozTransform = "translateX(" + calcOffsize(next, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? max : 0.4) + ")";
	//next.style.oTransform = "translateX(" + calcOffsize(next, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? max : 0.4) + ")";

	//设置中间对象移动坐标、旋转角度与缩放比例
	//cur.style.transform = "translateX(" + calcOffsize(cur, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + min + ")";
	//cur.style.msTransform = "translateX(" + calcOffsize(cur, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + min + ")";
	cur.style.cssText = (arrow < 0 ? "-webkit-transform-origin:left;" : "-webkit-transform-origin:right; ") + " -webkit-transform: translateX(" + calcOffsize(cur, arrow) + "px)  rotateY(" + (arrow < 0 ? (360 - index) : index) + "deg) scale(" + min + ")";
	//cur.style.mozTransform = "translateX(" + calcOffsize(cur, arrow+) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + min + ")";
	//cur.style.oTransform = "translateX(" + calcOffsize(cur, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + min + ")";

	//设置左边对象移动坐标、旋转角度与缩放比例
	//pre.style.transform = "translateX(" + calcOffsize(pre, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? 0.4 : max) + ")";
	//pre.style.msTransform = "translateX(" + calcOffsize(pre, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? 0.4 : max)  + ")";
	pre.style.cssText = (arrow > 0 ? "" : "-webkit-transform-origin:right ;") + " -webkit-transform: translateX(" + calcOffsize(pre, arrow) + "px)  rotateY(" + (arrow < 0 ? (360 - index) : index) + "deg) scale(" + (arrow < 0 ? 0.4 : max) + ")";
	//pre.style.mozTransform = "translateX(" + calcOffsize(pre, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? 0.4 : max) + ")";
	//pre.style.oTransform = "translateX(" + calcOffsize(pre, arrow) + "px) rotateY(" + (arrow<0?(360-index):index) + "deg) scale(" + (arrow < 0 ? 0.4 : max)  + ")";

	index = index + 36;
	//当旋转角度大于180
	if (index > 360) {
		clearInterval(ci);
		pre.className = arrow < 0 ? 'next' : 'cur';
		cur.className = arrow < 0 ? 'pre' : 'next';
		next.className = arrow < 0 ? 'cur' : 'pre';
		getData();
	}
}