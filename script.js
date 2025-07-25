const questions = [
    {
        question: "How many lost and found items did we collect？",
        options: ["1000", "1500", "2000", "3000"],
        correctAnswer: 2
    },
    {
        question: "Which item will donate to Cross Road？",
        options: ["Clothes", "Phones", "Computers", "Cash"],
        correctAnswer: 1
    },
    {
        question: "Which item will donate to Caritas？",
        options: ["Electronic items", "Clothes", "Water Flasks", "Food items"],
        correctAnswer: 0
    },
    // 新增問題
    {
        question: "What is the capital city of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka", "Hokkaido"],
        correctAnswer: 0
    },
    {
        question: "哪個動物被稱為“森林之王”？",
        options: ["老虎", "獅子", "大象", "豹子"],
        correctAnswer: 1
    },
    {
        question: "The Eiffel Tower is located in which city?",
        options: ["London", "Paris", "Berlin", "Rome"],
        correctAnswer: 1
    },
    {
        question: "哪個國家以薯條和巧克力聞名？",
        options: ["比利時", "法國", "瑞士", "荷蘭"],
        correctAnswer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

// 獲取 DOM 元素
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const resultText = document.getElementById("result-text");

// 顯示當前問題
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = ""; // 清空選項列表

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

// 檢查答案是否正確
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        resultText.textContent = "答對了！";
    } else {
        resultText.textContent = "答錯了！正確答案是：" + currentQuestion.options[currentQuestion.correctAnswer];
    }

    // 進入下一題
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // 下一題延遲 2 秒
        setTimeout(() => {
            displayQuestion();
            resultText.textContent = ""; // 清除結果
        }, 2000);
    } else {
        // 結束遊戲
        setTimeout(() => {
            endGame();
        }, 2000);
    }
}

// 遊戲結束
function endGame() {
    questionText.textContent = "遊戲結束！";
    optionsList.innerHTML = "";
    resultText.textContent = `你答對了 ${score} 題，共 ${questions.length} 題。`;
}

// 初始化遊戲
displayQuestion();
