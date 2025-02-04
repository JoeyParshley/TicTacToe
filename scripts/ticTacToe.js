/**
 * Gameboard Module
 *  -   build Gameboard structure
 *  -   create board getter method  -   getBoard
 *  -   create drop token method    -   dropToken
 *  -   create print board method   -   printBoard
 *  -   expose the three methods
 */

function Gameboard() {
  const rows = (columns = 3);
  const board = [];
  /**
   * build structure - board is a 3 x 3 array initially set to 0
   *    -   loop over the rows and for each row push a cell onto an initialized row
   */
  for (let i = 0; i < rows; i++) {
    // empty the current row
    board[i] = [];
    // loop over the columns
    for (let j = 0; j < columns; j++) {
      // push a cell onto the row -- initially set to 0
      board[i].push(Cell());
    }
  }

  /**
   * Getter for the `board`
   * @returns board
   */
  const getBoard = () => board;

  /**
   * Sets the value of cell at row: row and column: column to the player token
   * @param {number} row
   * @param {number} column
   * @param {string} player
   * @returns
   */
  const dropToken = (row, column, player) => {
    let cellValue = board[row][column].getCellValue().toUpperCase();

    if (cellValue === "X" || cellValue === "O") {
      console.log("Try another cell");
      return;
    }

    // other wise set the value of the cell to the player token
    board[row][column].addToken(player);
  };

  /**
   * displays the board with the values in each cell.
   */
  const printBoard = () => {
    const boardWithValues = board.map((row) =>
      row.map((cell) => cell.getCellValue())
    );

    console.log(boardWithValues);
  };
  // expose the public methods of the Gameboard module
  return {
    getBoard,
    dropToken,
    printBoard,
  };
}

/**
 * Cell Module
 *
 * Represents a "square" on the board
 *  -   initializes the value to "-"
 *  -   creates method add the player's token   -   addToken
 *  -   creates method to get value of the cell -   getValue
 */

function Cell() {
  // an unset cell is represented by a dash "-"
  let cellValue = "-";

  /**
   * sets the value of `cellValue` to that of the passed in `player`'s token
   * @param {} player
   */
  const addToken = (player) => {
    cellValue = player;
  };

  /**
   * getter for the `cellValue`
   * @returns cellValue
   */
  const getCellValue = () => cellValue;

  /**
   * expose the public methods of the Cell module
   */
  return {
    addToken,
    getCellValue,
  };
}
