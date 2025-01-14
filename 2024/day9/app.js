const start = Date.now();
import * as _ from '../helpers.js'
let input = _.readFile('./example.txt').trim();
// input = _.readFile('./example2.txt').trim();
input = _.readFile('./input.txt').trim();

// convert input to string of the memory
let part1 = [];
let freeSpace = false;
let blockId = 0;
for(let i = 0; i < input.length; i++) {
  let size = +input.charAt(i);
  for(let j = 0; j < size; j++) {
    if(freeSpace) {
      part1.push(".")
    } else {
      part1.push(blockId)
    }
  }
  if(!freeSpace) {
    blockId++;
  }
  freeSpace = !freeSpace;
}

// Swaps files into free spaces
let lastFreeSpace = -1;
for(let i = part1.length - 1; i > lastFreeSpace; i--) {
  // console.log(lastFreeSpace / i); // progress
  if(part1[i] !== '.') {
    // find next free space;
    let nextFreeSpace = -1;
    for(let j = lastFreeSpace + 1; j < i; j++) {
      if(part1[j] === '.') {
        nextFreeSpace = j;
        j = i;
      }
    }
    if(nextFreeSpace === -1) {
      // no more freespaces;
      i = lastFreeSpace;
    } else {
      // console.log('Before: ', part1);
      // console.log('parts: ', part1.substring(0, nextFreeSpace), part1.charAt(i), part1.substring(nextFreeSpace + 2, i), part1.charAt(nextFreeSpace), part1.substring(i + 2))
      // part1 = part1.substring(0, nextFreeSpace) + part1.charAt(i) + part1.substring(nextFreeSpace + 1, i) + part1.charAt(nextFreeSpace) + part1.substring(i + 1);
      // swaps indexes i and nextFreespace
      part1 = [...part1.slice(0, nextFreeSpace), part1[i], ...part1.slice(nextFreeSpace + 1, i), part1[nextFreeSpace], ...part1.slice(i + 1)];
      // console.log('After: ', part1);
      lastFreeSpace = nextFreeSpace;
    }
  }
}

// find checksum
let checksum = part1.reduce((checkSum, id, index) => {
  if(id !== '.') {
    return checkSum + (+id * index);
  }
  return checkSum;
}, 0)

console.log(`Part 1: ${checksum}`);

// convert input to array of the memory with sizes
let part2 = [];
let freeSpace2 = false;
let blockId2 = 0;
for(let i = 0; i < input.length; i++) {
  let size = +input.charAt(i);
  if(+size > 0) part2.push({size, id: freeSpace2 ? -1 : blockId2}); // -1 is free space
  if(!freeSpace2) {
    blockId2++;
  }
  freeSpace2 = !freeSpace2;
}

// Swaps files into free spaces
for(let i = part2.length - 1; i > 0; i--) {
  // console.log(100 - i/(part2.length - 1)); // progress
  if(part2[i].id !== -1) {
    // find next free space;
    let nextFreeSpace = -1;
    for(let j = 0; j < i; j++) {
      if(part2[j].id === -1 && part2[j].size >= part2[i].size) {
        nextFreeSpace = j;
        j = i;
      }
    }
    if(nextFreeSpace !== -1) {
      // console.log('Before: ', part2);
      // console.log('parts: ', part2.substring(0, nextFreeSpace), part2.charAt(i), part2.substring(nextFreeSpace + 2, i), part2.charAt(nextFreeSpace), part2.substring(i + 2))
      // part2 = part2.substring(0, nextFreeSpace) + part2.charAt(i) + part2.substring(nextFreeSpace + 1, i) + part2.charAt(nextFreeSpace) + part2.substring(i + 1);
      if(part2[nextFreeSpace].size === part2[i].size) {
        // moves whole section of freespaces
        part2 = [...part2.slice(0, nextFreeSpace), part2[i], ...part2.slice(nextFreeSpace + 1, i),  part2[nextFreeSpace], ...part2.slice(i + 1)];
      } else {
        // creates a new freespace in array to fill in gap created.
        part2 = [...part2.slice(0, nextFreeSpace), part2[i], {size: part2[nextFreeSpace].size - part2[i].size, id: -1}, ...part2.slice(nextFreeSpace + 1, i),  {size: part2[i].size, id: -1}, ...part2.slice(i + 1)];
        i++; // now array has extra index
      }
      // console.log('After: ', part2);
    }
  }
}

// find checksum
let rollingIndex = 0;
let checksum2 = part2.reduce((checkSum, file) => {
  if(file.id !== -1) {
    for(let i = 0; i < file.size; i++) {
      checkSum += file.id * rollingIndex;
      rollingIndex++;
    }
    return checkSum;
  } else {
    rollingIndex += file.size;
    return checkSum;
  }
}, 0)

console.log(`Part 2: ${checksum2}`);
console.log(`Execution time: ${(Date.now() - start)/1000}s`);
