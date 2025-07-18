document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
    // 2. Smooth Scrolling for Navigation Links
    // ----------------------------------------------------
    document.querySelectorAll('nav a[href^="#"], .cta-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            // Get the target section's ID from the href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Use scrollIntoView for smooth scrolling
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // ----------------------------------------------------
    // 3. Contact Form Validation
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    // Function to show an error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block'; // Make the error message visible
    }

    // Function to hide an error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none'; // Hide the error message
    }

    // Email validation regex (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true; // Flag to track overall form validity

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.');
            isValid = false;
        } else {
            hideError(nameError);
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError(emailError);
        }

        // Validate Message
        if (messageTextarea.value.trim() === '') {
            showError(messageError, 'Message cannot be empty.');
            isValid = false;
        } else if (messageTextarea.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters long.');
            isValid = false;
        } else {
            hideError(messageError);
        }

        // If all validations pass
        if (isValid) {
            // In a real application, you would send the form data to a server here.
            // For now, we'll just show a success message and clear the form.

            formSuccessMessage.textContent = 'Message sent successfully!';
            formSuccessMessage.style.display = 'block';
            formSuccessMessage.style.color = '#4CAF50'; // Green color for success

            // Clear the form fields
            contactForm.reset();

            // Hide success message after a few seconds
            setTimeout(() => {
                formSuccessMessage.textContent = '';
                formSuccessMessage.style.display = 'none';
            }, 5000); // 5 seconds
        } else {
            // If validation failed, ensure success message is hidden
            formSuccessMessage.textContent = '';
            formSuccessMessage.style.display = 'none';
        }
    });

    // Optional: Clear errors when user types (real-time validation feedback)
    nameInput.addEventListener('input', () => hideError(nameError));
    emailInput.addEventListener('input', () => hideError(emailError));
    messageTextarea.addEventListener('input', () => hideError(messageError));

});