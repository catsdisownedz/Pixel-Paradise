let board;
let boardWidth=500;
let boardHeight=500;
let context;

let playerwidth=80; //80,500
let playerHeight=10;
let playerVelocityX=12;

let player={
    x: boardWidth/2 -playerwidth/2,
    y: boardHeight- playerHeight-5,
    width: playerwidth,
    height: playerHeight,
    velocityX: playerVelocityX
}

let ballWidth=10;
let ballHeight=10;
let ballVelocityX=3; //3,15
let ballVelocityY=2;//2,10

let ball={
    x: boardWidth/2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY:ballVelocityY
}

let blockArray=[];
let blockWidth=50;
let blockHeight=10;
let blockColumns=8;
let blockRows=3; // add more as games gets harder and prettirer
let blockMaxRows=10; // limit so we dont touch the padel
let blockCount=0; // to know jow many blocks are there

// startign block corners top left
let blockX=15;
let blockY=45;

let score=0;
let gameOver=false;

var loseAudio= new Audio('mixkit-losing-bleeps-2026.wav');
var hitAudio= new Audio('sound-effect-twinklesparkle-115095.mp3');

window.onload= function(){
    board= document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context= board.getContext("2d");
     //to draw on the board ayoy

     // draw intial player i dont understand a thing
     context.fillStyle="#FF681F";
     context.fillRect(player.x, player.y,player.width,player.height); 

     requestAnimationFrame(update);
     document.addEventListener("keydown",movePlayer);

     createBlocks();
}

function update(){   //game loop
    requestAnimationFrame(update);
    if(gameOver) return;
    
    context.clearRect(0,0,board.width,board.height);

    //player stuff waw
    context.fillStyle="#FF681F";
    context.fillRect(player.x, player.y,player.width,player.height); 

    context.fillStyle="#FFFF00";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // to make the ball bouncey bounce
    if(ball.y<=0){// top of canvas
        ball.velocityY *= -1;
        
    }
    else if(ball.x<=0 || (ball.x + ball.width>=boardWidth)){ //touches the left or right border
        ball.velocityX *= -1;
    }

    else if(ball.y+ ball.height>= boardHeight){ // if ball touches bottom of the canvas
        // GAME OVER AAAAAAAAAAAAAA
        
        context.font="20px sans-serif";
        context.fillText("YOU LOSE: PRESS SPACE TO RESTART",80,400);
        loseAudio.play();
        gameOver=true;
    }

    // to bouncey bounce the ball
    if(topCollision(ball,player) || bottomCollision(ball,player) ){
        ball.velocityY*=-1; //flip Y up or down
    }
    else if(leftCollision(ball,player) || rightCollision(ball,player)){
        ball.velocityX*=-1;
    }

    // tp draw the blocks
    context.fillStyle="#e401a0";
    for (i =0; i<blockArray.length; i++){
        let block= blockArray[i];
        if(!block.break){
            if(topCollision(ball,block) || bottomCollision(ball,block)){
                hitAudio.play();
                block.break=true;
                ball.velocityY*=-1;
                blockCount--;
                score+=100;
            }
            else if(leftCollision(ball,block) || rightCollision(ball,block) ){
                hitAudio.play();
                block.break=true;
                ball.velocityX*=-1; 
                blockCount--;
                score+=100;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }
    
    // next level waw
    if(blockCount==0){
        score+=100*blockRows*blockColumns; // BONUS YAY
        blockRows=Math.min(blockRows+1, blockMaxRows);
        createBlocks();
    }

    context.font="20px sans-serif"
    context.fillText(score,10,25);
}

function outOfBounds(xPosition){
    return (xPosition<0 || xPosition+playerwidth>boardWidth);
}

function movePlayer(e){
    if(gameOver){
        if(e.code=="Space") resetGame();
       
    }

    if(e.code=="ArrowLeft"){
        // player.x-= player.velocityX;
        let nextPLayerX=player.x-player.velocityX;
        if(!outOfBounds(nextPLayerX)){
            player.x=nextPLayerX;
        }
    }

    else if(e.code== "ArrowRight"){
        //player.x+=player.velocityX;
        let nextPLayerX=player.x+player.velocityX;
        if(!outOfBounds(nextPLayerX)){
            player.x=nextPLayerX;
        }
    }
}

function detectCollision(a,b){
    return a.x< b.x + b.width && //a's top left corner doesnt reach b,s top right coerner
            a.x + a.width> b.x&& //a's top right corner passes b's top left corner
            a.y<b.y +b.height && //a's top left corner doesnt reach b's bottom left corner
            a.y +a.height >b.y;  //a's bottom left corner passes b's top left corner
}

function topCollision(ball ,block){ //a si above b(ball us above the block)
    return detectCollision(ball,block) &&(ball.y+ ball.height) >= block.y;
}

function bottomCollision(ball, block){ //a is below b(ball is bellow block)
    return detectCollision(ball, block) &&(block.y+block.height)>= ball.y;
}

function leftCollision(ball,block){ // a is left of b (ball if left of block)
    return detectCollision(ball,block) && (ball.x+ball.width)>=block.x;
}

function rightCollision(ball,block){ //a is right of b(ball is right of block)
    return detectCollision(ball,block)&& (block.x +block.width)>=ball.x;
}

function createBlocks(){
    blockArray=[]; // to clear the block array
    for(let c=0; c<blockColumns; c++){
        for(let r=0; r<blockRows; r++){
           let block ={
                x:blockX+c*blockWidth +c*10,// to space 10 px
                y: blockY+ r*blockHeight +r*10,
                width: blockWidth,
                height : blockHeight,
                break: false
           } 
           blockArray.push(block);
        }
    }
    blockCount=blockArray.length;
}

function resetGame(){
    gameOver=false;
    

    player={
        x: boardWidth/2 -playerwidth/2,
        y: boardHeight- playerHeight-5,
        width: playerwidth,
        height: playerHeight,
        velocityX: playerVelocityX
    
    }
    ball={
        x: boardWidth/2,
        y: boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: ballVelocityX,
        velocityY:ballVelocityY
    }

    blockArray=[];
    blockRows=3;
    score=0;
    createBlocks();
}
