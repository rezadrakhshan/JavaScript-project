const heart = document.getElementsByClassName("heart")[0]
const my_form = document.getElementsByTagName("form")[0]

let num_of_heart = 10
let number = Math.floor(Math.random() * 100)

function create_heart() {
    heart.innerHTML = ""
    for (let i = 0; i < num_of_heart; i++) {
        heart.innerHTML += "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-heartbreak-fill' viewBox='0 0 16 16'><path d='M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586M7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77'/></svg>"
    }
}
create_heart()

my_form.addEventListener("submit", (e) => {
    e.preventDefault()
    let user_guess = e.target.guess.value
    if (num_of_heart > 0) {
        switch (true) {
            case user_guess == number: {
                alert("Correct")
                number = Math.floor(Math.random() * 100)
                num_of_heart = 10
                break;
            }
            case user_guess > number: {
                alert("too high")
                num_of_heart--;
                break;
            }
            case user_guess < number: {
                alert("too low")
                num_of_heart--;
                break;
            }
        }
        e.target.guess.value = ""
        create_heart()
    }
    if (num_of_heart === 0) {
        alert("you lose")
        num_of_heart = 10
        number = Math.floor(Math.random() * 100)
        create_heart()
    }
})
