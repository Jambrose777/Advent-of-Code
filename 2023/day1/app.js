const json = require('./input1.json');

let part1Sum = 0;
let part2Sum = 0;

json.forEach(scramble => {
  //Part 1
  
  let part1Numbers = scramble.match(/^\d+|\d+\b|\d+(?=\w)/g);
  part1Sum+= +(part1Numbers[0].charAt(0)) * 10 + +part1Numbers[part1Numbers.length-1] % 10;

  // Part 2
  // Better way is to add on line 8 scramble.replace(regexstatment)
  let letters = scramble.split("");
  let numbers = []; 
  for(let i = 0; i < letters.length; i++) {
    if(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(letters[i])) {
      numbers.push(+letters[i])
    } else if (letters[i] == "z" && letters[i+1] == "e" && letters[i+2] == "r" && letters[i+3] == "o") {
      numbers.push(0)
    } else if (letters[i] == "o" && letters[i+1] == "n" && letters[i+2] == "e") {
      numbers.push(1)
    } else if (letters[i] == "t" && letters[i+1] == "w" && letters[i+2] == "o") {
      numbers.push(2)
    } else if (letters[i] == "t" && letters[i+1] == "h" && letters[i+2] == "r" && letters[i+3] == "e" && letters[i+4] == "e") {
      numbers.push(3)
    } else if (letters[i] == "f" && letters[i+1] == "o" && letters[i+2] == "u" && letters[i+3] == "r") {
      numbers.push(4)
    } else if (letters[i] == "f" && letters[i+1] == "i" && letters[i+2] == "v" && letters[i+3] == "e") {
      numbers.push(5)
    } else if (letters[i] == "s" && letters[i+1] == "i" && letters[i+2] == "x") {
      numbers.push(6)
    } else if (letters[i] == "s" && letters[i+1] == "e" && letters[i+2] == "v" && letters[i+3] == "e" && letters[i+4] == "n") {
      numbers.push(7)
    } else if (letters[i] == "e" && letters[i+1] == "i" && letters[i+2] == "g" && letters[i+3] == "h" && letters[i+4] == "t") {
      numbers.push(8)
    } else if (letters[i] == "n" && letters[i+1] == "i" && letters[i+2] == "n" && letters[i+3] == "e") {
      numbers.push(9)
    }
  }

  part2Sum += numbers[0] * 10 + numbers[numbers.length-1]
})

console.log(part1Sum);
console.log(part2Sum);
