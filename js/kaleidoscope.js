const points = 5;
const rotateTime = 3000;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
ctx.translate(centerX, centerY);

const radius = Math.min(centerX, centerY);
const startAngle = 1.5 * Math.PI;
const arcLength = Math.PI / points;
const margin = .25 * Math.PI / 180;

const sliceCanvas = document.createElement('canvas');
sliceCanvas.width = canvas.width;
sliceCanvas.height = canvas.height;
const sliceCtx = sliceCanvas.getContext('2d');
sliceCtx.translate(centerX, centerY);
sliceCtx.beginPath();
sliceCtx.moveTo(0, 0);
sliceCtx.arc(0, 0, radius, startAngle - arcLength / 2 - margin, startAngle + arcLength / 2 + margin, false);
sliceCtx.lineTo(0, 0);
sliceCtx.clip();

const imageCanvas = document.createElement('canvas');

let lastTs = 0;
function drawFrame(ts) {
    const delta = ts - lastTs;
    lastTs = ts;

    const rotatePercent = delta / rotateTime;
    sliceCtx.rotate(rotatePercent * 2 * Math.PI);
    sliceCtx.drawImage(imageCanvas, -centerX, -centerY);

    for (let i = 0; i < points; i++) {
        ctx.drawImage(sliceCanvas, -centerX, -centerY);
        ctx.rotate(arcLength * 2);
    }
    ctx.scale(-1, 1);
    ctx.rotate(arcLength);
    for (let i = 0; i < points; i++) {
        ctx.drawImage(sliceCanvas, -centerX, -centerY);
        ctx.rotate(arcLength * 2);
    }
    ctx.scale(-1, 1);
    ctx.rotate(arcLength);

    window.requestAnimationFrame(drawFrame);
}

const image = new Image();
image.src = './rainbow.png';
image.onload = function () {
    imageCanvas.width = image.width;
    imageCanvas.height = image.height;
    const imageCtx = imageCanvas.getContext('2d');
    imageCtx.drawImage(image, 0, 0);

    window.requestAnimationFrame(drawFrame);
};
