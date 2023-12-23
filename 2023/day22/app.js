const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
input = _.readFile('./input.txt').trim();

// build each brick
let bricks = input
  .split("\n")
  .map((line, index) => ({
    id: index + 1,
    x1: +line.split('~')[0].split(",")[0],
    y1: +line.split('~')[0].split(",")[1],
    z1: +line.split('~')[0].split(",")[2],
    x2: +line.split('~')[1].split(",")[0],
    y2: +line.split('~')[1].split(",")[1],
    z2: +line.split('~')[1].split(",")[2],
    fallenZ1: 0,
    fallenZ2: 0,
    hasFallen: false,
    supportedBy: [],
    canBeDisintegrated: false,
    endVolume: 0,
    occupies: []
  })
)

// get maxCoordinates
let maxCoordinates = bricks.reduce((max, brick) => {
  if(brick.x2 > max.x) {
    max.x = brick.x2
  }
  if(brick.y2 > max.y) {
    max.y = brick.y2
  }
  if(brick.z2 > max.z) {
    max.z = brick.z2
  }
  return max
}, { x: 0, y: 0, z: 0})

// build space
let space = [];
for(let x = 0; x <= maxCoordinates.x; x++) {
  let yes = [];
  for(let y = 0; y <= maxCoordinates.y; y++) {
    let zes = [-1];
    for(let z = 1; z <= maxCoordinates.z; z++) {
      zes.push(0)
    }
    yes.push(zes)
  }
  space.push(yes)
}

// put each brick in space
bricks.forEach(brick => {
  for(let x = brick.x1; x <= brick.x2; x++) {
    for(let y = brick.y1; y <= brick.y2; y++) {
      for(let z = brick.z1; z <= brick.z2; z++) {
        if(space[x][y][z] !== 0) {
          console.log('error entering brick', brick.id, space[x][y][z], x, y, z)
        }
        space[x][y][z] = brick.id
      }
    }
  }
})

// let each brick fall
for(let z = 2; z < space[0][0].length; z++) {
  let foundBricks = [];
  for(let x = 0; x < space.length; x++) {
    for(let y = 0; y < space[0].length; y++) {
      if(space[x][y][z] > 0 && !foundBricks.find(b => b == space[x][y][z])) {
        foundBricks.push(space[x][y][z])
      }
    }
  }
  foundBricks = foundBricks.filter(fb => !bricks.find(b => b.id === fb).hasFallen)
  foundBricks.forEach(fb => {
    dropBrick(fb)
  })
}

// puts brick at lowest z possible
function dropBrick(id) {
  let brick = bricks.find(b => b.id == id)
  let dropToZ = -1;
  // find z to drop down to
  for(let x = brick.x1; x <= brick.x2; x++) {
    for(let y = brick.y1; y <= brick.y2; y++) {
      for(let z = brick.z1 - 1; z >= dropToZ; z--) {
        if(space[x][y][z] !== 0) {
          if(dropToZ < z + 1) {
            dropToZ = z + 1;
          }
          z = dropToZ
        }
      }
    }
  }

  // move each brick's space down
  for(let x = brick.x1; x <= brick.x2; x++) {
    for(let y = brick.y1; y <= brick.y2; y++) {
      for(let z = brick.z1; z <= brick.z2; z++) {
        space[x][y][z] = 0
        space[x][y][dropToZ + (z - brick.z1)] = brick.id
      }
    }
  }

  //update values
  brick.fallenZ1 = dropToZ;
  brick.fallenZ2 = dropToZ + (brick.z2 - brick.z1);
  brick.hasFallen = true;
}

// set attributes of unfallen bricks
bricks.forEach(brick => {
  if(!brick.hasFallen) {
    brick.fallenZ1 = brick.z1
    brick.fallenZ2 = brick.z2
    brick.hasFallen = true;
  }
})

// set what each brick is supported by
bricks.forEach(brick => {
  for(let x = brick.x1; x <= brick.x2; x++) {
    for(let y = brick.y1; y <= brick.y2; y++) {
      if(space[x][y][brick.fallenZ1 - 1] > 0 && !brick.supportedBy.find(s => s === space[x][y][brick.fallenZ1 - 1])) {
        brick.supportedBy.push(space[x][y][brick.fallenZ1 - 1]);
      }
    }
  }
});

// check which bricks can be disintegrated
bricks.forEach(brick => {
  let supports = bricks.filter(b => b.supportedBy.find(s => s === brick.id))
  if(supports.length === 0) {
    brick.canBeDisintegrated = true;
  } else if (supports.filter(b => b.supportedBy.length === 1).length == 0) {
    brick.canBeDisintegrated = true;
  }
})

// check brick volume still equals
for(let x = 0; x < space.length; x++) {
  for(let y = 0; y < space[0].length; y++) {
    for(let z = 0; z < space[0][0].length; z++) {
      if(space[x][y][z] > 0) {
        bricks.find(b => b.id == space[x][y][z]).endVolume++;
        bricks.find(b => b.id == space[x][y][z]).occupies.push({x, y, z});
      }
    }
  }
}
bricks.forEach(b => {
  b.calcVolumn = (b.x2 - b.x1 + 1) * (b.y2 - b.y1 + 1) * (b.z2 - b.z1 + 1) 
})
let bricksWithVolumnMismatch = bricks.filter(b => b.calcVolumn !== b.endVolume)

// calculate how many bricks can be disintegrated
let part1 = bricks.reduce((agg, b) => agg + (b.canBeDisintegrated ? 1 : 0), 0)
console.log(`Part 1: ${part1}`)

// find how many bricks fall when a brick is disintegrated
let part2 = _.sum(bricks.filter(b => !b.canBeDisintegrated).map(brick => {
  let fallenBricks = [brick.id];
  let supports = bricks.filter(b => b.supportedBy.find(s => s === brick.id))

  while(supports.length) {
    let checkBrick = supports.splice(0,1)[0];
    if(!fallenBricks.includes(checkBrick.id) && !checkBrick.supportedBy.filter(s => !fallenBricks.includes(s)).length) {
      fallenBricks.push(checkBrick.id);
      supports = supports.concat(bricks.filter(b => b.supportedBy.find(s => s === checkBrick.id)))
    }
  }
  return fallenBricks.length - 1
}))

console.log(`Part 2: ${part2}`)
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
1
