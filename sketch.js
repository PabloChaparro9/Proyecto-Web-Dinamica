let osc;
let myFreq = 262;
let amp = 0.1;
let notas = [
  C=261.63,
  D=293.66,
  Eb=311.13,
  E=329.63,
  F=349.33,
  G=392,
]
let melody={
  name: '',
  notesIndex: [],
  tempo: 120
};
let noteDuration = 60 / melody.tempo;
let osciladores= [];
let SlimeLeft, SlimeRight, Player, ClassRoom,ClassRoomLeft,ClassRoomRight,RoomRecorder,TeclasImg, Fondo;
let ActionCondition = false;
let controlSize = 75;
let espacioNotasCheck;
espacioNotasCheck= 10;
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
  if((key === 'e' || key === 'E')){
    Accion();
  }
  if((key === 't' || key === 'T') && ActionCondition && (Fondo.f === FondoMayor.f || Fondo.f === FondoMenor.f)){
    playNote(0)
    saveMelody(0)
  }
  if((key === 'y' || key === 'Y') && ActionCondition && (Fondo.f === FondoMayor.f || Fondo.f === FondoMenor.f)){
    playNote(1)
    saveMelody(1)
  }
  if((key === 'u' || key === 'U') && ActionCondition && Fondo.f === FondoMayor.f){
    playNote(3)
    saveMelody(3)
  }
  if((key === 'i' || key === 'I') && ActionCondition && (Fondo.f === FondoMayor.f || Fondo.f === FondoMenor.f)){
    playNote(4)
    saveMelody(4)
  }
  if((key === 'o' || key === 'O') && ActionCondition && (Fondo.f === FondoMayor.f || Fondo.f === FondoMenor.f)){
    playNote(5)
    saveMelody(5)
  }
  if(key === '7' && ActionCondition && Fondo.f === FondoMenor.f){
    playNote(2)
    saveMelody(2)
  }
}
function Accion(){
  if(Fondo.f === FondoMayor.f || Fondo.f === FondoMenor.f || Fondo.f === 100){
    ActionCondition = !ActionCondition;
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
      generarMelodia()
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
      generarMelodia()
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
  for(let nota of notas){
    osc = new p5.Oscillator(nota);
    osciladores.push(osc);
  }
}

let numNotes = notas.length;
function drawMelody() {
  if(!check){
  let keyWidth = (width/(numNotes-1));
  for (let i = 0; i < (numNotes-1); i++) {
    strokeWeight(1)
    if(melody.notesIndex[i]===userMelody.notas[i]){
      fill(120,100,100)      
    }else if(userMelody.notas[i] === undefined){
      fill(0,0,50,0.8)
    }
    else{
      fill(0,100,40)
    }
    rect((i*keyWidth)+espacioNotasCheck,35, controlSize,controlSize,10)
  }

  for (let i = 0; i < (numNotes-1); i ++) {
    if(Fondo.f == FondoMayor.f){
      let x = i * keyWidth;
      let y = keyWidth*2;
      if(i > 1){
        if(osciladores[i+1].started) {
          let h = map(i, 0, numNotes, 0, 360);
  
          fill(h, 100, 100);
        } else {
          fill("white");
        }
  
        rect((x), y, keyWidth, keyWidth*2, 10);
      }else{
        if(osciladores[i].started) {
          let h = map(i, 0, numNotes, 0, 360);
  
          fill(h, 100, 100);
        } else {
          fill("white");
        }
  
        rect((x), y, keyWidth, keyWidth*2, 10);
      }
    }else if(Fondo.f == FondoMenor.f){
      let x = i * keyWidth;
      let y = keyWidth*2;
      if(i > 2){
        if(osciladores[i+1].started) {
          let h = map(i, 0, numNotes, 0, 360);
  
          fill(h, 100, 100);
        } else {
          fill("white");
        }
  
        rect((x), y, keyWidth, keyWidth*2, 10);
      }else{
        if(osciladores[i].started) {
          let h = map(i, 0, numNotes, 0, 360);
  
          fill(h, 100, 100);
        } else {
          fill("white");
        }
  
        rect((x), y, keyWidth, keyWidth*2, 10);
      }
    }
    
  }
  }
}
function playNote(n){
  
  osciladores[n].amp(0.1,0.1);
  if(osciladores[n].started === false){
    osciladores[n].start();
    let h = map(n, 0, numNotes, 0, 360);
  }
  setTimeout(stopNote, noteDuration * 1000 , n)
}
function stopNote(n) {
  osciladores[n].amp(0, 0.01);

  osciladores[n].stop();
}
function playMelody(melodia){
  if (typeof melodia === 'string') {
    melodia = JSON.parse(melodia);
  }

  for (let [index, note] of melodia.entries()) {
    setTimeout(playNote, noteDuration * 1000 * index, note);
  }
}

function play(melodia) {
if (ActionCondition) {
  if (typeof melodia === 'string') {
    melodia = JSON.parse(melodia);
  }

  for (let [index, note] of melodia.entries()) {
    setTimeout(playNote, noteDuration * 1000 * index, note);
  }
}
}
function generarMelodia(){
  melody.notesIndex=[];
  for(let i = 0; i < 5 ; i++){
    let nota
    do{
      nota = Number.parseInt(random(0,5));
      if(Fondo.f === FondoMayor.f && nota === 2){
        nota = nota + 1;
      }else if(Fondo.f === FondoMenor.f && nota === 3){
        nota = nota - 1;
      }
    }while(nota == melody.notesIndex[i-1])
    melody.notesIndex.push(nota)
  }
}
let userMelody= {
  notas:[],
  tempo: 120,
}
function saveMelody(n){
  userMelody.notas.push(n);
  if(userMelody.notas.length == 5){
    compararMelodias()
  }else if(userMelody.notas.length >5){
    userMelody.notas = [];
  }
}
let check;
function compararMelodias(){
  check = true;
  for(let nota of userMelody.notas.entries()){
    if(userMelody.notas[nota[0]] != melody.notesIndex[nota[0]] || !check){
      check = false;
    }
  }
  if(check){
    check=false
    setTimeout(() => {
      check= true
    }, 1000);
  }else{
    setTimeout(() => {
      userMelody.notas = [];
    }, 1000);
  }
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
  colorMode(HSB)
  if(Fondo.f == FondoMayor.f || Fondo.f == FondoMenor.f){
    generarNotas();
  }
}
function generarNotas(){
  if(Player.posX > (width/2.5)-30 && Player.posX < (width/2.5) + 105 && Player.posY > (height/4) && Player.posY < (height / 4)+135 && ActionCondition){
    fill('rgba(15%,15%,15%,0.5)')
    strokeWeight(1)
    rect(0,0, width,height);
    drawMelody()
  }else{
    ActionCondition=false
  }
}
