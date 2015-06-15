var SudokuPencilMarks = {
  create: function(sudokuBoard){
    var board = sudokuBoard.values();
    var rawMarks = [];

    function removeElement(array, value){
      var index = array.indexOf(value);
      if(index > -1){
        array.splice(index, 1);
      }
    }

    function eliminateRowValues(values, row){
      for(var col = 0; col < 9; col++){
        var rowVal = board[row][col];
        if(rowVal > 0){
          removeElement(values, rowVal);
        }
      }
    }

    var marks = function() {};

    marks.values = function(){
      rawMarks = [];

      for(var row = 0; row < 9; row++){
        rawMarks.push([[],[],[],[],[],[],[],[],[]]);
      }

      for(row = 0; row < 9; row++){
        for(var col = 0; col < 9; col++){
          if(board[row][col] == 0){
            var remainingValues = [1,2,3,4,5,6,7,8,9];

            eliminateRowValues(remainingValues, row);

            rawMarks[row][col] = remainingValues;
          }
        }
      }

      return rawMarks;
    }

    return marks;
  }
}
