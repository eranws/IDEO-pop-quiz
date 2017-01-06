/**
 * Created by jasrub on 1/5/17.
 */

var values = {
    paths: 30,
    minPoints: 20,
    maxPoints: 40,
    minRadius: 80,
    maxRadius: 200
};

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
};

var creatures = []
function randomBlob(center){
    var radiusDelta = values.maxRadius - values.minRadius;
    var pointsDelta = values.maxPoints - values.minPoints;
    var radius = values.minRadius + Math.random() * radiusDelta;
    var points = values.minPoints + Math.floor(Math.random() * pointsDelta);
    creatures.push(createBlob(center, radius, points));
}

function createBlob(center, maxRadius, points) {
    var path = new Path();
    path.closed = true;
    for (var i = 0; i < points; i++) {
        var delta = new Point({
            length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
            angle: (360 / points) * i
        });
        path.add(center + delta);
    }
    path.smooth();

    var lightness = 0.8; //(Math.random() - 0.5) * 0.4 + 0.4;
    var hue = Math.random() * 360;
    path.fillColor = { hue: hue, saturation: 0.6, lightness: lightness };
    path.strokeColor = 'black';

    var group = new Group();
    group.addChild(path);
    group.addChildren(createEyes(center, maxRadius));

    var mouth = new Path();
    mouth.strokeColor = 'black';

    var length = 30;//0.5 * (minRadius + maxRadius);

    var r1 = Math.random() * 10;
    var r2 = Math.random() * 10;

    
    //path.closed = true;
    mouth.add(center + new Point({ length: length + r1, angle: 45 }));
    mouth.add(center + new Point({ length: length, angle: 90 }));
    mouth.add(center + new Point({ length: length + r2, angle: 135 }));
    mouth.smooth();

    group.addChild(mouth);


    // When the mouse is double clicked on the item, remove it:
    group.onDoubleClick = function(event) {
        console.log(this);
        this.removeChildren();
        this.remove();
    }
    group.onMouseDrag = function(event) {
        this.position += event.delta;
    }
}

function createEyes(center, maxRadius){
    var eyeMinSize = 3;
    var eyeMaxSize = 15

    var eyeCount = 3;
    var eyes = [];
    for (var i=0; i<eyeCount; i++) {
        var eyeOffset = new Point(
        (Math.random() - 0.5) * maxRadius,
        (Math.random() - 0.5) * 30
        );

        var eye = new Path.Circle({
            radius: getRandomArbitrary(eyeMinSize, eyeMaxSize),
            center: center + eyeOffset,
            strokeColor: 'black'
        });
        eyes.push(eye);
    }

    return eyes;


}


function onMouseDown(event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    if (!hitResult) {
        randomBlob(event.point);
        return;
    }
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}