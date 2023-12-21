const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let part1;
resetPart1();
function resetPart1() {
  part1 =  input
  .split("\n")
  .map(line => 
    line.split('')
    // .map(space => ({current: space === 'S' ? 'O' : space, next: ''}))
    .map(space => ({current: space, next: ''}))
  );
}
// console.log(part1.map((r, i) => r.map((s, j) => s.current).join(""))[65])

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

// test grid that only expands twice
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

// console.log(splits[0][0].length)
// console.log(splits[0][0][0].length)
console.log(splits.map(row => row.map(col => _.sum(col.map(r => r.filter(e => e === 'O').length)))))
// console.log(splits[0][2].map(r => r.join("")).join('\n'))


// console.log(part1.map(r => r.map(e => e.current))[part1.length-1][(part1.length-1) / 2]);
console.log('Goal', _.sum(part1.map(r => r.filter(s => s.current == 'O').length))) // 94475
// console.log(part1.length)

let largeGrid = [];
let radius = 202300
// let radius = 4
// for(let i = 0; i < 2 * radius + 1; i ++){
//   let row = []
//   for(let j = 0; j < 2 * radius + 1; j ++){
//     let character = '.'
//     // if(i == 0 && j == radius) {
//     //   character = 'N'
//     // } else if(i == 2 * radius && j == radius) {
//     //   character = 'S'
//     // } else if(i == radius && j == 0) {
//     //   character = 'W'
//     // } else if(i == radius && j == 2 * radius) {
//     //   character = 'E'
//     // }
//     row.push(character)
//   }
//   largeGrid.push(row);
// }
// largeGrid[0][radius] = 'N'
// largeGrid[largeGrid.length - 1][radius] = 'S'
// largeGrid[radius][0] = 'W'
// largeGrid[radius][largeGrid.length - 1] = 'E'
// for (let i = 1; i < radius; i ++) {
//   largeGrid[radius - i][i] = '['  // top left
//   largeGrid[radius + i][i] = '\\' // bottom left
// }
// for (let i = largeGrid.length - 2; i > radius; i --) {
//   largeGrid[i - radius][i] = ']' // top right
//   largeGrid[largeGrid.length - 1 - (i - radius)][i] = '/' // bottom right
// }
// largeGrid[radius][radius] = 'o';
// let checkSurronding = [{i: radius, j: radius}];
// while(checkSurronding.length) {
//   let check = checkSurronding.splice(0,1)[0]
//   let current = largeGrid[check.i][check.j];
//   let setToCheck = [
//     {i: check.i + 1, j: check.j},
//     {i: check.i - 1, j: check.j},
//     {i: check.i, j: check.j + 1},
//     {i: check.i, j: check.j - 1},
//   ]

//   setToCheck.forEach(set => {
//     if(_.checkArrayBounds(largeGrid, set.i, set.j) && largeGrid[set.i][set.j] == '.') {
//       if(current === 'o') {
//         largeGrid[set.i][set.j] = 'e'
//       } else {
//         largeGrid[set.i][set.j] = 'o'
//       }
//       checkSurronding.push({i: set.i, j: set.j})
//     }
//   })
// }

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

// what the grid looks like before splitting out
// console.log(largeGrid.map(r => r.join("")).join('\n'))
// console.log('e', _.sum(largeGrid.map(r => r.filter(e => e == 'e').length)))
// console.log('evens', evens)
// console.log('o', _.sum(largeGrid.map(r => r.filter(e => e == 'o').length)))
// console.log('odds', odds)
// console.log('[', _.sum(largeGrid.map(r => r.filter(e => e == '[').length)))
// console.log('calc [', numberOfDiagonals)
// console.log(']', _.sum(largeGrid.map(r => r.filter(e => e == ']').length)))
// console.log('\\', _.sum(largeGrid.map(r => r.filter(e => e == '\\').length)))
// console.log('/', _.sum(largeGrid.map(r => r.filter(e => e == '/').length)))
// console.log(largeGrid[0][radius]);

//build the 10 different spaces on the grid

resetPart1();
let steps = 130
part1[(part1.length - 1) / 2][(part1.length - 1) / 2].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let evenPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));
takeStep();
let oddPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));


resetPart1();
part1[(part1.length - 1)][(part1.length - 1) / 2].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let northPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
part1[0][(part1.length - 1) / 2].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let southPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
part1[(part1.length - 1) / 2][0].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let eastPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
part1[(part1.length - 1) / 2][part1.length - 1].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let westPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 195;
part1[part1.length - 1][part1.length - 1].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let topLeftPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 64;
part1[part1.length - 1][part1.length - 1].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let topLeftBPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));
// console.log(topLeftBPlots)

resetPart1();
steps = 195;
part1[part1.length - 1][0].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let topRightPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 64;
part1[part1.length - 1][0].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let topRightBPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 195;
part1[0][part1.length - 1].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let BottomLeftPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 64;
part1[0][part1.length - 1].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let BottomLeftBPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 195;
part1[0][0].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let BottomRightPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

resetPart1();
steps = 64;
part1[0][0].current = 'O'
for(let i = 0; i < steps; i ++) {
    takeStep();
}
let BottomRightBPlots = _.sum(part1.map(r => r.filter(s => s.current == 'O').length));

let sum = 
  northPlots + 
  southPlots + 
  eastPlots + 
  westPlots + 
  (evens * evenPlots) +
  (odds * oddPlots) +
  (numberOfDiagonals * (topLeftPlots + topRightPlots + BottomLeftPlots + BottomRightPlots)) +
  ((numberOfDiagonals + 1) * (topLeftBPlots + topRightBPlots + BottomLeftBPlots + BottomRightBPlots))

  console.log('final', sum)

// grid
// console.log(part1.map((r, i) => r.map((s, j) => (s.current === '#' && ((i % 2 === 1 && j % 2 === 0) || (i % 2 === 0 && j % 2 === 1))) ? '#' : '.').join("")).join("\n"))

// console.log((26501365 - 65) / 131) // 202300
// console.log((26501365 - 65) % 131) // 0

// console.log(`Part 1: ${ _.sum(part1.map(r => r.filter(s => s.current == 'O').length)) }`)
// console.log(`Part 2: ${part2}`)
// console.log(_.sum(results.map(line => _.sum(line))))
// console.log(`Execution time: ${(Date.now() - start)/1000}s`);



// 1 full grid on odd = 7498
// it takes 65 to get from the edge to the center, 65 to get from center to edge
// 26501365

/*
Count number of graphs up and down
Calc area
Only need to check the topmost, bottom most, left right, and 2/3types (4???) of diagonals per diagonal
*/


// 617562707034696 too low
// 617562669002390


// y = ((x-x2) * (x-x3)) / ((x1-x2) * (x1-x3)) * y1 + ((x-x1) * (x-x3)) / ((x2-x1)
