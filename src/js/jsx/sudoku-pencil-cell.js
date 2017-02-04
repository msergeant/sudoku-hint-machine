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


