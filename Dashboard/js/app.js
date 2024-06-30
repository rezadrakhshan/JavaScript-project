let bookList = []
const addForm = document.getElementsByClassName("addForm")[0]
const bookTable = document.getElementsByTagName("table")[0]

addForm.addEventListener("submit", (e) => {
    let newBook = {
        name: e.target.name.value,
        author: e.target.author.value,
        price: e.target.price.value,
        genre: e.target.type.value,
    }
    bookList.push(newBook)
    if (bookList.indexOf(newBook) % 2 == 0) {
        bookTable.innerHTML += `<tr style='background-color: rgb(184, 184, 184);'><td>${bookList.indexOf(newBook)+1}</td><td>${newBook.name}</td><td>${newBook.author}</td><td>${newBook.price}$</td><td>${newBook.genre}</td></tr>`
    }
    else{
        bookTable.innerHTML += `<tr style='background-color: rgb(255, 211, 211);'><td>${bookList.indexOf(newBook)+1}</td><td>${newBook.name}</td><td>${newBook.author}</td><td>${newBook.price}$</td><td>${newBook.genre}</td></tr>`
    }
    addForm.reset()
    e.preventDefault()
})