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

function getDateParameter() {
  var dateString = getParameterByName('date');

  if(dateString) {
    var date = new Date(dateString);
    if(date != 'Invalid Date' && !isInTheFuture(date)) {
      return shortDateString(date);
    }
  }

  return shortDateString(new Date());
}

function shortDateString(date) {
  return date.toISOString().split('T')[0];
}

function dailyDivExists() {
  return Boolean(document.getElementById('daily-puzzle-message'));
}

function defaultMessage(board) {
  return board.isSolved() ? "You solved it!" : "";
}

function isInTheFuture(date) {
  return date > new Date;
}
