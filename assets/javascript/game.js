let currentWordValue = document.getElementById("currentWord");
let winsValue = document.getElementById("wins");
let lossesValue = document.getElementById("losses");
let guessesLeftValue = document.getElementById("guessesLeft");
let lettersAreadyGuessedValue = document.getElementById("lettersAlreadyGuessed");

const mainProject = {
    words: ["Eagles", "Queen", "Rihanna", "Eminem"],
    appchoices: "abcdefghijklmnopqrstuvwxyz".split(""),
    randomWord: '',
    wordLetters: [],
    guessesLeft: 9,
    lettersAlreadyGuessed: [], correctLettersGuessed: [],
    wins: 0,
    losses: 0,
    mainGame: function mainGame() {
        this.randomWord = this.words[Math.floor(Math.random() * this.words.length)].toLowerCase();
        this.wordLetters = this.randomWord.split("");
        console.log('wordLetters= ' + this.wordLetters);
        for (var i = 0; i < this.wordLetters.length; i++) {
            this.correctLettersGuessed.push("_");
        }
        currentWordValue.textContent = "  " + this.correctLettersGuessed.join("  ");
    },
    addingLettes: function addingLettes() {
        let keyboardId = document.getElementById("keyboard");
        for (let index = 0; index < this.appchoices.length; index++) {
            const element = this.appchoices[index];
            let newELement = document.createElement("div");
            newELement.textContent = element;
            newELement.setAttribute("class", "letters");

            keyboardId.appendChild(newELement);
        }
    },
    updateDisplay: function updateDisplay() {
        currentWordValue.textContent = "  " + this.correctLettersGuessed.join("  ");
        lettersAreadyGuessedValue.textContent = this.lettersAlreadyGuessed.join(",");
        winsValue.textContent = this.wins;
        guessesLeftValue.textContent = this.guessesLeft;
        lossesValue.textContent = this.losses;
    }

};

guessesLeftValue.textContent = mainProject.guessesLeft;

//check letters of word
function checkWordLetters(yourChoice) {
    let wordLetters = mainProject.wordLetters;
    if (wordLetters.includes(yourChoice)) {
        foundLetter = true;
    } else {
        foundLetter = false;
    }

    if (foundLetter) {
        for (var i = 0; i < wordLetters.length; i++) {
            if (wordLetters[i] == yourChoice) {
                mainProject.correctLettersGuessed[i] = yourChoice;
            }
        }
    } else {
        if (mainProject.guessesLeft > 0) {
            if (!mainProject.lettersAlreadyGuessed.includes(yourChoice)) {
                mainProject.guessesLeft--;
                mainProject.lettersAlreadyGuessed.push(yourChoice);
            }
        } else {
            mainProject.losses++;
        }
    }
    mainProject.updateDisplay();
}

//Set Winner and Loser
function SetWinnerLoser() {
    let wordLetters = mainProject.wordLetters;
    let correctLettersGuessed = mainProject.correctLettersGuessed;
    if (wordLetters.toString() == correctLettersGuessed.toString()) {
        playSound(mainProject.correctLettersGuessed.join(""));
        document.getElementById("winningWord").textContent = mainProject.correctLettersGuessed.join("");
        mainProject.wins++;
        setTimeout(resetGame(), 10000);
    } else {
        if (mainProject.guessesLeft === 0) {
            mainProject.losses++;
            resetGame();
        }
    }
    mainProject.updateDisplay();
}


//Play sound when winning
function playSound(soundName) {
    let soundId = document.getElementById(soundName);
    soundId.play();
}

//reset game when winning or losing
function resetGame() {
    mainProject.guessesLeft = 9;
    mainProject.lettersAlreadyGuessed = [];
    mainProject.correctLettersGuessed = [];

    mainProject.mainGame();
    //because of cache it was bringing same random number with running mainGame, so I assigned another random one again.
    mainProject.randomWord = mainProject.words[Math.floor(Math.random() * mainProject.words.length)].toLowerCase();

}

mainProject.mainGame();
mainProject.addingLettes();


document.onkeyup = function (event) {
    let yourGuess = event.key;
    checkWordLetters(yourGuess);
    SetWinnerLoser();
}

document.querySelectorAll(".letters").forEach(element => {
    element.addEventListener("click", function (event) {
        let yourGuess = this.textContent;
        checkWordLetters(yourGuess);
        SetWinnerLoser();
    });
});

document.getElementById("pauseBtn").addEventListener("click", function (event) {
    document.querySelectorAll('.sound').forEach(element => {
        element.pause();
    });
});