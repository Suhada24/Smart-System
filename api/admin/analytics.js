/**
 * Smart University LMS - Analytics API
 * This file contains functions for interacting with the analytics API
 */

// API Endpoints
const API_ENDPOINTS = {
    // In a real application, these would be actual API endpoints
    STATS_SUMMARY: '/api/analytics/summary',
    USER_GROWTH: '/api/analytics/user-growth',
    COURSE_COMPLETION: '/api/analytics/course-completion',
    USER_ROLES: '/api/analytics/user-roles',
    TOP_COURSES: '/api/analytics/top-courses',
    ENGAGEMENT_METRICS: '/api/analytics/engagement',
};

// Chart configuration objects
let userGrowthChart;
let courseCompletionChart;
let userRoleDistributionChart;
let topCoursesChart;
let engagementMetricsChart;

// Globals to store current filter state
let currentDateRange = {
    startDate: moment().subtract(30, 'days'),
    endDate: moment()
};
let currentPeriod = 'monthly';
let currentDepartment = 'all';

/**
 * Initialize analytics dashboard
 */
function initAnalyticsDashboard() {
    // Set up date range picker
    initDateRangePicker();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize charts
    initCharts();
    
    // Load initial data
    loadAnalyticsData();
}

/**
 * Initialize date range picker
 */
function initDateRangePicker() {
    $('#dateRangePicker').daterangepicker({
        startDate: currentDateRange.startDate,
        endDate: currentDateRange.endDate,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
           'Last 3 Months': [moment().subtract(3, 'months'), moment()],
           'This Year': [moment().startOf('year'), moment().endOf('year')]
        },
        alwaysShowCalendars: true,
        opens: 'left'
    }, function(start, end) {
        currentDateRange.startDate = start;
        currentDateRange.endDate = end;
    });
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Apply date filter button
    const applyFilterBtn = document.getElementById('applyDateFilter');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            loadAnalyticsData();
        });
    }
    
    // User growth period buttons
    const periodButtons = document.querySelectorAll('[data-period]');
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update period and reload data
            currentPeriod = this.getAttribute('data-period');
            loadUserGrowthData();
        });
    });
    
    // Department filter dropdown
    const departmentItems = document.querySelectorAll('[data-department]');
    departmentItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update dropdown button text
            const dropdownButton = document.getElementById('courseFilterDropdown');
            dropdownButton.textContent = this.textContent;
            
            // Update department and reload data
            currentDepartment = this.getAttribute('data-department');
            loadCourseCompletionData();
        });
    });
}

/**
 * Initialize charts
 */
function initCharts() {
    initUserGrowthChart();
    initCourseCompletionChart();
    initUserRoleDistributionChart();
    initTopCoursesChart();
    initEngagementMetricsChart();
}

/**
 * Initialize user growth chart
 */
function initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart').getContext('2d');
    
    userGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'New Users',
                    data: [],
                    backgroundColor: 'rgba(66, 133, 244, 0.2)',
                    borderColor: 'rgba(66, 133, 244, 1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(66, 133, 244, 1)',
                    tension: 0.3
                },
                {
                    label: 'Total Users',
                    data: [],
                    backgroundColor: 'rgba(219, 68, 55, 0.2)',
                    borderColor: 'rgba(219, 68, 55, 1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(219, 68, 55, 1)',
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

/**
 * Initialize course completion chart
 */
function initCourseCompletionChart() {
    const ctx = document.getElementById('courseCompletionChart').getContext('2d');
    
    courseCompletionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Completion Rate (%)',
                data: [],
                backgroundColor: [
                    'rgba(66, 133, 244, 0.7)',
                    'rgba(219, 68, 55, 0.7)',
                    'rgba(244, 180, 0, 0.7)',
                    'rgba(15, 157, 88, 0.7)',
                    'rgba(162, 98, 249, 0.7)',
                    'rgba(251, 143, 108, 0.7)'
                ],
                borderColor: [
                    'rgba(66, 133, 244, 1)',
                    'rgba(219, 68, 55, 1)',
                    'rgba(244, 180, 0, 1)',
                    'rgba(15, 157, 88, 1)',
                    'rgba(162, 98, 249, 1)',
                    'rgba(251, 143, 108, 1)'
                ],
                borderWidth: 1,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize user role distribution chart
 */
function initUserRoleDistributionChart() {
    const ctx = document.getElementById('userRoleDistributionChart').getContext('2d');
    
    userRoleDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Students', 'Teachers', 'Admins', 'Parents'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(66, 133, 244, 0.7)',
                    'rgba(219, 68, 55, 0.7)',
                    'rgba(244, 180, 0, 0.7)',
                    'rgba(15, 157, 88, 0.7)'
                ],
                borderColor: [
                    'rgba(66, 133, 244, 1)',
                    'rgba(219, 68, 55, 1)',
                    'rgba(244, 180, 0, 1)',
                    'rgba(15, 157, 88, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

/**
 * Initialize top courses chart
 */
function initTopCoursesChart() {
    const ctx = document.getElementById('topCoursesChart').getContext('2d');
    
    topCoursesChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [],
            datasets: [{
                label: 'Enrolled Students',
                data: [],
                backgroundColor: 'rgba(66, 133, 244, 0.7)',
                borderColor: 'rgba(66, 133, 244, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

/**
 * Initialize engagement metrics chart
 */
function initEngagementMetricsChart() {
    const ctx = document.getElementById('engagementMetricsChart').getContext('2d');
    
    engagementMetricsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Daily Active Users',
                    data: [],
                    borderColor: 'rgba(66, 133, 244, 1)',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Course Views',
                    data: [],
                    borderColor: 'rgba(219, 68, 55, 1)',
                    backgroundColor: 'rgba(219, 68, 55, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Assignment Submissions',
                    data: [],
                    borderColor: 'rgba(15, 157, 88, 1)',
                    backgroundColor: 'rgba(15, 157, 88, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

/**
 * Load all analytics data
 */
function loadAnalyticsData() {
    showSpinner();
    
    // Load all data
    Promise.all([
        loadStatsSummary(),
        loadUserGrowthData(),
        loadCourseCompletionData(),
        loadUserRoleData(),
        loadTopCoursesData(),
        loadEngagementData()
    ])
    .then(() => {
        hideSpinner();
    })
    .catch(error => {
        console.error('Error loading analytics data:', error);
        hideSpinner();
    });
}

/**
 * Load statistics summary
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadStatsSummary() {
    // In a real app, this would fetch data from the API
    // return fetch(API_ENDPOINTS.STATS_SUMMARY + buildQueryParams())
    //     .then(response => response.json())
    //     .then(data => {
    //         updateStatsSummary(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading stats summary:', error);
    //     });
    
    // For this example, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = {
                totalUsers: 5842,
                activeCourses: 124,
                completionRate: 78.5,
                newUsers: 237
            };
            
            updateStatsSummary(mockData);
            resolve();
        }, 300);
    });
}

/**
 * Load user growth data
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadUserGrowthData() {
    // In a real app, this would fetch data from the API
    // return fetch(API_ENDPOINTS.USER_GROWTH + buildQueryParams() + '&period=' + currentPeriod)
    //     .then(response => response.json())
    //     .then(data => {
    //         updateUserGrowthChart(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading user growth data:', error);
    //     });
    
    // For this example, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            let labels, newUsers, totalUsers;
            
            // Generate different data based on period
            if (currentPeriod === 'weekly') {
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                newUsers = [12, 19, 15, 17, 13, 8, 10];
                totalUsers = [1200, 1219, 1234, 1251, 1264, 1272, 1282];
            } else if (currentPeriod === 'yearly') {
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                newUsers = [350, 280, 310, 290, 270, 240, 220, 250, 330, 370, 410, 390];
                totalUsers = [3500, 3780, 4090, 4380, 4650, 4890, 5110, 5360, 5690, 6060, 6470, 6860];
            } else { // monthly
                labels = ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'];
                newUsers = [40, 35, 45, 50, 38, 42, 48];
                totalUsers = [5600, 5635, 5680, 5730, 5768, 5810, 5858];
            }
            
            const mockData = {
                labels: labels,
                newUsers: newUsers,
                totalUsers: totalUsers
            };
            
            updateUserGrowthChart(mockData);
            resolve();
        }, 300);
    });
}

/**
 * Load course completion data
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadCourseCompletionData() {
    // In a real app, this would fetch data from the API
    // return fetch(API_ENDPOINTS.COURSE_COMPLETION + buildQueryParams() + '&department=' + currentDepartment)
    //     .then(response => response.json())
    //     .then(data => {
    //         updateCourseCompletionChart(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading course completion data:', error);
    //     });
    
    // For this example, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            let courseLabels, completionRates;
            
            // Generate different data based on department
            if (currentDepartment === 'computer-science') {
                courseLabels = ['Intro to Programming', 'Data Structures', 'Web Development', 'Database Design', 'AI Fundamentals'];
                completionRates = [87, 72, 93, 68, 61];
            } else if (currentDepartment === 'business') {
                courseLabels = ['Business Economics', 'Marketing 101', 'Finance Essentials', 'Business Strategy', 'Leadership'];
                completionRates = [83, 91, 76, 85, 89];
            } else if (currentDepartment === 'arts') {
                courseLabels = ['History of Art', 'Creative Writing', 'Philosophy 101', 'World Literature', 'Media Studies'];
                completionRates = [79, 88, 71, 84, 77];
            } else if (currentDepartment === 'science') {
                courseLabels = ['Physics 101', 'Biology Fundamentals', 'Chemistry Basics', 'Calculus I', 'Statistics'];
                completionRates = [67, 78, 72, 65, 81];
            } else { // all departments
                courseLabels = ['Intro to Programming', 'Business Economics', 'Physics 101', 'Creative Writing', 'Marketing 101', 'Statistics'];
                completionRates = [87, 83, 67, 88, 91, 81];
            }
            
            const mockData = {
                labels: courseLabels,
                completionRates: completionRates
            };
            
            updateCourseCompletionChart(mockData);
            resolve();
        }, 300);
    });
}

/**
 * Load user role distribution data
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadUserRoleData() {
    // In a real app, this would fetch data from the API
    // return fetch(API_ENDPOINTS.USER_ROLES + buildQueryParams())
    //     .then(response => response.json())
    //     .then(data => {
    //         updateUserRoleChart(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading user role data:', error);
    //     });
    
    // For this example, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = {
                students: 4562,
                teachers: 327,
                admins: 45,
                parents: 908
            };
            
            updateUserRoleChart(mockData);
            resolve();
        }, 300);
    });
}

/**
 * Load top courses data
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadTopCoursesData() {
    // In a real app, this would fetch data from the API
    // return fetch(API_ENDPOINTS.TOP_COURSES + buildQueryParams())
    //     .then(response => response.json())
    //     .then(data => {
    //         updateTopCoursesChart(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading top courses data:', error);
    //     });
    
    // For this example, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = {
                courses: [
                    'Introduction to Computer Science',
                    'Business Economics',
                    'Psychology 101',
                    'Calculus I',
                    'Creative Writing Workshop'
                ],
                enrollments: [457, 412, 386, 345, 298]
            };
            
            updateTopCoursesChart(mockData);
            resolve();
        }, 300);
    });
}

/**
 * Load engagement metrics data
 * @returns {Promise} Promise that resolves when data is loaded
 */
function loadEngagementData() {
    // In a real app, this would fetch data from the API
    // return fetch(API_ENDPOINTS.ENGAGEMENT_METRICS + buildQueryParams())
    //     .then(response => response.json())
    //     .then(data => {
    //         updateEngagementChart(data);
    //     })
    //     .catch(error => {
    //         console.error('Error loading engagement metrics data:', error);
    //     });
    
    // For this example, we'll use mock data
    return new Promise(resolve => {
        setTimeout(() => {
            const mockData = {
                labels: ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Jan 30'],
                activeUsers: [325, 340, 356, 370, 352, 380, 395],
                courseViews: [1240, 1350, 1460, 1580, 1320, 1470, 1520],
                submissions: [98, 120, 115, 132, 105, 125, 140]
            };
            
            updateEngagementChart(mockData);
            resolve();
        }, 300);
    });
}

/**
 * Update statistics summary
 * @param {Object} data Stats summary data
 */
function updateStatsSummary(data) {
    document.getElementById('totalUsersCount').textContent = data.totalUsers.toLocaleString();
    document.getElementById('activeCoursesCount').textContent = data.activeCourses.toLocaleString();
    document.getElementById('completionRateValue').textContent = data.completionRate.toFixed(1) + '%';
    document.getElementById('newUsersCount').textContent = data.newUsers.toLocaleString();
}

/**
 * Update user growth chart
 * @param {Object} data User growth data
 */
function updateUserGrowthChart(data) {
    userGrowthChart.data.labels = data.labels;
    userGrowthChart.data.datasets[0].data = data.newUsers;
    userGrowthChart.data.datasets[1].data = data.totalUsers;
    userGrowthChart.update();
}

/**
 * Update course completion chart
 * @param {Object} data Course completion data
 */
function updateCourseCompletionChart(data) {
    courseCompletionChart.data.labels = data.labels;
    courseCompletionChart.data.datasets[0].data = data.completionRates;
    courseCompletionChart.update();
}

/**
 * Update user role distribution chart
 * @param {Object} data User role data
 */
function updateUserRoleChart(data) {
    userRoleDistributionChart.data.datasets[0].data = [
        data.students,
        data.teachers,
        data.admins,
        data.parents
    ];
    userRoleDistributionChart.update();
}

/**
 * Update top courses chart
 * @param {Object} data Top courses data
 */
function updateTopCoursesChart(data) {
    topCoursesChart.data.labels = data.courses;
    topCoursesChart.data.datasets[0].data = data.enrollments;
    topCoursesChart.update();
}

/**
 * Update engagement metrics chart
 * @param {Object} data Engagement data
 */
function updateEngagementChart(data) {
    engagementMetricsChart.data.labels = data.labels;
    engagementMetricsChart.data.datasets[0].data = data.activeUsers;
    engagementMetricsChart.data.datasets[1].data = data.courseViews;
    engagementMetricsChart.data.datasets[2].data = data.submissions;
    engagementMetricsChart.update();
}

/**
 * Build query parameters for API requests
 * @returns {string} Query parameters string
 */
function buildQueryParams() {
    return `?start=${currentDateRange.startDate.format('YYYY-MM-DD')}&end=${currentDateRange.endDate.format('YYYY-MM-DD')}`;
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