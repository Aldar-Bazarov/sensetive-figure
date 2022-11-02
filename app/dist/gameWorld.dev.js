"use strict";

var DELTA = 1 / 177;

function GameWorld() {
  this.balls = [[new Vector2(413, 413), COLOR.WHITE], [new Vector2(1090, 413), COLOR.BLACK], [new Vector2(1022, 413), COLOR.YELLOW], [new Vector2(1056, 393), COLOR.YELLOW], [new Vector2(1090, 452), COLOR.YELLOW], [new Vector2(1126, 354), COLOR.YELLOW], [new Vector2(1126, 433), COLOR.YELLOW], [new Vector2(1162, 413), COLOR.YELLOW], [new Vector2(1162, 491), COLOR.YELLOW], [new Vector2(1056, 433), COLOR.RED], [new Vector2(1090, 374), COLOR.RED], [new Vector2(1126, 393), COLOR.RED], [new Vector2(1126, 472), COLOR.RED], [new Vector2(1162, 335), COLOR.RED], [new Vector2(1162, 374), COLOR.RED], [new Vector2(1162, 452), COLOR.RED]].map(function (ball) {
    return new Ball(ball[0], ball[1]);
  });
  this.whiteBall = this.balls[0];
  this.stick = new Stick(new Vector2(413, 413), this.whiteBall.shoot.bind(this.whiteBall));
}

GameWorld.prototype.handleCollisions = function () {
  for (var i = 0; i < this.balls.length; i++) {
    for (var j = i + 1; j < this.balls.length; j++) {
      var firstBall = this.balls[i];
      var secondBall = this.balls[j];
      firstBall.collideWith(secondBall);
    }
  }
};

GameWorld.prototype.update = function () {
  this.handleCollisions();
  this.stick.update();

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(DELTA);
  }

  if (!this.ballsMoving() && this.stick.shot) {
    // debugger
    this.stick.reposition(this.whiteBall.position);
  }
};

GameWorld.prototype.draw = function () {
  Canvas.drawImage(sprites.background, {
    x: 0,
    y: 0
  }); // Canvas.drawImage(sprites.background, new Vector2(0,0), new Vector2(0,0))

  this.stick.draw();

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].draw();
  }
};

GameWorld.prototype.ballsMoving = function () {
  var ballsMoving = false;

  for (var i = 0; i < this.balls.length; i++) {
    if (this.balls[i].moving) {
      ballsMoving = true;
      break;
    }
  }

  return ballsMoving;
};