const start = Date.now();
import * as _ from '../helpers.js'
// const input = _.readFile('./example.txt').trim();
const input = _.readFile('./input.txt').trim();

// setup
let instructions = new Map();
input
  .split("\n\n")[0]
  .split("\n")
  .map(line => {
    let name = line.substring(0, line.indexOf("{"))
    let steps = line.substring(line.indexOf("{") + 1, line.length - 1).split(",")
      .map(step => {
        let parts = step.split(":")

        let target = "";
        if (parts.length == 1) {
          target = step;
          return { target }
        }
        target = parts[1]

        let instruction = parts[0]
        return {
          target,
          attribute: instruction.charAt(0),
          opperation: instruction.charAt(1),
          num: +instruction.substring(2),
        }
    })
    instructions.set(name, steps)
    return { name, steps }
});

let parts = input
  .split("\n\n")[1]
  .split("\n")
  .map(line => {
    return {
      x: +line.substring(line.indexOf("x=") + 2, line.indexOf(",m=")),
      m: +line.substring(line.indexOf("m=") + 2, line.indexOf(",a=")),
      a: +line.substring(line.indexOf("a=") + 2, line.indexOf(",s=")),
      s: +line.substring(line.indexOf("s=") + 2, line.indexOf("}"))
    }
});

let part1 = _.sum(parts.map(part => {
  let instructionName = 'in'
  let verdict = ''
  while(verdict === '') {
    let steps = instructions.get(instructionName);
    for(let i = 0; i < steps.length; i++) {
      let step = steps[i];
      if(!step.attribute) {
        instructionName = step.target
        i = steps.length
      } else if (step.opperation === "<") {
        if(part[step.attribute] < step.num) {
          instructionName = step.target
          i = steps.length
        }
      } else if (step.opperation === ">") {
        if(part[step.attribute] > step.num) {
          instructionName = step.target
          i = steps.length
        }
      } else {
        console.log(part)
        console.log('error in operationc check')
      }
    }
    if(instructionName === 'A' || instructionName === 'R') {
      verdict = instructionName;
    }
  }

  if(verdict === 'A') { 
    return part.x + part.m + part.a + part.s
  } else {
    return 0;
  }
}))

console.log(`Part 1: ${part1}`)

// Part 2
let ranges = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000],
}

function copyRange(range) {
  return {
    x: [range.x[0], range.x[1]],
    m: [range.m[0], range.m[1]],
    a: [range.a[0], range.a[1]],
    s: [range.s[0], range.s[1]]
  }
}

let instructionsTodo = [ { name: "in", ranges } ];
let acceptedRanges = [];
while(instructionsTodo.length) {
  let currentInstruction = instructionsTodo.splice(0, 1)[0];
  let rangesToCheck = copyRange(currentInstruction.ranges)

  if(currentInstruction.name === 'A') {
    acceptedRanges.push(currentInstruction.ranges)
  } else if (currentInstruction.name !== 'R') {
    instructions.get(currentInstruction.name).forEach(step => {
      if(!step.attribute) {
        instructionsTodo.push({ name: step.target, ranges: copyRange(rangesToCheck) })
      } else if(rangesToCheck[step.attribute][0] < step.num && step.num < rangesToCheck[step.attribute][1]) {
        if (step.opperation === "<") {
          let newRange = copyRange(rangesToCheck);
          newRange[step.attribute][1] = step.num - 1;
          rangesToCheck[step.attribute][0] = step.num
          instructionsTodo.push({ name: step.target, ranges: newRange })
        } else if (step.opperation === ">") {
          let newRange = copyRange(rangesToCheck);
          newRange[step.attribute][0] = step.num + 1;
          rangesToCheck[step.attribute][1] = step.num
          instructionsTodo.push({ name: step.target, ranges: newRange })
        } else {
          console.log(step)
          console.log('error in operationc check')
        }
      }
    })
  }
}

let part2 = _.sum(acceptedRanges.map(r => {
  return (r.x[1] - r.x[0] + 1) * (r.m[1] - r.m[0] + 1) * (r.a[1] - r.a[0] + 1) * (r.s[1] - r.s[0] + 1)
}))

console.log(`Part 2: ${part2}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
