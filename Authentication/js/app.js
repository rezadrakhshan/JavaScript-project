class Main {
  constructor(form) {
    this.form = form;
    this.addEventListener();
  }
  addEventListener() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.login(e);
    });
  }
  async login(e) {
    const data = {
      email: String(e.target.email.value),
      password: String(e.target.password.value),
    };
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.form.reset();
        function showToast() {
          toastr.error("Email or Password is invalid", "oops!!!!");
        }
        showToast();
      } else {
        this.form.reset();
        function showToast() {
          toastr.success("Login Successfuly", "Welcome");
        }
        showToast();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  console.log({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  const form = document.getElementsByTagName("form")[0];
  new Main(form);
});
