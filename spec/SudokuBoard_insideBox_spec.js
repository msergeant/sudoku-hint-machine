var SudokuBoard = require('../src/js/SudokuBoard.js');
var stringFromBoardArray = require('./helper.js');

describe("SudokuBoard.insideBox", function(){
  it("returns false if the cell is outside the given box", function(){
    var upperLeft = [6, 0];
    expect(SudokuBoard.insideBox(upperLeft, 4, 4)).toEqual(false);
    expect(SudokuBoard.insideBox(upperLeft, 4, 8)).toEqual(false);
    expect(SudokuBoard.insideBox(upperLeft, 0, 0)).toEqual(false);
  });

  it("returns true if the cell is inside the given box", function(){
    var upperLeft = [6, 0];
    expect(SudokuBoard.insideBox(upperLeft, 6, 0)).toEqual(true);
    expect(SudokuBoard.insideBox(upperLeft, 6, 1)).toEqual(true);
    expect(SudokuBoard.insideBox(upperLeft, 7, 1)).toEqual(true);
  });
});

