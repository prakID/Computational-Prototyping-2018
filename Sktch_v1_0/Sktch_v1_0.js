//Sktch
//Ver. 1.0
//By Prakash Kumar Rajendran, 2018
//for Computational Prototyping for Industrial Design, RMIT Industrial Design
//https://github.com/prakID

var sliderR; //declaring slider control variables for rgb
var sliderG;
var sliderB;

var r;//declaring rgb colour values to be used throughout the app
var g;
var b;

var strk = { //a global object to access properties for stroke outlines
  weight:  5,
  blk:  0, //black
  cGrey: 220, //cool grey
  Grey: 120, //grey
  dGrey: 80, //dark grey
  white:255 //white
};

var buttonRect; //declaring variables for button controls
var buttonElli;
var buttonPen;
var buttonClr;
var buttonSave;

var modeVal; //declaring the var to save the brush mode (pen/rectangle/ellipse)

var vi; //Declaring the variable to calculate the mouse vector for shapes

var circle ={ // a global object for properties of drawing an ellipse
  x:0,
  y:0,
  w:0,
  h:0,
};

function setup() {

  createCanvas(1080,720); //total area used
  background(255); //without a background color, the drawings go straight on canvas. When saved has a transparent background
  frameRate(120); //to mitigate the line segments showing in pen tool
  rectMode(CORNERS); //changing rectmode for easy calculation of rectangles

  modeVal  =  0; //initially set to pen tool as default when app is opened

  sliderR = createSlider(0, 255, 127, 0); //Create a slider object for red parameter of colour
  sliderR.position(50, 200); //position of top left corner of slider
  sliderR.style('width', '100px'); //specifying width of slider

  sliderG = createSlider(0, 255, 127, 0); //Create a slider object for green parameter of colour
  sliderG.position(50, 250);
  sliderG.style('width', '100px');

  sliderB = createSlider(0, 255, 127, 0); //Create a slider object for blue parameter of colour
  sliderB.position(50, 300);
  sliderB.style('width', '100px');

  buttonPen = createButton('Pen'); //create a button object for selecting pen tool
  buttonPen.position(60, 350); //position of top left corner of button
  buttonPen.size(100,25); //specifying width and height of button
  buttonPen.mousePressed(modePen); //on the event of a button press, func modePen is called

  buttonRect = createButton('Rectangle'); //create a button object for selecting rectangle tool
  buttonRect.position(60, 400);
  buttonRect.size(100,25);
  buttonRect.mousePressed(modeRect);

  buttonElli = createButton('Ellipse'); //create a button object for selecting ellipse tool
  buttonElli.position(60, 450);
  buttonElli.size(100,25);
  buttonElli.mousePressed(modeElli);

  buttonClr= createButton('Clear'); //create a button object for clearing the drawing screen
  buttonClr.position(60, 525);
  buttonClr.size(100,25);
  //buttonSave.style('background-color', 120); //To change the colour of the button for noticeability
  buttonClr.mousePressed(modeClr);

  buttonSave= createButton('Save'); //create a button object for saving the canvas as an image
  buttonSave.position(60, 575);
  buttonSave.size(100,25);
  //buttonSave.style('background-color', 120);
  buttonSave.mousePressed(modeSave);



}
function draw() {
  //print(circle.x, circle.y, circle.w, circle.h); //console readouts for debugging circle tool
  //print(r,g,b); //console readouts for debugging colour

  fill(strk.white);
  stroke(strk.cGrey);
  strokeWeight(1);
      rect(1,0,219,719); //a rectangle behind the controls to hide sketch bleedovers
  noFill();
      rect(0,0,1079,719); //a border around the canvas to see the bounds

  r = sliderR.value(); //relate the values of sliders to relevant variables
  g = sliderG.value();
  b = sliderB.value();

  //col = color(r,g,b);


  fill(r,g,b);
  strokeWeight(5);
  stroke(strk.dGrey);
  ellipse(110,100,75); //a swatch window to see what colour is mixed & chosen

  textAlign(CENTER);
  textFont('Helvetica',14);
  fill(r,g,b); //to change colour of the text same as the brush
  strokeWeight(1);
     text('Sktch v1.0', 1, 650, 219, 719); // numeric values of the textbox, will be influenced by rectmode

  textFont('Helvetica',10);
     text('Prak Raj', 1, 680, 219, 719);

}

function mousePressed() { // record the mouse coordinates when the mouse is pressed
  if  (modeVal == 2){ //if the ellipse tool is selected
 vi = createVector(mouseX,mouseY); //creates a vector from the point of mouseclick
  print(vi.x,vi.y); //console output mouseclick coordintes for debugging
  }


  if  (modeVal == 1){ //if rectangle tool is selected
 vi = createVector(mouseX,mouseY);
 print(vi.x,vi.y);
} // redundant if statement, both modeVal collect same data on the event of a mouse press
}

function mouseReleased() { //on the event of the mouse button is released
   if  (modeVal == 2){ //if ellipse tool is selected
    stroke(strk.weight);
    fill(r,g,b);
   ellipse(vi.x, vi.y, (mouseX-vi.x), (mouseY-vi.y)); //draw an ellipse on the center of mousepress and calculate the travel of mouse in x direction for width and y direction for height
  }

   if  (modeVal == 1){
    stroke(strk.weight);
    fill(r,g,b);
   rect(vi.x, vi.y, mouseX, mouseY); //draw a rectangle with one corner on mousepress coord and the opposite corner on mouse release
  }
}

function mouseDragged() //if mouse is clicked and dragged
{
  if  (modeVal == 0){ //if pen tool is selected
  strokeWeight(strk.weight);
  stroke(r,g,b);
  line(mouseX, mouseY, pmouseX, pmouseY); //draw lines between consecutive mouse coordinates between frames. can be choppy if mouse is moved fast
  //print(line.mouseX, line.mouseY); //outputs for debugging
  }

}

function modeRect() { // custom fuction to change modes to rectangle on button click
  modeVal=1;
  print(modeVal); // console output to see what mode is selected for debugging
}

function modePen() { // custom fuction to change modes to pen tool on button click
  modeVal=0;
  print(modeVal);
}

function modeElli() { // custom fuction to change modes to ellipse on button click
  modeVal=2;
  print(modeVal);
}

function modeClr() { // custom function to clear the screen on button click
  background(255); // assigning white for background
}

function modeSave() { // custom function to save canvas on button click
saveCanvas('sKtCh','png'); //saves the entire canvas as a png image. Cannot capture p5.element objects such as sliders and buttons
}