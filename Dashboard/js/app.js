const sidebarBtn = document.getElementsByTagName("button")[0]
const sidebar = document.getElementsByClassName("sidebar")[0]
const searchBox = document.getElementsByClassName("search-box")[0]


sidebarBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    sidebar.classList.toggle("show")
    searchBox.classList.remove("open")
})
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && e.target !== sidebarBtn && !searchBox.contains(e.target)) {
        sidebar.classList.remove("show");
        searchBox.classList.remove("open")
    }
})

document.getElementsByTagName("input")[0].addEventListener("click", (e) => {
    e.stopPropagation()
    sidebar.classList.remove("show")
    searchBox.classList.toggle("open")
})