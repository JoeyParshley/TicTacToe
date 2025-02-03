# TicTacToe

Tic Tac Toe game that can be played in the browser. Created for [Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe)

## Assignment

1. Set up Repo

2. Store the Gameboard as an array inside of a Gameboard object. Players are going to be stored as objects and need an object to control the flow of the game.

   1. Have as little global code as possible. Try tucking as much as possible inside of factories. If need a single instance of something (i.e. the game board, the display controller etc), then wrap the factory inside of an IIFE (module pattern) so it cannot be used to create additional instances.

   2. Think carefully about where each bit of logic should reside. Each little bit of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in "logical" places. Spend time brainstorming to make life easier.

   3. If your having trouble, [Building a house from the inside out](https://www.ayweb.dev/blog/building-a-house-from-the-inside-out) is a great example that lays out a highly applicable example both on how you might approach tackling this project as well as how you might organie and structure your code.

3. Focus on getting a working game in the console first. Make sure that there is logic that checks if the game is over. Should be checking for all winning `3-in-a-rows` and ties. Try to avoid thinking of the DOM and HTML/CSS until the game is working in the console. Do not worry about taking user input either. Call your functions and pass arguments to them to play the game and check if everything is working.

4. Once the console game is working, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now can always just fill out `X`s and `O`s just to see whats going on. )

5. Write functions to allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g letting players click on the board square to place their marker). Don't forget logic that keeps players from playing in spots already taken.

6. Clean up the interface to allow players to put in their names, include a button to start/restart the game add a display element that shows the results upon game end.
