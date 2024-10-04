const loginSection = document.querySelector(".login");
const loginForm = document.querySelector(".loginForm");
const questionText = document.querySelector(".question-text");
const answerBox = document.querySelector(".answer-box");

class Main {
  constructor(login, loginForm) {
    this.login = login;
    this.loginForm = loginForm;
    this.userName = "";
    this.question = "";
    this.questionNum = 0;
    this.currentQuestion = "";
    this.userAnswerIsTrueOrNot = false;
    this.userStats = {
      true: 0,
      false: 0,
    };
    this.timerCount = 30;
    this.interval = null;
    this.addEventListener();
  }
  addEventListener() {
    this.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.userName = e.target.username.value;
      this.login.remove();
      this.getData();
    });
  }
  async getData() {
    const URL = "https://rezaderakhshan-quizapp.liara.run/";
    const response = await axios(URL);
    this.question = response.data;
    this.showQuestion();
  }
  timer() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    document.querySelector(".countdown").textContent = this.timerCount;

    this.interval = setInterval(() => {
      this.timerCount -= 1;
      document.querySelector(".countdown").textContent = this.timerCount;

      if (this.timerCount === 0) {
        clearInterval(this.interval);
        this.userStats.false += 1;
        this.questionNum += 1;
        this.showQuestion();
      }
    }, 1000);
  }
  showQuestion() {
    this.timerCount = 30;
    answerBox.innerHTML = "";
    if (this.questionNum >= this.question.length) {
      questionText.innerText = `
      All questions completed!
      Correct answer : ${this.userStats.true}
      Incorrect answer : ${this.userStats.false}
      `;
      document.querySelector(".submit-btn").style.display = "none";
      const playAgain = document.createElement("button");
      playAgain.classList.add(
        "text-center",
        "w-[400px]",
        "p-3",
        "rounded-2xl",
        "text-primary",
        "bg-[#004643]"
      );
      playAgain.addEventListener("click", () => {
        window.location.reload();
      });
      playAgain.textContent = "Play Again";
      answerBox.appendChild(playAgain);
      document.querySelector(".timer").remove();
      document.querySelector(".question-box").classList.remove("p-10");
      document.querySelector(".question-box").classList.add("text-center");
      return;
    }
    const selectedQuestion = this.question[this.questionNum];
    this.currentQuestion = selectedQuestion;
    questionText.innerText = selectedQuestion.text;
    selectedQuestion.answers.forEach((element) => {
      const answer = document.createElement("div");
      answer.classList.add(
        "answer",
        "w-[400px]",
        "bg-white",
        "p-3",
        "rounded-2xl",
        "flex",
        "justify-between",
        "cursor-pointer"
      );
      answer.innerHTML = `${element.title}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9.5" stroke="black" />
            </svg>`;
      answerBox.appendChild(answer);
    });
    this.timer();
    this.questionCounter();
    this.changeAnswerStatus();
  }
  questionCounter() {
    document.querySelector(".question-counter").textContent = `${
      this.questionNum + 1
    }/${this.question.length}`;
  }
  changeAnswerStatus() {
    answerBox.addEventListener("click", (e) => {
      const selectedAnswer = e.target.closest(".answer");
      if (!selectedAnswer) return;

      document.querySelector(".submit-btn").disabled = false;
      const answerButton = document.querySelectorAll(".answer");

      answerButton.forEach((element) => {
        element.classList.remove("bg-[#ABD1C6]");
        element.classList.add("bg-white");
        element.querySelector(
          "svg"
        ).innerHTML = `<circle cx="10" cy="10" r="9.5" stroke="black" />`;
      });

      selectedAnswer.classList.remove("bg-white");
      selectedAnswer.classList.add("bg-[#ABD1C6]");
      selectedAnswer.querySelector(
        "svg"
      ).innerHTML = `<circle cx="11" cy="11" r="10" fill="#004643"/>
        <path d="M10 13.6L15.9 7.7C16.0833 7.51667 16.3167 7.425 16.6 7.425C16.8833 7.425 17.1167 7.51667 17.3 7.7C17.4833 7.88334 17.575 8.11667 17.575 8.4C17.575 8.68334 17.4833 8.91667 17.3 9.1L10.7 15.7C10.5 15.9 10.2667 16 10 16C9.73334 16 9.5 15.9 9.3 15.7L6.7 13.1C6.51667 12.9167 6.425 12.6833 6.425 12.4C6.425 12.1167 6.51667 11.8833 6.7 11.7C6.88334 11.5167 7.11667 11.425 7.4 11.425C7.68334 11.425 7.91667 11.5167 8.1 11.7L10 13.6Z" fill="white"/>`;
      const answerStatus = this.currentQuestion.answers.filter(
        (item) => item.title === String(e.target.textContent.trim())
      )[0];
      this.userAnswerIsTrueOrNot = answerStatus.is_true;
      this.submitAnwer();
    });
  }
  submitAnwer() {
    const button = document.querySelector(".submit-btn");
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    newButton.addEventListener("click", () => {
      if (this.userAnswerIsTrueOrNot) {
        this.userStats.true += 1;
      } else {
        this.userStats.false += 1;
      }
      this.questionNum += 1;
      newButton.disabled = true;
      this.showQuestion();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Main(loginSection, loginForm);
});
