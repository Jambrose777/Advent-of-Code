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
    // .map(i => myFunc(i))
  );

let count = 0;
for(let i = 0; i < part1.length; i++) {
  for(let j = 0; j < part1[0].length; j++) {
    if (part1[i][j] === 'X') {
      // right
      if(_.checkArrayBounds(part1, i, j+1) && part1[i][j+1] === 'M' &&
      _.checkArrayBounds(part1, i, j+2) && part1[i][j+2] === 'A' &&
      _.checkArrayBounds(part1, i, j+3) && part1[i][j+3] === 'S'){
        count++;
      }
      // left
      if(_.checkArrayBounds(part1, i, j-1) && part1[i][j-1] === 'M' &&
      _.checkArrayBounds(part1, i, j-2) && part1[i][j-2] === 'A' &&
      _.checkArrayBounds(part1, i, j-3) && part1[i][j-3] === 'S'){
        count++;
      }
      // up
      if(_.checkArrayBounds(part1, i - 1, j) && part1[i - 1][j] === 'M' &&
      _.checkArrayBounds(part1, i - 2, j) && part1[i - 2][j] === 'A' &&
      _.checkArrayBounds(part1, i - 3, j) && part1[i - 3][j] === 'S'){
        count++;
      }
      // down
      if(_.checkArrayBounds(part1, i + 1, j) && part1[i + 1][j] === 'M' &&
      _.checkArrayBounds(part1, i + 2, j) && part1[i + 2][j] === 'A' &&
      _.checkArrayBounds(part1, i + 3, j) && part1[i + 3][j] === 'S'){
        count++;
      }
      // up left
      if(_.checkArrayBounds(part1, i - 1, j-1) && part1[i - 1][j-1] === 'M' &&
      _.checkArrayBounds(part1, i - 2, j-2) && part1[i - 2][j-2] === 'A' &&
      _.checkArrayBounds(part1, i - 3, j-3) && part1[i - 3][j-3] === 'S'){
        count++;
      }
      // up right
      if(_.checkArrayBounds(part1, i - 1, j+1) && part1[i - 1][j+1] === 'M' &&
      _.checkArrayBounds(part1, i - 2, j+2) && part1[i - 2][j+2] === 'A' &&
      _.checkArrayBounds(part1, i - 3, j+3) && part1[i - 3][j+3] === 'S'){
        count++;
      }
      // down right
      if(_.checkArrayBounds(part1, i + 1, j+1) && part1[i + 1][j+1] === 'M' &&
      _.checkArrayBounds(part1, i + 2, j+2) && part1[i + 2][j+2] === 'A' &&
      _.checkArrayBounds(part1, i + 3, j+3) && part1[i + 3][j+3] === 'S'){
        count++;
      }
      // down left
      if(_.checkArrayBounds(part1, i + 1, j-1) && part1[i + 1][j-1] === 'M' &&
      _.checkArrayBounds(part1, i + 2, j-2) && part1[i + 2][j-2] === 'A' &&
      _.checkArrayBounds(part1, i + 3, j-3) && part1[i + 3][j-3] === 'S'){
        count++;
      }
    }
  }
}

console.log(`Part 1: ${count}`);

let count2 = 0;
for(let i = 0; i < part1.length; i++) {
  for(let j = 0; j < part1[0].length; j++) {
    if (part1[i][j] === 'A') {
      // right
      if(_.checkArrayBounds(part1, i-1, j-1) && part1[i-1][j-1] === 'M' &&
      _.checkArrayBounds(part1, i+1, j+1) && part1[i+1][j+1] === 'S' &&
      _.checkArrayBounds(part1, i-1, j+1) && part1[i-1][j+1] === 'M' &&
      _.checkArrayBounds(part1, i+1, j-1) && part1[i+1][j-1] === 'S'){
        count2++;
      }
      // right
      if(_.checkArrayBounds(part1, i-1, j-1) && part1[i-1][j-1] === 'M' &&
      _.checkArrayBounds(part1, i+1, j+1) && part1[i+1][j+1] === 'S' &&
      _.checkArrayBounds(part1, i-1, j+1) && part1[i-1][j+1] === 'S' &&
      _.checkArrayBounds(part1, i+1, j-1) && part1[i+1][j-1] === 'M'){
        count2++;
      }
      // right
      if(_.checkArrayBounds(part1, i-1, j-1) && part1[i-1][j-1] === 'S' &&
      _.checkArrayBounds(part1, i+1, j+1) && part1[i+1][j+1] === 'M' &&
      _.checkArrayBounds(part1, i-1, j+1) && part1[i-1][j+1] === 'M' &&
      _.checkArrayBounds(part1, i+1, j-1) && part1[i+1][j-1] === 'S'){
        count2++;
      }
      // right
      if(_.checkArrayBounds(part1, i-1, j-1) && part1[i-1][j-1] === 'S' &&
      _.checkArrayBounds(part1, i+1, j+1) && part1[i+1][j+1] === 'M' &&
      _.checkArrayBounds(part1, i-1, j+1) && part1[i-1][j+1] === 'S' &&
      _.checkArrayBounds(part1, i+1, j-1) && part1[i+1][j-1] === 'M'){
        count2++;
      }
    }
  }
}

// let part2 = part1;

console.log(`Part 2: ${count2}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
