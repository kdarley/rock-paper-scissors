function test(){
    return "it works!"
}

function randomNumber(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getComputerChoice(){
    let choice = randomNumber(0,3)
    if (choice === 0) {
        return "Rock"
    }
    else if (choice === 1) {
        return "Paper"
    }
    else {
        return "Scissors"
    }
}

function playRound(playerSelection, computerSelection){
    const playerS = playerSelection.toLowerCase()
    const computerS = computerSelection.toLowerCase()

    if (playerS == computerS){
        return [3, "Tie!"];
    } else if (playerS == "rock" && computerS == "scissors"){
        return [1, "You Win! Rock beats scissors."];
    } else if (playerS == "rock" && computerS == "paper"){
        return [2, "You Lose! Paper beats rock."];
    } else if (playerS == "scissors" && computerS == "paper"){
        return [1, "You Win! Scissors beats paper."];
    } else if (playerS == "scissors" && computerS == "rock"){
        return [2, "You Lose! Rock beats scissors."];
    } else if (playerS == "paper" && computerS == "rock"){
        return [1, "You Win! Paper beats rock."];
    } else {
        return [2, "You Lose! Scissors beats paper."];
    }
}

function getUserChoice(){
    let playerSelection = prompt("Let's play! Select rock, paper, or scissors.");

    if ((playerSelection.toLowerCase() !== "rock") && (playerSelection.toLowerCase() !== "scissors") && (playerSelection.toLowerCase() !== "paper")){
        return getUserChoice();
    }
    else {  
        return playerSelection;
    }      
}

function displayChoices(playerSelection, computerSelection){
    // text
    playerS = playerSelection.toLowerCase()
    computerS = computerSelection.toLowerCase()
    console.log(playerS)
    
    playerSelection = document.querySelector(".player.selection")
    computerSelection = document.querySelector(".computer.selection")

    playerSelection.textContent = playerS
    computerSelection.textContent = computerS

    //image
    playerImage = document.querySelector(".player.image")
    computerImage = document.querySelector(".computer.image")

    if (playerS == "rock"){
        playerImage.src = "./images/rock_p.png"
    } else if (playerS == "paper") {
        playerImage.src = "./images/paper_p.png"
    } else {
        playerImage.src = "./images/scissors_p.png"
    }

    if (computerS == "rock"){
        computerImage.src = "./images/rock_c.png"
    } else if (computerS == "paper") {
        computerImage.src = "./images/paper_c.png"
    } else {
        computerImage.src = "./images/scissors_c.png"
    }


}

function game(){
    computerWins=0
    playerWins=0
    ties = 0
    for (let i = 0; i <5; i++){
        let playerSelection = getUserChoice();

        let [code, result] = playRound(playerSelection, getComputerChoice());
        console.log(result);

        if (code == 1){
            playerWins += 1
        } else if (code == 2){
            computerWins += 1
        } else {
            ties += 1
        }
    }
    if (computerWins < playerWins){
        console.log("Player wins the game!")
    } else if (computerWins < playerWins){
        console.log("Computer wins the game!")
    } else {
        console.log("No winners this time.")
    }

    console.log("player wins: ", playerWins)
    console.log("computer wins: ", computerWins)
    console.log("tie games: ", ties)
};

// play game on button clicks
const playerOptions = document.querySelectorAll(".option")
console.log(playerOptions)
playerOptions.forEach((button) => {
     button.addEventListener('click', () => {
        computerChoice = getComputerChoice(),
        displayChoices(button.id, computerChoice),
        displayPrettyResult(playRound(button.id, computerChoice)[1]),
        incrementResult(playRound(button.id, computerChoice)[0]),
        incrementOne(),
        gameOver()
     })
});

function displayPrettyResult(result){
    gamePrettyResult = document.querySelector(".result")
    gamePrettyResult.textContent = result;
}

// give point to winner of game
function incrementResult(result){
    let scoreChange = null
    if (result == 1){
        scoreChange = document.querySelectorAll("#count-player")
    }else if (result == 2){
        scoreChange = document.querySelectorAll("#count-computer")
    } else {
        scoreChange = document.querySelectorAll("#count-ties")
    }

    for (record of scoreChange){
        let count = record.textContent;
        let newCount = parseInt(count) + 1;
    
        record.textContent = newCount;
    }
}

// incremenet the number of games played for each game
function incrementOne(){
    const gamesPlayed = document.querySelector("#count-games")
    let count = gamesPlayed.textContent;
    let newCount = parseInt(count) + 1;

    gamesPlayed.textContent = newCount;
}

function resetCounters(){
    const resetCounter = document.querySelectorAll('.counter')
    for (c of resetCounter){
        c.textContent=0
    }
};

// Start Game Button
function removeStartScreen(){
    const removeStartScreen = document.querySelector("#start-screen")
    removeStartScreen.style.display = "none"
}

function addGameScreen(){
    const addGameScreen = document.querySelector("#game")
    addGameScreen.style.display = "inline";
}

function removeGameScreen(){
    const removeGameScreen = document.querySelector("#game")
    removeGameScreen.style.display = "none";   
}

function removeEndScreen(){
    const removeEndScreen = document.querySelector("#end-screen")
    removeEndScreen.style.display = "none";
}

function addEndScreen(){
    const addEndScreen = document.querySelector("#end-screen")
    addEndScreen.style.display = "inline";
}

const start = document.querySelector("button#start")
start.addEventListener('click', ()=> {
    removeStartScreen(),
    addGameScreen();
});

function gameOver(){
    const scores = document.querySelectorAll(".player")
    for (score of scores){
        if (parseInt(score.textContent) == 5){
            removeGameScreen(),
            addEndScreen(),
            console.log("game over");     
        }
    }
}

const playAgain = document.querySelector("#play-again")
playAgain.addEventListener('click', ()=> {
    resetCounters(),
    removeEndScreen(),
    addGameScreen();
});






