"use strict";

function Game() {}

Game.prototype.init = function () {
  this.gameWorld = new GameWorld();
};

Game.prototype.start = function () {
  FigureGame.init();
  FigureGame.mainLoop();
};

Game.prototype.mainLoop = function () {
  Canvas.clear();
  FigureGame.gameWorld.update();
  FigureGame.gameWorld.draw();
  Mouse.reset();
  requestAnimationFrame(FigureGame.mainLoop);
};

var FigureGame = new Game();