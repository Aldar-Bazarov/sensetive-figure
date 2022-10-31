"use strict";

var sprites = {};
var assetsStillLoading = 0;

function assetsLoadingLoop(callback) {
  if (assetsStillLoading) {
    requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
  } else {
    callback();
  }
}

function loadAssets(callback) {
  function loadSprite(fileName) {
    assetsStillLoading++;
    var spriteImage = new Image();
    spriteImage.src = "../assets/sprites/" + fileName;

    spriteImage.onload = function () {
      assetsStillLoading--;
    };

    return spriteImage;
  }

  sprites.background = loadSprite('spr_background.jpg');
  sprites.stick = loadSprite('spr_stick.png');
  assetsLoadingLoop(callback);
}