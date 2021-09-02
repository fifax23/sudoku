const fieldSize = 9;
const squareSize = 3;

function cellValidation(pos, num, field) {
  const [row, col] = pos;

  for (let i = 0; i < fieldSize; i++) {
    if (field[i][col] === num && i !== row) {
      return false;
    }
  }

  for (let j = 0; j < fieldSize; j++) {
    if (field[row][j] === num && j !== col) {
      return false;
    }
  }

  const squareRow = Math.floor(row / squareSize) * squareSize;
  const squareCol = Math.floor(col / squareSize) * squareSize;

  for (let i = squareRow; i < squareRow + squareSize; i++) {
    for (let j = squareCol; j < squareCol + squareSize; j++) {
      if (field[i][j] === num && i !== row && j !== col) {
        return false;
      }
    }
  }
  return true;
}

module.exports = function solveSudoku(field) {
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      if (field[i][j] === 0) {
        for (let n = 1; n < fieldSize + 1; n++) {
          const currentPosition = [i, j];
          const currentNumber = n;
          const isValidCell = cellValidation(
            currentPosition,
            currentNumber,
            field
          );
          if (isValidCell) {
            const [x, y] = currentPosition;
            field[x][y] = currentNumber;
            if (solveSudoku(field)) {
              return field;
            }
            field[x][y] = 0;
          }
        }
        return false;
      }
    }
  }
  return field;
};
