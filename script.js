const playerX = Player('X');
const playerO = Player('O');

const gameBoard = (function () {
    const board = [];

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

    // Checks the board for winner. Returns 'X' or 'O' or 'draw'. Returns false if the game is still not over.
    function getGameResult(gameState = board) {

        if (gameState[0]) {
            if (gameState[0] == gameState[1] && gameState[1] == gameState[2]) {
                return gameState[0];
            }
            if (gameState[0] == gameState[3] && gameState[3] == gameState[6]) {
                return gameState[0];
            }
            if (gameState[0] == gameState[4] && gameState[4] == gameState[8]) {
                return gameState[0];
            }
        }
        if (gameState[1]) {
            if (gameState[1] == gameState[4] && gameState[4] == gameState[7]) {
                return gameState[1];
            }
        }
        if (gameState[2]) {
            if (gameState[2] == gameState[5] && gameState[5] == gameState[8]) {
                return gameState[2];
            }
            if (gameState[2] == gameState[4] && gameState[4] == gameState[6]) {
                return gameState[2];
            }
        }
        if (gameState[3]) {
            if (gameState[3] == gameState[4] && gameState[4] == gameState[5]) {
                return gameState[3];
            }
        }
        if (gameState[6]) {
            if (gameState[6] == gameState[7] && gameState[7] == gameState[8]) {
                return gameState[6];
            }
        }
        if (gameState.every(mark => mark)) {
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

    function minimax(gameState, isMax) {
        let result = getGameResult(gameState);
        if (result == 'X') {
            return 1;
        } else if (result == 'O') {
            return -1;
        } else if (result == 'draw') {
            return 0;
        }

        if (isMax) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (gameState[i] == '') {
                    gameState[i] = 'X';
                    bestScore = Math.max(bestScore, minimax(gameState, false));
                    gameState[i] = '';
                }
            }
            return bestScore;
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (gameState[i] == '') {
                    gameState[i] = 'O';
                    bestScore = Math.min(bestScore, minimax(gameState, true));
                    gameState[i] = '';
                }
            }
            return bestScore;
        }

    }

    function findBestMove(player) {
        if (player == 'X') {
            let bestScore = -Infinity;
            let bestMove;
            for (let i = 0; i < 9; i++) {
                if (board[i] == '') {
                    board[i] = 'X';
                    let testScore = minimax(board, false);
                    if (testScore > bestScore) {
                        bestScore = testScore;
                        bestMove = i;
                    }
                    board[i] = '';
                }
            }
            return bestMove;
        } else {
            let bestScore = Infinity;
            let bestMove;
            for (let i = 0; i < 9; i++) {
                if (board[i] == '') {
                    board[i] = 'O';
                    let testScore = minimax(board, true);
                    if (testScore < bestScore) {
                        bestScore = testScore;
                        bestMove = i;
                    }
                    board[i] = '';
                }
            }
            return bestMove;
        }
    }

    return { addMark, clear, getGameResult, findBestMove };
})();

const game = (function () {

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
        } else if (result == 'X') {
            display.textContent = `The winner is ${playerX.getName()}.`;
        } else {
            display.textContent = `The winner is ${playerO.getName()}`;
        }
        gameOver = true;
    }

    function handleClick(pos) {
        if (gameOver) {
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
            // 2 human players
            // currentPlayer = currentPlayer == playerO ? playerX : playerO;
            // display.textContent = `${currentPlayer.getName()} to play.`;

            // computer random move
            // let randomPos;
            // do {
            //     randomPos = Math.floor(Math.random() * 9);
            // } while (!playerX.play(randomPos));
            // let winner = gameBoard.getGameResult();
            // if (winner) {
            //     endGame(winner);
            // }

            // minimax AI
            playerX.playMinimax();
            let winner = gameBoard.getGameResult();
            if (winner) {
                endGame(winner);
            } else {
                display.textContent = `${currentPlayer.getName()} to play.`;
            }
        }

    }


    return { newGame, endGame, handleClick };
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

    function playRandom() {
        let randomPos;
        do {
            randomPos = Math.floor(Math.random() * 9);
        } while (!play(randomPos));
    }

    function playMinimax() {
        play(gameBoard.findBestMove('X'));
    }

    return { play, setName, getName, playMinimax };
}

const squares = document.querySelectorAll('.square');

for (let i = 0; i < 9; i++) {
    squares[i].addEventListener('click', () => game.handleClick(i));
}

const newGameBtn = document.querySelector('#newGameBtn');
newGameBtn.addEventListener('click', game.newGame);

const xName = document.querySelector('#xName');
xName.addEventListener('change', function () {
    playerX.setName(this.value);
});

const oName = document.querySelector('#oName');
oName.addEventListener('change', function () {
    playerO.setName(this.value);
});

game.newGame();

