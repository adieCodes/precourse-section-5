// TODO: If previous guess has other guesses between it's not noticed as duplicate
// TODO: When character guessed incorrectly add character to #guesses
// TODO: When lives === 0, game over
// TODO: When all characters of word guessed, game won
// TODO: Use API to chose a category and then a random word

var hangman = (function() {
	// on page load...
	// setting variables to be accessible thoughout function
	var gameWord;
	// setting variable to store underscores
	var hiddenWord = '';
	// turn hidden word to array to make easier to replace
	var hiddenWordToArr, gameWordToArr;
	// Set number of lives
	var lifeCount = 10;
	// create element to append number of lives
	var lifeCountEle = document.createElement("span");
	lifeCountEle.id = 'gameLives';
	lifeCountEle.append(lifeCount);
	// add text node to page for lives
	document.getElementById('lives').append(lifeCountEle);
	// setting variable to act as HTML node to add underscores to page with text node and ID
	var hiddenWordEle = document.createElement('span');
	hiddenWordEle.id = "word";
	// insert underscores for each character in the word
	var insertWord = (function() {
		// by chosing a word
		gameWord = 'Steve';
		gameWord = gameWord.toLowerCase();
		// loop each character of word and add underscore
		for (var i = 0; i < gameWord.length; i++) {
			hiddenWord += '_ ';
		}
		// create text node for game word and life count
		hiddenWordEle = document.createElement('span');
		hiddenWordEle.id = "word";
		hiddenWordEle.append(hiddenWord);
		// add text node to page for game word
		document.getElementById('wordContainer').append(hiddenWordEle);
	})();
	// store previous guesses outside of function to stop it getting reset
	var previousGuesses = [];
	document.getElementById('guessSubmit').addEventListener('click', function() {
		// set current guess to input
		var currentGuess = document.getElementById('guess').value.toLowerCase();
		// add current guess to previous guess array
		// call checkGuess function if new guess
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
		hiddenWordToArr = hiddenWord.split(' ');
		gameWordToArr = gameWord.split('');
		console.log(hiddenWordToArr);
		if (gameWordToArr.indexOf(char) === -1) {
			lifeCount--;
			//lifeEle.removeChild(lifeCountEle);
			var span = '<span id="gameLives">' + lifeCount + '</span>';
			$('#gameLives').replaceWith(span);
		} else {
			gameWordToArr.forEach(function(ele, index) {
				console.log("ele = " + ele + " char = " + char);
				if (ele === char) {
					hiddenWordToArr[index] = char;
				}
			});
			var updatedWord = hiddenWordToArr.join(' ');
			$('#word').replaceWith('<span id="word">' + updatedWord + '</span>');
			hiddenWord = updatedWord;
		}
		if (lifeCount === 0) {
			alert("Game over");
		}
	};
})();
