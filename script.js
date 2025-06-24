// created a module to represent the game board

const Gameboard = (() => {
  // Private variable - the actual board
  let board = ["", "", "", "", "", "", "", "", ""];

  // Public methods
  return {
    // Method to get the current board state
    getBoard: () => [...board],

    // Method to place a mark on the board
    placeMark: (index, mark) => {
      if (board[index] === "") {
        board[index] = mark;
        return true; // Successfully placed
      }
      return false; // Spot already taken
    },

    // Method to reset the board
    resetBoard: () => {
      board = ["", "", "", "", "", "", "", "", ""];
    },
  };
})();

// created a factory function for creating players
const Player = (name, mark) => {
  return { name, mark };
};

// created a module to handle the game logic
const GameController = (() => {
  // Create players
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");

  let currentPlayer = player1;
  let gameOver = false;

  // Private method to check for winner
  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning mark (X or O)
      }
    }

    // Check for tie
    if (!board.includes("")) {
      return "tie";
    }

    return null; // No winner yet
  };

  // Public methods
  return {
    // Method to handle a player's turn
    playTurn: (index) => {
      if (gameOver) return false;

      if (Gameboard.placeMark(index, currentPlayer.mark)) {
        // Check for winner after each move
        const winner = checkWinner();

        if (winner) {
          gameOver = true;
          return { gameOver: true, winner };
        }

        // Switch players
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        return { gameOver: false, winner: null };
      }
      return false; // Invalid move
    },

    // Method to get current player
    getCurrentPlayer: () => currentPlayer,

    // Method to reset the game
    resetGame: () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
      gameOver = false;
    },
  };
})();
