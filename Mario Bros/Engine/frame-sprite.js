// For sprites that are only a portion of the image
Engine.FrameSprite = function () {
  this.frameX = 0;
  this.frameY = 0;
  this.frameWidth = 0;
  this.frameHeight = 0;
};

Engine.FrameSprite.prototype = new Engine.Sprite();

Engine.FrameSprite.prototype.Draw = function (context, camera) {
  context.drawImage(
    this.Image,
    this.frameX,
    this.frameY,
    this.frameWidth,
    this.frameHeight,
    this.X - camera.X,
    this.Y - camera.Y,
    this.FrameWidth,
    this.FrameHeight
  );
};
