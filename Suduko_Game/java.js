function Begin() {
  window.location.replace("page_2.html");
}
count = 0
for (var i = 0; i < 9; i++) {
  count = 9 * i;
  document.getElementsByClassName("box")[i].innerHTML = "<div class='cell'><input type='text' id='" + (count + 1) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 2) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 3) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 4) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 5) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 6) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 7) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 8) + "' class='input'></div><div class='cell'><input type='text' id='" + (count + 9) + "' class='input'></div>"
}

//how to play game instruction
function help() {
  window.open(
    "https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/", "_blank");
}
var level;
var choosen;


easy_board = ['2-5---7--45---9----2-6-81----9---8567-------2418---2----43-7-1----1---85--6---7-8'];

medium_board = ['--6----9---75-1---1------9-9-7-25-8-3-----4-3-92-1-8-2------7---6-19--5-8----1--'];

hard_board = ['-6------2---9-83----6--3-79----368---2-----4---461----75-8--4----51-7---2------8-'];




function replaceNumbersWithRandomValues(board) {
  // Split the board string into an array of characters
  const boardArray = board[0].split('');

  // Loop through the board array and replace numbers with random values
  for (let i = 0; i < boardArray.length; i++) {
    if (boardArray[i] >= '1' && boardArray[i] <= '9') {
      // Replace the number with a random value between 1 and 9
      boardArray[i] = Math.floor(Math.random() * 9) + 1;
    }
  }

  // Join the board array back into a string and return it as a new array
  return [boardArray.join('')];
}



function start() {
  // Disable clicking on some elements
  for (var i = 0; i < 6; i++) {
    document.getElementsByClassName("label")[i].setAttribute("onclick", "return false;");
  }

  // Start the game timer
  timer();

  //easy game

  // Set up the Sudoku board for the chosen puzzle
  if (document.getElementById("easy").checked) {
    level = 'easy';
    var easy_random = Math.floor(Math.random() * 5);
    choosen = easy_random;

    // Copy the values from easy_board to boardValues
    boardValues = easy_board[easy_random].slice();
    const updated_board = replaceNumbersWithRandomValues([easy_board[easy_random]]);

    // Set the cell values in the HTML table
    for (var i = 0; i < 81; i++) {
      var cell = document.getElementById((i + 1).toString());
      var cellValue = updated_board[0][i];

      if (cellValue != '-') {
        cell.value = cellValue;
        cell.readOnly = true;
      }
    }
  }


  //medium game
  if (document.getElementById("medium").checked) {
    level = 'medium';
    var medium_random = Math.floor(Math.random() * 5);
    choosen = medium_random;

    // Copy the values from easy_board to boardValues
    boardValues = easy_board[easy_random].slice();
    const updated_board = replaceNumbersWithRandomValues([medium_board[medium_random]]);

    // Set the cell values in the HTML table
    for (var i = 0; i < 81; i++) {
      var cell = document.getElementById((i + 1).toString());
      var cellValue = updated_board[0][i];

      if (cellValue != '-') {
        cell.value = cellValue;
        cell.readOnly = true;
      }
    }
  }


  //hard game
  if (document.getElementById("hard").checked) {
    level = 'hard';
    var hard_random = Math.floor(Math.random() * 5);
    choosen = hard_random;

    // Copy the values from easy_board to boardValues
    boardValues = easy_board[easy_random].slice();

    const updated_board = replaceNumbersWithRandomValues([hard_board[hard_random]]);

    // Set the cell values in the HTML table
    for (var i = 0; i < 81; i++) {
      var cell = document.getElementById((i + 1).toString());
      var cellValue = updated_board[0][i];

      if (cellValue != '-') {
        cell.value = cellValue;
        cell.readOnly = true;
      }
    }
  }

  document.getElementById("start").removeAttribute("onclick");
}


//timer
function timer() {
  if (document.getElementById("time1").checked == true) {
    document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time1_min").innerHTML - 1).toString();
    document.getElementById("time_sec").innerHTML = '59';
  }

  else if (document.getElementById("time2").checked == true) {
    document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time2_min").innerHTML - 1).toString();
    document.getElementById("time_sec").innerHTML = '59';
  }
  else {
    document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time3_min").innerHTML - 1).toString();
    document.getElementById("time_sec").innerHTML = '59';
  }

  setInterval(() => {
    if (document.getElementById("time_sec").innerHTML == '00') {
      document.getElementById("time_sec").innerHTML = "59";
    }
    else {
      if (parseInt(document.getElementById("time_sec").innerHTML) <= 10) {
        document.getElementById("time_sec").innerHTML = "0" + (document.getElementById("time_sec").innerHTML - 1).toString();
      }
      else {
        document.getElementById("time_sec").innerHTML = document.getElementById("time_sec").innerHTML - 1;
      }
    }
  }, 1000);


  setInterval(() => {
    if (document.getElementById("time_min").innerHTML == '00') {
      document.getElementById("time_sec").innerHTML = '00';
      setTimeout(() => {
        alert("you lost !!");
      }, 50);
    }
    else {
      if (parseInt(document.getElementById("time_min").innerHTML) <= 10) {
        document.getElementById("time_min").innerHTML = "0" + (document.getElementById("time_min").innerHTML - 1).toString();
      }
      else {
        document.getElementById("time_min").innerHTML = document.getElementById("time_min").innerHTML - 1;
      }
    }
  }, 60 * 1000);

}



