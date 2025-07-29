/**
 * Smart University LMS - Notifications API
 * This file contains functions for interacting with the notifications API
 */

// API Endpoints
const API_ENDPOINTS = {
    // In a real application, these would be actual API endpoints
    NOTIFICATIONS: '/api/notifications',
    NOTIFICATION_READ: '/api/notifications/read',
    NOTIFICATION_DELETE: '/api/notifications/delete',
    NOTIFICATION_READ_ALL: '/api/notifications/read-all',
    NOTIFICATION_DELETE_BULK: '/api/notifications/delete-bulk',
    NOTIFICATION_COUNT: '/api/notifications/count',
};

// Global variables to store notifications state
let allNotifications = []; // All loaded notifications
let filteredNotifications = []; // Notifications after applying filters
let currentPage = 1;
let itemsPerPage = 10;
let totalPages = 1;
let currentFilters = {
    type: 'all',
    status: 'all',
    search: ''
};

// Notification icons by type
const NOTIFICATION_ICONS = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    danger: 'error'
};

/**
 * Initialize Notifications Center
 */
function initNotificationsCenter() {
    // Set up event listeners
    setupEventListeners();
    
    // Load notifications
    loadNotifications();
    
    // Start real-time notification polling
    startNotificationPolling();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Mark all as read button
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllAsRead);
    }
    
    // Refresh notifications button
    const refreshBtn = document.getElementById('refreshNotificationsBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            loadNotifications();
        });
    }
    
    // Type filter
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            currentFilters.type = this.value;
            applyFilters();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            currentFilters.status = this.value;
            applyFilters();
        });
    }
    
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.getElementById('searchNotifications');
            currentFilters.search = searchInput.value.trim();
            applyFilters();
        });
    }
    
    // Search input (search on Enter)
    const searchInput = document.getElementById('searchNotifications');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                currentFilters.search = this.value.trim();
                applyFilters();
            }
        });
    }
    
    // Select all button
    const selectAllBtn = document.getElementById('selectAllBtn');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', toggleSelectAll);
    }
    
    // Bulk mark as read button
    const bulkMarkReadBtn = document.getElementById('bulkMarkReadBtn');
    if (bulkMarkReadBtn) {
        bulkMarkReadBtn.addEventListener('click', markSelectedAsRead);
    }
    
    // Bulk delete button
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    if (bulkDeleteBtn) {
        bulkDeleteBtn.addEventListener('click', deleteSelectedNotifications);
    }
}

/**
 * Load notifications from API
 */
function loadNotifications() {
    showSpinner();
    
    // Clear previous data
    allNotifications = [];
    filteredNotifications = [];
    
    // In a real app, this would fetch from the API
    // fetch(API_ENDPOINTS.NOTIFICATIONS)
    //     .then(response => response.json())
    //     .then(data => {
    //         allNotifications = data;
    //         filteredNotifications = [...allNotifications];
    //         
    //         // Apply filters and render
    //         applyFilters();
    //         updateCounts();
    //     })
    //     .catch(error => {
    //         console.error('Error loading notifications:', error);
    //         showEmptyState();
    //     })
    //     .finally(() => {
    //         hideSpinner();
    //     });
    
    // For this example, we'll use mock data
    setTimeout(() => {
        allNotifications = generateMockNotifications(25);
        filteredNotifications = [...allNotifications];
        
        // Apply filters and render
        applyFilters();
        updateCounts();
        hideSpinner();
    }, 800);
}

/**
 * Generate mock notifications for testing
 * @param {number} count Number of notifications to generate
 * @returns {Array} Array of notification objects
 */
