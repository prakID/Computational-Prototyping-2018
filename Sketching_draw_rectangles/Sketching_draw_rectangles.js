var vi;

function setup() {
createCanvas(1920,720);
rectMode(CORNERS);
}

function draw() {

}

function mousePressed() {
 vi = createVector(mouseX,mouseY);
 print(vi.x,vi.y);
}

function mouseReleased() {
  stroke(0);
  noFill();
 rect(vi.x, vi.y, mouseX, mouseY);
}
