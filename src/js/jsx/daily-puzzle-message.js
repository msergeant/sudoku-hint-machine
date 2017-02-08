var DailyPuzzleMessage = React.createClass({
  getInitialState: function() {
    return { dateString: getDateParameter() };
  },
  render: function() {
    function displayString(dateString) {
      const localized = new Date(dateString);
      localized.setTime(localized.getTime() + localized.getTimezoneOffset() * 60 * 1000);
      return localized.toLocaleDateString();
    }
    function getMessage(dateString) {
      const date = new Date(dateString);
      let message = '';

      if(date < new Date('1979-01-01')) {
        message = 'Sudoku did not even exist on this date, or if it did, it was ' +
        'not called Sudoku yet. We created a puzzle for you anyway. Be sure to ' +
        'come back every day for a new beginner level puzzle.';
      } else if(date < new Date('1989-01-01')) {
        message = 'Web pages did not even exist on this date, but we ' +
        'created a puzzle for you anyway. Be sure to come back every day for ' +
        'a new beginner level puzzle.';
      } else if(date < new Date('2017-02-01')) {
        message = 'This daily puzzle feature did not even exist on this date, but we ' +
        'created a puzzle for you anyway. Be sure to come back every day for ' +
        'a new beginner level puzzle.';
      } else {
        message = 'We post a new beginner sudoku puzzle here every day. We do it ' +
        ' every day, rain or shine, so be sure to come back ' +
        'tomorrow for another puzzle.';
      }

      return message;
    }
    function yesterDayLink(dateString) {
      const date = new Date(dateString);
      date.setTime(date.getTime() - 24 * 60 * 1000);
      const path = window.location.pathname;

      return path + "?date=" + date.toISOString().split('T')[0];
    }

    return (
      <div>
      <h2>
        { displayString(this.state.dateString) }
      </h2>
      <p>
        {getMessage(this.state.dateString)}
        <a href={ yesterDayLink(this.state.dateString) }>Yesterday's Puzzle</a>
      </p>
      </div>
    );
  }
});

