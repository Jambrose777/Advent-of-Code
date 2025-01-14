const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();
input = _.readFile('./test.txt').trim();

let part2 = input.split("\n");

let keypad = [
  { id: 'A', edges: [{ id: 'A', sequence: 'A' }, { id: '0', sequence: '<A' }, { id: '1', sequence: '^<<A' }, { id: '2', sequence: '^<A' }, { id: '3', sequence: '^A' }, { id: '4', sequence: '^^<<A' }, { id: '5', sequence: '^^<A' }, { id: '6', sequence: '^^A' }, { id: '7', sequence: '^^^<<A' }, { id: '8', sequence: '<^^^A' }, { id: '9', sequence: '^^^A' }] },
  { id: '0', edges: [{ id: 'A', sequence: '>A' }, { id: '0', sequence: 'A' }, { id: '1', sequence: '^<A' }, { id: '2', sequence: '^A' }, { id: '3', sequence: '>^A' }, { id: '4', sequence: '^^<A' }, { id: '5', sequence: '^^A' }, { id: '6', sequence: '^^>A' }, { id: '7', sequence: '^^^<A' }, { id: '8', sequence: '^^^A' }, { id: '9', sequence: '^^^>A' }] },
  { id: '1', edges: [{ id: 'A', sequence: '>>vA' }, { id: '0', sequence: '>vA' }, { id: '1', sequence: 'A' }, { id: '2', sequence: '>A' }, { id: '3', sequence: '>>A' }, { id: '4', sequence: '^A' }, { id: '5', sequence: '^>A' }, { id: '6', sequence: '^>>A' }, { id: '7', sequence: '^^A' }, { id: '8', sequence: '^^>A' }, { id: '9', sequence: '^^>>A' }] },
  { id: '2', edges: [{ id: 'A', sequence: '>vA' }, { id: '0', sequence: 'vA' }, { id: '1', sequence: '<A' }, { id: '2', sequence: 'A' }, { id: '3', sequence: '>A' }, { id: '4', sequence: '^<A' }, { id: '5', sequence: '^A' }, { id: '6', sequence: '^>A' }, { id: '7', sequence: '^^<A' }, { id: '8', sequence: '^^A' }, { id: '9', sequence: '^^>A' }] },
  { id: '3', edges: [{ id: 'A', sequence: 'vA' }, { id: '0', sequence: 'v<A' }, { id: '1', sequence: '<<A' }, { id: '2', sequence: '<A' }, { id: '3', sequence: 'A' }, { id: '4', sequence: '<<^A' }, { id: '5', sequence: '<^A' }, { id: '6', sequence: '^A' }, { id: '7', sequence: '<<^^A' }, { id: '8', sequence: '^^<A' }, { id: '9', sequence: '^^A' }] },
  { id: '4', edges: [{ id: 'A', sequence: '>>vvA' }, { id: '0', sequence: '>vvA' }, { id: '1', sequence: 'vA' }, { id: '2', sequence: 'v>A' }, { id: '3', sequence: '>>vA' }, { id: '4', sequence: 'A' }, { id: '5', sequence: '>A' }, { id: '6', sequence: '>>A' }, { id: '7', sequence: '^A' }, { id: '8', sequence: '>^A' }, { id: '9', sequence: '>>^A' }] },
  { id: '5', edges: [{ id: 'A', sequence: 'vv>A' }, { id: '0', sequence: 'vvA' }, { id: '1', sequence: 'v<A' }, { id: '2', sequence: 'vA' }, { id: '3', sequence: 'v>A' }, { id: '4', sequence: '<A' }, { id: '5', sequence: 'A' }, { id: '6', sequence: '>A' }, { id: '7', sequence: '<^A' }, { id: '8', sequence: '^A' }, { id: '9', sequence: '^>A' }] },
  { id: '6', edges: [{ id: 'A', sequence: 'vvA' }, { id: '0', sequence: 'vv<A' }, { id: '1', sequence: 'v<<A' }, { id: '2', sequence: 'v<A' }, { id: '3', sequence: 'vA' }, { id: '4', sequence: '<<A' }, { id: '5', sequence: '<A' }, { id: '6', sequence: 'A' }, { id: '7', sequence: '^<<A' }, { id: '8', sequence: '^<A' }, { id: '9', sequence: '^A' }] },
  { id: '7', edges: [{ id: 'A', sequence: '>>vvvA' }, { id: '0', sequence: '>vvvA' }, { id: '1', sequence: 'vvA' }, { id: '2', sequence: 'vv>A' }, { id: '3', sequence: 'vv>>A' }, { id: '4', sequence: 'vA' }, { id: '5', sequence: 'v>A' }, { id: '6', sequence: 'v>>A' }, { id: '7', sequence: 'A' }, { id: '8', sequence: '>A' }, { id: '9', sequence: '>>A' }] },
  { id: '8', edges: [{ id: 'A', sequence: '>vvvA' }, { id: '0', sequence: 'vvvA' }, { id: '1', sequence: 'vv<A' }, { id: '2', sequence: 'vvA' }, { id: '3', sequence: 'vv>A' }, { id: '4', sequence: 'v<A' }, { id: '5', sequence: 'vA' }, { id: '6', sequence: 'v>A' }, { id: '7', sequence: '<A' }, { id: '8', sequence: 'A' }, { id: '9', sequence: '>A' }] },
  { id: '9', edges: [{ id: 'A', sequence: 'vvvA' }, { id: '0', sequence: 'vvv<A' }, { id: '1', sequence: 'vv<<A' }, { id: '2', sequence: 'vv<A' }, { id: '3', sequence: 'vvA' }, { id: '4', sequence: 'v<<A' }, { id: '5', sequence: 'v<A' }, { id: '6', sequence: 'vA' }, { id: '7', sequence: '<<A' }, { id: '8', sequence: '<A' }, { id: '9', sequence: 'A' }] },
]

