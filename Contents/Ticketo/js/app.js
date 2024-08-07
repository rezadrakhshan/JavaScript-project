import { Movies } from "./scripts.js";
import { userReservation } from "./scripts.js";
const container = document.getElementsByClassName("container")[0];
const h2 = document.getElementsByTagName("h2")[0];
const loader = document.getElementsByClassName("loader")[0];

container.addEventListener("click", (e) => {
  mainObject.selectMovie(e);
});

class Main {
  constructor(container, movies, userReservation) {
    this.container = container;
    this.movies = movies;
    this.userReservation = userReservation;
    this.newReserve = {};
    this.loader = loader;
    this.detail = document.getElementsByClassName("ticket-detail")[0];
    this.payment = document.getElementsByClassName("payment")[0];
  }
  renderMovies() {
    document.addEventListener("DOMContentLoaded", () => {
      this.loader.style.display = "block";
      setTimeout(() => {
        this.loader.style.display = "none";
        this.movies.forEach((item) => {
          const newMovie = document.createElement("div");
          newMovie.classList.add("movie-item");
          newMovie.setAttribute("data-id", item.id);
          newMovie.innerHTML = `
                      <img src="${item.image}">
                      `;
          this.container.appendChild(newMovie);
        });
      }, 2000);
    });
  }
  selectMovie(e) {
    const movieItem = e.target.closest(".movie-item");
    if (movieItem) {
      const movie = movieItem.getAttribute("data-id");
      const selectedMovie = this.movies.filter((item) => item.id === movie);
      this.newReserve["name"] = selectedMovie[0].name;
      this.selectDate(selectedMovie);
    }
  }
  selectDate(item) {
    container.innerHTML = "";
    h2.innerText = "Select the date:";
    this.loader.style.display = "none";
    const movieDate = item[0].date;
    movieDate.forEach((item) => {
      const NewBox = document.createElement("h4");
      NewBox.setAttribute("data-id", item.date);
      NewBox.classList.add("date-box");
      NewBox.innerText = item.date;
      this.container.appendChild(NewBox);
    });
    this.container.addEventListener("click", (e) => {
      const SelectedDate = e.target.closest(".date-box");
      if (SelectedDate) {
        const date = SelectedDate.getAttribute("data-id");
        this.newReserve["date"] = date;
        const lastDate = movieDate.filter((item) => item.date === date);
        this.selectChair(lastDate[0].chairs);
      }
    });
  }
  selectChair(countOfChairs) {
    this.container.innerHTML = "";
    this.container.style.margin = "auto";
    h2.innerText = "Select your seat number:";
    this.loader.style.display = "none";
    countOfChairs.forEach((item) => {
      const newChair = document.createElement("h4");
      newChair.setAttribute("data-id", item);
      newChair.innerText = item;
      newChair.classList.add("chair-box");
      this.container.appendChild(newChair);
    });
    this.container.addEventListener("click", (e) => {
      const Selectedchair = e.target.closest(".chair-box");
      if (Selectedchair) {
        const chairNumber = Selectedchair.getAttribute("data-id");
        this.newReserve["chairNumber"] = chairNumber;
        this.submitTicket();
      }
    });
  }
  submitTicket() {
    this.detail.style.display = "block";
    this.container.innerHTML = "";
    h2.style.display = "none";
    this.detail.innerHTML += `
    <p>Movie : ${this.newReserve.name}</p>
    <p>Date : ${this.newReserve.date}</p>
    <p>Seat number : ${this.newReserve.chairNumber}</p>
    <p>Price : 20$</p>
    <button class="yes">Yes</button>
    <button class="no">No</button>
    `;
    this.detail.addEventListener("click", (e) => {
      const yes = e.target.closest(".yes");
      const no = e.target.closest(".no");
      if (no) {
        window.location.reload();
      }
      if (yes) {
        this.detail.style.display = "none";
        this.payment.style.display = "block";
        this.payment.addEventListener("submit",(e)=>{
            e.preventDefault()
            this.showResult()
        })
      }
    });
  }
  showResult() {
    Swal.fire({
      title: "Ticket Reserved",
      html: `Movie : ${this.newReserve.name} <br>
             Date : ${this.newReserve.date} <br>
             Seat Number : ${this.newReserve.chairNumber} <br>
             Price : 20$`,
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        popup: "my-popup-class",
        title: "my-title-class",
        confirmButton: "my-confirm-button-class",
      },
      preConfirm: () => {
        window.location.reload();
      }
    });
  }
  
}

const mainObject = new Main(container, Movies, userReservation);
mainObject.renderMovies();
