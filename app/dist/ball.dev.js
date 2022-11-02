"use strict";

// const CONSTANT.ballOrigin = new Vector2(25, 25)
// const BALL_DIAMETER = 38
// const BALL_RADIUS = BALL_DIAMETER / 2
function Ball(position, color) {
  this.position = position;
  this.velocity = new Vector2();
  this.moving = false;
  this.sprite = getBallSpriteByColor(color);
  this.color = color;
}

Ball.prototype.update = function (delta) {
  this.position.addTo(this.velocity.mult(delta)); // Apply friction

  this.velocity = this.velocity.mult(0.984);

  if (this.velocity.length() < 5) {
    this.velocity = new Vector2();
    this.moving = false;
  }
};

Ball.prototype.draw = function () {
  Canvas.drawImage(this.sprite, this.position, CONSTANT.ballOrigin = new Vector2(25, 25));
};

Ball.prototype.shoot = function (power, rotation) {
  this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
  this.moving = true;
};

Ball.prototype.collideWithBall = function (ball) {
  // Find a normal vector
  var n = this.position.subtract(ball.position); // Find distance

  var dist = n.length();

  if (dist > CONSTANT.ballDiameter) {
    return;
  } // Find minimum translation distance


  var mtd = n.mult((CONSTANT.ballDiameter - dist) / dist); // Push-pull balls apart

  this.position = this.position.add(mtd.mult(1 / 2));
  ball.position = ball.position.subtract(mtd.mult(1 / 2)); // Find unit normal vector

  var un = n.mult(1 / n.length()); // Find unit tangent vector

  var ut = new Vector2(-un.y, un.x); // Project velocities onto the unit normal and unit tangent vectors

  var v1n = un.dot(this.velocity);
  var v1t = un.dot(this.velocity);
  var v2n = un.dot(ball.velocity);
  var v2t = un.dot(ball.velocity); // Find new normal velocities

  var v1nTag = v2n;
  var v2nTag = v1n; // Convert the scalar normal and tangential velocities into vectors

  v1nTag = un.mult(v1nTag);
  var v1tTag = ut.mult(v1t);
  v2nTag = un.mult(v2nTag);
  var v2tTag = ut.mult(v2t); // Update velocities

  this.velocity = v1nTag.add(v1tTag);
  ball.velocity = v2nTag.add(v2tTag);
  this.moving = true;
  ball.moving = true;
};

Ball.prototype.collideWithTable = function (table) {
  if (!this.moving) {
    return;
  }

  var collided = false;

  if (this.position.y <= table.TopY + CONSTANT.ballRadius) {
    this.position.y = table.TopY + CONSTANT.ballRadius;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }

  if (this.position.x >= table.RightX - CONSTANT.ballRadius) {
    this.position.x = table.RightX - CONSTANT.ballRadius;
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }

  if (this.position.y >= table.BottomY - CONSTANT.ballRadius) {
    this.position.y = table.BottomY - CONSTANT.ballRadius;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }

  if (this.position.x <= table.LeftX + CONSTANT.ballRadius) {
    this.position.x = table.LeftX + CONSTANT.ballRadius;
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }

  if (collided) {
    this.velocity = this.velocity.mult(0.98);
  }
};