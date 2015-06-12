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

var SudokuRow = React.createClass({
  findCellClass: function(row, col){
    var retClass = "cell";
    if(col == 2 || col == 5){
      retClass += " rt";
    }
    if(row == 2 || row == 5){
      retClass += " btm";
    }

    return retClass;
  },
  render: function(){
    var row = this.props.rowIndex;
    var onChange = this.props.onChange;
    var findClass = this.findCellClass;
    var values = this.props.rowData.map(function(value, column){
      var cell = value > 0 ? value : "";
      return(
        <SudokuCell cellValue={ cell } cellId={"cell-" + row + column} onChange={onChange} cellClassName={findClass(row, column)}/>
      );
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
    var board = SudokuBoard.create("000000000000000000123456789000000000050000500000000000000000000000000000000000000");
    return { data: board };
  },
  cellChange: function(event){
    var chars = event.target.id.split("");
    var row = parseInt(chars[5]);
    var col = parseInt(chars[6]);
    var board = this.state.data;

    board.changeValue(row, col, parseInt(event.target.value));
    this.setState({ data: board });
  },
  render: function() {
    var rows = [];
    for(i = 0; i < 9; i++){
      rows.push(
        <SudokuRow rowIndex={i} rowData={this.state.data.values()[i]} onChange={this.cellChange}/>
      );
    }
    return (
      <div className="sudokuBox">
        <table>
          {rows}
        </table>
      </div>
    );
  }
});


React.render(
  <SudokuBox />,
  document.getElementById('content')
);
