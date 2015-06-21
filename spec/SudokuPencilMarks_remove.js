describe("SudokuPencilMarks.remove", function(){
  it("removes specified possibility", function(){
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

    pencilMarks.remove(0, 0, 5);

    expect(pencilMarks.values()[0][0]).toEqual([6,7,8,9]);
  });
});