function generateMockNotifications(count = 10) {
    const types = ['info', 'success', 'warning', 'danger'];
    const notifications = [];
    const currentDate = new Date();
    
    const titles = [
        'New User Registration',
        'Course Content Published',
        'Assignment Submission',
        'System Update',
        'Payment Received',
        'Storage Limit Warning',
        'Login Attempt',
        'Password Changed',
        'Account Verification',
        'Report Generated'
    ];
    
    const messages = [
        'A new user has registered on the platform.',
        'New course content has been published and is awaiting approval.',
        'A student has submitted an assignment for review.',
        'The system has been updated to the latest version.',
        'Payment has been successfully processed.',
        'You are approaching your storage limit. Consider upgrading your plan.',
        'Multiple failed login attempts detected from a new location.',
        'Your password has been successfully changed.',
        'A new account is waiting for email verification.',
        'The monthly activity report has been generated.'
    ];
    
    for (let i = 0; i < count; i++) {
        const typeIndex = Math.floor(Math.random() * types.length);
        const messageIndex = Math.floor(Math.random() * messages.length);
        
        // Generate random date within the last 30 days
        const date = new Date(currentDate);
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        const isToday = date.toDateString() === currentDate.toDateString();
        const isYesterday = new Date(currentDate.setDate(currentDate.getDate() - 1)).toDateString() === date.toDateString();
        
        let timeDisplay;
        if (isToday) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            timeDisplay = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        } else if (isYesterday) {
            timeDisplay = 'Yesterday';
        } else {
            timeDisplay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
        
        notifications.push({
            id: `notification-${i + 1}`,
            type: types[typeIndex],
            title: titles[messageIndex % titles.length],
            message: messages[messageIndex],
            time: timeDisplay,
            date: date.toISOString(),
            read: Math.random() > 0.4, // 40% unread
            important: Math.random() > 0.75 // 25% important
        });
    }
    
    return notifications;
}

/**
 * Apply filters to notifications
 */
function applyFilters() {
    // Start with all notifications
    filteredNotifications = [...allNotifications];
    
    // Apply type filter
    if (currentFilters.type !== 'all') {
        filteredNotifications = filteredNotifications.filter(notification => notification.type === currentFilters.type);
    }
    
    // Apply status filter
    if (currentFilters.status === 'read') {
        filteredNotifications = filteredNotifications.filter(notification => notification.read);
    } else if (currentFilters.status === 'unread') {
        filteredNotifications = filteredNotifications.filter(notification => !notification.read);
    }
    
    // Apply search filter
    if (currentFilters.search) {
        const search = currentFilters.search.toLowerCase();
        filteredNotifications = filteredNotifications.filter(notification => 
            notification.title.toLowerCase().includes(search) || 
            notification.message.toLowerCase().includes(search)
        );
    }
    
    // Reset to first page
    currentPage = 1;
    
    // Calculate total pages
    totalPages = Math.max(1, Math.ceil(filteredNotifications.length / itemsPerPage));
    
    // Render notifications
    renderNotifications();
    
    // Update pagination
    renderPagination();
    
    // Update notification counts
    updateCounts();
}

/**
 * Render notifications list
 */
function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    const emptyState = document.getElementById('emptyNotifications');
    
    if (!notificationsList || !emptyState) return;
    
    // Clear the list
    notificationsList.innerHTML = '';
    
    // Show empty state if no notifications
    if (filteredNotifications.length === 0) {
        emptyState.classList.remove('d-none');
        document.getElementById('notificationCount').classList.add('d-none');
        return;
    }
    
    // Hide empty state
    emptyState.classList.add('d-none');
    document.getElementById('notificationCount').classList.remove('d-none');
    
    // Calculate paging
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredNotifications.length);
    const pagedNotifications = filteredNotifications.slice(startIndex, endIndex);
    
    // Update showing count
    document.getElementById('showingCount').textContent = pagedNotifications.length;
    document.getElementById('totalCount').textContent = filteredNotifications.length;
    
    // Render each notification
    pagedNotifications.forEach(notification => {
        const notificationElement = createNotificationElement(notification);
        notificationsList.appendChild(notificationElement);
    });
}

/**
 * Create notification element
 * @param {Object} notification Notification data
 * @returns {HTMLElement} Notification element
 */
