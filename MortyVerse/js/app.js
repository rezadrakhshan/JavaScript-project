const cardList = document.querySelector(".card-list");
const searchInput = document.getElementById("searchbyname");
const speciesSelect = document.getElementById("Species");
const genderSelect = document.getElementById("Gender");
const statusSelect = document.getElementById("Status");

class Main {
  constructor(cardList) {
    this.cardList = cardList;
    this.filteredData = {
      searchInput: "",
      speciesSelect: "",
      genderSelect: "",
      statusSelect: "",
    };
    this.cachedData = [];
    this.getUserFilterKeyWord();
  }

  async fetchData() {
    const URL = "https://rickandmortyapi.com/api/character";
    const response = await axios.get(URL);
    this.cachedData = response.data.results;
    return this.cachedData;
  }

  showDataInUi(list, container) {
    this.cardList.innerHTML = "";
    list.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      if (element.status === "Dead") {
        card.style.backgroundColor = "gray";
      }
      card.innerHTML = `
            <img style="${
              element.status === "Dead" ? "filter: grayscale(100%);" : ""
            }" src=${element.image} alt="">
            <div class="text">
                <h2>${element.name}</h2>
                <p>${element.species}</p>
            </div>
            `;
      container.appendChild(card);
    });
  }

  getUserFilterKeyWord() {
    searchInput.addEventListener("input", (e) => {
      this.filteredData.searchInput = e.target.value;
      this.filterData();
    });
    speciesSelect.addEventListener("change", (e) => {
      this.filteredData.speciesSelect = e.target.value;
      this.filterData();
    });
    genderSelect.addEventListener("change", (e) => {
      this.filteredData.genderSelect = e.target.value;
      this.filterData();
    });
    statusSelect.addEventListener("change", (e) => {
      this.filteredData.statusSelect = e.target.value;
      this.filterData();
    });
  }

  async filterData() {
    const data =
      this.cachedData.length > 0 ? this.cachedData : await this.fetchData();

    const filteredResult = data.filter((item) => {
      const matchesName =
        !this.filteredData.searchInput ||
        item.name
          .toLowerCase()
          .includes(this.filteredData.searchInput.toLowerCase());

      const matchesStatus =
        !this.filteredData.statusSelect ||
        item.status === this.filteredData.statusSelect;

      const matchesGender =
        !this.filteredData.genderSelect ||
        item.gender === this.filteredData.genderSelect;

      const matchesSpecies =
        !this.filteredData.speciesSelect ||
        item.species === this.filteredData.speciesSelect;

      return matchesName && matchesStatus && matchesGender && matchesSpecies;
    });

    console.log(filteredResult);
    this.showDataInUi(filteredResult, this.cardList);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const main = new Main(cardList);
  const data = await main.fetchData();
  main.showDataInUi(data, cardList);
});
