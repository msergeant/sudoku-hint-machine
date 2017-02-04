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


