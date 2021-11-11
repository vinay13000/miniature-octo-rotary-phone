song=""
scoreleftwrist=0;
scorerightwrist=0;
rightwristX=0;
rightwristY=0;
leftwristX=0;
leftwristY=0;



function preload(){
    song=loadSound("somerondome song.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses)


}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist>0.2){
    circle(rightwristX,rightwristY,20);

    if(rightwristY>0&&rightwristY<=100){
        document.getElementById("speed").innerHTML="speed=0.50x";
        song.rate(0.50)
    }
   else if(rightwristY>100&&rightwristY<=200){
       document.getElementById("speed").innerHTML="speed=1x";
       song.rate(1);
   }

   else if(rightwristY>200&&rightwristY<=300){
       document.getElementById("speed").innerHTML="speed=1.5x";
       song.rate(1.5);
   }

   else if(rightwristY>300&&rightwristY<=400){
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}

   else if(rightwristY>400&&rightwristY<=500){
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}   }

    if(scoreleftwrist>0.2){
       
        circle(leftwristX,leftwristY,20);
    InNumberleftwristY=Number(leftwristY);
    remove_decimals=floor(InNumberleftwristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);

    }



    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}

function modelLoaded(){
    console.log("posenet is strated the job");
    

}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("leftwrist="+leftwristY+leftwristX+"rightwrist="+rightwristY+rightwristX);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist="+scoreleftwrist);
     scoreleftwrist=results[0].pose.keypoints[10].score;
     console.log("scorerightwrist="+scorerightwrist);
  
    }

    
    
}


