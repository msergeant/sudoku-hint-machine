var SudokuCell = React.createClass({
  render: function(){
    return(
      <td>
        {this.props.cellValue}
      </td>
    );
  }
});

var SudokuRow = React.createClass({
  render: function(){
    var values = this.props.rowData.map(function(value){
      return(
        <SudokuCell cellValue={ value }/>
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
    return { data: board.values() };
  },
  render: function() {
    var rows = [];
    for(i = 0; i < 9; i++){
      rows.push(
        <SudokuRow rowIndex={i} rowData={this.state.data[i]}/>
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