function createNotificationElement(notification) {
    // Clone template
    const template = document.getElementById('notificationItemTemplate');
    if (!template) return document.createElement('div');
    
    const notificationClone = template.content.cloneNode(true);
    const notificationElement = notificationClone.querySelector('.notification-item');
    
    // Set notification ID
    notificationElement.setAttribute('data-id', notification.id);
    
    // Add unread class if notification is unread
    if (!notification.read) {
        notificationElement.classList.add('unread');
    }
    
    // Set checkbox value
    const checkbox = notificationElement.querySelector('.notification-checkbox');
    checkbox.value = notification.id;
    
    // Set icon based on type
    const iconElement = notificationElement.querySelector('.notification-icon');
    iconElement.classList.add(notification.type);
    
    const iconSpan = iconElement.querySelector('.material-icons');
    iconSpan.textContent = NOTIFICATION_ICONS[notification.type] || 'notifications';
    
    // Set title and message
    notificationElement.querySelector('.notification-title').textContent = notification.title;
    notificationElement.querySelector('.notification-message').textContent = notification.message;
    
    // Add important badge if notification is important
    if (notification.important) {
        const importantBadge = document.createElement('span');
        importantBadge.className = 'badge bg-warning text-dark ms-2 badge-notifications';
        importantBadge.textContent = 'Important';
        notificationElement.querySelector('.notification-title').appendChild(importantBadge);
    }
    
    // Set time
    notificationElement.querySelector('.notification-time').textContent = notification.time;
    
    // Set up mark as read/unread button
    const markReadBtn = notificationElement.querySelector('.mark-read-btn');
    if (notification.read) {
        markReadBtn.setAttribute('title', 'Mark as unread');
        markReadBtn.querySelector('.material-icons').textContent = 'check_circle';
    } else {
        markReadBtn.setAttribute('title', 'Mark as read');
    }
    
    // Add event listeners
    markReadBtn.addEventListener('click', function() {
        toggleReadStatus(notification.id);
    });
    
    const deleteBtn = notificationElement.querySelector('.delete-notification-btn');
    deleteBtn.addEventListener('click', function() {
        deleteNotification(notification.id);
    });
    
    return notificationElement;
}

/**
 * Render pagination
 */
function renderPagination() {
    const paginationElement = document.getElementById('notificationsPagination');
    if (!paginationElement) return;
    
    // Clear pagination
    paginationElement.innerHTML = '';
    
    // Don't show pagination if only one page
    if (totalPages <= 1) return;
    
    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = '#';
    prevLink.setAttribute('aria-label', 'Previous');
    prevLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';
    
    prevLi.appendChild(prevLink);
    paginationElement.appendChild(prevLi);
    
    // Add page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        
        pageLi.appendChild(pageLink);
        paginationElement.appendChild(pageLi);
        
        // Add click event
        pageLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage = i;
            renderNotifications();
            renderPagination();
        });
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';
    
    nextLi.appendChild(nextLink);
    paginationElement.appendChild(nextLi);
    
    // Add click events for prev/next
    if (currentPage > 1) {
        prevLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage--;
            renderNotifications();
            renderPagination();
        });
    }
    
    if (currentPage < totalPages) {
        nextLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentPage++;
            renderNotifications();
            renderPagination();
        });
    }
}

/**
 * Update notification counts
 */
function updateCounts() {
    // Count totals
    const totalCount = allNotifications.length;
    
    // Count unread
    const unreadCount = allNotifications.filter(notification => !notification.read).length;
    
    // Count today's notifications
    const today = new Date().toDateString();
    const todayCount = allNotifications.filter(notification => 
        new Date(notification.date).toDateString() === today
    ).length;
    
    // Count important notifications
    const importantCount = allNotifications.filter(notification => notification.important).length;
    
    // Update count displays
    document.getElementById('totalNotificationsCount').textContent = totalCount;
    document.getElementById('unreadNotificationsCount').textContent = unreadCount;
    document.getElementById('todayNotificationsCount').textContent = todayCount;
    document.getElementById('importantNotificationsCount').textContent = importantCount;
    
    // Update notification badge in header
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        notificationBadge.textContent = unreadCount;
        
        // Hide badge if no unread notifications
        if (unreadCount === 0) {
            notificationBadge.style.display = 'none';
        } else {
            notificationBadge.style.display = 'flex';
        }
    }
}

/**
 * Toggle read status of a notification
 * @param {string} id Notification ID
 */
function toggleReadStatus(id) {
    // Find notification index
    const index = allNotifications.findIndex(notification => notification.id === id);
    if (index === -1) return;
    
    // Toggle read status
    allNotifications[index].read = !allNotifications[index].read;
    
    // In a real app, send update to API
    // const method = allNotifications[index].read ? 'mark-read' : 'mark-unread';
    // fetch(`${API_ENDPOINTS.NOTIFICATION_READ}/${id}/${method}`, {
    //     method: 'POST'
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(`Notification ${id} marked as ${allNotifications[index].read ? 'read' : 'unread'}`);
    //     })
    //     .catch(error => {
    //         console.error('Error updating notification status:', error);
    //         // Revert change on error
    //         allNotifications[index].read = !allNotifications[index].read;
    //         applyFilters();
    //     });
    
    // Update UI
    applyFilters();
}

