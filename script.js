// created a module to represent the game board

const GameBoard = (() => {
  let board = Array(9).fill(null);

  const getBoard = () => [...board];

  const makeMove = (index, mark) => {
    if (board[index] == null) {
      board[index] = mark;
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  return { getBoard, makeMove, resetBoard };
})();
