var ctx = elCanvas.getContext("2d")

var flak = new FLAK(0, 250-10, 40, 10, 'black')
var missiles = []

var frame = 0

var timer = setInterval(function(f) {
    clearCanvas()
    // change object

    // draw flak
    draw(flak)

    // draw missiles
    for(var i=0, e=missiles.length; i<e; i++) {
        if (typeof missiles[i] === 'undefined') {
            continue
        }

        if (missiles[i].out) {
            missiles.splice(i, 1)
            continue
        }

        draw(missiles[i])
        missiles[i].move()
    }

    frame = frame + 1
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
        missiles.push(new MISSILE(flak.x + (flak.w / 2) - 5, flak.y - 30, 10, 30))
    }
}

function draw(object) {
    ctx.beginPath()
    ctx.rect(object.x, object.y, object.w, object.h)
    if (object.hasOwnProperty('color') && object['color']) {
        ctx.fillStyle = object.color
    }
    ctx.fill()
}

function clearCanvas() {
    elCanvas.width = elCanvas.width
}

function FLAK(x, y, w, h, c) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = 'black'

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
}

function MISSILE(x, y, w, h) {
    var initFrame = frame
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = 'red'
    this.out = false

    this.move = function() {
        this.y = this.y - 10
        if (this.y + this.h < 0) {
            this.out = true
        }
    }
}