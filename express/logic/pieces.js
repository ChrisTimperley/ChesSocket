/**
 * This file contains functions for calculating the moves that each specific
 * type of piece can make.
 *
 * Author: Chris Timperley <christimperley@gmail.com>
 */

var calculate_moves = {

  /**
   * The knight can move at most in only one of 8 pre-calculated directions.
   * Exclude those destinations which are either outside the board
   * or which are occupied by a friendly piece.
   */

  'knight': function (piece) {

    cell = cartesian_form(piece.cell);
    return [
      [2,1], [2,-1], [-2,1], [-2,-1],
      [1, 2], [1,-2], [-1, 2], [-1, -2]
    ].map(function(offset){
      return [offset[0] + cell[0], offset[1] + cell[1]];
    }).filter(function(move){
      return cartesian_legal(move) && !cell_occupied_friendly(board, dest, colour);
    });
  },

  /**
   * The pawn can move forward one space, or two spaces if at its original position.
   * A pawn can take pieces which face it on a diagonal.
   */

  'pawn': function (piece) {

    cell = cartesian_form(piece.cell);
    direction = parseInt(colour == 'white');
    colour = piece.colour;
    
    // Check if the pawn can take a piece on each diagonal.
    moves = [
      [cell[0] - 1, cell[1] + direction],
      [cell[0] + 1, cell[1] + direction],
    ].filter(function(dest){
      return cartesian_legal(dest) && cell_occupied_enemy(board, dest, colour);
    });

    // Unless blocked, a pawn can ALWAYS move forward.
    // If the pawn has reached the last cell in their column, then they
    // cease to be a pawn and are promoted to another piece.
    dest = [cell[0], cell[1] + direction]
    if (!cell_occupied(board, dest)) {
      moves.append(dest);
    }

    // Starting position.
    if ((cell[1] == 1 && direction == 1) || (cell[1] == 6 && direction == -1)) {
      dest = [cell[0], cell[1] + (direction * 2)];
      if (!cell_occupied(board, dest)) {
        moves.append(dest);
      }
    }

    // CHECK FILTER.

  },

  'rook': function (piece) {

  },

};