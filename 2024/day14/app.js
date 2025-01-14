const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
 input = _.readFile('./test.txt').trim();
input = _.readFile('./input.txt').trim();

let robots = input
  .split("\n")
  .map(line => {
    let parts = line.split(' ');
    let currentPos = parts[0].split("=")[1].split(",");
    let velocity = parts[1].split("=")[1].split(",");
    return { currentPos: { x: +currentPos[0], y: +currentPos[1] }, velocity: { x: +velocity[0], y: +velocity[1] } }
  });

let iterations = 100;

// The robots outside the actual bathroom are in a space which is 101 tiles wide and 103 tiles tall (when viewed from above). However, in this example, the robots are in a space which is only 11 tiles wide and 7 tiles tall.
let xBounds = 101;
let yBounds = 103;
// xBounds = 11;
// yBounds = 7;

// Part 1
// for(let i = 0; i < iterations; i++) {
//   robots = robots.map(robot => secondPass(robot, xBounds, yBounds));
// }

function secondPass(robot, xBounds, yBounds) {
  let newX = (robot.currentPos.x + robot.velocity.x) % xBounds;
  let newY = (robot.currentPos.y + robot.velocity.y) % yBounds;
  while(newX < 0){
    newX += xBounds;
  }
  while(newY < 0){
    newY += yBounds;
  }
  return {
    currentPos: { x: newX, y: newY }, velocity: robot.velocity
  }
}

// robots.forEach(r => console.log(r));
function printgrid(robots, yBounds, xBounds) {
  for(let y = 0; y < yBounds; y++) {
    let line = ""
    for(let x = 0; x < xBounds; x++) {
      let numRobots = robots.filter(r => r.currentPos.x === x && r.currentPos.y === y).length;
      line += numRobots !== 0 ? numRobots : "."
    }
    console.log(line)
  }
}

// Part 1
// let quadrants = robots.reduce((quads, robot) => {
//   if(robot.currentPos.x < xBounds / 2 - .5 && robot.currentPos.y < yBounds / 2 - .5 ) {
//     quads[0]++;
//   } else if(robot.currentPos.x < xBounds / 2 - .5 && robot.currentPos.y > yBounds / 2 - .5 ) {
//     quads[1]++;
//   } else if (robot.currentPos.x > xBounds / 2 - .5 && robot.currentPos.y < yBounds / 2 - .5 ) {
//     quads[2]++;
//   } else if (robot.currentPos.x > xBounds / 2 - .5 && robot.currentPos.y > yBounds / 2 - .5 ) {
//     quads[3]++;
//   }
//   // console.log(robot, quads);
//   return quads;
// }, [0, 0, 0, 0])

// console.log(`Part 1: ${_.product(quadrants)}`);
let iteration = 0;
while(iteration >= 0) {
  robots = robots.map(robot => secondPass(robot, xBounds, yBounds));
  iteration++;
  console.log(iteration)
  if(checkUnique(robots)) {
    // console.log("ITERATION: ", iteration)
    console.log(`Part 2: ${iteration}`);
    printgrid(robots, yBounds, xBounds);
    iteration = -1;
  }
}

function checkUnique(robots) {
  let checked = [];
  return robots.reduce((agg, robot) => {
    if(!agg) { return agg; }
    if(!!checked.find(c => c.x === robot.currentPos.x && c.y === robot.currentPos.y)) {
      return false;
    } else {
      checked.push(robot.currentPos);
      return true;
    }
  }, true);
}

console.log(`Execution time: ${(Date.now() - start)/1000}s`);
