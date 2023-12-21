const start = Date.now();
import * as _ from '../helpers.js'
// const input = _.readFile('./example.txt').trim();
const input = _.readFile('./input.txt').trim();

// Part 1
let part1 = _.sum(input
  .split("\n")
  .map(line => {
    // Strip String of non numbers
    line = line.match(/^\d+|\d+\b|\d+(?=\w)/g)?.join("");

    // Only use 1st and last number and convert to a number
    return line ? +(line[0] + line[line.length - 1]) : 0
  }));

// Part 2
let part2 = _.sum(input
  .split("\n")
  .map(line => {
    // replace all strings with string with number (accounting for overlap eightwo => 82)
    line = line.replaceAll('one', 'o1ne')
      .replaceAll('two', 't2wo')
      .replaceAll('three', 't3hree')
      .replaceAll('four', 'f4our')
      .replaceAll('five', 'f5ive')
      .replaceAll('six', 's6ix')
      .replaceAll('seven', 's7even')
      .replaceAll('eight', 'e8ight')
      .replaceAll('nine', 'n9ine')

    // Strip String of non numbers
    line = line.match(/^\d+|\d+\b|\d+(?=\w)/g).join("");

    // Only use 1st and last number and convert to a number
    return +(line[0] + line[line.length - 1])
  }));

console.log(`Part 1: ${part1}`)
console.log(`Part 2: ${part2}`)
// console.log(_.sum(results.map(line => _.sum(line))))
console.log(`Execution time: ${(Date.now() - start) / 1000}s`);
