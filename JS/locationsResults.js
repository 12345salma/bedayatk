// Fetch data and process it
async function getTopFiveLowestCount() {
  try {
    const response = await fetch("http://localhost:3000/api/bedaytak/location");
    const result = await response.json();
    const locations = result.data;

    const locationData = JSON.parse(localStorage.getItem("locationData"));

    if (!locationData || !locationData.industry) {
      console.error("No industry found in localStorage");
      return;
    }

    const industryId = locationData.industry;
    const businessName = locationData["business-name"];

    const locationsWithCounts = [];

    locations.forEach((location) => {
      const matchingBusiness = location.businesses.find(
        (business) => business.categoryId === industryId
      );

      if (matchingBusiness) {
        locationsWithCounts.push({
          name: location.name,
          count: matchingBusiness.count,
        });
      }
    });

    if (locationsWithCounts.length === 0) {
      console.error("No data found for the selected industry.");
      return;
    }

    const sortedByCount = locationsWithCounts.sort((a, b) => a.count - b.count);
    const topFive = sortedByCount.slice(0, 5);

    const topFiveNames = topFive.map((item) => item.name);
    const topFiveCounts = topFive.map((item) => item.count);

    // Display business name and the region with the least competitors
    const resultContainer = document.getElementById("result");
    if (resultContainer) {
      resultContainer.innerHTML = `
        <h4 class="text-center mb-3">Business Name: <span style="color: #6366f1;">${businessName}</span></h4>
        <h5 class="text-center mb-4">Best Region to Open: <span style="color: #22c55e;">${topFive[0].name}</span> (${topFive[0].count} competitors)</h5>
      `;
    }

    // Create Bar Chart instead of Pie Chart
    const ctx = document.getElementById("myPieChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: topFiveNames,
        datasets: [
          {
            label: "Number of Competitors",
            data: topFiveCounts,
            backgroundColor: [
              "#6366f1",
              "#22c55e",
              "#f97316",
              "#ec4899",
              "#0ea5e9",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Hide legend since it's a single dataset
          },
          title: {
            display: true,
            text: "Least 5 Regions with the Least Competitors",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Competitor Count",
            },
          },
          x: {
            title: {
              display: true,
              text: "Regions",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Call the function after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const locationData = JSON.parse(localStorage.getItem("locationData"));

  if (locationData && locationData.industry) {
    getTopFiveLowestCount();
  } else {
    console.error("No valid locationData found. Cannot fetch top locations.");
  }
});
