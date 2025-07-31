const questions = [
    {
        question: "How many lost and found items did we collect this year？",
        options: ["about 1000", "about 1500", "about 2000", "about 3000"],
        correctAnswer: 2
    },
    {
        question: "Which type of item will donate to Cross Road？",
        options: ["Clothes", "Phones", "Computers", "Cash"],
        correctAnswer: 0
    },
    {
        question: "Which type of item will donate to Caritas Computer Workshop？",
        options: ["Electronic items", "Clothes", "Water Flasks", "Food items"],
        correctAnswer: 0
    },
    {
        question: "How many Airpods are there in the box?",
        options: ["about 200", "about 300", "about 400", "about 500"],
        correctAnswer: 2
    },
    {
        question: "How lost and found team help with group sustainability”？",
        options: ["Donate the found items", "Repaired the damaged bag", "Promoting resuse and recycle", "All of the above"],
        correctAnswer: 3
    },
    {
        question: "How many boxes of clothing did we donate to Crossroad in our last donation?",
        options: ["about 10boxes ", "about 20boxes", "about 30boxes", "about 40boxes"],
        correctAnswer: 2
    },
    {
        question: "What is the contact number of Lost and Found team？",
        options: ["27477777", "27477828", "27477838", "27472747"],
        correctAnswer: 2
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
  const correctRatio = score / questions.length;
  const percentage = (correctRatio * 100).toFixed(2); // 保留兩位小數

  // 更新問題內容和結果文字
  document.getElementById("question-text").textContent = "Game Over!";
  document.getElementById("options-list").innerHTML = "";

  // 顯示結果，放大字體
  const resultElement = document.getElementById("result-text");
  resultElement.textContent = `You answered ${score} out of ${questions.length} questions correctly (${percentage}%).`;
  resultElement.style.fontSize = "24px"; // 放大字體
  resultElement.style.fontWeight = "bold"; // 加粗
}
// 初始化遊戲
displayQuestion();
