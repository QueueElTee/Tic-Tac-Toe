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
    displayController.initializeDislpay();
});

const displayController = (() => {
    const setName = () => {
        currentPlayerName.textContent = gameBoard.gameCounter % 2 != 0 ? `${player1.name}'s ` : `${player2.name}'s `;
        console.log(`In setName ${gameBoard.gameCounter}`)
    }

    const setMarker = () => {
        let currentMarker = gameBoard.gameCounter % 2 != 0 ? `${player1.marker}` : `${player2.marker}`;
        console.log(`In setMarker ${gameBoard.gameCounter}`)
        return currentMarker;
    }

    const initializeDislpay = () => {
        gameBoard.gameCounter = 1;
        setName();
        setMarker();
    }

    const validPlayerAlternations = (e) => {
        setName();
        if(e.target.textContent == ''){
            e.target.textContent = setMarker();
        } else {
            gameBoard.gameCounter--;
            console.log(`In valid player alternations ${gameBoard.gameCounter}`);
        }
    }

    const controlDisplay = (e) => {
        if(gameBoard.gameCounter >= 0){
            validPlayerAlternations(e);
        }
    }

    return { setName, initializeDislpay, controlDisplay }
})();

let boardCells = document.querySelectorAll('.game-board *');
boardCells.forEach(cell => cell.addEventListener('click', (e) => {
    console.log(gameBoard.gameCounter);
    displayController.controlDisplay(e);
    console.log(e.target);

    if(e.target.textContent != ''){
        gameBoard.gameCounter++;
        displayController.setName();
    }
}));