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

/**
 * GameController module    -   accepts two player names.
 * @param {*} playerOneName
 * @param {*} playerTwoName
 *
 *  -   This module is responsible for controling the flow and the state of the game's turns as well if anyone won
 *  -   it:
 *      -   instantiate a new Gameboard instance            -   board
 *      -   instantiates and array of player objects        -   players
 *      -   instantiates the active player                  -   activePlayer
 *      -   creates a method to swith player turns          -   switchPlayerTurn
 *      -   creates a getter for the active player          -   getActivePlayer
 *      -   creates a method to print the state of the game -   printNewRound
 *      -   creates a method to play a round                -   playRound
 *      -   set the intial state with printNewRound()
 *      -   exposes the public methods
 */
function GameController(
  playerOneName = "PlayerOne",
  playerTwoName = "PlayerTwo"
) {
  // instantiate the GameBoard
  const board = Gameboard();
  let roundsPlayed = 0;
  let hasWinner = false;

  // initialize the players
  players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  // initialize the active player to the first one in the players array
  let activePlayer = players[0];

  /**
   * Toggle the active player
   */
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  /**
   * active player getter
   * @returns actvePlayer
   */
  const getActivePlayer = () => activePlayer;

  /**
   * starts a new round by displaying the current state of the board and stating
   * that it is the next players turn.
   */
  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    // console current players choice
    console.log(
      `Dropping ${
        getActivePlayer().name
      }'s token into row: ${row}, column: ${column}...`
    );

    // drop current players token into the selcted spot
    board.dropToken(row, column, getActivePlayer().token);
    ++roundsPlayed;

    /**
     * test if the player is a winner
     * start at row
     */

    const checkForDiagonalWinner = (currentCellValue, row, column) => {
      /**
       * If row is 0, and column is 0 or 2:   - Can have diagonal winner
       * If row is 2, and column is 0 or 2:   - can have diagonal winner
       * If row is 1, and column is 1         - can have diagonal winner
       */

      let upperLeftAdjacentCell;
      let upperNextLeftAdjacentCell;
      let upperRightAdjacentCell;
      let upperNextRightAdjacentCell;
      let lowerLeftAdjacentCell;
      let lowerNextLeftAdjacentCell;
      let lowerRightAdjacentCell;
      let lowerNextRightAdjacentCell;

      switch (row) {
        case 0: // top row
          if (column === 0) {
            // first column need to test lowerRight and lowerNextRight
            lowerRightAdjacentCell = board
              .getBoard()
              [row + 1][column + 1].getCellValue()
              .toUpperCase();
            lowerNextRightAdjacentCell = board
              .getBoard()
              [row + 2][column + 2].getCellValue()
              .toUpperCase();
            if (
              currentCellValue === lowerRightAdjacentCell &&
              currentCellValue === lowerNextRightAdjacentCell
            ) {
              console.log(`Winner in diagonal row`);
              hasWinner = true;
              break;
            } else {
              console.log(`No diagonal winner`);
            }
          } else if (column === 2) {
            // last column need to test lowerLeft and lowerNextLeft
            lowerLeftAdjacentCell = board
              .getBoard()
              [row + 1][column - 1].getCellValue()
              .toUpperCase();
            lowerNextLeftAdjacentCell = board
              .getBoard()
              [row + 2][column - 2].getCellValue()
              .toUpperCase();
            if (
              currentCellValue === lowerLeftAdjacentCell &&
              currentCellValue === lowerNextLeftAdjacentCell
            ) {
              console.log(`Winner in diagonal row`);
              break;
            } else {
              console.log(`No diagonal winner`);
            }
          }

          break;

        case 1: // middle row
          if (column === 1) {
            // middle column need to test (upperLeft and lowerRight) and (upperRight and lowerLeft)
            upperLeftAdjacentCell = board
              .getBoard()
              [row - 1][column - 1].getCellValue()
              .toUpperCase();
            lowerRightAdjacentCell = board
              .getBoard()
              [row + 1][column + 1].getCellValue()
              .toUpperCase();
            upperRightAdjacentCell = board
              .getBoard()
              [row - 1][column + 1].getCellValue()
              .toUpperCase();
            lowerLeftAdjacentCell = board
              .getBoard()
              [row + 1][column - 1].getCellValue()
              .toUpperCase();
            if (
              (currentCellValue === upperLeftAdjacentCell &&
                currentCellValue === lowerRightAdjacentCell) ||
              (currentCellValue === upperRightAdjacentCell &&
                currentCellValue === lowerLeftAdjacentCell)
            ) {
              console.log(`Winner in diagonal row`);
              hasWinner = true;
              break;
            } else {
              console.log(`No diagonal winner`);
            }
          }

          break;

        case 2: // Bottom Row
          if (column === 0) {
            // first column need to test upperRight and upperNextRight
            upperRightAdjacentCell = board
              .getBoard()
              [row - 1][column + 1].getCellValue()
              .toUpperCase();
            upperNextRightAdjacentCell = board
              .getBoard()
              [row - 2][column + 2].getCellValue()
              .toUpperCase();
            if (
              currentCellValue === upperRightAdjacentCell &&
              currentCellValue === upperNextRightAdjacentCell
            ) {
              console.log(`Winner in diagonal row`);
              break;
            }
          } else if (column === 2) {
            // last column need to test upperLeft and upperNextLeft
            upperLeftAdjacentCell = board
              .getBoard()
              [row - 1][column - 1].getCellValue()
              .toUpperCase();
            upperNextLeftAdjacentCell = board
              .getBoard()
              [row - 2][column - 2].getCellValue()
              .toUpperCase();
            if (
              currentCellValue === upperLeftAdjacentCell &&
              currentCellValue === upperNextLeftAdjacentCell
            ) {
              console.log(`Winner in diagonal row`);
              hasWinner = true;
              break;
            }
          }
          break;

        default:
          break;
      }
    };

    const checkForWinnerInRow = (currentCellValue, row, column) => {
      /**
       * Test for three matches in the current row
       *
       * If the column index is:
       *  - 0, check col[1] and col[2] for row winner
       *  - 1, check col[0] and col[2] for row winner
       *  - 2, check col[1] and col[0] for row winner
       */

      let nextColumnValue;
      let nextNextColumnValue;
      let previousColumnValue;
      let previousPreviousColumnValue;

      // test each column in the row
      switch (column) {
        case 0: // first column   - test next two columns
          nextColumnValue = board
            .getBoard()
            [row][column + 1].getCellValue()
            .toUpperCase();
          nextNextColumnValue = board
            .getBoard()
            [row][column + 2].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextColumnValue &&
            currentCellValue === nextNextColumnValue
          ) {
            console.log(`winner in row: ${row}.`);
            break;
          } else {
            console.log(`No winner in row ${row}.`);
          }
          break;

        case 1: // middle column test previous and next columns
          nextColumnValue = board
            .getBoard()
            [row][column + 1].getCellValue()
            .toUpperCase();
          previousColumnValue = board
            .getBoard()
            [row][column - 1].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextColumnValue &&
            currentCellValue === previousColumnValue
          ) {
            console.log(`winner in row: ${row}.`);
            hasWinner = true;
          } else {
            console.log(`No winner in row ${row}.`);
          }
          break;

        case 2: // last column test previous two columns
          previousColumnValue = board
            .getBoard()
            [row][column - 1].getCellValue()
            .toUpperCase();
          previousPreviousColumnValue = board
            .getBoard()
            [row][column - 2].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === previousColumnValue &&
            currentCellValue === previousPreviousColumnValue
          ) {
            console.log(`winner in row: ${row}.`);
            hasWinner = true;
          } else {
            console.log(`No winner in row ${row}.`);
          }
          break;

        default:
          break;
      }
    };

    const checkForWinnerInColumn = (currentCellValue, row, column) => {
      /**
       * Test for three matches in the current column
       *
       * If the row index is:
       *  - 0, check 1 and 1
       *  - 1, check 0 and 2
       *  - 2, check 1 and 0
       */

      let nextRowValue;
      let nextNextRowValue;
      let previousRowValue;
      let previousPreviousRowValue;

      // test each row in the row
      switch (row) {
        case 0: // top row test neext two rows
          nextRowValue = board
            .getBoard()
            [row + 1][column].getCellValue()
            .toUpperCase();
          nextNextRowValue = board
            .getBoard()
            [row + 2][column].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextRowValue &&
            currentCellValue === nextNextRowValue
          ) {
            console.log(`winner in column: ${column}.`);
            hasWinner = true;
            break;
          } else {
            console.log(`No winner in column ${column}.`);
          }
          break;

        case 1: // middle row test previous and next row
          nextRowValue = board
            .getBoard()
            [row + 1][column].getCellValue()
            .toUpperCase();
          previousColumnValue = board
            .getBoard()
            [row - 1][column].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextRowValue &&
            currentCellValue === previousColumnValue
          ) {
            console.log(`winner in column: ${column}.`);
            hasWinner = true;
            break;
          } else {
            console.log(`No winner in column ${column}.`);
          }
          break;

        case 2: // last row test previous two rows
          previousRowValue = board
            .getBoard()
            [row - 1][column].getCellValue()
            .toUpperCase();
          previousPreviousRowValue = board
            .getBoard()
            [row - 2][column].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === previousRowValue &&
            currentCellValue === previousPreviousRowValue
          ) {
            console.log(`winner in column: ${column}.`);
            hasWinner = true;
            break;
          } else {
            console.log(`No winner in column ${column}.`);
          }
          break;

        default:
          break;
      }
    };

    const checkForTie = () => {
      if (roundsPlayed > 8) {
        console.log("we have a tie");
      }
    };

    // check for winner
    checkForWinnerInRow(
      board.getBoard()[row][column].getCellValue().toUpperCase(),
      row,
      column
    );
    checkForWinnerInColumn(
      board.getBoard()[row][column].getCellValue().toUpperCase(),
      row,
      column
    );
    checkForDiagonalWinner(
      board.getBoard()[row][column].getCellValue().toUpperCase(),
      row,
      column
    );
    // check for tie - not winner and all cells are either X or O
    if (!hasWinner) {
      checkForTie();
    }
    // switch the player turn and display the new state
    switchPlayerTurn();
    printNewRound();
  };

  // display the initial state
  printNewRound();

  // expose the public methods
  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}
