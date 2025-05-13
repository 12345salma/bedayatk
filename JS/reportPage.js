const userId = localStorage.getItem("userId");

fetch(
  `http://localhost:3000/api/bedaytak/service/getall-user-service/${userId}`
)
  .then((response) => response.json())
  .then((result) => {
    if (result.success) {
      const {
        financialService,
        salesOptimizationService,
        businessGuideService,
        marketingEstimator,
      } = result.data;

      const {
        monthlyCosts,
        financialHealthIndex,
        monthlyRevenue,
        netProfit,
        breakEvenMonths,
        roi6Months,
        startupCost,
      } = financialService || {};

      const {
        product,
        avgPrice,
        expectedCustomers,
        sellingMonths,
        estimatedYearlySales,
      } = salesOptimizationService || {};

      const { recommendation, cta, suggestion } = businessGuideService || {};

      const {
        monthlyBudget,
        costPerClick,
        conversionRate,
        distributionChannel,
      } = marketingEstimator || {};

      const estimatedNewCustomers =
        marketingEstimator && monthlyBudget && costPerClick && conversionRate
          ? Math.floor((monthlyBudget / costPerClick) * (conversionRate / 100))
          : "N/A";

      const reportHTML = `
        <div class="row g-4">
          <div class="col-md-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">📊 Financial Service</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Monthly Revenue: $${
                    monthlyRevenue ?? "N/A"
                  }</li>
                  <li class="list-group-item">Monthly Costs: $${monthlyCosts}</li>
                  <li class="list-group-item">Net Profit: $${netProfit}</li>
                  <li class="list-group-item">Startup Cost: $${startupCost}</li>
                  <li class="list-group-item">Break-even Months: ${breakEvenMonths}</li>
                  <li class="list-group-item">ROI (6 Months): ${roi6Months}%</li>
                  <li class="list-group-item">Financial Health Index: ${financialHealthIndex}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">📈 Sales Optimization</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Product: ${product}</li>
                  <li class="list-group-item">Average Price: $${avgPrice}</li>
                  <li class="list-group-item">Expected Customers: ${expectedCustomers}</li>
                  <li class="list-group-item">Selling Months: ${sellingMonths}</li>
                  <li class="list-group-item">Estimated Yearly Sales: $${estimatedYearlySales}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">📌 Business Guide</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Suggestion:</strong> ${suggestion}</li>
                  <li class="list-group-item"><strong>Recommendation:</strong> ${recommendation}</li>
                  <li class="list-group-item"><strong>Call to Action:</strong> ${cta}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">📣 Marketing Estimator</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Monthly Budget: $${
                    monthlyBudget ?? "N/A"
                  }</li>
                  <li class="list-group-item">Cost Per Click: $${
                    costPerClick ?? "N/A"
                  }</li>
                  <li class="list-group-item">Conversion Rate: ${
                    conversionRate ?? "N/A"
                  }%</li>
                  <li class="list-group-item">Distribution Channel: ${
                    distributionChannel ?? "N/A"
                  }</li>
                  <li class="list-group-item"><strong>Estimated New Customers:</strong> ${estimatedNewCustomers}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      `;

      document.getElementById("report").innerHTML = reportHTML;
    } else {
      document.getElementById("report").innerHTML = `
        <div class="alert alert-danger">⚠️ ${result.message}</div>
      `;
    }
  })
  .catch((error) => {
    console.error("Request failed:", error);
    document.getElementById("report").innerHTML = `
      <div class="alert alert-danger">🚫 Failed to load data.</div>
    `;
  });

document.getElementById("downloadBtn").addEventListener("click", () => {
  const reportElement = document.getElementById("report");

  const opt = {
    margin: 0.5,
    filename: "user-service-report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(reportElement).set(opt).save();
});
