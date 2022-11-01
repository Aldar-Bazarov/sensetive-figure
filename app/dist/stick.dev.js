"use strict";

var STICK_ORIGIN = new Vector2(970, 11);

function Stick(position) {
  this.position = position;
  this.rotation = 0;
}

Stick.prototype.update = function () {
  this.updateRotation(); // this.position = Mouse.position
  // if (Mouse.left.pressed) {
  //     console.log("Pressed left!");
  // }    
};

Stick.prototype.draw = function () {
  Canvas.drawImage(sprites.stick, this.position, STICK_ORIGIN, this.rotation);
};

Stick.prototype.updateRotation = function () {
  var oposite = Mouse.position.y - this.position.y;
  var adjacent = Mouse.position.x - this.position.x;
  this.rotation = Math.atan2(oposite, adjacent);
};