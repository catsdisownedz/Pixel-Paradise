// board
let board;
let boardWidth=360;
let boardHeight=640;
let context;

//bird
let birdWidth= 34;
let birdHeight=24;
let birdX=boardWidth/8;
let birdY=boardHeight/2;
let birdImage;

let bird={
    x: birdX,
    y: birdY,
    width: birdWidth,
    height:birdHeight
}

//audio
let jumpSound=new Audio("./swoosh.wav");
let scoreSound = new Audio("./score.wav");
let collisionSound= new Audio("./collision.wav");
//pipes
let pipeArray=[];
let pipeWidth=64;
let pipeHeight=512;
let pipeX=boardWidth;
let pipeY=0;

// top pipe
let topPipeImage;
let bottomPipeImage;


//physics
let velocityX=-2; // pipes
let velocityY=0; // bird jump speed
let gravity=0.4;

let gameOver=false;
let score=0;


window.onload= function(){
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");

    //drawing the bird
    //context.fillStyle="green";
    //context.fillRect(bird.x,bird.y,bird.width,bird.height);

    // loading the images
    birdImage=new Image();
    birdImage.src="./flappybird.png";
    birdImage.onload=function(){
        context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height);
    }
    topPipeImage=new Image();
    topPipeImage.src="./toppipe.png";
    bottomPipeImage= new Image();
    bottomPipeImage.src="./bottompipe.png";

    requestAnimationFrame(update);
    
    setInterval(placePipes,1500);
    document.addEventListener("keydown",moveBird);

}
function update(){
    requestAnimationFrame(update);
    if(gameOver) return;
    context.clearRect(0,0,board.width,board.height);

    //drawing the bird over and over again
    velocityY+=gravity;
    bird.y=Math.max(bird.y+velocityY,0)
    context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height)

    if(bird.y>board.height) gameOver=true;

    // pipes
    for(let i=0;i<pipeArray.length;i++){
        let pipe=pipeArray[i];
        pipe.x+=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y, pipe.width, pipe.height);
        if(!pipe.passed && bird.x>pipe.x+pipe.width){
            score+= 0.5;
            playScoreSound();
            pipe.passed=true;
        }
        if(detectCollision(bird,pipe)){
            playCollisionSound();
            gameOver=true;
            sendScoreToServer(score);
        }
    }
    //emptying the pipe array
    while(pipeArray.length>0 && pipeArray[0].x< 0-pipeWidth){
        pipeArray.shift();
    }


    // score drawing
    context.fillStyle="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45);

    if(gameOver){
        context.fillText("Game over!", 5, 90);
        context.fillText("Press arrow right to view leaderboards", 10, 150);
    }

}


function placePipes(){
    if (gameOver) return;
    let randomPipeY=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2);
    let openingSpace=boardHeight/4;
    let topPipe={
        img : topPipeImage,
        x: pipeX,
        y:randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed:false
    }
    pipeArray.push(topPipe);
    
    let bottomPipe={
        img:bottomPipeImage,
        x: pipeX,
        y: randomPipeY + pipeHeight +openingSpace,
        width:pipeWidth,
        height: pipeHeight,
        passed:false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e){
    if(e.code=="Space" || e.code=="ArrowUp"){
        velocityY=-6;
        playJumpSound();

        if(gameOver){
            bird.y=birdY;
            pipeArray=[];
            score=0;
            gameOver=false;
        }
    }

    else if(e.code=="ArrowRight" && gameOver){
        goToLeaderBoards();
        window.location.href = '../leaderBoard.php';
        return;
    }
}
function detectCollision(a,b){
    return a.x<b.x +b.width &&
           a.x+a.width > b.x &&
           a.y<b.y+b.height &&
           a.y+a.height> b.y;
}
function playJumpSound(){
    jumpSound.play();
}
function playScoreSound(){
    scoreSound.play();
}
function playCollisionSound(){
    collisionSound.play();
}

function sendScoreToServer(score) {
    let state={
        "game":"FlappyBird",
        "score":score
    }
    fetch("../highscores.php",{
        "method":"POST",
        "headers":{
            "Content-Type":"application/json; charset=utf-8"
        },
        "body": JSON.stringify(state)
    }).then(function(response){
        return response.text();
    }).then(function(data){
        console.log(data);
    })    
}


function goToLeaderBoards(){
    let gameName={
        "game": "FlappyBird"
    }
    fetch("../leaderBoard.php",{
        "method":"POST",
        "headers":{
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": JSON.stringify(gameName)

    }).then(function(response){
        return response.text();

    })
}