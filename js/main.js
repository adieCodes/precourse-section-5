// TODO: When character guessed correctly reveal matches in word
// TODO: When character guessed incorrectly add character to #guesses
// TODO: When character guessed incorectly remove a life
// TODO: When lives === 0, game over
// TODO: When all characters of word guessed, game won
// TODO: Use API to chose a category and then a random word

var hangman = (function() {
	// on page load insert underscores for each character in the word
	var insertWord = (function() {
		// by chosing a word
		var word = 'Steve';
		// setting variable to store underscores
		var hiddenWord = '';
		// setting variable to act as HTML node to add underscores to page
		var hiddenWordEle;
		// loop each character of word and add underscore
		for (var i = 0; i < word.length; i++) {
			hiddenWord += '_ ';
		}
		// create text node
		hiddenWordEle = document.createTextNode(hiddenWord);
		// add text node to page
		document.getElementById('word').append(hiddenWordEle);
	})();
	// store previous guesses outside of function to stop it getting reset
	var previousGuesses = [];
	document.getElementById('guessSubmit').addEventListener('click', function() {
		// set current guess to input
		var currentGuess = document.getElementById('guess').value;
		// add current guess to previous guess array
		if (previousGuesses.length === 0) {
			previousGuesses[0] = currentGuess;
			document.getElementById('previousGuesses').append(currentGuess + ' ');
		} else if (previousGuesses.indexOf(currentGuess) === -1) {
			previousGuesses.push(currentGuess);
			document.getElementById('previousGuesses').append(currentGuess + ' ');
		} else {
			// if letter already guessed return alert
			alert("Already guessed this letter");
		}
		// display guess on page
		document.getElementById('guess').value = '';
	});
})();
