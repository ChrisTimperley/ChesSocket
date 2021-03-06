/**
 * This file contains functions for calculating the moves that each specific
 * type of piece can make.
 *
 * TODO:
 * - Castling.
 * - En passant.
 * - Promotion (belongs in game-level logic).
 *
 * Author: Chris Timperley <christimperley@gmail.com>
 */

/**
 * Calculates all the moves which a given piece can make.
 * This function can optionally include or exclude those moves which would put
 * the player into check.
 *
 * Parameters:
 * board - The current state of the board.
 * piece - The piece whose possible moves are being calculated.
 * check_enforce - True if list of moves should exclude those which put the player in check.
 *
 * Returns:
 * A list of all the possible moves this piece can make.
 */

function calculate_moves(board, piece, check_enforce) {
  check_enforce = typeof check_enforce !== 'undefined' ? check_enforce : true;
  moves = __calculate_moves[piece.type](board, piece);

  // Filter the list to only those which do not result in check if
  // enforcement is enabled.
  if (check_enforce) {
    moves.filter(function(move){
      return determine_check(apply_move(board, move), player);
    });
  }

  return moves;
}

/**
 * This indexed set of private functions are responsible for the piece specific
 * movement calculations.
 *
 * Each function has the following form:
 * board - The current state of the board.
 * piece - The piece whose possible moves are being calculated.
 *
 * And each returns a list of the possible moves for that piece (before taking
 * into account that certain moves may put the player in check).
 */

var __calculate_moves = {

  /**
   * The knight can move at most in only one of 8 pre-calculated directions.
   * Exclude those destinations which are either outside the board
   * or which are occupied by a friendly piece.
   */

  'knight': function (board, piece) {
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

  'pawn': function (board, piece) {

    cell = cartesian_form(piece.cell);
    direction = piece.colour == 'white' ? 1 : 0;
    
    // Check if the pawn can take a piece on each diagonal.
    moves = [
      [cell[0] - 1, cell[1] + direction],
      [cell[0] + 1, cell[1] + direction],
    ].filter(function(dest){
      return cartesian_legal(dest) && cell_occupied_by_enemy(board, dest, piece.colour);
    });

    // Unless blocked, a pawn can ALWAYS move forward.
    // If the pawn has reached the last cell in their column, then they
    // cease to be a pawn and are promoted to another piece.
    dest = [cell[0], cell[1] + direction]
    if (!cell_occupied(board, dest)) {
      moves.push(dest);
    }

    // Starting position.
    if ((cell[1] == 1 && direction == 1) || (cell[1] == 6 && direction == -1)) {
      dest = [cell[0], cell[1] + (direction * 2)];
      if (!cell_occupied(board, dest)) {
        moves.push(dest);
      }
    }

    return moves;

  },

  /**
   * Rooks can move along their current row and column. They may not pass to a given cell
   * if the path to that cell is blocked. The rook may take any enemy pieces on the edge of
   * their reaches.
   */

  'rook': function (board, piece) {
    return [
      [1, 0], [-1, 0], [0, -1], [0, 1]
    ].reduce(function(moves, direction){
      return moves.append(calculate_move_vector(board, piece, direction));
    }, []);
  },

  /**
   * Bishops can move along any diagonal. They may not pass to a given cell
   * if the path to that cell is blocked. The bishop may take any enemy pieces on the edge of
   * their reaches.
   */

  'bishop': function (board, piece) {
    return [
      [1, 1], [-1, 1], [-1, -1], [1, -1]
    ].reduce(function(moves, direction){
      return moves.append(calculate_move_vector(board, piece, direction));
    }, []);
  },

  /**
   * The Queen can move along the row, column and diagonals up until it is obstructed by
   * another piece. If that piece belongs to the enemy, then the queen may move there
   * to capture it.
   */

  'queen': function (board, piece) {
    return [
      [1, 1], [-1, 1], [-1, -1], [1, -1],
      [1, 0], [-1, 0], [0, -1], [0, 1]
    ].reduce(function(moves, direction){
      return moves.append(calculate_move_vector(board, piece, direction));
    }, []);
  },

  /**
   * The King can move to any cell adjacent to it so long as that cell isn't occupied
   * by a friendly piece.
   */

  'king': function (board, piece) {
    cell = cartesian_form(piece.cell);
    return [
      [0,1], [1,1], [1,0], [1,-1],
      [0,-1], [-1,-1], [-1, 0], [-1, 1]
    ].map(function(offset){
      return [offset[0] + cell[0], offset[1] + cell[1]];
    }).filter(function(move){
      return cartesian_legal(move) && !cell_occupied_friendly(board, dest, colour);
    });
  }

};

/**
 * Calculates all possibles moves that this piece can make along the given vector /
 * in the given direction. Travels as far as possible along the vector until an occupied
 * cell is reached; if that cell is occupied by the enemy then it is included (as it
 * may be captured by the moving piece).
 *
 * Parameters:
 * board - The current state of the board.
 * piece - The piece to move along the vector.
 * direction - The direction / vector to move the piece along.
 *
 * Returns:
 * An array of the possible moves that can be made along this vector.
 */

var calculate_move_vector = function (board, piece, direction) {
  moves = [];
  for (var dest = cartesian_form(piece.cell); cartesian_legal(dest); dest = [dest[0] + dir[0], dest[1] + dir[1]]) {
    if (!cell_occupied_friendly(board, dest, piece.colour)) {
      moves.append(dest);
    }
    if (cell_occupied(board, dest, piece.colour)) {
      break;
    }
  }
  return moves;
};