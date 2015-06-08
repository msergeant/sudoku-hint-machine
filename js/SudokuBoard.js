var SudokuBoard = {
  create: function(initialState){
    var rawValues = [];
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

    board.isValid = function(){
      var usedVals = 0;
      var valid = true;
      // test rows
      for(i = 0; i < 9; i++){
        usedVals = 0;
        var row = rawValues[i];
        row.forEach(function(num){
          if(num > 0){
            if((usedVals & (1 << num)) > 0){
              valid = false;
            }

            usedVals |= 1 << num;
          }
        });

        if(!valid){
          return false;
        }
      }

      // test columns
      //for(row = 0; row < 9; row++){
        //usedVals = 0;
        //for(col = 0; col < 9; col++){
          //var num = rawValues[row][col];
          //if(num > 0){
            //if(usedVals & (1 << num) > 0){
              //return false;
            //}

            //usedVals |= 1 << num;
          //}
        //}
      //}

      return valid;
    };

    return board;
  }
}
