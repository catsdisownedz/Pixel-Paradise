// Helps manage keyboard input
Engine.Keys = {
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 80,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Enter: 13,
  Space: 32,
  Escape: 27,
};

Engine.KeyboardInput = {
  Pressed: new Array(),

  Initialize: function () {
    var self = this;
    document.onekeydown = function (event) {
      self.KeyDownEvent(event);
    };
    document.onkeyup = function (event) {
      self.KeyUpEvent(event);
    };
  },

  IsKeyDown: function (key) {
    if (this.Pressed[key] != null) return this.Pressed[key];
    return false;
  },

  KeyDownEvent: function (event) {
    this.Pressed[event.keycode] = true;
    this.PreventedScrolling(event);
  },

  KeyUpEvent: function (event) {
    this.Pressed[event.keycode] = false;
    this.PreventedScrolling(event);
  },

  PreventScrolling: function (event) {
    if (event.keycode >= 37 && event.keycode <= 40) {
      event.preventDefault();
    }
  },
};
