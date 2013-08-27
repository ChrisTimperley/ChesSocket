// Data structures
var Piece = function (colour, type) {

};
var Player = function (colour) {};
var Game = function (turn, pieces) {};
var Board = function () {};
var Move = function () {};

// Logic.
var valid_move = function (player, piece, )
{

};

var owns_piece = function (player, piece)
{

};

// Produces a list of all the legal moves that a player can make.
var all_moves = function (game, player)
{
  // Alternatively you could store pieces in a 2D-array.
  // Group by colour.
  pieces = game.pieces.filter(function(piece, index, array){
    piece.colour == player.colour
  });

  // Find all moves for each piece.
  return pieces.reduce(function(moves, piece){
    return moves.concat(all_moves_piece(piece))
  }, []);
};

// Produces a list of all the legal moves that a given piece can make.
var all_moves_piece = function (game, piece)
{

};

var calculate_moves = {


  'knight': function (piece) {

    cell = piece.cell;
    colour = piece.colour;

    // Calculate the 8 different L-moves the piece
    // can make before reducing the list to those which
    // are within the board and which are legal.
    //moves = [cell_add(up, right)
    //
    //];

  },


};

// Adds an offset to a given cell to return the co-ordinates
// of a new cell (in algebraic notation).
var cell_add = function (cell, up, right) {

  // Calculate the X and Y co-ordinates of our new cell.
  [x, y] = cartesian_form(alg);
  x += right;
  y += up;

  // Check that the cell is legal.
  if (x > 8  || x < 1 || y > 8 || y < 1) {
    return false;
  }

  // Convert the X and Y co-ordinates to algebraic form.
  return algebraic_form(x, y);

};

// Calculates the algebraic form of a cartesian co-ordinate.
var algebraic_form = function (x, y) {
  return alphabet_char(x) + (y + 1);
};

// Calculates the cartesian form of an algebraic form.
var cartesian_form = function (alg) {
  return [alphabet_index(alg.charAt(0)), parseInt(alg.charAt(1)) - 1];
};

// Returns the alphabet character at a given index.
var alphabet_char = function (index) {
  return 'ABCDEFGH'.charAt(index);
};

// Returns the index of a given character in the alphabet.
var alphabet_index = function (char) {
  return 'ABCDEFGH'.indexOf(char);
};