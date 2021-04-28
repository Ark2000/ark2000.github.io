//时钟, 1秒运行一次
var lastTime
function clock() {
    var Time = (new Date()).toUTCString();
	//降低刷新率, 60Hz太鬼畜了
	if (lastTime != Time) {
		$("#time").html("Local Time: " + Time);
	}
	lastTime = Time;
	requestAnimationFrame(clock)
}

//a good practice
$(function() {
	requestAnimationFrame(clock);
});