function setup() {
createCanvas(1920,720);

r = random(255);
g = random(255);
b = random(255);
}

function draw() {
  //background(0);
}

function mouseDragged() 
{ 
  strokeWeight(10);
  stroke(r,g,b);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function keyPressed()
{
  if(key == 'r' || key == 'R')
  {
    r = random(255);
    g = random(255);
    b = random(255);
  }
  
    if(key == 'e' || key == 'E')
  {
    r = 255;
    g = 255;
    b = 255;
  }
}