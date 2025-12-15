// ===== QUIZ DATA =====
const originalQuestions = [
    {
        question: "Which type of item will donate to Cross Road?",
        options: ["Clothes", "Phones", "Computers", "Cash"],
        correctAnswer: 0
    },
    {
        question: "Which type of item will donate to Caritas Computer Workshop?",
        options: ["Electronic items", "Clothes", "Water Flasks", "Food items"],
        correctAnswer: 0
    },
    {
        question: "How lost and found team help with group sustainability?",
        options: ["Donate found items", "Repair bags", "Promote reuse", "All"],
        correctAnswer: 3
    },
    {
        question: "About how many clothing boxes donated to Crossroad in the last donation?",
        options: ["10 boxes", "20 boxes", "30 boxes", "40 boxes"],
        correctAnswer: 2
    },
    {
        question: "About how many neckpillows are there in our booth?",
        options: ["30", "40", "50", "60"],
        correctAnswer: 2
    }
];

const additionalQuestions = [
    {
        question: "Which charity organization will we be partnering with for the charity sale?",
        options: ["Redcross", "HK Children & Youth Services", "UNICEF", "WWF"],
        correctAnswer: 1
    },
    {
        question: "What kind of chartity activity will HK Children and Youth Service partnering with us?",
        options: ["Flag days", "TV fundraising", "Charity sale", "Walk for Millions"],
        correctAnswer: 2
    },
    {
        question: "Which item will be disposed if it is unclaimed for 24hrs?",
        options: ["Fresh food", "Water bottle", "HKID/Passport", "Documents"],
        correctAnswer: 0
    },
    {
        question: "Clothing item Storage time before donation?",
        options: ["10 days", "30 days", "60 days", "90 days"],
        correctAnswer: 3
    },
    {
        question: "Which charity will handle our household product donation?",
        options: ["Caritas Computer Workshop", "Crossroad Foundation", "Salvation Army", "Caritas Second Hand Recycling Shop"],
        correctAnswer: 3
    },
    {
        question: "How many household items did we donate to the charity in our last donation?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 3
    },
    {
        question: "Most unusual item ever found?",
        options: ["Walking Sticks", "Musical Instrument", "Sim Card", "Denture"],
        correctAnswer: 3
    },
];

// ===== QUIZ STATE =====
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false; // Prevent multiple submissions

// ===== DOM ELEMENTS =====
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const resultText = document.getElementById("result-text");
const progressText = document.getElementById("progress");

// ===== UTILITY FUNCTIONS =====

/**
 * Fisher-Yates shuffle algorithm for better randomization
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy to avoid mutating original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Validates that required DOM elements exist
 * @returns {boolean} - True if all elements exist
 */
function validateDOMElements() {
    if (!questionText || !optionsList || !resultText || !progressText) {
        console.error("Missing required DOM elements. Please ensure your HTML has:");
        console.error("- <div id='question-text'></div>");
        console.error("- <ul id='options-list'></ul>");
        console.error("- <div id='result-text'></div>");
        console.error("- <div id='progress'></div>");
        return false;
    }
    return true;
}

// ===== QUIZ FUNCTIONS =====

/**
 * Initialize quiz with 4 random questions (2 original + 2 additional)
 */
function initializeQuiz() {
    // Validate DOM elements
    if (!validateDOMElements()) {
        return;
    }

    // Select 1 random original question
    const originalQ = originalQuestions[
        Math.floor(Math.random() * originalQuestions.length)
    ];

    // Create pool excluding the selected original question
    const pool = [...originalQuestions, ...additionalQuestions].filter(
        (q) => q !== originalQ
    );

    // Get 4 random questions from pool
    const otherQs = shuffleArray(pool).slice(0, 4);

    // Combine and shuffle final 4 questions
    questions = shuffleArray([originalQ, ...otherQs]);

    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;

    // Reset UI
    document.body.style.backgroundColor = "";
    resultText.textContent = "";

    displayQuestion();
}

/**
 * Display current question and options
 */
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = "";
    progressText.textContent = `問題 ${currentQuestionIndex + 1}/${questions.length}`;
    resultText.textContent = "";
    isAnswered = false;

    // Create option buttons
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => checkAnswer(index, button));
        li.appendChild(button);
        optionsList.appendChild(li);
    });
}

/**
 * Check if answer is correct and provide feedback
 * @param {number} selectedIndex - Index of selected option
 * @param {HTMLElement} selectedButton - The clicked button element
 */
function checkAnswer(selectedIndex, selectedButton) {
    // Prevent multiple submissions
    if (isAnswered) {
        return;
    }

    isAnswered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option-btn");

    // Disable all buttons
    buttons.forEach((btn) => {
        btn.disabled = true;
    });

    const correctButton = buttons[currentQuestion.correctAnswer];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    // Visual feedback
    if (isCorrect) {
        score++;
        selectedButton.classList.add("correct");
        resultText.textContent = "✓ 答對了！🎉";
        resultText.style.color = "#27ae60";
    } else {
        selectedButton.classList.add("incorrect");
        correctButton.classList.add("correct");
        resultText.textContent = `✗ 答錯了！正確答案是：${currentQuestion.options[currentQuestion.correctAnswer]}`;
        resultText.style.color = "#e74c3c";
    }

    // Move to next question after delay
    currentQuestionIndex++;
    setTimeout(() => {
        buttons.forEach((btn) => {
            btn.classList.remove("correct", "incorrect");
        });
        displayQuestion();
    }, 1500); // Reduced from 2000ms for better UX
}

/**
 * Display final results and restart button
 */
function endGame() {
    const percentage = ((score / questions.length) * 100).toFixed(2);

    // Clear previous content
    questionText.textContent = "";
    optionsList.innerHTML = "";
    progressText.textContent = "";
    resultText.textContent = "";

    // Create results display
    const dayTitle = document.createElement("h2");
    dayTitle.textContent = "Result";
    dayTitle.style.cssText =
        "color: #2d572c; font-size: 2.5rem; margin-bottom: 20px; font-weight: bold;";

    const scoreDisplay = document.createElement("div");
    scoreDisplay.innerHTML = `
        <p style="font-size: 1.8rem; margin: 15px 0; font-weight: bold;">
            答對 <span style="color: #27ae60;">${score}</span> 題，共 <span style="color: #2d572c;">${questions.length}</span> 題
        </p>
        <p style="font-size: 2rem; margin: 15px 0; font-weight: bold; color: #3498db;">
            ${percentage}%
        </p>
    `;

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.classList.add("option-btn");
    restartBtn.style.cssText =
        "margin-top: 30px; font-size: 1.2rem; padding: 12px 30px; cursor: pointer;";
    restartBtn.addEventListener("click", initializeQuiz);

    // Append to options list (or create container if needed)
    optionsList.appendChild(dayTitle);
    optionsList.appendChild(scoreDisplay);
    optionsList.appendChild(restartBtn);

    // Change background color
    document.body.style.backgroundColor = "#e6f7ff";
}

// ===== START QUIZ =====
initializeQuiz();

