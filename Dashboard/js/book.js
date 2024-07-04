let books = []
const bookForm = document.querySelector(".book-form")
const bookTable = document.querySelector(".book-body")

bookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const newBook = {
        name: e.target.name.value,
        author: e.target.author.value,
        price: e.target.price.value,
        genre: e.target.genre.value
    }
    books.push(newBook)
    renderList()
    bookForm.reset()
})
function renderList(){
    bookTable.innerHTML = ""
    books.forEach((item) => {
        bookTable.innerHTML += `
        <tr>
        <td>${books.indexOf(item) + 1}</td>
        <td>${item.name}</td>
        <td>${item.author}</td>
        <td>$ ${item.price}</td>
        <td>${item.genre}</td>
        </tr>
        `
    })
}