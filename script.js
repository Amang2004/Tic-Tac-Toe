// ✅ This line logs a message in the browser's console (for debugging or confirmation that script is loaded)
console.log("tic tac toe");

// Optional audio setup (you can uncomment and add sound files to use)
// let music = new Audio("music.mp3");      // Background or click music
// let gameover = new Audio("gameover.mp3"); // Sound for when the game ends

// ✅ This variable keeps track of whose turn it is. The game starts with "X"
let turn = "X";

// ✅ This variable tells us whether the game is over. Starts as false.
let gameOver = false;

/**
 * 🔁 Function to switch the turn after each move.
 * If current turn is "X", it returns "0", otherwise returns "X".
 */
const changeTurn = () => {
    return turn === "X" ? "0" : "X";  // 🔁 This is a ternary operator (short if-else)
};

/**
 * 🏆 Function to check if someone has won the game
 * It checks each winning combination and compares the three cells.
 */
const checkWin = () => {
    // ✅ Get all elements with class 'boxtext' (i.e. the Xs and Os in cells)
    let boxtext = document.getElementsByClassName('boxtext');

    // 🧠 These are the index combinations for all 8 possible wins
    let wins = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal (top-left to bottom-right)
        [2, 4, 6]  // Diagonal (top-right to bottom-left)
    ];

    // ✅ Loop through all win combinations and check if any 3 boxes are equal and not empty
    wins.forEach(e => {
        if (
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[1]].innerText === boxtext[e[2]].innerText) &&
            (boxtext[e[0]].innerText !== '')
        ) {
            // 🎉 Someone won!
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won 🥳🎉";
            gameOver = true;


            // Optional: play winning sound
            // gameover.play();
        }
    });

    // 🔄 If all boxes are filled but no one won, it's a draw
    let isDraw = Array.from(boxtext).every(cell => cell.innerText !== '');
    if (isDraw && !gameOver) {
        document.querySelector('.info').innerText = "Game Draw!";
        gameOver = true;
    }
};

// ✅ Get all game board cells (you had written `box` before by mistake, should be `cell`)
let boxes = document.getElementsByClassName("cell");

/**
 * 🖱️ Main logic: For each cell, add a click event listener
 * If it's empty and the game isn't over, add the current player's symbol (X or 0)
 */
Array.from(boxes).forEach(element => {
    // ✅ Get the inner span inside each cell
    let boxtext = element.querySelector('.boxtext');

    // 🖱️ Add click event
    element.addEventListener('click', () => {
        if (!gameOver && boxtext.innerText === '') {
            // ✏️ Place the symbol (X or 0) in the clicked box
            boxtext.innerText = turn;

            // Optional: play click music
            // music.play();

            // 🔁 Switch the turn to the other player
            turn = changeTurn();

            // 🧾 Show whose turn it is now
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

            // 🔍 Check if this move wins the game
            checkWin();
        }
    });
});

/**
 * 🔁 RESET button logic: Clears the board and restarts the game
 */
document.getElementById('reset-button').addEventListener('click', () => {
    // ✅ Clear all boxtexts (remove Xs and 0s)
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        boxtext.innerText = '';
    });

    // ♻️ Reset turn and game state
    turn = "X";
    gameOver = false;

    // 🔁 Update the info message
    document.querySelector('.info').innerText = "Turn for " + turn;

    // 🧹 Hide the winning GIF
    document.querySelector('.gif').style.display = 'none';
});

