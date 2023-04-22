function validateForm() {
    // Select the form element
    const form = document.querySelector('form');
  
    // Add a submit event listener to the form
    form.addEventListener('submit', (event) => {
      // Prevent the default form submission
      event.preventDefault();
  
      // Select the input fields
      const usernameInput = document.querySelector('#username');
      const passwordInput = document.querySelector('#password');
  
      // Define regular expressions for validation
      const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

  
      // Validate the username input
      if (!usernameInput.value.match(usernameRegex)) {
        alert('Please enter a valid username (alphanumeric with optional spaces, hyphens or underscores)');
        usernameInput.focus();
        return false;
      }
  
      // Validate the password input
      if (passwordInput.value.length < 8) {
        alert('Please enter a password with at least 8 characters');
        passwordInput.focus();
        return false;
      }
  
      // Submit the form if all inputs are valid
      form.submit();
    });
  }
  