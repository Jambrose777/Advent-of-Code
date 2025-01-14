const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let part1 = input.split("\n");

let keypad = [
  { id: 'A', edges: [{ id: 'A', sequence: 'A' }, { id: '0', sequence: '<A' }, { id: '1', sequence: '^<<A' }, { id: '2', sequence: '^<A' }, { id: '3', sequence: '^A' }, { id: '4', sequence: '^^<<A' }, { id: '5', sequence: '^^<A' }, { id: '6', sequence: '^^A' }, { id: '7', sequence: '^^^<<A' }, { id: '8', sequence: '<^^^A' }, { id: '9', sequence: '^^^A' }] },
  { id: '0', edges: [{ id: 'A', sequence: '>A' }, { id: '0', sequence: 'A' }, { id: '1', sequence: '^<A' }, { id: '2', sequence: '^A' }, { id: '3', sequence: '>^A' }, { id: '4', sequence: '^^<A' }, { id: '5', sequence: '^^A' }, { id: '6', sequence: '^^>A' }, { id: '7', sequence: '^^^<A' }, { id: '8', sequence: '^^^A' }, { id: '9', sequence: '^^^>A' }] },
  { id: '1', edges: [{ id: 'A', sequence: '>>vA' }, { id: '0', sequence: '>vA' }, { id: '1', sequence: 'A' }, { id: '2', sequence: '>A' }, { id: '3', sequence: '>>A' }, { id: '4', sequence: '^A' }, { id: '5', sequence: '^>A' }, { id: '6', sequence: '>>^A' }, { id: '7', sequence: '^^A' }, { id: '8', sequence: '^^>A' }, { id: '9', sequence: '^^>>A' }] },
  { id: '2', edges: [{ id: 'A', sequence: '>vA' }, { id: '0', sequence: 'vA' }, { id: '1', sequence: '<A' }, { id: '2', sequence: 'A' }, { id: '3', sequence: '>A' }, { id: '4', sequence: '^<A' }, { id: '5', sequence: '^A' }, { id: '6', sequence: '^>A' }, { id: '7', sequence: '^^<A' }, { id: '8', sequence: '^^A' }, { id: '9', sequence: '>^^A' }] },
  { id: '3', edges: [{ id: 'A', sequence: 'vA' }, { id: '0', sequence: 'v<A' }, { id: '1', sequence: '<<A' }, { id: '2', sequence: '<A' }, { id: '3', sequence: 'A' }, { id: '4', sequence: '<<^A' }, { id: '5', sequence: '<^A' }, { id: '6', sequence: '^A' }, { id: '7', sequence: '<<^^A' }, { id: '8', sequence: '^^<A' }, { id: '9', sequence: '^^A' }] },
  { id: '4', edges: [{ id: 'A', sequence: '>>vvA' }, { id: '0', sequence: '>vvA' }, { id: '1', sequence: 'vA' }, { id: '2', sequence: 'v>A' }, { id: '3', sequence: '>>vA' }, { id: '4', sequence: 'A' }, { id: '5', sequence: '>A' }, { id: '6', sequence: '>>A' }, { id: '7', sequence: '^A' }, { id: '8', sequence: '>^A' }, { id: '9', sequence: '>>^A' }] },
  { id: '5', edges: [{ id: 'A', sequence: 'vv>A' }, { id: '0', sequence: 'vvA' }, { id: '1', sequence: 'v<A' }, { id: '2', sequence: 'vA' }, { id: '3', sequence: 'v>A' }, { id: '4', sequence: '<A' }, { id: '5', sequence: 'A' }, { id: '6', sequence: '>A' }, { id: '7', sequence: '<^A' }, { id: '8', sequence: '^A' }, { id: '9', sequence: '^>A' }] },
  { id: '6', edges: [{ id: 'A', sequence: 'vvA' }, { id: '0', sequence: 'vv<A' }, { id: '1', sequence: 'v<<A' }, { id: '2', sequence: 'v<A' }, { id: '3', sequence: 'vA' }, { id: '4', sequence: '<<A' }, { id: '5', sequence: '<A' }, { id: '6', sequence: 'A' }, { id: '7', sequence: '^<<A' }, { id: '8', sequence: '^<A' }, { id: '9', sequence: '^A' }] },
  { id: '7', edges: [{ id: 'A', sequence: '>>vvvA' }, { id: '0', sequence: '>vvvA' }, { id: '1', sequence: 'vvA' }, { id: '2', sequence: 'vv>A' }, { id: '3', sequence: 'vv>>A' }, { id: '4', sequence: 'vA' }, { id: '5', sequence: 'v>A' }, { id: '6', sequence: 'v>>A' }, { id: '7', sequence: 'A' }, { id: '8', sequence: '>A' }, { id: '9', sequence: '>>A' }] },
  { id: '8', edges: [{ id: 'A', sequence: '>vvvA' }, { id: '0', sequence: 'vvvA' }, { id: '1', sequence: 'vv<A' }, { id: '2', sequence: 'vvA' }, { id: '3', sequence: 'vv>A' }, { id: '4', sequence: 'v<A' }, { id: '5', sequence: 'vA' }, { id: '6', sequence: 'v>A' }, { id: '7', sequence: '<A' }, { id: '8', sequence: 'A' }, { id: '9', sequence: '>A' }] },
  { id: '9', edges: [{ id: 'A', sequence: 'vvvA' }, { id: '0', sequence: 'vvv<A' }, { id: '1', sequence: 'vv<<A' }, { id: '2', sequence: 'vv<A' }, { id: '3', sequence: 'vvA' }, { id: '4', sequence: 'v<<A' }, { id: '5', sequence: 'v<A' }, { id: '6', sequence: 'vA' }, { id: '7', sequence: '<<A' }, { id: '8', sequence: '<A' }, { id: '9', sequence: 'A' }] },
]

