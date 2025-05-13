const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const contactData = {
    
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
    date: new Date().toLocaleString()
  };

  const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
  messages.push(contactData);
  localStorage.setItem("contactMessages", JSON.stringify(messages));

//   alert("Your message has been saved!");
//   form.reset();
});