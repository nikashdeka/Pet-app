// /js/form-handler.js
export function enableValidation(formSelector, buttonSelector) {
  const form = document.querySelector(formSelector);
  const button = document.querySelector(buttonSelector);

  function updateState() {
    const isValid = form.checkValidity();
    button.disabled = !isValid;
    button.classList.toggle("enabled", isValid);
  }

  form.addEventListener("input", updateState);
  form.addEventListener("change", updateState);
  updateState();
}

export function handleFormSubmit(formSelector, storageKey, redirectUrl) {
  const form = document.querySelector(formSelector);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    localStorage.setItem(storageKey, JSON.stringify(dataObj));
    window.location.href = redirectUrl;
  });
}
