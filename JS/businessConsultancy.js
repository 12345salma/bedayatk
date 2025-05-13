document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultancyForm");

  // Load saved form data from localStorage if it exists
  function loadFormData() {
    let savedEntries =
      JSON.parse(localStorage.getItem("consultancyFormEntries")) || [];
    if (savedEntries.length > 0) {
      const latestEntry = savedEntries[savedEntries.length - 1]; // Load the last saved entry
      Object.keys(latestEntry).forEach((key) => {
        let inputField = document.getElementById(key);
        if (inputField) {
          inputField.value = latestEntry[key]; // Fill form with last saved data
        }
      });
    }
  }

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather form data to store in localStorage
    let savedEntries =
      JSON.parse(localStorage.getItem("consultancyFormEntries")) || []; // Retrieve existing entries
    let newEntry = {}; // New form data entry

    // Loop through form elements and add values to newEntry object
    Array.from(form.elements).forEach((input) => {
      if (input.type !== "submit" && input.name) {
        newEntry[input.name] = input.value;
      }
    });

    // Save the new form entry to localStorage
    savedEntries.push(newEntry); // Append new entry to the saved entries
    localStorage.setItem(
      "consultancyFormEntries",
      JSON.stringify(savedEntries)
    ); // Update localStorage with new data

    // Show success notification using SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Business Consultancy Form Submitted!",
      text: "Would you like to choose another service before proceeding?",
      showCancelButton: true,
      confirmButtonText: "Yes, select another service",
      cancelButtonText: "No, proceed to payment",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../home.html#services";
      } else {
        const selectedService = "businessCounsultant";
        window.location.href = `../payment.html?service=${selectedService}`;
      }
    });
  });

  // Load stored form data on page load
  loadFormData();
});
