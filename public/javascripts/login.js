// Toggle between login and signup forms
document.getElementById('showSignup').onclick = (e) => {
    e.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
};

// Show login form
document.getElementById('showLogin').onclick = (e) => {
    e.preventDefault();
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
};

// Handle Login Form Submission
document.getElementById('loginFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get CSRF token from cookie (csrf-sync uses cookies)
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1];
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            window.location.href = '/dashboard';  // CHANGED: Removed console.log, just redirect
        } else {
            // Error - show error message
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Handle Signup Form Submission
document.getElementById('signupFormElement').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Get CSRF token from cookie (csrf-sync uses cookies)
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrfToken='))
        ?.split('=')[1];
    
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Success - show message and switch to login
            alert('Account created successfully! Please login.');  // CHANGED: Removed console.log
            // Switch to login form
            document.getElementById('signupForm').classList.remove('active');
            document.getElementById('loginForm').classList.add('active');
            // Clear signup form
            document.getElementById('signupFormElement').reset();
        } else {
            // Error - show error message
            alert(data.message || 'Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});