const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

function myFunc(i) {
  return +i;
}

// split line to correct parts
let equations = input
  .split("\n")
  .map(line => 
    {
      let parts = line.split('\: ');
      return { solution: +parts[0], equation: parts[1].split(" ").map(n => myFunc(n)) }
    }
  );

let part1 = equations.filter(eq => {
  // set up full equations
  let remainingNumbers = [...eq.equation];
  let numbers = [remainingNumbers.shift()];
  let fullEquations = [{ numbers, operations: [], remainingNumbers }];
  while(fullEquations.filter(fe => fe.remainingNumbers.length > 0).length > 0) {
    for(let i = 0; i < fullEquations.length; i++) {
      if(fullEquations[i].remainingNumbers.length > 0) {
        let newNumber = fullEquations[i].remainingNumbers.shift();
        fullEquations.push({ 
          numbers: [...fullEquations[i].numbers, newNumber], 
          operations: [...fullEquations[i].operations, "add"], 
          remainingNumbers: [...fullEquations[i].remainingNumbers]
        })
        // part 2
        fullEquations.push({ 
          numbers: [...fullEquations[i].numbers, newNumber], 
          operations: [...fullEquations[i].operations, "||"], 
          remainingNumbers: [...fullEquations[i].remainingNumbers]
        })
        fullEquations[i].numbers.push(newNumber);
        fullEquations[i].operations.push("mult");
      }
    }
  }

  // check full equation can be correct
  return fullEquations.reduce((isEqual, fe) => {
    let check = (fe.numbers.reduce((total, n, index) => {
      if(index === 0) {
        return total + n;
      }else if(fe.operations[index - 1] === "add") {
        return total + n;
        // part 2
      }else if (fe.operations[index - 1] === "||") {
        return +(total + "" + n);
      } else {
        return total * n;
      }
    }, 0) === eq.solution)
    // console.log(eq.solution)
  return isEqual || check; 
}, false);
  // console.log(fullEquations);
}).map(eq => eq.solution);

console.log(`Part 1: ${_.sum(part1)}`);

// part 2 is denoted by 2 comments
// console.log(`Part 2: ${part2}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
