// document
//   .getElementById("salesForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const appId = localStorage.getItem("applicationId");

//     // Check if the sales data is already in localStorage
//     // const existingSalesData = localStorage.getItem("estimatedSales");

//     // if (existingSalesData) {
//     //   // If the data is already stored, directly redirect to the results page
//     //   window.location.href = "../sales-optimization-result.html";
//     //   return;
//     // }

//     // // --- SALES ESTIMATOR INPUTS ---
//     // const price = parseFloat(
//     //   document.getElementById("price").value.replace(/[^\d.]/g, "")
//     // );
//     // const customers = parseInt(
//     //   document.getElementById("customersNumber").value.replace(/[^\d]/g, "")
//     // );
//     // const months = parseInt(
//     //   document.getElementById("monthsSelling").value.replace(/[^\d]/g, "")
//     // );

//     // // Validate sales values
//     // if (isNaN(price) || isNaN(customers) || isNaN(months)) {
//     //   alert("Please make sure all sales fields are correctly filled out.");
//     //   return;
//     // }

//     // // --- SALES CALCULATION ---
//     // const estimatedSales = price * customers * months;

//     // // Save results in localStorage
//     // localStorage.setItem("estimatedSales", estimatedSales.toFixed(2));

//     // // Redirect to results page
//     // window.location.href = "../sales-optimization-result.html";

//     // !!! THE PREVIOUS CODE WORKS AS A CLIENT SIDE ONLYYYYYYYY
//   });

// document
//   .getElementById("salesForm")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the user ID from localStorage (or however you store the user's ID)
//     const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
//     const token = localStorage.getItem("token"); // Assuming JWT token is stored in localStorage
//     const appId = localStorage.getItem("applicationId");

//     // Get form data
//     const product = document.getElementById("product").value;
//     const avgPrice = parseFloat(document.getElementById("price").value);
//     const expectedCustomers = parseInt(
//       document.getElementById("customersNumber").value
//     );
//     const sellingMonths = parseInt(
//       document.getElementById("monthsSelling").value
//     );
//     const monthlyBudget = parseFloat(
//       document.getElementById("marketingBudget").value
//     );
//     const costPerClick = parseFloat(
//       document.getElementById("costPerView").value
//     );
//     const conversionRate = parseFloat(
//       document.getElementById("conversionRate").value
//     );

//     // Validate the form data (just a simple check here, you can expand this)
//     if (
//       !product ||
//       !avgPrice ||
//       !expectedCustomers ||
//       !sellingMonths ||
//       !monthlyBudget ||
//       !costPerClick ||
//       !conversionRate
//     ) {
//       alert("Please fill in all the fields.");
//       return;
//     }

//     try {
//       // Send the POST request to the backend
//       const response = await fetch(
//         `http://localhost:3000/api/bedaytak/service/sales-optimization-service/${userId}/${appId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//           },
//           body: JSON.stringify({
//             product,
//             avgPrice,
//             expectedCustomers,
//             sellingMonths,
//             monthlyBudget,
//             costPerClick,
//             conversionRate,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         // Successful response
//         // Display results
//         alert(
//           "Sales Optimization created successfully! Service ID: " +
//             data.serviceId
//         );
//         // You can redirect to another page or show the result on the same page
//         // Example: window.location.href = `/result?serviceId=${data.serviceId}`;
//       } else {
//         // If error occurred
//         alert("Error: " + data.message);
//       }
//     } catch (err) {
//       console.error("Error during request:", err);
//       alert("An error occurred while sending the request.");
//     }
//   });

const submitBtn = document.getElementById("submit-sales");
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const product = document.getElementById("product").value;
  const avgPrice = document.getElementById("price").value;
  const expectedCustomers = document.getElementById("customersNumber").value;
  const sellingMonths = document.getElementById("monthsSelling").value;

  const serviceData = {
    product,
    avgPrice,
    expectedCustomers,
    sellingMonths,
  };
  console.log(serviceData);

  const applicationid = localStorage.getItem("applicationid");
  const userId = localStorage.getItem("userId"); // Make sure this line exists

  try {
    const response = await fetch(
      `http://localhost:3000/api/bedaytak/service/sales-optimization-service/${userId}/${applicationid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      }
    );
    console.log(response);
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Sales Estimator Form Submitted",
        text: "Your sales data has been successfully submitted!",
        confirmButtonText: "View Results",
      }).then(() => {
        window.location.href = "../sales-optimization-result.html";
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
