console.log("Hello, World!")

const ballRadius = 50
const paddleLength = 200
const paddleWidth = 200

class Ball {
    constructor(context, x, y) {
        this.ballCoordinates = { x, y }

        this.ballVelocity = {
            x: 10,
            y: 10
        }

        this.context = context

        this.paddles = []
    }

    addPaddle(paddle) {
        this.paddles.push(paddle)
    }


    drawCricle() {
        this.context.beginPath();
        this.context.arc(this.ballCoordinates.x, this.ballCoordinates.y, ballRadius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    updateCircle() {
        if ((this.ballCoordinates.x + ballRadius) >= window.innerWidth || (this.ballCoordinates.x - ballRadius) <= 0) {
            this.ballVelocity.x *= -1
            console.log("goal")
        }
        if ((this.ballCoordinates.y + ballRadius) >= window.innerHeight || (this.ballCoordinates.y - ballRadius) <= 0) {
            this.ballVelocity.y *= -1
        }

        this.paddles.forEach(paddle => {
            const isBallInsideY = (this.ballCoordinates.y + ballRadius >= paddle.paddlePosition.y) && (this.ballCoordinates.y - ballRadius <= paddle.paddlePosition.y + paddleLength)
            const isBallInsideX = (this.ballCoordinates.x + ballRadius >= paddle.paddlePosition.x) && (this.ballCoordinates.x - ballRadius) <= paddle.paddlePosition.x + paddleWidth

            if (!paddle.wasCollidingX && isBallInsideX && isBallInsideY) {
                this.ballVelocity.x *= -1
            }

            if (!paddle.wasCollidingY && isBallInsideY && isBallInsideX) {
                this.ballVelocity.y *= -1
            }

            paddle.wasCollidingX = isBallInsideX
            paddle.wasCollidingY = isBallInsideY
        })

        this.ballCoordinates.x += this.ballVelocity.x
        this.ballCoordinates.y += this.ballVelocity.y
    }

}


class Paddle {
    constructor(context, x, y) {
        this.paddlePosition = { x, y }
        this.context = context
        this.wasCollidingX = false
        this.wasCollidingY = false
    }

    drawPaddle() {
        this.context.save()
        this.context.fillStyle = 'green';
        this.context.fillRect(this.paddlePosition.x, this.paddlePosition.y, paddleWidth, paddleLength)
        this.context.restore();
    }

    updatePaddle() {

    }
}

function main() {
    const canvas = document.getElementById("canvas")
    const context = canvas.getContext('2d')
    console.log(canvas)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // context.fillStyle = 'green';
    // context.fillRect(10, 10, 150, 100);

    window.onresize = function() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }



    // context.fillStyle = 'green';
    // context.fillRect(0, 0, 150, 1000);

    function cleanCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const ball = new Ball(context, 300, 300)
    const paddle2 = new Paddle(context, 0, 0)
    const paddle1 = new Paddle(context, window.innerWidth-200, 0)
    ball.addPaddle(paddle1)
    ball.addPaddle(paddle2)
    // const ball2 = new Ball(context, 200, 700)

    canvas.addEventListener('mousemove', e => {
        // const x = e.offsetX;
        const y = e.offsetY;

        paddle1.paddlePosition.y = y - paddleLength/2
        paddle2.paddlePosition.y = y - paddleLength/2
    });


    function update() {
        cleanCanvas()

        paddle1.drawPaddle()
        paddle2.drawPaddle()
        paddle1.updatePaddle()
        paddle2.updatePaddle()

        ball.updateCircle()
        ball.drawCricle()
        // ball2.updateCircle()
        // ball2.drawCricle()
        window.requestAnimationFrame(update)
    }


    window.requestAnimationFrame(update)
}

window.onload = main