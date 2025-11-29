//FORM SUBMISSION//
emailjs.init("-ZXim7GAqQMk64Fb9");

function sendMail() {
  // Get field values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const company = document.getElementById("company").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation check
  if (!name || !email || !company || !phone || !message) {
    alert("Please fill out all required fields before submitting.");
    return; // stop the function — email will NOT send
  }

  // Prepare data
  let params = {
    name: name.toUpperCase(),
    email: email,
    company: company,
    phone: phone,
    message: message,
  };

  // Send email
  emailjs
    .send("service_ay516vs", "template_k5kp2qx", params)
    .then(() => {
      alert("Your message has been sent!");
      document.querySelector(".cta-form").reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again.");
    });
}


// Auto-close navbar on link click (mobile)
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbar = document.getElementById("nav");
    const instance = bootstrap.Collapse.getInstance(navbar);
    if (instance) instance.hide();
  });
});

// Year auto-update
document.getElementById("year").textContent = new Date().getFullYear();

// Toast setup
const toast = new bootstrap.Toast(document.getElementById("copyToast"), {
  delay: 2000,
});

// Handle copy-to-clipboard for desktop
function handleContactClick(event) {
  const number = this.dataset.number;
  const isDesktop = window.matchMedia("(min-width: 992px)").matches;

  if (isDesktop) {
    event.preventDefault();
    navigator.clipboard.writeText(number).then(() => toast.show());
  } else {
    this.href = "tel:" + number.replace(/\s+/g, "");
  }
}

document.querySelectorAll(".contact-link[data-number]").forEach((link) => {
  link.addEventListener("click", handleContactClick);
});

// Fix phone link on resize
window.addEventListener("resize", () => {
  if (!window.matchMedia("(min-width: 992px)").matches) {
    document.querySelectorAll(".contact-link[data-number]").forEach((link) => {
      link.href = "tel:" + link.dataset.number.replace(/\s+/g, "");
    });
  }
});

