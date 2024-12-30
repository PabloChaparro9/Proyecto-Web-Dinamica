function goUp(){
  Flower.velX = 0;
  Flower.velY = -5;
}
function goDown(){
  Flower.velX = 0;
  Flower.velY = 5;
}
function goLeft(){
  Flower.velX = -5;
  Flower.velY = 0;
  Flower.FlowerImg = SlimeLeft;
}
function goRight(){
  Flower.velX = 5;
  Flower.velY = 0;
  Flower.FlowerImg = SlimeRight;
}
function resetVelocidad(){
  Flower.velX = 0;
  Flower.velY = 0;
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
