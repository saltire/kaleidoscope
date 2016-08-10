const Kaleidoscope = function (canvasId, imagePath, points, rotateTime) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.ctx.translate(this.centerX, this.centerY);
    this.size = Math.min(this.canvas.width, this.canvas.height);
    this.radius = this.size / 2;

    this.setPoints(points);
    this.rotateTime = rotateTime;

    this.imageCanvas = document.createElement('canvas');
    this.imageCtx = this.imageCanvas.getContext('2d');
    this.lastTs = 0;
    this.rotatePercent = 0;

    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
        this.imageCanvas.width = image.width;
        this.imageCanvas.height = image.height;
        this.imageCtx.drawImage(image, 0, 0);

        window.requestAnimationFrame(this.drawFrame.bind(this));
    };
};

Kaleidoscope.prototype.setPoints = function (points) {
    this.points = points;

    const startAngle = 1.5 * Math.PI;
    this.arcLength = Math.PI / this.points;
    const margin = .25 * Math.PI / 180;

    this.sliceCanvas = document.createElement('canvas');
    this.sliceCanvas.width = this.size;
    this.sliceCanvas.height = this.size;
    this.sliceCtx = this.sliceCanvas.getContext('2d');
    this.sliceCtx.translate(this.radius, this.radius);
    this.sliceCtx.beginPath();
    this.sliceCtx.moveTo(0, 0);
    this.sliceCtx.arc(0, 0, this.radius, startAngle - this.arcLength / 2 - margin,
        startAngle + this.arcLength / 2 + margin, false);
    this.sliceCtx.lineTo(0, 0);
    this.sliceCtx.clip();
};

Kaleidoscope.prototype.drawFrame = function (ts) {
    const delta = ts - this.lastTs;
    this.lastTs = ts;
    this.rotatePercent += delta / this.rotateTime;

    this.sliceCtx.rotate(this.rotatePercent * 2 * Math.PI);
    this.sliceCtx.drawImage(this.imageCanvas, -this.radius, -this.radius);
    this.sliceCtx.rotate(-this.rotatePercent * 2 * Math.PI);

    for (let i = 0; i < this.points; i++) {
        this.ctx.drawImage(this.sliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(this.arcLength * 2);
    }
    this.ctx.scale(-1, 1);
    this.ctx.rotate(this.arcLength);
    for (let i = 0; i < this.points; i++) {
        this.ctx.drawImage(this.sliceCanvas, -this.radius, -this.radius);
        this.ctx.rotate(this.arcLength * 2);
    }
    this.ctx.scale(-1, 1);
    this.ctx.rotate(this.arcLength);

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 2;
    this.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();

    window.requestAnimationFrame(this.drawFrame.bind(this));
};
