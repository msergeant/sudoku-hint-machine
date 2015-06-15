describe("SudokuPencilMarks.values", function(){
  it("returns full for empty board", function(){
    var board = SudokuBoard.create();
    var marks = SudokuPencilMarks.create(board).values();

    expect(marks[0][0]).toEqual([1,2,3,4,5,6,7,8,9]);
  });

});

