let playerForm = document.querySelector('.player-form');
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
    let currentPlayerName = document.querySelector('.player-name');
    currentPlayerName.textContent = `${player1.name}'s `;
    gameBoard.gameCounter++
});

const displayController = (() => {
    if(gameBoard.gameCounter > 0){
        if(gameBoard.gameCounter % 2 != 0){
            console.log('X');
        } else{
            console.log('O');
        }
    }
})();