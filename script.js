// ===== QUIZ DATA =====
const originalQuestions = [
    {
        question: "About how many lost and found items did we collect from Jan25-Jun25?",
        options: ["5000", "10000", "15000", "20000"],
        correctAnswer: 1
    },
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
        question: "About how many Airpods are there in our booth?",
        options: ["200", "300", "400", "500"],
        correctAnswer: 3
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
        question: "How will the cash be handled during the event?",
        options: ["Donate to UNICEF", "Buy Charity Raffle", "Invest in Charity Foundation", "Disposed"],
        correctAnswer: 0
    },
    {
        question: "What is the weight of the electronic item box?",
        options: ["50kg+", "80kg+", "100kg+", "120kg+"],
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
    {
        question: "How many days does the Cathay Roadshow last?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1
    }
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

function shuffleArray(array) {
    const shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function validateDOMElements() {
    if (!questionText || !optionsList || !resultText || !progressText) {
        console.error("Missing required DOM elements.");
        return false;
    }
    return true;
}

// ===== QUIZ FUNCTIONS =====

function initializeQuiz() {
    if (!validateDOMElements()) return;

    // 1. Select 1 random original question
    const originalQ = originalQuestions[
        Math.floor(Math.random() * originalQuestions.length)
    ];

    // 2. Create pool from remaining questions (all additional + remaining original)
    // We filter out the selected 'originalQ' to avoid duplicates
    const remainingOriginals = originalQuestions.filter(q => q !== originalQ);
    const pool = [...remainingOriginals, ...additionalQuestions];

    // 3. Get exactly 3 random questions from the pool
    const otherQs = shuffleArray(pool).slice(0, 3);

    // 4. Combine: 1 Original + 3 Others = 4 Questions Total
    questions = shuffleArray([originalQ, ...otherQs]);

    // Safety: Force to 4 if something goes wrong (should never happen)
    if (questions.length !== 4) {
        questions = questions.slice(0, 4);
    }

    // DEBUG: Log the total number of questions (check your console!)
    console.log("Total questions generated: " + questions.length);
    console.log("Questions:", questions); // Optional: Logs full questions for verification

    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;

    // Reset UI
    document.body.style.backgroundColor = "";
    resultText.textContent = "";

    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = "";
    
    // Update progress text
    progressText.textContent = `問題 ${currentQuestionIndex + 1}/${questions.length}`;
    
    resultText.textContent = "";
    isAnswered = false;

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

function checkAnswer(selectedIndex, selectedButton) {
    if (isAnswered) return;
    isAnswered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn) => btn.disabled = true);

    const correctButton = buttons[currentQuestion.correctAnswer];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

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

    currentQuestionIndex++;
    setTimeout(() => {
        buttons.forEach((btn) => btn.classList.remove("correct", "incorrect"));
        displayQuestion();
    }, 1500); 
}

function endGame() {
    const percentage = ((score / questions.length) * 100).toFixed(0);

    questionText.textContent = "";
    optionsList.innerHTML = "";
    progressText.textContent = "";
    resultText.textContent = "";

    const titleElement = document.createElement("h2");
    titleElement.textContent = "Lost & Found Sustainability Roadshow"; 
    titleElement.style.cssText =
        "color: #2d572c; font-size: 2.2rem; margin-bottom: 20px; font-weight: bold; line-height: 1.3;";

    const scoreDisplay = document.createElement("div");
    scoreDisplay.innerHTML = `
        <p style="font-size: 1.5rem; margin: 15px 0; color: #555;">
            Game Over!
        </p>
        <p style="font-size: 1.8rem; margin: 15px 0; font-weight: bold;">
            答對 <span style="color: #27ae60;">${score}</span> 題，共 <span style="color: #2d572c;">${questions.length}</span> 題
        </p>
        <p style="font-size: 2.5rem; margin: 20px 0; font-weight: bold; color: #3498db;">
            ${percentage}%
        </p>
    `;

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "再玩一次";
    restartBtn.classList.add("option-btn");
    restartBtn.style.cssText =
        "margin-top: 30px; font-size: 1.2rem; padding: 12px 30px; cursor: pointer;";
    restartBtn.addEventListener("click", initializeQuiz);

    optionsList.appendChild(titleElement);
    optionsList.appendChild(scoreDisplay);
    optionsList.appendChild(restartBtn);

    document.body.style.backgroundColor = "#e6f7ff";
}

// ===== START QUIZ =====
initializeQuiz();
