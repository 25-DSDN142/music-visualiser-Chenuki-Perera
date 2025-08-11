let ballY;
let ballVY;
let ballSize;

function setup() {
  createCanvas(800, 600);
  ballY = height / 2;
  ballVY = 5;
  ballSize = 50;
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana');
  rectMode(CENTER);
  textSize(24);
  
  // ——— Existing audio bars ———
  let bar_spacing = height / 10;
  let bar_height  = width  / 12;
  let bar_pos_x   = width  / 2;

  fill(200, 0, 0);
  rect(bar_pos_x, height/2 + 1*bar_spacing, 4*vocal, bar_height);
  fill(0);
  text("vocals", bar_pos_x, height/2 + 1*bar_spacing + 8);

  fill(0, 200, 0);
  rect(bar_pos_x, height/2 + 2*bar_spacing, 4*drum, bar_height);
  fill(0);
  text("drums", bar_pos_x, height/2 + 2*bar_spacing + 8);

  fill(50, 50, 240);
  rect(bar_pos_x, height/2 + 3*bar_spacing, 4*bass, bar_height);
  fill(0);
  text("bass", bar_pos_x, height/2 + 3*bar_spacing + 8);

  fill(200, 200, 200);
  rect(bar_pos_x, height/2 + 4*bar_spacing, 4*other, bar_height);
  fill(0);
  text("other", bar_pos_x, height/2 + 4*bar_spacing + 8);


  // ——— Bouncing ball logic ———
  // 1. Map bass (0–100) to vertical speed (2–15)
  ballVY = map(bass, 0, 100, 2, 15);

  // 2. Update position
  ballY += ballVY;

  // 3. Bounce at edges
  if (ballY > height - ballSize/2 || ballY < ballSize/2) {
    ballVY *= -1;
  }

  // 4. Map drum (0–100) to a 0–1 t-value for color interpolation
  let tColor = map(drum, 0, 100, 0, 1);
  let colPurple = color(128, 0, 128);
  let colBlue   = color(173, 216, 230);
  let ballColor = lerpColor(colPurple, colBlue, tColor);

  // 5. Draw the ball
  fill(ballColor);
  noStroke();
  ellipse(width/2, ballY, ballSize);

  // ——— Display “words” with size mapped to vocals ———
  fill(255);
  textAlign(CENTER);
  textSize(vocal);
  text(words, width/2, height/3);
}