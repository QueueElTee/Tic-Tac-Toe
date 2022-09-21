let playerForm = document.querySelector('.player-form');
let player1 = '';
let player2 = '';

const player = (name, marker) => {
    return { name, marker }
}

const gameBoard = (() => {
    let board = [];
    return { board };
})();

playerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let player1Name = document.querySelector('#player1').value;
    let player2Name = document.querySelector('#player2').value;

    player1 = player(player1Name, 'X');
    player2 = player(player2Name, 'O');
});