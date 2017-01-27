var SudokuPermuter = require('../src/js/SudokuPermuter.js');

describe("SudokuPermuter.swap", function(){
  it("swaps 1 and 2", function(){
    var oldString = ["123456789",
                     "200000001",
                     "300000001",
                     "400000001",
                     "500000001",
                     "600000001",
                     "700000001",
                     "800000001",
                     "900000001"].join('');
    var newString = SudokuPermuter.swap(oldString, 1, 2);

    expect(newString).toEqual(["213456789",
                              "100000002",
                              "300000002",
                              "400000002",
                              "500000002",
                              "600000002",
                              "700000002",
                              "800000002",
                              "900000002"].join(''));
  });

  it("swaps 4 and 8", function(){
    var oldString = ["123456789",
                     "200000001",
                     "300000001",
                     "400000001",
                     "500000001",
                     "600000001",
                     "700000001",
                     "800000001",
                     "900000001"].join('');
    var newString = SudokuPermuter.swap(oldString, 4, 8);

    expect(newString).toEqual(["123856749",
                              "200000001",
                              "300000001",
                              "800000001",
                              "500000001",
                              "600000001",
                              "700000001",
                              "400000001",
                              "900000001"].join(''));
  });
});
