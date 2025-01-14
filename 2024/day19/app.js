const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let towels = input.split("\n\n")[0].split(", ");
let patterns = input.split("\n\n")[1].split("\n");
let part2 = patterns.map(p => _.useCache(matches, [towels, p]));

function matches(towels, pattern) {
  let potentialMatches = [];
  let totalMatches = 0;
  for(let i = 0; i < towels.length; i++) {
    // console.log(pattern)
    if(pattern.substring(0, towels[i].length) === towels[i]) {
      if(pattern.length === towels[i].length) {
        totalMatches++;
      } else {
        potentialMatches.push(pattern.substring(towels[i].length));
      }
    }
  }

  for(let i = 0; i < potentialMatches.length; i++) {
    totalMatches += _.useCache(matches, [towels, potentialMatches[i]]);
  }
  return totalMatches;
}

console.log(`Part 1: ${part2.reduce((agg, p) => p > 0 ? agg + 1 : agg, 0)}`);
console.log(`Part 2: ${_.sum(part2)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
