const loginSection = document.querySelector(".login")
const loginForm = document.querySelector(".loginForm")
const questionText = document.querySelector(".question-text")
const answerBox = document.querySelector(".answer-box")

class Main {
    constructor(login,loginForm) {
        this.login = login
        this.loginForm = loginForm
        this.userName = ""
        this.question = ""
        this.questionNum = 0
        this.addEventListener()
        this.getData()
    }
    addEventListener(){
        this.loginForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            this.userName = e.target.username.value
            loginSection.remove()
        })
    }
    async getData(){
        const URL = "https://rezaderakhshan-quizapp.liara.run/"
        const response = await axios(URL)
        this.question = response.data
        this.showQuestion()
    }
    showQuestion(){
        const selectedQuestion = this.question[this.questionNum]
        questionText.innerText = selectedQuestion.text
        console.log(selectedQuestion)
        selectedQuestion.answers.forEach(element => {
            const answer = document.createElement("div")
            answer.classList.add("answer", "w-[400px]", "bg-white", "p-3", "rounded-2xl", "flex", "justify-between","cursor-pointer")
            answer.innerHTML = `<span>${element.title}</span
            ><svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="9.5" stroke="black" />
            </svg>`
            answerBox.appendChild(answer)
        });
    }
}


document.addEventListener("DOMContentLoaded",(e)=>{
    new Main(loginSection,loginForm)
})