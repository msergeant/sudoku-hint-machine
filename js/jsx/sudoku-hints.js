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
   var target = $(event.target);
   target.children(".marks").hide();
   target.children("input").show().focus();
  },
  render: function(){
    var numbers = [];
    var pencilMarks = [1,2,3];
    for(var i = 0; i < pencilMarks.length; i++){
      numbers.push(
        <a className={"pencil " + this.addClass(pencilMarks[i])}>
          {pencilMarks[i]}
        </a>
      );
    }

    return(
      <td className={this.props.cellClassName} onClick={this.onClick}>
         <input
           className="pencilInput"
           id={this.props.cellId}
           value=""
           onChange={this.props.onChange} />
        <div className="marks">
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
    var values = this.props.rowData.map(function(value, column){
      var cell = value > 0 ? value : "";
      var cellId = "cell-" + row + column;
      if(value == 0 && marks != null){
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
    var board = SudokuBoard.create("000000000000000000123456789000000000000000500000000000000000000000000000000000000");
    return { data: board, pencilMarks: null };
  },
  cellChange: function(event){
    var chars = event.target.id.split("");
    var row = parseInt(chars[5]);
    var col = parseInt(chars[6]);
    var board = this.state.data;

    board.changeValue(row, col, parseInt(event.target.value));
    this.setState({ data: board});
  },
  showPencilMarks: function(){
    if(this.state.pencilMarks == null){
      var marks = SudokuPencilMarks.create(this.state.data);
      this.setState({pencilMarks: marks.values()});
    }
    else{
      this.setState({pencilMarks: null});
    }
  },
  render: function() {
    var rows = [];
    var errors = this.state.data.errors();
    for(i = 0; i < 9; i++){
      rows.push(
        <SudokuRow
            rowIndex={i}
            errorData={errors}
            rowData={this.state.data.values()[i]}
            pencilMarks={this.state.pencilMarks}
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
