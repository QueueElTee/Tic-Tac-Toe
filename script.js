let playerForm = document.querySelector('.player-form');
let currentPlayer = document.querySelector('.current-player');
let currentPlayerName = '';
let player1 = '';
let player2 = '';

const player = (name, marker) => {
    return { name, marker }
}

const gameBoard = (() => {
    let gameCounter = 0;
    return { gameCounter };
})();

playerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let player1Name = document.querySelector('#player1').value;
    let player2Name = document.querySelector('#player2').value;

    player1 = player(player1Name, 'X');
    player2 = player(player2Name, 'O');

    playerForm.style.display = 'none';

    currentPlayer.style.display = 'block';
    displayController.initializeDislpay();

    document.querySelector('#player1').value = '';
    document.querySelector('#player2').value = '';
});

const displayController = (() => {
    const setName = () => {
        currentPlayerName = gameBoard.gameCounter % 2 != 0 ? `${player1.name}'s` : `${player2.name}'s`;
        currentPlayer.textContent = `${currentPlayerName} Turn`;
    }

    const setMarker = () => {
        let currentMarker = gameBoard.gameCounter % 2 != 0 ? `${player1.marker}` : `${player2.marker}`;
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
        }
    }

    const controlDisplay = (e) => {
        if(gameBoard.gameCounter >= 0){
            validPlayerAlternations(e);
        }
    }

    const showPlayAgainButton = () => {
        document.querySelector('.play-again').style.display = 'block';
    }

    let isThereAWinner = false;

    const checkForAWin = (marker, player) => {
        const checkForAPattern = (spot1, spot2, spot3) => {
            let cell1 = document.querySelector(`.${spot1}`);
            let cell2 = document.querySelector(`.${spot2}`);
            let cell3 = document.querySelector(`.${spot3}`);
            if(cell1.textContent == `${marker}` && cell2.textContent == `${marker}` && cell3.textContent == `${marker}`){
                currentPlayer.textContent = `${player} wins the game.`;
                cell1.style.cssText = 'background-color: #D3D3D3';
                cell2.style.cssText = 'background-color: #D3D3D3';
                cell3.style.cssText = 'background-color: #D3D3D3';
                displayController.isThereAWinner = true;
                displayController.showPlayAgainButton();
            }
        }

        checkForAPattern('one', 'two', 'three');
        checkForAPattern('four', 'five', 'six');
        checkForAPattern('seven', 'eight', 'nine');
        checkForAPattern('one', 'four', 'seven');
        checkForAPattern('two', 'five', 'eight');
        checkForAPattern('three', 'six', 'nine');
        checkForAPattern('one', 'five', 'nine');
        checkForAPattern('three', 'five', 'seven');
    }

    const itsATie = () => {
        currentPlayer.textContent = `It's a tie.`;
    }

    return { setName, initializeDislpay, controlDisplay, isThereAWinner, checkForAWin, itsATie, showPlayAgainButton }
})();

let boardCells = document.querySelectorAll('.game-board *');
boardCells.forEach(cell => cell.addEventListener('click', (e) => {
    if(gameBoard.gameCounter > 0 && displayController.isThereAWinner == false){
        displayController.controlDisplay(e);
        displayController.checkForAWin(player1.marker, player1.name);
        displayController.checkForAWin(player2.marker, player2.name);
        if(gameBoard.gameCounter <= 8 && displayController.isThereAWinner == false){
            gameBoard.gameCounter++;
            displayController.setName();
        } else if(displayController.isThereAWinner == false){
            displayController.itsATie();
            displayController.showPlayAgainButton();
        }
    } else {
        document.querySelector('#player1').style.cssText = 'border: 2px solid black;';
        document.querySelector('#player2').style.cssText = 'border: 2px solid black;';
    }
}));

let restart = document.querySelector('.play-again');
restart.addEventListener('click', () => {
    gameBoard.gameCounter = 0;
    displayController.isThereAWinner = false;
    player1 = '';
    player2 = '';
    currentPlayer.textContent = '';
    currentPlayer.style.display = 'none';
    playerForm.style.display = 'block';
    boardCells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = 'white';
    });
    restart.style.display = 'none';
});