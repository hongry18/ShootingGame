var ctx = elCanvas.getContext("2d")

//drawRect(ctx, new XY(10,10), 300, 1)
//drawLine(ctx, new XY(10,60), new XY(310, 60))

var income = [100, 30, 35, -20, 10, 70, 90]
mkChart(income)

function mkChart(income) {
    var interval = 50
    var prevXY
    var bottom = 240
    var leftPadding = 20
    // x line
    for(var i=0, lng=5; i<lng; i++) {
        var num = i*60
        //drawLine(ctx, new XY(0, bottom - num), new XY(400, bottom - num), "black")
        drawRect(ctx, new XY(0, bottom - num), (income.length + 1) * interval, 1)
    }
    
    // y line
    for (var i=0, lng=5; i<lng; i++) {
        var num = i*100
        //drawLine(ctx, new XY(num, 0), new XY(num, bottom), "black")
        drawRect(ctx, new XY(num, 0), 1, bottom)
    }

    // draw data line
    for(var i=0, e=income.length; i<e; i++) {
        var num = income[i]

        var xy = new XY( (i*interval + leftPadding), (bottom - num) )
        if (i==0) {
            ctx.moveTo(xy.x, xy.y)
        } else {
            drawLine(ctx, prevXY, xy, "blue")
        }
        drawArc(ctx, xy)
        prevXY = xy
    }
}

function drawArc(context, c) {
    context.beginPath()
    context.arc(
        c.x, c.y // 중점의 좌표
        ,3 // 반지름
        ,0 // 각의 시작점 start radian value
        ,2 * Math.PI // 각의 끝점 end radian value
    )
    context.fill()
    context.stroke()
}

function drawRect(context, s, w, h) {
    context.beginPath()        
    context.rect(s.x, s.y, w, h)
    context.fillStyle="gray"
    context.fill()
}

function drawLine(context, f, t, c) {
    context.beginPath()
    context.moveTo(f.x, f.y)
    context.lineTo(t.x, t.y)
    context.strokeStyle= c ? c : "black"
    context.stroke()
}

function XY(x, y) {
    this.x = x
    this.y = y
}