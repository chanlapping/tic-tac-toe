const gameBoard = (function() {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    let currentPlayer = 'O';

    function render() {
        for (let i = 0; i < 9; i++) {
            const square = document.querySelector(`.square:nth-child(${i + 1})`);
            square.textContent = board[i];
        }
    }

    function setPlayer(mark) {
        currentPlayer = mark;
    }

    function handleClick(pos) {
        if (board[pos] == 'X' || board[pos] == 'O') {
            return;
        }
        board[pos] = currentPlayer;
        render();
        
    }

    function clear() {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }
        render();
    }

    return {setPlayer, handleClick, clear};
})();

const game = (function() {
    function newGame() {
        gameBoard.clear();
    }

    
    return {newGame};
})();

function Player(mark) {
    function play() {
        gameBoard.setPlayer(mark);
    }
    return {play};
}

const squares = document.querySelectorAll('.square');

for (let i = 0; i < 9; i++) {
    squares[i].addEventListener('click', () => gameBoard.handleClick(i));
}

gameBoard.clear();

const playerX = Player('X');
playerX.play();