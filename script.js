const questions = [{
        question: " What is the boiling point of water at sea level?",
        options: ["90°C", "100°C", "110°C", "120°C"],

        answer: "100°C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What gas do plants absorb from the atmosphere during photosynthesis?",
        options: ["Oxygen", " Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        question: "Which part of the human body is responsible for pumping blood?",
        options: ["Brain", "Kidney", "Lungs", "Heart"],
        answer: "Heart"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["HO", "H2O", "OH2", "HO2"],
        answer: "H2O"
    },

    {
        question: "What is the center of an atom called?",
        options: ["Neutron", "Electron", "Proton", "Nucleus"],
        answer: "Nucleus"
    },

    {
        question: "Which of these is not a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Energy"],
        answer: "Energy"
    },

    {
        question: " What is the largest organ in the human body?",
        options: ["Braim", "Skin", "Liver", "Heart"],
        answer: "Skin"
    },


];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionCount = document.getElementById('question-count');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const quitBtn = document.getElementById('quit-btn');
const retryBtn = document.getElementById('retry-btn');
const resultContainer = document.querySelector('.result-container');
const quizContainer = document.querySelector('.quiz-container');
const scoreSummary = document.getElementById('score-summary');
const timerEl = document.getElementById('timer');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

function showQuestion() {
    resetState();
    startTimer();
    let q = questions[currentQuestion];
    questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionEl.textContent = q.question;
    q.options.forEach(opt => {
        const li = document.createElement('li');
        li.textContent = opt;
        li.onclick = () => selectAnswer(li, q.answer);
        answersEl.appendChild(li);
    });
}

function resetState() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    answersEl.innerHTML = '';
    nextBtn.disabled = true;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            skipQuestion();
        }
    }, 1000);
}

function selectAnswer(selected, correctAnswer) {
    clearInterval(timer);
    const allOptions = document.querySelectorAll('li');
    allOptions.forEach(opt => {
        opt.onclick = null;
        if (opt.textContent === correctAnswer) {
            opt.classList.add('correct');
        } else if (opt === selected) {
            opt.classList.add('incorrect');
        }
    });
    if (selected.textContent === correctAnswer) score++;
    nextBtn.disabled = false;
}

function skipQuestion() {
    const correctAnswer = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll('li');
    allOptions.forEach(opt => {
        opt.onclick = null;
        if (opt.textContent === correctAnswer) {
            opt.classList.add('correct');
        }
    });
    nextBtn.disabled = false;
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

quitBtn.onclick = showResult;
retryBtn.onclick = startQuiz;

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    const percentage = Math.round((score / questions.length) * 100);
    scoreSummary.textContent = `You got ${score} out of ${questions.length} (${percentage}%) correct!`;
}

startQuiz();