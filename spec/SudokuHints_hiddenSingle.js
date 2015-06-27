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
          boxes: [],
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
          boxes: [],
          cell: [[4,4]],
          value: 5,
          type: "box"
         })).
           toEqual(true);
  });

  it("finds hidden single in a row", function(){
    var boardString = stringFromBoardArray([[1, 2, 3, 4, 0, 0, 6, 7, 8],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 5, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).hiddenSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [4],
          rows: [],
          boxes: [],
          cell: [[0,5]],
          value: 5,
          type: "row"
         })).
           toEqual(true);
  });

  it("finds hidden single in a column", function(){
    var boardString = stringFromBoardArray([[1, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [2, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [3, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [4, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 5, 0, 0],
                                            [7, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 5, 0, 0, 0, 0, 0],
                                            [9, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).hiddenSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [],
          rows: [5,7],
          boxes: [],
          cell: [[4,0]],
          value: 5,
          type: "column"
         })).
           toEqual(true);
  });

  it("marks boxes when single is in a row", function(){
    var boardString = stringFromBoardArray([[1, 2, 3, 4, 0, 6, 7, 8, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 5, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).hiddenSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [],
          rows: [],
          boxes: [2],
          cell: [[0,4]],
          value: 5,
          type: "row"
         })).
           toEqual(true);
  });

  it("marks boxes when single is in a column", function(){
    var boardString = stringFromBoardArray([[1, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [2, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [3, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [4, 0, 5, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [7, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                            [9, 0, 0, 0, 0, 0, 0, 0, 0]]);
    var board = SudokuBoard.create(boardString);
    var pencilMarks = SudokuPencilMarks.create(board);
    var hints = SudokuHints.create(board, pencilMarks).hiddenSingle();

    expect(
      _.isEqual(
        hints,
        {
          columns: [],
          rows: [],
          boxes: [3],
          cell: [[7,0]],
          value: 5,
          type: "column"
         })).
           toEqual(true);
  });
});



