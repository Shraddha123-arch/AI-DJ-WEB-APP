song = "";
rightWristx = 0
rightWristy = 0
leftWristx = 0
leftWristy = 0
scoreleftWrist = 0
scorerightWrist= 0

function preload() {
    song = loadSound("music.mp3");
}



function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('The Music Has Started!')
}

function gotPoses(results) {
    if (results.length > 0); {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score
        scorerightWrist = results[0].pose.keypoints[10].score
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        
    }

}


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)

}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")
    if (scoreleftWrist > 0.1) {






        circle(leftWristx, leftWristy, 50);
        InNumberleftWristy = Number(leftWristy);
        remove_decimals = floor(InNumberleftWristy);
        leftWristy_divide_500 = remove_decimals / 500;
        volume = leftWristy_divide_500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if (scorerightWrist > 0.1) {
        circle(rightWristx, rightWristy, 50);
        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("Speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5)
        } else if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("Speed").innerHTML = "Speed = 1x";
            song.rate(1)
        } else if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("Speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5)
        } else if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("Speed").innerHTML = "Speed = 2x";
            song.rate(2)
        } else if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("Speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5)
        }
    }}

        function stop() {
            song.stop();
        }