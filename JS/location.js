document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("locationForm");

  const apiEndpoint = "http://localhost:3000/api/bedaytak/business/categories";

  // Fetch categories and populate select
  fetch(apiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      const selectElement = document.getElementById("industry");

      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category._id;
        option.textContent = category.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  function loadFormData() {
    const savedEntry = JSON.parse(localStorage.getItem("locationData")); // now a single object, not array

    if (savedEntry) {
      Object.keys(savedEntry).forEach((key) => {
        const inputField = document.getElementById(key);
        if (inputField) {
          inputField.value = savedEntry[key];
        }
      });
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let newEntry = {};

    Array.from(form.elements).forEach((input) => {
      if (input.type !== "submit") {
        newEntry[input.name] = input.value;
      }
    });

    localStorage.setItem("locationData", JSON.stringify(newEntry)); //  save single object

    Swal.fire({
      icon: "success",
      title: "Location Intelligence Form Submitted!",
      text: "Would you like to choose another service before proceeding?",
      showCancelButton: true,
      confirmButtonText: "Yes, select another service",
      cancelButtonText: "No, proceed to payment",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../home.html#services";
      } else {
        const selectedService = "location-intelligence"; //  This is the added line
        window.location.href = `../payment.html?service=${selectedService}`; //  Now goes to payment with service info
      }
    });
  });

  loadFormData();
});
