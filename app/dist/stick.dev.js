"use strict";

var STICK_ORIGIN = new Vector2(970, 11);

function Stick(position, onShoot) {
  this.position = position;
  this.rotation = 0;
  this.origin = STICK_ORIGIN.copy();
  this.power = 0;
  this.onShoot = onShoot;
}

Stick.prototype.update = function () {
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
  this.power += 100;
  this.origin.x += 5;
};

Stick.prototype.shoot = function () {
  this.onShoot(this.power, this.rotation);
  this.power = 0;
};