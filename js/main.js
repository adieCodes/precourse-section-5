// TODO: Change input to mouse selection of elements
// TODO: Change alerts to bootstrap alerts
// TODO: Add support for multiword gameWord (e.g. 'Steve Jobs')
// TODO: Don't display rest of game until category is selected

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
	// IIFE to run event listener for category selection
	var categorySelection = function() {
		var chooseCategory = function(e) {
			// remove event listener to stop from add multiple words
			document.getElementById('categories').removeEventListener('click', chooseCategory, false);
			// highlight selection
			$(e.target).addClass('chosen');
			category = e.target.id;
			insertWord();
		};
		document.getElementById('categories').addEventListener('click', chooseCategory, false);
	};
	categorySelection();
	// insert underscores for each character in the word
	var insertWord = function() {
		// assign a word from the appropriate category
		if (category == 'animal') {
			gameWord = 'giraffe';
		} else if (category == 'sport') {
			gameWord = 'cricket';
		} else {
			gameWord = 'manchester';
		}
		gameWord = gameWord.toLowerCase();
		// loop each character of gameWord and add underscore
		for (var i = 0; i < gameWord.length; i++) {
			hiddenWord += '_ ';
		}
		// create text node for game word and life count
		hiddenWordEle = document.createElement('span');
		hiddenWordEle.id = "word";
		hiddenWordEle.append(hiddenWord);
		// add text node to page for game word
		document.getElementById('wordContainer').append(hiddenWordEle);
	};
	// store previous guesses outside of function to stop it getting reset
	var previousGuesses = [];
	document.getElementById('guessSubmit').addEventListener('click', function() {
		// set current guess to input
		var currentGuess = document.getElementById('guess').value.toLowerCase();
		// add current guess to previous guess array
		// call checkGuess function if new guess
		if (previousGuesses.indexOf(currentGuess) === -1) {
			previousGuesses.push(currentGuess);
			document.getElementById('previousGuesses').append(currentGuess + ' ');
			checkGuess(currentGuess);
		} else {
			// if letter already guessed return alert
			alert("Already guessed this letter");
		}
	});
	var lifeEle = document.getElementById('lives');
	var checkGuess = function(char) {
		// array of underscores the length of the gameWord
		hiddenWordToArr = hiddenWord.split(' ');
		// array of every letter in the gameWord
		gameWordToArr = gameWord.split('');
		var updatedWord;
		// variable to store element to display life count
		var lifeSpan;
		// if character guessed isn't found in gameWord reduce lifecount
		if (gameWordToArr.indexOf(char) === -1) {
			lifeCount--;
			lifeSpan = '<span id="gameLives">' + lifeCount + '</span>';
			$('#gameLives').replaceWith(lifeSpan);
		} else {
			// if character is in gameWord show where it is
			gameWordToArr.forEach(function(ele, index) {
				if (ele === char) {
					hiddenWordToArr[index] = char;
				}
			});
			updatedWord = hiddenWordToArr.join(' ');
			$('#word').replaceWith('<span id="word">' + updatedWord + '</span>');
			hiddenWord = updatedWord;
		}
		// game ending scenario's
		if (lifeCount === 0) {
			$('#gameResult').append('<span>You lose :(</span>');
			$('#gameReset').modal('show');
			$('#gameResetYes').on('click', function() {
				gameReset();
				$('#gameReset').modal('hide');
			});
		} else if (hiddenWord.trim() === gameWordToArr.join(' ')) {
			$('#gameResult').append('<span>Winner, high fives all round!!</span>');
			$('#gameReset').modal('show');
			$('#gameResetYes').on('click', function() {
				gameReset();
				$('#gameReset').modal('hide');
			});
		}
	};
	var gameReset = function() {
		$('#' + category).removeClass('chosen active');
		gameWord = '';
		lifeCount = 10;
		hiddenWord = '';
		previousGuesses = [];
		updatedWord = '';
		hiddenWordToArr = '';
		gameWordToArr = '';
		category = '';
		$('#word').remove();
		lifeSpan = '<span id="gameLives">' + lifeCount + '</span>';
		$('#previousGuesses').html('');
		$('#gameLives').replaceWith(lifeSpan);
		categorySelection();
	};
})();
