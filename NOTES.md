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

### Putting the walls on

After getting the console version of the game working, the next step is to add the `view` aspect of the game. Get an understanding that the only way the UI should need to interact with the core game code in order to play a round is through the `GameController.playRound()` method. The game should be constructed to have a very limited interface, and in doing so, make it easy to interact with from the "outside".

From the visual representation the author created a module `ScreenController`. This module will leverage an `updateScreen` pattern whose purpose is to take some data about the game, such as the state of the game board and whos turn it is, and update the screen each time a player takes their turn. [Here](https://replit.com/@40percentzinc/ConnectFourWithDOMSkeleton) is a link to the game with an HTML/CSS skeleton.
