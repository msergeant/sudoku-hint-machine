var SudokuPermuter = {
  swap: function(originalString, num1, num2) {
    var regex1 = new RegExp(num1, 'g');
    var regex2 = new RegExp(num2, 'g');
    return originalString.replace(regex1, '?').replace(regex2, num1).replace(/\?/g, num2);
  },
  columnSwap: function(originalString, col1, col2) {
  }
};

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
   module.exports = SudokuPermuter;
}
