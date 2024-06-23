let btn_open = document.getElementsByClassName("btn-open")[0]
let sidebar_close = document.getElementsByClassName("sidebar-close")[0]
let sidebar = document.getElementsByClassName("sidebar")[0]

btn_open.addEventListener("click", () =>{
    sidebar.classList.toggle("hide")
    btn_open.classList.toggle("hide-btn")
})
sidebar.addEventListener("click",() => {
    sidebar.classList.toggle("hide")
    btn_open.classList.toggle("hide-btn")
})