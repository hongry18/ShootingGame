var ctx = elCanvas.getContext("2d")

/**
 * setTimeout - 특정 시간 이후 한번 실행
 * setInterval - 특정 시간 이후 반복 실행
    clearInterval - 반복종료
 * 
 * 애니메이션
    객체의 위치를 시간의 흐름에 따라 다르게 배치한다
 * 등속운동 : 가속도가 0 인 운동
   거리와 가속도
   s = (v0 * t) + (1/2 * a + t^2)
 * 등가속도 운동: 일정한 가속도가 존재하는 운동
 */

var frm = 0;
var x, y
var xy = []

var timer = setInterval(function() {
    //if (frm === 20) {clearInterval(timer)}
    frm = frm + 1
    canvasClear()
    if (xy.length < 1) {
        return
    }

    //var frm2 = frm * 10 + (0 * Math.pow(frm, 2) * 1)
    //arc(50+frm2, 100)
    //arc(100, 50+frm2)

    for(var i=0, e=xy.length; i<e; i++) {
        var ar = xy[i]
        if (typeof ar === 'undefined') {
            continue
        }

        var r = frm - ar[2]
        arc(ar[0], ar[1], r)

        if ( r > 100 ) {
            xy.splice(i, 1)
        }
    }


}, 10)

elCanvas.onclick = function(e) {
    x = e.layerX
    ,y = e.layerY
    //arc(x, y, 30)
    xy.push([x,y,frm])
}

elCanvas.style.backgroundColor = "black"

function canvasClear() {
    ctx.canvas.width = ctx.canvas.width
}

function arc(x,y, r) {
    ctx.beginPath()
    ctx.arc(
        x, y // 원의 중점
        ,r // 반지름 radius
        ,0 // radian value (반지름과 호의 길이가 일치할때 각도)
        ,Math.PI * 2
    )
    ctx.strokeStyle = "pink"
    ctx.stroke()
}