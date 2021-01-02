const usernameEl = document.querySelector('#username');
const saveScoreBtnEl = document.querySelector('#saveScoreBtn');
const finalScoreEl = document.querySelector('#finalScore');
const mostRecentScoreEl = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScoreEl.innerText = mostRecentScoreEl;

usernameEl.addEventListener('keyup', () => {
  saveScoreBtnEl.disabled = !usernameEl.value
});

var saveHighScore = function(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScoreEl,
    name: usernameEl.value,
  }

  highScores.push(score);

  highScores.sort((a,b) => {
    return b.score - a.score
  })

  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('../../highscores.html')
}