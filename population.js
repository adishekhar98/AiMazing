function Population(size){
  this.agents = [];
  this.fitnessSum;

  for(let i = 0; i < size; i++){
    this.agents[i] = new Agent();
  }


  this.show = function(){
    for(agent of this.agents){
      agent.show();
    }
  }

  this.update = function(){
    for(agent of this.agents){
      agent.update();
    }
  }

  this.allAgentsDead = function(){
    for(agent of this.agents ){
      if (!agent.dead) {
        return false;
      }
    }
    console.log('ALL AGENTS DEAD');
    return true;
  }

  this.naturalSelection = function(){
    let newGen = []; // size = this.agents.length

    let prevBest = this.bestAgent().getChild();
    prevBest.isBest = true;
    console.log(prevBest);
    console.log('prev best fitness ' + this.bestAgent().fitness);

    //newGen[this.agents.length - 1] = prevBest;
    for(let i = 0; i < this.agents.length - 1; i++){
      let parent = this.selectParent();

      newGen[i] = parent.getChild();
    }

    newGen.push(prevBest);

    this.agents = newGen;
    generation++;
    stepCount = stepCount + 20;
    if (stepCount > 2500) {
      stepCount = 2500;
    }
  }

  this.calculateFitnessSum = function(){
    let fitSum = 0;

    for(agent of this.agents){
      fitSum += agent.fitness;
    }
    return fitSum
  }

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

  this.mutate = function(){
    for(agent of this.agents){
      if (!agent.isBest){
        agent.brain.mutate();
      }
    }
  }

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

//   int goalReachTotal() {
//     int goalReachTotal = 0;
//
//     for(int i = 0; i < dots.length; i++){
//       if (dots[i].reachedGoal){
//         goalReachTotal++;
//       }
//     }
//
//     return goalReachTotal;
//   }
//
//   void processGraphs() {
//     Datapoint min = new Datapoint(true);
//     Datapoint max = new Datapoint(true);
//     Float total = 0.0;
//
//     for(int i = 0; i < dots.length; i++){
//       if (dots[i].reachedGoal){
//         if (min.isEmpty) {
//           min.data = (float)dots[i].brain.step;
//           min.isEmpty = false;
//         }
//         else if (dots[i].brain.step < min.data) {
//           min.data = (float)dots[i].brain.step;
//         }
//       }
//
//       if (max.isEmpty) {
//         max.data = dots[i].fitness;
//         max.isEmpty = false;
//       }
//       else if (dots[i].fitness > max.data) {
//         max.data = dots[i].fitness;
//       }
//
//       total += dots[i].fitness;
//     }
//
//     avgFitness.add(new Datapoint((total)/dots.length, false));
//
//     fewestSteps.add(min);
//
//     maxFitness.add(max);
//
//     //System.out.println((total)/dots.length);
//   }
//
//   void nextGoal() {
//     if (goalReachTotal() > 50 && maze.goals.currentGoal + 1 < maze.goals.locations.size()) {
//       maze.goals.currentGoal++;
//     }
//   }
// }
}
