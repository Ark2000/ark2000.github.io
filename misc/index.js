//时钟, 1秒更新一次
let lastTime
function clock() {
    let Time = (new Date()).toUTCString();
	if (lastTime != Time) {
		$("#time").html("Local Time : " + Time);
		$("#stat").html("Visit Statistics : <b class='text5'>" + $('#busuanzi_value_site_pv').text() + "</b>");
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
        '<a href="'+a[i].link+'" class="ititle" '+ (a[i].new_tab ? 'target="_blank"':'') +'>> '+a[i].title+'</a>' +
        '<p class="idesc">'+ (a[i].desc ? a[i].desc : '') +'</p>' +
		'<div class="itags">' + tags +
        '</div>' +
        '<div class="idate">' +
          '<span class="text3">📅 Create: '+ a[i].date1 +'</span>' +
		  '<span class="text3">📅 Update: '+ (a[i].date2 ? a[i].date2 : a[i].date1) +'</span>' +
		  '<span class="text3">⌛ Length: '+ (a[i].length ? a[i].length : '?') +'</span>' +
        '</div>' +
      	'</li>';
		li.html(li.html() + html);
	}
}

//玩一些动画效果
function setUpEffect() {
	//开场动画，逐个出现
	const interval = 200;

	function makeCallBack(ele) {
		return function() {
			ele.show(interval);
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
		// setUpEffect();
		$(".tag").click(function(e) {
			e.preventDefault();
			alert("Under construction...");
		});
	}).fail(function() {
		alert("unknown error! stupid coder!");
	})

	console.log("No secret here, don't event think about it.");
});