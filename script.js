// This script handles the form validation, file upload, and navigation between pages
// for a pet insurance registration process. It includes features like  photo upload,
// premium calculation, and plan selection. The script uses event listeners to manage
const form = document.getElementById("petForm");
const isRegistrationPage =
  document.getElementById("registration-page") !== null;
const isContinueButton = document.getElementById("continue-to-buy") !== null;

// user interactions and dynamically updates the UI based on user input.
// ===========================================
if (isRegistrationPage) {
  const registerBtn = document.getElementById("registerBtn");
  const petPhotosInput = form.querySelector("input[type='file']");
  const fileInput = document.getElementById("petPhotos");
  const fileCount = document.getElementById("fileCount");
  const registrationPage = document.getElementById("registration-page");
  const landingPage = document.getElementById("insurance-landing");
  const photoPreview = document.getElementById("photoPreview");

  // Enable button only when form is valid and 3 photos uploaded
  // Update the button state based on form validity and file selection
  function updateRegisterButton() {
    const isValid = form.checkValidity();
    const photos = petPhotosInput.files;
    registerBtn.disabled = !(isValid && photos.length === 3);
  }

  // Add event listeners to the form and file input elements
  form.addEventListener("input", updateRegisterButton);
  fileInput.addEventListener("change", () => {
    const count = fileInput.files.length;
    fileCount.textContent =
      count > 0 ? `${count} file(s) selected` : "No files chosen";
    updateRegisterButton();
  });

  // Handle file upload and preview
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Display uploaded images in the preview section
    Array.from(petPhotosInput.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        photoPreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
    // Hide the registration page and show the landing page
    registrationPage.style.display = "none";
    landingPage.style.display = "block";
    attachPlanCardListeners();
  });

  // Handle plan card selection
  // Attach click event listeners to plan cards to navigate to the next page
  // when a plan is selected
  function attachPlanCardListeners() {
    const planCards = document.querySelectorAll(".plan-card");
    planCards.forEach((card) => {
      card.addEventListener("click", () => {
        const selectedPlan = card.querySelector("h3").innerText;
        window.location.href = `confirm.html?plan=${encodeURIComponent(
          selectedPlan
        )}`;
      });
    });
  }
}

// ===========================================

// const planCards = document.querySelectorAll(".plan-card");
// planCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     const selectedPlan = card.querySelector("h3").innerText;
//     // You can pass the selected plan to the payment page via query string or storage
//     window.location.href = `payment.html?plan=${encodeURIComponent(
//       selectedPlan
//     )}`;
//   });
// });

// ________________________________________________

// const form = document.getElementById("petForm");
// const registerBtn = document.getElementById("registerBtn");
// const petPhotosInput = form.querySelector("input[type='file']");
// const registrationPage = document.getElementById("registration-page");
// const landingPage = document.getElementById("insurance-landing");
// const photoPreview = document.getElementById("photoPreview");

// const sumInsuredSelect = document.getElementById("sumInsuredSelect");
// const premiumCalc = document.getElementById("premiumCalc");
// const sumInsuredInput = document.getElementById("sumInsuredInput");
// const calculateBtn = document.getElementById("calculateBtn");
// const premiumResult = document.getElementById("premiumResult");

// // Enable button only when form is valid and 3 photos uploaded
// form.addEventListener("input", () => {
//   const isValid = form.checkValidity();
//   const photos = petPhotosInput.files;
//   registerBtn.disabled = !(isValid && photos.length === 3);
// });

// const fileInput = document.getElementById("petPhotos");
// const fileCount = document.getElementById("fileCount");

// fileInput.addEventListener("change", () => {
//   if (fileInput.files.length > 0) {
//     fileCount.textContent = `${fileInput.files.length} file(s) selected`;
//   } else {
//     fileCount.textContent = "No files chosen";
//   }
// });

// // Handle registration
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Display uploaded images
//   Array.from(petPhotosInput.files).forEach((file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = document.createElement("img");
//       img.src = e.target.result;
//       photoPreview.appendChild(img);
//     };
//     reader.readAsDataURL(file);
//   });

//   registrationPage.style.display = "none";
//   landingPage.style.display = "block";
// });

// // Show premium calculator on sum insured select
// sumInsuredSelect.addEventListener("change", () => {
//   if (sumInsuredSelect.value) {
//     premiumCalc.style.display = "block";
//     sumInsuredInput.value = sumInsuredSelect.value;
//   } else {
//     premiumCalc.style.display = "none";
//   }
// });

// // Calculate premium (simulate API)
// calculateBtn.addEventListener("click", () => {
//   const sumInsured = parseInt(sumInsuredInput.value);
//   if (!isNaN(sumInsured)) {
//     // Simulate calling rating engine
//     const premium = (sumInsured * 0.05).toFixed(2); // e.g., 5% rate
//     premiumResult.textContent = `Estimated Premium: ₹${premium}`;
//   } else {
//     premiumResult.textContent = `Enter a valid Sum Insured amount.`;
//   }
// });

const sumInsuredSelect = document.getElementById("sumInsuredSelect");
const premiumCalc = document.getElementById("premiumCalc");
const sumInsuredInput = document.getElementById("sumInsuredInput");
const calculateBtn = document.getElementById("calculateBtn");
const premiumResult = document.getElementById("premiumResult");
// Show premium calculator when sum insured is selected
sumInsuredSelect.addEventListener("change", () => {
  if (sumInsuredSelect.value) {
    premiumCalc.style.display = "block";
    sumInsuredInput.value = sumInsuredSelect.value;
  } else {
    premiumCalc.style.display = "none";
  }
});

// Simulate premium calculation
calculateBtn.addEventListener("click", () => {
  const sumInsured = parseInt(sumInsuredInput.value);
  if (!isNaN(sumInsured)) {
    const premium = (sumInsured * 0.05).toFixed(2);
    premiumResult.textContent = `Estimated Premium: ₹${premium}`;
  } else {
    premiumResult.textContent = `Enter a valid Sum Insured amount.`;
  }
});

// ===========================================
function selectPlan(plan) {
  localStorage.setItem("selectedPlan", plan);
  localStorage.setItem("productType", "shop");
  window.location.href =
    "additional-data-form.html?product=shop&plan=" + encodeURIComponent(plan);
}

// Auto-wrap second column of each row in <code>
document.querySelectorAll(".plan-card table tr").forEach((row) => {
  const cells = row.querySelectorAll("td");
  if (cells.length === 2 && !cells[1].querySelector("code")) {
    const value = cells[1].innerHTML.trim();
    cells[1].innerHTML = `<code>${value}</code>`;
  }
});
