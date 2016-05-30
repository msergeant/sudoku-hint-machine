function stringFromBoardArray(boardValues){
  var returnString = "";
  for(i = 0; i < 9; i++){
    for(j = 0; j < 9; j++){
      returnString += boardValues[i][j].toString();
    }
  }

  return returnString;
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
   module.exports = stringFromBoardArray;
}

//describe("stringFromBoardArray", function(){
  //it("should convert array into a string", function(){
    //var board = [[1, 2, 3, 4, 5, 6, 7, 8, 9],
                 //[2, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[3, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[4, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[5, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[6, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[7, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[8, 0, 0, 0, 0, 0, 0, 0, 0],
                 //[9, 0, 0, 0, 0, 0, 0, 0, 0]];
    //expect(stringFromBoardArray(board)).toEqual("123456789200000000300000000400000000500000000600000000700000000800000000900000000");
  //});
//});
