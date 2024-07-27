document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  const placeholders = ["TodoApp", "ChronoBirth", "Dashboard"];
  let i = 0;
  let j = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetween = 2000;

  function typeWriter() {
    const currentText = placeholders[j];
    if (!isDeleting && i < currentText.length) {
      input.setAttribute("placeholder", currentText.substring(0, i + 1));
      i++;
      setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && i > 0) {
      input.setAttribute("placeholder", currentText.substring(0, i - 1));
      i--;
      setTimeout(typeWriter, deletingSpeed);
    } else if (i === currentText.length) {
      setTimeout(() => (isDeleting = true), delayBetween);
      setTimeout(typeWriter, delayBetween);
    } else if (i === 0 && isDeleting) {
      isDeleting = false;
      j = (j + 1) % placeholders.length;
      setTimeout(typeWriter, typingSpeed);
    }
  }

  typeWriter();
});

