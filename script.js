const human = "X";
const ai = "O";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Handle cell clicks
function handleClick(index) {
    if (!board[index] && gameActive) {
        board[index] = human;
        document.getElementsByClassName("cell")[index].innerText = human;
        
        if (checkWin(board, human)) {
            document.getElementById("status").innerText = "You Win! 🎉";
            gameActive = false;
            return;
        }
        
        if (!board.includes("")) {
            document.getElementById("status").innerText = "It's a Tie! 🤝";
            gameActive = false;
            return;
        }
        
        setTimeout(aiMove, 300);
    }
}

// AI Move using Minimax
function aiMove() {
    let bestScore = -Infinity;
    let bestMove;
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== undefined) {
        board[bestMove] = ai;
        document.getElementsByClassName("cell")[bestMove].innerText = ai;
        
        if (checkWin(board, ai)) {
            document.getElementById("status").innerText = "AI Wins! 🤖";
            gameActive = false;
        } else if (!board.includes("")) {
            document.getElementById("status").innerText = "It's a Tie! 🤝";
            gameActive = false;
        }
    }
}

// Check winner
function checkWin(board, player) {
    return winCombos.some(combo => combo.every(index => board[index] === player));
}

// Minimax Algorithm
function minimax(board, depth, isMaximizing) {
    if (checkWin(board, ai)) return 10 - depth;
    if (checkWin(board, human)) return depth - 10;
    if (!board.includes("")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = ai;
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = human;
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
    document.getElementById("status").innerText = "";
}
