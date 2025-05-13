document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");
  const paymentSection = document.getElementById("paymentSection");
  const radioFree = document.getElementById("freeTrial");
  const radioFull = document.getElementById("fullPayment");

  const cardFields = {
    number: form.querySelector('input[name="cardNumber"]'),
    expiry: form.querySelector('input[name="expiry"]'),
    cvc: form.querySelector('input[name="cvc"]'),
  };

  // Get service from URL
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get("service");
  console.log(service);

  function togglePaymentFields() {
    const isFull = radioFull.checked;
    paymentSection.style.display = isFull ? "block" : "none";

    Object.values(cardFields).forEach((field) => {
      field.disabled = !isFull;
      field.required = isFull;
    });
  }

  radioFree.addEventListener("change", togglePaymentFields);
  radioFull.addEventListener("change", togglePaymentFields);
  togglePaymentFields();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const paymentType = form.querySelector(
      'input[name="paymentType"]:checked'
    ).value;
    const billingCycle = form.billingCycle.value;
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();

    const paymentData = {
      plan: paymentType,
      billingCycle,
      fullName,
      email,
      cardInfo:
        paymentType === "Full Payment"
          ? {
              cardNumber: cardFields.number.value.trim(),
              expiry: cardFields.expiry.value.trim(),
              cvc: cardFields.cvc.value.trim(),
            }
          : null,
      date: new Date().toLocaleString(),
      service: service,
    };

    // Save payment data to localStorage
    const allPayments =
      JSON.parse(localStorage.getItem("paymentRecords")) || [];
    allPayments.push(paymentData);
    localStorage.setItem("paymentRecords", JSON.stringify(allPayments));

    form.reset();
    togglePaymentFields();

    // If service is businessCounsultant, show sweetalert notification
    if (service === "businessCounsultant") {
      Swal.fire({
        icon: "success",
        title: "Sent Successfully",
        text: "We'll be reaching out soon to guide you forward..",
        confirmButtonText: "OK",
      }).then(() => {
        // After user clicks OK, redirect to result page
        window.location.href = `home.html`;
      });
    } else {
      // Redirect directly if it's not businessCounsultant
      if (service) {
        window.location.href = `${service}-result.html`;
      } else {
        window.location.href = "home.html";
      }
    }
  });
});