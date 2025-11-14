
let currentStep = 1;

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthBar = document.getElementById('strengthBar');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('emailError');
const form = document.getElementById('registerForm');

// Step navigation functions
function nextStep(step) {
    // Validate current step before proceeding
    if (currentStep === 1) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!email || !password || !confirmPassword) {
            alert('Please fill in all required fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
    }

    if (currentStep === 2) {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const community = document.getElementById('community').value;

        if (!firstName || !lastName || !community) {
            alert('Please fill in all required fields');
            return;
        }

        // Update review information
        updateReview();
    }

    // Update step indicators
    document.getElementById('step' + currentStep).classList.remove('active');
    document.querySelectorAll('.step')[currentStep - 1].classList.add('completed');
    document.querySelectorAll('.step')[currentStep - 1].classList.remove('active');

    currentStep = step;

    document.getElementById('step' + currentStep).classList.add('active');
    document.querySelectorAll('.step')[currentStep - 1].classList.add('active');

    // Scroll to top of form
    document.querySelector('.register-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function prevStep(step) {
    document.getElementById('step' + currentStep).classList.remove('active');
    document.querySelectorAll('.step')[currentStep - 1].classList.remove('active');
    
    currentStep = step;
    
    document.getElementById('step' + currentStep).classList.add('active');
    document.querySelectorAll('.step')[currentStep - 1].classList.add('active');
    document.querySelectorAll('.step')[currentStep - 1].classList.remove('completed');

    // Scroll to top of form
    document.querySelector('.register-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateReview() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value || 'Not provided';
    const community = document.getElementById('community').value;

    document.getElementById('reviewEmail').textContent = email;
    document.getElementById('reviewName').textContent = `${firstName} ${lastName}`;
    document.getElementById('reviewPhone').textContent = phone;
    document.getElementById('reviewCommunity').textContent = community.charAt(0).toUpperCase() + community.slice(1);
}

// Password strength checker
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    strengthBar.className = 'password-strength-bar';
    
    if (strength === 1) {
        strengthBar.classList.add('strength-weak');
    } else if (strength === 2 || strength === 3) {
        strengthBar.classList.add('strength-medium');
    } else if (strength === 4) {
        strengthBar.classList.add('strength-strong');
    }
});

// Password match checker
confirmPasswordInput.addEventListener('input', function() {
    if (this.value !== passwordInput.value && this.value.length > 0) {
        passwordError.classList.add('show');
        this.style.borderColor = '#ff4444';
    } else {
        passwordError.classList.remove('show');
        this.style.borderColor = '#e0e0e0';
    }
});

// Email validation
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value) && this.value.length > 0) {
        emailError.classList.add('show');
        this.style.borderColor = '#ff4444';
    } else {
        emailError.classList.remove('show');
        this.style.borderColor = '#e0e0e0';
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const terms = document.getElementById('terms').checked;
    if (!terms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        community: document.getElementById('community').value
    };

    // Add your registration logic here
    console.log('Registration data:', formData);
    alert('Registration successful! Welcome to OnBoard!');
});

// Input animations
const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateX(5px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateX(0)';
    });
});
