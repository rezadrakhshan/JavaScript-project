const loginSection = document.querySelector(".login")
const loginForm = document.querySelector(".loginForm")

class Main {
    constructor(login,loginForm) {
        this.login = login
        this.loginForm = loginForm
        this.userName = ""
        this.addEventListener()
    }
    addEventListener(){
        this.loginForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            this.userName = e.target.username.value
            loginSection.remove()
        })
    }
}


document.addEventListener("DOMContentLoaded",(e)=>{
    new Main(loginSection,loginForm)
})