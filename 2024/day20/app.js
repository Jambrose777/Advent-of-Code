const startTime = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

let start = {};

let grid = input
  .split("\n")
  .map((line, row) => 
    line.split('')
    .map((space, col) => {
      if(space === "S") {
        start = { row, col }
      }
      return { text: space, shortestDistance: 0 };
    })
  );

// initial traversal
let spaces = [start];
while(spaces.length > 0) {
  let next = spaces.shift();
  let currentDistance = grid[next.row][next.col].shortestDistance;
  if(grid[next.row - 1][next.col].text !== "#" && grid[next.row - 1][next.col].shortestDistance === 0) {
    grid[next.row - 1][next.col].shortestDistance = currentDistance + 1;
    spaces.push({row: next.row - 1, col: next.col});
  } 
  if(grid[next.row + 1][next.col].text !== "#" && grid[next.row + 1][next.col].shortestDistance === 0) {
    grid[next.row + 1][next.col].shortestDistance = currentDistance + 1;
    spaces.push({row: next.row + 1, col: next.col});
  } 
  if(grid[next.row][next.col - 1].text !== "#" && grid[next.row][next.col - 1].shortestDistance === 0) {
    grid[next.row][next.col - 1].shortestDistance = currentDistance + 1;
    spaces.push({row: next.row, col: next.col - 1});
  } 
  if(grid[next.row][next.col + 1].text !== "#" && grid[next.row][next.col + 1].shortestDistance === 0) {
    grid[next.row][next.col + 1].shortestDistance = currentDistance + 1;
    spaces.push({row: next.row, col: next.col + 1});
  } 
}
// reset start distance
grid[start.row][start.col].shortestDistance = 0;

// traversal counting saves
spaces = [start];
let saves = [];
while(spaces.length > 0) {
  let next = spaces.shift();
  let currentDistance = grid[next.row][next.col].shortestDistance;
  if(grid[next.row - 1][next.col].text !== "#" && grid[next.row - 1][next.col].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row - 1, col: next.col});
  } 
  if(grid[next.row + 1][next.col].text !== "#" && grid[next.row + 1][next.col].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row + 1, col: next.col});
  } 
  if(grid[next.row][next.col - 1].text !== "#" && grid[next.row][next.col - 1].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row, col: next.col - 1});
  } 
  if(grid[next.row][next.col + 1].text !== "#" && grid[next.row][next.col + 1].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row, col: next.col + 1});
  } 

  for(let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      if(Math.abs(i) + Math.abs(j) <= 2 && _.checkArrayBounds(grid, next.row + i, next.col + j) && grid[next.row + i][next.col + j].text !== "#" && grid[next.row + i][next.col + j].shortestDistance > Math.abs(i) + Math.abs(j)) {
          saves.push(grid[next.row + i][next.col + j].shortestDistance - (currentDistance + Math.abs(i) + Math.abs(j)));
      }
    }
  }
}

console.log(`Part 1: ${saves.filter(s => s >= 100).length}`);

// traversal counting saves
spaces = [start];
let saves2 = [];
while(spaces.length > 0) {
  let next = spaces.shift();
  let currentDistance = grid[next.row][next.col].shortestDistance;
  if(grid[next.row - 1][next.col].text !== "#" && grid[next.row - 1][next.col].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row - 1, col: next.col});
  } 
  if(grid[next.row + 1][next.col].text !== "#" && grid[next.row + 1][next.col].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row + 1, col: next.col});
  } 
  if(grid[next.row][next.col - 1].text !== "#" && grid[next.row][next.col - 1].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row, col: next.col - 1});
  } 
  if(grid[next.row][next.col + 1].text !== "#" && grid[next.row][next.col + 1].shortestDistance === currentDistance + 1) {
    spaces.push({row: next.row, col: next.col + 1});
  } 

  for(let i = -20; i <= 20; i++) {
    for (let j = -20; j <= 20; j++) {
      if(Math.abs(i) + Math.abs(j) <= 20 && _.checkArrayBounds(grid, next.row + i, next.col + j) && grid[next.row + i][next.col + j].text !== "#" && grid[next.row + i][next.col + j].shortestDistance > Math.abs(i) + Math.abs(j)) {
          saves2.push(grid[next.row + i][next.col + j].shortestDistance - (currentDistance + Math.abs(i) + Math.abs(j)));
      }
    }
  }
}

console.log(`Part 2: ${saves2.filter(s => s >= 100).length}`);
console.log(`Execution time: ${(Date.now() - startTime)/1000}s`);
