import { books } from "./data.js";
const bookForm = document.querySelector(".book-form");
const bookTable = document.querySelector(".book-body");
const searchResult = document.querySelector(".search-result");
const searchInput = document.querySelector(".search-input");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = {
    name: e.target.name.value,
    author: e.target.author.value,
    price: e.target.price.value,
    genre: e.target.genre.value,
  };
  books.push(newBook);
  renderList();
  bookForm.reset();
});
function renderList() {
  bookTable.innerHTML = "";
  books.forEach((item) => {
    bookTable.innerHTML += `
        <tr>
        <td>${books.indexOf(item) + 1}</td>
        <td>${item.name}</td>
        <td>${item.author}</td>
        <td>$ ${item.price}</td>
        <td>${item.genre}</td>
        </tr>
        `;
  });
}
renderList();

searchInput.addEventListener("input", (e) => {
  let UserSelectedWord = e.target.value;
  if (UserSelectedWord != "") {
    let UserSearchResult = books.filter((item) => {
      return item.name.toLowerCase().includes(UserSelectedWord.toLowerCase());
    });
    renderSearchResult(UserSearchResult);
  } else {
    searchResult.innerHTML = "";
  }
});

function renderSearchResult(searchResultArray) {
  searchResult.innerHTML = "";
  searchResultArray.forEach((item) => {
    searchResult.innerHTML += `
    <div class="search-item">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journals" viewBox="0 0 16 16">
  <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
  <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
</svg>
      <p>${item.name}</p>
    </div>
    `;
  });
}
