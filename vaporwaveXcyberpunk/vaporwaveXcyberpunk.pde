/*

   ----Vapourwave x Cyberpunk Audio Visualiser v1.0----
  [ Processing, Fadecandy, 16x16 WS2812 RGB LED Strips ]
                    Prakash Raj,2018
  Based on
      [FFT/ Processing]
      https://processing.org/reference/libraries/sound/FFT.html
    
      [Open Pixel Control OPC and Fadecandy]
      Micah Elizabeth Scott - Scanlime
      https://github.com/scanlime/fadecandy

*/

import processing.sound.*;

//audio declarations
FFT fft;
AudioIn in;
int bands = 512;
float[] spectrum = new float[bands];

//OPC declarations
OPC opc;

//road class declarations. 
//generate an arraylist for road markers that will be generated
ArrayList<Road> road;
Road r;

//initial values for road generation
boolean bGenerateRoad = true;

long previousMillis = 0;        // will store last time the road was generated
 
long interval = 400;           // interval at which to generate a road marker (milliseconds)

void setup()
{
  //size proportional to LED Matrix area with a border on all sides
  size(340, 340);
  
  // Open Pixel Control initiation
  opc = new OPC(this, "127.0.0.1", 7890);

  //LED Mapping. 
  //Manual entry since the numbering is staggered due to 
  //not populating the entire strip for every output from fadecandy board
  
  //layout of led strips
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->
  //<--------------------<    <- IN
  //  >-------------------->

  opc.ledStrip(0, 16, width/2, 20, 20, 0, true);
  opc.ledStrip(16, 16, width/2, 40, 20, 0, false);
  opc.ledStrip(64, 16, width/2, 60, 20, 0, true);
  opc.ledStrip(80, 16, width/2, 80, 20, 0, false);
  opc.ledStrip(128, 16, width/2, 100, 20, 0, true);
  opc.ledStrip(144, 16, width/2, 120, 20, 0, false);
  opc.ledStrip(192, 16, width/2, 140, 20, 0, true);
  opc.ledStrip(208, 16, width/2, 160, 20, 0, false);
  opc.ledStrip(256, 16, width/2, 180, 20, 0, true);
  opc.ledStrip(272, 16, width/2, 200, 20, 0, false);
  opc.ledStrip(320, 16, width/2, 220, 20, 0, true);
  opc.ledStrip(336, 16, width/2, 240, 20, 0, false);
  opc.ledStrip(384, 16, width/2, 260, 20, 0, true);
  opc.ledStrip(400, 16, width/2, 280, 20, 0, false);
  opc.ledStrip(448, 16, width/2, 300, 20, 0, true);
  opc.ledStrip(464, 16, width/2, 320, 20, 0, false);
  
  //initiate fast fourier transform & audio objects
  fft = new FFT(this, bands);
  in = new AudioIn(this, 0);
  
  in.start(); //start listening to mic
  
  fft.input(in); //transform the input values using fast fourier
  
  //create a new array list named road
  road = new ArrayList<Road>();
  
}

void draw()
{
  background(0);
  
  //store values of the fast fourier transformations in matrix 'spectrum'
  fft.analyze(spectrum);

  strokeWeight(7);
  noStroke();
  
  fill(255,113,206); //Vapourwave palette colour swatch - pink
  
    //neon pink 'sun sprite reacting exclusively to the lower frequencies (bass)
    for(int i = 0; i < 128; i++){
      ellipse(width/2, height/4, (spectrum[i]*height*0.5)+height/4, (spectrum[i]*height*0.5)+height/4);
    }
 
  stroke(1,205,254); //vapourwave palette colour swatch - cyan

    //cyan 'hill' equaliser reacting to all frequencies from the 'horizon line'
    for(int i = 0; i < 512; i++){
           stroke(1,205,254);
        strokeWeight(15);
        line( i, (height/3+30), i, (height/3+30) - spectrum[i]*height*2 );
    } 
  
  fill(0);
  noStroke();
  rect(0,(height/3)+40,width, 2*height/3); //refresh black bg with no remains of animation from previous frame
  
  // spawn road markers
  if(bGenerateRoad) {
    r = new Road();
    r.setPosition(0,40+height/3); //start from the horizon line
    r.size = 1;
    r.wid = width;
    r.setSpeed(2);
    r.setColour(color(5,255,161)); //vapourwave palette colour swatch - green 
  
    road.add(r);
    
  }

  // update and draw road markers
  for(int i = 0; i < road.size();i++ )
  {
    Road r = road.get(i);
    r.drawRoad();
    r.update();
  }
  
  // remove road markers that are off-screen
  for(int i = 0; i < road.size();i++ )
  {
    Road r = road.get(i);
    
    if(r.y > height) {
      road.remove(i);  
    }
  } 

  //using the inbuilt timer millis(), a clock runs between the given intervals
  //to stagger the generation of road markers to give the illusion of driving towards the 'horizon'

  long currentMillis = millis();
 
  if(currentMillis - previousMillis > interval) {

    previousMillis = currentMillis;   
 
    bGenerateRoad = !bGenerateRoad; // switch boolean value for bGenerateRoad
    
  }
  
  //hide the corners of the generated road markers to give the illusion of perspective
  fill(0);
  triangle(0, 40+height/3, width/3, 40+height/3, 0, height);
  triangle(width, 40+height/3, 2*width/3, 40+height/3, width, height);

}
