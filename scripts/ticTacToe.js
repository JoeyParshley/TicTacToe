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

    /**
     * test if the player is a winner
     */

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
