"use strict";

function handleMouseMove(e) {
  if (Mouse.left.pressed) {
    var x = e.pageX;
    var y = e.pageY;
    Mouse.position = new Vector2(x, y);
  }
}

function handleMouseDown(e) {
  handleMouseMove(e);

  if (e.which === 1) {
    if (!Mouse.left.down) Mouse.left.pressed = true;
    Mouse.left.down = true;
  } else if (e.which === 2) {
    if (!Mouse.middle.down) Mouse.middle.pressed = true;
    Mouse.middle.down = true;
  } else if (e.which === 3) {
    if (!Mouse.right.down) Mouse.right.pressed = true;
    Mouse.right.down = true;
  }

  handleMouseMove(e);
}

function handleMouseUp(e) {
  handleMouseMove(e);
  if (e.which === 1) Mouse.left.down = false;else if (e.which === 1) Mouse.middle.down = false;else if (e.which === 1) Mouse.right.down = false;
  handleMouseMove(e);
}

function MouseHandler() {
  this.left = new ButtonState();
  this.middle = new ButtonState();
  this.right = new ButtonState();
  this.position = new Vector2();
  document.onmousemove = handleMouseMove;
  document.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
}

MouseHandler.prototype.reset = function () {
  this.left.pressed = false;
  this.middle.pressed = false;
  this.right.pressed = false;
};

var Mouse = new MouseHandler();