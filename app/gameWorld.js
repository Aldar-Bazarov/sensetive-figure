function GameWorld() {
    this.balls = CONSTANT.balls.map(ball => new Ball(...ball))

    this.whiteBall = this.balls.find(ball => ball.color === COLOR.WHITE)
    this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall))

    this.table = {
        TopY: 57,
        RightX: 1443,
        BottomY: 768,
        LeftX: 57,
    }
}

GameWorld.prototype.handleCollisions = function() {
    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].collideWithTable(this.table)
        for (let j = i + 1; j < this.balls.length; j++) {
            const firstBall = this.balls[i]
            const secondBall = this.balls[j]
            firstBall.collideWithBall(secondBall)
        }
        
    }
}

GameWorld.prototype.update = function () {
    this.handleCollisions()

    this.stick.update()

    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].update(CONSTANT.delta)
    }

    if (!this.ballsMoving() && this.stick.shot) {
        // debugger
        this.stick.reposition(this.whiteBall.position)
    }
}

GameWorld.prototype.draw = function () {
    Canvas.drawImage(sprites.background, { x: 0, y: 0 })
    // Canvas.drawImage(sprites.background, new Vector2(0,0), new Vector2(0,0))
    this.stick.draw()

    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].draw()
    }
}

GameWorld.prototype.ballsMoving = function () {
    let ballsMoving = false

    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].moving) {
            ballsMoving = true
            break
        }
    }

    return ballsMoving
}