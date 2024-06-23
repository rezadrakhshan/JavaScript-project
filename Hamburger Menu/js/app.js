let btn_open = document.getElementsByClassName("btn-open")[0];
let sidebar_close = document.getElementsByClassName("sidebar-close")[0];
let sidebar = document.getElementsByClassName("sidebar")[0];

btn_open.addEventListener("click", () => {
    sidebar.classList.add("show");
    btn_open.classList.add("hide-btn");
});

sidebar_close.addEventListener("click", () => {
    sidebar.classList.remove("show");
    btn_open.classList.remove("hide-btn");
});
