var DailyPuzzleMessage = React.createClass({
  getInitialState: function() {
    return { date: getDateParameter() };
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
