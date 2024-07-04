const searchBox = document.getElementsByClassName("search-box")[0]

document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target)) {
        searchBox.classList.remove("open")
    }
})

document.getElementsByTagName("input")[0].addEventListener("click", (e) => {
    e.stopPropagation()
    searchBox.classList.toggle("open")
})