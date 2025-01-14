const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./example2.txt').trim();
input = _.readFile('./example3.txt').trim();
// input = _.readFile('./input.txt').trim();

let grid = input
  .split("\n\n")[0]
  .split("\n")
  .map(line => 
    line.split('')
  );
let movements = input
  .split("\n\n")[1]
  .split("\n")
  .join("")
  .split("");

// findStart
let robot;
for(let x = 0; x < grid.length ; x++) {
  for(let y = 0; y < grid[0].length; y++) {
    if(grid[x][y] === '@') {
      robot = { x, y };
      x = grid.length;
      y = grid[0].length;
    }
  }
}

// make movements
movements.forEach(movement => {
  //set next robot location
  let newX = robot.x;
  let newY = robot.y;
  if(movement === '^') {
    newX--;
  } else if(movement === 'v') {
    newX++
  } else if(movement === '<') {
    newY--;
  } else if(movement === '>') {
    newY++;
  } else {
    console.log("Mystery Error2: ", movement);
  }
  // console.log(movement, robot.x, robot.y, newX, newY)
  if(_.checkArrayBounds(grid, newX, newY) && grid[newX][newY] !== "#") {
    if(grid[newX][newY] === '.') {
      grid[newX][newY] = '@';
      grid[robot.x][robot.y] = '.';
      robot = { x: newX, y: newY };
    } else if(grid[newX][newY] === 'O') {
      if(checkBoxMovement(grid, newX, newY, movement)) {
        grid[newX][newY] = '@';
        grid[robot.x][robot.y] = '.';
        robot = { x: newX, y: newY };
      }
    } else {
      console.log("Mystery Error: ", grid[newX][newY]);
    }
  }
});

function checkBoxMovement(grid, x, y, dir) {
  //set next box
  let newX = x;
  let newY = y;
  if(dir === '^') {
    newX--;
  } else if(dir === 'v') {
    newX++
  } else if(dir === '<') {
    newY--;
  } else if(dir === '>') {
    newY++;
  } else {
    console.log("Mystery Error3: ", dir);
  }
  if(_.checkArrayBounds(grid, newX, newY) && grid[newX][newY] !== "#") {
    if(grid[newX][newY] === '.') {
      grid[newX][newY] = 'O';
      grid[x][y] = '.';
      return true;
    } else if(grid[x][y] === 'O') {
      if(checkBoxMovement(grid, newX, newY, dir)) {
        grid[newX][newY] = 'O';
        grid[x][y] = '.';
        return true;
      } else {
        return false;
      }
    } else {
      console.log("Mystery Errorr: ", grid[newX][newY]);
    }
  } else {
    return false; // it cannot move;
  }
}

// grid.forEach(row => {
//   console.log(row.join(""));
// })
// console.log(robot)
// console.log(movements)

// calc coords
let total = 0;
for(let x = 0; x < grid.length ; x++) {
  for(let y = 0; y < grid[0].length; y++) {
    if(grid[x][y] === 'O') {
      total += 100 * x + y;
    }
  }
}

console.log(`Part 1: ${total}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
