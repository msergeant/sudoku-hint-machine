var SudokuBoard = require('../src/js/SudokuBoard.js');
var SudokuPencilMarks = require('../src/js/SudokuPencilMarks.js');
var stringFromBoardArray = require('./helper.js');

describe("SudokuPencilMarks.values", function(){
  it("returns full for empty board", function(){
    var board = SudokuBoard.create();
    var marks = SudokuPencilMarks.create(board).values();

    expect(marks[0][0]).toEqual([1,2,3,4,5,6,7,8,9]);
  });

  it("returns empty if the value has already been set", function(){
    var boardString = stringFromBoardArray([[0, 1, 2, 3, 4, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var marks = SudokuPencilMarks.create(board).values();

    expect(marks[0][1]).toEqual([]);
  });

  it("takes out values that have already been used in that row", function(){
    var boardString = stringFromBoardArray([[0, 1, 2, 3, 4, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 1, 2, 3, 4],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var marks = SudokuPencilMarks.create(board).values();

    expect(marks[0][0]).toEqual([5,6,7,8,9]);
    expect(marks[4][0]).toEqual([5,6,7,8,9]);
  });

  it("takes out values that have already been used in that column", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [1, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [2, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [3, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [4, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 1, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 2, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 3, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 4, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var marks = SudokuPencilMarks.create(board).values();

    expect(marks[0][0]).toEqual([5,6,7,8,9]);
    expect(marks[0][3]).toEqual([5,6,7,8,9]);
  });

  it("takes out values that have already been used in that box", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 1, 3, 0, 0, 0, 0, 0, 0],
                                            [0, 2, 4, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 1, 3, 0, 0, 0],
                                            [0, 0, 0, 0, 2, 4, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var marks = SudokuPencilMarks.create(board).values();

    expect(marks[0][0]).toEqual([5,6,7,8,9]);
    expect(marks[3][4]).toEqual([5,6,7,8,9]);
  });
});

