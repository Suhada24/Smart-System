/**
 * Smart University LMS - System Settings API
 * This file contains functions for interacting with the system settings API
 */

// System Settings API Endpoints
const API_ENDPOINTS = {
    // In a real application, these would be actual API endpoints
    SETTINGS: '/api/settings',
    DEFAULT_SETTINGS: '/api/settings/defaults',
};

// Default settings - used when resetting to defaults
const DEFAULT_SETTINGS = {
    general: {
        siteTitle: 'Smart University LMS',
        siteDescription: 'A comprehensive learning management system for educational institutions',
        adminEmail: 'admin@smartuniversity.edu',
        supportEmail: 'support@smartuniversity.edu',
        timezone: 'UTC-05:00',
        dateFormat: 'MM/DD/YYYY'
    },
    appearance: {
        primaryColor: '#1a237e',
        secondaryColor: '#f57c00',
        accentColor: '#2e7d32',
        defaultTheme: 'light',
        fontFamily: "'Poppins', sans-serif",
        enableUserThemeSwitching: true
    },
    emailTemplates: {
        welcome: {
            subject: 'Welcome to {site_name}',
            content: 'Hello {user_name},\n\nWelcome to {site_name}! Your account has been created successfully.\n\nYou can now login at {login_url} using your email address: {user_email}\n\nIf you have any questions, please contact our support team.\n\nRegards,\n{site_name} Team'
        },
        passwordReset: {
            subject: 'Password Reset Request',
            content: 'Hello {user_name},\n\nWe received a request to reset your password for your {site_name} account. Click the link below to reset your password:\n\n{reset_url}\n\nIf you did not request a password reset, please ignore this email or contact support if you have concerns.\n\nRegards,\n{site_name} Team'
        },
        accountActivation: {
            subject: 'Activate Your {site_name} Account',
            content: 'Hello {user_name},\n\nThank you for registering with {site_name}. Please click the link below to activate your account:\n\n{activation_url}\n\nIf you have any questions, please contact our support team.\n\nRegards,\n{site_name} Team'
        },
        courseEnrollment: {
            subject: 'Course Enrollment Confirmation',
            content: 'Hello {user_name},\n\nYou have been successfully enrolled in {course_name}.\n\nYou can access your course materials by logging in at {login_url} and visiting your dashboard.\n\nIf you have any questions, please contact your instructor.\n\nRegards,\n{site_name} Team'
        },
        assignment: {
            subject: 'New Assignment: {assignment_name}',
            content: 'Hello {user_name},\n\nA new assignment "{assignment_name}" has been posted for your course "{course_name}".\n\nDue Date: {due_date}\n\nPlease log in to your account to view the details and submit your work.\n\nRegards,\n{site_name} Team'
        }
    }
};

/**
 * Initialize system settings functionality
 */
