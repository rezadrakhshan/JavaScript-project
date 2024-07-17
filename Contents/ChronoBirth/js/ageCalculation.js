const ageForm = document.getElementsByTagName("form")[0];

ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userAge = new Date(e.target.date.value);
  const date = new Date();
  const result = date.getFullYear() - userAge.getFullYear()
  if (result <= 0) {
    alert("Please enter the date correctly")
    ageForm.reset()
  }
  else{
    alert(`You have ${result} years old`);
    ageForm.reset()
  }
});
