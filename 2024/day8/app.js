const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let grid = input
  .split("\n")
  .map(line => 
    line.split('')
  );

let antenna = [];
let maxRow = grid.length;
let maxCol = grid[0].length;

// extract all antenna
for(let i = 0; i < maxRow; i++) {
  for(let j = 0; j < maxCol; j++) {
    if(grid[i][j] !== '.') {
      let foundA = antenna.find(a => a.signal === grid[i][j]);
      if(foundA) {
        foundA.coords.push({row: i, col: j});
      } else {
        antenna.push({signal: grid[i][j], coords: [ {row: i, col: j} ]});
      }
    }
  }
}

// find antinodes
let antiNodes = [];
antenna.forEach(ant => {
  for(let i = 0; i < ant.coords.length; i++) {
    for(let j = i + 1; j < ant.coords.length; j ++) {
      let newAntiNodes = findAntiNode(ant.coords[i], ant.coords[j]);
      newAntiNodes.forEach(node => {
        // check if in bounds and hasn't already been accounted for
        if(_.checkArrayBounds(grid, node.row, node.col) && !antiNodes.find(n => n.row === node.row && n.col === node.col)) {
          antiNodes.push(node)
        }
      })
    }
  }
})

function findAntiNode(coord1, coord2) {
  let rowDiff = coord2.row - coord1.row;
  let colDiff = coord2.col - coord1.col;
  return [{row: coord2.row + rowDiff, col: coord2.col + colDiff}, {row: coord1.row - rowDiff, col: coord1.col - colDiff}];
}
// antiNodes.forEach(node => {
//   console.log(node)
// })
console.log(`Part 1: ${antiNodes.length}`);

// PART 2
// find antinodes
let part2antiNodes = [];
antenna.forEach(ant => {
  for(let i = 0; i < ant.coords.length; i++) {
    for(let j = i + 1; j < ant.coords.length; j ++) {
      let newAntiNodes = findAntiNodes(ant.coords[i], ant.coords[j]);
      newAntiNodes.forEach(node => {
        if(!part2antiNodes.find(n => n.row === node.row && n.col === node.col)) {
          part2antiNodes.push(node)
        }
      })
    }
  }
})

function findAntiNodes(coord1, coord2) {
  let rowDiff = coord2.row - coord1.row;
  let colDiff = coord2.col - coord1.col;
  let newRow = coord2.row;
  let newCol = coord2.col;
  let antiNodes = [];
  while(_.checkArrayBounds(grid, newRow, newCol)) {
    antiNodes.push({row: newRow, col: newCol});
    newRow += rowDiff;
    newCol += colDiff;
  }
  newRow = coord1.row;
  newCol = coord1.col;
  while(_.checkArrayBounds(grid, newRow, newCol)) {
    antiNodes.push({row: newRow, col: newCol});
    newRow -= rowDiff;
    newCol -= colDiff;
  }

  // console.log(coord1, coord2, 'first: ', newRow1, newCol1, 'second: ', newRow2, newCol2)
  return antiNodes;
}

console.log(`Part 2: ${part2antiNodes.length}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