function initSystemSettings() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize color pickers
    initColorPickers();
    
    // Load settings
    loadSettings();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Form submission
    const settingsForm = document.getElementById('systemSettingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
    
    // Reset to defaults button
    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all settings to default values? This cannot be undone.')) {
                resetToDefaults();
            }
        });
    }
    
    // Reset form button (clears form without saving)
    const resetFormBtn = document.getElementById('resetFormBtn');
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset the form? All unsaved changes will be lost.')) {
                loadSettings(); // Reload current settings
            }
        });
    }

    // Save button in header
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            saveSettings();
        });
    }

    // Email template tabs (ensure proper tab switching)
    const emailTemplatesList = document.getElementById('emailTemplatesList');
    if (emailTemplatesList) {
        emailTemplatesList.addEventListener('click', function(e) {
            e.preventDefault();
            if (e.target.classList.contains('list-group-item')) {
                // Remove active class from all tabs
                document.querySelectorAll('#emailTemplatesList .list-group-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                // Show corresponding content
                const targetId = e.target.getAttribute('href');
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                document.querySelector(targetId).classList.add('show', 'active');
            }
        });
    }

    // Color input change handlers to update color previews
    document.getElementById('primaryColor').addEventListener('input', function() {
        document.getElementById('primaryColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('secondaryColor').addEventListener('input', function() {
        document.getElementById('secondaryColorPreview').style.backgroundColor = this.value;
    });
    
    document.getElementById('accentColor').addEventListener('input', function() {
        document.getElementById('accentColorPreview').style.backgroundColor = this.value;
    });
}

/**
 * Initialize color pickers
 */
function initColorPickers() {
    // Using Bootstrap Color Picker
    $('#primaryColor').colorpicker({
        format: 'hex',
        container: true,
        inline: false,
        useAlpha: false
    }).on('colorpickerChange', function(e) {
        document.getElementById('primaryColorPreview').style.backgroundColor = e.color.toString();
    });
    
    $('#secondaryColor').colorpicker({
        format: 'hex',
        container: true,
        inline: false,
        useAlpha: false
    }).on('colorpickerChange', function(e) {
        document.getElementById('secondaryColorPreview').style.backgroundColor = e.color.toString();
    });
    
    $('#accentColor').colorpicker({
        format: 'hex',
        container: true,
        inline: false,
        useAlpha: false
    }).on('colorpickerChange', function(e) {
        document.getElementById('accentColorPreview').style.backgroundColor = e.color.toString();
    });
}

/**
 * Load settings from the API
 */
function loadSettings() {
    showSpinner();
    
    // In a real app, this would fetch settings from the API
    // fetch(API_ENDPOINTS.SETTINGS)
    //     .then(response => response.json())
    //     .then(data => {
    //         populateForm(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading settings:', error);
    //         showAlert('error', 'Failed to load settings. Please try again.');
    //     })
    //     .finally(() => {
    //         hideSpinner();
    //     });
    
    // For this example, we'll use the default settings
    setTimeout(() => {
        populateForm(DEFAULT_SETTINGS);
        hideSpinner();
    }, 800);
}

/**
 * Populate form with settings
 * @param {Object} settings Settings object
 */
function populateForm(settings) {
    // General settings
    document.getElementById('siteTitle').value = settings.general.siteTitle;
    document.getElementById('siteDescription').value = settings.general.siteDescription;
    document.getElementById('adminEmail').value = settings.general.adminEmail;
    document.getElementById('supportEmail').value = settings.general.supportEmail;
    document.getElementById('timezone').value = settings.general.timezone;
    document.getElementById('dateFormat').value = settings.general.dateFormat;
    
    // Appearance settings
    document.getElementById('primaryColor').value = settings.appearance.primaryColor;
    document.getElementById('primaryColorPreview').style.backgroundColor = settings.appearance.primaryColor;
    document.getElementById('secondaryColor').value = settings.appearance.secondaryColor;
    document.getElementById('secondaryColorPreview').style.backgroundColor = settings.appearance.secondaryColor;
    document.getElementById('accentColor').value = settings.appearance.accentColor;
    document.getElementById('accentColorPreview').style.backgroundColor = settings.appearance.accentColor;
    document.getElementById('defaultTheme').value = settings.appearance.defaultTheme;
    document.getElementById('fontFamily').value = settings.appearance.fontFamily;
    document.getElementById('enableUserThemeSwitching').checked = settings.appearance.enableUserThemeSwitching;
    
    // Email templates
    document.getElementById('welcomeEmailSubject').value = settings.emailTemplates.welcome.subject;
    document.getElementById('welcomeEmailContent').value = settings.emailTemplates.welcome.content;
    document.getElementById('passwordResetSubject').value = settings.emailTemplates.passwordReset.subject;
    document.getElementById('passwordResetContent').value = settings.emailTemplates.passwordReset.content;
    document.getElementById('accountActivationSubject').value = settings.emailTemplates.accountActivation.subject;
    document.getElementById('accountActivationContent').value = settings.emailTemplates.accountActivation.content;
    document.getElementById('courseEnrollmentSubject').value = settings.emailTemplates.courseEnrollment.subject;
    document.getElementById('courseEnrollmentContent').value = settings.emailTemplates.courseEnrollment.content;
    document.getElementById('assignmentSubject').value = settings.emailTemplates.assignment.subject;
    document.getElementById('assignmentContent').value = settings.emailTemplates.assignment.content;

    // Reinitialize colorpickers to sync their internal state
    $('#primaryColor').colorpicker('setValue', settings.appearance.primaryColor);
    $('#secondaryColor').colorpicker('setValue', settings.appearance.secondaryColor);
    $('#accentColor').colorpicker('setValue', settings.appearance.accentColor);
}

/**
 * Save settings to the API
 */
function saveSettings() {
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Collect form data
    const settings = collectFormData();
    
    showSpinner();
    
    // In a real app, this would save settings to the API
    // fetch(API_ENDPOINTS.SETTINGS, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(settings),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         showAlert('success', 'Settings saved successfully!');
    //     })
    //     .catch(error => {
    //         console.error('Error saving settings:', error);
    //         showAlert('error', 'Failed to save settings. Please try again.');
    //     })
    //     .finally(() => {
    //         hideSpinner();
    //     });
    
    // For this example, we'll simulate the API call
    setTimeout(() => {
        hideSpinner();
        showAlert('success', 'Settings saved successfully!');
    }, 800);
}

/**
 * Reset settings to defaults
 */
function resetToDefaults() {
    showSpinner();
    
    // In a real app, this would reset settings to defaults via the API
    // fetch(API_ENDPOINTS.DEFAULT_SETTINGS, {
    //     method: 'POST',
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         populateForm(data);
    //         showAlert('success', 'Settings reset to defaults successfully!');
    //     })
    //     .catch(error => {
    //         console.error('Error resetting settings:', error);
    //         showAlert('error', 'Failed to reset settings. Please try again.');
    //     })
    //     .finally(() => {
    //         hideSpinner();
    //     });
    
    // For this example, we'll use the default settings
    setTimeout(() => {
        populateForm(DEFAULT_SETTINGS);
        hideSpinner();
        showAlert('success', 'Settings reset to defaults successfully!');
    }, 800);
}

/**
 * Validate the form
 * @returns {boolean} True if form is valid
 */
function validateForm() {
    const form = document.getElementById('systemSettingsForm');
    
    // Clear previous validation
    form.classList.remove('was-validated');
    
    // Check HTML5 validation
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        showAlert('error', 'Please fix the validation errors before saving.');
        return false;
    }
    
    // Additional custom validation if needed
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate email fields
    const adminEmail = document.getElementById('adminEmail').value;
    if (!emailPattern.test(adminEmail)) {
        document.getElementById('adminEmail').classList.add('is-invalid');
        showAlert('error', 'Please enter a valid admin email address.');
        return false;
    }
    
    const supportEmail = document.getElementById('supportEmail').value;
    if (!emailPattern.test(supportEmail)) {
        document.getElementById('supportEmail').classList.add('is-invalid');
        showAlert('error', 'Please enter a valid support email address.');
        return false;
    }
    
    // Validate color values (should be hex codes)
    const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    
    const primaryColor = document.getElementById('primaryColor').value;
    if (!hexColorPattern.test(primaryColor)) {
        document.getElementById('primaryColor').classList.add('is-invalid');
        showAlert('error', 'Please enter a valid hex color code for primary color.');
        return false;
    }
    
    const secondaryColor = document.getElementById('secondaryColor').value;
    if (!hexColorPattern.test(secondaryColor)) {
        document.getElementById('secondaryColor').classList.add('is-invalid');
        showAlert('error', 'Please enter a valid hex color code for secondary color.');
        return false;
    }
    
    const accentColor = document.getElementById('accentColor').value;
    if (!hexColorPattern.test(accentColor)) {
        document.getElementById('accentColor').classList.add('is-invalid');
        showAlert('error', 'Please enter a valid hex color code for accent color.');
        return false;
    }
    
    return true;
}

