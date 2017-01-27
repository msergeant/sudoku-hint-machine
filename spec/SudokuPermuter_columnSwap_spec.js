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

    expect(SudokuPermuter.columnSwap(oldString, 0, 1))
      .toEqual(["213456789",
                "223456789",
                "233456789",
                "243456789",
                "253456789",
                "263456789",
                "273456789",
                "283456789",
                "293456789"].join(''));
  });

  it("works if column numbers are reversed", function() {
    var oldString = ["123456789",
                     "223456789",
                     "323456789",
                     "423456789",
                     "523456789",
                     "623456789",
                     "723456789",
                     "823456789",
                     "923456789"].join('');

    expect(SudokuPermuter.columnSwap(oldString, 4, 2))
      .toEqual(["125436789",
                "225436789",
                "325436789",
                "425436789",
                "525436789",
                "625436789",
                "725436789",
                "825436789",
                "925436789"].join(''));
  });

  it("does nothing if columns are the same", function() {
    var oldString = ["123456789",
                     "223456789",
                     "323456789",
                     "423456789",
                     "523456789",
                     "623456789",
                     "723456789",
                     "823456789",
                     "923456789"].join('');

    expect(SudokuPermuter.columnSwap(oldString, 5, 5))
      .toEqual(oldString);
  });


});
