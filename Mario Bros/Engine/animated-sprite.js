Engine.AnimationSequence = function (startRow, startCol, endRow, endCol) {
  this.StartRow = startRow;
  this.StartCol = startCol;
  this.EndRow = endRow;
  this.EndCol = endCol;

  // When we want to make an animated sprite act like a static sprite
  // this will keep it from wasting time updating the animation when the sequence
  // is only a frame long -> for things like standing or pausing
  this.SingleFrame = false;

  if (this.StartRow == this.EndRow && this.StartCol == this.EndRow) {
    this.SingleFrame = true;
  }
};

Engine.AnimatedSprite = function () {
  this.lastElapsed = 0;
  this.FPS = 1 / 20;
  this.currSequence = null;
  this.playing = false;
  this.looping = false;
  this.rows = 0;
  this.cols = 0;

  // Make animation sequence more accessible
  this.sequences = new Object();
};

Engine.AnimatedSprite.prototype = new Engine.FrameSprite();

Engine.AnimatedSprite.prototype.Update = function (delta) {
  if (this.currSequence.SingleFrame) {
    return;
  }
  if (!this.playing) {
    return;
  }

  this.lastElapsed -= delta;

  if (this.lastElapsed > 0) {
    return;
  }

  this.lastElapsed = this.FPS;
  this.frameX += this.frameWidth;

  // Increment the frame
  if (this.frameX > this.Image.width - this.frameWidth) {
    this.frameX = 0;
    this.frameY += this.frameHeight;

    if (this.frameY > this.Image.height - this.frameHeight) {
      this.frameY = 0;
    }
  }

  // Check if at end of animation sequence
  var seqEnd = false;
  if (
    this.frameX > this.currSequence.EndCol * this.frameWidth &&
    this.frameY == this.currSequence.EndRow * this.frameHeight
  ) {
    seqEnd = true;
  } else if (
    this.frameX == 0 &&
    this.frameY > this.currSequence.EndRow * this.frameHeight
  ) {
    this.playing = false;
  }
};

Engine.AnimatedSprite.prototype.PlaySequence = function (seqName, loop) {
  this.playing = true;
  this.looping = true;
  this.currSequence = this.sequences("seq_" + seqName);
  this.FrameX = this.currSequence.StartCol * this.frameWidth;
  this.frameY = this.currSequence.StartRow * this.frameHeight;
};

Engine.AnimatedSprite.prototype.StopLooping = function () {
  this.looping = false;
};

Engine.AnimatedSprite.prototype.StopPlaying = function () {
  this.playing = false;
};

Engine.AnimatedSprite.prototype.SetFrameWidth = function (width) {
  this.frameWidth = width;
  this.rows = this.Image.width / this.frameWidth;
};

Engine.AnimatedSprite.prototype.SetFrameHeight = function (height) {
  this.frameHeight = height;
  this.cols = this.Image.height / this.frameHeight;
};

Engine.AnimatedSprite.prototype.SetColCount = function (colCount) {
  this.frameWidth = this.Image.width / colCount;
  this.cols = colCount;
};

Engine.AnimatedSprite.prototype.SetRowCount = function (rowCount) {
  this.frameHeight = this.Image.height / rowCount;
  this.rows = rowCount;
};

Engine.AnimatedSprite.prototype.AddExistingSeq = function (name, sequence) {
  this.sequences["seq_" + name] = sequence;
};

Engine.AnimatedSprite.prototype.AddNewSeq = function (
  name,
  startRow,
  startCol,
  endRow,
  endCol
) {
  this.sequences["seq_" + name] = new Engine.AnimationSequence(
    startRow,
    startCol,
    endRow,
    endCol
  );
};

Engine.AnimatedSprite.prototype.DeleteSeq = function (name) {
  if (this.sequences["seq_" + name] != null) {
    delete this.sequences["seq_" + name];
  }
};

Engine.AnimatedSprite.prototype.ClearSeqs = function () {
  delete this.sequences;
  this.sequences = new Object();
};