let dirPad = [
  { id: 'A', edges: [{ id: 'A', sequence: 'A' }, { id: '^', sequence: '<A' }, { id: '>', sequence: 'vA' }, { id: 'v', sequence: '<vA' }, { id: '<', sequence: 'v<<A' }] },
  { id: '^', edges: [{ id: 'A', sequence: '>A' }, { id: '^', sequence: 'A' }, { id: '>', sequence: 'v>A' }, { id: 'v', sequence: 'vA' }, { id: '<', sequence: 'v<A' }] },
  { id: '>', edges: [{ id: 'A', sequence: '^A' }, { id: '^', sequence: '^<A' }, { id: '>', sequence: 'A' }, { id: 'v', sequence: '<A' }, { id: '<', sequence: '<<A' }] },
  { id: 'v', edges: [{ id: 'A', sequence: '^>A' }, { id: '^', sequence: '^A' }, { id: '>', sequence: '>A' }, { id: 'v', sequence: 'A' }, { id: '<', sequence: '<A' }] },
  { id: '<', edges: [{ id: 'A', sequence: '>>^A' }, { id: '^', sequence: '>^A' }, { id: '>', sequence: '>>A' }, { id: 'v', sequence: '>A' }, { id: '<', sequence: 'A' }] },
]

let sequences = part2.map(line => {
  let code = ["A", ...line.split('')]
  let newSequence = "";
  code.forEach((key, index) => {
    if(index !== code.length - 1) {
      newSequence += keypad.find(k => k.id === key).edges.find(e => e.id === code[index+1]).sequence;
    } 
  })
  return newSequence;
})

sequences = sequences.map(line => {
  let code = ["A", ...line.split('')]
  let len = 0;
  code.forEach((key, index) => {
    if(index !== code.length - 1) {
      len += _.useCache(findLength, [key, code[index+1], 25, dirPad])
    } 
  })
  return len;
})

function findLength(key, nextKey, depth, dirPad) {
  let nextS = dirPad.find(k => k.id === key).edges.find(e => e.id === nextKey).sequence;
  if (depth === 1) {
    return nextS.length;
  } else {
    let code = ["A", ...nextS.split('')]
    let len = 0;
    code.forEach((key2, index) => {
      if(index !== code.length - 1) {
        len += _.useCache(findLength, [key2, code[index+1], depth - 1, dirPad])
      } 
    })
    if(key === "A" && nextKey === "v") {
      let code = ["A", "v","<","A"]
      let len2 = 0;
      code.forEach((key2, index) => {
        if(index !== code.length - 1) {
          len2 += _.useCache(findLength, [key2, code[index+1], depth - 1, dirPad])
        } 
      })
      return _.min([len, len2]);
    } else if(key === "v" && nextKey === "A") {
      let code = ["A", ">","^","A"]
      let len2 = 0;
      code.forEach((key2, index) => {
        if(index !== code.length - 1) {
          len2 += _.useCache(findLength, [key2, code[index+1], depth - 1, dirPad])
        } 
      })
      return _.min([len, len2]);
    } else {
      return len;
    }
  }
}

let answers = part2.map((line, index) => {
  // console.log(+line.substring(0, line.length - 1), sequences[index])
  return +line.substring(0, line.length - 1) * sequences[index]
})

// _.getCache().forEach((v, i) => {console.log(i.substring(0, 11), v)})

console.log(`Part 2: ${_.sum(answers)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
