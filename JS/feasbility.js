// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("financialForm");

//   // Form submit event handler
//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Collect form values
//     const businessName = document.getElementById("business-name").value;
//     const monthlyRevenue = parseFloat(document.getElementById("revenue").value);
//     const monthlyCosts = parseFloat(document.getElementById("costs").value);
//     const startupCosts = parseFloat(
//       document.getElementById("Startup-Costs").value
//     );
//     const launchDate = document.getElementById("expiry").value;

//     // Feasibility study calculations
//     const monthlyProfit = monthlyRevenue - monthlyCosts;
//     const breakEvenMonths =
//       monthlyProfit > 0 ? (startupCosts / monthlyProfit).toFixed(1) : "∞";
//     const isFeasible = monthlyProfit > 0;

//     // Store results in localStorage
//     const feasibilityResult = {
//       businessName,
//       monthlyRevenue,
//       monthlyCosts,
//       startupCosts,
//       monthlyProfit,
//       breakEvenMonths,
//       isFeasible,
//       launchDate,
//     };

//     localStorage.setItem(
//       "feasibilityResult",
//       JSON.stringify(feasibilityResult)
//     );

//     // Redirect to results page
//     window.location.href = "../Feasibility-Study-results.html";
//   });
// });

const submitBtn = document.getElementById("submit-feasbility");
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const businessName = document.getElementById("business-name").value;
  const revenue = parseFloat(document.getElementById("revenue").value);
  const costs = parseFloat(document.getElementById("costs").value);
  const StartupCosts = parseFloat(
    document.getElementById("Startup-Costs").value
  );

  const serviceData = {
    monthlyRevenue: revenue,
    monthlyCosts: costs,
    startupCost: StartupCosts,
  };

  console.log(serviceData);

  const applicationid = localStorage.getItem("applicationid");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/bedaytak/service/financial-planning-service/${userId}/${applicationid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Feasibility Study Form Submitted",
        text: "Your data has been successfully submitted!",
        confirmButtonText: "View Results",
      }).then(() => {
        window.location.href = "../Feasibility-Study-results.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
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
