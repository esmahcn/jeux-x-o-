// Initial game setup
let currentPlayer = "X";               // Player X starts the game
let board = Array(9).fill("");         // Empty board with 9 cells
let isGameOver = false;                // Flag to track if the game is finished

// All winning combinations (rows, columns, diagonals)
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],     // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],     // columns
  [0, 4, 8], [2, 4, 6]                 // diagonals
];

// Add click event listener to each cell
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    // Proceed if the cell is empty and the game isn't over
    if (board[index] === "" && !isGameOver) {
      board[index] = currentPlayer;       // Update internal board array
      cell.innerText = currentPlayer;     // Show symbol (X or O) in the cell

      // Check for a win
      if (checkWinner()) {
        document.getElementById("status").innerText = `🎉 Player ${currentPlayer} wins!`;
        isGameOver = true;

      // Check for a draw
      } else if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a draw!";
        isGameOver = true;

      // Switch player if game continues
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

// Function to check if there's a winner
function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

// Function to reset the game
function resetGame() {
  board = Array(9).fill("");                           // Clear the board
  currentPlayer = "X";                                 // Reset to Player X
  isGameOver = false;                                  // Game is active again
  document.getElementById("status").innerText = "";    // Clear status message

  // Clear all cells visually
  document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
}