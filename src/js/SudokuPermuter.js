var SudokuPermuter = {
  swap: function(originalString, num1, num2) {
    var regex1 = new RegExp(num1, 'g');
    var regex2 = new RegExp(num2, 'g');
    return originalString.replace(regex1, '?').replace(regex2, num1).replace(/\?/g, num2);
  },
  columnSwap: function(originalString, col1, col2) {
    function swapChar(str, index1, index2) {
      return str.substr(0, index1)
             + str[index2]
             + str.substring(index1+1, index2)
             + str[index1]
             + str.substr(index2+1);
    }

    if(col1 === col2) {
      return originalString;
    }

    const first = col1 > col2 ? col2 : col1;
    const last = col1 > col2 ? col1 : col2;

    return originalString.match(/.{1,9}/g).map(function(str) {
      return swapChar(str, first, last);
    }).join('');
  },
  rotate: function(originalString) {
    const outGrid = [];
    for( let i = 0; i < originalString.length; i++) {
      const row = Math.floor( i / 9);
      const col = i % 9;

      const newCol = 9 - row - 1;
      const newRow = col;

      const newIndex = newRow * 9 + newCol;
      outGrid[newIndex] = originalString[i];
    }
    return outGrid.join('');
  },
  sectionSwap: function(originalString, section1, section2) {
    if(section1 === section2) {
      return originalString;
    }
    section1 -= 1;
    section2 -= 1;

    let rowList = originalString.match(/\d{9}/g);
    let hold1 = rowList[section1 * 3];
    let hold2 = rowList[section1 * 3 + 1];
    let hold3 = rowList[section1 * 3 + 2];

    rowList[section1 * 3] = rowList[section2 * 3];
    rowList[section1 * 3 + 1] = rowList[section2 * 3 + 1];
    rowList[section1 * 3 + 2] = rowList[section2 * 3 + 2];

    rowList[section2 * 3] = hold1;
    rowList[section2 * 3 + 1] = hold2;
    rowList[section2 * 3 + 2] = hold3;

    return rowList.join("");
  }
};

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
   module.exports = SudokuPermuter;
}
