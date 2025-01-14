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
    row.push({ isSafe: true, minSteps: -1, shortestPath: [] })
  }
  grid.push(row);
}
grid[0][0].shortestPath.push({i: 0, j:0});

// butfallen bytes in grid
for(let i = 0; i < bytesPast; i++) {
  grid[fallenBytes[i][0]][fallenBytes[i][1]].isSafe = false;
}

grid[range][range].shortestPath.push({i: fallenBytes[bytesPast][0], j: fallenBytes[bytesPast][1]}); // trick it to check next one

let bytesToAdd = [];
let ticker = 0;
for(let byte = bytesPast; byte < fallenBytes.length; byte++) {
  bytesToAdd.push(fallenBytes[byte]);
  if(!!grid[range][range].shortestPath.find(p => p.i === fallenBytes[byte][0] && p.j === fallenBytes[byte][1])) {
    console.log("triggering: ", byte, "/", fallenBytes.length)
    ticker++;
    // reset map
    for(let i = 0; i <= range; i++) {
      for(let j = 0; j <= range; j++) {
        grid[i][j].minSteps = -1;
        grid[i][j].shortestPath = [];
        grid[0][0].shortestPath.push({i: 0, j:0});
      }
    }

    // fall new bytes
    bytesToAdd.forEach(b => {
      grid[b[0]][b[1]].isSafe = false;
    });

    // traverse map
    let spacesToCheck = [ { i: 0, j: 0, currentSteps: 0 } ];
    while(spacesToCheck.length > 0) {
      let node = spacesToCheck.shift();
      if(_.checkArrayBounds(grid, node.i - 1, node.j) && grid[node.i - 1][node.j].isSafe && grid[node.i - 1][node.j].minSteps === -1)  {
        grid[node.i - 1][node.j].minSteps = node.currentSteps + 1;
        grid[node.i - 1][node.j].shortestPath = [...grid[node.i][node.j].shortestPath, {i: node.i - 1, j: node.j}]
        spacesToCheck.push({ i: node.i - 1, j: node.j, currentSteps: node.currentSteps + 1 })
      }
      if(_.checkArrayBounds(grid, node.i + 1, node.j) && grid[node.i + 1][node.j].isSafe && grid[node.i + 1][node.j].minSteps === -1)  {
        grid[node.i + 1][node.j].minSteps = node.currentSteps + 1;
        grid[node.i + 1][node.j].shortestPath = [...grid[node.i][node.j].shortestPath, {i: node.i + 1, j: node.j}]
        spacesToCheck.push({ i: node.i + 1, j: node.j, currentSteps: node.currentSteps + 1 })
      }
      if(_.checkArrayBounds(grid, node.i, node.j - 1) && grid[node.i][node.j - 1].isSafe && grid[node.i][node.j - 1].minSteps === -1)  {
        grid[node.i][node.j - 1].minSteps = node.currentSteps + 1;
        grid[node.i][node.j - 1].shortestPath = [...grid[node.i][node.j].shortestPath, {i: node.i, j: node.j - 1}]
        spacesToCheck.push({ i: node.i, j: node.j - 1, currentSteps: node.currentSteps + 1 })
      }
      if(_.checkArrayBounds(grid, node.i, node.j + 1) && grid[node.i][node.j + 1].isSafe && grid[node.i][node.j + 1].minSteps === -1)  {
        grid[node.i][node.j + 1].minSteps = node.currentSteps + 1;
        grid[node.i][node.j + 1].shortestPath = [...grid[node.i][node.j].shortestPath, {i: node.j, j: node.j + 1}]
        spacesToCheck.push({ i: node.i, j: node.j + 1, currentSteps: node.currentSteps + 1 })
      }
    }

    // check end
    if(grid[range][range].shortestPath.length === 0) {
      console.log(ticker)
      console.log(`Part 2: ${fallenBytes[byte].join(",")}`);
      byte = fallenBytes.length;
    }
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


// let part2 = part1;

// console.log(`Part 2: ${part2}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
