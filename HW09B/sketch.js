let mCamera;

function preload() {
  mCamera = createCapture(VIDEO);
  mCamera.size(windowWidth, windowHeight);
  mCamera.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(20, 20, 40, 100); // Slight transparency for chaotic trails

  // Process and distort the camera feed
  mCamera.loadPixels();
  distortCameraFeed();

  // Display the distorted and mirrored video feed
  push();
  translate(width, 0);
  scale(-1, 1);
  image(mCamera, 0, 0, width, height);
  pop();

  // Add layered waves
  drawLayeredWaves();

  // Add chaotic particles
  drawChaoticParticles();

  // Apply color shift
  applyColorShift();
}

function distortCameraFeed() {
  for (let y = 0; y < mCamera.height; y++) {
    for (let x = 0; x < mCamera.width / 2; x++) {
      let index = (x + y * mCamera.width) * 4;

      // Read and modify pixel colors
      let r = mCamera.pixels[index];
      let g = mCamera.pixels[index + 1];
      let b = mCamera.pixels[index + 2];

      let distortion = sin((x + frameCount) * 0.01) * 50;

      // Mirror effect with distortion
      let mirrorIndex = ((mCamera.width - x - 1) + y * mCamera.width) * 4;
      mCamera.pixels[mirrorIndex] = r + distortion;
      mCamera.pixels[mirrorIndex + 1] = g - distortion;
      mCamera.pixels[mirrorIndex + 2] = b + distortion;
    }
  }
  mCamera.updatePixels();
}

function drawLayeredWaves() {
  noFill();
  for (let i = 0; i < 10; i++) {
    stroke(random(100, 255), random(100, 255), random(255), 150);
    strokeWeight(random(1, 3));

    beginShape();
    for (let x = 0; x < width; x += 10) {
      let offset = sin(frameCount * 0.02 + i * 0.5) * 100;
      let y = height / 2 + sin((x * 0.02) + offset) * 50;
      vertex(x, y + random(-10, 10));
    }
    endShape();
  }
}

function drawChaoticParticles() {
  noStroke();
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 20);
    let colorShift = frameCount % 255;

    fill(random(200, 255), colorShift, random(100, 200), 150);
    ellipse(x, y, size);

    // Add burst effect
    if (random(1) < 0.1) {
      for (let j = 0; j < 5; j++) {
        ellipse(x + random(-20, 20), y + random(-20, 20), size / 2);
      }
    }
  }
}

function applyColorShift() {
  push();
  blendMode(ADD);
  fill(random(100, 200), random(100, 200), random(100, 200), 30);
  rect(0, 0, width, height);
  pop();
}
