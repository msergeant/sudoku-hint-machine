var SudokuBox = React.createClass({
  getInitialState: function() {
    var queryBoard = getParameterByName("board");
    var board;

    if(queryBoard.match(/^\d{81}$/) != null){
      board = SudokuBoard.create(queryBoard);
    } else if(dailyDivExists()) {
      board = SudokuBoard.create(SudokuGenerator.fetch(getDateParameter()));
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
