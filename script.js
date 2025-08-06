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
        question: "What kind of chartity activity will HK Children and Youth Service partnering with us ?",
        options: ["Flag days", "TV fundraising", "Charity sale", "Walk for Millions"],
        correctAnswer: 2
    },
    {
        question: "Which item will be disposed if it is unclaimed for 24hrs?",
        options: [" Fresh food", "Water bottle", "HKID/Passport", "Documents"],
        correctAnswer: 0
    },
    {
        question: "Clothing item Storage time before donation?",
        options: ["10 days", "30 days", "60 days", "90 days"],
        correctAnswer: 3
    },
    {
        question: "Which charity will handle our household product donation?",
        options: ["Caritas Computer Workhshop", "Crossroad Foundation", "Salvation Army", "Caritas Second Hand Recycling Shop"],
        correctAnswer: 3
    },
    {
        question: "How many hosehold items did we donate to the charity in our last donation?",
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

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const resultText = document.getElementById("result-text");
const progressText = document.getElementById("progress");

function initializeQuiz() {
    // Ensure at least 1 original question
    const originalQ = originalQuestions[Math.floor(Math.random() * originalQuestions.length)];
    
    // Get 4 other random questions (excluding selected original)
    const pool = [...originalQuestions, ...additionalQuestions].filter(q => q !== originalQ);
    const otherQs = shuffleArray(pool).slice(0, 4);
    
    // Combine and shuffle final questions
    questions = shuffleArray([originalQ, ...otherQs]);
    
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
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
    questionText.textContent = "Game End！";
    optionsList.innerHTML = "";
    progressText.textContent = "";

    resultText.textContent = `答對 ${score} 題，共 ${questions.length} 題 (${percentage}%)`;
    resultText.style.cssText = "font-size: 1.4rem; font-weight: bold;";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.classList.add("option-btn");
    restartBtn.style.marginTop = "20px";
    restartBtn.addEventListener("click", initializeQuiz);
    optionsList.appendChild(restartBtn);
}

// Start the quiz
initializeQuiz();






