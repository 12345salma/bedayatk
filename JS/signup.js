// Select input fields
const nameInput = document.getElementById("createName");
const emailInput = document.getElementById("createEmail");
const passwordInput = document.getElementById("createPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const signupBtn = document.getElementById("btn-signup");

// Load existing users from localStorage
let allUsers = JSON.parse(localStorage.getItem("allUser")) || [];

// Regex validators
const nameRegex = /^[a-zA-Z0-9._ -]{3,}$/;
const signUpEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Realtime validation
nameInput.addEventListener("input", () => validateInput(nameInput, nameRegex));
emailInput.addEventListener("input", () =>
  validateInput(emailInput, signUpEmailRegex)
);
passwordInput.addEventListener("input", () =>
  validateInput(passwordInput, passwordRegex)
);
confirmPasswordInput.addEventListener("input", validatePasswordMatch);

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

// Sign up button
signupBtn.addEventListener("click", async function () {
  const nameValid = validateInput(nameInput, nameRegex);
  const emailValid = validateInput(emailInput, signUpEmailRegex);
  const passwordValid = validateInput(passwordInput, passwordRegex);
  const confirmValid = validatePasswordMatch();

  if (!nameValid || !emailValid || !passwordValid || !confirmValid) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please check all fields and try again.",
    });
    return;
  }

  // Check if email already exists
  if (isExistingUser(emailInput.value.trim())) {
    emailInput.classList.add("is-invalid");
    Swal.fire({
      icon: "error",
      title: "Email Already Exists",
      text: "Try another email address.",
    });
    return;
  }

  // Save new user
  const newUser = {
    fullName: nameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value,
  };

  try {
    const response = await fetch(
      "http://localhost:3000/api/bedaytak/user/signup-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }
    );

    const data = await response.json();
    console.log(data)

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Account created successfully.",
      }).then(() => {
        clearForm();
        window.location.href = "index.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: data.message || "Something went wrong.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Could not connect to server.",
    });
  }
});

function validateInput(input, regex) {
  if (regex.test(input.value.trim())) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validatePasswordMatch() {
  if (
    confirmPasswordInput.value === passwordInput.value &&
    confirmPasswordInput.value !== ""
  ) {
    confirmPasswordInput.classList.add("is-valid");
    confirmPasswordInput.classList.remove("is-invalid");
    return true;
  } else {
    confirmPasswordInput.classList.add("is-invalid");
    confirmPasswordInput.classList.remove("is-valid");
    return false;
  }
}

function isExistingUser(email) {
  return allUsers.some((user) => user.emailuser === email);
}

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";

  nameInput.classList.remove("is-valid", "is-invalid");
  emailInput.classList.remove("is-valid", "is-invalid");
  passwordInput.classList.remove("is-valid", "is-invalid");
  confirmPasswordInput.classList.remove("is-valid", "is-invalid");
}
