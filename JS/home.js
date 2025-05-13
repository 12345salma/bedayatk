document.addEventListener("DOMContentLoaded", async function () {
  const navbarNav = document
    .getElementById("navbarNav")
    .querySelector(".navbar-nav");

  const logoutItem = document.createElement("li");
  logoutItem.classList.add("nav-item");

  const signinItem = document.createElement("li");
  signinItem.classList.add("nav-item");

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  try {
    // Send GET request to check if the user is logged in (token is valid)
    const response = await fetch(
      "http://localhost:3000/api/bedaytak/user/check",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        credentials: "include", // Include cookies to check for session/token (if necessary)
      }
    );

    if (response.ok) {
      // User is logged in, show their name and add "Log Out" option
      const data = await response.json();
      console.log(data)
      console.log("Logged in as:", data.userId); // Log user's info


      // Save the userId in localStorage
      localStorage.setItem("userId", data.userId);

      // Add "Log Out" button to the navbar
      // logoutItem.innerHTML = `<a class="nav-link active text-black" href="#" id="logoutBtn">Log Out</a>`;
      // navbarNav.appendChild(logoutItem);

      const reportButton = document.createElement("a");
      reportButton.href = "/services/report-page.html";
      reportButton.className =
        "btn btn-success position-fixed bottom-0 end-0 m-4 shadow";
      reportButton.textContent = "📄 View Service Report";

      // Append to body or a container
      document.body.appendChild(reportButton);

      // Log out functionality
      document
        .getElementById("logoutBtn")
        .addEventListener("click", async () => {
          // Send request to log the user out
          await fetch("http://localhost:3000/api/bedaytak/user/logout", {
            method: "POST",
            credentials: "include", // Send cookies with the request
          });

          // After logging out, clear the localStorage and redirect to home page or login page
          localStorage.removeItem("token"); // Optional, if you store token in localStorage
          localStorage.removeItem("userId"); // Remove userId when logging out
          window.location.href = "index.html"; // Redirect to the home page
        });
    } else {
      // User is not logged in, show "Sign Up" link
      // signinItem.innerHTML = `<a class="nav-link active text-black" href="signup.html">Sign Up</a>`;
      // navbarNav.appendChild(signinItem);
    }
  } catch (error) {
    console.error("Error checking login status:", error);

    // In case of error (e.g., network issue), still show "Sign Up" link
    // signinItem.innerHTML = `<a class="nav-link active text-black" href="signup.html">Sign Up</a>`;
    // navbarNav.appendChild(signinItem);
  }
});
