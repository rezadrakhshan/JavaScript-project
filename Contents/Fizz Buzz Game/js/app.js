function game() {
    let number = prompt("enter your number:")
    if (number) {
        check_number(number)
    }
}
function check_number(number) {
    switch (true) {
        case number % 5 == 0 && number % 3 == 0: {
            alert("FizzBuzz")
            game()
            break;
        }
        case number % 5 == 0: {
            alert("Buzz")
            game()
            break;
        }
        case number % 3 == 0: {
            alert("Fizz")
            game()
            break;
        }
        default: {
            alert("wrong number")
            game()
            break;
        }
    }
}
game()