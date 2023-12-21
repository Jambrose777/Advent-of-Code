const start = Date.now();
import * as _ from '../helpers.js'
const input = _.readFile('./example.txt').trim();
// const input = _.readFile('./input.txt').trim();

let instructions = input
  .split("\n")
  .map(line => {
    let parts = line.split(" ");
    let hexCode = parts[2].substring(2, parts[2].length - 2)
    let d = parts[2].substring(parts[2].length - 2, parts[2].length - 1)
    let direction
    // 0 means R, 1 means D, 2 means L, and 3 means U.
    if(d == '0') {
      direction = 'R'
    } else if(d == '1') {
      direction = 'D'
    }  else if(d == '2') {
      direction = 'L'
    }  else if(d == '3') {
      direction = 'U'
    } 
    return {
      // direction,
      // length: parseInt(hexCode, 16),
      direction: parts[0],
      length: parts[1]
    }
  }
);

console.log(instructions)

let additionAmount = 10;

let grid = [];
for(let i = 0; i < additionAmount; i++) {
  let row = [];
  for(let j = 0; j < additionAmount; j++) {
    row.push('.')
  }
  grid.push(row)
}

let currentNode = {i: 0, j: 0}
instructions.forEach(instruction => {
  for(let i = 0; i < +instruction.length; i++) {
    if(instruction.direction == 'R') {
      currentNode = {i:currentNode.i, j: currentNode.j+1}
    } else if(instruction.direction == 'L') {
      currentNode = {i:currentNode.i, j: currentNode.j-1}
    }  else if(instruction.direction == 'U') {
      currentNode = {i:currentNode.i-1, j: currentNode.j}
    }  else if(instruction.direction == 'D') {
      currentNode = {i:currentNode.i+1, j: currentNode.j}
    } 
    if(currentNode.i < 0) {
      let rows = [];
      for(let i = 0; i < additionAmount; i++) {
        let row = [];
        for(let j = 0; j < grid[0].length; j++) {
          row.push('.')
        }
        rows.push(row)
      }
      grid = rows.concat(grid)
      currentNode = {i:currentNode.i + additionAmount, j: currentNode.j}
    }
    if(currentNode.j < 0) {
      grid = grid.map(row => {
        let additions = [];
        for(let j = 0; j < additionAmount; j++) {
          additions.push('.')
        }
        return additions.concat(row)
      })
      currentNode = {i:currentNode.i, j: currentNode.j + additionAmount}
    }
    if(!_.checkArrayBounds(grid, currentNode.i, currentNode.j)) {
      grid.forEach(row => {
        for(let j = 0; j < additionAmount; j++) {
          row.push('.')
        }
      })
      for(let i = 0; i < additionAmount; i++) {
        let row = [];
        for(let j = 0; j < grid[0].length; j++) {
          row.push('.')
        }
        grid.push(row)
      }
    }
    // console.log(currentNode)
    // console.log(grid.length, grid[0].length)
    grid[currentNode.i][currentNode.j] = '#';
  }
})

// console.log(grid.map(r => r.join("")).join("\n"))
// console.log('\n')

// add 1 extra row of padding
let row = [];
for(let j = 0; j < grid[0].length; j++) {
  row.push('.')
}
grid = [row].concat(grid).concat([row])

grid = grid.map(row => {
  return ['.'].concat(row).concat(['.'])
})

// Flood Fill

let toFill = [{i: 0, j: 0}]
while(toFill.length > 0) {
  let fill = toFill.splice(0, 1)[0]
  if(grid[fill.i][fill.j] === '.') {
    grid[fill.i][fill.j] = 'o'
    let set = [
      {i: fill.i + 1, j: fill.j},
      {i: fill.i - 1, j: fill.j},
      {i: fill.i, j: fill.j + 1},
      {i: fill.i, j: fill.j - 1},
    ]
    set.forEach(s => {
      if(_.checkArrayBounds(grid, s.i, s.j)) {
        toFill.push(s)
      }
    })
  }
}

// for(let i = 0; i < grid.length; i++) {
//   // let outside = true;
//   // let previous;
//   for(let j = 0; j < grid[0].length; j++) {
//     if (grid[i][j] === '.') {
//       if(!outside) {
//         grid[i][j] = '#'
//       }
//       previous = '.'
//     } else if (grid[i][j] === '#' && previous !== '#') {
//       outside = !outside;
//       previous = '#'
//     }
//   }
// }

// console.log(grid.map(r => r.join("")).join("\n"))
console.log(_.sum(grid.map(r => _.sum(r.map(e => e !== 'o' ? 1 : 0)))))
// console.log(`Part 1: ${part1}`)
// console.log(`Part 2: ${part2}`)
// console.log(_.sum(results.map(line => _.sum(line))))
// console.log(`Execution time: ${(Date.now() - start)/1000}s`);
