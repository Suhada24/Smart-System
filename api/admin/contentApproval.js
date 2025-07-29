/**
 * Smart University LMS - Content Approval API
 * This file contains functions for interacting with the content approval API
 */

// Content Approval API Endpoints
const API_ENDPOINTS = {
    // In a real application, these would be actual API endpoints
    CONTENT: '/api/content',
    CONTENT_ITEM: '/api/content/{id}',
    APPROVE: '/api/content/{id}/approve',
    REJECT: '/api/content/{id}/reject',
    BULK_APPROVE: '/api/content/bulk/approve',
    BULK_REJECT: '/api/content/bulk/reject',
};

// Global variables for pagination and filtering
let currentPage = 1;
const itemsPerPage = 10;
let totalContent = 0;
let filteredContent = [];
let allContent = [];
let currentStatus = 'all';

/**
 * Initializes the content approval functionality
 */
function initContentApproval() {
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadContent();
}

/**
 * Set up all event listeners for the content approval page
 */
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('contentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterContent();
        });
    }
    
    // Course filter
    const courseFilter = document.getElementById('courseFilter');
    if (courseFilter) {
        courseFilter.addEventListener('change', function() {
            filterContent();
        });
    }
    
    // Date range filter
    const dateRangeFilter = document.getElementById('dateRangeFilter');
    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', function() {
            filterContent();
        });
    }
    
    // Status tabs
    const statusTabs = document.getElementById('statusTabs');
    if (statusTabs) {
        statusTabs.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link') || e.target.parentNode.classList.contains('nav-link')) {
                e.preventDefault();
                const navLink = e.target.classList.contains('nav-link') ? e.target : e.target.parentNode;
                const status = navLink.getAttribute('data-status');
                
                if (status && status !== currentStatus) {
                    // Update active tab
                    document.querySelectorAll('#statusTabs .nav-link').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    navLink.classList.add('active');
                    
                    // Update current status and filter content
                    currentStatus = status;
                    filterContent();
                }
            }
        });
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            const checkboxes = document.querySelectorAll('#contentTableBody input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            
            updateBulkActions();
        });
    }
    
    // Table body checkbox changes
    const contentTableBody = document.getElementById('contentTableBody');
    if (contentTableBody) {
        contentTableBody.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox') {
                updateBulkActions();
                
                // Update select all checkbox
                const allCheckboxes = document.querySelectorAll('#contentTableBody input[type="checkbox"]');
                const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
                document.getElementById('selectAllCheckbox').checked = allChecked;
            }
        });
    }
    
    // Clear selection button
    const clearSelectionBtn = document.getElementById('clearSelectionBtn');
    if (clearSelectionBtn) {
        clearSelectionBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('#contentTableBody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            document.getElementById('selectAllCheckbox').checked = false;
            updateBulkActions();
        });
    }
    
    // Bulk approve button
    const bulkApproveBtn = document.getElementById('bulkApproveBtn');
    if (bulkApproveBtn) {
        bulkApproveBtn.addEventListener('click', function() {
            const selectedIds = getSelectedContentIds();
            if (selectedIds.length > 0) {
                bulkApproveContent(selectedIds);
            }
        });
    }
    
    // Bulk reject button
    const bulkRejectBtn = document.getElementById('bulkRejectBtn');
    if (bulkRejectBtn) {
        bulkRejectBtn.addEventListener('click', function() {
            const selectedIds = getSelectedContentIds();
            if (selectedIds.length > 0) {
                bulkRejectContent(selectedIds);
            }
        });
    }
    
    // Approve button in modal
    const approveContentBtn = document.getElementById('approveContentBtn');
    if (approveContentBtn) {
        approveContentBtn.addEventListener('click', function() {
            const contentId = document.getElementById('contentId').value;
            const feedback = document.getElementById('feedbackText').value;
            if (contentId) {
                approveContent(contentId, feedback);
            }
        });
    }
    
    // Reject button in modal
    const rejectContentBtn = document.getElementById('rejectContentBtn');
    if (rejectContentBtn) {
        rejectContentBtn.addEventListener('click', function() {
            const contentId = document.getElementById('contentId').value;
            const feedback = document.getElementById('feedbackText').value;
            if (contentId) {
                rejectContent(contentId, feedback);
            }
        });
    }
    
    // Handle pagination
    const pagination = document.getElementById('contentPagination');
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
                    const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
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
    
    // Handle content detail modal
    document.body.addEventListener('click', function(e) {
        // Find closest button with data-action attribute
        const button = e.target.closest('button[data-action]');
        if (button) {
            const action = button.getAttribute('data-action');
            const contentId = button.getAttribute('data-content-id');
            
            if (action === 'view' && contentId) {
                showContentDetails(contentId);
            }
        }
    });
}

