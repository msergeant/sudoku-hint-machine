var SudokuBoard = {
  defaultSetup: [
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
  create: function(initialState){
    var rawValues = SudokuBoard.defaultSetup;
    if(initialState != undefined){
      var valueArray = initialState.split("");

      for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
          var num = parseInt(valueArray[ j*9 + i ]);
          if( num >= 0 ){
            rawValues[i][j] = num;
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
