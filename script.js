let currentPlayer = "X";
let board = Array(9).fill("");
let isGameOver = false;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    if (board[index] === "" && !isGameOver) {
      board[index] = currentPlayer;
      cell.innerText = currentPlayer;
      if (checkWinner()) {
        document.getElementById("status").innerText = `🎉 Player ${currentPlayer} wins!`;
        isGameOver = true;
      } else if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a draw!";
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameOver = false;
  document.getElementById("status").innerText = "";
  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
}