var ctx = elCanvas.getContext("2d")

var flak = new FLAK(500/2 - 20, 250-10, 'brown')
var missiles = []
//var plain = new PLAIN(-40, 0, 'blue')
var plains = []

for (var i=0; i<7; i++) {
    plains.push(new PLAIN(-20 * i, 25 * i, 'blue'))
}

var frame = 0
var score = 0

var timer = setInterval(function(f) {
    clearCanvas()
    // missiles
    for(var i=0, e=missiles.length; i<e; i++) {
        if (typeof missiles[i] === 'undefined') {
            // 배열의 길이가 정해져서 삭제된 배열의 객체는 undefined로 반환돼 그대로 다음루프
            continue
        }

        if (missiles[i].out) {
            // 화면밖의 미사일의 배열을 제거
            // 동영상과 따로 만든 이유는 O(N) 으로 반복문 3번쓰면 O(3N) 이 되기때문
            missiles.splice(i, 1)
            continue
        }

        draw(missiles[i])
        missiles[i].move()
        // overlap dicision
        for (var pi=0, pe=plains.length; pi<pe; pi++) {
            var isOverlap = overlapDicision(missiles[i], plains[pi])
            if (isOverlap) {
                missiles[i].out = true
                plains[pi].out = true
                setScore(13)
            }
        }

    }

    // flak
    draw(flak)

    // plains
    for(var i=0, e=plains.length; i<e; i++) {
        draw(plains[i])
        plains[i].move()
        if (plains[i].out) {
            plains[i].init()
        }
    }

    frame = frame + 1
    //if (frame === 100) { clearInterval(timer) }
}, 20)

document.body.onkeydown = function(e) {
    var keys = {
        37: arrowLeft
        ,39: arrowRight
        ,32: spacebar
    }

    if (!keys.hasOwnProperty(e.keyCode)) {
        return
    }

    keys[e.keyCode]()

    function arrowRight() {
        flak.move("right", 40)
    }

    function arrowLeft() {
        flak.move("left", 40)
    }

    function spacebar() {
        missiles.push(new MISSILE(flak.x + (flak.w / 2) - 2, flak.y - 15, 'red'))
    }
}

function setScore(point) {
    score = score + point
    elScore.innerText = score
}

function draw(object) {
    ctx.beginPath()
    ctx.rect(object.x, object.y, object.w, object.h)
    if (object.hasOwnProperty('c') && object['c']) {
        ctx.fillStyle = object.c
    }
    ctx.fill()
}

function clearCanvas() {
    elCanvas.width = elCanvas.width
}

function overlapDicision(a, b) {
    /**
     * a의 꼭지점 네개를 b에 포함이 되는지 확인
     * 반대로도 확인
     */

    function search(one, two) {
        var flag = false
        var leftTop = {x: one.x, y:one.y}
        var rightTop = {x: one.x + one.w, y: one.y}
        var leftBottom = {x: one.x, y: one.y + one.h}
        var rightBottom = {x: one.x + one.w, y: one.y + one.h}

        var res = []
        var oneVertex = [leftTop, rightTop, leftBottom, rightBottom]

        for(var i=0, e=oneVertex.length; i<e; i++) {
            var x = oneVertex[i].x
            if (x >= two.x && x <= (two.x + two.w)) {
                res.push(oneVertex[i])
            }
        }
        // end for

        for (var i=0, e=res.length; i<e; i++) {
            var y = res[i].y
            if (y >= two.y && y <= (two.y + two.h)) {
                flag = true
                break
            }
        }

        return flag
    }
    
    var flag = search(a,b)

    if (!flag) { flag = search(b,a) }

    return flag
}

function FLAK(x, y, c) {
    this.x = x
    this.y = y
    this.w = 40
    this.h = 10
    this.c = c ? c : 'brown'

    this.move = function(option, num) {
        if (option === "right") {
            this.x = this.x + num
            if (this.x + this.w > 500) {
                this.x = (500 - this.w)
            }
        } else if (option === "left") {
            this.x = this.x - num

            if (this.x < 0) {
                this.x = 0
            }
        }
    }
    // move
}

function MISSILE(x, y, c) {
    var initFrame = frame
    this.x = x
    this.y = y
    this.w = 4
    this.h = 15
    this.c = c ? c : 'red'
    this.out = false

    this.move = function() {
        this.y = this.y - 10
        if (this.y + this.h < 0) {
            this.out = true
        }
    }
    // move
}

function PLAIN(x, y, c) {
    // 편도선
    this.x = x
    this.y = y
    this.w = 40
    this.h = 10
    this.c = c ? c : 'blue'
    this.out = false
    this.moveSpeed = 5

    this.move = function() {
        this.x = this.x + this.moveSpeed

        if (this.x > 500) {
            this.out = true
        }
    }
    // move

    this.init = function() {
        this.x = -40
        this.out = false
    }
}

function PLAIN2(x, y, c) {
    // 왕복선
    this.x = x
    this.y = y
    this.w = 40
    this.h = 10
    this.c = c ? c : 'blue'
    this.moveSpeed = 5
    this.moveArrow = 'right'

    this.move = function() {
        if (this.moveArrow === 'left') {
            this.x = this.x - this.moveSpeed
        } else {
            this.x = this.x + this.moveSpeed
        }

        if (this.x + this.w >= 500) {
            this.moveArrow = 'left'
        } else if (this.x < 0) {
            this.moveArrow = 'right'
        }
    }
}