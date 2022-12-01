var textS = 20;

var kernRadius = 50;
var placedElectrons = [];
var layers = [2, 8, 18, 32, 50, 72, 98];

var sup = ["","¹","²","³","⁴","⁵","⁶","⁷","⁸","⁹"]

var sign = "";
var remainder;
var shells = 0;

function setup() {
  createCanvas(500, 500);
}
function draw() {
  translate(width / 2, height / 2);
  var remainder;
  var shells = 0;
  
  
  var protons = int(document.getElementById("pro").value);
  if (isNaN(protons)) {protons = 1;}
  var neutrons = int(document.getElementById("neu").value);
  if (isNaN(neutrons)) {neutrons = 0;}
  var electrons = int(document.getElementById("elec").value);
  if (isNaN(electrons)) {electrons = 1;}
  
  placedElectrons = [];
  
  background(255);
  fill(200);
  circle(0, 0, kernRadius * 2);

  fill(0);
  textSize(textS);
  textAlign(CENTER, CENTER);
  var charge = protons-electrons
  if (charge > 0) {
    sign = "⁺"
  } else if(charge < 0) {
    sign = "⁻"
  } else {
    sign = ""
  }
  text(periodic[protons-1][0]+"-"+
       str(protons+neutrons)+
       sign+sup[min(9,abs(charge))], 0, -textS);
  text("P⁺:" + str(protons), 0, 0);
  text("N:" + str(neutrons), 0, textS);

  remainder = electrons;
  for (i = 0; i < 7; i++) {
    shells++;
    append(placedElectrons, min(remainder, layers[i]));
    remainder -= min(remainder, layers[i]);
    if (remainder == 0) break;
  }

  for (var i = 1; i <= shells; i++) {
    noFill();
    var e = placedElectrons[i - 1];

    var radius = kernRadius + (150 / shells) * i;
    circle(0, 0, radius * 2);
    for (var angle = 0; angle < 360; angle += 360.0 / e) {
      fill(0, 0, 200);
      var x = radius * cos(radians(angle));
      var y = radius * sin(radians(angle));
      circle(x, y, 10);
    }
  }
}
