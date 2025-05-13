document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("financialForm");

    //  Load saved data when the page loads
    function loadFormData() {
        let savedEntries = JSON.parse(localStorage.getItem("financialFormEntries")) || [];
        if (savedEntries.length > 0) {
            const latestEntry = savedEntries[savedEntries.length - 1]; // Load last saved entry
            Object.keys(latestEntry).forEach(key => {
                let inputField = document.getElementById(key);
                if (inputField) {
                    inputField.value = latestEntry[key];
                }
            });
        }
    }

    //  Save data ONLY when the user submits the form
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let savedEntries = JSON.parse(localStorage.getItem("financialFormEntries")) || []; // Retrieve existing entries
        let newEntry = {}; // Store new data

        Array.from(form.elements).forEach(input => {
            if (input.type !== "submit") {
                newEntry[input.name] = input.value;
            }
        });

        savedEntries.push(newEntry); // Append new entry without replacing old ones
        localStorage.setItem("financialFormEntries", JSON.stringify(savedEntries)); // Save data to localStorage

        Swal.fire({
            icon: "success",
            title: "Financial & Marketing Form Submitted!",
            text: "Would you like to choose another service before proceeding?",
            showCancelButton: true,
            confirmButtonText: "Yes, select another service",
            cancelButtonText: "No, proceed to payment",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../home.html#services"; // Redirect to services section
            } else {
                window.location.href = "../payment.html"; // Redirect to payment page
            }
        });
    });

    loadFormData(); // Load stored values on page load
});