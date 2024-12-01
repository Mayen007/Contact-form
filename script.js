document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Reset all previous states
  clearErrors();
  hideConfirmationMessage();

  // Validate all fields
  const isFormValid = validateForm();

  // If the form is valid, show confirmation and reset fields
  if (isFormValid) {
    showConfirmationMessage();
    event.target.reset();
  }
});

function clearErrors() {
  // Hide all error messages and reset input borders
  document.querySelectorAll('.error-message').forEach((error) => {
    error.style.display = 'none';
  });
  document.querySelectorAll('input, textarea').forEach((field) => {
    field.style.borderColor = 'var(--grey-500)';
    field.classList.remove('input-error');
  });
}

function validateForm() {
  let isValid = true;

  // Validate each field individually
  if (!validateField('first-name')) isValid = false;
  if (!validateField('last-name')) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validateQueryType()) isValid = false;
  if (!validateMessage()) isValid = false;
  if (!validateConsent()) isValid = false;

  return isValid;
}

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  const error = field.closest('.form-field').querySelector('.error-message');

  if (!field.value.trim()) {
    error.style.display = 'block';
    field.style.borderColor = 'var(--red)';
    return false;
  }
  return true;
}

function validateEmail() {
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const error = email.nextElementSibling;

  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    error.style.display = 'block';
    email.classList.add('input-error');
    return false;
  }
  return true;
}

function validateQueryType() {
  const queryType = document.querySelector('input[name="query-type"]:checked');
  const error = document.querySelector('.radio-group + .error-message');

  if (!queryType) {
    error.style.display = 'block';
    return false;
  }
  return true;
}

function validateMessage() {
  const message = document.getElementById('message');
  const error = message.nextElementSibling;

  if (!message.value.trim()) {
    error.style.display = 'block';
    message.classList.add('input-error');
    return false;
  }
  return true;
}

function validateConsent() {
  const consent = document.getElementById('consent');
  const error = consent.closest('.consent').nextElementSibling;

  if (!consent.checked) {
    error.style.display = 'block';
    return false;
  }
  return true;
}

function showConfirmationMessage() {
  const confirmationMessage = document.getElementById('confirmation-message');
  confirmationMessage.style.display = 'block';

  // Automatically hide the message after 5 seconds
  setTimeout(() => {
    hideConfirmationMessage();
  }, 5000);
}

function hideConfirmationMessage() {
  document.getElementById('confirmation-message').style.display = 'none';
}
