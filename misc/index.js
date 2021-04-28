var ar = document.getElementById("article-region");
var al = document.getElementById("articles-list");

//时钟, 1秒运行一次
var lastTime
function clock() {
    var Time = (new Date()).toUTCString();
	//降低刷新率, 60Hz太鬼畜了
	if (lastTime != Time) {
		document.getElementById("time").innerHTML = "Local Time: " + Time
	}
	lastTime = Time;
	requestAnimationFrame(clock)
}
requestAnimationFrame(clock)

//调整iframe的高度,使之适应内容
function setiFrameHeight() {
	if (ar.contentDocument.body) {
		var height = ar.contentDocument.body.scrollHeight;
		ar.style.height = height + 30 + "px";
	}
}

//默认隐藏 article-region
ar.hidden = true;

//点击文章链接时，将article-list替换成article-region
var articles = document.getElementsByClassName("article");
for (i = 0; i < articles.length; i++) {
	articles[i].onclick = function(event) {
		event.preventDefault();
		al.hidden = true;
		ar.src = event.target.getAttribute("link");
		ar.hidden = false;
		//必须设置一个延时，等待浏览器把内容装进入
		//然后再去调整高度
		window.setTimeout(function() {
			setiFrameHeight()
			history.pushState(null, "", ar.src);
		}, 100);
	}
	articles[i].on
}

window.onpopstate = function(e) {
	console.log(e);
	window.location.replace(".");
}