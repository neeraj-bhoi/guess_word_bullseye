const inputs = document.querySelector(".inputs"),
    inputLetter = document.querySelector(".letter-input");
    hintTag = document.querySelector(".hint span"),
    wrongGuess = document.querySelector(".wGuess span"),
    renainingGuess = document.querySelector(".rGuess span"),
    resetBtn = document.querySelector(".reset-btn");

let word, maxGuesses, incorrect = [], correct = [];
function randomWord() {
    let randomItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomItem.word;
    maxGuesses = 8;
    correct = []; incorrect = [];
    hintTag.innerText = randomItem.hint;
    renainingGuess.innerText = maxGuesses;
    wrongGuess.innerText = incorrect;
    let numberOfBoxes = "";
    for (let i = 0; i < word.length; i++) {
        numberOfBoxes += `<input type="text" disabled>`;
        inputs.innerHTML = numberOfBoxes;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    // console.log(e);
    // console.log(key);
    if (!incorrect.includes(key) && !correct.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correct += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            incorrect.push(key);
            maxGuesses--;
        }
        wrongGuess.innerText = incorrect;
        renainingGuess.innerText = maxGuesses;
    }
    inputLetter.value = "";
    setTimeout(() => {
        if (correct.length === word.length) {
            alert("Congratulations! You won");
            return randomWord();
        } else if (maxGuesses <= 0 ) {
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
resetBtn.addEventListener("click", randomWord);
inputLetter.addEventListener("input", initGame);
inputs.addEventListener("click", () => inputLetter.focus());
document.addEventListener("keydown", () => inputLetter.focus());