function replay() {
  for (var i = 0; i < 81; i++) {
    document.getElementById((i + 1).toString()).value = '';
  }
  start();
}



/*____________________________________________________*/
/*_________Backtracking Algorithm  ((DFS))____________*/
/*____________________________________________________*/
/* Takes a partially filled-in grid and attempts      */
/*    to assign values to all unassigned locations in */
/*     such a way to meet the requirements for        */
/*     Sudoku solution (non-duplication across rows,  */
/*     columns, and boxes)                            */
/*____________________________________________________*/
/*____________________________________________________*/
function solveSudoku(board) {
  const N = board.length;

  // Helper function to check if a given value is valid for a specific cell
  function isValid(row, col, value) {
    // Check if the value already exists in the same row or column
    for (let i = 0; i < N; i++) {
      if (board[row][i] === value || board[i][col] === value) {
        return false;
      }
    }

    // Check if the value already exists in the same sub-grid
    const subgridRow = Math.floor(row / 3) * 3;
    const subgridCol = Math.floor(col / 3) * 3;
    for (let i = subgridRow; i < subgridRow + 3; i++) {
      for (let j = subgridCol; j < subgridCol + 3; j++) {
        if (board[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }

  // Helper function to solve the Sudoku board using backtracking
  function backtrack(row, col) {
    // Check if we reached the end of the board
    if (row === N) {
      return true;
    }

    // Check if we reached the end of the row
    if (col === N) {
      return backtrack(row + 1, 0);
    }

    // Check if the current cell is already filled
    if (board[row][col] !== 0) {
      return backtrack(row, col + 1);
    }

    // Try different values for the current cell
    for (let value = 1; value <= N; value++) {
      if (isValid(row, col, value)) {
        board[row][col] = value;
        if (backtrack(row, col + 1)) {
          return true;
        }
        board[row][col] = 0;
      }
    }

    return false;
  }

  // Start backtracking from the top-left corner
  backtrack(0, 0);

  return board;
}

function answer() {
  // Get the input elements from the grid
  const inputs = document.querySelectorAll('#main .input');

  // Convert the input elements into a 2D array representing the Sudoku board
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const input = inputs[i * 9 + j];
      row.push(parseInt(input.value) || 0);
    }
    board.push(row);
  }

  // Solve the Sudoku board
  const solved = solveSudoku(board);

  // Display the solved Sudoku board
  if (solved) {
  for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
  const input = inputs[i * 9 + j];
  input.value = solved[i][j];
  }
  }
  } else {
  alert("Unable to solve Sudoku!");
  }
  }
  
  // Function to solve the Sudoku board using backtracking algorithm
  function solveSudoku(board) {
  // Find the first empty cell in the board
  const [row, col] = findEmptyCell(board);
  
  // If there are no empty cells, the board is solved
  if (row === -1 && col === -1) {
  return board;
  }
  
  // Try all possible values for the empty cell
  for (let num = 1; num <= 9; num++) {
  // Check if the number is valid in the current cell
  if (isValid(board, row, col, num)) {
  // Set the current cell to the number
  board[row][col] = num;

  // Recursively solve the rest of the board
  const result = solveSudoku(board);
  if (result) {
    return result;
  }
}
}

// If no value works for the current cell, backtrack and try a different value for the previous cell
board[row][col] = 0;
return null;
}

// Function to find the first empty cell in the board
function findEmptyCell(board) {
for (let i = 0; i < 9; i++) {
for (let j = 0; j < 9; j++) {
if (board[i][j] === 0) {
return [i, j];
}
}
}
return [-1, -1];
}

// Function to check if a number is valid in the current cell
function isValid(board, row, col, num) {
// Check if the number is already in the same row or column
for (let i = 0; i < 9; i++) {
if (board[row][i] === num || board[i][col] === num) {
return false;
}
}

// Check if the number is already in the same 3x3 box
const boxRow = Math.floor(row / 3) * 3;
const boxCol = Math.floor(col / 3) * 3;
for (let i = boxRow; i < boxRow + 3; i++) {
for (let j = boxCol; j < boxCol + 3; j++) {
if (board[i][j] === num) {
return false;
}
}
}

// If the number is not already in the same row, column, or 3x3 box, it is valid
return true;
}
