// Select input fields
const emailLoginInput = document.getElementById("EmailLogin");
const passwordLoginInput = document.getElementById("PasswordLogin");
const loginBtn = document.getElementById("btnLogin");

// Regex for email validation
const loginEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Real-time validation
emailLoginInput.addEventListener("input", () =>
  validateInput(emailLoginInput, loginEmailRegex)
);
passwordLoginInput.addEventListener("input", () =>
  validateInput(passwordLoginInput, /^(?=.*[a-zA-Z0-9]).{6,}$/)
);

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const input = this.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    this.innerHTML =
      input.type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
  });
});

// On login click
loginBtn.addEventListener("click", async function () {
  const isEmailValid = validateInput(emailLoginInput, loginEmailRegex);
  const isPasswordValid = validateInput(
    passwordLoginInput,
    /^(?=.*[a-zA-Z0-9]).{6,}$/
  );

  if (!isEmailValid || !isPasswordValid) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please fill all fields correctly.",
    });
    return;
  }

  const email = emailLoginInput.value.trim();
  const password = passwordLoginInput.value;

  try {
    const response = await fetch(
      "http://localhost:3000/api/bedaytak/user/login-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Save token in localStorage for future authenticated requests
      localStorage.setItem("token", data.token);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "home.html";
      });
    } else {
      emailLoginInput.classList.add("is-invalid");
      passwordLoginInput.classList.add("is-invalid");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: data.message || "Incorrect email or password.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Could not connect to the server.",
    });
  }
});

function validateInput(input, regex) {
  const value = input.value.trim();
  if (regex.test(value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
