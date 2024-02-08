// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 // no need to mess with this commment by me
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let simplePointValues = 1;
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += simplePointValues;
   }
   return letterPoints;
};

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let vowelPointValues = 3;
   let simplePointValues = 1;
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += vowelPointValues;
      } else {
         letterPoints += simplePointValues;
      }
   }
   return letterPoints;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      let number = newPointStructure[letter];
      letterPoints += number;
   }
   return letterPoints;
};

const scoringAlgorithms = [
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }, 
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.', 
      scorerFunction: simpleScorer
   }, 
   {
      name: 'Bonus Vowels', 
      description: 'Vowels are 3 pts, consonants are 1 pt.', 
      scorerFunction: vowelBonusScorer
   }
];

function scorerPrompt(scorerChoice) {

   scorerChoice = input.question(`Which scorer would you like to use?
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n
   Enter 0, 1, or 2: `);

   if (scorerChoice < 3) {
      return scoringAlgorithms[scorerChoice].scorerFunction;
   }
   
};

function transform(oldPointStructure) {
   let swappedObj = {};
   for (let pointValue in oldPointStructure) { 
      let newPointVal = oldPointStructure[pointValue]; //pointValue = "1"
      for (let letter in newPointVal){ //letter = 'A'
         pointValue = parseInt(pointValue);
         swappedObj[newPointVal[letter].toLowerCase()] = pointValue;
      }
   }
   return swappedObj;
};


function runProgram() {
   let word = initialPrompt();
   let scorerChoice = scorerPrompt();
   console.log(`Score for '${word}': ${scorerChoice(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
