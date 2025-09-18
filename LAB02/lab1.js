const prompt = require("prompt");

prompt.start();

prompt.get(["userSelection"], function (err, result) {
  if (err) {
    console.error(err);
    return;
  }

  const userSelection = result.userSelection.toUpperCase(); // Convertimos a mayúsculas
  console.log("Tu elección fue:", userSelection);

  // Generar selección de la computadora
  const randomNum = Math.random();
  let computerSelection;

  if (randomNum < 0.34) {
    computerSelection = "PAPER";
  } else if (randomNum <= 0.67) {
    computerSelection = "SCISSORS";
  } else {
    computerSelection = "ROCK";
  }

  console.log("Computer choice:", computerSelection);

  // Determinar el ganador
  if (userSelection === computerSelection) {
    console.log("It's a tie");
  } else if (
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    console.log("User Wins");
  } else {
    console.log("Computer Wins");
  }
});