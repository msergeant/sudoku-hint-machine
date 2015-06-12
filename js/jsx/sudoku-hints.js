var SudokuCell = React.createClass({
  render: function(){
    return(
      <td>
       <input id={this.props.cellId} value={this.props.cellValue} onChange={this.props.onChange}/>
      </td>
    );
  }
});

var SudokuRow = React.createClass({
  render: function(){
    var row = this.props.rowIndex;
    var onChange = this.props.onChange;
    var values = this.props.rowData.map(function(value, column){
      return(
        <SudokuCell cellValue={ value } cellId={"cell-" + row + column} onChange={onChange}/>
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
