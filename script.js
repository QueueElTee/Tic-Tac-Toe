let playerForm = document.querySelector('.player-form');
let currentPlayerName = document.querySelector('.player-name');
let player1 = '';
let player2 = '';

const player = (name, marker) => {
    return { name, marker }
}

const gameBoard = (() => {
    let board = [];
    let gameCounter = 0;
    return { board, gameCounter };
})();

playerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let player1Name = document.querySelector('#player1').value;
    let player2Name = document.querySelector('#player2').value;

    player1 = player(player1Name, 'X');
    player2 = player(player2Name, 'O');

    playerForm.style.display = 'none';

    let currentPlayer = document.querySelector('.current-player');
    currentPlayer.style.display = 'block';
    // let currentPlayerName = document.querySelector('.player-name');
    currentPlayerName.textContent = `${player1.name}'s `;
    // gameBoard.gameCounter++
});

const displayController = (() => {
    // const initializeDislpay = () => {
    //     currentPlayerName.textContent = `${player1.name}'s `;
    //     gameBoard.gameCounter++;
    // }

    const controlDisplay = (e) => {
        // if (gameBoard.gameCounter == 1){

        // }

        if(gameBoard.gameCounter > 1){
            if(gameBoard.gameCounter % 2 != 0){
                currentPlayerName.textContent = `${player1.name}'s `;
                e.target.textContent = 'X';
            } else{
                currentPlayerName.textContent = `${player2.name}'s `;
                e.target.textContent = 'O';
            }
        }
    }
    return { controlDisplay }
})();

let boardCells = document.querySelectorAll('.game-board *');
boardCells.forEach(cell => cell.addEventListener('click', (e) => {
    gameBoard.gameCounter++;
    console.log(gameBoard.gameCounter);
    displayController.controlDisplay(e);
    console.log(e.target);
}));