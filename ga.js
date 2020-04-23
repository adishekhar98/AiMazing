// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

function nextGeneration() {
  calculateFitness();
  for (let i = 0; i < populationSize; i++) {
    population[i] = pickOne();
  }
  savedAgents = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedAgents[index].fitness;
    index++;
  }
  index--;
  let agent = savedAgents[index];
  let agentBrain = agent.brain;
  let child = new Agent(start.i + scl/2, start.j + scl/2, agentBrain);
  //console.log('mutating child ', child,' got fr0m index ' + index + ' with brain ', agentBrain);
  child.mutate();
  return child;
}

function calculateFitness() {

  for (let agent of savedAgents) {
    agent.calculateFitness();
  }

  let sum = 0;
  for (let agent of savedAgents){
    sum+= agent.fitness;
  }
  for (let agent of savedAgents) {
    agent.fitness = agent.fitness / sum;
  }
}
