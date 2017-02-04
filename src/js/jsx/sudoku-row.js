var SudokuRow = React.createClass({
  findCellClass: function(row, col){
    var retClass = "cell";
    if(col == 2 || col == 5){
      retClass += " rt";
    }
    if(row == 2 || row == 5){
      retClass += " btm";
    }

    retClass += this.markErrors(row, col);
    retClass += this.markHint(row, col);

    return retClass;
  },
  markErrors: function(row, col){
    var errors = this.props.errorData;
    var retClass = "";

    if(errors.type == "row" && row == errors.cells[0][0]){
      if(arrayContains(errors.cells, [row,col])){
        retClass += " prob";
      }
      else{
        retClass += " err";
      }
    }
    else if(errors.type == "column" && col == errors.cells[0][1]){
      if(arrayContains(errors.cells, [row,col])){
        retClass += " prob";
      }
      else{
        retClass += " err";
      }
    }
    else if(errors.type == "box" &&
            SudokuBoard.insideBox(errors.boxCorner, row, col)){
      if(arrayContains(errors.cells, [row,col])){
        retClass += " prob";
      }
      else{
        retClass += " err";
      }
    }


    return retClass;
  },
  markHint: function(row, col){
    if(this.props.hint == null){
      return "";
    }
    var hint = this.props.hint;
    var retClass = "";
    var rowData = this.props.rowData;
    var theNum = rowData[col];
    var box = SudokuBoard.cellToBox(row, col);

    if(hint.columns.indexOf(col) > -1){
      if(theNum == hint.value){
        retClass += " hintCause";
      }
      else{
        retClass += " hintLine";
      }
    }
    if(hint.rows.indexOf(row) > -1){
      if(theNum == hint.value){
        retClass += " hintCause";
      }
      else{
        retClass += " hintLine";
      }
    }
    if(hint.boxes != null && hint.boxes.indexOf(box) > -1){
      if(theNum == hint.value){
        retClass += " hintCause";
      }
      else{
        retClass += " hintLine";
      }
    }

    if(hint.highlightCells != null && 
       hint.highlightCells[theNum] != null &&
       hint.highlightCells[theNum][0] == row &&
       hint.highlightCells[theNum][1] == col){
        retClass += " hintCause";
    }

    if(arrayContains(hint.cell, [row, col])){
      retClass += " hintTarget";
    }
    return retClass;
  },
  render: function(){
    var row = this.props.rowIndex;
    var onChange = this.props.onChange;
    var onPencilMarkClick = this.props.onPencilMarkClick;
    var findClass = this.findCellClass;
    var marks = this.props.pencilMarks;
    var showMarks = this.props.showMarks;
    var values = this.props.rowData.map(function(value, column){
      var cell = value > 0 ? value : "";
      var cellId = "cell-" + row + column;
      if(value == 0 && showMarks){
        return(
          <SudokuPencilCell
            cellValue={ marks[row][column] }
            cellClassName={findClass(row, column)}
            onChange={onChange}
            onPencilMarkClick={onPencilMarkClick}
            cellId={cellId} />
        );
      }
      else{
        return(
          <SudokuCell
            cellValue={ cell }
            cellId={cellId}
            onChange={onChange}
            cellClassName={findClass(row, column)}/>
        );
      }
    });

    return(
      <tr>
        {values}
      </tr>
    );
  }
});


