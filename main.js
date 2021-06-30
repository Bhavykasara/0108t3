Webcam.set({ 
    width:350, 
    height:300, 
    img_format:"png", 
    png_quality:90 
}); 
Webcam.attach("#camera");
function selfie() {
    Webcam.snap( 
        function(data_url){ 
            document.getElementById("result").innerHTML='<img id="final" src="'+data_url+'">'; 
        } 
    ); 
} 
vedio=document.getElementById("camera"); 
navigator.mediaDevices.getUserMedia({video:true}) 
.then(stream=> { 
    vedio.srcObject=stream; 
}).catch(function(err){ 
    console.log("Something went wrong"); 
    console.log(err); 
}); 

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nSO7L0wkn/model.json',modalLoaded);

function modalLoaded() {
    console.log("modalLoaded");
}

function check() {
    image=document.getElementById('final');
    classifier.classify(image, gotResult);
}

p1="";
p2="";

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        synth=window.speechSynthesis;
        document.getElementById("a1").innerHTML=results[0].label;
        if (results[0].label=="Thumbs up") {
            document.getElementById("e1").innerHTML="&#128077;";   
            u=new SpeechSynthesisUtterance("It is Thumbs up");
            synth.speak(u);
        }
        if (results[0].label=="Thumbs down") {
            document.getElementById("e1").innerHTML="👎";
            u=new SpeechSynthesisUtterance("It is Thumbs down");
            synth.speak(u);
        }
        if (results[0].label=="Punch") {
            document.getElementById("e1").innerHTML="👊";
            u=new SpeechSynthesisUtterance("It is a Punch");
            synth.speak(u);
        }
    }
}
