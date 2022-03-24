video="";
status="";
objects=[];
function setup() {
    canvas=createCanvas(400,250);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,250);
    video.hide();
}
function draw() {
    image(video,0,0,400,250);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++) {
            fill("#FF0000");
 percent=floor(objects[i].confidence*100);
text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
noFill();
stroke("#FF0000");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(object[i].label==object_name) {
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("object_status").innerHTML=object_name+"found";
    synth=window.speechSynthesis;
    utterThis=new SpeechSynthesisUtterance(object_name+"found");
    synth.speak(utterThis);
}
else{
    document.getElementById("object_status").innerHTML=object_name+"not found";
}

        }

        
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function start() {
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    document.getElementById("object_name").value;
}
function modelLoaded() { 
    console.log("Model Loaded");
    status=true;
}