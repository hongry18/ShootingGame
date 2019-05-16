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
 * 자유낙하 운동방식
   s = v0t + 1/2at^2
 * 포물선 운동에서의 v0
   s = v0t + 1/2at^2
   v0 = 공을 던진 힘 - (공에 가해 진 힘)
   가속도와 반대방향

 * 관성의 법칙
   한 번 움직인 물체는 그 속도를 유지한다
   x = 등속운동
   y = 등가속운동

   y = -x^2
   y` = 2x
 */

elCanvas.style.border = '1px solid gray'

var traceFlag = false

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
    ctx.strokeStyle = "red"
    ctx.stroke()
}

elStart.onclick = function() {
    canvasClear()
    var frm = 0
    var xy = []
    var x, y

    var v0 = Number(elV0.value)
    var acceleration = Number(elAccel.value)
    var startX = Number(elStartX.value)
    var startY = Number(elStartY.value)
    var radius = Number(elRadius.value)
    var frameLimit = Number(elFrameLimit.value)
    
    var timer = setInterval(function() {
        if (frm === frameLimit) {clearInterval(timer)}
        frm = frm + 1
        if (!elTrace.checked) {
            canvasClear()
        }

        var frm2 = frm * -v0 + acceleration * Math.pow(frm, 2)
        arc(startX+frm*12, startY+frm2, radius)
    }, 20)
}

