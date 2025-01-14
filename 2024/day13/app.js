const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();
// input = _.readFile('./test.txt').trim();

function readInput(machine) {
  let lines = machine.split("\n");
  let aButton = lines[0].split(":")[1].split(',');
  let bButton = lines[1].split(":")[1].split(',');
  let prize = lines[2].split(":")[1].split(',');

  return {
    a: { x: +aButton[0].split("+")[1], y: +aButton[1].split("+")[1] },
    b: { x: +bButton[0].split("+")[1], y: +bButton[1].split("+")[1] },
    prize: { x: +prize[0].split("=")[1], y: +prize[1].split("=")[1] },
  }
}

let machines = input
  .split("\n\n")
  .map(line => readInput(line));

  // machines = [machines[0]]

  // Part 1 attempt 1
// let winners = machines.map(machine => {
//   let winners = findButtonPushes(machine, 0, 0, 0, 0, 0)
//   _.deleteCache();
//   return winners;
// });

//  function findButtonPushes(machine, currX, currY, aPresses, bPresses) {
//   if(currX > machine.prize.x || currY > machine.prize.y || aPresses > 100 || bPresses > 100) {
//     return { aPresses: -1, bPresses: -1 };
//   } else if (currX === machine.prize.x && currY === machine.prize.y) {
//     // console.log('winer')
//     return { aPresses, bPresses }
//   } else {
//     let pressA = _.useCache(findButtonPushes, [machine, currX + machine.a.x, currY + machine.a.y, aPresses+1, bPresses]);
//     let pressB = _.useCache(findButtonPushes, [machine, currX + machine.b.x, currY + machine.b.y, aPresses, bPresses+1]);
//     if (pressA.aPresses === -1 && pressB.aPresses === -1 ) {
//       // console.log(currX, currY, "Bad")
//       return { aPresses: -1, bPresses: -1 };
//     } else if(pressB.aPresses !== -1 && (pressA.aPresses === -1 || (pressA.aPresses * 3 + pressA.bPresses > pressB.aPresses * 3 + pressB.bPresses))) {
//       // console.log(currX, currY, "PressB", pressB)
//       return pressB
//     } else if (pressA.aPresses !== -1) {
//       // console.log(currX, currY, "PressA", pressA)
//       return pressA
//     }
//   }
//  }

//  console.log(winners)
// let part1 = winners.map(w => w.aPresses === -1 ? 0 : w.aPresses * 3 + w.bPresses)

let part1 = calcEq(machines);
console.log(`Part 1: ${_.sum(part1)}`);

// Part 2

let machines2 = machines.map(m => ({...m, prize: { x: 10000000000000 + m.prize.x, y: 10000000000000 + m.prize.y },}))

let winners2 = calcEq(machines2);

// solve system of linear equation
function calcEq(machines) {
  return machines.map(machine => {
  // console.log(machine)
  let denominator = (machine.a.x * machine.b.y - machine.a.y * machine.b.x);
  if (denominator === 0) {
    // console.log('denom', denominator)
    return 0;
  }
  // console.log(machine.prize.x, machine.b.y, machine.prize.y, machine.b.x, denominator)
  let m = Math.floor((machine.prize.x * machine.b.y - machine.prize.y * machine.b.x) / denominator);

  if (m * denominator != (machine.prize.x * machine.b.y - machine.prize.y * machine.b.x)) {
    // console.log('m', m)
    return 0;
  }
  let n = Math.floor((machine.prize.y - machine.a.y * m) / machine.b.y)
  if (n * machine.b.y != (machine.prize.y - machine.a.y * m)) {
    // console.log('n', n)
    return 0
  }
  return 3 * m + n
});
}
// let part2 = part1;

console.log(`Part 2: ${_.sum(winners2)}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
