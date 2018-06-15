/*

  Generate rectangle road markers and animate down and out of the screen,
  road markers increase in size gradually to give the illusion of driving closer to them
  
  Based on code from 
    Pierre Proske
    Classes 5 Particle System
    https://github.com/RMIT-Industrial-Design/IntroToProcessingTutorials/

*/

class Road
{
  float x;
  float y;
  float speedy;
  float gravity;
  float wid;
  float size;
  color c;
  
  long previousMillis = 0;        
  long interval = 50;           
  
  void setPosition(int _x, int _y)
  {
    x = _x;
    y = _y;
  }
  
  void setSpeed(float _y)
  {
    speedy = _y;
  }
  
  void setColour(color _c)
  {
    c = _c;  
  }
  
  void update()
  {

    y = y + speedy;
     
    //slowly increase the thickness of the road markers to give the illusion of close proximity
    
    long currentMillis = millis();
 
    if(currentMillis - previousMillis > interval) {
  
      previousMillis = currentMillis;   
   
      size++;
      
    }
    
  }
  
  void drawRoad()
  {
    fill(c);
    strokeWeight(2);
    rect(x,y,wid,size);
  }
  
  
}
