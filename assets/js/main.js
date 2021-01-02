const questionEl = document.querySelector('#question');
const choicesEl = Array.from(document.querySelectorAll('.choice-text'));
const progressTextEl = document.querySelector('#progress-text');
const scoreTextEl = document.querySelector('#score');
const progressBarFullEl = document.querySelector('#progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let question = [
	{
		question: "What is 2 + 2?",
		choice1: "2",
		choice2: "4",
		choice3: "21",
		choice4: "17",
		answer: 2,
	}
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// },
	// {
	// 	question: "What is 2 + 2?",
	// 	choice1: "2",
	// 	choice2: "4",
	// 	choice3: "21",
	// 	choice4: "17",
	// 	answer: 2,
	// }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

var startGame = function() {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...question];
	getNewQuestion();
};

var getNewQuestion = function() {
	if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('../../end-game.html');
	}

	questionCounter++;
	progressTextEl.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFullEl.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	questionEl.innerText = currentQuestion.question;

	choicesEl.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestions.splice(questionsIndex, 1);

	acceptingAnswers = true;
};

choicesEl.forEach(choice => {
	choice.addEventListener('click', e => {
		if(!acceptingAnswers) return
		
		acceptingAnswers = false
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number']

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if(classToApply === 'correct') {
			incrementScore(SCORE_POINTS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000)
	})
})

var incrementScore = function(num) {
	score += num;
	scoreTextEl.innerText = score;
}

startGame();