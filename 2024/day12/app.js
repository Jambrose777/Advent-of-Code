const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example1.txt').trim();
// input = _.readFile('./example2.txt').trim();
input = _.readFile('./example3.txt').trim();
// input = _.readFile('./example4.txt').trim();
input = _.readFile('./input.txt').trim();

let grid = input
  .split("\n")
  .map(line => 
    line.split('')
    .map(plant => ({ plant, checked: false }))
  );

let regions = [];
for(let i = 0; i < grid.length; i++) {
  for(let j = 0; j < grid[0].length; j++) {
    if(!grid[i][j].checked) {
      let plant = grid[i][j].plant;
      let region = getRegion(i, j);
      regions.push({ plant, area: region.area, perimeter: region.perimeter, sides: region.sides });
    }
  }
}

function getRegion(i, j) {
  if(_.checkArrayBounds(grid, i, j) && !grid[i][j].checked) {
    let plant = grid[i][j].plant;
    let area = 1;
    let perimeter = 4;
    let sides = 0;
    grid[i][j].checked = true;
    if(_.checkArrayBounds(grid, i - 1, j) && !grid[i - 1][j].checked && grid[i - 1][j].plant === plant) {
      let region = getRegion(i - 1, j);
      area += region.area;
      perimeter += region.perimeter;
      sides += region.sides;
    }
    if(_.checkArrayBounds(grid, i + 1, j) && !grid[i + 1][j].checked && grid[i + 1][j].plant === plant) {
      let region = getRegion(i + 1, j);
      area += region.area;
      perimeter += region.perimeter;
      sides += region.sides;
    }
    if(_.checkArrayBounds(grid, i, j + 1) && !grid[i][j + 1].checked && grid[i][j + 1].plant === plant) {
      let region = getRegion(i, j + 1);
      area += region.area;
      perimeter += region.perimeter;
      sides += region.sides;
    }
    if(_.checkArrayBounds(grid, i, j - 1) && !grid[i][j - 1].checked && grid[i][j - 1].plant === plant) {
      let region = getRegion(i, j - 1);
      area += region.area;
      perimeter += region.perimeter;
      sides += region.sides;
    }

    // perimeter calc
    if(_.checkArrayBounds(grid, i - 1, j) && grid[i - 1][j].plant === plant) {
      perimeter--;
    }
    if(_.checkArrayBounds(grid, i + 1, j) && grid[i + 1][j].plant === plant) {
      perimeter--;
    }
    if(_.checkArrayBounds(grid, i, j + 1) && grid[i][j + 1].plant === plant) {
      perimeter--;
    }
    if(_.checkArrayBounds(grid, i, j - 1) && grid[i][j - 1].plant === plant) {
      perimeter--;
    }

    // sides calc
    if(!(_.checkArrayBounds(grid, i - 1, j) && grid[i - 1][j].plant === plant) && !(_.checkArrayBounds(grid, i, j - 1) && grid[i][j - 1].plant === plant)) {
      sides++;
    }
    if((_.checkArrayBounds(grid, i - 1, j) && grid[i - 1][j].plant === plant) && (_.checkArrayBounds(grid, i, j - 1) && grid[i][j - 1].plant === plant) && !(_.checkArrayBounds(grid, i - 1, j - 1) && grid[i - 1][j - 1].plant === plant) ) {
      sides++;
    }
    if(!(_.checkArrayBounds(grid, i + 1, j) && grid[i + 1][j].plant === plant) && !(_.checkArrayBounds(grid, i, j - 1) && grid[i][j - 1].plant === plant)) {
      sides++;
    }
    if((_.checkArrayBounds(grid, i + 1, j) && grid[i + 1][j].plant === plant) && (_.checkArrayBounds(grid, i, j - 1) && grid[i][j - 1].plant === plant) && !(_.checkArrayBounds(grid, i + 1, j - 1) && grid[i + 1][j - 1].plant === plant) ) {
      sides++;
    }
    if(!(_.checkArrayBounds(grid, i + 1, j) && grid[i + 1][j].plant === plant) && !(_.checkArrayBounds(grid, i, j + 1) && grid[i][j + 1].plant === plant)) {
      sides++;
    }
    if((_.checkArrayBounds(grid, i + 1, j) && grid[i + 1][j].plant === plant) && (_.checkArrayBounds(grid, i, j + 1) && grid[i][j + 1].plant === plant) && !(_.checkArrayBounds(grid, i + 1, j + 1) && grid[i + 1][j + 1].plant === plant) ) {
      sides++;
    }
    if(!(_.checkArrayBounds(grid, i - 1, j) && grid[i - 1][j].plant === plant) && !(_.checkArrayBounds(grid, i, j + 1) && grid[i][j + 1].plant === plant)) {
      sides++;
    }
    if((_.checkArrayBounds(grid, i - 1, j) && grid[i - 1][j].plant === plant) && (_.checkArrayBounds(grid, i, j + 1) && grid[i][j + 1].plant === plant) && !(_.checkArrayBounds(grid, i - 1, j + 1) && grid[i - 1][j + 1].plant === plant) ) {
      sides++;
    }
    return { area, perimeter, sides }
  }
}

// for(let i = 0; i < regions.length; i++) {
//   console.log(regions[i])
// }

console.log(`Part 1: ${_.sum(regions.map(r => r.area * r.perimeter))}`);
console.log(`Part 2: ${_.sum(regions.map(r => r.area * r.sides))}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
