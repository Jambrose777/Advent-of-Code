const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

// create modules
let modules = input
  .split("\n")
  .map(line => {
    let name = line.split("->")[0].trim()
    let mType;
    if(name.charAt(0) == '%') {
       mType = 'flip-flop'
       name = name.substring(1);
    } else if(name.charAt(0) == '&') {
       mType = 'conjunction'
       name = name.substring(1);
    } else {
       mType = 'broadcaster'
    }
    let outputModules = line.split("->")[1].trim().split(", ")
    return {
      name,
      mType,
      outputModules,
      flipFlopOn: false,
    }
});

// add rememberedPulses based on outputs of other modules
modules = modules.map(m => {
  let rememberedPulses = [];
  if(m.mType === 'conjunction') {
    rememberedPulses = modules.filter(m2 => m2.outputModules.includes(m.name)).map(m2 => ({ name: m2.name, highPulse: false }))
  }
  return {...m, rememberedPulses}
})

let part2 = [];

function pressButton(modules) {
  let modulesRecievedPuleses = [
    { name: 'broadcaster', highPulse: false, fromName: '' }
  ]
  let highPulses = 0;
  let lowPulses = 0;
  while(modulesRecievedPuleses.length) {
    let currentPulse = modulesRecievedPuleses.splice(0 , 1)[0];
    let currentModule = modules.find(m => m.name === currentPulse.name);

    // Part 2
    if(currentPulse.name === 'cl' && currentPulse.highPulse) {
      if(!part2.find(p => p.name === currentPulse.fromName)) {
        part2.push({name: currentPulse.fromName, buttonPresses})
      }
    }

    // console.log(currentPulse);

    // keep track of number of pulses for part 1
    if(currentPulse.highPulse) {
      highPulses++
    } else {
      lowPulses++
    }
    if(!currentModule) {
      // end of line - Do Nothing
    } else if(currentModule.name === 'broadcaster') {
      currentModule.outputModules.forEach(m => {
        modulesRecievedPuleses.push({ name: m, highPulse: currentPulse.highPulse, fromName: currentModule.name })
      })
    } else if(currentModule.mType === 'flip-flop') {
      if(!currentPulse.highPulse) {
        currentModule.flipFlopOn = !currentModule.flipFlopOn
        currentModule.outputModules.forEach(m => {
          modulesRecievedPuleses.push({ name: m, highPulse: currentModule.flipFlopOn, fromName: currentModule.name })
        })
      }
    } else if(currentModule.mType === 'conjunction') {
      let rememberedPulse = currentModule.rememberedPulses.find(m => m.name === currentPulse.fromName)
      rememberedPulse.highPulse = currentPulse.highPulse;
      let nextPulse = !!currentModule.rememberedPulses.filter(m => !m.highPulse).length
      currentModule.outputModules.forEach(m => {
        modulesRecievedPuleses.push({ name: m, highPulse: nextPulse, fromName: currentModule.name })
      })
    } else {
      console.log('currentModule.mType error', currentModule.mType)
    }
  }
  return { highPulses, lowPulses }
}


// part 1, run 1000 times and count pulses
let part1 =  { highPulses: 0, lowPulses: 0 };
let buttonPresses = 1
for(buttonPresses; buttonPresses <= 1000; buttonPresses++) {
  let add = pressButton(modules);
  part1.highPulses += add.highPulses;
  part1.lowPulses += add.lowPulses;
}

console.log(`Part 1: ${part1.lowPulses * part1.highPulses}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);


// Part 2, run 4020 (chosen as highest is 4019) and take lcm of the results for each parent of the conjuction
for(buttonPresses; buttonPresses <= 4020; buttonPresses++) {
  pressButton(modules);
}

console.log(`Part 2: ${ _.lcmArr(part2.map(p => p.buttonPresses)) }`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
