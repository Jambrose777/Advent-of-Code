const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
let range = 6;
let bytesPast = 12;
bytesPast = 1024
range = 70;
input = _.readFile('./input.txt').trim();

function myFunc(i) {
  return +i;
}

let fallenBytes = input
  .split("\n")
  .map(line => 
    line.split(',')
    .map(i => myFunc(i)) 
  );

// initilize grid
let grid = [];
for(let i = 0; i <= range; i++) {
  let row = [];
  for(let j = 0; j <= range; j++) {
    row.push({ isSafe: true, minSteps: -1 })
  }
  grid.push(row);
}

// butfallen bytes in grid
for(let i = 0; i < bytesPast; i++) {
  grid[fallenBytes[i][0]][fallenBytes[i][1]].isSafe = false;
}

// traverse map
let spacesToCheck = [ { i: 0, j: 0, currentSteps: 0 } ];
while(spacesToCheck.length > 0) {
  let node = spacesToCheck.shift();
  if(_.checkArrayBounds(grid, node.i - 1, node.j) && grid[node.i - 1][node.j].isSafe && grid[node.i - 1][node.j].minSteps === -1)  {
    grid[node.i - 1][node.j].minSteps = node.currentSteps + 1;
    spacesToCheck.push({ i: node.i - 1, j: node.j, currentSteps: node.currentSteps + 1 })
  }
  if(_.checkArrayBounds(grid, node.i + 1, node.j) && grid[node.i + 1][node.j].isSafe && grid[node.i + 1][node.j].minSteps === -1)  {
    grid[node.i + 1][node.j].minSteps = node.currentSteps + 1;
    spacesToCheck.push({ i: node.i + 1, j: node.j, currentSteps: node.currentSteps + 1 })
  }
  if(_.checkArrayBounds(grid, node.i, node.j - 1) && grid[node.i][node.j - 1].isSafe && grid[node.i][node.j - 1].minSteps === -1)  {
    grid[node.i][node.j - 1].minSteps = node.currentSteps + 1;
    spacesToCheck.push({ i: node.i, j: node.j - 1, currentSteps: node.currentSteps + 1 })
  }
  if(_.checkArrayBounds(grid, node.i, node.j + 1) && grid[node.i][node.j + 1].isSafe && grid[node.i][node.j + 1].minSteps === -1)  {
    grid[node.i][node.j + 1].minSteps = node.currentSteps + 1;
    spacesToCheck.push({ i: node.i, j: node.j + 1, currentSteps: node.currentSteps + 1 })
  }
}

//print grid
// for(let i = 0; i <= range; i++) {
//   let line = ""
//   for(let j = 0; j <= range; j++) {
//     line += grid[j][i].minSteps
//   }
//   console.log(line);
// }

console.log(`Part 1: ${grid[range][range].minSteps}`);
// console.log(`Execution time: ${(Date.now() - start)/1000}s`);
