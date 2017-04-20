// TODO: When character guessed correctly reveal matches in word
// TODO: When character guessed incorrectly add character to #guesses
// TODO: When character guessed incorectly remove a life
// TODO: When lives === 0, game over
// TODO: When all characters of word guessed, game won
// TODO: Use API to chose a category and then a random word

var hangman = (function() {
	var insertWord = (function() {
		var word = 'Steve';
		var hiddenWord = '';
		var hiddenWordEle;
		for (var i = 0; i < word.length; i++) {
			hiddenWord += '_ ';
		}
		hiddenWordEle = document.createTextNode(hiddenWord);
		document.getElementById('word').append(hiddenWordEle);
	})();
	var previousGuesses = [];
	document.getElementById('guessSubmit').addEventListener('click', function() {
		var currentGuess = document.getElementById('guess').value;
		if (previousGuesses.length === 0) {
			previousGuesses[0] = currentGuess;
			document.getElementById('previousGuesses').append(currentGuess + ' ');
		} else if (previousGuesses.indexOf(currentGuess) === -1) {
			previousGuesses.push(currentGuess);
			document.getElementById('previousGuesses').append(currentGuess + ' ');
		} else {
			alert("Already guessed this letter");
		}
		document.getElementById('guess').value = '';
		currentGuess = '';
	});
})();
