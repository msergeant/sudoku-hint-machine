describe("SudokuHints.hiddenSingle", function(){
  it("find hidden single in a box", function(){
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

    expect(hints).toEqual({
                            columns: [0,2],
                            rows: [1,2],
                            cell: [0,1],
                            value: 1,
                            type: "box"
                           }
                          );
  });
});



