const gameBoard = (function() {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    function render() {
        for (let i = 0; i < 9; i++) {
            const square = document.querySelector(`.square:nth-child(${i + 1})`);
            square.textContent = board[i];
        }
    }
    return {render};
})();

gameBoard.render();