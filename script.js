document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');

  // Event listener for switching between login and signup forms
  loginTab.addEventListener('click', function () {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  });

  signupTab.addEventListener('click', function () {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  });

  // Event listener for login form submission
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send a POST request to your Java backend for login
    fetch('/login?username=' + username + '&password=' + password, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Login successful, you can redirect the user or show a success message
          alert('Login successful!');
          // You can redirect the user to another page using window.location.href
        } else {
          // Authentication failed, display an error message
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any network or server errors
      });
  });

  // Event listener for signup form submission
  signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Send a POST request to your Java backend for registration
    fetch('/register?email=' + email + '&newUsername=' + newUsername + '&newPassword=' + newPassword, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Registration successful, you can redirect the user or show a success message
          alert('Registration successful! You can now log in.');
          // You can redirect the user to the login page or switch to the login tab
          loginTab.click(); // Switch to the login tab
        } else {
          // Registration failed, display an error message
          alert('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any network or server errors
      });
  });
});
