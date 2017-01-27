var SudokuBoard = require('../src/js/SudokuBoard.js');
var stringFromBoardArray = require('./helper.js');

describe("SudokuBoard.isValid", function(){
  it("returns true for empty board", function(){
    var board = SudokuBoard.create();
    expect(board.isValid()).toEqual(true);
  });

  it("returns true for solved board", function(){
    var boardString = stringFromBoardArray([[8, 4, 3, 5, 1, 9, 7, 6, 2],
                                            [5, 1, 6, 4, 7, 2, 8, 3, 9],
                                            [2, 7, 9, 3, 8, 6, 5, 1, 4],
                                            [4, 3, 1, 2, 5, 8, 6, 9, 7],
                                            [7, 8, 2, 9, 6, 1, 4, 5, 3],
                                            [6, 9, 5, 7, 3, 4, 2, 8, 1],
                                            [9, 2, 8, 1, 4, 5, 3, 7, 6],
                                            [3, 5, 4, 6, 9, 7, 1, 2, 8],
                                            [1, 6, 7, 8, 2, 3, 9, 4, 5]]);
    var board = SudokuBoard.create(boardString);
    expect(board.isValid()).toEqual(true);
  });

  it("returns false for repeated numbers in the same row", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 5, 0, 0, 0, 0, 5, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    expect(board.isValid()).toEqual(false);
  });

  it("returns false for repeated numbers in the same column", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 5, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 5, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    expect(board.isValid()).toEqual(false);
  });

  it("returns false for repeated numbers in the same box", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [1, 2, 3, 4, 5, 6, 7, 8, 9],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 5, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 5, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    expect(board.isValid()).toEqual(false);
  });
});
