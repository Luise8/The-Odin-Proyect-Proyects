// Create a function computerPlay that generates one of 3 possible random options: rock, paper, scissors.
function computerPlay() {
  return Math.floor(Math.random() * 100) > 66
    ? "Rock"
    : Math.floor(Math.random() * 100) > 33
    ? "Paper"
    : "Scissors";
}

// Create a function playRound that receives two inputs, a value given by a person (playerSelection) and a value generated by computerPlay (computerSelection). Then you have to compare and print the winner result like this: "You Lose! Paper beats Rock"

function playRound(playerSelection, computerSelection) {
  return (playerSelection == "Rock" && computerSelection == "Scissors") ||
    (playerSelection == "Paper" && computerSelection == "Rock") ||
    (playerSelection == "Scissors" && computerSelection == "Paper")
    ? `You win! ${playerSelection} beats ${computerSelection}`
    : playerSelection == computerSelection
    ? `Tie! There are not winner in this round`
    : `You Lose! ${computerSelection} beats ${playerSelection}`;
}

// Counter of points to computer and player and other variables
let countUser = document.querySelector("#player");
let countComputer = document.querySelector("#computer");
let roundCount;
let winnerRound = document.querySelector("#winner-round");
const contentButtons = document.querySelector("#contentButtons");
let cover = document.querySelector("#cover");
let playAgainbutton = document.querySelector("#play-game");

// Variables and function of the screen that shows the final result and asks if you want to play again
// It also resets all counter values.
playAgainbutton.addEventListener("click", (button) => {
  countUser.textContent = 0;
  countComputer.textContent = 0;
  roundCount = 0;
  winnerRound.style.color = "#c8d1d1";
  winnerRound.textContent = "First round";
  cover.style.display = "none";
  contentButtons.style.display = "flex";
  if (playAgainbutton.textContent !== "Do you want to play a game again?") {
    playAgainbutton.textContent = "Do you want to play a game again?";
  }
  resultGame.style.color = "black";
});

// Add addEventListener to each button that calls playRound with the playerSelection
const buttons = document.querySelectorAll("button.choices");
Array.from(buttons).forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    winner = playRound(button.textContent, computerPlay());
    if (/You win!/.test(winner)) {
      countUser.textContent++;
      winnerRound.style.color = "#37a647";
    } else if (/You Lose!/.test(winner)) {
      countComputer.textContent++;
      winnerRound.style.color = "#ee4343";
    } else {
      winnerRound.style.color = "#c8d1d1";
    }
    roundCount++;
    winnerRound.textContent = `Round ${roundCount}: ${winner}`;

    // When player or computer gets 5 points, then anunciate result and ask for another play?
    if (countUser.textContent == 5 || countComputer.textContent == 5) {
      contentButtons.style.display = "none";
      cover.style.display = "flex";
      if (resultGame.style.width !== "100%") {
        resultGame.style.width = "100%";
      }
      if (countUser.textContent > countComputer.textContent) {
        resultGame.textContent = `You have won ${countUser.textContent} to ${countComputer.textContent}`;
        resultGame.style.color = "#05F258";
      } else {
        resultGame.textContent = `You have lost ${countUser.textContent} to ${countComputer.textContent}`;
        resultGame.style.color = "brown";
      }
    }
  });
});

// Code to adjust the height of the election buttons according to the width dynamically.
const contentChoices = document.querySelectorAll(".content-choices");
Array.from(contentChoices).forEach((contentChoice) => {
  function changeHeight() {
    if (contentChoice.offsetWidth != contentChoice.offsetHeight) {
      contentChoice.style.height = contentChoice.offsetWidth + "px";
    }
  }
  new ResizeObserver(changeHeight).observe(contentChoice);
});
