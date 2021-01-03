const usernameEl = document.querySelector('#username');
const saveScoreBtnEl = document.querySelector('#saveScoreBtn');
const finalScoreEl = document.querySelector('#finalScore');
const mostRecentScoreEl = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScoreEl.innerText = mostRecentScoreEl;

// require at least one keystroke in input field to enable save button
usernameEl.addEventListener('keyup', () => {
  saveScoreBtnEl.disabled = !usernameEl.value
});

// compare previous high scores with current score
var saveHighScore = function(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScoreEl,
    name: usernameEl.value,
  }

  // add current score to high scores array and sort from high to low
  highScores.push(score);

  highScores.sort((a,b) => {
    return b.score - a.score
  })

  // reduce high score array to 5 highest scores
  highScores.splice(5);

  // save high scores to local storage and open high score screen
  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('../../highscores.html')
}