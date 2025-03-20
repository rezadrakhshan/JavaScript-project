const form = document.querySelector("form");
const textArea = document.querySelector("#text");
const resultArea = document.querySelector("#result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const numbers = textArea.value.split('\n');
  const filteredNumbers = [...new Set(numbers)];
  resultArea.value = filteredNumbers.join('\n');
});
