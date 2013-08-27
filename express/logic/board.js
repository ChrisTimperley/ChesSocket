/**
 * MAJOR WORRIES:
 * - PASSING AROUND POINTERS!
 */

/**
 * Moves a given piece on a board to a given destination.
 * If that destination contains an enemy piece, then that piece is destroyed.
 */

var board_move = function (board, piece, to) {

  // Extract the pieces on the board.
  cells = board.cells;
  pieces = board.pieces;

  // Destroy any enemy piece in the destination cell.
  if (cells[to] != null) {
    pieces.splice(pieces.indexOf(cells[to]), 1);
  }

  // Return the resulting board.
  return new Board(cells, pieces);

};

/**
 * Checks if a given cell on the board is occupied.
 */

var cell_occupied = function (board, cell) {
  return board.cells[cell] != null;
}

/**
 * Checks if a given cell on the board is occupied by an enemy.
 */

var cell_occupied_by_enemy = function (board, cell, colour) {
  return board.cells[cell] != null && board.cells[cell].colour != colour;
}

/**
 * Checks if a given cell on the board is occupied by a friendly.
 */

var cell_occupied_by_friendly = function (board, cell, colour) {
  return board.cells[cell] != null && board.cells[cell].colour == colour;
}