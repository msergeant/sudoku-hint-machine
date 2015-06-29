describe("SudokuBoard.toString", function(){
  it("works for blank board", function(){
    var boardArray = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
                      [2, 0, 0, 0, 0, 0, 0, 0, 0],
                      [3, 0, 0, 0, 0, 0, 0, 0, 0],
                      [4, 0, 0, 0, 0, 0, 0, 0, 0],
                      [5, 0, 0, 0, 0, 0, 0, 0, 0],
                      [6, 0, 0, 0, 0, 0, 0, 0, 0],
                      [7, 0, 0, 0, 0, 0, 0, 0, 0],
                      [8, 0, 0, 0, 0, 0, 0, 0, 0],
                      [9, 0, 0, 0, 0, 0, 0, 0, 0]];
    var boardString = stringFromBoardArray(boardArray);
    var board = SudokuBoard.create(boardString);

    expect(board.toString()).toEqual(boardString);
  });
});

