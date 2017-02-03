var numClasses = [0, "one","two","three","four","five","six","seven","eight","nine"];
function arrayContains(array, target){
  var targetString = target.toString();
  for(index = 0; index < array.length; index++){
    if(targetString === array[index].toString()){
      return true;
    }
  }
  return false;
}

var inputKeyUp = function(){
  return function(event){
    var chars = event.target.id.split("");
    var row = parseInt(chars[5]);
    var col = parseInt(chars[6]);

    function showInputHideNext(element){
      element.next(".marks").hide();
      element.show().focus();
    }
    if(event.keyCode == 38 && row > 0){ //Up
      showInputHideNext($("#cell-" + (row - 1) + col));
    }
    else if(event.keyCode == 40 && row < 8){ //Down
      showInputHideNext($("#cell-" + (row + 1) + col));
    }
    else if(event.keyCode == 37 && col > 0){ //Left
      showInputHideNext($("#cell-" + row + (col - 1)));
    }
    else if(event.keyCode == 39 && col < 8){ //Right
      showInputHideNext($("#cell-" + row + (col + 1)));
    }
  }
};

function hintMessage(hint){
  var message = "No more hints were found.";
  if(hint != null){
    if(hint.type == "naked"){
      message = "The highlighted cell contains a naked single. This means that all other numbers have been eliminated from this cell. Place a " + hint.value + " in it."
    }
    else{
      message = "The highlighted cell contains a hidden single. This means that a number cannot be used anywhere else in that " + hint.type + ". Place a " + hint.value + " in the cell."
    }
  }
  return message;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function dailyDivExists() {
  return Boolean(document.getElementById('daily-puzzle-message'));
}

var SudokuCell = React.createClass({
  onClick: function(event){
    event.target.select();
  },
  onKeyUp: inputKeyUp(),
  render: function(){
    return(
      <td className={this.props.cellClassName}>
       <input
       onClick={this.onClick}
       onKeyUp={this.onKeyUp}
       id={this.props.cellId}
       value={this.props.cellValue}
       autoFocus
       onChange={this.props.onChange} />
      </td>
    );
  }
});

var SudokuPencilCell = React.createClass({
  addClass: function(num){
    return numClasses[num];
  },
  onKeyUp: inputKeyUp(),
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
        <div 
          className={"pencil " + this.addClass(pencilMarks[i])}
          onClick={this.props.onPencilMarkClick}>
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
           onKeyUp={this.onKeyUp}
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

function defaultMessage(board) {
  return board.isSolved() ? "You solved it!" : "";
}

var SudokuBox = React.createClass({
  getInitialState: function() {
    var queryBoard = getParameterByName("board");
    var board;

    if(queryBoard.match(/^\d{81}$/) != null){
      board = SudokuBoard.create(queryBoard);
    } else if(dailyDivExists()) {
      board = SudokuBoard.create(SudokuGenerator.fetch('2017-02-01'));
    }
    else{
      board = SudokuBoard.create();
    }
    var marks = SudokuPencilMarks.create(board);
    return {
      data: board,
      pencilMarks: marks,
      showMarks: false,
      hint: null,
      message: defaultMessage(board) };
  },
  cellChange: function(event){
    var chars = event.target.id.split("");
    var row = parseInt(chars[5]);
    var col = parseInt(chars[6]);
    var board = this.state.data;

    board.changeValue(row, col, parseInt(event.target.value));
    this.state.pencilMarks.adjust(board.values()[row][col] == 0);
    this.setState({ data: board, hint: null, message: defaultMessage(board) });
  },
  showPencilMarks: function(){
    this.setState({ showMarks: !this.state.showMarks});
  },
  showHint: function(event){
    event.target.blur();
    if(this.state.data.errors().type != null){
      this.setState({ hint: null, message: ""});
    }
    else{
      var hint = SudokuHints.create(this.state.data, this.state.pencilMarks).getNextHint();
      var message = hintMessage(hint);
      this.setState({ hint: hint, message: message});
    }
  },
  performHint: function(event){
    event.target.blur();
    var hint = this.state.hint;
    if(hint != null){
      var row = hint.cell[0][0];
      var col = hint.cell[0][1];
      var board = this.state.data;
      board.changeValue(row, col, hint.value);
      this.state.pencilMarks.adjust(false);
      this.setState({ data: board, hint: null, message: defaultMessage(board)});
    }
  },
  onPencilMarkClick: function(event){
    event.preventDefault();
    event.stopPropagation();
    var chars = $(event.target).parents(".marks").siblings("input").attr("id");
    var row = parseInt(chars[5]);
    var col = parseInt(chars[6]);
    var number = numClasses.indexOf(event.target.classList[1]);
    if(number > -1){
      var pencilMarks = this.state.pencilMarks;
      pencilMarks.remove(row, col, number);
      this.setState({ pencilMarks: pencilMarks});
    }
  },
  onLinkToThisClick: function(event){
    event.target.blur();
    var message = window.location.pathname;
    var board = this.state.data;
    message += "?board=" + board.toString();
    this.setState({ message: <a href={message} target="_blank">Copy This Link</a> });
  },
  onClearBoardClick: function(event){
    event.target.blur();
    var board = SudokuBoard.create();
    var marks = SudokuPencilMarks.create(board);
    $("#pencil_marks").attr('checked', false);
    this.setState({
      data: board,
      pencilMarks: marks,
      showMarks: false,
      hint: null,
      message: "" });
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
            hint={this.state.hint}
            onPencilMarkClick={this.onPencilMarkClick}
            onChange={this.cellChange}/>
      );
    }

    var hintButton;
    if(this.state.hint == null){
      hintButton = <input onClick={this.showHint} type="submit" value="Get Hint" />
    }
    else{
      hintButton = <input onClick={this.performHint} type="submit" value="Do Hint" />;
    }
    return (
      <div className="sudokuBox">
        <table>
          {rows}
        </table>
        <div className="sudokuControls">
          <div className="sudokuButtons">
            { hintButton }
            <input onClick={this.onLinkToThisClick} type="submit" value="Link To This Board" />
            <input onClick={this.onClearBoardClick} type="submit" value="Clear" />
          </div>
          <input onClick={this.showPencilMarks} type="checkbox" id="pencil_marks" />
          <label for="pencil_marks">Pencil Marks</label>
        </div>
        <div className="messageCenter">
          {this.state.message}
        </div>
      </div>
    );
  }
});

var DailyPuzzleMessage = React.createClass({
  getInitialState: function() {
    return { date: '2017-02-01' };
  },
  render: function() {
    return (
      <div>
      <h2>
        {this.state.date}
      </h2>
      <p>
      Here is the puzzle for today
      </p>
      </div>
    );
  }
});

React.render(
  <SudokuBox />,
  document.getElementById('sudoku-content')
);

if(dailyDivExists()) {
  React.render(
    <DailyPuzzleMessage />,
    document.getElementById('daily-puzzle-message')
  );
}
