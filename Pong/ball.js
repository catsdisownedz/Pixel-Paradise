var Ball = {
  new: function (incrementedSpeed) {
    var relativeWidth = this.canvas.width * 0.015; // 1% of canvas width
    var relativeHeight = this.canvas.height * 0.015; // 1% of canvas height
    var relativeSpeed = incrementedSpeed || this.canvas.width * 0.0025; // 0.25% of canvas width

    return {
      width: relativeWidth,
      height: relativeHeight,
      x: this.canvas.width / 2 - relativeWidth / 2, // center horizontally
      y: this.canvas.height / 2 - relativeHeight / 2, // center vertically
      moveX: DIRECTION.IDLE,
      moveY: DIRECTION.IDLE,
      speed: relativeSpeed,
    };
  },
};
