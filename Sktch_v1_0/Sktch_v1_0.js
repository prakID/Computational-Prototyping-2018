var sliderR;
var sliderG;
var sliderB;

var r;
var g;
var b;

var strk = {
  weight:  5,
  blk:  0,
  cGrey: 220,
  Grey: 120,
  dGrey: 80,
  white:255
};

var buttonRect;
var buttonElli;
var buttonPen;
var modeVal;
var buttonClr;
var buttonSave;

var vi;

var circle ={
  x:0,
  y:0,
  w:0,
  h:0,
};

function setup() {
  
  createCanvas(1080,720);
  background(255);
  frameRate(120);
  rectMode(CORNERS);
  
  modeVal  =  0;
  
  sliderR = createSlider(0, 255, 127, 0);
  sliderR.position(50, 200);
  sliderR.style('width', '100px');

  sliderG = createSlider(0, 255, 127, 0);
  sliderG.position(50, 250);
  sliderG.style('width', '100px');
  
  sliderB = createSlider(0, 255, 127, 0);
  sliderB.position(50, 300);
  sliderB.style('width', '100px');
  
  buttonPen = createButton('Pen');
  buttonPen.position(60, 350);
  buttonPen.size(100,25);
  buttonPen.mousePressed(modePen);
  
  buttonRect = createButton('Rectangle');
  buttonRect.position(60, 400);
  buttonRect.size(100,25);
  buttonRect.mousePressed(modeRect);
  
  buttonElli = createButton('Ellipse');
  buttonElli.position(60, 450);
  buttonElli.size(100,25);
  buttonElli.mousePressed(modeElli);
    
  buttonClr= createButton('Clear');
  buttonClr.position(60, 525);
  buttonClr.size(100,25);
  //buttonSave.style('background-color', 120);
  buttonClr.mousePressed(modeClr);
  
  buttonSave= createButton('Save');
  buttonSave.position(60, 575);
  buttonSave.size(100,25);
  //buttonSave.style('background-color', 120);
  buttonSave.mousePressed(modeSave);
  
  
  
}
function draw() {
  //print(circle.x, circle.y, circle.w, circle.h);
  //print(r,g,b);
    
  fill(strk.white);
  stroke(strk.cGrey);
  strokeWeight(1);
      rect(1,0,219,719); 
  noFill();
      rect(0,0,1079,719);
  
  r = sliderR.value();
  g = sliderG.value();
  b = sliderB.value();
  
  //col = color(r,g,b);


  fill(r,g,b);
  strokeWeight(5);
  stroke(strk.dGrey);
  ellipse(110,100,75);
 
  textAlign(CENTER);
  textFont('Helvetica',14);
  fill(r,g,b);
  noStroke();
     text('Sktch v1.0', 1, 650, 219, 719); //rectMode influence
   
  textFont('Helvetica',10);
     text('Prak Raj', 1, 680, 219, 719); //rectMode influence
  
}

function mousePressed() {
  if  (modeVal == 2){
 vi = createVector(mouseX,mouseY);
 print(vi.x,vi.y);
  }
  
  
  if  (modeVal == 1){
 vi = createVector(mouseX,mouseY);
 print(vi.x,vi.y);
  }
}

function mouseReleased() {
   if  (modeVal == 2){ 
    stroke(strk.weight);
    fill(r,g,b);
   ellipse(vi.x, vi.y, (mouseX-vi.x), (mouseY-vi.y));
  }
  
   if  (modeVal == 1){ 
    stroke(strk.weight);
    fill(r,g,b);
   rect(vi.x, vi.y, mouseX, mouseY);
  }
}

function mouseDragged() 
{ 
  if  (modeVal == 0){
  strokeWeight(strk.weight);
  stroke(r,g,b);
  line(mouseX, mouseY, pmouseX, pmouseY);
  //print(line.mouseX, line.mouseY);
  }
  
}

function modeRect() {
  modeVal=1;
  print(modeVal);
}

function modePen() {
  modeVal=0;
  print(modeVal);
}

function modeElli() {
  modeVal=2;
  print(modeVal);
}

function modeClr() {
  background(255);
}

function modeSave() {
saveCanvas('sKtCh','png');
}
