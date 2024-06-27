const close_rule = document.getElementById("close-rule")
const header = document.getElementsByTagName("header")[0]
const form = document.getElementsByClassName("myform")[0]
const rule = document.getElementsByClassName("rule")[0]

close_rule.addEventListener("click", () => {
    rule.classList.add("hide")
    header.style.display = "block"
    form.style.display = "flex"
})