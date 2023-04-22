function validateForm() {
    // Select the form element
    const form = document.querySelector('form');
  
    // Add a submit event listener to the form
    form.addEventListener('submit', (event) => {
      // Prevent the default form submission
      event.preventDefault();
  
      // Select the input fields
      const fullNameInput = document.querySelector('#fname');
      const emailInput = document.querySelector('#field_email');
      const usernameInput = document.querySelector('#username');
      const phoneInput = document.querySelector('#phone');
      const passwordInput = document.querySelector('#password');
      const roleInput = document.querySelector('input[name="role"]:checked');
  
      // Define regular expressions for validation
      const nameRegex = /^[A-Za-z\s]+$/;
      const emailRegex = /^\S+@\S+\.\S+$/;
      const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
      const phoneRegex = /^[0-9]{10}$/;
  
      // Validate the full name input
      if (!fullNameInput.value.match(nameRegex)) {
        alert('Please enter a valid full name');
        fullNameInput.focus();
        return false;
      }
  
      // Validate the email input
      if (!emailInput.value.match(emailRegex)) {
        alert('Please enter a valid email address');
        emailInput.focus();
        return false;
      }
  
      // Validate the username input
      if (!usernameInput.value.match(usernameRegex)) {
        alert('Please enter a valid username (alphanumeric with optional spaces, hyphens or underscores)');
        usernameInput.focus();
        return false;
      }
  
      // Validate the phone number input
      if (!phoneInput.value.match(phoneRegex)) {
        alert('Please enter a valid phone number (10 digits only)');
        phoneInput.focus();
        return false;
      }
  
      // Validate the password input
      if (passwordInput.value.length < 8) {
        alert('Please enter a password with at least 8 characters');
        passwordInput.focus();
        return false;
      }
  
      // Validate the role input
      if (!roleInput) {
        alert('Please select a role');
        return false;
      }
  
      // Submit the form if all inputs are valid
      form.submit();
    });
  }function validateForm() {
    // Select the form element
    const form = document.querySelector('form');
  
    // Add a submit event listener to the form
    form.addEventListener('submit', (event) => {
      // Prevent the default form submission
      event.preventDefault();
  
      // Select the input fields
      const fullNameInput = document.querySelector('#fname');
      const emailInput = document.querySelector('#field_email');
      const usernameInput = document.querySelector('#username');
      const phoneInput = document.querySelector('#phone');
      const passwordInput = document.querySelector('#password');
      const roleInput = document.querySelector('input[name="role"]:checked');
  
      // Define regular expressions for validation
      const nameRegex = /^[A-Za-z\s]+$/;
      const emailRegex = /^\S+@\S+\.\S+$/;
      const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
      const phoneRegex = /^[0-9]{10}$/;
  
      // Validate the full name input
      if (!fullNameInput.value.match(nameRegex)) {
        alert('Please enter a valid full name');
        fullNameInput.focus();
        return false;
      }
  
      // Validate the email input
      if (!emailInput.value.match(emailRegex)) {
        alert('Please enter a valid email address');
        emailInput.focus();
        return false;
      }
  
      // Validate the username input
      if (!usernameInput.value.match(usernameRegex)) {
        alert('Please enter a valid username (alphanumeric with optional spaces, hyphens or underscores)');
        usernameInput.focus();
        return false;
      }
  
      // Validate the phone number input
      if (!phoneInput.value.match(phoneRegex)) {
        alert('Please enter a valid phone number (10 digits only)');
        phoneInput.focus();
        return false;
      }
  
      // Validate the password input
      if (passwordInput.value.length < 8) {
        alert('Please enter a password with at least 8 characters');
        passwordInput.focus();
        return false;
      }
  
      // Validate the role input
      if (!roleInput) {
        alert('Please select a role');
        return false;
      }
  
      // Submit the form if all inputs are valid
      form.submit();
    });
  }
  