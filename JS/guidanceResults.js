document.addEventListener("DOMContentLoaded", async function () {
  // Get the applicant and application IDs from localStorage
  const applicantid = localStorage.getItem("userId");
  const applicationid = localStorage.getItem("applicationid");

  try {
    // Make GET request to fetch results from the backend
    const response = await fetch(
      `http://localhost:3000/api/bedaytak/service/business-guidance-free-trial-service/${applicantid}/${applicationid}`
    );

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch results");
    }

    // Check if result has data
    if (result.success && result.data) {
      const { data } = result;

      // Access data._doc to get the correct values
      const { recommendation, suggestion, cta, _id } = data._doc;

      const resultContent = `
          <div class="result">
            <p><strong>Recommendation:</strong> ${recommendation}</p>
            <p><strong>Suggestion:</strong> ${suggestion}</p>
            <p><strong>Call to Action:</strong> ${cta}</p>
          </div>
        `;

      // Insert the result content into the result div
      document.getElementById("result").innerHTML = resultContent;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    // Display error message if fetching data fails
    Swal.fire({
      icon: "error",
      title: "Error Fetching Results",
      text: error.message,
    });
  }
});
