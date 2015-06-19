function arrayContains(array, target){
  var targetString = target.toString();
  for(index = 0; index < array.length; index++){
    if(targetString === array[index].toString()){
      return true;
    }
  }
  return false;
}

var SudokuCell = React.createClass({
  onClick: function(event){
    event.target.select();
  },
  render: function(){
    return(
      <td className={this.props.cellClassName}>
       <input onClick={this.onClick} id={this.props.cellId} value={this.props.cellValue} autoFocus onChange={this.props.onChange} />
      </td>
    );
  }
});

var SudokuPencilCell = React.createClass({
  addClass: function(num){
    var numClasses = [0, "one","two","three","four","five","six","seven","eight","nine"];

    return numClasses[num];
  },
  onClick: function(event){
   var target = $(event.target).parents("td");
   target.children("input").show().focus();
   target.children(".marks").hide();
  },
  inputOnBlur: function(event){
   var target = $(event.target).parents("td");
   target.children(".marks").show();
   target.children("input").hide();
  },
  render: function(){
    var numbers = [];
    var pencilMarks = this.props.cellValue;
    for(var i = 0; i < pencilMarks.length; i++){
      numbers.push(
        <div className={"pencil " + this.addClass(pencilMarks[i])}>
          {pencilMarks[i]}
        </div>
      );
    }

    return(
      <td className={this.props.cellClassName}>
         <input
           className="pencilInput"
           id={this.props.cellId}
           value=""
           onBlur={this.inputOnBlur}
           onChange={this.props.onChange} />
        <div className="marks" onClick={this.onClick}>
          {numbers}
        </div>
      </td>
    );
  }
});

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
  render: function(){
    var row = this.props.rowIndex;
    var onChange = this.props.onChange;
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

var SudokuBox = React.createClass({
  getInitialState: function() {
    var board = SudokuBoard.create();
    var marks = SudokuPencilMarks.create(board);
    return { data: board, pencilMarks: marks, showMarks: false};
  },
  cellChange: function(event){
    var chars = event.target.id.split("");
    var row = parseInt(chars[5]);
    var col = parseInt(chars[6]);
    var board = this.state.data;

    board.changeValue(row, col, parseInt(event.target.value));
    this.state.pencilMarks.adjust();
    this.setState({ data: board});
  },
  showPencilMarks: function(){
    this.setState({ showMarks: !this.state.showMarks});
  },
  render: function() {
    var rows = [];
    var errors = this.state.data.errors();
    var marks = this.state.pencilMarks == null ? null : this.state.pencilMarks.values();
    for(i = 0; i < 9; i++){
      rows.push(
        <SudokuRow
            rowIndex={i}
            errorData={errors}
            rowData={this.state.data.values()[i]}
            showMarks={this.state.showMarks}
            pencilMarks={marks}
            onChange={this.cellChange}/>
      );
    }
    return (
      <div className="sudokuBox">
        <table>
          {rows}
        </table>
        <div className="sudokuControls">
        <input onClick={this.showPencilMarks} type="submit" value="Pencil Marks" />
        </div>
      </div>
    );
  }
});


React.render(
  <SudokuBox />,
  document.getElementById('content')
);
