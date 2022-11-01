const DELTA = 1/100

function GameWorld() {
    this.whiteBall = new Ball(new Vector2(413, 413))
    this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall))
}

GameWorld.prototype.update = function() {
    this.stick.update()
    this.whiteBall.update(DELTA)

    if (!this.ballsMoving() && this.stick.shot) {
        // debugger
        this.stick.reposition(this.whiteBall.position)
    }
}

GameWorld.prototype.draw = function() {
    Canvas.drawImage(sprites.background, {x: 0, y: 0})
    // Canvas.drawImage(sprites.background, new Vector2(0,0), new Vector2(0,0))
    this.stick.draw()
    this.whiteBall.draw()
}

GameWorld.prototype.ballsMoving = function() {
    return this.whiteBall.moving
}