//change colors randomly

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let colors = [
    ["#39a8d1", "#ee6ca1", "#f5f5f5", "#ee6ca1", "#39a8d1", "#f5f5f5"],
    ["#f5f5f5", "#fe4b74", "#373b44", "#2d3139", "#f5f5f5", "#f5f5f5"],
    ["#f5f5f5", "#ffa101", "#31525b", "#2B4850", "#f5f5f5", "#f5f5f5"],
    ["#084b83", "#ff66b3", "#f0f6f6", "#E6F0F0", "#084b83", "#191919"],
    ["#084b83", "#7d2ae8", "#f0f6f6", "#E6F0F0", "#084b83", "#191919"],
    ["#F1FAEE", "#E63946", "#1D3557", "#192F4D", "#f5f5f5", "#f5f5f5"],
    ["#586BA4", "#F76C5E", "#F3D77C", "#F1D26A", "#586BA4", "#191919"],
    ["#0E4749", "#E55812", "#EFE7DA", "#EDE3D4", "#0E4749", "#191919"],
    ["#f0f6f6", "#ef921c", "#191919", "#141414", "#f0f6f6", "#f5f5f5"],
    ["#f0f6f6", "#1d9bf0", "#191919", "#141414", "#f0f6f6", "#f5f5f5"],
]

let i = getRndInteger(0, colors.length)

document.getElementById("c1").style.color = colors[i][0]
document.getElementById("c2").style.color = colors[i][1]
document.getElementById("c3").style.color = colors[i][0]
document.getElementById("c4").style.backgroundColor = colors[i][3]
document.getElementById("c5").style.backgroundColor = colors[i][2]
document.getElementById("c6").style.color = colors[i][5]
let svgs = document.getElementsByTagName('svg')
for (let j = 0; j < svgs.length; j++) {
    svgs[j].style.fill = colors[i][4]
}