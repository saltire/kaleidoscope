'use strict';

var Kaleidoscope = function Kaleidoscope(canvasId, imagePath, points, rotateTime) {
    var _this = this;

    // Set up main canvas.
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx.translate(this.centerX, this.centerY);
    this.size = Math.min(this.canvas.width, this.canvas.height);
    this.radius = this.size / 2;

    // Set up slice canvas.
    this.setPoints(points);

    // Initialize rotation variables.
    this.rotateTime = rotateTime;
    this.lastTs = 0;
    this.rotatePercent = 0;

    // Set up image canvas and draw initial image.
    this.imageCanvas = document.createElement('canvas');
    this.imageCtx = this.imageCanvas.getContext('2d');
    this.setImage(imagePath, function () {
        // Request the first animation frame.
        window.requestAnimationFrame(_this.drawFrame.bind(_this));
    });
};

Kaleidoscope.prototype.setImage = function (imagePath, callback) {
    var _this2 = this;

    // Load the image.
    var image = new Image();
    image.src = imagePath;
    image.onload = function () {
        // Resize the canvas to reset it, then scale to fit the image, and draw the image.
        _this2.imageCanvas.width = _this2.size;
        _this2.imageCanvas.height = _this2.size;
        _this2.imageCtx.scale(_this2.size / image.width, _this2.size / image.height);
        _this2.imageCtx.drawImage(image, 0, 0);

        // Execute callback if necessary.
        if (typeof callback === 'function') {
            callback();
        }
    };
};

Kaleidoscope.prototype.setPoints = function (points) {
    // Set slice variables.
    this.points = points;
    this.arcLength = Math.PI / Math.max(1, this.points);
    var startAngle = 1.5 * Math.PI;
    var margin = this.arcLength / 2;

    // Set up a slice canvas.
    this.sliceCanvas = document.createElement('canvas');
    this.sliceCanvas.width = this.size;
    this.sliceCanvas.height = this.size;
    this.sliceCtx = this.sliceCanvas.getContext('2d');
    this.sliceCtx.translate(this.radius, this.radius);

    // Set up a mirrored slice canvas.
    this.mirrorSliceCanvas = document.createElement('canvas');
    this.mirrorSliceCanvas.width = this.size;
    this.mirrorSliceCanvas.height = this.size;
    this.mirrorSliceCtx = this.mirrorSliceCanvas.getContext('2d');
    this.mirrorSliceCtx.translate(this.radius, this.radius);
    this.mirrorSliceCtx.scale(-1, 1);

    // Create slice clipping mask. This one has a margin to avoid visible gaps between slices.
    this.sliceCtx.beginPath();
    this.sliceCtx.moveTo(0, 0);
    this.sliceCtx.arc(0, 0, this.radius, startAngle - margin, startAngle + this.arcLength + margin, false);
    this.sliceCtx.lineTo(0, 0);
    this.sliceCtx.clip();

    // Create mirrored slice clipping mask.
    this.mirrorSliceCtx.beginPath();
    this.mirrorSliceCtx.moveTo(0, 0);
    this.mirrorSliceCtx.arc(0, 0, this.radius, startAngle, startAngle + this.arcLength, false);
    this.mirrorSliceCtx.lineTo(0, 0);
    this.mirrorSliceCtx.clip();
};

Kaleidoscope.prototype.drawFrame = function (ts) {
    // Get the current image rotation.
    var delta = ts - this.lastTs;
    this.lastTs = ts;
    this.rotatePercent += delta / this.rotateTime;

    // Rotate the image and draw it onto the slice canvases.
    this.sliceCtx.rotate(this.rotatePercent * 2 * Math.PI);
    this.sliceCtx.drawImage(this.imageCanvas, -this.radius, -this.radius);
    this.sliceCtx.rotate(-this.rotatePercent * 2 * Math.PI);
    this.mirrorSliceCtx.rotate(this.rotatePercent * 2 * Math.PI);
    this.mirrorSliceCtx.drawImage(this.imageCanvas, -this.radius, -this.radius);
    this.mirrorSliceCtx.rotate(-this.rotatePercent * 2 * Math.PI);

    // Draw non-mirrored slices at least once.
    for (var i = 0; i < Math.max(1, this.points); i++) {
        this.ctx.drawImage(this.sliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(this.arcLength * 2);
    }

    // Draw mirrored slices.
    for (var _i = 0; _i < this.points; _i++) {
        this.ctx.drawImage(this.mirrorSliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(-this.arcLength * 2);
    }

    // Draw a border around the kaleidoscope to cover pixel artifacts.
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    // Request the next frame.
    window.requestAnimationFrame(this.drawFrame.bind(this));
};