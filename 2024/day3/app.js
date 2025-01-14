const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./example2.txt').trim();
input = _.readFile('./input.txt').trim();

function multipliesNumbers(scramble) {
  if(scramble.indexOf(")") === -1 || scramble.indexOf(")") > 7) {
    return 0;
  }
  let numbers = scramble.substring(0, scramble.indexOf(")")).split(",");
  if(numbers.length != 2 || !numbers[0].match(/^[0-9]*$/)  || !numbers[1].match(/^[0-9]*$/) || +numbers[0] > 1000 || +numbers[1] > 1000) {
    return 0;
  }
  return +numbers[0] * +numbers[1];
}

let part1 = input.split("mul(");
let part2Check = part1.shift(); //remove everything befor first instance

part1 = part1.map(scramble => {
  return multipliesNumbers(scramble);
});

console.log(`Part 1: ${_.sum(part1)}`);

function checkEnablement(currentlyEnabled, scramble) {
  let doIndex = scramble.lastIndexOf("do()");
  let dontIndex = scramble.lastIndexOf("don't()");
  // console.log(scramble, " - ", doIndex, " - ", dontIndex);
  if (doIndex > 0 || dontIndex > 0) {
    return doIndex > dontIndex ? true : false
  }
  return currentlyEnabled;
}

let multiplyEnabled = true;
let part2 = input.split("mul(").map((scramble, index) => {
  let newMultiplyEnabled = checkEnablement(multiplyEnabled, scramble);
  if(index === 0 || !multiplyEnabled) {
    multiplyEnabled = newMultiplyEnabled; // change after check
    return 0; // no mult first index or when disabled;
  }
  multiplyEnabled = newMultiplyEnabled; // change after check
  return multipliesNumbers(scramble);
});

console.log(`Part 2: ${_.sum(part2)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
