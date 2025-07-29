/**
 * Smart University LMS - User Management API
 * This file contains functions for interacting with the user management API
 */

// User Management API Endpoints
const API_ENDPOINTS = {
    // In a real application, these would be actual API endpoints
    USERS: '/api/users',
    USER: '/api/users/{id}',
};

// Global variables for pagination and filtering
let currentPage = 1;
const itemsPerPage = 10;
let totalUsers = 0;
let filteredUsers = [];
let allUsers = [];

/**
 * Initializes the user management functionality
 */
function initUserManagement() {
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadUsers();
}

/**
 * Set up all event listeners for the user management page
 */
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('userSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterUsers();
        });
    }
    
    // Role filter
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            filterUsers();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterUsers();
        });
    }
    
    // Save user button
    const saveUserBtn = document.getElementById('saveUserBtn');
    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', function() {
            saveUser();
        });
    }
    
    // Handle pagination
    const pagination = document.getElementById('userPagination');
    if (pagination) {
        pagination.addEventListener('click', function(e) {
            if (e.target.classList.contains('page-link')) {
                e.preventDefault();
                const pageText = e.target.textContent;
                
                if (pageText === '«') {
                    // Previous page
                    if (currentPage > 1) {
                        changePage(currentPage - 1);
                    }
                } else if (pageText === '»') {
                    // Next page
                    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
                    if (currentPage < totalPages) {
                        changePage(currentPage + 1);
                    }
                } else {
                    // Specific page number
                    const pageNum = parseInt(pageText);
                    if (!isNaN(pageNum)) {
                        changePage(pageNum);
                    }
                }
            }
        });
    }
    
    // Form validation
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser();
        });
    }
    
    // Delete confirmation
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const userId = document.getElementById('deleteUserId').value;
            if (userId) {
                deleteUser(userId);
            }
        });
    }
    
    // Handle modal events
    const createUserModal = document.getElementById('createUserModal');
    if (createUserModal) {
        createUserModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            
            // Check if this is an edit or create operation
            if (button && button.getAttribute('data-action') === 'edit') {
                const userId = button.getAttribute('data-user-id');
                if (userId) {
                    loadUserForEdit(userId);
                }
            } else {
                // Reset form for new user
                resetUserForm();
            }
        });
    }
}

/**
 * Load users from the API
 */
async function loadUsers() {
    try {
        showLoading();
        
        // In a real app, this would be a fetch call to the API
        // fetch(API_ENDPOINTS.USERS)
        //     .then(response => response.json())
        //     .then(data => {
        //         allUsers = data;
        //         filteredUsers = [...allUsers];
        //         totalUsers = allUsers.length;
        //         renderUsers();
        //     })
        //     .catch(error => {
        //         console.error('Error loading users:', error);
        //         showErrorMessage('Failed to load users. Please try again.');
        //     })
        //     .finally(() => {
        //         hideLoading();
        //     });
        
        // For this example, we'll create some mock data
        setTimeout(() => {
            allUsers = generateMockUsers(35);
            filteredUsers = [...allUsers];
            totalUsers = allUsers.length;
            renderUsers();
            updatePagination();
            hideLoading();
        }, 800);
    } catch (error) {
        console.error('Error loading users:', error);
        hideLoading();
    }
}

/**
 * Generate mock user data for demonstration
 * @param {number} count Number of users to generate
 * @returns {Array} Array of user objects
 */
function generateMockUsers(count = 20) {
    const roles = ['admin', 'teacher', 'student', 'parent'];
    const statuses = ['active', 'inactive', 'pending'];
    const users = [];
    
    for (let i = 1; i <= count; i++) {
        const roleIndex = Math.floor(Math.random() * roles.length);
        const statusIndex = Math.floor(Math.random() * statuses.length);
        const randomDays = Math.floor(Math.random() * 30);
        
        users.push({
            id: i,
            name: `User ${i}`,
            email: `user${i}@smartuniversity.edu`,
            role: roles[roleIndex],
            status: statuses[statusIndex],
            lastLogin: randomDays === 0 ? 'Today' : 
                       randomDays === 1 ? 'Yesterday' : 
                       `${randomDays} days ago`
        });
    }
    
    return users;
}

