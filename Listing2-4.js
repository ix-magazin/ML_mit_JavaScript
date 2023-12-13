//Listing 2: Setup des neuronalen Netzes und der Datenquelle

let nn;
let targetLabel = 'A';
let state = 'collection';

function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: ['x0', 'x1'],
    outputs: ['label'],
    task: 'classification',
    debug: 'true'
  }

  nn = ml5.neuralNetwork(options);

  background(220);
}

// Listing 3: Funktionen zum Steuern des neuronalen Netzes

function keyPressed(){
  if(key == 't'){
    state = 'training';
    console.log('starting training');
    nn.normalizeData();
    let options = {
      epochs: 200
    }

    nn.train(options, whileTraining, finishedTraning);
  }else{
    targetLabel = key.toUpperCase();
  }
}

function mousePressed(){
  let inputs = {
    x0: mouseX,
    x1: mouseY
  }

  if(state == 'collection'){
    let target = {
      label: targetLabel
    }

  nn.addData(inputs, target);
  stroke(0);
  noFill();
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(targetLabel, mouseX, mouseY);

  }else if (state=='prediction'){
    nn.classify(inputs, getResults);
  }
}

// Listing 4: Modelltraining und Ergebnisse

function whileTraining(epoch, loss){
  console.log(epoch);
}
function finishedTraning(){
  console.log('finished training');
  state = 'prediction';
}

function getResults(error, results){
  if(error){
    console.error(error);
    return;
  }
  console.log(results);
}
