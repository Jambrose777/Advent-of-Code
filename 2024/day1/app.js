const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

function myFunc(i) {
  return +i;
}

let part1 = _.transposeMatrix(input
  .split("\n")
  .map(line => 
    line.split('   ')
    .map(i => myFunc(i))
  ));

let left = part1[0].sort();
let right = part1[1].sort();

part1 = left.map((l, index) => Math.abs(l - right[index]));
// console.log(part1);
console.log(`Part 1: ${_.sum(part1)}`)

let part2 = left.map(l => l * right.filter(r => r === l).length);
// console.log(part2);
console.log(`Part 2: ${_.sum(part2)}`)

console.log(`Execution time: ${(Date.now() - start)/1000}s`);
