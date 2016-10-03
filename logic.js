var gameOfThrones = ["jon snow", "cersei lannister", "arya stark", "sandor clegane", "sansa stark","tyrion lannister", "daenerys targaryen", "ramsay bolton", "petyr baelish","brienne of tarth","jaimee lannister","melissandre", "khal drogo", "theon greyjoy", "daario naharis"]

var chosenWord  = ""; // solution will be held here.
var lettersInChosenWord = []; // This will break the solution into individual letters to be stored in array
var numBlanks = 0; // This will be the number of blanks we show based on the solution
var blanksAndSuccesses = []; // Holds a mix of blank and solved letters (ex: 'n, _ _, n, _') 
var wrongGuesses = []; // Holds all of the wrong guesses

// Game counters
var winCounter  = 0;
var lossCounter = 0;
var numGuesses;
var theme = new Audio('theme.mp3');

theme.play();

// Function for starting and restarting the game
function startGame() {
  // Reset the guesses back to 0
  numGuesses = 15;

  chosenWord = gameOfThrones[Math.floor(Math.random() * gameOfThrones.length)]; // solution is chosen randomly from wordList
  lettersInChosenWord = chosenWord.split(""); // the word is broken into individual letters
  numBlanks = lettersInChosenWord.length; // counting the number of letters in the word

  console.log(chosenWord); 

  blanksAndSuccesses = []; 
  wrongGuesses = []; 

  // Fill up the blanksAndSuccesses list with appropriate number of blanks. This is based on number of letters in solution
  for (var i=0; i <numBlanks; i++){
    blanksAndSuccesses.push("_");
  }

  console.log(blanksAndSuccesses); 


  document.getElementById("guessesLeft").innerHTML = numGuesses;
  
  // Prints the blanks at the beginning of each round in the HTML
  document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");

  // Clears the wrong guesses from the previous round
  document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");



}

// checkLettesr() function
// It's where we will do all of the comparisons for matches. Again, it's not being called here. It's just being made for future use.
function checkLetters(letter) {

  var letterInWord = false; // this boolean will be toggled based on whether or not a user letter is found anywhere in the word

  // Check if a leter exists inside the array at all.
  for (var i=0; i<numBlanks; i++) {
    if(chosenWord[i] == letter) {
      letterInWord = true; // if the letter exists then toggle this boolean to true. This will be used in the next step. 
    }
  }

  // If the letter exists somewhere in the word, then figure out exactly where (which indices)
  if(letterInWord){
  
    // loop through the word 
    for (var i=0; i<numBlanks; i++){

      // Populate the blanksAndSuccesses with every instance of the letter.
      if(chosenWord[i] == letter) {
        blanksAndSuccesses[i] = letter; // here we set the specific space in blanks and letter equal to the letter when there is a match.
      }
    }
    console.log(blanksAndSuccesses); // logging for testing
  }
  // If the letter doesn't exist at all...
  else {
    wrongGuesses.push(letter); // then we add the letter to the list of wrong letters
    numGuesses--; // and we subtract one of the guesses
  }
}

// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made
function roundComplete(){

  // First, log an initial status update in the console telling us how many wins, losses, and guesses are left
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

  // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
  document.getElementById("guessesLeft").innerHTML= numGuesses;
  document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); // This will print the array of guesses and blanks onto the page
  document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" "); // this will print the wrong guesses onto the page.

  // If we have gotten all the letters to match the solution... 
  if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
    winCounter++; // add to the win counter 
    alert("You win!"); // give the user an alert

    // Update the win counter in the HTML
    document.getElementById("winCounter").innerHTML= winCounter;
    startGame(); // restart the game 
  }

  // If we've run out of guesses
  else if(numGuesses == 0) {
    lossCounter++;   // add to the loss counter 
    alert("You lose"); // give the user an alert
    alert("The character was" + " " + chosenWord);
    // Update the loss counter in the HTML
    document.getElementById("lossCounter").innerHTML= lossCounter; 
    startGame(); // restart the game
  }

}


// Starts the Game by running the startGame() function
startGame();

// Then initiates the function for capturing key clicks.
document.onkeyup = function(event) {
  letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); // converts all key clicks to lowercase lettesr
  
  checkLetters(letterGuessed);
  roundComplete();
 
 }


  
