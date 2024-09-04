const cardList = document.querySelector(".card-list");
const searchInput = document.getElementById("searchbyname");
const speciesSelect = document.getElementById("Species");
const genderSelect = document.getElementById("Gender");
const statusSelect = document.getElementById("Status");
const mainElement = document.getElementsByTagName("main")[0];
const loader = document.querySelector(".loading");
const userFavoriteList = JSON.parse(localStorage.getItem("fav")) || [];
const dialog = document.querySelector(".main-dialog");
const nextPage = document.querySelector("#next");
const previousPage = document.querySelector("#previous");
const numOfPage = document.querySelectorAll(".num_of_page");

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
    this.ShowFavInDialog();
    this.addEventListener();
    this.pageCount = 1;
  }

  addEventListener() {
    dialog.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-fav-button")) {
        const selectedFav = e.target.parentElement.getAttribute("data-id");
        const newFavList = userFavoriteList.filter(
          (item) => item.id != selectedFav
        );
        localStorage.setItem("fav", JSON.stringify(newFavList));
        window.location.reload();
      }
    });
    nextPage.addEventListener("click", async () => {
      if (this.pageCount === 42) {
        this.pageCount = 1;
      } else {
        this.pageCount += 1;
      }
      const data = await this.fetchData();
      this.showDataInUi(data, this.cardList);
    });
    previousPage.addEventListener("click", async () => {
      if (this.pageCount === 1) {
        this.pageCount = 42;
      } else {
        this.pageCount -= 1;
      }
      const data = await this.fetchData();
      this.showDataInUi(data, this.cardList);
    });
    numOfPage.forEach((item) => {
      item.addEventListener("click", async () => {
        this.pageCount = Number(item.textContent);
        const data = await this.fetchData();
        this.showDataInUi(data, this.cardList);
      });
    });
  }

  checkIsCharacterInFavoriteList(id) {
    return userFavoriteList.some((item) => item.id === id);
  }

  async fetchData() {
    const URL = `https://rickandmortyapi.com/api/character?page=${this.pageCount}`;
    const response = await axios.get(URL);
    this.cachedData = response.data.results;
    return this.cachedData;
  }

  showDataInUi(list, container) {
    this.cardList.innerHTML = "";
    list.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", element.id);
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

    if (closeBtn) {
      closeBtn.onclick = function () {
        modal.style.display = "none";
      };
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  showModal(character) {
    const modal = document.getElementById("modal");
    modal.setAttribute("data-id", character.id);
    const heartElement = document.querySelector(".heart");

    if (heartElement) {
      heartElement.innerHTML = `<i class="${
        this.checkIsCharacterInFavoriteList(character.id)
          ? "remove-fav fa-solid fa-heart"
          : "add-fav fa-regular fa-heart"
      }" data-bs-toggle="tooltip" title="Click to add item in your favorites list"></i>`;
    }

    document.getElementById("modal-image").src = character.image;
    document.getElementById("modal-name").innerHTML = character.name;
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

    const addFavButton = document.querySelector(".add-fav");
    const removeFavButton = document.querySelector(".remove-fav");

    if (addFavButton) {
      addFavButton.addEventListener("click", async (e) => {
        const modalId = modal.getAttribute("data-id");
        const characterUserSelected = this.cachedData.find(
          (item) => item.id == modalId
        );
        if (
          characterUserSelected &&
          !this.checkIsCharacterInFavoriteList(characterUserSelected.id)
        ) {
          userFavoriteList.push(characterUserSelected);
          localStorage.setItem("fav", JSON.stringify(userFavoriteList));
          this.showModal(character);
          this.ShowFavInDialog();
        }
      });
    }

    if (removeFavButton) {
      removeFavButton.addEventListener("click", async (e) => {
        const modalId = modal.getAttribute("data-id");
        const characterIndex = userFavoriteList.findIndex(
          (item) => item.id == modalId
        );
        if (characterIndex !== -1) {
          userFavoriteList.splice(characterIndex, 1);
          localStorage.setItem("fav", JSON.stringify(userFavoriteList));
          this.showModal(character);
          this.ShowFavInDialog();
        }
      });
    }
  }

  async fetchCharacterEpisodes(character) {
    const episodeContainer = document.querySelector(".modal-episodes");
    if (!episodeContainer) return;

    const characterEpisodeList = character.episode;
    episodeContainer.innerHTML = "";
    for (const item of characterEpisodeList) {
      const episodeResponse = await axios.get(item);
      const episodeResult = episodeResponse.data;
      const episodeP = document.createElement("p");
      episodeP.textContent = `${episodeResult.episode} : ${episodeResult.name} in ${episodeResult.air_date}`;
      episodeContainer.appendChild(episodeP);
    }
  }
  ShowFavInDialog() {
    dialog.innerHTML = "";
    userFavoriteList.forEach((item) => {
      const row = document.createElement("div");
      row.classList.add("fav-item");
      row.setAttribute("data-id", item.id);
      row.innerHTML = `
              <img src="${item.image}" alt="">
        <p>${item.name}</p>
        <i class="remove-fav-button fa fa-trash"></i>
      `;
      dialog.appendChild(row);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const main = new Main(cardList);
  const data = await main.fetchData();
  main.showDataInUi(data, cardList);
  loader.remove();
  mainElement.style.display = "block";
});
