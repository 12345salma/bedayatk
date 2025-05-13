const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const appId = localStorage.getItem("applicationid");

fetch(
  `http://localhost:3000/api/bedaytak/service/marketing-estimator-service-premium/${userId}/${appId}`
)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      const {
        monthlyBudget,
        costPerClick,
        conversionRate,
        distributionChannel,
        estimatedNewCustomers,
      } = data.data;

      document.getElementById("monthlyBudget").textContent = monthlyBudget;
      document.getElementById("costPerClick").textContent = costPerClick;
      document.getElementById("conversionRate").textContent = conversionRate;
      document.getElementById("distributionChannel").textContent =
        distributionChannel;
      document.getElementById("estimatedNewCustomers").textContent =
        estimatedNewCustomers;
    } else {
      alert(data.message);
    }
  })
  .catch((err) => {
    console.error("Error fetching estimator data:", err);
  });
