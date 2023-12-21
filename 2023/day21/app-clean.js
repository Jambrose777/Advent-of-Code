const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./input.txt').trim();

let part1;
resetPart1();
function resetPart1() {
  part1 =  input
  .split("\n")
  .map(line => 
    line.split('')
    .map(space => ({current: space, next: ''}))
  );
}

function expandGrid() {
  let expansion = input
    .split("\n")
    .map(line => 
      line.split('')
        .map(space => ({current: space === 'S' ? '.' : space, next: ''}))
    );
    let numRows = 0;
  part1 = part1.map((row, i) => {
    numRows++
    return JSON.parse(JSON.stringify(expansion[i % expansion.length])).concat(row).concat(JSON.parse(JSON.stringify(expansion[i % expansion.length])))
  })

  let numAdditions =  numRows / expansion.length + 2
  let newExpansionRows = JSON.parse(JSON.stringify(expansion))
  for(let i = 1; i < numAdditions; i ++) {
    newExpansionRows = newExpansionRows.map((row, i) => {
      return row.concat(JSON.parse(JSON.stringify(expansion[i])))
    })
  }
  part1 = newExpansionRows.concat(part1).concat(JSON.parse(JSON.stringify(newExpansionRows)))
}

function takeStep() {
  part1.map((row, i) => {
    row.map((space, j) => {
      if(space.current === 'O') {
        let setToCheck = [
          {i: i + 1, j},
          {i: i - 1, j},
          {i, j: j + 1},
          {i, j: j - 1},
        ]
  
        setToCheck.forEach(set => {
          if(_.checkArrayBounds(part1, set.i, set.j) && part1[set.i][set.j].current !== '#') {
            part1[set.i][set.j].next = 'O'
          }
        })
        space.current = '.'
      }
    })
  })
  
  part1.map((row, i) => {
    row.map((space, j) => {
      if(space.next === 'O') {
        space.current = 'O'
      } else if (space.current === 'O') {
        space.current = '.'
      }
      space.next = ''
    })
  })
}

function checkNeedExpand() {
  for(let i = 0; i < part1.length; i ++) {
    if(part1[i][0].current === 'O' || part1[i][part1[i].length - 1].current === 'O' ) {
      return true;
    }
  }
  for(let i = 0; i < part1[0].length; i ++) {
    if(part1[0][i].current === 'O' || part1[part1.length - 1][i].current === 'O' ) {
      return true;
    }
  }
  return false;
}

// make grid that only expands twice
// steps to do so is 65 + 2 * 131 (327)
part1[(part1.length - 1) / 2][(part1.length - 1) / 2].current = 'O'
for(let i = 0; i < 327; i++) {
  if(checkNeedExpand()) {
    expandGrid()
  }
  takeStep();
}

// split up big grid into sections of the original length
let splits = [];
// part1 = part1.map(r => r.map(e => e.current).join(""))
for(let i = 0; i < 5; i++) {
  let row = [];
  for(let j = 0; j < 5; j++) {
    let e = [];
    for(let k = i * 131; k < (i + 1) * 131; k++) {
      let eRow = []
      for(let l = j * 131; l < (j + 1) * 131; l++) {
        eRow.push(part1[k][l].current)
      }
      e.push(eRow);
    }
    row.push(e)
  }
  splits.push(row)
}

let splitSums = splits.map(row => row.map(col => _.sum(col.map(r => r.filter(e => e === 'O').length))))

let steps = 26501365;
let radius = (steps - 65) / 131
let numberOfDiagonals = radius - 1;
let evens = 0;
let odds = 0;
if(radius % 2 === 1) {
  odds = radius * radius
  evens = (radius - 1) * (radius - 1)
} else {
  odds = (radius - 1) * (radius - 1)
  evens = radius * radius
}

let evenPlots = splitSums[2][1]
let oddPlots = splitSums[2][2]
let northPlots = splitSums[0][2]
let southPlots = splitSums[4][2]
let eastPlots = splitSums[2][4]
let westPlots = splitSums[2][0]
let topLeftPlots = splitSums[1][1]
let topLeftBPlots = splitSums[0][1]
let topRightPlots = splitSums[1][3]
let topRightBPlots = splitSums[0][3]
let bottomLeftPlots = splitSums[3][1]
let bottomLeftBPlots = splitSums[4][1]
let bottomRightPlots = splitSums[3][3]
let bottomRightBPlots = splitSums[3][4]

let sum = 
  northPlots + 
  southPlots + 
  eastPlots + 
  westPlots + 
  (evens * evenPlots) +
  (odds * oddPlots) +
  (numberOfDiagonals * (topLeftPlots + topRightPlots + bottomLeftPlots + bottomRightPlots)) +
  ((numberOfDiagonals + 1) * (topLeftBPlots + topRightBPlots + bottomLeftBPlots + bottomRightBPlots))

console.log(`Part 2: ${sum}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
