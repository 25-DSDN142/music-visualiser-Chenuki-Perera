function draw_one_frame(words, vocal, drum, bass, other, counter)  {
  //background(220);

  // Get volumes
  if (editorMode) {
    volumes[0] = slider1.value();
    volumes[1] = slider2.value();
    volumes[2] = slider3.value();
    volumes[3] = slider4.value();
  } else {
    let now = millis();
    let songOffset = now - songEpoch;
    if (songIsPlaying) {
      //let analysis = Taira.getVolume(song, smoothing);
      volumes[0] = vocal;
      volumes[1] = drum;
      volumes[2] = bass;
      volumes[3] = other;
    } else {
      volumes = [0, 0, 0, 0];
    }
    if (songIsPlaying && songOffset > song.duration() * 1000) {
      songEpoch = 0;
      songIsPlaying = false;
      editorMode = true;
      textInput.elt.disabled = false;
      slider1.elt.disabled = false;
      slider2.elt.disabled = false;
      slider3.elt.disabled = false;
      slider4.elt.disabled = false;
      songButton.elt.innerHTML = "start music";
    }
  }

  // --- Sunflower Animation ---
  push();
  translate(width / 2, height / 2);
  let petals = 16;
  let baseRadius = 60 + volumes[2]; // bass controls flower size
  let petalLength = 80 + volumes[0]; // vocal controls petal length
  let petalWidth = 20 + volumes[1] / 5; // drum controls petal width
  let t = millis() * 0.002;
  for (let i = 0; i < petals; i++) {
    let angle = map(i, 0, petals, 0, TWO_PI);
    let pulse = sin(t + angle * 2 + volumes[3] * 0.05) * 10; // other controls pulse
    push();
    rotate(angle);
    fill(255, 220, 60);
    stroke(200, 150, 0);
    ellipse(baseRadius + pulse, 0, petalLength, petalWidth);
    pop();
  }
  // Center of sunflower
  fill(80, 40, 0);
  stroke(0);
  ellipse(0, 0, baseRadius, baseRadius);
  pop();

  // --- Mind Map (Radial Diagram) ---
  push();
  translate(width / 2, height / 2);
  let nodes = 6;
  let nodeRadius = baseRadius + 60;
  stroke(100, 100, 255, 120);
  strokeWeight(2);
  for (let i = 0; i < nodes; i++) {
    let angle = map(i, 0, nodes, 0, TWO_PI);
    let x = cos(angle) * nodeRadius;
    let y = sin(angle) * nodeRadius;
    line(0, 0, x, y);
    fill(100, 200, 255);
    ellipse(x, y, 30, 30);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Idea " + (i + 1), x, y);
  }
  pop();

  // --- UI and Info ---
  fill(0);
  textAlign(LEFT, TOP);
  text("Mode: " + (editorMode ? "Editor" : "Run"), 10, 10);
  text("Volumes: " + volumes.map(v => v.toFixed(2)).join(", "), 10, 30);
  text("Smoothing: " + smoothing, 10, 50);
  text("Song status: " + songLoadStatus, 10, 70);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text(textInput.value(), width / 2, height - 40);

  fill(0);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text("In Editor mode, adjust sliders and text input.\nIn Run mode, play song and watch visualization respond.", 10, height - 10);
}
