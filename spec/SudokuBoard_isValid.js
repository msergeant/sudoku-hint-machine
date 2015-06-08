describe("SudokuBoard.isValid", function(){
  it("returns true for empty board", function(){
    var board = SudokuBoard.create();
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
});