/**
 * Delete a notification
 * @param {string} id Notification ID
 */
function deleteNotification(id) {
    // Confirm delete
    if (!confirm('Are you sure you want to delete this notification?')) {
        return;
    }
    
    // Find notification index
    const index = allNotifications.findIndex(notification => notification.id === id);
    if (index === -1) return;
    
    // In a real app, send delete to API
    // fetch(`${API_ENDPOINTS.NOTIFICATION_DELETE}/${id}`, {
    //     method: 'DELETE'
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(`Notification ${id} deleted`);
    //         
    //         // Remove from array
    //         allNotifications.splice(index, 1);
    //         
    //         // Update UI
    //         applyFilters();
    //     })
    //     .catch(error => {
    //         console.error('Error deleting notification:', error);
    //     });
    
    // For demo: Remove from array
    allNotifications.splice(index, 1);
    
    // Update UI
    applyFilters();
    
    // Show toast
    showRealTimeNotification({
        id: 'success-delete',
        type: 'success',
        title: 'Notification Deleted',
        message: 'The notification has been successfully deleted.',
        time: 'Just now'
    });
}

/**
 * Mark all notifications as read
 */
function markAllAsRead() {
    // Confirm action
    if (!confirm('Are you sure you want to mark all notifications as read?')) {
        return;
    }
    
    // In a real app, send update to API
    // fetch(API_ENDPOINTS.NOTIFICATION_READ_ALL, {
    //     method: 'POST'
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('All notifications marked as read');
    //         
    //         // Update all notifications
    //         allNotifications.forEach(notification => {
    //             notification.read = true;
    //         });
    //         
    //         // Update UI
    //         applyFilters();
    //     })
    //     .catch(error => {
    //         console.error('Error marking all notifications as read:', error);
    //     });
    
    // For demo: Update all notifications
    allNotifications.forEach(notification => {
        notification.read = true;
    });
    
    // Update UI
    applyFilters();
    
    // Show toast
    showRealTimeNotification({
        id: 'success-mark-all',
        type: 'success',
        title: 'Notifications Marked as Read',
        message: 'All notifications have been marked as read.',
        time: 'Just now'
    });
}

/**
 * Toggle select all notifications
 */
function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.notification-checkbox');
    const selectAllBtn = document.getElementById('selectAllBtn');
    
    // Check if all are selected
    const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);
    
    // Toggle selection
    checkboxes.forEach(checkbox => {
        checkbox.checked = !allSelected;
    });
    
    // Update button text
    selectAllBtn.textContent = allSelected ? 'Select All' : 'Deselect All';
}

/**
 * Mark selected notifications as read
 */
function markSelectedAsRead() {
    const selectedIds = getSelectedNotificationIds();
    
    if (selectedIds.length === 0) {
        alert('Please select at least one notification');
        return;
    }
    
    // In a real app, send update to API
    // fetch(API_ENDPOINTS.NOTIFICATION_READ_ALL, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ ids: selectedIds })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(`${selectedIds.length} notifications marked as read`);
    //         
    //         // Update selected notifications
    //         selectedIds.forEach(id => {
    //             const index = allNotifications.findIndex(notification => notification.id === id);
    //             if (index !== -1) {
    //                 allNotifications[index].read = true;
    //             }
    //         });
    //         
    //         // Update UI
    //         applyFilters();
    //     })
    //     .catch(error => {
    //         console.error('Error marking selected notifications as read:', error);
    //     });
    
    // For demo: Update selected notifications
    selectedIds.forEach(id => {
        const index = allNotifications.findIndex(notification => notification.id === id);
        if (index !== -1) {
            allNotifications[index].read = true;
        }
    });
    
    // Update UI
    applyFilters();
    
    // Show toast
    showRealTimeNotification({
        id: 'success-mark-selected',
        type: 'success',
        title: 'Notifications Marked as Read',
        message: `${selectedIds.length} notifications have been marked as read.`,
        time: 'Just now'
    });
}

/**
 * Delete selected notifications
 */
