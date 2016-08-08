var sliceCount = 6;
var rotateTime = 3000;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
ctx.translate(centerX, centerY);

var radius = Math.min(centerX, centerY);
var startAngle = 1.5 * Math.PI;
var arcLength = 2 * Math.PI / sliceCount;
var margin = .25 * Math.PI / 180;
var sliceCanvas = document.createElement('canvas');
sliceCanvas.width = canvas.width;
sliceCanvas.height = canvas.height;
sliceCtx = sliceCanvas.getContext('2d');
sliceCtx.translate(centerX, centerY);
sliceCtx.beginPath();
sliceCtx.moveTo(0, 0);
sliceCtx.arc(0, 0, radius, startAngle - arcLength / 2 - margin, startAngle + arcLength / 2 + margin, false);
sliceCtx.lineTo(0, 0);
sliceCtx.clip();

var imageCanvas = document.createElement('canvas');

var lastTs = 0;
function drawFrame(ts) {
    var delta = ts - lastTs;
    lastTs = ts;

    var rotatePercent = delta / rotateTime;
    sliceCtx.rotate(rotatePercent * 2 * Math.PI);
    sliceCtx.drawImage(imageCanvas, -centerX, -centerY);

    for (var i = 0; i < sliceCount; i += 2) {
        ctx.drawImage(sliceCanvas, -centerX, -centerY);
        ctx.rotate(arcLength * 2);
    }
    ctx.scale(-1, 1);
    ctx.rotate(arcLength);
    for (var i = 0; i < sliceCount; i += 2) {
        ctx.drawImage(sliceCanvas, -centerX, -centerY);
        ctx.rotate(arcLength * 2);
    }
    ctx.scale(-1, 1);
    ctx.rotate(arcLength);

    window.requestAnimationFrame(drawFrame);
}

var image = new Image();
image.src = './rainbow.png';
image.onload = function () {
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    var imageCtx = imageCanvas.getContext('2d');
    imageCtx.drawImage(image, 0, 0);

    window.requestAnimationFrame(drawFrame);
};
