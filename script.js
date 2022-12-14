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

    // Returns true if mark is successfully added. Returns false otherwise.
    function addMark(pos, mark) {
        if (board[pos]) {
            return false;
        }
        board[pos] = mark;
        render();
        return true;
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
    let gameOver;
    const display = document.querySelector('.display');

    function newGame() {
        gameBoard.clear();
        currentPlayer = playerO;
        gameOver = false;
        display.textContent = `${currentPlayer.getName()} to play.`;
    }

    function endGame(result) {
        if (result == 'draw') {
            display.textContent = 'This game is a draw.';
        } else if (result == 'X'){
            display.textContent = `The winner is ${playerX.getName()}.`;
        } else {
            display.textContent = `The winner is ${playerO.getName()}`;
        }
        gameOver = true;
    }

    function handleClick(pos) {
        if  (gameOver) {
            return;
        }
        let played = currentPlayer.play(pos);
        if (!played) {
            return;
        }
        let winner = gameBoard.getGameResult();
        if (winner) {
            endGame(winner);
        } else {
            // currentPlayer = currentPlayer == playerO ? playerX : playerO;
            // display.textContent = `${currentPlayer.getName()} to play.`;
            let randomPos;
            do {
                randomPos = Math.floor(Math.random() * 9);
            } while (!playerX.play(randomPos));
        }
        
    }

    
    return {newGame, endGame, handleClick};
})();

function Player(mark) {
    let name = 'Player ' + mark;

    function play(pos) {
        return gameBoard.addMark(pos, mark);
    }

    function setName(newName) {
        name = newName;
    }

    function getName() {
        return name;
    }

    return {play, setName, getName};
}

const squares = document.querySelectorAll('.square');

for (let i = 0; i < 9; i++) {
    squares[i].addEventListener('click', () => game.handleClick(i));
}

const newGameBtn = document.querySelector('#newGameBtn');
newGameBtn.addEventListener('click', game.newGame);

const xName = document.querySelector('#xName');
xName.addEventListener('change', function() {
    playerX.setName(this.value);
});

const oName = document.querySelector('#oName');
oName.addEventListener('change', function() {
    playerO.setName(this.value);
});

game.newGame();