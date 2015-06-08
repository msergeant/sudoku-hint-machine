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
    var board = SudokuBoard.create("123456789200000000300000000400000000500000000600000000700000000800000000900000000");
    expect(board.values()).toEqual([[1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    [2, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [3, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [4, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [5, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [6, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [7, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [8, 0, 0, 0, 0, 0, 0, 0, 0],
                                    [9, 0, 0, 0, 0, 0, 0, 0, 0]]);
  });
});
