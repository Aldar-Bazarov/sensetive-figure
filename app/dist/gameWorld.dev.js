"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function GameWorld() {
  this.balls = CONSTANTS.balls.map(function (ball) {
    return _construct(Ball, _toConsumableArray(ball));
  });
  this.whiteBall = this.balls.find(function (ball) {
    return ball.color === COLOR.WHITE;
  });
  this.stick = new Stick(CONSTANTS.whiteBallInitialPosition, this.whiteBall.shoot.bind(this.whiteBall));
  this.table = {
    TopY: 57,
    RightX: 1443,
    BottomY: 768,
    LeftX: 57
  };
}

GameWorld.prototype.handleCollisions = function () {
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].handleBallInPocket();
    this.balls[i].collideWithTable(this.table);

    for (var j = i + 1; j < this.balls.length; j++) {
      var firstBall = this.balls[i];
      var secondBall = this.balls[j];
      firstBall.collideWithBall(secondBall);
    }
  }
};

GameWorld.prototype.update = function () {
  this.handleCollisions();
  this.stick.update();

  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].update(CONSTANTS.delta);
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