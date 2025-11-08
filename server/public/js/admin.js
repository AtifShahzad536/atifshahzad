/**
 * Admin Dashboard - Main JavaScript
 * Handles common functionality across the admin panel
 */

document.addEventListener('DOMContentLoaded', function() {
  // Enable Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Enable Bootstrap popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Auto-hide alerts after 5 seconds
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 5000);
  });

  // Toggle sidebar on mobile
  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
  }

  // Set active state on sidebar items
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      // Also activate parent collapse if exists
      const parentCollapse = link.closest('.collapse');
      if (parentCollapse) {
        parentCollapse.classList.add('show');
        const parentLink = document.querySelector(`[data-bs-target="#${parentCollapse.id}"]`);
        if (parentLink) {
          parentLink.classList.add('active');
          parentLink.setAttribute('aria-expanded', 'true');
        }
      }
    }
  });

  // Toggle password visibility
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // Handle form submissions with fetch API
  document.querySelectorAll('form[data-ajax="true"]').forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      try {
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Processing...';
        
        const formData = new FormData(this);
        const response = await fetch(this.action, {
          method: this.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (response.ok) {
          // Show success message
          showAlert('success', result.message || 'Operation completed successfully!');
          
          // Redirect if specified
          if (result.redirect) {
            setTimeout(() => {
              window.location.href = result.redirect;
            }, 1500);
          }
          
          // Reset form if needed
          if (this.dataset.reset === 'true') {
            this.reset();
          }
        } else {
          // Show error message
          showAlert('danger', result.message || 'An error occurred. Please try again.');
          
          // Show form errors if any
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, messages]) => {
              const input = this.querySelector(`[name="${field}"]`);
              if (input) {
                const feedback = input.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                  feedback.textContent = Array.isArray(messages) ? messages[0] : messages;
                  input.classList.add('is-invalid');
                }
              }
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
        showAlert('danger', 'An unexpected error occurred. Please try again.');
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    });
  });

  // Handle delete confirmations
  document.querySelectorAll('[data-confirm]').forEach(button => {
    button.addEventListener('click', function(e) {
      if (!confirm(this.dataset.confirm)) {
        e.preventDefault();
      }
    });
  });

  // Initialize DataTables if present
  if (window.jQuery && window.$.fn.DataTable) {
    $('.datatable').DataTable({
      responsive: true,
      stateSave: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search...",
      },
      dom: '<"d-flex justify-content-between align-items-center mb-3"f<"ms-3"l>>rt<"d-flex justify-content-between align-items-center mt-3"ip>',
      initComplete: function() {
        // Add custom classes to DataTables elements
        $('.dataTables_filter input').addClass('form-control form-control-sm');
        $('.dataTables_length select').addClass('form-select form-select-sm');
      }
    });
  }
});

/**
 * Show a bootstrap alert message
 * @param {string} type - Alert type (success, danger, warning, info)
 * @param {string} message - Message to display
 * @param {number} [timeout=5000] - Time in ms before auto-hiding (0 to disable)
 */
function showAlert(type, message, timeout = 5000) {
  const alertHtml = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  
  // Try to find alerts container, otherwise prepend to the main content
  let container = document.getElementById('alerts-container') || document.querySelector('main');
  if (!container) container = document.body;
  
  // Create a temporary container to parse HTML
  const temp = document.createElement('div');
  temp.innerHTML = alertHtml.trim();
  const alertElement = temp.firstChild;
  
  // Insert the alert
  container.insertBefore(alertElement, container.firstChild);
  
  // Auto-hide after timeout if specified
  if (timeout > 0) {
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alertElement);
      bsAlert.close();
    }, timeout);
  }
  
  return alertElement;
}

/**
 * Format bytes to human-readable format
 * @param {number} bytes - File size in bytes
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted file size
 */
function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Make functions available globally
window.showAlert = showAlert;
window.formatFileSize = formatFileSize;
window.debounce = debounce;
