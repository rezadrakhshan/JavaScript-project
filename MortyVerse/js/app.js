const cardList = document.querySelector(".card-list");

class Main {
  constructor(cardList) {
    this.cardList = cardList;
  }
  async fetchData() {
    const URL = "https://rickandmortyapi.com/api/character";
    const response = await axios.get(URL);
    const data = response.data.results;
    this.showDataInUi(data,this.cardList)
  }
  showDataInUi(list, container) {
    list.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
            <img src=${element.image} alt="">
            <div class="text">
                <h2>${element.name}</h2>
                <p>${element.species}</p>
            </div>
            `;
      container.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const main = new Main(cardList);
  const data = await main.fetchData();
});
