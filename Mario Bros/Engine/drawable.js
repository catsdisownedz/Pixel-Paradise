// Base class for all drawable objects, makes ordering them automatic
Engine.Drawable = function () {
  this.ZOrder = 0;
};

Engine.Drawable.prototype = {
  Draw: function (context) {},
};
