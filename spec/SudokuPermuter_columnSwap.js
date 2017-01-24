var SudokuPermuter = require('../src/js/SudokuPermuter.js');

describe("SudokuPermuter.columnSwap", function(){
  it("columnSwaps 0 and 1", function(){
    var oldString = ["123456789",
                     "223456789",
                     "323456789",
                     "423456789",
                     "523456789",
                     "623456789",
                     "723456789",
                     "823456789",
                     "923456789"].join('');
    var newString = SudokuPermuter.columnSwap(oldString, 0, 1);

    expect(newString).toEqual(["213456789",
                               "223456789",
                               "233456789",
                               "243456789",
                               "253456789",
                               "263456789",
                               "273456789",
                               "283456789",
                               "293456789"].join(''));
  });

});
