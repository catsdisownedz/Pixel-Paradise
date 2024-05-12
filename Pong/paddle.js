var Paddle = {
  new: function (side) {
    var relativeWidth = this.canvas.width * 0.01; // 1% of canvas width
    var relativeHeight = this.canvas.height * 0.2; // 7% of canvas height
    var relativeSpeed = this.canvas.height * 0.009; // 0.9% of canvas height
    var relativeX =
      side === "left" ? this.canvas.width * 0.1 : this.canvas.width * 0.9; // 10% from left or 90% from left
    var relativeY = this.canvas.height / 2 - relativeHeight / 2; // vertically centered

    return {
      width: relativeWidth,
      height: relativeHeight,
      x: relativeX,
      y: relativeY,
      score: 0,
      move: DIRECTION.IDLE,
      speed: relativeSpeed,
    };
  },
};
