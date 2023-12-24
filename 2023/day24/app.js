const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

import { init } from "z3-solver";
const { Context } = await init();
const Z3 = Context("main");

let hailstones = input
  .split("\n")
  .map(line => ({
    px: +line.split(' @ ')[0].split(", ")[0],
    py: +line.split(' @ ')[0].split(", ")[1],
    pz: +line.split(' @ ')[0].split(", ")[2],
    vx: +line.split(' @ ')[1].split(", ")[0],
    vy: +line.split(' @ ')[1].split(", ")[1],
    vz: +line.split(' @ ')[1].split(", ")[2],
    line
  })
).map(hailstone => 
  ({
    ...hailstone,
    a: 1,
    b: -1 * (hailstone.vy / hailstone.vx),
    c: (hailstone.vy / hailstone.vx) * hailstone.px - hailstone.py
  })
);
// let testAreaMin = 7
// let testAreaMax = 27
let testAreaMin = 200000000000000
let testAreaMax = 400000000000000
let intersections = 0;

for(let i = 0; i < hailstones.length - 1; i++) {
  for(let j = i + 1; j < hailstones.length; j++) {
    if(lineIntersects(hailstones[i], hailstones[j])) {
      intersections++;
    }
  }
}

function lineIntersects(l1, l2) {
  let xNum = (l1.b * l2.c) - (l2.b * l1.c)
  let xDom = (l1.a * l2.b) - (l2.a * l1.b)
  let yNum = (l1.c * l2.a) - (l2.c * l1.a)
  let yDom = (l1.a * l2.b) - (l2.a * l1.b)
  if(xDom == 0 || yDom === 0 ) {
    return false;
  }
  let y = xNum / xDom;
  let x = yNum / yDom;
  if(x >= testAreaMin && x <= testAreaMax && y >= testAreaMin && y <= testAreaMax && (((l1.vx > 0 && l1.px < x) || (l1.vx < 0 && l1.px > x)) && ((l2.vx > 0 && l2.px < x) || (l2.vx < 0 && l2.px > x)))) {
    return true;
  }
  return false;
}

console.log(`Part 1: ${intersections}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);

let x = Z3.Real.const("x");
let y = Z3.Real.const("y");
let z = Z3.Real.const("z");
let vx = Z3.Real.const("vx");
let vy = Z3.Real.const("vy");
let vz = Z3.Real.const("vz");
const solver = new Z3.Solver();

// only need to look at 3 hailstones
for (let i = 0; i < 3; i++) {
  let hailstone = hailstones[i];
  let t = Z3.Real.const(`t${i}`);

  solver.add(t.ge(0));
  solver.add(x.add(vx.mul(t)).eq(t.mul(hailstone.vx).add(hailstone.px)));
  solver.add(y.add(vy.mul(t)).eq(t.mul(hailstone.vy).add(hailstone.py)));
  solver.add(z.add(vz.mul(t)).eq(t.mul(hailstone.vz).add(hailstone.pz)));
}

let isSat = await solver.check();

if (isSat !== "sat") {
  console.log('error')
} else {
  let model = solver.model();
  let rx = Number(model.eval(x));
  let ry = Number(model.eval(y));
  let rz = Number(model.eval(z));
  console.log(`Part 2: ${ rx + ry + rz }`)
  console.log(`Execution time: ${(Date.now() - start)/1000}s`);
}
