// script.js
const form = document.getElementById("petForm");
const registerBtn = document.getElementById("registerBtn");
const petPhotosInput = form.querySelector("input[type='file']");
const registrationPage = document.getElementById("registration-page");
const landingPage = document.getElementById("insurance-landing");
const photoPreview = document.getElementById("photoPreview");

const sumInsuredSelect = document.getElementById("sumInsuredSelect");
const premiumCalc = document.getElementById("premiumCalc");
const sumInsuredInput = document.getElementById("sumInsuredInput");
const calculateBtn = document.getElementById("calculateBtn");
const premiumResult = document.getElementById("premiumResult");

// Enable register button only if form is valid and 3 photos are uploaded
form.addEventListener("input", () => {
  const isValid = form.checkValidity();
  const photos = petPhotosInput.files;
  registerBtn.disabled = !(isValid && photos.length === 3);
});

const fileInput = document.getElementById("petPhotos");
const fileCount = document.getElementById("fileCount");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    fileCount.textContent = `${fileInput.files.length} file(s) selected`;
  } else {
    fileCount.textContent = "No files chosen";
  }
});

// Handle registration and transition to landing page
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Preview uploaded pet photos
  Array.from(petPhotosInput.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      photoPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  registrationPage.style.display = "none";
  landingPage.style.display = "block";
  attachPlanCardListeners();
});

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

// Navigate to payment page on plan card click
// Attach plan card click handlers after showing the landing page
function attachPlanCardListeners() {
  const planCards = document.querySelectorAll(".plan-card");
  planCards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedPlan = card.querySelector("h3").innerText;
      window.location.href = `payment.html?plan=${encodeURIComponent(
        selectedPlan
      )}`;
    });
  });
}

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
