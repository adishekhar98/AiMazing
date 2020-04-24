/*
  The population class contains an array of all agents
  It is responsible for measuring the fitness of the agents and running the genetic algorithm
  Code adapted from:
  https://github.com/jameshball/MazeAI/
*/


function Population(size){
  this.agents = [];

  // Fill the population with new agents
  for(let i = 0; i < size; i++){
    this.agents.push(new Agent());
  }

  // Draw all agents in the population
  this.show = function(){
    for(agent of this.agents){
      agent.show();
    }
  }

  // Update all agents in the population
  this.update = function(){
    for(agent of this.agents){
      agent.update();
    }
  }

  // Check if all agents from the current generation are dead
  this.allAgentsDead = function(){
    for(agent of this.agents ){
      if (!agent.dead) {
        return false;
      }
    }
    return true;
  }

  // This is the genetic algorithm, it creates a new generation from the best agents of the previous generation
  this.naturalSelection = function(){
    let newGen = [];

    // Saves the best agent from the previous generation
    let prevBest = this.bestAgent().getChild();
    prevBest.isBest = true;

    // Fill the new generation with children of the best agents from the current gen
    for(let i = 0; i < this.agents.length - 1; i++){
      newGen.push(this.selectParent().getChild());
    }
    newGen.push(prevBest);
    this.agents = newGen;

    // Increment the generation and step count. To encourage exploration, each generation can move a further distance than its parents
    generation++;
    stepCount = stepCount + 20;
  }

  // Calculates the sum of all the fitnesses for agents in the current generation
  this.calculateFitnessSum = function(){
    let fitSum = 0;

    for(agent of this.agents){
      fitSum += agent.fitness;
    }
    return fitSum
  }

  // Selects a parent agents from the current generation
  this.selectParent = function() {
    let rnd = random(this.calculateFitnessSum());

    let runningSum = 0;
    let parent;

    for(agent of this.agents){
      runningSum += agent.fitness;

      if(runningSum > rnd) {
        parent = agent;
        return parent;
      }
    }
    if (!parent){
      let rnd = floor(random(this.agents.length));
      parent = this.agents[rnd];
    }
    return parent;
  }

  // Mutates all agents
  this.mutate = function(){
    for(agent of this.agents){
      if (!agent.isBest){
        agent.brain.mutate();
      }
    }
  }

  // Gets the agent with the best fitness from the current generation
  this.bestAgent = function(){
    let max = 0;
    let bestAgent;
    for(agent of this.agents){
      if(agent.fitness > max) {
        max = agent.fitness;
        bestAgent = agent;
      }
    }

    if (!bestAgent){
      let rnd = floor(random(this.agents.length));
      bestAgent = this.agents[rnd];
    }
    return bestAgent;
  }
}
