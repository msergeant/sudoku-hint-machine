var SudokuPencilMarks = {
  create: function(sudokuBoard){
    var board = sudokuBoard;
    var rawMarks = [];

    var marks = function() {};

    marks.values = function(){
      rawMarks = [];

      for(row = 0; row < 9; row++){
        rawMarks.push([[],[],[],[],[],[],[],[],[]]);
        for(col = 0; col < 9; col++){
          rawMarks[row][col] = [1,2,3,4,5,6,7,8,9];
        }
      }

      return rawMarks;
    }

    return marks;
  }
}
