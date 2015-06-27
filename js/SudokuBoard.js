var SudokuBoard = {

  cellToBox: function(row, col){
      var boxRow = Math.floor(row / 3) * 3;
      var boxCol = Math.floor(col / 3) * 3;
      return Math.floor(boxRow / 3) * 3 + Math.floor(boxCol / 3);
    },
  insideBox: function(upperLeft, row, col){
    if(upperLeft[0] <= row && row <= (upperLeft[0] + 2) &&
       upperLeft[1] <= col && col <= (upperLeft[1] + 2) ){
      return true;
    }
    return false;
  },
  create: function(initialState){
    var rawValues = [];
    var rawPencilMarks = [];
    var errors = {};
    for(i = 0; i < 9; i++){
      rawValues.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    if(initialState != undefined){
      var valueArray = initialState.split("");

      for(row = 0; row < 9; row++){
        for(col = 0; col < 9; col++){
          var num = parseInt(valueArray[ row*9 + col ]);
          if( num >= 0 ){
            rawValues[row][col] = num;
          }
        }
      }
    }

    function board() {};
    board.values = function(){
      return rawValues;
    };

    function markRowError(row, col){
      var num = rawValues[row][col];
      errors.cells = [];
      for(i = 0; i < 9; i++){
        if(rawValues[row][i] == num){
          errors.cells.push([row,i]);
        }
      }

      errors.type = "row";
    }

    function markColumnError(row, col){
      var num = rawValues[row][col];
      errors.cells = [];
      for(i = 0; i < 9; i++){
        if(rawValues[i][col] == num){
          errors.cells.push([i,col]);
        }
      }

      errors.type = "column";
    }

    function markBoxError(rowStart, colStart, row, col){
      var num = rawValues[row][col];
      errors.cells = [];
      errors.boxCorner = [rowStart,colStart];
      for(row = rowStart; row < rowStart + 3; row++){
        for(col = colStart; col < colStart + 3; col++){
          if(rawValues[row][col] == num){
            errors.cells.push([row,col]);
          }
        }
      }

      errors.type = "box";
    }

    board.isValid = function(){
      var usedVals = 0;
      var valid = true;
      errors = {};
      // test rows
      for(i = 0; i < 9; i++){
        usedVals = 0;
        var row = rawValues[i];
        for(j = 0; j < 9; j++){
          var num = row[j];
          if(num > 0){
            if((usedVals & (1 << num)) > 0){
              markRowError(i,j);
              return false;
            }

            usedVals |= 1 << num;
          }
        }
      }

      // test columns
      for(col = 0; col < 9; col++){
        usedVals = 0;
        for(row = 0; row < 9; row++){
          var num = rawValues[row][col];
          if(num > 0){
            if((usedVals & (1 << num)) > 0){
              markColumnError(row,col);
              return false;
            }

            usedVals |= 1 << num;
          }
        }
      }

      // test boxes
      var upperLefts = [0, 3, 6, 27, 30, 33, 54, 57, 60];
      for(i = 0; i < 9; i++){
        usedVals = 0;
        var rowStart = Math.floor(upperLefts[i] / 9);
        var colStart = upperLefts[i] % 9;
        for(row = rowStart; row < rowStart + 3; row++){
          for(col = colStart; col < colStart + 3; col++){
            var num = rawValues[row][col];
            if(num > 0){
              if((usedVals & (1 << num)) > 0){
                markBoxError(rowStart, colStart, row, col);
                return false;
              }

              usedVals |= 1 << num;
            }
          }
        }
      }

      return valid;
    };

    board.errors = function(){
      board.isValid();
      return errors;
    }

    board.changeValue = function(row, col, newValue){
      if(isNaN(newValue)){
        rawValues[row][col] = 0;
      }
      else if( row >= 0 && row < 9 &&
          col >= 0 && col < 9 &&
          newValue >= 1 && newValue <= 9){
        rawValues[row][col] = newValue;
      }
    }

    return board;
  }
}
