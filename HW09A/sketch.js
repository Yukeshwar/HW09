let oImg;
let mImg;

function preload() {
  oImg = loadImage("../assets/mondriaan.jpg");
  mImg = loadImage("../assets/mondriaan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  oImg.resize(0, height);
  mImg.resize(0, height);
  oImg.loadPixels();
  createSliders();
}

function draw() {
  mImg.loadPixels();

  for (let y = 0; y < oImg.height; y++) {
    for (let x = 0; x < oImg.width; x++) {
      let index = (x + y * oImg.width) * 4;
      let r = oImg.pixels[index];
      let g = oImg.pixels[index + 1];
      let b = oImg.pixels[index + 2];

      if (r > 200 && g < 100 && b < 100) {
        mImg.pixels[index] = 255;
        mImg.pixels[index + 1] = 0;
        mImg.pixels[index + 2] = 128;
      } else if (r < 100 && g > 200 && b < 100) {
        mImg.pixels[index] = 0;
        mImg.pixels[index + 1] = 255;
        mImg.pixels[index + 2] = 128;
      } else if (r < 100 && g < 100 && b > 200) {
        mImg.pixels[index] = 0;
        mImg.pixels[index + 1] = 128;
        mImg.pixels[index + 2] = 255;
      } else if (r > 200 && g > 200 && b < 100) {
        mImg.pixels[index] = 255;
        mImg.pixels[index + 1] = 255;
        mImg.pixels[index + 2] = 0;
      } else if (r < 50 && g < 50 && b < 50) {
        mImg.pixels[index] = 0;
        mImg.pixels[index + 1] = 0;
        mImg.pixels[index + 2] = 0;
      } else {
        mImg.pixels[index] = 192;
        mImg.pixels[index + 1] = 0;
        mImg.pixels[index + 2] = 192;
      }

      mImg.pixels[index + 3] = oImg.pixels[index + 3];
    }
  }

  mImg.updatePixels();
  drawBackground();
  image(mImg, 0, 0);
}

function createSliders() {
  let brightnessSlider = createSlider(0, 255, 128);
  brightnessSlider.input(() => adjustBrightness(brightnessSlider.value()));
}

function adjustBrightness(value) {
  mImg.loadPixels();
  for (let i = 0; i < mImg.pixels.length; i += 4) {
    mImg.pixels[i] = constrain(mImg.pixels[i] + value, 0, 255);
    mImg.pixels[i + 1] = constrain(mImg.pixels[i + 1] + value, 0, 255);
    mImg.pixels[i + 2] = constrain(mImg.pixels[i + 2] + value, 0, 255);
  }
  mImg.updatePixels();
}

function drawBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(40, 0, 50), color(80, 0, 120), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
