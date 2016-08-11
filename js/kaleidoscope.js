const Kaleidoscope = function (canvasId, imagePath, points, rotateTime) {
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
    this.setImage(imagePath, () => {
        // Request the first animation frame.
        window.requestAnimationFrame(this.drawFrame.bind(this));
    });
};

Kaleidoscope.prototype.setImage = function (imagePath, callback) {
    // Load the image.
    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
        // Resize the canvas to reset it, then scale to fit the image, and draw the image.
        this.imageCanvas.width = this.size;
        this.imageCanvas.height = this.size;
        this.imageCtx.scale(this.size / image.width, this.size / image.height);
        this.imageCtx.drawImage(image, 0, 0);

        // Execute callback if necessary.
        if (typeof callback === 'function') {
            callback();
        }
    };
};

Kaleidoscope.prototype.setPoints = function (points) {
    // Set up slice canvas.
    this.sliceCanvas = document.createElement('canvas');
    this.sliceCanvas.width = this.size;
    this.sliceCanvas.height = this.size;
    this.sliceCtx = this.sliceCanvas.getContext('2d');
    this.sliceCtx.translate(this.radius, this.radius);

    // Set slice variables.
    this.points = points;
    this.arcLength = Math.PI / this.points;
    const startAngle = 1.5 * Math.PI;
    const margin = .25 * Math.PI / 180;

    // Create slice clipping mask.
    this.sliceCtx.beginPath();
    this.sliceCtx.moveTo(0, 0);
    this.sliceCtx.arc(0, 0, this.radius, startAngle - this.arcLength / 2 - margin,
        startAngle + this.arcLength / 2 + margin, false);
    this.sliceCtx.lineTo(0, 0);
    this.sliceCtx.clip();
};

Kaleidoscope.prototype.drawFrame = function (ts) {
    // Get the current image rotation.
    const delta = ts - this.lastTs;
    this.lastTs = ts;
    this.rotatePercent += delta / this.rotateTime;

    // Rotate the image and draw it onto the slice canvas.
    this.sliceCtx.rotate(this.rotatePercent * 2 * Math.PI);
    this.sliceCtx.drawImage(this.imageCanvas, -this.radius, -this.radius);
    this.sliceCtx.rotate(-this.rotatePercent * 2 * Math.PI);

    // Draw non-mirrored slices.
    for (let i = 0; i < this.points; i++) {
        this.ctx.drawImage(this.sliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(this.arcLength * 2);
    }

    // Draw mirrored slices.
    this.ctx.scale(-1, 1);
    this.ctx.rotate(this.arcLength);
    for (let i = 0; i < this.points; i++) {
        this.ctx.drawImage(this.sliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(this.arcLength * 2);
    }
    this.ctx.scale(-1, 1);
    this.ctx.rotate(this.arcLength);

    // Draw a border around the kaleidoscope to cover pixel artifacts.
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    // Request the next frame.
    window.requestAnimationFrame(this.drawFrame.bind(this));
};
