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
  pieces = game.pieces.filter(function(piece){
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

/**
 * NEED A CHECK FILTER
 */

 /**
  * Special cases:
  * - Castling.
  * - Promotion.
  * - En passant.
  */