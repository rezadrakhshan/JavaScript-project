const ageForm = document.getElementsByTagName("form")[0];

ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userAge = new Date(e.target.date.value);
  const date = new Date();
  const result = date.getFullYear() - userAge.getFullYear();
  if (result <= 0) {
    Swal.fire({
      title: 'Alert!',
      text: 'Please enter the date correctly.',
      icon: 'warning',
      confirmButtonText: 'OK',
      customClass: {
          popup: 'my-popup-class',
          title: 'my-title-class-error',
          confirmButton: 'my-confirm-button-class',
      }
  });
    ageForm.reset();
  } else {
    Swal.fire({
      title: 'Age Information',
      text: `You have ${result} years old`,
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
          popup: 'my-popup-class',
          title: 'my-title-class',
          confirmButton: 'my-confirm-button-class',
      }
  });
    ageForm.reset();
  }
});
