# Notes regarding the process for building the Tic Tac Toe game

## Description

One of the projects I am workng on from [theodonproject](theodinproject.com) is [Tic Tac Toe](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe). Thids project consists of using JavaScript, CSS and HTML to build a Tic Tac Toe game that can be played in the browser. In order to get started I am also following the suggestions from [Building a House from the inside out](https://www.ayweb.dev/blog/building-a-house-from-the-inside-out) -- a similar project from a former mentor at the Odin Project. This should assist me in figuring out how to tackle the project as well as how to organize and strucure the code.

## Building a house from the inside out

This blog builds a Connect Four game giving suggestions on how to separate the view from the data. The gist of it is that instead of trying to build the game from the UI by creating elements and adding behavior, start in the console and build the game logically to work in the console first. Then add in the UI with very basic function calls that do only what is needed in the UI and does not add unneeded complexity to the event handlers and the like. The Game's UI should solely be a visual representation of underlying application logic.

### Build from the inside

We should attempt to think through how the application is going to function at its core before implementing details of the UI.

The DOM elements and queries should not be responsible for storing and handling the implementation details of how the application works. They should not be concerned with storing details on the state of the game nor handling logic the game requires to function correclty. Instead the DOM should be responsoble for **reading and displaying the application state to the user** and **providing and easy-to-use gateway to interact with the method it needs to**.

For exampe the game should have acces to a method it needs to use in order to play a round. This method should be a simpe call and as restrictive as possible (it should **not** need to provide a mulitude of arguments to do something). The DOM probably doesn't need access to a way of changing whos turn it is. Instead, it should be able to _read_ whose turn it is as it changes after every round.

### Connect Four

The blog uses Connect Four as an example to follow. There is some code that I will try to understand and try to use in my version of the Tic Tac Toe game.

### Foundation and Framing

A strategy to keep the game logic sparate from the UI is to build the game so that it can be played, in full, in the console. By not needing to rely on the UI, we can be sure the code has integrity and is not concerning itself with what the browser is showing. The author's Connect Four console version is found [here](https://replit.com/@40percentzinc/ConnectFourConsole#script.js). I am thinking for now I will try to at least reproduce this with an understanding on how things are working. Then before moving on to the UI I will utilize this strategy to build a console-version of Tic Tac Toe. I will take notes as I go and update the next section with them along with how I plan to apply them to the Tic Tac Toe game.

#### Console-Version Code Review

The game consists of three modules:

- `GameBoard` module that exposes three methods, `getBoard`, `dropToken` and `printMethod`.
- `Cell` module is created that represents a "square" on the board. It exposes the `addToken` and `getValue` methods.
- `GameController` module is created that will be responsible for controlling the flow and state of the game's turns, as well as whether anyone has won the game.

##### GameBoard Module

This module is responsible for building the board, dropping a token for the player and printing the board to the console.

```js
function GameBoard() {
  // ...

  const getBoard = () => board;

  const dropToken = (column, player) => {
    //...
  };

  const printBoard = () => {
    // ...
  };

  return { getBoard, dropToken, printBoard };
}
```

The state of the board is a 2-d array built by looping over each row and then looping over each column in that row and pushing a `Cell` into that spot. Row 0 represents the top of the board and colomn 0 represents the left-most column.

```js
const rows = 6;
const columns = 7;
const board = [];

// Build the board
for (let i = 0; i < r0ws; i++) {
  // loop over the rows
  // empty the ith element of board
  board[i] = [];
  for (let j = 0; j < columns; j++) {
    // loop over each column in active row
    // add Cell onto the active Row
    boad[i].push(Cell());
  }
}
```

For `Tic Tac Toe` this can be done changing the `rows` and `columns` to `3` since the board should be a 3 x 3 grid.

###### getBoard

This method simply returns the entire `board` that the UI will need to render. It can be exactly the same for `Tic Tac Toe`

```js
const getBoard = () => board;
```

###### dropToken

This method is the act of the dropping a token into the column of the `board`. It accepts the arguments: `column` which is the column the player selects, and `player` a number representing the current player. The token gets placed at the lowest empty point on the selected column. Then the selected cell's value gets changed to the player's token.

```js
const dropToken = (column, player) => {
  /**
   * The board's outermost array represents the row, so we need to loop through the rows, starting at row 0,
   * find all of the rows that do not have a token, then take the last one without a token, which will
   * represent the bottom-most empty cell/
   */
  const availableCells = board
    .filter((row) => {
      return row[column].getValue() === 0; // get all of the empty rows in this column
    })
    .map((row) => row[column]); // return the empty rows

  // If there are no empty rows stop execution because the move is invalid
  if (!availableCells.length) return;

  // Otherwise we have a valid cell, the last one in the filtered array.
  const lowestRow = availableCells.length - 1; // last item in the array

  // add a token to the lowest empty row in the selected column
  board[lowestRow][column].addToken(player);
};
```

This method would be pretty different for `Tic, Tac, Toe` probably just add the token for the current player(`X` or `O`) to the selected cell i.e. `board[selectedRow][selectedColumn]`.

###### printBoard

This method prints the board to the console. It is good to see what the board looks like after each turn as we play. This is not needed after building the UI. It maps over the board and for each row it then maps over that row and return the value for each cell. Then logs out to console the board with values

```js
const printBoard = () => {
  const boardWithCellValues = board.map((row) =>
    row.map((cell) => cell.getValue())
  );
  console.log(boardWithCellValues);
};
```

This too should be almost exactly what is used to print the board for `Tic, Tac, Toe`

###### Expose the GameBoard Methods

The Module needs to return the methods it wants to expose. This is done by returning an object literal wrapped around the needed methods: `getBoard`, `dropToken`, and `printBoard`

```js
return { getBoard, dropToken, printBoard };
```

##### Cell() Module

A Cell represents one "square" on the board and can have one of:

- 0: no token is in the square, ( - for Tic Tac Toe)
- 1: Player One's token, ( X for Tic Tac Toe)
- 2: Player Two's token, ( O for Tic Tac Toe)

It exposes two methods:

- `addToken`: Sets `value` to the token of `player` that will be put into the lowest empty cell of the selected `column`
- `getValue`: returns the current value of this cell

```js
function Cell() {
  let value = 0; // cell is zero by default

  /**
   * accepts the player token as an argument and sets `value` to the passed in `player`
   */
  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value; // gets the current value of this cell through closure

  // exposes the `addToken` and `getValue` methods
  return {
    addToken,
    getValue,
  };
}
```

This should also be very close to what will be needed in `Tic, Tac, Toe`. It actually can exactly the same since the player will contror whether to pass in `1` or `2` vs `X` or `O` depending on the game.

##### GameController Module

This module will be responsible for controlling the flow and state of the game's turns, as well as if anyone has won.

It:

- accepts the players' names defaulting to `Player One` and `Player Two`
- creates a `board` object
- creates a `players` array
- sets the `activePlayer`
- switches the players turn
- creates a getter for the active player
- creates a method that prints the new round
- creates a mehtod that plays the round
- exposes the `playRound` and `getActivePlayer` methods.

```js
function GameController(
  playerOneName: "PlayerOne",
  playerTwoName: "PlayerTwo"
) {}
```

###### board

The board is initialized by simple calling the `Gameboard` method.

```js
const board = Gameboard();
```

###### players

`players` is initialized to be an array of object literals each consisting of the `name` and `token`

```js
const players = [
  {
    name: playerOneName,
    token: 1,
  },
  {
    name: playerTwoName,
    token: 2,
  },
];
```

The only difference for `Tic Tac Toe ` would be the tokens.

###### activerPlayer

Initially the active player is the fist player of the `players` array

```js
let activePlayer = players[0];
```

###### switchPlayerTurn()

Toggles active player

```js
const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];
};
```

###### getActivePlayer()

Getter for `activePlayer`

```js
const getActivePlayer = () => activePlayer;
```

###### printNewRound()

Draws a new board by calling the printBoard method on the board object and notifies who's turn it is.

```js
const printNewRound = () => {
  board.printBoard();
  console.log(`${getActivePlayer().name}'s turn.`);
};
```

###### playRound()

The method would

- drop the players `token` into the selected `column`
- Check to see if there is a winner
- Switch the player turn
- print a new Round

```js
const playRound = (column) => {
  // drop a token for the current player
  console.log(
    `Dropping ${getActivePlayer().name}'s token into column: ${column} . . . `
  );
  board.dropToken(column, getActivePlayer().token);

  /**
   * Check for a winner and handle tha logic
   * -  Check to see if there are four tokens for the current player in the vertical, horizontal or diagonal directions.
   * -  Add function to test how many mathcing cells there are in each direction
   */

  // switch players
  switchPlayerTurn();
  printNewRound();
};
```

###### Determining the Winner or a Tie for Tic Tac Toe

A winner is three consecutive cells in a row of the same player token. A tie occurs when all cells have an `X` or and `O`. After each players token is dropped onto a cell determine id there is a winner. Starting from the selected cell test the previous two cells in all directions. Maybe use a switch. To do this.

- detemine what cell is selected `board[row][column]`
- start from the `row` and check the other cells in that row and count the values
- then do it for the `column` and get the other values for the cells in that [column]
- if the seleced cell is any corner or the center cell check in the diaganol directions.
- if at index `0` or `2` only step in the up or down respectively

###### Expose the methods

For the console-version we only need the `playRound` method but the UI will need `getAActivePlayer`

### Putting the walls on

After getting the console version of the game working, the next step is to add the `view` aspect of the game. Get an understanding that the only way the UI should need to interact with the core game code in order to play a round is through the `GameController.playRound()` method. The game should be constructed to have a very limited interface, and in doing so, make it easy to interact with from the "outside".

From the visual representation the author created a module `ScreenController`. This module will leverage an `updateScreen` pattern whose purpose is to take some data about the game, such as the state of the game board and whos turn it is, and update the screen each time a player takes their turn. [Here](https://replit.com/@40percentzinc/ConnectFourWithDOMSkeleton) is a link to the game with an HTML/CSS skeleton.

#### UI Explanation

Looking at the structure of the Connect Four game the HTML is a container wrapped around an H1 to display who's turn it is and a container to show the game board. It looks like the cells are added dynamicall with the `ScreenController` module.

The gameboard uses CSS Grid with a height and width of `500px`. TiC Tac Toe may need a little adjustment. (or may not)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Connect Four HTML Skeleton</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
   <div class="container">
     <h1 class="turn"></div>
     <div class="board"></div>
   </div>
    <script src="script.js"></script>
  </body>
</html>
```
