const guidanceForm = document.getElementById("businessGuidance");

guidanceForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  let savedEntries =
    JSON.parse(localStorage.getItem("businessGuidanceEntries")) || [];
  let newEntry = {};

  Array.from(guidanceForm.elements).forEach((input) => {
    if (input.type !== "submit") {
      newEntry[input.name] = input.value;
    }
  });

  savedEntries.push(newEntry);
  localStorage.setItem("businessGuidanceEntries", JSON.stringify(savedEntries));

  console.log("Raw form data:", newEntry);

  // Map frontend field values to backend expected numbers
  const mappedData = {
    stageOfBusiness: mapStageOfBusiness(newEntry.businessGuidance),
    monthlyProfitStatus: mapMonthlyProfitStatus(newEntry.monthlyProfit),
    monthlyCustomerCount: mapCustomerCount(newEntry.customerCount),
    repeatCustomerLevel: mapRepeatCustomerLevel(newEntry.repeatCustomers),
    currentChallenge: mapCurrentChallenge(newEntry.mainChallenge),
  };

  const applicantid = localStorage.getItem("userId");
  const applicationid = localStorage.getItem("applicationid");

  try {
    const response = await fetch(
      `http://localhost:3000/api/bedaytak/service/business-guide/${applicantid}/${applicationid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedData),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Submission failed");
    }

    Swal.fire({
      icon: "success",
      title: "Business Guidance Form Submitted!",
      text: "You will be redirected to the results page.",
      showConfirmButton: false,
      timer: 1500, // Optional: Shows the success message for a few seconds before redirect
    }).then(() => {
      // Redirect to the results page after a successful submission
      window.location.href = "../business-guidance-results.html";
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Submission Error",
      text: error.message,
    });
  }
});

// Mappings for frontend string values to backend numbers
function mapStageOfBusiness(value) {
  const mapping = {
    just_idea: 1,
    started: 2,
    running_awhile: 3,
  };
  return mapping[value] || null;
}

function mapMonthlyProfitStatus(value) {
  const mapping = {
    no_profit: 1,
    small_inconsistent: 2,
    steady_profit: 3,
  };
  return mapping[value] || null;
}

function mapCustomerCount(value) {
  const mapping = {
    "0-10": 1,
    "10-100": 2,
    "100+": 3,
  };
  return mapping[value] || null;
}

function mapRepeatCustomerLevel(value) {
  const mapping = {
    none: 1,
    some: 2,
    regular: 3,
  };
  return mapping[value] || null;
}

function mapCurrentChallenge(value) {
  const mapping = {
    funding: 1,
    operations: 2,
    marketing: 3,
    not_sure: 4,
  };
  return mapping[value] || null;
}
