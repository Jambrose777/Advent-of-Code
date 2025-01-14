const startTime = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./example2.txt').trim();
// input = _.readFile('./input.txt').trim();

let start = -1;
let end = -1;

let grid = input
  .split("\n")
  .map((line, i) => 
    line.split('')
    .map((text, j) => {
      if(text === "S") {
        start = { i, j }
      } else if(text === "E") {
        end = { i, j }
      }
      return { text, isWall: text === "#", bestCost: -1, bestPaths: [] };
    })
  );

// build nodes
//direction is 1 N, 2E, 3S, 4West
grid[start.i][start.j].bestCost = 0;
grid[start.i][start.j].bestPaths = [{i: start.i, j: start.j}]
let nodesToCheck = [ { i: start.i, j: start.j, prevDir: 4, currentCost: 0 } ];
while(nodesToCheck.length) {
  let node = nodesToCheck.shift();
  // console.log(node)
  let best = grid[node.i][node.j].bestCost;
  if(node.currentCost === best) { 
    grid[node.i][node.j].text = 'X'
    let costPerDirection = [0, 0, 0, 0];
    if(node.prevDir === 1 || node.prevDir === 3) {
      costPerDirection = [1, 1001, 1, 1001]
    } else {
      costPerDirection = [1001, 1, 1001, 1]
    }
    let currentBestPaths = grid[node.i][node.j].bestPaths;
    let pushed = false;
    if(!grid[node.i - 1][node.j].isWall && grid[node.i - 1][node.j].bestCost === -1 || grid[node.i - 1][node.j].bestCost >= node.currentCost + costPerDirection[0]) {
      if(grid[node.i - 1][node.j].bestCost !== node.currentCost + costPerDirection[0]) {
        grid[node.i - 1][node.j].bestPaths = []; // reset
      }
      grid[node.i - 1][node.j].bestCost = node.currentCost + costPerDirection[0];
      grid[node.i - 1][node.j].bestPaths = [...grid[node.i - 1][node.j].bestPaths, ...currentBestPaths, {i: node.i - 1, j: node.j}];
      pushed = true;
      nodesToCheck.push({ i: node.i - 1, j: node.j, prevDir: 3, currentCost: node.currentCost + costPerDirection[0] });
    }
    if(!grid[node.i + 1][node.j].isWall && grid[node.i + 1][node.j].bestCost === -1 || grid[node.i + 1][node.j].bestCost >= node.currentCost + costPerDirection[2]) {
      if(grid[node.i + 1][node.j].bestCost !== node.currentCost + costPerDirection[2]) {
        grid[node.i + 1][node.j].bestPaths = []; // reset
      }
      grid[node.i + 1][node.j].bestCost = node.currentCost + costPerDirection[2]
      grid[node.i + 1][node.j].bestPaths = [...grid[node.i + 1][node.j].bestPaths, ...currentBestPaths, {i: node.i + 1, j: node.j}];
      nodesToCheck.push({ i: node.i + 1, j: node.j, prevDir: 1, currentCost: node.currentCost + costPerDirection[2] });
      pushed = true;
    }
    if(!grid[node.i][node.j - 1].isWall && grid[node.i][node.j - 1].bestCost === -1 || grid[node.i][node.j - 1].bestCost >= node.currentCost + costPerDirection[3]) {
      if(grid[node.i][node.j - 1].bestCost !== node.currentCost + costPerDirection[3]) {
        grid[node.i][node.j - 1].bestPaths = []; // reset
      }
      grid[node.i][node.j - 1].bestCost = node.currentCost + costPerDirection[3]
      grid[node.i][node.j - 1].bestPaths = [...grid[node.i][node.j - 1].bestPaths, ...currentBestPaths, {i: node.i, j: node.j - 1}];
      nodesToCheck.push({ i: node.i, j: node.j - 1, prevDir: 2, currentCost: node.currentCost + costPerDirection[3] });
      pushed = true;
    }
    if(!grid[node.i][node.j + 1].isWall && grid[node.i][node.j + 1].bestCost === -1 || grid[node.i][node.j + 1].bestCost >= node.currentCost + costPerDirection[1]) {
      if(grid[node.i][node.j + 1].bestCost !== node.currentCost + costPerDirection[1]) {
        grid[node.i][node.j + 1].bestPaths = []; // reset
      }
      grid[node.i][node.j + 1].bestCost = node.currentCost + costPerDirection[1]
      grid[node.i][node.j + 1].bestPaths = [...grid[node.i][node.j + 1].bestPaths, ...currentBestPaths, {i: node.i, j: node.j + 1}];
      nodesToCheck.push({ i: node.i, j: node.j + 1, prevDir: 4, currentCost: node.currentCost + costPerDirection[1] });
      pushed = true;
    }
    if(pushed) {
      // console.log('before', nodesToCheck)
      nodesToCheck = nodesToCheck.sort((a, b) => a.currentCost - b.currentCost);
      // console.log('after', nodesToCheck)
    }
  }
}

grid[end.i][end.j].bestPaths.forEach(path => {
  grid[path.i][path.j].text = "O"
})

// grid[]
for(let i = 0; i < grid.length; i++) {
  let line = ""
  for(let j = 0; j < grid[0].length; j++) {
    line += grid[i][j].text;
  }
  console.log(line);
}
// console.log(`test 1: ${grid[start.i-4][start.j+2].bestCost}`);
console.log(`Part 1: ${grid[end.i][end.j].bestCost}`);
console.log(`Execution time: ${(Date.now() - startTime)/1000}s`);
