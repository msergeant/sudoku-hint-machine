var SudokuPermuter = require('../src/js/SudokuPermuter.js');

describe("SudokuPermuter.sectionSwap", function(){
  it("swaps rows 0-2 with rows 3-5", function(){
    var oldString = ["123456789",
                     "200000001",
                     "300000001",
                     "400000001",
                     "500000001",
                     "600000001",
                     "700000001",
                     "800000001",
                     "900000001"].join('');
    var newString = SudokuPermuter.sectionSwap(oldString, 0, 1);

    expect(newString).toEqual(["400000001",
                               "500000001",
                               "600000001",
                               "123456789",
                               "200000001",
                               "300000001",
                               "700000001",
                               "800000001",
                               "900000001"].join(''));
  });
  it("swaps rows 0-2 with rows 6-8", function(){
    var oldString = ["123456789",
                     "200000001",
                     "300000001",
                     "400000001",
                     "500000001",
                     "600000001",
                     "700000001",
                     "800000001",
                     "900000001"].join('');
    var newString = SudokuPermuter.sectionSwap(oldString, 0, 2);

    expect(newString).toEqual(["700000001",
                               "800000001",
                               "900000001",
                               "400000001",
                               "500000001",
                               "600000001",
                               "123456789",
                               "200000001",
                               "300000001",].join(''));
  });
});
