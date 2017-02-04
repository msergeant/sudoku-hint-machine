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
