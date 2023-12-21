const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./input.txt').trim();

function myFunc(i) {
  return +i;
}

let part1 = input
  .split("\n")
  .map(line => 
    line.split('')
    // .map(i => _.useCache(myFunc, [i]))
    .map(i => myFunc(i))
  );

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)
// console.log(_.sum(results.map(line => _.sum(line))))
// console.log(`Execution time: ${(Date.now() - start)/1000}s`);
