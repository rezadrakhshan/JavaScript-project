const container = document.querySelector(".container");
const form = document.querySelector("form");
const website = document.querySelector(".data");
const loader = document.querySelector(".container-loader");

class Main {
  constructor(container, form) {
    this.container = container;
    this.form = form;
    this.url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c71f8e2dbd594a86a10f7f073ce19aa2";
    this.addEventListener();
    this.getData();
  }
  addEventListener() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.searchNews(e);
    });
  }
  async getData() {
    try {
      const response = await axios.get(this.url);
      const data = await response.data.articles;
      this.showData(data);
      loader.remove();
      website.style.display = "block";
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  showData(list) {
    this.container.innerHTML = "";
    list.forEach((element) => {
      const newCard = document.createElement("a");
      newCard.href = element.url;
      const newdiv = document.createElement("div");
      newdiv.classList.add("card");
      newCard.appendChild(newdiv);
      newdiv.innerHTML = `
            <img src="${element.urlToImage}" alt="600x400">
            <h1>${element.title}</h1>
            <p>${element.description}</p>
            `;
      this.container.appendChild(newCard);
    });
  }
  async searchNews(e) {
    const UserSelectedWord = e.target.key.value;
    try {
      const response = await axios.get(this.url);
      const data = await response.data.articles;
      const userSearchResult = data.filter((item) => {
        return item.title
          .toLowerCase()
          .includes(UserSelectedWord.toLowerCase());
      });
      this.showData(userSearchResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  new Main(container, form);
});
