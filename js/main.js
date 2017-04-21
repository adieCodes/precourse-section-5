// TODO: added life count update but now need to refactor previous code to make better use of jQuery and simplify
// TODO: When character guessed correctly reveal matches in word
// TODO: When character guessed incorrectly add character to #guesses
// TODO: When character guessed incorectly remove a life
// TODO: When lives === 0, game over
// TODO: When all characters of word guessed, game won
// TODO: Use API to chose a category and then a random word

var hangman = (function() {
	// on page load insert underscores for each character in the word
	// setting variables to be accessible thoughout program
	var gameWord;
	// turn game word to array to make easier to replace
	var gameWordToArr;
	// Set number of lives
	var lifeCount = 10;
	var lifeCountEle = document.createElement("span");
	lifeCountEle.id = 'gameLives';
	lifeCountEle.append(lifeCount);
	// setting variable to act as HTML node to add underscores to page
	var hiddenWordEle;
	var insertWord = (function() {
		// by chosing a word
		gameWord = 'Steve';
		gameWord = gameWord.toLowerCase();
		// setting variable to store underscores
		var hiddenWord = '';
		// loop each character of word and add underscore
		for (var i = 0; i < gameWord.length; i++) {
			hiddenWord += '_ ';
		}
		// create text node for game word and life count
		hiddenWordEle = document.createTextNode(hiddenWord);
		// add text node to page for game word
		document.getElementById('word').append(hiddenWordEle);
		// add text node to page for lives
		document.getElementById('lives').append(lifeCountEle);
	})();
	// store previous guesses outside of function to stop it getting reset
	var previousGuesses = [];
	document.getElementById('guessSubmit').addEventListener('click', function() {
		// set current guess to input
		var currentGuess = document.getElementById('guess').value.toLowerCase();
		// add current guess to previous guess array
		if (previousGuesses.length === 0 || previousGuesses.indexOf(currentGuess) === -1) {
			previousGuesses[0] = currentGuess;
			document.getElementById('previousGuesses').append(currentGuess + ' ');
			checkGuess(currentGuess);
		} else {
			// if letter already guessed return alert
			alert("Already guessed this letter");
		}
		// display guess on page
		document.getElementById('guess').value = '';
	});
	var lifeEle = document.getElementById('lives');
	var checkGuess = function(char) {
		gameWordToArr = gameWord.split('');
		console.log(gameWordToArr);
		if (gameWordToArr.indexOf(char) === -1) {
			lifeCount--;
			//lifeEle.removeChild(lifeCountEle);
			var span = '<span id="gameLives">' + lifeCount + '</span>';
			$('#gameLives').replaceWith(span);
		}
	};
})();
