var sliceCount = 6;
var rotateTime = 3000;

paper.setup(document.getElementById('canvas'));

var image = new paper.Raster('./rainbow.png', paper.view.center);

image.onLoad = function () {
    var circle = new paper.Path.Circle(paper.view.center, 300);
    var mask = new paper.Path.Arc(
        circle.getPointAt(circle.length - (circle.length / sliceCount / 2)),
        circle.getPointAt(0),
        circle.getPointAt(circle.length / sliceCount / 2));
    mask.firstSegment.handleIn = new paper.Point(0, 0);
    mask.lastSegment.handleOut = new paper.Point(0, 0);
    mask.insert(0, paper.view.center);
    mask.add(paper.view.center);
    mask.clipMask = true;

    var group = new paper.Group([image, mask]);

    var slices = [];
    for (var i = 0; i < sliceCount; i++) {
        var slice = group.clone();
        if (i % 2) {
            slice.scale(1, -1);
        }
        slice.rotate(360 / sliceCount * i, paper.view.center);
        slices.push(slice);
    }

    group.visible = false;

    paper.view.onFrame = function(event) {
        slices.forEach(function (slice, i) {
            var rotatePercent = event.delta * 1000 / rotateTime;
            if (i % 2) {
                rotatePercent *= -1;
            }
            slice.firstChild.rotate(rotatePercent * 360, paper.view.center);
        });
    }
};



