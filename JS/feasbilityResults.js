document.addEventListener("DOMContentLoaded", async function () {
  const resultContainer = document.getElementById("result");

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
    `http://localhost:3000/api/bedaytak/service/financial-planning-premium-service/${applicantid}/${applicationid}`,
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
          <li class="list-group-item"><strong>Financial Health Index:</strong> ${response.financialHealthIndex}</li>
            <li class="list-group-item"><strong>Break Even Months:</strong> ${response.breakEvenMonths}</li>
            <li class="list-group-item"><strong>Monthly Costs:</strong> ${response.monthlyCosts} EGP</li>
            <li class="list-group-item"><strong>Monthly Revenue:</strong> ${response.monthlyRevenue}</li>
            <li class="list-group-item"><strong>Net Profit:</strong> ${response.netProfit}</li>
            <li class="list-group-item"><strong>ROI:</strong> ${response.roi6Months}</li>
            <li class="list-group-item"><strong>Start Up Costs:</strong> ${response.startupCost}</li>
          </ul> 
        `;

  resultContainer.innerHTML = html;
});
