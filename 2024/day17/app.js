const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./test.txt').trim();
input = _.readFile('./input.txt').trim();

let registerParts = input.split("\n");

let machine = {
  A: +registerParts[0].split(": ")[1],
  B: +registerParts[1].split(": ")[1],
  C: +registerParts[2].split(": ")[1],
  program: registerParts[4].split(": ")[1].split(",").map(i => +i),
  instructionPointer: 0,
  output: [],
}

while(machine.instructionPointer < machine.program.length) {
  let opcode = machine.program[machine.instructionPointer];
  let operand = machine.program[machine.instructionPointer + 1];
  // console.log(opcode, operand)

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
    machine.B = machine.B ^ operand;
  } else if(opcode === 2) { // bst
    machine.B = operand % 8;
  } else if(opcode === 3) { // jnz
    if(machine.A !== 0) {
      machine.instructionPointer = operand - 2; // acount for increasing by 2 always
    }
  } else if(opcode === 4) { // bxc
    machine.B = machine.B ^ machine.C;
  } else if(opcode === 5) { // out
    machine.output.push(operand % 8);
  } else if(opcode === 6) { // bdv
    machine.B = Math.floor(machine.A / Math.pow(2, operand));
  } else if(opcode === 7) { // cdv
    machine.C = Math.floor(machine.A / Math.pow(2, operand));
  }

  // increase code by 2
  machine.instructionPointer++;
  machine.instructionPointer++;
}

console.log(`Part 1: ${machine.output.join(",")}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
