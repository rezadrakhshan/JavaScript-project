const cardList = document.getElementsByClassName("cards-list")[0]


class Main {
    constructor(cardList) {
        this.cardList = cardList
        this.addEventListeners()
        this.renderData()
    }
    async addEventListeners(){
        
    }
    async renderData(){
        const response = await fetch("https://rezaderakhshan-unitsapi.hf.space/")
        const data = await response.json()
        data.forEach((item) => {
            const newUnit = document.createElement("div")
            newUnit.classList.add("card")
            newUnit.innerHTML = `
                        <img src='https://rezaderakhshan-unitsapi.hf.space/${item.image}' alt="">
            <div class="card-body">
              <div style="display: flex;justify-content: space-between;">
                <h1>$${item.price}</h1>
                <span style="${item.is_for_sale ? "background-color: cadetblue;color:white;" : "background-color: rgb(240, 255, 152);"}height: 20px; padding: 5px;border-radius: 10px;">for ${item.is_for_sale ? "sale" : "rent"}</span>
              </div>
              <h3>${item.name}</h3>
              <p><?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>${item.address}</p>
              <div style="display: flex;justify-content: space-evenly;margin-top: 10px;">
                <span><?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 13.5H7.5M10.5 13.5V16.5M10.5 13.5L7 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.5 10.5H16.5M13.5 10.5V7.5M13.5 10.5L17 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.5 10.5H7.5M10.5 10.5V7.5M10.5 10.5L7 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.5 13.5H16.5M13.5 13.5V16.5M13.5 13.5L17 17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"/>
                  </svg>${item.area} m²</span>
                <span><?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 5.25H10.5C9.67157 5.25 9 5.92157 9 6.75H15C15 5.92157 14.3284 5.25 13.5 5.25ZM15 4.15135C14.5587 3.89609 14.0464 3.75 13.5 3.75H10.5C9.95357 3.75 9.44126 3.89609 9 4.15135V3.75H7.5V6.75V7.37829L5.25 14.1283V20.25H6.75V18H17.25V20.25H18.75V14.1283L16.5 7.37829V6.75V3.75H15V4.15135ZM15.2094 8.25H8.79057L7.04057 13.5H16.9594L15.2094 8.25ZM17.25 15H6.75V16.5H17.25V15Z" fill="#080341"/>
                  </svg>${item.rooms}</span>
              </div>
            </div>
            `
            this.cardList.appendChild(newUnit)
        });
    }
}


document.addEventListener("DOMContentLoaded",(e)=>{
    new Main(cardList)
})