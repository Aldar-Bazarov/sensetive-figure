"use strict";

function Stick() {
  this.position = {
    x: 0,
    y: 540
  };
}

Stick.prototype.update = function () {
  // Test
  this.position.x++;
};

Stick.prototype.draw = function () {
  Canvas.drawImage(sprites.stick, this.position);
};