/**
 * Load content from the API
 */
async function loadContent() {
    try {
        showLoading();
        
        // In a real app, this would be a fetch call to the API
        // fetch(API_ENDPOINTS.CONTENT)
        //     .then(response => response.json())
        //     .then(data => {
        //         allContent = data;
        //         filteredContent = [...allContent];
        //         totalContent = allContent.length;
        //         renderContent();
        //         updateStatusCounts();
        //     })
        //     .catch(error => {
        //         console.error('Error loading content:', error);
        //         showErrorMessage('Failed to load content. Please try again.');
        //     })
        //     .finally(() => {
        //         hideLoading();
        //     });
        
        // For this example, we'll create some mock data
        setTimeout(() => {
            allContent = generateMockContent(25);
            filteredContent = [...allContent];
            totalContent = allContent.length;
            renderContent();
            updateStatusCounts();
            updatePagination();
            hideLoading();
        }, 800);
    } catch (error) {
        console.error('Error loading content:', error);
        hideLoading();
    }
}

/**
 * Generate mock content data for demonstration
 * @param {number} count Number of content items to generate
 * @returns {Array} Array of content objects
 */
function generateMockContent(count = 20) {
    const statuses = ['pending', 'approved', 'rejected'];
    const courseNames = ['Mathematics 101', 'Computer Science 202', 'Biology 100', 'History 405', 'Physics 301'];
    const courseCodes = ['math101', 'cs202', 'bio100', 'hist405', 'phys301'];
    const contentTypes = ['Lecture', 'Assignment', 'Quiz', 'Video', 'Document'];
    const authors = [
        { id: 1, name: 'Prof. Sarah Johnson', role: 'Teacher' },
        { id: 2, name: 'Dr. Michael Lee', role: 'Teacher' },
        { id: 3, name: 'Prof. Emily Chen', role: 'Teacher' },
        { id: 4, name: 'Dr. Robert Wilson', role: 'Teacher' },
        { id: 5, name: 'Prof. David Brown', role: 'Teacher' }
    ];
    
    const content = [];
    
    for (let i = 1; i <= count; i++) {
        const randomDays = Math.floor(Math.random() * 30);
        const randomCourseIndex = Math.floor(Math.random() * courseNames.length);
        const randomAuthorIndex = Math.floor(Math.random() * authors.length);
        const randomTypeIndex = Math.floor(Math.random() * contentTypes.length);
        
        // More pending than other statuses for demo purposes
        const statusIndex = Math.random() < 0.6 ? 0 : Math.floor(Math.random() * statuses.length);
        
        const submittedDate = new Date();
        submittedDate.setDate(submittedDate.getDate() - randomDays);
        
        content.push({
            id: i,
            title: `${contentTypes[randomTypeIndex]} - ${courseNames[randomCourseIndex]} (Unit ${Math.floor(Math.random() * 10) + 1})`,
            description: `This is a description for the ${contentTypes[randomTypeIndex].toLowerCase()} content for ${courseNames[randomCourseIndex]}. It provides students with essential information about this topic.`,
            type: contentTypes[randomTypeIndex],
            course: courseNames[randomCourseIndex],
            courseCode: courseCodes[randomCourseIndex],
            author: authors[randomAuthorIndex],
            status: statuses[statusIndex],
            submittedDate: submittedDate.toISOString(),
            submittedDateFormatted: formatDate(submittedDate),
            feedback: statuses[statusIndex] !== 'pending' ? 'This content meets our curriculum standards.' : ''
        });
    }
    
    return content;
}

/**
 * Format a date for display
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Render content items to the table
 */
function renderContent() {
    const tableBody = document.getElementById('contentTableBody');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get content for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredContent.length);
    const contentToDisplay = filteredContent.slice(startIndex, endIndex);
    
    // Update showing count
    document.getElementById('showingContent').textContent = 
        filteredContent.length > 0 ? 
            `${startIndex + 1}-${endIndex}` : 
            '0-0';
            
    document.getElementById('totalContent').textContent = filteredContent.length;
    
    // Generate table rows
    if (contentToDisplay.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4">
                    <p class="text-muted mb-0">No content found matching your filters.</p>
                </td>
            </tr>
        `;
        return;
    }
    
    contentToDisplay.forEach((content, index) => {
        const row = document.createElement('tr');
        
        // Format status for display
        const statusFormatted = content.status.charAt(0).toUpperCase() + content.status.slice(1);
        
        row.innerHTML = `
            <td>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" data-content-id="${content.id}">
                </div>
            </td>
            <td>
                <div class="d-flex flex-column">
                    <div class="content-title fw-semibold">${content.title}</div>
                    <small class="text-muted">${content.type}</small>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(content.author.name)}&background=random&size=128" 
                         class="author-avatar me-2" 
                         alt="${content.author.name}">
                    <div>
                        <div>${content.author.name}</div>
                        <small class="text-muted">${content.author.role}</small>
                    </div>
                </div>
            </td>
            <td>${content.course}</td>
            <td>${content.submittedDateFormatted}</td>
            <td><span class="badge status-badge status-${content.status}">${statusFormatted}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" data-action="view" data-content-id="${content.id}" data-bs-toggle="modal" data-bs-target="#contentDetailModal">
                    <span class="material-icons" style="font-size: 18px;">visibility</span>
                </button>
                ${content.status === 'pending' ? `
                <button class="btn btn-sm btn-outline-success me-1" data-action="approve" data-content-id="${content.id}">
                    <span class="material-icons" style="font-size: 18px;">done</span>
                </button>
                <button class="btn btn-sm btn-outline-danger" data-action="reject" data-content-id="${content.id}">
                    <span class="material-icons" style="font-size: 18px;">close</span>
                </button>
                ` : ''}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addActionButtonEventListeners();
}

