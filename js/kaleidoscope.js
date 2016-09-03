const Kaleidoscope = function (canvasId, imagePath, fullscreen, points, rotateTime) {
    // Set up main canvas.
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');

    // Set up image canvas.
    this.imageCanvas = document.createElement('canvas');
    this.imageCtx = this.imageCanvas.getContext('2d');

    // Initialize variables.
    this.imagePath = imagePath;
    this.fullscreen = fullscreen;
    this.points = points;
    this.rotateTime = rotateTime;
    this.lastTs = 0;
    this.rotatePercent = 0;
    this.animStarted = false;

    // Set up variables according to canvas size.
    this.setupCanvas();
};

Kaleidoscope.prototype.setupCanvas = function (fullscreen) {
    if (fullscreen !== undefined) {
        this.fullscreen = fullscreen;
    }

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx.setTransform(1, 0, 0, 1, this.centerX, this.centerY);

    this.size = this.fullscreen ?
        Math.sqrt(Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)) :
        Math.min(this.canvas.width, this.canvas.height);
    this.radius = this.size / 2;

    // Clear canvas.
    this.ctx.clearRect(-this.centerX, -this.centerY, this.canvas.width, this.canvas.height);

    // Set up slice canvas.
    this.setPoints(this.points);

    // Draw image on image canvas.
    this.setImage(this.imagePath, () => {
        if (!this.animStarted) {
            this.animStarted = true;
            // Request the first animation frame.
            window.requestAnimationFrame(this.drawFrame.bind(this));
        }
    });
};

Kaleidoscope.prototype.setImage = function (imagePath, callback) {
    this.imagePath = imagePath;

    // Load the image.
    const image = new Image();
    image.src = this.imagePath;
    image.onload = () => {
        // Resize the canvas to reset it, then scale to fit the image, and draw the image.
        this.imageCanvas.width = this.size;
        this.imageCanvas.height = this.size;
        this.imageCtx.setTransform(this.size / image.width, 0, 0, this.size / image.height, 0, 0);
        this.imageCtx.drawImage(image, 0, 0);

        // Execute callback if necessary.
        if (typeof callback === 'function') {
            callback();
        }
    };
};

Kaleidoscope.prototype.setPoints = function (points) {
    this.points = points;

    // Set slice variables.
    this.arcLength = Math.PI / Math.max(1, this.points);
    const startAngle = 1.5 * Math.PI;
    const margin = this.arcLength / 2;

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
    this.sliceCtx.arc(0, 0, this.radius, startAngle - margin, startAngle + this.arcLength + margin,
        false);
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
    const delta = ts - this.lastTs;
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
    for (let i = 0; i < Math.max(1, this.points); i++) {
        this.ctx.drawImage(this.sliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(this.arcLength * 2);
    }

    // Draw mirrored slices.
    for (let i = 0; i < this.points; i++) {
        this.ctx.drawImage(this.mirrorSliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(-this.arcLength * 2);
    }

    // Draw a border around the kaleidoscope to cover pixel artifacts.
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    // Request the next frame.
    window.requestAnimationFrame(this.drawFrame.bind(this));
};
