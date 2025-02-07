// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

// FAQ Search
const faqSearch = document.getElementById("faqSearch");
const faqItems = document.querySelectorAll(".faq-item");

faqSearch.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  faqItems.forEach((item) => {
    const question = item
      .querySelector(".faq-question span")
      .textContent.toLowerCase();
    const answer = item
      .querySelector(".faq-answer p")
      .textContent.toLowerCase();

    if (question.includes(searchTerm) || answer.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Support Form
const supportForm = document.getElementById("supportForm");

supportForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    files: document.getElementById("fileUpload").files,
  };

  // Here you would typically send the form data to your server
  console.log("Form submitted:", formData);

  // Reset form
  supportForm.reset();
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.querySelector(".file-upload").addEventListener("click", function () {
  this.querySelector("input[type='file']").click();
});

/* an event listener for toggling the display of the .file-upload status div when the file is uploaded or not*/
document.querySelector(".file-upload").addEventListener("change", function () {
  const fileInput = this.querySelector("input[type='file']");
  const statusDiv = document.querySelector(".file-icon");
  if (fileInput.files.length > 0) {
    statusDiv.style.display = "block";
    /* adding a close button to the status div positioned at the top right and associating and event listener to remove the file in the upload field when clicking it */
    statusDiv.style.position = "relative";
    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.classList.add("btn-danger");
    closeButton.classList.add("bg-danger");
    closeButton.style.position = "absolute";
    closeButton.style.top = "-5px";
    closeButton.style.right = "-5px";
    closeButton.addEventListener("click", function () {
      fileInput.value = "";
      statusDiv.style.display = "none";
    });
    statusDiv.appendChild(closeButton);
  } else {
    statusDiv.style.display = "none";
  }
});
