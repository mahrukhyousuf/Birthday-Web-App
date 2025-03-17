// Trivia Questions
const questions = [
    {
        question: "What is Friends favorite color?",
        answers: ["Red", "Blue", "Pink", "Yellow"],
        correct: 1
    },
    {
        question: "What's Friends Favorite Chocolate?",
        answers: ["Bounty", "Snickers", "Kitkat", "Mars"],
        correct: 2
    },
    {
        question: "What is Friends favorite food?",
        answers: ["Pizza", "Biryani", "Karahi", "Pakoray"],
        correct: 2
    },
    {
        question: "Who is Friends favorite human?",
        answers: ["A", "B", "C", "D"],
        correct: 1
    },
    {
        question: "Is Friend An AMAZING Person?",
        answers: ["Yes"],
        correct: 0
    },
    {
        question: "Will Friend compliment me <3",
        answers: ["Ew Never", "Ofcourse shes amazing"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Load background music
const song = new Audio('assets/birthdaysong.mp3');
if (localStorage.getItem('musicPlaying')) {
    song.play();
    song.loop = true;
}

// Sounds for right and wrong answers
const correctBuzzer = new Audio('assets/correctbuzzer.MP3');
const wrongBuzzer = new Audio('assets/wrongbuzzer.mp3');

// Make sure they are preloaded
correctBuzzer.preload = 'auto';
wrongBuzzer.preload = 'auto';

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerText = q.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });

    document.getElementById('score').innerText = `Score: ${score}`;
}

function checkAnswer(selected) {
    // Disable all buttons to prevent multiple answers
    const buttons = document.querySelectorAll('#answers button');
    buttons.forEach(btn => btn.disabled = true);

    if (selected === questions[currentQuestion].correct) {
        correctBuzzer.play().catch(e => console.log("Audio play prevented:", e));
        buttons[selected].style.background = '#00cc00'; // Green for correct
        score += 10;
    } else {
        wrongBuzzer.play().catch(e => console.log("Audio play prevented:", e));
        buttons[selected].style.background = '#ff0000'; // Red for wrong
        // Highlight the correct answer
        buttons[questions[currentQuestion].correct].style.background = '#00cc00';
    }

    document.getElementById('score').innerText = `Score: ${score}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        alert(`Game Over! Your Score: ${score}`);
        window.location.href = 'gift.html';
    }
}



window.onload = loadQuestion;

