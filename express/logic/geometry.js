/**
 * This file contains all geometry related functions used by the chess logic engine.
 * These functions are used to allow the programmer to work in both algebraic form and
 * using cartesian co-ordinates.
 *
 * Author: Chris Timperley <christimperley@gmail.com>
 */

// Adds an offset to a given cell to return the co-ordinates
// of a new cell (in algebraic notation).
//
// Parameters:
// cell - Cell to apply offset to (algebraic form).
// up - The number of cells to move up.
// right - The number of cells to move right.
var cell_add = function (cell, up, right) {

  // Calculate the X and Y co-ordinates of our new cell.
  cell = cartesian_form(cell);
  x = cell[0] + right;
  y = cell[1] + up;

  // Check that the cell is legal.
  if (!cartesian_legal([x, y])) {
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

/**
 * Determines if a given cartesian coordinate lies within the board.
 */

var cartesian_legal = function (coords) {
  return coords[0] >= 0 && coords[0] < 8 && coords[1] >= 0 && coords[1] < 8;
};