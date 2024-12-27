// Select the toggle button element by its ID
const toggleModeButton = document.getElementById('toggleMode');

// Add a click event listener to the button
toggleModeButton.addEventListener('click', function () {
  // Reference the body element
  const body = document.body;

  // Check if the body currently has the 'light-mode' class
  if (body.classList.contains('light-mode')) {
    // Switch to dark mode
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');

    // Update button text to indicate switching back to light mode
    this.textContent = 'Switch to Light Mode';
  } else {
    // Switch to light mode
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');

    // Update button text to indicate switching back to dark mode
    this.textContent = 'Switch to Dark Mode';
  }
});

