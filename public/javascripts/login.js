
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
    