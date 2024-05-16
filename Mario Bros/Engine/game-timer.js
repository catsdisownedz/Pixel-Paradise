// Represents game timer
Engine.GameTimer = function () {
  this.FPS = 1000 / 30;
  this.lastTime = 0;
  this.intervalFunc = null;
  this.updatedObject = null;
};

Engine.GameTimer.prototype = {
  Start: function () {
    this.lastTime = new Date().getTime();
    var self = this;
    this.intervalFunc = setInterval(function () {
      self.Tick();
    }, this.FPS);
  },

  Tick: function () {
    if (this.updatedObject != null) {
      var newTime = new Date().getTime();
      var delta = (newTime - this.lastTime) / 1000;
      this.lastTime = newTime;

      this.updatedObject.Update(delta);
    }
  },

  Stop: function () {
    clearInterval(this.intervalFunc);
  },
};
