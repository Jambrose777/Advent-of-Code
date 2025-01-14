const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
//  input = _.readFile('./example2.txt').trim();
//  input = _.readFile('./example3.txt').trim();
input = _.readFile('./input.txt').trim();

let grid = input
  .split("\n\n")[0]
  .replaceAll("#","##")
  .replaceAll("O","[]")
  .replaceAll(".","..")
  .replaceAll("@","@.")
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
  // grid.forEach(row => {
  //   console.log(row.join(""));
  // })
  if(_.checkArrayBounds(grid, newX, newY) && grid[newX][newY] !== "#") {
    if(grid[newX][newY] === '.') {
      grid[newX][newY] = '@';
      grid[robot.x][robot.y] = '.';
      robot = { x: newX, y: newY };
    } else {
      let checkBox;
      if(grid[newX][newY] === '[') {
        checkBox = checkBoxMovement(grid, newX, newY, movement)
      } else if(grid[newX][newY] === ']') {
        checkBox = checkBoxMovement(grid, newX, newY - 1, movement)
      }
      if(checkBox.canMove) {
        checkBox.clears.forEach(clear => {
          grid[clear.x][clear.y] = '.'
          grid[clear.x][clear.y + 1] = '.'
        })
        checkBox.moves.forEach(move => {
          grid[move.x][move.y] = '['
          grid[move.x][move.y + 1] = ']'
        })
        grid[newX][newY] = '@';
        grid[robot.x][robot.y] = '.';
        robot = { x: newX, y: newY };
      }
    }
  }
});

function checkBoxMovement(grid, x, y, dir) {
  // console.log('checkBoxMovement', x, y, dir)
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
  if(_.checkArrayBounds(grid, newX, newY) && grid[newX][newY] !== "#" && _.checkArrayBounds(grid, newX, newY + 1) && grid[newX][newY + 1] !== "#") {
    let checkBox;
    if(dir === 'v' || dir === '^') {
      if(grid[newX][newY] === '.' && grid[newX][newY + 1] === '.') {
        return { canMove: true, clears: [{x, y}], moves: [{x: newX, y: newY}]}
      } else if(grid[newX][newY] === '[') {
        checkBox = checkBoxMovement(grid, newX, newY, dir);
      } else if(grid[newX][newY] === ']' && grid[newX][newY + 1] === '.') {
        checkBox = checkBoxMovement(grid, newX, newY - 1, dir);
      } else if(grid[newX][newY] === '.' && grid[newX][newY + 1] === '[') {
        checkBox = checkBoxMovement(grid, newX, newY + 1, dir);
      } else if(grid[newX][newY] === ']' && grid[newX][newY + 1] === '[') {
        checkBox = checkBoxMovement(grid, newX, newY - 1, dir)
        let checkBox2 = checkBoxMovement(grid, newX, newY + 1, dir);
        if(!checkBox.canMove) {
          return checkBox;
        }
        if(!checkBox2.canMove) {
          return checkBox2;
        }
        checkBox = { canMove: true, clears: [...checkBox.clears, ...checkBox2.clears], moves: [...checkBox.moves, ...checkBox2.moves] }
      } else {
        console.log("Mystery Errorr: ", grid[newX][newY], grid[newX][newY+1], newX, newY);
      }
    } else if (dir === '<') {
      if(grid[newX][newY] === '.') {
        return { canMove: true, clears: [{x, y}], moves: [{x: newX, y: newY}]}
      } else if (grid[newX][newY] === ']') {
        checkBox = checkBoxMovement(grid, newX, newY - 1, dir);
      }
    } else if (dir === '>') {
      if(grid[newX][newY + 1] === '.') {
        return { canMove: true, clears: [{x, y}], moves: [{x: newX, y: newY}]}
      } else if (grid[newX][newY + 1] === '[') {
        checkBox = checkBoxMovement(grid, newX, newY + 1, dir);
      }
    } else {
      console.log('mystery Error 5: ', dir)
    }
    if(checkBox.canMove) {
      return { canMove: true, clears: [...checkBox.clears, {x, y}], moves: [...checkBox.moves, {x: newX, y: newY}]}
    } else {
      return checkBox;
    }
  } else {
    return {checkBox: {canMove: false}}; // it cannot move;
  }
}

grid.forEach(row => {
  console.log(row.join(""));
})
// console.log(robot)
// console.log(movements)

// calc coords
let total = 0;
for(let x = 0; x < grid.length ; x++) {
  for(let y = 0; y < grid[0].length; y++) {
    if(grid[x][y] === '[') {
      total += 100 * x + y;
    }
  }
}

console.log(`Part 2: ${total}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
