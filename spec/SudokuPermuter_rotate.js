var SudokuPermuter = require('../src/js/SudokuPermuter.js');

describe("SudokuPermuter.rotate", function(){
  it("rotates matrix clockwise", function(){
    var oldString = ["123456789",
                     "200000001",
                     "300000001",
                     "400000001",
                     "500000001",
                     "600000001",
                     "700000001",
                     "800000001",
                     "900000001"].join('');
    var newString = SudokuPermuter.rotate(oldString);

    expect(newString).toEqual(["987654321",
                               "000000002",
                               "000000003",
                               "000000004",
                               "000000005",
                               "000000006",
                               "000000007",
                               "000000008",
                               "111111119"].join(''));
  });
});
