describe("SudokuHints.hiddenSingle", function(){
  it("finds hidden single in a box", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 1, 0],
                                            [0, 0, 0, 0, 0, 1, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 1, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [1, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).hiddenSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [0,2],
          rows: [1,2],
          cell: [[0,1]],
          value: 1,
          type: "box"
         })).
           toEqual(true);
  });

  it("finds hidden single in a another box", function(){
    var boardString = stringFromBoardArray([[0, 0, 0, 5, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 5, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 5, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 5, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).hiddenSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [3,5],
          rows: [3,5],
          cell: [[4,4]],
          value: 5,
          type: "box"
         })).
           toEqual(true);
  });
});



