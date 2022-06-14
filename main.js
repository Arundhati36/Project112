Webcam.set({
    width : 350,
    height : 350,
    image_format :'png',
    img_quality : 90
})
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CTa0fB0UW/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error;
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "Best"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The gesture was" + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