let dirPad = [
  { id: 'A', edges: [{ id: 'A', sequence: 'A' }, { id: '^', sequence: '<A' }, { id: '>', sequence: 'vA' }, { id: 'v', sequence: 'v<A' }, { id: '<', sequence: 'v<<A' }] },
  { id: '^', edges: [{ id: 'A', sequence: '>A' }, { id: '^', sequence: 'A' }, { id: '>', sequence: 'v>A' }, { id: 'v', sequence: 'vA' }, { id: '<', sequence: 'v<A' }] },
  { id: '>', edges: [{ id: 'A', sequence: '^A' }, { id: '^', sequence: '^<A' }, { id: '>', sequence: 'A' }, { id: 'v', sequence: '<A' }, { id: '<', sequence: '<<A' }] },
  { id: 'v', edges: [{ id: 'A', sequence: '>^A' }, { id: '^', sequence: '^A' }, { id: '>', sequence: '>A' }, { id: 'v', sequence: 'A' }, { id: '<', sequence: '<A' }] },
  { id: '<', edges: [{ id: 'A', sequence: '>>^A' }, { id: '^', sequence: '>^A' }, { id: '>', sequence: '>>A' }, { id: 'v', sequence: '>A' }, { id: '<', sequence: 'A' }] },
]

let sequences = part1.map(line => {
  let code = ["A", ...line.split('')]
  let newSequence = "";
  code.forEach((key, index) => {
    if(index !== code.length - 1) {
      newSequence += keypad.find(k => k.id === key).edges.find(e => e.id === code[index+1]).sequence;
    } 
  })
  // console.log(newSequence)
  return newSequence;
}).map(line => {
  let code = ["A", ...line.split('')]
  let newSequence = "";
  code.forEach((key, index) => {
    if(index !== code.length - 1) {
      newSequence += dirPad.find(k => k.id === key).edges.find(e => e.id === code[index+1]).sequence;
    } 
  })
  // console.log(newSequence)
  return newSequence;
}).map(line => {
  let code = ["A", ...line.split('')]
  let newSequence = "";
  code.forEach((key, index) => {
    if(index !== code.length - 1) {
      newSequence += dirPad.find(k => k.id === key).edges.find(e => e.id === code[index+1]).sequence;
    } 
  })
  // console.log(newSequence)
  return newSequence;
});

let answers = part1.map((line, index) => {
  console.log(+line.substring(0, line.length - 1), sequences[index].length)
  return +line.substring(0, line.length - 1) * sequences[index].length
})

console.log(`Part 1: ${_.sum(answers)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
