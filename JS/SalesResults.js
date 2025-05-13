document.addEventListener("DOMContentLoaded", async function () {
  const resultContainer = document.getElementById("result");
  const chartContainer = document.getElementById("chart-container");

  // Load data from localStorage
  const salesFormEntries =
    JSON.parse(localStorage.getItem("salesFormEntries")) || [];
  const salesOptimizationResult = JSON.parse(
    localStorage.getItem("salesOptimizationResult")
  );

  // if (salesFormEntries.length === 0) {
  //   resultContainer.innerHTML = "<p>No form entries found.</p>";
  //   return;
  // }
  const applicantid = localStorage.getItem("userId");
  const applicationid = localStorage.getItem("applicationid");
  // Get the latest form entry
  const latestEntry = salesFormEntries[salesFormEntries.length - 1];
  const req = await fetch(
    `http://localhost:3000/api/bedaytak/service/sales-optimization-service-premium/${applicantid}/${applicationid}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const responsePre = await req.json();
  const response = responsePre.data;
  console.log(response);
  // Build HTML to show form inputs nicely
  const html = `
        <h5 class="mb-4">Your Service Result:</h5>
        <ul class="list-group mb-4">
          <li class="list-group-item"><strong>Product:</strong> ${response.product}</li>
          <li class="list-group-item"><strong>Average Price:</strong> ${response.avgPrice} EGP</li>
          <li class="list-group-item"><strong>Expected Customers:</strong> ${response.expectedCustomers}</li>
          <li class="list-group-item"><strong>Your Estimated Yearly Sales:</strong> ${response.estimatedYearlySales}</li>
        </ul> 
      `;

  resultContainer.innerHTML = html;

  // Optional: display a chart if you want (for example: budget distribution)
  // if (salesOptimizationResult) {
  //   const ctx = document.createElement("canvas");
  //   ctx.id = "salesChart";
  //   chartContainer.appendChild(ctx);

  //   const myChart = new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: ["Marketing Budget", "Cost per Click"],
  //       datasets: [
  //         {
  //           label: "Amount (EGP)",
  //           data: [
  //             parseFloat(latestEntry.marketingBudget),
  //             parseFloat(latestEntry.costPerView),
  //           ],
  //           backgroundColor: [
  //             "rgba(75, 192, 192, 0.6)",
  //             "rgba(255, 99, 132, 0.6)",
  //           ],
  //           borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           display: true,
  //         },
  //         title: {
  //           display: true,
  //           text: "Budget vs Cost Visualization",
  //         },
  //       },
  //     },
  //   });
  // }
});
