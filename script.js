const playerX = Player('X');
const playerO = Player('O');

const gameBoard = (function() {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    function render() {
        for (let i = 0; i < 9; i++) {
            const square = document.querySelector(`.square:nth-child(${i + 1})`);
            square.textContent = board[i];
        }
    }

    function addMark(pos, mark) {
        if (board[pos]) {
            return;
        }
        board[pos] = mark;
        render();
    }

    // Checks the board for winner. Returns 'X' or 'O' or 'draw'. Returns false if the game is still not resolved.
    function getGameResult() {
        if (board[0]) {
            if (board[0] == board[1] && board[1] == board[2]) {
                return board[0];
            }
            if (board[0] == board[3] && board[3] == board[6]) {
                return board[0];
            }
            if (board[0] == board[4] && board[4] == board[8]) {
                return board[0];
            }
        }
        if (board[1]) {
            if (board[1] == board[4] && board[4] == board[7]) {
                return board[1];
            }
        }
        if (board[2]) {
            if (board[2] == board[5] && board[5] == board[8]) {
                return board[2];
            }
            if (board[2] == board[4] && board[4] == board[6]) {
                return board[2];
            }
        }
        if (board[3]) {
            if(board[3] == board[4] && board[4] == board[5]) {
                return board[3];
            }
        }
        if (board[6]) {
            if (board[6] == board[7] && board[7] == board[8]) {
                return board[6];
            }
        }
        if (board.every(mark => mark)) {
            return 'draw';
        }
        return false;
    }

    function clear() {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }
        render();
    }

    return {addMark, clear, getGameResult};
})();

const game = (function() {

    let currentPlayer = playerO;
    let gameEnded;

    function newGame() {
        gameBoard.clear();
        currentPlayer = playerO;
        gameEnded = false;
    }

    function endGame(result) {
        const display = document.querySelector('.display');
        if (result == 'draw') {
            display.textContent = 'This game is a draw.';
        } else {
            display.textContent = `The winner is ${result}.`;
        }
        gameEnded = true;
    }

    function handleClick(pos) {
        if (gameEnded) {
            return;
        }
        currentPlayer.play(pos);
        let winner = gameBoard.getGameResult();
        if (winner) {
            endGame(winner);
        } else {
            currentPlayer = currentPlayer == playerO ? playerX : playerO;
        }
        
    }

    
    return {newGame, endGame, handleClick};
})();

function Player(mark) {
    function play(pos) {
        gameBoard.addMark(pos, mark);
    }
    return {play};
}

const squares = document.querySelectorAll('.square');

for (let i = 0; i < 9; i++) {
    squares[i].addEventListener('click', () => game.handleClick(i));
}

game.newGame();