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

    const [first, last] = [col1, col2].sort();

    return originalString.match(/.{1,9}/g).map(function(str) {
      return swapChar(str, first, last);
    }).join('');
  }
};

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
   module.exports = SudokuPermuter;
}
