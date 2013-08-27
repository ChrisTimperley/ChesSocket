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