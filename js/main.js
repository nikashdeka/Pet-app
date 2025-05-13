import { enableValidation, handleFormSubmit } from "./form-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  const isPetFormPage = document.getElementById("registerBtn") !== null;
  const isContinuePage = document.getElementById("continue-to-buy") !== null;

  if (isPetFormPage) {
    const form = document.querySelector("#petForm");
    const registerBtn = document.querySelector("#registerBtn");
    const registrationPage = document.getElementById("registration-page");
    const insuranceLanding = document.getElementById("insurance-landing");
    const photoPreview = document.getElementById("photoPreview");
    const petPhotosInput = document.getElementById("petPhotos");
    const fileCount = document.getElementById("fileCount");

    enableValidation("#petForm", "#registerBtn");

    petPhotosInput.addEventListener("change", () => {
      const files = petPhotosInput.files;
      fileCount.textContent =
        files.length > 0
          ? `${files.length} file(s) selected`
          : "No files chosen";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const petData = Object.fromEntries(formData.entries());
      localStorage.setItem("petInfo", JSON.stringify(petData));

      // Show photo preview
      photoPreview.innerHTML = "";
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
      insuranceLanding.style.display = "block";

      attachPlanCardListeners();
    });

    function attachPlanCardListeners() {
      const planCards = document.querySelectorAll(".plan-card");
      planCards.forEach((card) => {
        card.addEventListener("click", () => {
          const selectedPlan = card.querySelector("h3").innerText;
          localStorage.setItem("selectedPlan", selectedPlan);
          window.location.href = `confirm.html?plan=${encodeURIComponent(
            selectedPlan
          )}`;
        });
      });
    }
  }

  if (isContinuePage) {
    enableValidation("#petForm", "#continue-to-buy");
    handleFormSubmit("#petForm", "additionalPetInfo", "confirm.html");
  }
});
