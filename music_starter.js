
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
// Draw 5 balls using a loop 
  const count = 5;
  const spacing = width / 10; // horizontal spacing between balls
  noStroke();

  for (let i = 0; i < count; i++) {
    // Center them around the middle of the canvas
    const offsetIndex = i - (count - 1) / 2;      // -2, -1, 0, 1, 2
    const x = width / 2 + offsetIndex * spacing;

    // Slight size variation so the center is largest
    const sizeFactor = 1 - Math.abs(offsetIndex) * 0.1; // 1, 0.9, 0.8...
    const thisSize = ballSize * sizeFactor;

    // Subtle fade by index
    const alpha = 230 - Math.abs(offsetIndex) * 40; // 230, 190, 150...
    fill(180, 100, 240, alpha);

    ellipse(x, ballY, thisSize);
  }
 // Draw the ball
  fill(180, 100, 240);
  noStroke();
  ellipse(width/2, ballY, ballSize);
    // (Optional) draw your words, bars, etc.
    // fill(255);
    // textAlign(CENTER);
    // textSize(vocal);
    // text(words, width / 2, height / 3);
}

 
  
  

  


