var murmurHash3 = require('../../node_modules/murmur-hash/lib/v3/murmur.js');
var SudokuPermuter = require('./SudokuPermuter.js');
const SudokuGenerator = {
  fetch: function(date) {
    const puzzles = [
      "000003900000027408000610020086090570701050806052060140030089000209430000008500000",
      "000000165100200030090013800700349008309806504800152003008520040030007001614000000",
      "706040003513807000002006708061000042000010000270000850104600200000709184800020305",
      "003058090600100200000000637200586009380709042900432001867000000002005006090260400",
      "910603040200040003053200000640010025001000600580090074000009560300080001090105037",
      "385006294410905000000300007000008020074050360020100000800003000000802016752600839",
      "104600000700000030068023000806050290090164080045080706000830460020000008000006301",
      "504700000006000010970081000709020038030475090250090706000910075080000900000007401",
      "000604500000090003000813062008000047301248605950000200720461000600080000003907000",
      "003000020100304006400010307090008240312406578045100030204080005500701003030000700",
      "005020800000009074008003021200586013100907008780142005530700100810200000002010900",
      "003009400705010930014000020000605200070941080009308000040000390096030107007500800",
      "090607081008409370000010004080000045009305200610000030800030000056104800430902050",
      "060540017300000209020010806030200108002906700806001090204050070107000003680097020",
      "000010004040208950009307102001000805030901070902000400804605700016702040200080000",
      "720300180000782000003900005430600500071020690006005078900003200000218000012009057",
      "703026041150000600020054090007560000900080004000049100060470010009000063370690408",
      "004003009700098001100670800010006498070010020428500010001065007500940002900200500",
      "000000079030000265050007008024809510000301000093206840300500020862000050970000000",
      "060004200040000986000000130970806012000502000450109067031000000684000020009300040",
      "010004300600920050538000000006392100701608509004157600000000983070031006003200010",
      "010000709800490005407150230000019020004060800070840000046081302700024001103000080",
      "056842000200000065034600000082495000400106002000287930000004820940000006000563140",
      "100500370000406018007201409601000804000805000908000502406108700710903000085007001",
      "060850790207060000080230610000680900038000560004095000095073020000010309041026050",
      "104000095090100400082090010000500049750984036940006000020050170005007020470000603",
      "086524000200000081073800000051937000700206008000418730000002850420000007000783240",
      "000006032000720609005000070409070061008369700670040805010000200706052000930600000",
      "409801350000000962000209400000316005000000000900472000004708000762000000053604709",
      "060430000400500010509010407270090060903060104010050032305070208020005001000043050",
      "080736210065000000300090000031400802074602190908003560000020001000000420092547080",
      "009750406006920103370060000000690001905000602800012000000040015408076200201035700",
      "002000046460002003730080050020400035650308074340006010090020067500900028280000400",
      "036000008504018690010039020400380000002070900000092006080940060045820709200000580",
      "025908000090035007604200000009040020070892010010050900000009402100320090000706150",
      "010000037700900005950030402100208000060379040000605009304050098600002004590000070",
      "001309800907080300050000009530600020476103985090008034700000090004060503009807400",
      "000529108000070900000803060050000403029135680607000010090704000008050000104382000",
      "064508702002709000917000000600154000000000000000932007000000913000803200703201460",
      "460582000790600000008000160150379000009804600000216079082000900000008056000967028",
      "008026900009480060010005200900004612800090003361700009002300070090047800007210300",
      "092160000600034000080700000150080042024050130930040065000005020000820007000079680",
      "000000052006205910020907406413050207000000000902010568507403020084501600260000000",
      "004000025200956010000040670800562300002703800005418009026030000030675002510000700",
      "000010009002904850040305021020000096004806700310000080980407060063109200200080000",
      "076000102040050078500007040063002000057396210000500360030800006490030080608000530",
      "800209670000000085005107904547010830000000000068070291103708500780000000059603008",
      "075080340000000001096730002000004130912503864048600000800065420500000000061040950",
      "060470059040050010028000067370100504000030000605009071250000180030020040910084030",
      "070190000005407210000050960416800000830020056000003784028040000041208600000061020"
    ];

    const shuffleHash = murmurHash3.x86.hash32(date);
    const rotationHash = murmurHash3.x86.hash32(shuffleHash.toString());
    const swapHash = murmurHash3.x86.hash32(rotationHash.toString());
    const startingPuzzle = puzzles[shuffleHash % (puzzles.length - 1)];
    let finishingPuzzle = startingPuzzle;

    // Swap numbers
    const shuffled = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], swapHash);
    for(let index = 0; index < 8; index += 2) {
      finishingPuzzle = SudokuPermuter.swap(finishingPuzzle, shuffled[index], shuffled[index + 1]);
    }

    let colSwap = shuffle([0, 1, 2], Math.floor(shuffleHash / 100));
    finishingPuzzle = SudokuPermuter.columnSwap(finishingPuzzle, colSwap[0], colSwap[1]);

    let times = Math.floor(rotationHash / 1) % 3;
    for(let counter = 0; counter < times; counter++) {
      finishingPuzzle = SudokuPermuter.rotate(finishingPuzzle);
    }

    colSwap = shuffle([3, 4, 5], Math.floor(shuffleHash / 100000));
    finishingPuzzle = SudokuPermuter.columnSwap(finishingPuzzle, colSwap[0], colSwap[1]);

    times = Math.floor(rotationHash / 1000) % 3;
    for(let counter = 0; counter < times; counter++) {
      finishingPuzzle = SudokuPermuter.rotate(finishingPuzzle);
    }

    colSwap = shuffle([6, 7, 8], Math.floor(shuffleHash / 100000000));
    finishingPuzzle = SudokuPermuter.columnSwap(finishingPuzzle, colSwap[0], colSwap[1]);

    times = Math.floor(rotationHash / 1000000) % 3;
    for(let counter = 0; counter < times; counter++) {
      finishingPuzzle = SudokuPermuter.rotate(finishingPuzzle);
    }

    return finishingPuzzle;
  },
};

function shuffle(array, rand) {
  let randomIndex;
  let tmpValue;
  let currentIndex = array.length;

  while(currentIndex != 0 && rand > 0) {
    randomIndex = rand % currentIndex;
    rand = Math.floor( rand / 10);
    currentIndex -= 1;

    tmpValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tmpValue;
  }

  return array;
}



// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
   module.exports = SudokuGenerator;
}
