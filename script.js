const originalQuestions = [
    {
        question: "How many lost and found items did we collect this year?",
        options: ["about 1000", "about 1500", "about 2000", "about 3000"],
        correctAnswer: 2
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
        question: "How many Airpods are there in the box?",
        options: ["about 200", "about 300", "about 400", "about 500"],
        correctAnswer: 2
    },
    {
        question: "How lost and found team help with group sustainability?",
        options: ["Donate found items", "Repair bags", "Promote reuse", "All"],
        correctAnswer: 3
    },
    {
        question: "How many clothing boxes donated to Crossroad?",
        options: ["about 10 boxes", "about 20 boxes", "about 30 boxes", "about 40 boxes"],
        correctAnswer: 2
    },
    {
        question: "What is the contact number of Lost and Found team?",
        options: ["27477777", "27477828", "27477838", "27472747"],
        correctAnswer: 2
    }
];

const additionalQuestions = [
    {
        question: "What happens to unclaimed books?",
        options: ["Recycled", "Donated to schools", "Stored forever", "Sold"],
        correctAnswer: 1
    },
    {
        question: "Which partner handles electronics recycling?",
        options: ["Greeners", "Caritas", "Redress", "WWF"],
        correctAnswer: 1
    },
    {
        question: "Percentage of items donated instead of trashed?",
        options: ["50%", "75%", "85%", "95%"],
        correctAnswer: 2
    },
    {
        question: "How are fragile items handled?",
        options: ["Special storage", "Immediate donation", "Discarded", "Auctioned"],
        correctAnswer: 0
    },
    {
        question: "Which items are NOT accepted?",
        options: ["Perishable food", "Clothes", "Electronics", "Documents"],
        correctAnswer: 0
    },
    {
        question: "Storage time before donation?",
        options: ["1 week", "2 weeks", "1 month", "3 months"],
        correctAnswer: 2
    },
    {
        question: "Annual CO2 reduction from donations?",
        options: ["5 tons", "8 tons", "12 tons", "15 tons"],
        correctAnswer: 3
    },
    {
        question: "Where to report lost items?",
        options: ["Front desk", "Online form", "Email", "All above"],
        correctAnswer: 3
    },
    {
        question: "Volunteer opportunities available?",
        options: ["Weekly", "Monthly", "Seasonal", "All year"],
        correctAnswer: 3
    },
    {
        question: "Which items get refurbished?",
        options: ["Laptops", "Clothes", "Books", "All"],
        correctAnswer: 0
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
