const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
 input = _.readFile('./example2.txt').trim();
// input = _.readFile('./test.txt').trim();
input = _.readFile('./input.txt').trim();

let registerParts = input.split("\n");

let initialMachine = {
  A: +registerParts[0].split(": ")[1],
  B: +registerParts[1].split(": ")[1],
  C: +registerParts[2].split(": ")[1],
  program: registerParts[4].split(": ")[1].split(",").map(i => +i),
  instructionPointer: 0,
  output: [],
}

// manual attempt
// let i = ((((((((((((3*8*8+3)*8+3)*8+0)*8+4)*8+6)*8+3)*8+3)*8+4)*8+7)*8+2)*8+4)*8+0);

// loop over to find a for a matching output starting at the end. 
let checkout = [{ a: 0, indexCheck: 15 }];
let fullMatches = [];
while(checkout.length > 0) {
  let check = checkout.shift();
  // console.log(check)
  for(let j = 0; j < 8; j++) {
    let machine = {...initialMachine, output: []};
    machine.A = check.a + j;
    while(machine.instructionPointer < machine.program.length) {
      let opcode = machine.program[machine.instructionPointer];
      let operand = machine.program[machine.instructionPointer + 1];
    
      // combo operands
      if([0, 2, 5, 6, 7].includes(opcode)) {
        if(operand === 4) {
          operand = machine.A;
        } else if(operand === 5) {
          operand = machine.B;
        } else if(operand === 6) {
          operand = machine.C;
        }
      }
    
      // opcodes
      if(opcode === 0) { // adv
        machine.A = Math.floor(machine.A / Math.pow(2, operand));
      } else if(opcode === 1) { // bxl
        machine.B = (machine.B ^ operand) >>> 0;
      } else if(opcode === 2) { // bst
        machine.B = operand % 8;
      } else if(opcode === 3) { // jnz
        if(machine.A !== 0) {
          machine.instructionPointer = operand - 2; // acount for increasing by 2 always
        }
      } else if(opcode === 4) { // bxc
        machine.B = (machine.B ^ machine.C) >>> 0;
      } else if(opcode === 5) { // out
        machine.output.push(operand % 8);
        if(machine.output.length > machine.program.length) {
          machine.instructionPointer = machine.program.length;
        }
      } else if(opcode === 6) { // bdv
        machine.B = Math.floor(machine.A / Math.pow(2, operand));
      } else if(opcode === 7) { // cdv
        machine.C = Math.floor(machine.A / Math.pow(2, operand));
      }
    
      // increase code by 2
      machine.instructionPointer++;
      machine.instructionPointer++;
    }

    // check if next index matches output
    if(machine.program[check.indexCheck] === machine.output[0]){
      if(check.indexCheck === 0) {
        fullMatches.push(check.a + j); // final match
      } else {
        checkout.push({a: (check.a + j) * 8, indexCheck: check.indexCheck -1, out: machine.output.join(",") }) // push a * 8 (as that would create the same outputs for the outputs already discovered)
      }
    }
  }
}

console.log(`Part 2: ${_.min(fullMatches)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
