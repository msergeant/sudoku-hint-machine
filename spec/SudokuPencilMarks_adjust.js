describe("SudokuPencilMarks.adjust", function(){
  it("removes possibilities based on a new number being set", function(){
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
    var pencilMarks = SudokuPencilMarks.create(board);

    expect(pencilMarks.values()[0][0]).toEqual([5,6,7,8,9]);
    board.changeValue(2,2,5);

    pencilMarks.adjust();

    expect(pencilMarks.values()[0][0]).toEqual([6,7,8,9]);
  });

  it("refreshes possibilities when a number has been deleted", function(){
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
    var pencilMarks = SudokuPencilMarks.create(board);

    expect(pencilMarks.values()[0][0]).toEqual([5,6,7,8,9]);
    board.changeValue(0,1);

    pencilMarks.adjust(true);

    expect(pencilMarks.values()[0][0]).toEqual([1,5,6,7,8,9]);
  });
});


