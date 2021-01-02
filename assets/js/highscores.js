const highScoresListEl = document.querySelector('#highScoresList');
const highScoresEl = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresListEl.innerHTML = highScoresEl.map(score => {
  return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('');