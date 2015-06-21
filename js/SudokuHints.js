var SudokuHints = {
  create: function(sudokuBoard, pencilMarks){
    var board = sudokuBoard.values();
    var marks = pencilMarks;

    var hints = function() {};

    function searchForHiddenSingles(cells){
      var counts = [null, [], [], [], [], [], [], [], [], []];

      for(var cellIndex = 0; cellIndex < cells.length; cellIndex++){
        for(var num = 1; num <= 9; num++){
          var row = cells[cellIndex][0];
          var col = cells[cellIndex][1];

          if(marks[row][col].indexOf(num) > -1){
            counts[num] << [row,col];
          }
        }
      }



    }

    hints.hiddenSingle = function(){
      // search boxes
      var upperLefts = [0, 3, 6, 27, 30, 33, 54, 57, 60];
      for(i = 0; i < 9; i++){
        var cellsToCheck = [];
        var rowStart = Math.floor(upperLefts[i] / 9);
        var colStart = upperLefts[i] % 9;
        for(row = rowStart; row < rowStart + 3; row++){
          for(col = colStart; col < colStart + 3; col++){
            cellsToCheck << [row,col];
          }
        }

        searchForHiddenSingles(cellsToCheck);

      }

      return hint;
    }

    return hints;
  }
}

