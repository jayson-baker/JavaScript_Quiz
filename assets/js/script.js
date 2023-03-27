let beginGame = document.querySelector(".start-button");
let timerEl = document.querySelector(".timer");
let questionContent = document.querySelector(".question-content");
let questionCard = document.querySelector("#quiz-questions");
let enterInfo = document.querySelector("#enter-highscores");
let questionCount = 0;
var timeLeft = 75;
let timeInterval = null;
let questions = [
  {
    question: "Which of the following is NOT a commonly used datatype?",
    answers: ["numbers", "strings", "booleans"],
    correctAnswer: "confirms",
  },
  {
    question: "String values mush be enclosed in what?",
    answers: ["parentheses", "square brackets", "curly brackets"],
    correctAnswer: "quotes",
  },
  {
    question: "Inside of which HTML element do you put the JavaScript?",
    answers: ["<java>", "<js>", "<h1>"],
    correctAnswer: "<script>",
  },
  {
    question: "Which of these is NOT a loop?",
    answers: ["for/of", "do/while", "for/in"],
    correctAnswer: "if/else",
  },
  {
    question:
      "Using querySelector(), what is the correct way to select a class?",
    answers: [
      "querySelector('#myClass')",
      "querySelector('$myClass')",
      "querySelector('@myClass')",
    ],
    correctAnswer: "querySelector('.myClass')",
  },
];

beginGame.addEventListener("click", function () {
  beginGame.style.display = "none";
  document.querySelector(".question-box-header").style.display = "none";
  document
    .querySelectorAll("[id*='answer']")
    .forEach((button) => (button.style.display = "block"));
  startTimer();
  presentQuestion();
});

function eventListeners() {
  document.querySelectorAll("[id*='answer']").forEach((button) => {
    button.addEventListener("click", function () {
      checkCorrect(button.textContent);

      console.log("questionCount", questionCount);
      console.log("questions.length", questions.length);
      if (questionCount === questions.length - 1) {
        questionCard.style.display = "none";
        enterInfo.style.display = "flex";
        clearInterval(timeInterval);
        document.querySelector(
          "#final-score"
        ).textContent = `Your final score is ${timeLeft}.`;
        questionCount = 0;
        timerEl.textContent = `Time Left: ${timeLeft} seconds`;
        return;
      } else {
        questionCount++;
        presentQuestion();
      }
    });
  });
}

function startTimer() {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = `Time Left: ${timeLeft} seconds`;
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = `Time Left: ${timeLeft} second`;
      timeLeft--;
    } else {
      timerEl.textContent = "Out of Time!";
      clearInterval(timeInterval);
      // If timer hit zero the quiz needs to end
    }
  }, 1000);
}

function presentQuestion() {
  questionContent.textContent = questions[questionCount].question;
  let buttonText = questions[questionCount].answers.concat(
    questions[questionCount].correctAnswer
  );
  buttonText.sort(() => Math.random() - 0.5);

  for (i = 0; i < 4; i++) {
    let buttonChange = document.querySelector(`#answer-${i + 1}`);
    buttonChange.textContent = `${i + 1}. ${buttonText[i]}`;
  }
}

function checkCorrect(ansr) {
  let formatAnsr = ansr.split(". ");
  let correctAnswer = questions[questionCount].correctAnswer;
  if (formatAnsr[1] === correctAnswer) {
    document.querySelector(".correct-wrong").textContent = "CORRECT!";
  } else {
    document.querySelector(".correct-wrong").textContent = "WRONG!";
    timeLeft -= 12;
  }
}

eventListeners();
