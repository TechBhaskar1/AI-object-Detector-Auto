img = "";
state = "";
objects = [];


function preload(){
    img=loadImage("TV.png");
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded() {
    console.log("Model Loaded");
    state = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(img, 0, 0, 640, 420);
    if (state != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("length").innerHTML = "Total Objects :"+objects.length;
            document.getElementById("status").innerHTML = "Status : Detecting Objects";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
