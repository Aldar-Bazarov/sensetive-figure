"use strict";

// const STICK_ORIGIN = new Vector2(970, 11)
// const STICK_SHOT_ORIGIN = new Vector2(950, 11)
// const MAX_POWER = 7500
function Stick(position, onShoot) {
  this.position = position;
  this.rotation = 0;
  this.origin = CONSTANT.stickOrigin.copy();
  this.power = 0;
  this.onShoot = onShoot;
  this.shot = false;
}

Stick.prototype.update = function () {
  if (this.shot) {
    return;
  }

  if (Mouse.left.down) {
    this.increasePower();
  } else if (this.power > 0) {
    this.shoot();
  }

  this.updateRotation();
};

Stick.prototype.draw = function () {
  Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
};

Stick.prototype.updateRotation = function () {
  var oposite = Mouse.position.y - this.position.y;
  var adjacent = Mouse.position.x - this.position.x;
  this.rotation = Math.atan2(oposite, adjacent);
};

Stick.prototype.increasePower = function () {
  if (this.power > CONSTANT.maxPower) {
    return;
  }

  this.power += 120;
  this.origin.x += 3;
};

Stick.prototype.shoot = function () {
  this.onShoot(this.power, this.rotation);
  this.power = 0;
  this.origin = CONSTANT.stickShotOrigin.copy();
  this.shot = true;
};

Stick.prototype.reposition = function (position) {
  this.position = position.copy();
  this.origin = CONSTANT.stickOrigin.copy();
  this.shot = false;
};