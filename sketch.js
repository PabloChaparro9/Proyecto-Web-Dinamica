let SlimeLeft, SlimeRight, Player, ClassRoom,ClassRoomLeft,ClassRoomRight,RoomRecorder,TeclasImg;
let controlSize = 50;
function preload(){
  SlimeLeft =  loadImage("./assets/Slime-left.png")
  SlimeRight =  loadImage("./assets/Slime-right.png")
  ClassRoom = loadImage("./assets/pasilloPrincipal.png")
  ClassRoomLeft = loadImage("./assets/ClassroomLeft.png")
  ClassRoomRight = loadImage("./assets/ClassroomRight.png")
  RoomRecorder = loadImage("./assets/HabitacionGrabadora.png")
  Player = {
    PlayerImg: SlimeLeft,
    posX: 100,
    posY: 200,
    velX: 0,
    velY: 0,
  };
}
function goUp(){
  Player.velX = 0;
  Player.velY = -5;
}
function goDown(){
  Player.velX = 0;
  Player.velY = 5;
}
function goLeft(){
  Player.velX = -5;
  Player.velY = 0;
  Player.PlayerImg = SlimeLeft;
}
function goRight(){
  Player.velX = 5;
  Player.velY = 0;
  Player.PlayerImg = SlimeRight;
}
function resetVelocidad(){
  Player.velX = 0;
  Player.velY = 0;
}
function movePlayer(){
  Player.posX += Player.velX;
  Player.posY += Player.velY;
}
function keyPressed() {
  if(key === 'a' || key === 'A' || key === 'ArrowLeft'){
    goLeft();
  }else if(key === 'd' || key === 'D' || key === 'ArrowRight'){
    goRight();
  }else if(key === 'w' || key === 'W' || key === 'ArrowUp'){
    goUp();
  }else if(key === 's' || key === 'S' || key === 'ArrowDown'){
    goDown();
  }else{
    resetVelocidad();
  }
}
function player(){
  image(Player.PlayerImg,Player.posX,Player.posY,controlSize,controlSize);
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if(keyIsPressed === true){
    if((keyIsDown(68)===true || keyIsDown(RIGHT_ARROW)===true) && Player.posX < width - 75 ){
      movePlayer();
    }else
    if((keyIsDown(65)===true || keyIsDown(LEFT_ARROW)===true) && Player.posX > 0){
      movePlayer();
    }
    else if((keyIsDown(87)===true || keyIsDown(UP_ARROW)===true) && Player.posY > 0){
      movePlayer();
    }
    else if((keyIsDown(83)===true || keyIsDown(DOWN_ARROW)===true) && Player.posY < (width-75)){
      movePlayer();
    }
  }else resetVelocidad();
  player();
}
