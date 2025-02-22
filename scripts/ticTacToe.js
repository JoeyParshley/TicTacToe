/**
 * TODO: Clean up the interface to:
 *  - allow players to put in their names,
 *  - include a button to start/restart the game and
 *  - add a display element that shows the results upon game end!
 */

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
   * @returns board  - Array of cells
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
  let hasWinner = false;
  let hasTie = false;

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

  const setPlayerOneName = (playerName) => (players[0].name = playerName);

  const setPlayerTwoName = (playerName) => (players[1].name = playerName);

  const getHasWinner = () => hasWinner;

  const getHasTie = () => hasTie;

  const playRound = (row, column) => {
    // console current players choice
    // TODO: Create a toast for this or something like it
    console.log(
      `Dropping ${
        getActivePlayer().name
      }'s token into row: ${row}, column: ${column}...`
    );

    // drop current players token into the selcted spot
    board.dropToken(row, column, getActivePlayer().token);

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
        case "0": // top row
          if (column === "0") {
            // first column need to test lowerRight and lowerNextRight
            lowerRightAdjacentCell = board
              .getBoard()[1][1]
              .getCellValue()
              .toUpperCase();
            lowerNextRightAdjacentCell = board
              .getBoard()[2][2]
              .getCellValue()
              .toUpperCase();
            if (
              currentCellValue === lowerRightAdjacentCell &&
              currentCellValue === lowerNextRightAdjacentCell
            ) {
              return true;
              break;
            }
          } else if (column === "2") {
            // last column need to test lowerLeft and lowerNextLeft
            lowerLeftAdjacentCell = board
              .getBoard()[1][1]
              .getCellValue()
              .toUpperCase();
            lowerNextLeftAdjacentCell = board
              .getBoard()[2][0]
              .getCellValue()
              .toUpperCase();
            if (
              currentCellValue === lowerLeftAdjacentCell &&
              currentCellValue === lowerNextLeftAdjacentCell
            ) {
              return true;
            }
          }

          break;

        case "1": // middle row
          if (column === "1") {
            // middle column need to test (upperLeft and lowerRight) and (upperRight and lowerLeft)
            upperLeftAdjacentCell = board
              .getBoard()[0][0]
              .getCellValue()
              .toUpperCase();
            lowerRightAdjacentCell = board
              .getBoard()[2][2]
              .getCellValue()
              .toUpperCase();
            upperRightAdjacentCell = board
              .getBoard()[0][2]
              .getCellValue()
              .toUpperCase();
            lowerLeftAdjacentCell = board
              .getBoard()[2][0]
              .getCellValue()
              .toUpperCase();
            if (
              (currentCellValue === upperLeftAdjacentCell &&
                currentCellValue === lowerRightAdjacentCell) ||
              (currentCellValue === upperRightAdjacentCell &&
                currentCellValue === lowerLeftAdjacentCell)
            ) {
              return true;
            }
          }

          break;

        case "2": // Bottom Row
          if (column === "0") {
            // first column need to test upperRight and upperNextRight
            upperRightAdjacentCell = board
              .getBoard()[1][1]
              .getCellValue()
              .toUpperCase();
            upperNextRightAdjacentCell = board
              .getBoard()[0][2]
              .getCellValue()
              .toUpperCase();
            if (
              currentCellValue === upperRightAdjacentCell &&
              currentCellValue === upperNextRightAdjacentCell
            ) {
              return true;
            }
          } else if (column === "2") {
            // last column need to test upperLeft and upperNextLeft
            upperLeftAdjacentCell = board
              .getBoard()[1][1]
              .getCellValue()
              .toUpperCase();
            upperNextLeftAdjacentCell = board
              .getBoard()[0][0]
              .getCellValue()
              .toUpperCase();
            if (
              currentCellValue === upperLeftAdjacentCell &&
              currentCellValue === upperNextLeftAdjacentCell
            ) {
              return true;
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
        case "0": // first column   - test next two columns
          nextColumnValue = board
            .getBoard()
            [row][1].getCellValue()
            .toUpperCase();
          nextNextColumnValue = board
            .getBoard()
            [row][2].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextColumnValue &&
            currentCellValue === nextNextColumnValue
          ) {
            return true;
          }

          break;

        case "1": // middle column test previous and next columns
          nextColumnValue = board
            .getBoard()
            [row][2].getCellValue()
            .toUpperCase();
          previousColumnValue = board
            .getBoard()
            [row][0].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextColumnValue &&
            currentCellValue === previousColumnValue
          ) {
            return true;
          }

          break;

        case "2": // last column test previous two columns
          previousColumnValue = board
            .getBoard()
            [row][1].getCellValue()
            .toUpperCase();
          previousPreviousColumnValue = board
            .getBoard()
            [row][0].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === previousColumnValue &&
            currentCellValue === previousPreviousColumnValue
          ) {
            return true;
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
        case "0": // top row test neext two rows
          nextRowValue = board
            .getBoard()[1]
            [column].getCellValue()
            .toUpperCase();
          nextNextRowValue = board
            .getBoard()[2]
            [column].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextRowValue &&
            currentCellValue === nextNextRowValue
          ) {
            return true;
          }

          break;

        case "1": // middle row test previous and next row
          nextRowValue = board
            .getBoard()[2]
            [column].getCellValue()
            .toUpperCase();
          previousColumnValue = board
            .getBoard()[0]
            [column].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === nextRowValue &&
            currentCellValue === previousColumnValue
          ) {
            return true;
          }

          break;

        case "2": // last row test previous two rows
          previousRowValue = board
            .getBoard()[1]
            [column].getCellValue()
            .toUpperCase();
          previousPreviousRowValue = board
            .getBoard()[0]
            [column].getCellValue()
            .toUpperCase();
          if (
            currentCellValue === previousRowValue &&
            currentCellValue === previousPreviousRowValue
          ) {
            return true;
          }

          break;

        default:
          break;
      }
    };

    const checkForTie = (board) => {
      let values = [];
      board.map((row) => row.map((cell) => values.push(cell.getCellValue())));
      return !values.includes("-");
    };

    // check for winner
    hasWinner =
      checkForWinnerInRow(
        board.getBoard()[row][column].getCellValue().toUpperCase(),
        row,
        column
      ) ||
      checkForWinnerInColumn(
        board.getBoard()[row][column].getCellValue().toUpperCase(),
        row,
        column
      ) ||
      checkForDiagonalWinner(
        board.getBoard()[row][column].getCellValue().toUpperCase(),
        row,
        column
      );

    // check for tie - not winner and all cells are either X or O
    if (!hasWinner) {
      hasTie = checkForTie(board.getBoard());
    }
    // switch the player turn and display the new state
    if (!hasWinner && !hasTie) {
      switchPlayerTurn();
    }

    if (hasWinner) {
      console.log(`${getActivePlayer().name} won!!!`);
      document.querySelector(".turn").textContent = `${
        getActivePlayer().name
      } won!!!`;
    }
    if (hasTie && !hasWinner) {
      console.log("There was a tie");
    }
  };

  // expose the public methods
  return {
    playRound,
    getActivePlayer,
    getHasTie,
    getHasWinner,
    getBoard: board.getBoard,
    setPlayerOneName,
    setPlayerTwoName,
  };
}

