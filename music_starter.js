
// vocal, drum, bass, and other are volumes ranging from 0 to 100

let ballVY = 5;
let ballSize;
let myHeight = 800;
let ballY = myHeight / 2;
let ballDown = true;
function setup() {
//   createCanvas(800, myHeight);
//   ballY = myHeight / 2;
//   ballVY = 5;
  
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
//   console.log(ballY);
  background(20);
  textFont('Verdana');66
  rectMode(CENTER);

  // Map drum volume to bounce speed 
   let speed = map(drum, 0, 100, 2, 15);
   ballSize = map(vocal, 0, 100, 2, 250);
  // Bounce off top and bottom 
  if (ballY > myHeight - ballSize/2) {
         ballDown = false
   }
  if (ballY < ballSize/2) {
      ballDown = true;
  }

    //sets direction of movement
   if(ballDown){
      ballY = ballY + speed;
   }
   else if(ballDown == false){
      ballY = ballY - speed;
   }
// console.log(vocal);

 // Draw the ball
  fill(180, 100, 240);
  noStroke();
  ellipse(width/2, ballY, ballSize);
  
  

  

}
