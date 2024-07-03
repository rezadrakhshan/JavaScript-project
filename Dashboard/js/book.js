const sidebarBtn = document.getElementsByTagName("button")[0]
const sidebarCloseBtn = document.getElementsByTagName("button")[1]
const sidebar = document.getElementsByClassName("sidebar")[0]
const body = document.getElementsByTagName("body")[0]

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show")
})
sidebarCloseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show")
})
