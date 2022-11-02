"use strict";

var CONSTANT = {
  balls: [[new Vector2(413, 413), COLOR.WHITE], [new Vector2(1090, 413), COLOR.BLACK], [new Vector2(1022, 413), COLOR.YELLOW], [new Vector2(1056, 393), COLOR.YELLOW], [new Vector2(1090, 452), COLOR.YELLOW], [new Vector2(1126, 354), COLOR.YELLOW], [new Vector2(1126, 433), COLOR.YELLOW], [new Vector2(1162, 413), COLOR.YELLOW], [new Vector2(1162, 491), COLOR.YELLOW], [new Vector2(1056, 433), COLOR.RED], [new Vector2(1090, 374), COLOR.RED], [new Vector2(1126, 393), COLOR.RED], [new Vector2(1126, 472), COLOR.RED], [new Vector2(1162, 335), COLOR.RED], [new Vector2(1162, 374), COLOR.RED], [new Vector2(1162, 452), COLOR.RED]],
  ballOrigin: new Vector2(25, 25),
  delta: 1 / 177,
  ballDiameter: 38,
  ballRadius: 38 / 2,
  stickOrigin: new Vector2(970, 11),
  stickShotOrigin: new Vector2(950, 11),
  maxPower: 7500
};