/**
 * Add event listeners to action buttons
 */
function addActionButtonEventListeners() {
    // Approve buttons
    document.querySelectorAll('button[data-action="approve"]').forEach(button => {
        button.addEventListener('click', function() {
            const contentId = this.getAttribute('data-content-id');
            if (contentId) {
                approveContent(contentId);
            }
        });
    });
    
    // Reject buttons
    document.querySelectorAll('button[data-action="reject"]').forEach(button => {
        button.addEventListener('click', function() {
            const contentId = this.getAttribute('data-content-id');
            if (contentId) {
                // Show the modal for rejection with feedback
                showContentDetails(contentId, 'reject');
            }
        });
    });
}

/**
 * Update status counts
 */
function updateStatusCounts() {
    const pendingCount = allContent.filter(content => content.status === 'pending').length;
    const approvedCount = allContent.filter(content => content.status === 'approved').length;
    const rejectedCount = allContent.filter(content => content.status === 'rejected').length;
    
    document.getElementById('allCount').textContent = allContent.length;
    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('approvedCount').textContent = approvedCount;
    document.getElementById('rejectedCount').textContent = rejectedCount;
}

/**
 * Update bulk actions container visibility
 */
function updateBulkActions() {
    const selectedCheckboxes = document.querySelectorAll('#contentTableBody input[type="checkbox"]:checked');
    const bulkActionsContainer = document.getElementById('bulkActionsContainer');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedCheckboxes.length > 0) {
        bulkActionsContainer.style.display = 'block';
        selectedCount.textContent = selectedCheckboxes.length;
    } else {
        bulkActionsContainer.style.display = 'none';
    }
}

/**
 * Get selected content IDs
 * @returns {Array} Array of selected content IDs
 */
function getSelectedContentIds() {
    const selectedCheckboxes = document.querySelectorAll('#contentTableBody input[type="checkbox"]:checked');
    return Array.from(selectedCheckboxes).map(checkbox => checkbox.getAttribute('data-content-id'));
}

/**
 * Filter content based on search input and filters
 */
function filterContent() {
    const searchTerm = document.getElementById('contentSearch').value.toLowerCase();
    const courseFilter = document.getElementById('courseFilter').value;
    const dateRangeFilter = document.getElementById('dateRangeFilter').value;
    
    // Reset to page 1 when filtering
    currentPage = 1;
    
    // Apply filters
    filteredContent = allContent.filter(content => {
        // Status filter
        const matchesStatus = currentStatus === 'all' ? true : content.status === currentStatus;
        
        // Search term filter
        const matchesSearch = 
            content.title.toLowerCase().includes(searchTerm) || 
            content.author.name.toLowerCase().includes(searchTerm);
        
        // Course filter
        const matchesCourse = courseFilter ? content.courseCode === courseFilter : true;
        
        // Date range filter
        let matchesDate = true;
        if (dateRangeFilter) {
            const contentDate = new Date(content.submittedDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            
            const weekStart = new Date(today);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            
            const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
            
            switch (dateRangeFilter) {
                case 'today':
                    matchesDate = contentDate >= today;
                    break;
                case 'this_week':
                    matchesDate = contentDate >= weekStart;
                    break;
                case 'this_month':
                    matchesDate = contentDate >= monthStart;
                    break;
                case 'last_month':
                    matchesDate = contentDate >= lastMonthStart && contentDate <= lastMonthEnd;
                    break;
            }
        }
        
        return matchesStatus && matchesSearch && matchesCourse && matchesDate;
    });
    
    // Re-render the table with filtered data
    renderContent();
    updatePagination();
}

/**
 * Update pagination based on filtered content
 */
function updatePagination() {
    const pagination = document.getElementById('contentPagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
    
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
    renderContent();
    updatePagination();
} 