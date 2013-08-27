/**
 * This file contains the set of functions responsible for inspecting
 * and manipulating the state of the board.
 *
 * In a previous attempt, I'd tried modelling the board as a data structure
 * containing both a list of pieces and a 2D array of the board cells. Safely
 * interacting with this data structure may be an issue (you don't want to be passing
 * around pointers to the lists inside the original data structure) and manipulating it
 * requires a lot of extra care to ensure consistency is maintained.
 *
 * For now I've decided to stick to representing the board as a row-major 2D array and
 * providing a function to calculate a list of all the pieces on the board. As a list of
 * pieces is only required in a few places (none of which are in tight-loops), this small
 * computational cost is compensated by the decrease in complexity.
 *
 * Author: Chris Timperley <christimperley@gmail.com>
 */

/**
 * Constructs a board (as a 2D-array) from a list of pieces.
 *
 * Parameters:
 * pieces - A list of all the pices on this board.
 *
 * Returns:
 * A 2D array representing the contents of the board.
 */

function board_load(pieces) {

  // Initialise an empty board.
  board = new Array(8);
  for (var i = 0; i < 8; i++) {
    board[i] = new Array(8);
  }

  // Place each piece on the board.
  for (piece in pieces) {
    coords = cartesian_form(piece.cell);
    board[coords[0]][coords[1]] = piece;
  }

  return board;

}

/**
 * Moves a given piece on a board to a given destination.
 * If that destination contains an enemy piece, then that piece is destroyed.
 *
 * Parameters:
 * board - The current state of the board.
 * piece - The piece to move.
 * to - The cell to move the piece to (in algebraic form).
 *
 * Returns:
 * The resulting state of the board.
 */

function board_move(board, piece, to) {
  piece.cell = to;
  to = cartesian_form(to);
  board[to[0], to[1]] = piece;
  return board;
};

/**
 * Returns a list of all the pieces on a given board.
 */

function board_pieces(board) {
  return [].concat.apply([], board).filter(function(piece){
    return piece != null;
  });
}

/**
 * Returns the contents of a given cell.
 *
 * Parameters:
 * board - The board to check.
 * cell - The cell to retrieve the contents for (in algebraic form).
 */

function cell_contents(board, cell) {
  cell = cartesian_form(cell);
  return board[cell[0]][cell[1]];
}

/**
 * Checks if a given cell on the board is occupied.
 */

function cell_occupied(board, cell) {
  return board.cells[cell] != null;
}

/**
 * Checks if a given cell on the board is occupied by an enemy.
 */

function cell_occupied_by_enemy(board, cell, colour) {
  return board.cells[cell] != null && board.cells[cell].colour != colour;
}

/**
 * Checks if a given cell on the board is occupied by a friendly.
 */

function cell_occupied_by_friendly(board, cell, colour) {
  return board.cells[cell] != null && board.cells[cell].colour == colour;
}