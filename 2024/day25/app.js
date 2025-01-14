const startTime = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let keys = [];
let locks = [];

input.split("\n\n").forEach(grid => {
  let heights = _.transposeMatrix(grid.split("\n").map(line => line.split("")))
    .map(line => line.filter(point => point === "#").length - 1);
  if(grid.charAt(0) === ".") {
    keys.push(heights);
  } else {
    locks.push(heights);
  }
})

let fits = 0;
keys.forEach(key => {
  locks.forEach(lock => {
    let overlap = false;
    for(let i = 0; i < key.length; i++) {
      if(key[i] + lock[i] > 5) {
        overlap = true;
        i = key.length;
      }
    }
    if (!overlap) fits++;
  })
})

console.log(`Part 1: ${fits}`);
console.log(`Execution time: ${(Date.now() - startTime)/1000}s`);
