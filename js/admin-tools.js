/**
 * Smart University LMS - Admin Tools JavaScript
 * Shared functionality for admin tools and pages
 */

/**
 * Initialize all admin page components
 */
function initAdminTools() {
  // Initialize all components when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initAdminDataTables();
    initAdminTooltips();
    initAdminToasts();
    initAdminDropdowns();
    initAdminForms();
  });
}

/**
 * Initialize and configure data tables
 */
function initAdminDataTables() {
  const adminTables = document.querySelectorAll('.admin-table');
  if (adminTables.length === 0) return;

  adminTables.forEach(table => {
    // Add sorting functionality
    const headers = table.querySelectorAll('th[data-sortable="true"]');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const columnIndex = Array.from(header.parentNode.children).indexOf(header);
        const isAscending = header.classList.contains('sort-asc');
        
        // Update sort direction indicators
        headers.forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
        });
        
        header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
        
        // Sort the table (would be replaced with actual sorting logic)
        console.log(`Sorting column ${columnIndex} in ${isAscending ? 'descending' : 'ascending'} order`);
      });
    });

    // Handle selection of multiple rows (for bulk actions)
    const selectAllCheckbox = table.querySelector('th input[type="checkbox"]');
    if (selectAllCheckbox) {
      const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
      
      selectAllCheckbox.addEventListener('change', () => {
        rowCheckboxes.forEach(checkbox => {
          checkbox.checked = selectAllCheckbox.checked;
          updateRowSelection(checkbox);
        });
        updateBulkActionButtons();
      });
      
      rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          updateRowSelection(checkbox);
          updateSelectAllCheckbox();
          updateBulkActionButtons();
        });
      });
    }
  });
}

/**
 * Update the visual selection state of a table row
 */
function updateRowSelection(checkbox) {
  const row = checkbox.closest('tr');
  if (checkbox.checked) {
    row.classList.add('selected-row');
  } else {
    row.classList.remove('selected-row');
  }
}

/**
 * Update the state of the "select all" checkbox
 */
function updateSelectAllCheckbox() {
  const table = document.querySelector('.admin-table');
  if (!table) return;
  
  const selectAllCheckbox = table.querySelector('th input[type="checkbox"]');
  const rowCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
  
  if (selectAllCheckbox && rowCheckboxes.length > 0) {
    const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
    const someChecked = Array.from(rowCheckboxes).some(cb => cb.checked);
    
    selectAllCheckbox.checked = allChecked;
    selectAllCheckbox.indeterminate = someChecked && !allChecked;
  }
}

/**
 * Update the state of bulk action buttons based on selections
 */
function updateBulkActionButtons() {
  const bulkActions = document.querySelector('.bulk-actions');
  if (!bulkActions) return;
  
  const selectedRows = document.querySelectorAll('.admin-table tbody input[type="checkbox"]:checked').length;
  
  if (selectedRows > 0) {
    bulkActions.classList.add('active');
    const countSpan = bulkActions.querySelector('.selected-count');
    if (countSpan) {
      countSpan.textContent = selectedRows;
    }
  } else {
    bulkActions.classList.remove('active');
  }
}

/**
 * Initialize tooltips for admin interfaces
 */
function initAdminTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      const tooltipText = element.getAttribute('data-tooltip');
      
      const tooltip = document.createElement('div');
      tooltip.className = 'admin-tooltip';
      tooltip.textContent = tooltipText;
      
      document.body.appendChild(tooltip);
      
      const rect = element.getBoundingClientRect();
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
      tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
      
      element.addEventListener('mouseleave', () => {
        tooltip.remove();
      }, { once: true });
    });
  });
}

/**
 * Initialize toast notifications
 */
function initAdminToasts() {
  // Set up toast container if it doesn't exist
  if (!document.getElementById('toast-container')) {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, warning, info)
 * @param {number} duration - How long to display the toast in ms
 */
function showToast(message, type = 'info', duration = 3000) {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  
  let icon = 'info';
  switch (type) {
    case 'success': icon = 'check_circle'; break;
    case 'error': icon = 'error'; break;
    case 'warning': icon = 'warning'; break;
  }
  
  toast.innerHTML = `
    <span class="material-icons">${icon}</span>
    <div class="toast-message">${message}</div>
    <button class="toast-close"><span class="material-icons">close</span></button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Add animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Set up auto dismiss
  const timeoutId = setTimeout(() => {
    dismissToast(toast);
  }, duration);
  
  // Set up manual dismiss
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(timeoutId);
    dismissToast(toast);
  });
}

/**
 * Dismiss a toast notification with animation
 */
function dismissToast(toast) {
  toast.classList.remove('show');
  toast.classList.add('hide');
  
  toast.addEventListener('transitionend', () => {
    toast.remove();
  }, { once: true });
}

/**
 * Initialize dropdown menus
 */
function initAdminDropdowns() {
  const dropdownToggles = document.querySelectorAll('.admin-dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdownMenu = toggle.nextElementSibling;
      dropdownMenu.classList.toggle('show');
      
      // Close when clicking outside
      const closeDropdown = (event) => {
        if (!dropdownMenu.contains(event.target) && event.target !== toggle) {
          dropdownMenu.classList.remove('show');
          document.removeEventListener('click', closeDropdown);
        }
      };
      
      document.addEventListener('click', closeDropdown);
    });
  });
}

/**
 * Initialize admin forms with validation
 */
function initAdminForms() {
  const adminForms = document.querySelectorAll('.admin-form');
  
  adminForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const isValid = validateForm(form);
      
      if (!isValid) {
        e.preventDefault();
        showToast('Please correct the errors in the form', 'error');
      } else {
        // For demo purposes, prevent form submission and show success toast
        e.preventDefault();
        showToast('Form submitted successfully', 'success');
        
        // In real implementation, the form would be submitted or 
        // an AJAX request would be sent to the server
      }
    });
    
    // Live validation as users type
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
    });
  });
}

/**
 * Validate a form
 * @returns {boolean} Whether the form is valid
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input, select, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateInput(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Validate a single input
 * @returns {boolean} Whether the input is valid
 */
function validateInput(input) {
  if (!input.hasAttribute('required') && input.value === '') {
    clearInputError(input);
    return true;
  }
  
  if (input.hasAttribute('required') && input.value === '') {
    setInputError(input, 'This field is required');
    return false;
  }
  
  if (input.type === 'email' && input.value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      setInputError(input, 'Please enter a valid email address');
      return false;
    }
  }
  
  clearInputError(input);
  return true;
}

/**
 * Set an error message on an input
 */
function setInputError(input, message) {
  const formGroup = input.closest('.admin-form-group');
  
  if (formGroup) {
    formGroup.classList.add('has-error');
    
    let errorMessage = formGroup.querySelector('.error-message');
    
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      formGroup.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
  }
}

/**
 * Clear any error message on an input
 */
function clearInputError(input) {
  const formGroup = input.closest('.admin-form-group');
  
  if (formGroup) {
    formGroup.classList.remove('has-error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// Initialize admin tools when script is loaded
initAdminTools(); 