/**
 * Render users to the table
 */
function renderUsers() {
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get users for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredUsers.length);
    const usersToDisplay = filteredUsers.slice(startIndex, endIndex);
    
    // Update showing count
    document.getElementById('showingUsers').textContent = 
        filteredUsers.length > 0 ? 
            `${startIndex + 1}-${endIndex}` : 
            '0-0';
            
    document.getElementById('totalUsers').textContent = filteredUsers.length;
    
    // Generate table rows
    if (usersToDisplay.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    <p class="text-muted mb-0">No users found matching your filters.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    usersToDisplay.forEach((user, index) => {
        const row = document.createElement('tr');
        
        // Format role for display
        const roleFormatted = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="${getUserAvatar(user)}" class="user-avatar me-3" alt="${user.name}">
                    <div>
                        <div class="fw-semibold">${user.name}</div>
                    </div>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="badge role-badge role-${user.role}">${roleFormatted}</span></td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="status-indicator status-${user.status}"></span>
                    ${capitalizeFirstLetter(user.status)}
                </div>
            </td>
            <td>${user.lastLogin}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-2" data-action="edit" data-user-id="${user.id}" data-bs-toggle="modal" data-bs-target="#createUserModal">
                    <span class="material-icons" style="font-size: 18px;">edit</span>
                </button>
                <button class="btn btn-sm btn-outline-danger" data-action="delete" data-user-id="${user.id}" data-user-name="${user.name}" onclick="prepareUserDelete(${user.id}, '${user.name}')">
                    <span class="material-icons" style="font-size: 18px;">delete</span>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

/**
 * Generate a placeholder avatar URL based on user information
 * @param {Object} user User object
 * @returns {string} Avatar URL
 */
function getUserAvatar(user) {
    // In a real app, you might have actual avatar URLs
    // For this example, we'll use placeholder images
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`;
}

/**
 * Filter users based on search input and filters
 */
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    // Reset to page 1 when filtering
    currentPage = 1;
    
    // Apply filters
    filteredUsers = allUsers.filter(user => {
        // Search term filter
        const matchesSearch = 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm);
        
        // Role filter
        const matchesRole = roleFilter ? user.role === roleFilter : true;
        
        // Status filter
        const matchesStatus = statusFilter ? user.status === statusFilter : true;
        
        return matchesSearch && matchesRole && matchesStatus;
    });
    
    // Re-render the table with filtered data
    renderUsers();
    updatePagination();
}

/**
 * Update pagination based on filtered users
 */
function updatePagination() {
    const pagination = document.getElementById('userPagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
    // Clear existing page items except first and last (prev/next buttons)
    const pageItems = pagination.querySelectorAll('.page-item');
    for (let i = 1; i < pageItems.length - 1; i++) {
        pageItems[i].remove();
    }
    
    // Get prev/next buttons
    const prevBtn = pagination.querySelector('.page-item:first-child');
    const nextBtn = pagination.querySelector('.page-item:last-child');
    
    // Update prev/next button states
    prevBtn.classList.toggle('disabled', currentPage === 1);
    nextBtn.classList.toggle('disabled', currentPage === totalPages || totalPages === 0);
    
    // Create page number buttons
    for (let i = totalPages; i >= 1; i--) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item${currentPage === i ? ' active' : ''}`;
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        
        // Insert after prev button
        pagination.insertBefore(pageItem, prevBtn.nextSibling);
    }
}

/**
 * Change the current page
 * @param {number} page Page number
 */
function changePage(page) {
    currentPage = page;
    renderUsers();
    updatePagination();
}

/**
 * Load a user for editing
 * @param {string|number} userId User ID
 */
function loadUserForEdit(userId) {
    // In a real app, this would fetch the user data from the API
    // fetch(`${API_ENDPOINTS.USER.replace('{id}', userId)}`)
    //     .then(response => response.json())
    //     .then(user => populateUserForm(user))
    //     .catch(error => {
    //         console.error('Error loading user:', error);
    //         showErrorMessage('Failed to load user details.');
    //     });
    
    // For this example, we'll find the user in our local data
    const user = allUsers.find(u => u.id == userId);
    if (user) {
        populateUserForm(user);
    }
}

/**
 * Populate the user form with data for editing
 * @param {Object} user User object
 */
function populateUserForm(user) {
    document.getElementById('createUserModalLabel').textContent = 'Edit User';
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userRole').value = user.role;
    document.getElementById('userStatus').value = user.status;
    
    // Hide password fields for editing
    const passwordFields = document.querySelectorAll('.password-fields');
    passwordFields.forEach(field => {
        field.style.display = 'none';
    });
}

/**
 * Reset the user form for creating a new user
 */
function resetUserForm() {
    document.getElementById('createUserModalLabel').textContent = 'Add New User';
    document.getElementById('userId').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userRole').value = '';
    document.getElementById('userStatus').value = 'active';
    document.getElementById('userPassword').value = '';
    document.getElementById('userPasswordConfirm').value = '';
    
    // Show password fields for new users
    const passwordFields = document.querySelectorAll('.password-fields');
    passwordFields.forEach(field => {
        field.style.display = 'block';
    });
    
    // Clear validation errors
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
}

/**
 * Save a user (create or update)
 */
function saveUser() {
    // Get form data
    const userId = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const role = document.getElementById('userRole').value;
    const status = document.getElementById('userStatus').value;
    const password = document.getElementById('userPassword').value;
    const passwordConfirm = document.getElementById('userPasswordConfirm').value;
    
    // Validate form
    if (!validateUserForm(userId, name, email, role, status, password, passwordConfirm)) {
        return;
    }
    
    // Create user object
    const userData = {
        name,
        email,
        role,
        status
    };
    
    // Add password for new users
    if (!userId) {
        userData.password = password;
    }
    
    showLoading();
    
    // Determine if this is a create or update operation
    if (userId) {
        // Update existing user
        updateUser(userId, userData);
    } else {
        // Create new user
        createUser(userData);
    }
}

/**
 * Validate the user form
 * @returns {boolean} True if form is valid, false otherwise
 */
function validateUserForm(userId, name, email, role, status, password, passwordConfirm) {
    let isValid = true;
    
    // Reset validation
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
    
    // Validate name
    if (!name.trim()) {
        document.getElementById('userName').classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate email
    if (!email.trim() || !isValidEmail(email)) {
        document.getElementById('userEmail').classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate role
    if (!role) {
        document.getElementById('userRole').classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate password fields for new users
    if (!userId) {
        if (!password || password.length < 8) {
            document.getElementById('userPassword').classList.add('is-invalid');
            isValid = false;
        }
        
        if (password !== passwordConfirm) {
            document.getElementById('userPasswordConfirm').classList.add('is-invalid');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Check if an email is valid
 * @param {string} email Email address
 * @returns {boolean} True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Create a new user
 * @param {Object} userData User data
 */
function createUser(userData) {
    // In a real app, this would be a fetch POST call to the API
    // fetch(API_ENDPOINTS.USERS, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         hideLoading();
    //         // Close modal
    //         const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
    //         modal.hide();
    //         // Refresh user list
    //         loadUsers();
    //         // Show success message
    //         showSuccessMessage('User created successfully');
    //     })
    //     .catch(error => {
    //         hideLoading();
    //         console.error('Error creating user:', error);
    //         showErrorMessage('Failed to create user. Please try again.');
    //     });
    
    // For this example, we'll simulate the API call
    setTimeout(() => {
        // Generate new user ID
        const newId = allUsers.length > 0 ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;
        
        // Create new user object
        const newUser = {
            id: newId,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            status: userData.status,
            lastLogin: 'Never'
        };
        
        // Add to users array
        allUsers.push(newUser);
        
        // Refresh filtered users
        filterUsers();
        
        // Hide loading and modal
        hideLoading();
        const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
        modal.hide();
        
        // Show success message
        showSuccessToast('User created successfully');
    }, 800);
}

/**
 * Update an existing user
 * @param {string|number} userId User ID
 * @param {Object} userData User data
 */
function updateUser(userId, userData) {
    // In a real app, this would be a fetch PUT call to the API
    // fetch(`${API_ENDPOINTS.USER.replace('{id}', userId)}`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         hideLoading();
    //         // Close modal
    //         const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
    //         modal.hide();
    //         // Refresh user list
    //         loadUsers();
    //         // Show success message
    //         showSuccessMessage('User updated successfully');
    //     })
    //     .catch(error => {
    //         hideLoading();
    //         console.error('Error updating user:', error);
    //         showErrorMessage('Failed to update user. Please try again.');
    //     });
    
    // For this example, we'll simulate the API call
    setTimeout(() => {
        // Find user in array
        const userIndex = allUsers.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
            // Update user data, preserving the id and lastLogin
            allUsers[userIndex] = {
                ...allUsers[userIndex],
                name: userData.name,
                email: userData.email,
                role: userData.role,
                status: userData.status
            };
            
            // Refresh filtered users
            filterUsers();
            
            // Hide loading and modal
            hideLoading();
            const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
            modal.hide();
            
            // Show success message
            showSuccessToast('User updated successfully');
        }
    }, 800);
}

/**
 * Prepare user deletion
 * @param {string|number} userId User ID
 * @param {string} userName User name
 */
function prepareUserDelete(userId, userName) {
    document.getElementById('deleteUserId').value = userId;
    document.getElementById('deleteUserName').textContent = userName;
    
    // Show modal
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    deleteModal.show();
}

/**
 * Delete a user
 * @param {string|number} userId User ID
 */
function deleteUser(userId) {
    showLoading();
    
    // In a real app, this would be a fetch DELETE call to the API
    // fetch(`${API_ENDPOINTS.USER.replace('{id}', userId)}`, {
    //     method: 'DELETE'
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to delete user');
    //         }
    //         return response.json();
    //     })
    //     .then(() => {
    //         hideLoading();
    //         // Close modal
    //         const modal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    //         modal.hide();
    //         // Refresh user list
    //         loadUsers();
    //         // Show success message
    //         showSuccessMessage('User deleted successfully');
    //     })
    //     .catch(error => {
    //         hideLoading();
    //         console.error('Error deleting user:', error);
    //         // Close modal
    //         const modal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    //         modal.hide();
    //         // Show error message
    //         showErrorMessage('Failed to delete user. Please try again.');
    //     });
    
    // For this example, we'll simulate the API call
    setTimeout(() => {
        // Remove user from array
        allUsers = allUsers.filter(u => u.id != userId);
        
        // Refresh filtered users
        filterUsers();
        
        // Hide loading and modal
        hideLoading();
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
        modal.hide();
        
        // Show success message
        showSuccessToast('User deleted successfully');
    }, 800);
}

/**
 * Show a success toast message
 * @param {string} message Message to display
 */
function showSuccessToast(message) {
    // In a real application, you might have a toast component
    // For this example, we'll use a temporary alert
    alert(message);
}

/**
 * Show a loading spinner
 */
function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.visibility = 'visible';
        loadingOverlay.classList.add('active');
    }
}

/**
 * Hide the loading spinner
 */
function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
        setTimeout(() => {
            loadingOverlay.style.visibility = 'hidden';
        }, 300);
    }
}

/**
 * Capitalize the first letter of a string
 * @param {string} string String to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 