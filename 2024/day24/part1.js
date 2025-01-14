const startTime = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./example2.txt').trim();
input = _.readFile('./input.txt').trim();

let wires = input
  .split("\n\n")[0]
  .split("\n")
  .map(line => ({ id: line.split(': ')[0], value: line.split(': ')[1] === "1"}));

let gates = input
  .split("\n\n")[1]
  .split("\n")
  .map(line => {
    let parts1 = line.split(" -> ");
    let parts2 = parts1[0].split(" ");
    return { inputs: [parts2[0], parts2[2]], operation: parts2[1], output: parts1[1], done: false }
  })

// run through all gates
while(gates.length > 0) {
  gates.forEach(gate => {
    let input1 = wires.find(wire => wire.id === gate.inputs[0]);
    let input2 = wires.find(wire => wire.id === gate.inputs[1]);
    if(!!input1 && !!input2) {
      let value;
      if(gate.operation === "OR") {
        value = input1.value || input2.value;
      } else if (gate.operation === "AND") {
        value = input1.value && input2.value;
      } else if (gate.operation === "XOR") {
        value =  (input1.value && !input2.value) || (!input1.value && input2.value);
      } else {
        console.log("error operation: ", operation)
      }
      wires.push({ id: gate.output, value})
      gate.done = true;
    }
  });

  // sanity check
  if(gates.filter(g => g.done).length === 0) {
    console.log("gates loop")
  }

  // remove done gates
  gates = gates.filter(g => !g.done);
}

let zWires = wires.filter(w => w.id.substring(0,1) === "z").sort((a, b) => a.id < b.id ? -1 : 1).reduce((z, w) => (w.value ? "1" : "0") + z, "");
console.log(`Part 1: ${parseInt(zWires, 2)}`);

let xWires = wires.filter(w => w.id.substring(0,1) === "x").sort((a, b) => a.id < b.id ? -1 : 1).reduce((x, w) => (w.value ? "1" : "0") + x, "");
let yWires = wires.filter(w => w.id.substring(0,1) === "y").sort((a, b) => a.id < b.id ? -1 : 1).reduce((y, w) => (w.value ? "1" : "0") + y, "");

// console.log("x", xWires)
// console.log("y", yWires)
let correctZ = (parseInt(xWires, 2) + parseInt(yWires, 2)).toString(2)
console.log("correctZ", correctZ)
console.log("actualZ ", zWires)

let incorrectIndexes = []
for(let i = 0; i < correctZ.length; i++) {
  if(correctZ.charAt(i) !== zWires.charAt(i)) {
    incorrectIndexes.push(i)
  }
}
let incorrectWires = incorrectIndexes.map(i => ({ wire: "z"+("" + i).padStart(2, '0'), expected: correctZ.charAt(i) === "1"}))

let gates2 = input
  .split("\n\n")[1]
  .split("\n")
  .map(line => {
    let parts1 = line.split(" -> ");
    let parts2 = parts1[0].split(" ");
    return { inputs: [parts2[0], parts2[2]], operation: parts2[1], output: parts1[1], done: false }
  })

console.log()
// let potentialSwaps = [];
// gates2.forEach(g => {
//   let incorrect = incorrectWires.find(w => w.wire === g.output);
//   if(!!incorrect) {
//     potentialSwaps.push([g.output, ...findPotentialSwaps(g.output, incorrect.expected)])
//   }
// })
// potentialSwaps = potentialSwaps.map(swap => )

// function findPotentialSwaps(wire, expected) {
//   if(wire.charAt(0) == "y" || wire.charAt(0) == "x") {
//     return [];
//   } else {
//     let gate = gates2.find(g => g.output === wire);
//     if(g.operation === "AND") {
//       if(expected) {
        
//       }
//     }
//     return [...gate.inputs.filter(w => w.charAt(0) !== "y" && w.charAt(0) !== "x"), ...findPotentialSwaps(gate.inputs[0]), ...findPotentialSwaps(gate.inputs[1])]
//   }
// }
// potentialSwaps = potentialSwaps.map(swap => swap.filter((con, index) => swap.findIndex(c => c === con) === index)).sort((a, b) => a.length - b.length)
// console.log(potentialSwaps)
// let swaps = [["z07"]];

// console.log(gates2.filter(g => g.done).length)
// console.log(`Part 2: ${part2}`);
// console.log(`Execution time: ${(Date.now() - startTime)/1000}s`);