/**
 * ScreenController Module
 *
 *
 */
function ScreenController() {
  // initiaize a new game instance
  const game = GameController();

  // get player turn h1 element and board div
  const playerTurnH1 = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const dialog = document.querySelector("dialog");
  const dialog_header = document.querySelector("dialog h2");
  const dialog_paragraph = document.querySelector("dialog p");
  const ok_button = document.querySelector("dialog button");

  /**
   * TODO: Freeze the game when there is a winner of a tie
   */

  // create updateScreen method
  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const actvePlayer = game.getActivePlayer();
    const hasWinner = game.getHasWinner();
    const hasTie = game.getHasTie();

    // display the player's turn
    if (hasWinner) {
      playerTurnH1.textContent = `${actvePlayer.name} is the Winner!!!`;
    } else if (hasTie) {
      playerTurnH1.textContent = `There was a tie :/`;
    } else {
      playerTurnH1.textContent = `${actvePlayer.name}'s turn . . . `;
    }

    // Render the squares
    // loop through the rows
    board.forEach((row, rowIndex) => {
      // loop through the cells and track the index
      row.forEach((cell, columnIndex) => {
        // create a button
        const cellButton = document.createElement("button");
        // add a class of list
        cellButton.classList.add("cell");
        // add a column and row data attribute to hold the index of the column and row
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        // add the valuf of the cell
        cellButton.textContent = cell.getCellValue();
        // add the cell to the board
        if (hasWinner || hasTie) cellButton.disabled = true;
        boardDiv.appendChild(cellButton);
      });
    });
  };

  const startButton = document.querySelector("#start");
  // event listeners
  function clickHandlerStartButton(e) {
    e.preventDefault();
    // get the playerOne and playerTwo field values
    const playerOneField = document.querySelector("#player-1");
    const playerTwoField = document.querySelector("#player-2");

    // set the name values of the users in the users object of the game instance.
    game.setPlayerOneName(playerOneField.value);
    game.setPlayerTwoName(playerTwoField.value);

    updateScreen();
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedRow || !selectedColumn) return;
    selectedCellValue = game
      .getBoard()
      [selectedRow][selectedColumn].getCellValue();
    if (selectedCellValue === "-") {
      game.playRound(selectedRow, selectedColumn);
      updateScreen();
    } else {
      dialog_header.textContent = "This cell was already selected!";
      dialog_paragraph.textContent = "Please choose another square.";
      dialog.showModal();
    }
  }
  boardDiv.addEventListener("click", clickHandlerBoard);
  startButton.addEventListener("click", clickHandlerStartButton);
  ok_button.addEventListener("click", () => dialog.close());

  // initial render
  updateScreen();
}

// initalize the screenController instance
ScreenController();
