const start = Date.now();
import * as _ from '../helpers.js'
// const input = _.readFile('./example.txt').trim();
const input = _.readFile('./input.txt').trim();

let instructions = input
  .split("\n")
  .map(line => {
    let parts = line.split(" ");
    let hexCode = parts[2].substring(2, parts[2].length - 2)
    let d = parts[2].substring(parts[2].length - 2, parts[2].length - 1)
    let direction
    // 0 means R, 1 means D, 2 means L, and 3 means U.
    if(d == '0') {
      direction = 'R'
    } else if(d == '1') {
      direction = 'D'
    }  else if(d == '2') {
      direction = 'L'
    }  else if(d == '3') {
      direction = 'U'
    } 
    return {
      direction,
      length: parseInt(hexCode, 16),
      // Part 1
      // direction: parts[0],
      // length: +parts[1]
    }
  }
);

// create list of points / verticies
let points = [{i: 0, j: 0}];
let currI = 0, currJ = 0;
let edges = 0;
instructions.forEach(instruction => {
  if(instruction.direction == 'R') {
    currJ += instruction.length
  } else if(instruction.direction == 'L') {
    currJ -= instruction.length
  }  else if(instruction.direction == 'U') {
    currI -= instruction.length
  }  else if(instruction.direction == 'D') {
    currI += instruction.length
  } 
  points.push({i:currI, j: currJ})
  edges += instruction.length;
})

// Preform Shoelace / Pick's Theorem
let s = 0;
for(let i = 1; i < points.length; i++) {
  s += (points[i-1].i * points[i].j) - (points[i-1].j * points[i].i)
}
let part2 = Math.abs(s / 2) - (edges * 0.5) + 1 + edges

console.log(`Part 2: ${part2}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
