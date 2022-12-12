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
        if (board[pos]) {
            return;
        }
        board[pos] = currentPlayer;
        render();
        if (getGameResult()) {
            game.endGame(getGameResult());
        } else {
            currentPlayer = currentPlayer == 'O' ? 'X' : 'O';
        }
    }

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

    return {setPlayer, handleClick, clear};
})();

const game = (function() {
    function newGame() {
        gameBoard.clear();
    }

    function endGame(result) {
        const display = document.querySelector('.display');
        if (result == 'draw') {
            display.textContent = 'This game is a draw.';
        } else {
            display.textContent = `The winner is ${result}.`;
        }
    }

    
    return {newGame, endGame};
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

const playerX = Player('O');
playerX.play();