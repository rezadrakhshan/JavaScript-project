const ageForm = document.getElementsByTagName("form")[0];

ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userAge = new Date(e.target.date.value);
  const date = new Date();
  alert(`You have ${date.getFullYear() - userAge.getFullYear()} years old`);
  ageForm.reset()
});
