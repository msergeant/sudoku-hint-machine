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

    return board;
  }
}
