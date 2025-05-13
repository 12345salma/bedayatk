document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("applicationForm");
  const fields = form.querySelectorAll("input, select, textarea");

  const serviceToPage = {
    "Location and markrt analysis": "location-and-market-intelligence.html",
    "Sales estimator": "sales-and-revenue-optimization.html",
    "Feasibility Study": "financial-and-marketing-support.html",
    "Business guide": "guidance.html",
    "Business Consultancy": "business-consultancy-and-guidance.html",
    "Marketing estimator": "marketing-support.html",
  };

  console.log(serviceToPage);

  // Get saved data
  let storedUsername = localStorage.getItem("username");
  let selectedService = localStorage.getItem("selectedService");
  let hasApplied = localStorage.getItem("hasApplied");

  // If form was already submitted, redirect
  if (
    hasApplied === "true" &&
    selectedService &&
    serviceToPage[selectedService]
  ) {
    window.location.href = `services/${serviceToPage[selectedService]}`;
    return;
  }

  // Form submission handler
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const usernameField = document.querySelector("input[name='email']");
    const username = usernameField ? usernameField.value.trim() : null;

    if (username) {
      localStorage.setItem("username", username);
    }

    // Use selected service from localStorage
    const service = localStorage.getItem("selectedService");
    console.log("Selected service:", service);

    if (!service || !serviceToPage[service]) {
      Swal.fire({
        icon: "error",
        title: "Invalid Service",
        text: "Please select a valid service before submitting.",
      });
      return;
    }

    // Prepare form data
    const formData = {};
    fields.forEach((field) => {
      if (field.type === "radio" && field.checked) {
        formData[field.name] = field.value;
      } else if (field.type !== "radio") {
        formData[field.name] = field.value.trim();
      }
    });

    // Save locally
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
    localStorage.setItem("hasApplied", "true");

    // Send to server
    try {
      const response = await fetch(
        "http://localhost:3000/api/bedaytak/service/add-service-application",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            service: service, // exact name
            formData: formData,
          }),
        }
      );

      console.log(response);
      const result = await response.json();

      if (result.success) {
        localStorage.setItem("applicationid", result.applicationId);
        localStorage.setItem("applicantid", result.applicantId);
        console.log(result.applicationId);

        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Redirecting you to your chosen service now...",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.replace(`services/${serviceToPage[service]}`);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Application creation failed",
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not submit application. Please try again.",
      });
    }
  });
});
