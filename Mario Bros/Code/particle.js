// Broken block
Mario.Particle = function () {
  this.World = world;
  this.X = x;
  this.Y = y;
  this.Xa = xa;
  this.Ya = ya;
  this.XPic = (Math.random() * 2) | 0;
  this.YPic = 0;
  this.XPic0 = 4;
  this.YPic0 = 4;

  this.PicWidth = 8;
  this.PicHeight = 8;
  this.Life = 10;

  this.Image = Engine.Resources.Images["particles"];
};

Mario.Particle.prototype = new Mario.NotchSprite();

Mario.Particle.prototype.Move = function () {
  if (this.Life - this.Delta < 0) {
    this.World.RemoveSprite(this);
  }
  this.Life -= this.Delta;

  this.X += this.Xa;
  this.Y += this.Ya;
  this.Ya *= 0.95;
  this.Ya += 3;
};
