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

    function eliminateColumnValues(values, col){
      for(var row = 0; row < 9; row++){
        var rowVal = board[row][col];
        if(rowVal > 0){
          removeElement(values, rowVal);
        }
      }
    }

    function eliminateBoxValues(values, currentRow, currentCol){
      var boxRow = Math.floor(currentRow / 3) * 3;
      var boxCol = Math.floor(currentCol / 3) * 3;
      for(var row = boxRow; row < (boxRow + 3); row++){
        for(var col = boxCol; col < (boxCol + 3); col++){
          var rowVal = board[row][col];
          if(rowVal > 0){
            removeElement(values, rowVal);
          }
        }
      }
    }
    var marks = function() {};

    marks.values = function(){
      if(rawMarks.length > 0){
        return rawMarks;
      }
      rawMarks = [];

      for(var row = 0; row < 9; row++){
        rawMarks.push([[],[],[],[],[],[],[],[],[]]);
      }

      for(row = 0; row < 9; row++){
        for(var col = 0; col < 9; col++){
          if(board[row][col] == 0){
            var remainingValues = [1,2,3,4,5,6,7,8,9];

            eliminateRowValues(remainingValues, row);
            eliminateColumnValues(remainingValues, col);
            eliminateBoxValues(remainingValues, row, col);

            rawMarks[row][col] = remainingValues;
          }
        }
      }

      return rawMarks;
    }

    marks.adjust = function( numberDeleted ){
      numberDeleted = numberDeleted || false
      for(row = 0; row < 9; row++){
        for(var col = 0; col < 9; col++){
          if(board[row][col] == 0){
            var remainingValues = numberDeleted ? [1,2,3,4,5,6,7,8,9] : rawMarks[row][col];

            eliminateRowValues(remainingValues, row);
            eliminateColumnValues(remainingValues, col);
            eliminateBoxValues(remainingValues, row, col);

            rawMarks[row][col] = remainingValues;
          }
        }
      }
    }

    marks.remove = function(row, col, number){
      var index = rawMarks[row][col].indexOf(number);
      if(index > -1){
        rawMarks[row][col].splice(index, 1);
      }
    }

    return marks;
  }
};

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
   module.exports = SudokuPencilMarks;
}
