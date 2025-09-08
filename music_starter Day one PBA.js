// vocal, drum, bass, and other are volumes ranging from 0 to 100
let n;
function setup () {
createCanvas (windowwidth - 30, windowHeight - 30);
n = 0;
frameRate (20) ;
}
function draw() {
translate(width / 2, height / 2);
rotate(n) ;
rectSize = width * 0.9;
background (0); rectMode (CENTER) ;
for (let i = 1; i < 100; i++) {
fill(i * 6);
rect (0, 0, rectSize, rectSize);
rotate(PI / 30);
rectSize *= 0.9;
}
n += 0.01 ;
}  

