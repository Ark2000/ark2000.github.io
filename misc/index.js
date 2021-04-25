function clock() {
    var Time = (new Date()).toUTCString();
	document.getElementById("time").innerHTML = "Local Time: " + Time
	requestAnimationFrame(clock)
}
requestAnimationFrame(clock)