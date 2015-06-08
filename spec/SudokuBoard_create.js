describe("SudokuBoard.create", function(){
  it("should initialize with an empty board", function(){
    var board = SudokuBoard.create();
    expect(board.values()).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0]]);

  });

  it("should initialize with a string-defined board", function(){
    var board = SudokuBoard.create("123456789200000001300000001400000001500000001600000001700000001800000001900000001");
    expect(board.values()).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    [2, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [3, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [4, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [5, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [6, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [7, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [8, 0, 0, 0, 0, 0, 0, 0, 1],
                                    [9, 0, 0, 0, 0, 0, 0, 0, 1]]);
  });
});
