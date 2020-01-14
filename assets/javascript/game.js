let words = ["Eagles", "Queen", "Rihanna", "Eminem"];
let randomWord = '';
let wordLetters = [];
let guessesLeft = 9;
let lettersAlreadyGuessed = [];
let correctLettersGuessed = [];
let wins = 0;
let losses = 0;



let currentWordValue = document.getElementById("currentWord");
let winsValue = document.getElementById("wins");
let lossesValue = document.getElementById("losses");
let guessesLeftValue = document.getElementById("guessesLeft");
let lettersAreadyGuessedValue = document.getElementById("lettersAlreadyGuessed");

guessesLeftValue.textContent = guessesLeft;


const appchoices = "abcdefghijklmnopqrstuvwxyz".split("");
function addingLettes() {
    let keyboardId = document.getElementById("keyboard");

    for (let index = 0; index < appchoices.length; index++) {
        const element = appchoices[index];
        let newELement = document.createElement("div");
        newELement.textContent = element;
        newELement.setAttribute("class", "letters");

        keyboardId.appendChild(newELement);
    }
}


function mainGame() {
    randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

    wordLetters = randomWord.split("");
    console.log('wordLetters= ' + wordLetters);

    for (var i = 0; i < wordLetters.length; i++) {
        correctLettersGuessed.push("_");
    }

    currentWordValue.textContent = "  " + correctLettersGuessed.join("  ");
}

function checkWordLetters(yourChoice) {
    if (wordLetters.includes(yourChoice)) {
        foundLetter = true;
    } else {
        foundLetter = false;
    }

    if (foundLetter) {
        for (var i = 0; i < wordLetters.length; i++) {
            if (wordLetters[i] == yourChoice) {
                correctLettersGuessed[i] = yourChoice;
            }
        }
    } else {
        if (guessesLeft > 0) {
            if (!lettersAlreadyGuessed.includes(yourChoice)) {
                guessesLeft--;
                lettersAlreadyGuessed.push(yourChoice);
            }
        } else {
            losses++;
        }
    }
    updateDisplay();

    console.log(correctLettersGuessed);
}
function SetWinnerLoser() {
    if (wordLetters.toString() == correctLettersGuessed.toString()) {
        playSound(correctLettersGuessed.join(""));
        document.getElementById("winningWord").textContent = correctLettersGuessed.join("");
        wins++;
        setTimeout(resetGame(), 10000);
    } else {
        if (guessesLeft === 0) {
            losses++;
            resetGame();
        }
    }
    updateDisplay();
}

function playSound(soundName) {
    let soundId = document.getElementById(soundName);
    soundId.play();
}


function updateDisplay() {
    currentWordValue.textContent = "  " + correctLettersGuessed.join("  ");
    lettersAreadyGuessedValue.textContent = lettersAlreadyGuessed.join(",");
    winsValue.textContent = wins;
    guessesLeftValue.textContent = guessesLeft;
    lossesValue.textContent = losses;
}



function resetGame() {
    guessesLeft = 9;
    lettersAlreadyGuessed = [];
    correctLettersGuessed = [];

    mainGame();
    //because of cache it was bringing same random number with running mainGame, so I assigned another random one again.
    randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();

}

mainGame();
addingLettes();


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

