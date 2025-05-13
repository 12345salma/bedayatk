const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const appId = localStorage.getItem("applicationid");

document
  .getElementById("estimatorForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form input values
    const marketingBudget = parseFloat(
      document.getElementById("marketingBudget").value
    );
    const costPerClick = parseFloat(
      document.getElementById("costPerView").value
    );
    const conversionRate = parseFloat(
      document.getElementById("conversionRate").value
    );
    const distributionChannelSelect =
      document.getElementById("sales-channels").value;

    // Convert readable values to match schema
    let distributionChannel;
    if (distributionChannelSelect === "online") {
      distributionChannel = "online ecommerce";
    } else if (distributionChannelSelect === "offline") {
      distributionChannel = "offline retail";
    } else if (distributionChannelSelect === "both") {
      distributionChannel = "both";
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/bedaytak/service/marketing-estimator-service/${userId}/${appId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            monthlyBudget: marketingBudget,
            costPerClick: costPerClick,
            conversionRate: conversionRate,
            distributionChannel: distributionChannel,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Marketing Estimator data submitted successfully.",
          icon: "success",
          confirmButtonText: "View Results",
        }).then(() => {
          window.location.href = "../marketing-results.html";
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Network or server error. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Submission error:", error);
    }
  });
