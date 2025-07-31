const allQuestions = [ // Changed to allQuestions
    // Original 7 questions
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
        options: [
            "Donate the found items", 
            "Repaired the damaged bag", 
            "Promoting reuse and recycle", 
            "All of the above"
        ],
        correctAnswer: 3
    },
    {
        question: "How many boxes of clothing did we donate to Crossroad in our last donation?",
        options: ["about 10 boxes", "about 20 boxes", "about 30 boxes", "about 40 boxes"],
        correctAnswer: 2
    },
    {
        question: "What is the contact number of Lost and Found team?",
        options: ["27477777", "27477828", "27477838", "27472747"],
        correctAnswer: 2
    },
    // New 3 questions
    {
        question: "How long do we keep items before donating?",
        options: ["1 week", "2 weeks", "1 month", "3 months"],
        correctAnswer: 2
    },
    {
        question: "What percentage of donations go to landfill?",
        options: ["5%", "10%", "15%", "0%"],
        correctAnswer: 3
    },
    {
        question: "Which organization helps us recycle electronics?",
        options: ["Green Cross", "Caritas", "Redress", "WWF"],
        correctAnswer: 1
    }
];

let questions = []; // Will hold 5 random questions
let currentQuestionIndex = 0;
let score = 0;

// Randomly select 5 questions
function initializeQuiz() {
    // Shuffle array and pick first 5
    questions = allQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

// Modified displayQuestion
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = "";
    progressText.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.setAttribute("aria-label", `Option ${index + 1}: ${option}`);
        button.addEventListener("click", () => checkAnswer(index));
        li.appendChild(button);
        optionsList.appendChild(li);
    });
}

// Modified restart function
function endGame() {
    // ... (previous endGame code) ...
    
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Play Again";
    restartBtn.addEventListener("click", initializeQuiz); // Changed to use initializeQuiz
    optionsList.appendChild(restartBtn);
}

// Start the quiz
initializeQuiz(); // Changed from displayQuestion()
