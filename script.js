const allQuestions = [
    // Original questions
    {
        question: "How many lost and found items did we collect this year?",
        options: ["about 1000", "about 1500", "about 2000", "about 3000"],
        correctAnswer: 2
    },
    // ... (include all your questions array content here) ...
    {
        question: "Which organization helps us recycle electronics?",
        options: ["Green Cross", "Caritas", "Redress", "WWF"],
        correctAnswer: 1
    }
];

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const resultText = document.getElementById("result-text");
const progressText = document.getElementById("progress");

function initializeQuiz() {
    questions = allQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = "";
    progressText.textContent = `問題 ${currentQuestionIndex + 1}/${questions.length}`;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.setAttribute("aria-label", `選項 ${index + 1}: ${option}`);
        button.addEventListener("click", () => checkAnswer(index));
        li.appendChild(button);
        optionsList.appendChild(li);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option-btn");
    
    buttons.forEach(button => {
        button.disabled = true;
        button.style.transition = "background-color 0.3s";
    });

    const selectedButton = buttons[selectedIndex];
    const correctButton = buttons[currentQuestion.correctAnswer];

    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        selectedButton.classList.add("correct");
        resultText.textContent = "答對了！🎉";
    } else {
        selectedButton.classList.add("incorrect");
        correctButton.classList.add("correct");
        resultText.textContent = `答錯了！正確答案是：${currentQuestion.options[currentQuestion.correctAnswer]}`;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            buttons.forEach(button => {
                button.classList.remove("correct", "incorrect");
                button.disabled = false;
            });
            displayQuestion();
            resultText.textContent = "";
        }, 2000);
    } else {
        setTimeout(endGame, 2000);
    }
}

function endGame() {
    const percentage = ((score / questions.length) * 100).toFixed(2);
    questionText.textContent = "遊戲結束！";
    optionsList.innerHTML = "";
    progressText.textContent = "";

    resultText.textContent = `答對 ${score} 題，共 ${questions.length} 題 (${percentage}%)`;
    resultText.style.cssText = "font-size: 1.4rem; font-weight: bold;";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "再玩一次";
    restartBtn.classList.add("option-btn");
    restartBtn.style.marginTop = "20px";
    restartBtn.addEventListener("click", initializeQuiz);
    optionsList.appendChild(restartBtn);
}

// Start the quiz
initializeQuiz();
