const arr = require('./puzzle1.json');

let redCubes = 12;
let greenCubes = 13;
let blueCubes = 14;

let result = arr.reduce((sum, game) => {
  let reveals = game.text.split(";");
  let minRedCubes = 0;
  let minGreenCubes = 0;
  let minBlueCubes = 0;
  let isGamePossible = reveals.reduce((agg, reveal) => {
    let isRevealPossible = reveal.split(" ").reduce((agg, curr, index, array) => {
      // Part 2
      if(
        ((curr == "red" || curr == "red,") && +array[index-1] > minRedCubes)
      ) {
        minRedCubes = +array[index-1];
      } else if (
        ((curr == "green" || curr == "green,") && +array[index-1] > minGreenCubes)) {
          minGreenCubes = +array[index-1];

       }else if (
        ((curr == "blue" || curr == "blue,") && +array[index-1] > minBlueCubes)){
          minBlueCubes = +array[index-1];

      }
      // Part 1
      if(
        ((curr == "red" || curr == "red,") && +array[index-1] > redCubes) ||
        ((curr == "green" || curr == "green,") && +array[index-1] > greenCubes)||
        ((curr == "blue" || curr == "blue,") && +array[index-1] > blueCubes)
      ) {
        return false
      } else {
        return true && agg;
      }
    }, true);
    return isRevealPossible && agg
  }, true)
  
  //  Part 1
  // return sum + (isGamePossible ? game.game : 0) 

  // Part 2
  return sum + (minRedCubes * minGreenCubes * minBlueCubes)
}, 0);

console.log(result);