/**
 * Collect form data
 * @returns {Object} Settings object
 */
function collectFormData() {
    return {
        general: {
            siteTitle: document.getElementById('siteTitle').value,
            siteDescription: document.getElementById('siteDescription').value,
            adminEmail: document.getElementById('adminEmail').value,
            supportEmail: document.getElementById('supportEmail').value,
            timezone: document.getElementById('timezone').value,
            dateFormat: document.getElementById('dateFormat').value
        },
        appearance: {
            primaryColor: document.getElementById('primaryColor').value,
            secondaryColor: document.getElementById('secondaryColor').value,
            accentColor: document.getElementById('accentColor').value,
            defaultTheme: document.getElementById('defaultTheme').value,
            fontFamily: document.getElementById('fontFamily').value,
            enableUserThemeSwitching: document.getElementById('enableUserThemeSwitching').checked
        },
        emailTemplates: {
            welcome: {
                subject: document.getElementById('welcomeEmailSubject').value,
                content: document.getElementById('welcomeEmailContent').value
            },
            passwordReset: {
                subject: document.getElementById('passwordResetSubject').value,
                content: document.getElementById('passwordResetContent').value
            },
            accountActivation: {
                subject: document.getElementById('accountActivationSubject').value,
                content: document.getElementById('accountActivationContent').value
            },
            courseEnrollment: {
                subject: document.getElementById('courseEnrollmentSubject').value,
                content: document.getElementById('courseEnrollmentContent').value
            },
            assignment: {
                subject: document.getElementById('assignmentSubject').value,
                content: document.getElementById('assignmentContent').value
            }
        }
    };
}

/**
 * Show a spinner
 */
function showSpinner() {
    const spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.classList.add('active');
    }
}

/**
 * Hide the spinner
 */
function hideSpinner() {
    const spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.classList.remove('active');
    }
}

/**
 * Show an alert message
 * @param {string} type Alert type (success, error, warning, info)
 * @param {string} message Message to display
 */
function showAlert(type, message) {
    const alertsContainer = document.getElementById('alertsContainer');
    
    // Map type to Bootstrap alert class
    const alertClass = type === 'error' ? 'danger' : type;
    
    // Create alert element
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${alertClass} alert-dismissible fade show settings-alert`;
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add alert to container
    alertsContainer.appendChild(alertElement);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        const bootstrapAlert = bootstrap.Alert.getOrCreateInstance(alertElement);
        bootstrapAlert.close();
    }, 5000);
} 