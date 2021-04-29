//时钟, 1秒更新一次
let lastTime
function clock() {
    let Time = (new Date()).toUTCString();
	if (lastTime != Time) {
		$("#time").html("Local Time : " + Time);
		$("#stat").html("Visit Statistics : " + $('#busuanzi_value_site_pv').text());
	}
	lastTime = Time;
	requestAnimationFrame(clock)
}

//拼接html
function generate(data) {
	let a = data.articles;
	var li = $('#articles-list');
	for (i = 0; i < a.length; i++) {
		let tags = "";
		for (j = 0; j < a[i].tags.length; j++) {
			tags += '<a class="tag" href=".">'+a[i].tags[j]+'</a>';
		}
		let html =
		'<li class="item">' +
        '<a href="'+a[i].link+'" class="ititle" target="_blank">>'+a[i].title+'</a>' +
        '<div class="itags">' + tags +
        '</div>' +
        '<div class="idate">' +
          '<p>📅 '+a[i].date+'</p>' +
        '</div>' +
      	'</li>';
		console.log(i);
		li.html(li.html() + html);
	}
}

//玩一些动画效果
function setUpEffect() {
	$('.item').mouseenter(function(e){
		$(this).animate({width: '82vw'}, 100);
	});
	$('.item').mouseleave(function(e){
		$(this).animate({width: '80vw'}, 100);
	});

	//开场动画，逐个出现
	const interval = 200;

	//构造闭包函数
	function makeCallBack(ele) {
		return function() {
			ele.slideDown(interval);
		};
	}
	$('.item').hide();
	let i = 0;
	$('.item').each(function() {
		setTimeout(makeCallBack($(this)), i * interval);
		i++;
	});
}

//a good practice，设定document的onready事件回调
$(function() {
	requestAnimationFrame(clock);

	$('#busuanzi_value_site_pv').hide();

	$.getJSON("./misc/content.json", function() {
	}).done(function(data) {
		generate(data);
		setUpEffect();
	}).fail(function() {
		alert("unknown error! stupid coder!");
	})
});