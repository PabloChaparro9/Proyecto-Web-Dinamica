let SlimeLeft, SlimeRight, Player, ClassRoom,ClassRoomLeft,ClassRoomRight,RoomRecorder,TeclasImg, Fondo;
let controlSize = 75;
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
  FondoNeutro ={
    f:1,
  };
  FondoMayor ={
    f:2,
  };
  FondoMenor ={
    f:3,
  };
  Fondo ={
    f:1,
    FondoImg: ClassRoom,
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
function fondo(){
  image(Fondo.FondoImg,0,0,width,(width/5)*4);
}
function cambiarFondo() {
  if(Player.posX == width-75){
    if(Fondo.f === FondoNeutro.f){
      Player.posX = 10;
      Player.posY = 200;
      Fondo.f = FondoMayor.f;
      Fondo.FondoImg = ClassRoomRight;
      /* generarMelodia() */
    }else if(Fondo.f === FondoMenor.f){
      Player.posX = 10;
      Player.posY = 200;
      Fondo.f = FondoNeutro.f
      Fondo.FondoImg = ClassRoom;
    }
  }
  if(Player.posX == 0){
    if(Fondo.f === FondoNeutro.f){
      Player.posX = width-85;
      Player.posY = 200;
      Fondo.f = FondoMenor.f
      Fondo.FondoImg = ClassRoomLeft;
      /* generarMelodia() */
    }else if(Fondo.f === FondoMayor.f){
      Player.posX = width-85;
      Player.posY = 200;
      Fondo.f = FondoNeutro.f
      Fondo.FondoImg = ClassRoom;
    }
  }
  if(Player.posY == 0 && Fondo.f == FondoNeutro.f){
    Player.posY= ((width/5*4)-85);
    Player.posX= width / 2;
    Fondo.f = 0;
    Fondo.FondoImg = RoomRecorder;
  }
  if(Player.posY == ((width/5)*4)-75 && Fondo.f == 0){
    Player.posY= 100;
    Player.posX= width / 2;
    Fondo.f = FondoNeutro.f;
    Fondo.FondoImg = ClassRoom;
  }
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  if(keyIsPressed === true){
    if((keyIsDown(68)===true || keyIsDown(RIGHT_ARROW)===true) && Player.posX < width - 75 ){
      movePlayer();
      cambiarFondo();
    }else
    if((keyIsDown(65)===true || keyIsDown(LEFT_ARROW)===true) && Player.posX > 0){
      movePlayer();
      cambiarFondo();
    }
    else if((keyIsDown(87)===true || keyIsDown(UP_ARROW)===true) && Player.posY > 0){
      movePlayer();
      cambiarFondo();
    }
    else if((keyIsDown(83)===true || keyIsDown(DOWN_ARROW)===true) && Player.posY < ((width/5)*4-75)){
      movePlayer();
      cambiarFondo();
    }
  }else resetVelocidad();
  fondo();
  player();
}
