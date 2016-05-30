var SudokuBoard = require('../src/js/SudokuBoard.js');
var SudokuPencilMarks = require('../src/js/SudokuPencilMarks.js');
var SudokuHints = require('../src/js/SudokuHints.js');
var stringFromBoardArray = require('./helper.js');
var _ = require('./underscore-min.js');

describe("SudokuHints.nakedSingle", function(){
  it("finds naked single", function(){
    var boardString = stringFromBoardArray([[1, 2, 3, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 4, 5, 6, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 7, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 8, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).nakedSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [],
          rows: [],
          cell: [[1,1]],
          value: 9,
          type: "naked",
          highlightCells: [null, [0,0], [0,1], [0,2], [1,3], [1,4], [1,5], [3,1], [4,1], null]
         })).
           toEqual(true);
  });
});



