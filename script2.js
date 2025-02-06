const questions = [
    {
        question: "Kdo je rekel 'Mislim, torej sem'?",
        answers: [
            { text: "Plato", correct: false },
            { text: "René Descartes", correct: true },
            { text: "Socrates", correct: false },
            { text: "Aristotle", correct: false }
        ]
    },
    {
        question: "Kdo je napisal 'Republika'?",
        answers: [
            { text: "Aristotle", correct: false },
            { text: "Plato", correct: true },
            { text: "Nietzsche", correct: false },
            { text: "Kant", correct: false }
        ]
    },
    {
        question: "Kaj je osrednji koncept Nietzscejeve filozofije",
        answers: [
            { text: "Alegorija jame", correct: false },
            { text: "Utilitarianizem", correct: false },
            { text: "Nihilizem", correct: true },
            { text: "Absolutni idealizem", correct: false }
        ]
    },
    {
        question: "Kdo je imel idejo transcedentalnega idealizma",
        answers: [
            { text: "Immanuel Kant", correct: true },
            { text: "John Locke", correct: false },
            { text: "David Hume", correct: false },
            { text: "Thomas Hobbes", correct: false }
        ]
    },
    {
        question: "Kaj od naštetega spada med sokratske metode?",
        answers: [
            { text: "Predavanje", correct: false },
            { text: "Dialektiranje", correct: true },
            { text: "Spraševanje", correct: false },
            { text: "Meditiranje", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = 'Naslednje vprašanje';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        selectedButton.style.backgroundColor = '#28a745';
        score++;
    } else {
        selectedButton.style.backgroundColor = '#dc3545';
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.style.backgroundColor = '#28a745';
        }
    });

    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `Pridobil si ${score} točk od ${questions.length}!`;
    nextButton.innerText = 'Ponovno igraj';
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', startQuiz);
}

startQuiz();