function deleteSelectedNotifications() {
    const selectedIds = getSelectedNotificationIds();
    
    if (selectedIds.length === 0) {
        alert('Please select at least one notification');
        return;
    }
    
    // Confirm delete
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} notifications?`)) {
        return;
    }
    
    // In a real app, send delete to API
    // fetch(API_ENDPOINTS.NOTIFICATION_DELETE_BULK, {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ ids: selectedIds })
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(`${selectedIds.length} notifications deleted`);
    //         
    //         // Remove from array
    //         allNotifications = allNotifications.filter(notification => !selectedIds.includes(notification.id));
    //         
    //         // Update UI
    //         applyFilters();
    //     })
    //     .catch(error => {
    //         console.error('Error deleting selected notifications:', error);
    //     });
    
    // For demo: Remove from array
    allNotifications = allNotifications.filter(notification => !selectedIds.includes(notification.id));
    
    // Update UI
    applyFilters();
    
    // Show toast
    showRealTimeNotification({
        id: 'success-delete-selected',
        type: 'success',
        title: 'Notifications Deleted',
        message: `${selectedIds.length} notifications have been deleted.`,
        time: 'Just now'
    });
}

/**
 * Get IDs of selected notifications
 * @returns {Array} Array of selected notification IDs
 */
function getSelectedNotificationIds() {
    const checkboxes = document.querySelectorAll('.notification-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

/**
 * Start polling for real-time notifications
 */
function startNotificationPolling() {
    // In a real app, this would use WebSockets or SSE for real-time updates
    // Here we'll just simulate a new notification every 30 seconds
    setInterval(() => {
        // 30% chance of getting a new notification
        if (Math.random() < 0.3) {
            const randomNotification = generateMockNotifications(1)[0];
            randomNotification.read = false; // Always unread for new notifications
            
            // Add to notifications array
            allNotifications.unshift(randomNotification);
            
            // Show real-time toast
            showRealTimeNotification(randomNotification);
            
            // Update UI if current filter allows it
            applyFilters();
        }
    }, 30000); // 30 seconds
}

/**
 * Show a real-time toast notification
 * @param {Object} notification Notification data
 */
function showRealTimeNotification(notification) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    // Clone toast template
    const template = document.getElementById('toastTemplate');
    if (!template) return;
    
    const toastClone = template.content.cloneNode(true);
    const toastElement = toastClone.querySelector('.toast');
    
    // Set toast content
    const toastTitle = toastElement.querySelector('.toast-title');
    const toastBody = toastElement.querySelector('.toast-body');
    const toastTime = toastElement.querySelector('.toast-time');
    const toastIcon = toastElement.querySelector('.toast-icon');
    
    toastTitle.textContent = notification.title;
    toastBody.textContent = notification.message;
    toastTime.textContent = notification.time;
    
    // Set icon based on type
    toastIcon.textContent = NOTIFICATION_ICONS[notification.type] || 'notifications';
    
    // Apply color based on type
    switch (notification.type) {
        case 'info':
            toastIcon.style.color = '#0d6efd';
            break;
        case 'success':
            toastIcon.style.color = '#198754';
            break;
        case 'warning':
            toastIcon.style.color = '#ffc107';
            break;
        case 'danger':
            toastIcon.style.color = '#dc3545';
            break;
    }
    
    // Add to container
    toastContainer.appendChild(toastElement);
    
    // Initialize Bootstrap toast
    const toast = new bootstrap.Toast(toastElement);
    
    // Show toast
    toast.show();
    
    // Update notification counts
    updateCounts();
    
    // Play notification sound (optional)
    // playNotificationSound();
}

/**
 * Play notification sound
 */
function playNotificationSound() {
    const audio = new Audio('../assests/audio/notification.mp3');
    audio.play().catch(e => {
        // Silent fail - browsers often block autoplay
        console.log('Could not play notification sound');
    });
}

/**
 * Show empty state
 */
function showEmptyState() {
    const notificationsList = document.getElementById('notificationsList');
    const emptyState = document.getElementById('emptyNotifications');
    
    if (notificationsList) {
        notificationsList.innerHTML = '';
    }
    
    if (emptyState) {
        emptyState.classList.remove('d-none');
    }
    
    const notificationCount = document.getElementById('notificationCount');
    if (notificationCount) {
        notificationCount.classList.add('d-none');
    }
}

/**
 * Show spinner
 */
function showSpinner() {
    const spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.classList.add('active');
    }
}

/**
 * Hide spinner
 */
function hideSpinner() {
    const spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.classList.remove('active');
    }
} 