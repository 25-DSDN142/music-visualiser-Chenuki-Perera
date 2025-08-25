
// vocal, drum, bass, and other are volumes ranging from 0 to 100
let ballVY = 5;
let ballSize;
let myHeight = 800;
let ballY = myHeight / 2;
let ballDown = true;

function setup() {
  createCanvas(800, myHeight);
  ballY = myHeight / 2;
  ballVY = 5;
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana');
  rectMode(CENTER);

  let speed = map(drum, 0, 100, 2, 15);
  ballSize = map(vocal, 0, 100, 20, 100); // spider body size

  if (ballY > myHeight - ballSize / 2) ballDown = false;
  if (ballY < ballSize / 2) ballDown = true;
  ballY += ballDown ? speed : -speed;

  const count = 5;
  const spacing = width / 10;
  noStroke();

  for (let i = 0; i < count; i++) {
    const offsetIndex = i - (count - 1) / 2;
    const x = width / 2 + offsetIndex * spacing;
    const sizeFactor = 1 - Math.abs(offsetIndex) * 0.1;
    const thisSize = ballSize * sizeFactor;
    const alpha = 230 - Math.abs(offsetIndex) * 40;

    // 🕸 Draw spider web
    drawSpiderWeb(x, ballY, thisSize, other);

    // 🕷 Draw spider
    drawSpider(x, ballY, thisSize, bass);
  }
}

function drawSpiderWeb(cx, cy, size, otherVolume) {
  stroke(255, 255, 255, 60);
  strokeWeight(0.5);
  noFill();

  let layers = int(map(otherVolume, 0, 100, 3, 10));
  let spokes = int(map(otherVolume, 0, 100, 6, 20));

  for (let r = 1; r <= layers; r++) {
    ellipse(cx, cy, size * r / layers);
  }

  for (let a = 0; a < TWO_PI; a += TWO_PI / spokes) {
    let x2 = cx + cos(a) * size / 2;
    let y2 = cy + sin(a) * size / 2;
    line(cx, cy, x2, y2);
  }
}

function drawSpider(x, y, size, bassVolume) {
  // Body
  fill(50, 0, 0, 200);
  stroke(0);
  strokeWeight(1);
  ellipse(x, y, size);

  // Legs
  let legLength = size * 0.8;
  let legSpread = PI / 4;
  let legCount = 8;

  stroke(150);
  strokeWeight(2);

  for (let i = 0; i < legCount; i++) {
    let angle = map(i, 0, legCount - 1, -legSpread, legSpread);
    let legX = x + cos(angle) * legLength;
    let legY = y + sin(angle) * legLength;

    // Bend the leg slightly
    let midX = x + cos(angle) * legLength * 0.5;
    let midY = y + sin(angle) * legLength * 0.5 + 10;

    noFill();
    beginShape();
    vertex(x, y);
    vertex(midX, midY);
    vertex(legX, legY);
    endShape();
  }

  // Eyes (optional)
  fill(255, 0, 0);
  noStroke();
  ellipse(x - size * 0.15, y - size * 0.15, size * 0.1);
  ellipse(x + size * 0.15, y - size * 0.15, size * 0.1);
}