/**
 * This file contains definitions of all data structures used by the chess logic
 * engine.
 *
 * Author: Chris Timperley <christimperley@gmail.com>
 */

var Piece = function (colour, type, cell) {
  this.colour = colour;
  this.type = type;
  this.cell = cell;
};

var Player = function (colour) {
  this.colour = colour;
};

var Game = function (turn, pieces) {};