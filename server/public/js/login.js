document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  const togglePassword = document.querySelector('.toggle-password');
  const password = document.querySelector('#password');
  
  if (togglePassword && password) {
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.querySelector('i').classList.toggle('fa-eye');
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }
  
  // Auto-hide alerts after 5 seconds
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.opacity = '0';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 500);
    }, 5000);
  });
});
