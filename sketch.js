var fr = 30;
var cols, rows, totalCount;
var zoff = 0;


var flowfield;
var particles = [];
var numberOfParticles = 1200;

var inc = 0.1;
var scl = 25;

function setup() {
  frameRate(fr);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  cols = floor(width / scl);
  rows = floor(height / scl);
  totalCount = cols * rows;
  background(10);

  flowfield = new Array(totalCount);
  for (var i = 0; i < numberOfParticles; i++) {
    particles[i] = new Particle();
  }

  }

function draw() {
  
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;
    zoff += 0.0003;
    }
    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }  
  
}