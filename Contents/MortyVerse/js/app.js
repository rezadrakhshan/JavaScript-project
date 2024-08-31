const cardList = document.querySelector(".card-list");
const searchInput = document.getElementById("searchbyname");
const speciesSelect = document.getElementById("Species");
const genderSelect = document.getElementById("Gender");
const statusSelect = document.getElementById("Status");
const mainElement = document.getElementsByTagName("main")[0]
const loader = document.querySelector(".loading")

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
    this.setupModal();
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
      card.innerHTML = `
        <img style="${
          element.status === "Dead" ? "filter: grayscale(100%);" : ""
        }" src=${element.image} alt="">
        <div class="text">
            <h2>${element.name}</h2>
            <p>${element.species}</p>
        </div>
      `;
      card.addEventListener("click", () => this.showModal(element));
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

  setupModal() {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".modal .close");

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  showModal(character) {
    const modal = document.getElementById("modal");
    document.getElementById("modal-image").src = character.image;
    document.getElementById("modal-name").textContent = character.name;
    document.getElementById(
      "modal-species"
    ).textContent = `Species: ${character.species}`;
    document.getElementById(
      "modal-gender"
    ).textContent = `Gender: ${character.gender}`;
    document.getElementById(
      "modal-status"
    ).textContent = `Status: ${character.status}`;
    document.getElementById(
      "modal-location"
    ).textContent = `Last Known Location: ${character.location.name}`;
    modal.style.display = "block";
    this.fetchCharacterEpisodes(character);
  }
  async fetchCharacterEpisodes(character) {
    const episodeContainer = document.querySelector(".modal-episodes");
    const characterEpisodeList = character.episode;
    episodeContainer.innerHTML = ""
    characterEpisodeList.forEach(async (item) => {
      const episodeResponse = await axios.get(item);
      const episodeResult = episodeResponse.data;
      const episodeP = document.createElement("p");
      episodeP.textContent = `${episodeResult.episode} : ${episodeResult.name} in ${episodeResult.air_date}`;
      episodeContainer.appendChild(episodeP)
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const main = new Main(cardList);
  const data = await main.fetchData();
  main.showDataInUi(data, cardList);
  loader.remove()
  mainElement.style.display = "block"
});
