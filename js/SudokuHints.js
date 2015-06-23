var SudokuHints = {
  create: function(sudokuBoard, pencilMarks){
    var board = sudokuBoard.values();
    var marks = pencilMarks.values();

    var hints = function() {};

    function findHiddenSingle(cells){
      var pencils = [null, [], [], [], [], [], [], [], [], []];

      for(var cellIndex = 0; cellIndex < cells.length; cellIndex++){
        for(var num = 1; num <= 9; num++){
          var row = cells[cellIndex][0];
          var col = cells[cellIndex][1];

          if(marks[row][col].indexOf(num) > -1){
            pencils[num].push([row,col]);
          }
        }
      }

      var counts = pencils.map(function(val, i){
        if(val != null){
          return val.length;
        }
      });

      var firstOne = counts.indexOf(1);
      if(firstOne > -1){
        return { cell: pencils[firstOne], value: firstOne};
      }

      return null;
    }

    function markHiddenBoxSingle(hint){
      if(hint.type == 'box'){
        hint.columns = [];
        hint.rows = [];
        var boxRow = Math.floor(hint.cell[0][0] / 3) * 3;
        var boxCol = Math.floor(hint.cell[0][1] / 3) * 3;
        for(var row = boxRow; row < (boxRow + 3); row++){
          if(board[row].indexOf(hint.value) > -1){
            hint.rows.push(row);
          }
        }
        for(var col = boxCol; col < (boxCol + 3); col++){
          for(row = 0; row < 9; row++){
            if(board[row][col] == hint.value){
              hint.columns.push(col);
            }
          }
        }
      }
    }

    function markHiddenRowSingle(hint){
      if(hint.type == 'row'){
        hint.columns = [];
        hint.rows = [];
        var hintRow = hint.cell[0][0];
        for(var col = 0; col < 9; col++){
          if(board[hintRow][col] == 0){
            for(row = 0; row < 9; row++){
              if(board[row][col] == hint.value){
                hint.columns.push(col);
              }
            }
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
        for(var row = rowStart; row < rowStart + 3; row++){
          for(var col = colStart; col < colStart + 3; col++){
            if(board[row][col] == 0){
              cellsToCheck.push([row,col]);
            }
          }
        }

        var boxSingle = findHiddenSingle(cellsToCheck);
        if(boxSingle != null){
          boxSingle.type = 'box';
          markHiddenBoxSingle(boxSingle);
          return boxSingle;
        }

      }

      // search rows
      for(var row = 0; row < 9; row++){
        var cellsToCheck = [];
        for(var col = 0; col < 9; col++){
          if(board[row][col] == 0){
            cellsToCheck.push([row,col]);
          }
        }

        var rowSingle = findHiddenSingle(cellsToCheck);
        if(rowSingle != null){
          rowSingle.type = 'row';
          markHiddenRowSingle(rowSingle);
          return rowSingle;
        }

      }
    }

    return hints;
  }
}

