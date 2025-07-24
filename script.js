const questions = [

    {

        question: "How many lost and found item did we collect？",

        options: ["1000", "1500", "2000", "3000"],

        correctAnswer: 2 // 選項索引從 0 開始

    },

    {

        question: "哪一種語言是網頁開發中最常用的？",

        options: ["Python", "JavaScript", "C++", "Java"],

        correctAnswer: 1

    },

    {

        question: "誰是第一位登上月球的人？",

        options: ["尼爾·阿姆斯壯", "巴茲·奧爾德林", "尤里·加加林", "麥可·柯林斯"],

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

        // 如果是下一題，延遲 2 秒後顯示新問題

        setTimeout(() => {

            displayQuestion();

            resultText.textContent = ""; // 清除上一題的結果

        }, 2000);

    } else {

        // 如果是最後一題，延遲 2 秒後結束遊戲

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
 