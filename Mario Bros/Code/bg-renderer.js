// Renders the background of the level
Mario.BackgroundRenderer = function (level, width, height, distance) {
  this.Level = level;
  this.Width = width;
  this.Height = height;
  this.Distance = distance;

  this.Background = Mario.SpriteCuts.GetBackgroundSheet();
};

Mario.BackgroundRenderer.prototype = new Engine.Drawable();

Mario.BackgroundRenderer.prototype.Draw = function (context, camera) {
  var xCam = camera.C / this.Distance;
  var x = (y = 0),
    b = (frame = null);

  // The OR truncates the decimal, quicker than Math.floor
  var xTileStart = (xCam / 32) | 0;
  // The +1 makes sure the right edge tiles get drawn
  var xTileEnd = ((xCam + this.Width) / 32) | 0;

  for (x = xTileStart; x <= xTileEnd; x++) {
    for (y = 0; y < this.TilesY; y++) {
      b = this.Level.GetBlock(x, y) & 0xff;
      frame = this.Background[b % 8][(b / 8) | 0];

      // Bit-shifting by 5 is the same as multiplying by 32
      context.drawImage(
        Engine.Resources.Images["background"],
        frame.X,
        frame.Y,
        frame.Width,
        frame.Height,
        ((x << 5) - xCam) | 0,
        (y << 5) | 0,
        frame.Width,
        frame.Height
      );
    }
  }
};
