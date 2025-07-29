// Dashboard Templates
const dashboards = {
    admin: null,
    teacher: null,
    student: null,
    parent: null,
    calendar: null,
    messages: null,
    docs: null,
    home: null
};

// Store homepage content
const homeContent = `
<!-- Hero Section -->
<section class="hero-section">
    <h1>Welcome to Smart University LMS</h1>
    <p>Your comprehensive learning management system for modern education. Access courses, track progress, and connect with instructors and peers all in one place.</p>
    <div class="hero-buttons">
        <button class="cta-button primary-cta">
            <span class="material-icons">login</span>
            Get Started
        </button>
        <button class="cta-button secondary-cta">
            <span class="material-icons">play_circle</span>
            Watch Demo
        </button>
    </div>
</section>

<!-- Features Section -->
<section class="features-section">
    <div class="section-title">
        <h2>Key Features</h2>
    </div>
    <div class="features-grid">
        <div class="feature-card">
            <div class="feature-image">
                <img src="assests/images/feature-courses.jpg" alt="Online Courses" onerror="this.src='https://via.placeholder.com/400x200?text=Online+Courses'">
            </div>
            <div class="feature-content">
                <h3>Online Courses</h3>
                <p>Access a wide range of courses with multimedia content, assignments, and assessments.</p>
                <a href="#" class="feature-button" data-role="student">
                    Explore Courses <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
        <div class="feature-card">
            <div class="feature-image">
                <img src="assests/images/feature-progress.jpg" alt="Progress Tracking" onerror="this.src='https://via.placeholder.com/400x200?text=Progress+Tracking'">
            </div>
            <div class="feature-content">
                <h3>Progress Tracking</h3>
                <p>Monitor student progress with detailed analytics, performance metrics, and reports.</p>
                <a href="#" class="feature-button" data-role="teacher">
                    View Analytics <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
        <div class="feature-card">
            <div class="feature-image">
                <img src="assests/images/feature-communication.jpg" alt="Communication Tools" onerror="this.src='https://via.placeholder.com/400x200?text=Communication+Tools'">
            </div>
            <div class="feature-content">
                <h3>Communication Tools</h3>
                <p>Connect with instructors and peers through messaging, forums, and virtual classrooms.</p>
                <a href="#" class="feature-button" data-role="messages">
                    Start Connecting <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Course Catalog Section -->
<section class="features-section">
    <div class="section-title">
        <h2>Featured Courses</h2>
    </div>
    <div class="features-grid">
        <div class="feature-card">
            <div class="feature-image">
                <img src="assests/images/course-cs101.jpg" alt="Computer Science 101" onerror="this.src='https://via.placeholder.com/400x200?text=Computer+Science+101'">
            </div>
            <div class="feature-content">
                <div class="course-badges">
                    <span class="course-badge stem">STEM</span>
                    <span class="course-badge beginner">Beginner</span>
                </div>
                <h3>Computer Science 101</h3>
                <p>Introduction to programming fundamentals, algorithms, and data structures.</p>
                <div class="course-meta">
                    <div class="course-instructor">
                        <span class="material-icons">person</span>
                        <span>Dr. Jennifer Wilson</span>
                    </div>
                    <div class="course-duration">
                        <span class="material-icons">schedule</span>
                        <span>12 Weeks</span>
                    </div>
                </div>
                <a href="#" class="feature-button" data-role="student">
                    View Course <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
        <div class="feature-card">
            <div class="feature-image">
                <img src="assests/images/course-business.jpg" alt="Business Economics" onerror="this.src='https://via.placeholder.com/400x200?text=Business+Economics'">
            </div>
            <div class="feature-content">
                <div class="course-badges">
                    <span class="course-badge business">Business</span>
                    <span class="course-badge intermediate">Intermediate</span>
                </div>
                <h3>Business Economics</h3>
                <p>Study of economic principles, market structures, and decision-making in business.</p>
                <div class="course-meta">
                    <div class="course-instructor">
                        <span class="material-icons">person</span>
                        <span>Prof. Robert Thompson</span>
                    </div>
                    <div class="course-duration">
                        <span class="material-icons">schedule</span>
                        <span>10 Weeks</span>
                    </div>
                </div>
                <a href="#" class="feature-button" data-role="student">
                    View Course <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
        <div class="feature-card">
            <div class="feature-image">
                <img src="assests/images/course-psychology.jpg" alt="Introduction to Psychology" onerror="this.src='https://via.placeholder.com/400x200?text=Introduction+to+Psychology'">
            </div>
            <div class="feature-content">
                <div class="course-badges">
                    <span class="course-badge humanities">Humanities</span>
                    <span class="course-badge beginner">Beginner</span>
                </div>
                <h3>Introduction to Psychology</h3>
                <p>Explore human behavior, cognitive processes, and psychological theories.</p>
                <div class="course-meta">
                    <div class="course-instructor">
                        <span class="material-icons">person</span>
                        <span>Dr. Sarah Johnson</span>
                    </div>
                    <div class="course-duration">
                        <span class="material-icons">schedule</span>
                        <span>14 Weeks</span>
                    </div>
                </div>
                <a href="#" class="feature-button" data-role="student">
                    View Course <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Campus News Section -->
<section class="campus-news">
    <div class="section-title">
        <h2>Campus News</h2>
    </div>
    <div class="news-grid">
        <div class="news-card">
            <div class="news-image">
                <img src="assests/images/library.jpg" alt="New Library Opening" onerror="this.src='https://via.placeholder.com/400x200?text=New+Library+Opening'">
            </div>
            <div class="news-content">
                <span class="news-date">April 15, 2023</span>
                <h3 class="news-title">New Digital Library Resources Available</h3>
                <p class="news-excerpt">Smart University has added over 50,000 new digital resources to the online library, including e-books, journals, and research papers.</p>
                <a href="#" class="news-link">
                    Read More <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
        <div class="news-card">
            <div class="news-image">
                <img src="assests/images/lecture-hall.jpg" alt="Guest Lecture Series" onerror="this.src='https://via.placeholder.com/400x200?text=Guest+Lecture+Series'">
            </div>
            <div class="news-content">
                <span class="news-date">April 10, 2023</span>
                <h3 class="news-title">Distinguished Speaker Series Announced</h3>
                <p class="news-excerpt">Join us for a series of talks by industry leaders and renowned academics starting next month.</p>
                <a href="#" class="news-link">
                    Read More <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
        <div class="news-card">
            <div class="news-image">
                <img src="assests/images/student-commons.jpg" alt="Student Innovation Awards" onerror="this.src='https://via.placeholder.com/400x200?text=Student+Innovation+Awards'">
            </div>
            <div class="news-content">
                <span class="news-date">April 5, 2023</span>
                <h3 class="news-title">Student Innovation Awards Ceremony</h3>
                <p class="news-excerpt">The annual innovation awards will be held on May 5th to celebrate student achievements in research and development.</p>
                <a href="#" class="news-link">
                    Read More <span class="material-icons">arrow_forward</span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="stats-section">
    <div class="section-title">
        <h2>Our Impact</h2>
    </div>
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">Students</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Courses</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Countries</div>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials-section">
    <div class="section-title">
        <h2>What Our Users Say</h2>
    </div>
    <div class="testimonials-container">
        <div class="testimonial-card">
            <p class="testimonial-content">
                "The Smart University LMS has transformed how I teach my classes. The intuitive interface and powerful tools have made remote learning seamless and engaging for my students."
            </p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="assests/images/professor.jpg" alt="Professor" onerror="this.src='https://via.placeholder.com/60x60?text=Prof'">
                </div>
                <div class="author-info">
                    <h4>Dr. Jennifer Wilson</h4>
                    <p>Computer Science Professor</p>
                </div>
            </div>
        </div>
        <div class="testimonial-card">
            <p class="testimonial-content">
                "As a student, having all my courses, assignments, and grades in one place has been a game-changer. The mobile app makes it easy to stay on top of my studies from anywhere."
            </p>
            <div class="testimonial-author">
                <div class="author-avatar">
                    <img src="assests/images/student.jpg" alt="Student" onerror="this.src='https://via.placeholder.com/60x60?text=Student'">
                </div>
                <div class="author-info">
                    <h4>Michael Chen</h4>
                    <p>Engineering Student</p>
                </div>
            </div>
        </div>
    </div>
</section>
`;

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const contentContainer = document.getElementById('content-container');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
const themeToggle = document.getElementById('themeToggle');
const notificationBell = document.getElementById('notificationBell');
const notificationPanel = document.getElementById('notificationPanel');
const closeNotifications = document.getElementById('closeNotifications');
const userProfileMenu = document.getElementById('userProfileMenu');
const profileDropdown = document.getElementById('profileDropdown');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');

// Show loading spinner
function showLoading() {
    loadingOverlay.classList.add('active');
}

// Hide loading spinner
function hideLoading() {
    loadingOverlay.classList.remove('active');
    setTimeout(() => {
        loadingOverlay.style.visibility = 'hidden';
    }, 300);
}

// Initialize app
function initApp() {
    // Set initial visibility
    loadingOverlay.style.visibility = 'visible';
    
    // Load default dashboard (home)
    loadDashboard('home');
    
    // Update active state in sidebar
    sidebarItems.forEach(item => {
        if (item.getAttribute('data-role') === 'home') {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize theme from localStorage
    initTheme();
    
    // Load notifications
    loadNotifications();
}

// Initialize event listeners
function initEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && e.target !== mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Sidebar navigation
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            loadDashboard(role);
            
            // Update active state
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Mobile navigation
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            loadDashboard(role);
            
            // Update active state
            mobileNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Notification panel toggle
    notificationBell.addEventListener('click', toggleNotifications);
    document.addEventListener('click', function(e) {
        if (!notificationPanel.contains(e.target) && e.target !== notificationBell) {
            notificationPanel.classList.remove('active');
        }
    });
    closeNotifications.addEventListener('click', closeNotificationPanel);
    
    // Profile dropdown toggle
    userProfileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
        if (!profileDropdown.contains(e.target) && e.target !== userProfileMenu) {
            profileDropdown.classList.remove('active');
        }
    });
    
    // Mobile sidebar toggle
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('sidebar-toggle') || e.target.closest('.sidebar-toggle')) {
            sidebar.classList.add('active');
        }
    });
    closeSidebar.addEventListener('click', function() {
        sidebar.classList.remove('active');
    });
    
    // Main navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // CTA and Feature buttons
    document.addEventListener('click', function(e) {
        // Handle "Get Started" button
        if (e.target.classList.contains('primary-cta') || e.target.closest('.primary-cta')) {
            loadDashboard('admin');
            
            // Update active state
            sidebarItems.forEach(i => {
                if (i.getAttribute('data-role') === 'admin') {
                    i.classList.add('active');
                } else {
                    i.classList.remove('active');
                }
            });
        }
        
        // Handle "Watch Demo" button
        if (e.target.classList.contains('secondary-cta') || e.target.closest('.secondary-cta')) {
            // Open a modal or redirect to demo video 
            // For now, we'll just show an alert
            alert("Demo video coming soon!");
        }
        
        // Handle feature buttons with data-role attribute
        if (e.target.classList.contains('feature-button') || e.target.closest('.feature-button')) {
            const button = e.target.classList.contains('feature-button') ? e.target : e.target.closest('.feature-button');
            const role = button.getAttribute('data-role');
            
            if (role) {
                loadDashboard(role);
                
                // Update active state
                sidebarItems.forEach(i => {
                    if (i.getAttribute('data-role') === role) {
                        i.classList.add('active');
                    } else {
                        i.classList.remove('active');
                    }
                });
                
                // Prevent default link behavior
                e.preventDefault();
            }
        }
        
        // Handle news links (would normally go to a news page)
        if (e.target.classList.contains('news-link') || e.target.closest('.news-link')) {
            // For now, just prevent default and show an alert
            e.preventDefault();
            alert("News feature coming soon!");
        }
    });
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Toggle theme between light and dark
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Toggle notifications panel
function toggleNotifications(e) {
    e.stopPropagation();
    notificationPanel.classList.toggle('active');
    profileDropdown.classList.remove('active');
}

// Close notification panel
function closeNotificationPanel() {
    notificationPanel.classList.remove('active');
}

// Load dashboard content
async function loadDashboard(role) {
    showLoading();
    
    try {
        // Load dashboard content if not already cached
        if (!dashboards[role]) {
            await fetchDashboard(role);
        }
        
        // Inject the dashboard content
        contentContainer.innerHTML = dashboards[role];
        
        // Initialize dashboard-specific functionality
        initializeDashboard(role);
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        contentContainer.innerHTML = `<div class="error-message">Error loading dashboard. Please try again.</div>`;
    } finally {
        hideLoading();
    }
}

// Fetch dashboard content from server (simulated)
async function fetchDashboard(role) {
    // Simulate network request
    return new Promise((resolve) => {
        setTimeout(() => {
            if (role === 'home') {
                // Set home dashboard content
                dashboards.home = homeContent;
                resolve();
            } else if (role === 'admin') {
                // Fetch admin dashboard content
                fetch('components/admin-dashboard.html')
                    .then(response => response.text())
                    .then(html => {
                        dashboards.admin = html;
                        resolve();
                    })
                    .catch(error => {
                        console.error('Error fetching admin dashboard:', error);
                        dashboards.admin = `<div class="error-message">Failed to load dashboard.</div>`;
                        resolve();
                    });
            } else if (role === 'teacher') {
                // Fetch teacher dashboard
                fetch('components/teacher-dashboard.html')
                    .then(response => response.text())
                    .then(html => {
                        dashboards.teacher = html;
                        resolve();
                    })
                    .catch(error => {
                        console.error('Error fetching teacher dashboard:', error);
                        dashboards.teacher = `<div class="error-message">Failed to load dashboard.</div>`;
                        resolve();
                    });
            } else if (role === 'student') {
                // Fetch student dashboard
                fetch('components/student-dashboard.html')
                    .then(response => response.text())
                    .then(html => {
                        dashboards.student = html;
                        resolve();
                    })
                    .catch(error => {
                        console.error('Error fetching student dashboard:', error);
                        dashboards.student = `<div class="error-message">Failed to load dashboard.</div>`;
                        resolve();
                    });
            } else if (role === 'parent') {
                // Fetch parent dashboard
                fetch('components/parent-dashboard.html')
                    .then(response => response.text())
                    .then(html => {
                        dashboards.parent = html;
                        resolve();
                    })
                    .catch(error => {
                        console.error('Error fetching parent dashboard:', error);
                        dashboards.parent = `<div class="error-message">Failed to load dashboard.</div>`;
                        resolve();
                    });
            } else if (role === 'calendar') {
                // Create calendar view
                dashboards.calendar = createCalendarView();
                resolve();
            } else if (role === 'messages') {
                // Create messages view
                dashboards.messages = createMessagesView();
                resolve();
            } else if (role === 'docs') {
                // Fetch documentation
                fetch('docs.html')
                    .then(response => response.text())
                    .then(html => {
                        dashboards.docs = html;
                        resolve();
                    })
                    .catch(error => {
                        console.error('Error fetching docs:', error);
                        dashboards.docs = `<div class="error-message">Failed to load documentation.</div>`;
                        resolve();
                    });
            } else {
                // Default empty dashboard
                dashboards[role] = `<div class="dashboard">
                    <h2>Coming Soon</h2>
                    <p>This section is under development.</p>
                </div>`;
                resolve();
            }
        }, 1000); // Simulate loading delay
    });
}

// Initialize dashboard-specific functionality
function initializeDashboard(role) {
    switch (role) {
        case 'home':
            initHomepage();
            break;
        case 'admin':
            initAdminDashboard();
            break;
        case 'teacher':
            initTeacherDashboard();
            break;
        case 'student':
            initStudentDashboard();
            break;
        case 'parent':
            initParentDashboard();
            break;
        case 'calendar':
            initCalendar();
            break;
        case 'messages':
            initMessages();
            break;
    }
}

// Create calendar view
function createCalendarView() {
    return `
    <div class="dashboard">
        <div class="widget">
            <div class="widget-header">
                <h3>School Calendar</h3>
                <div class="widget-actions">
                    <button class="btn btn-outline" id="prevMonth">
                        <span class="material-icons">chevron_left</span>
                    </button>
                    <button class="btn btn-outline" id="nextMonth">
                        <span class="material-icons">chevron_right</span>
                    </button>
                    <button class="btn btn-secondary" id="addEvent">
                        <span class="material-icons">add</span> Add Event
                    </button>
                </div>
            </div>
            <div id="calendarContainer"></div>
        </div>
        
        <div class="widget">
            <div class="widget-header">
                <h3>Upcoming Events</h3>
            </div>
            <div id="eventsList">
                <div class="event-item">
                    <div class="event-date">
                        <span class="day">15</span>
                        <span class="month">Dec</span>
                    </div>
                    <div class="event-details">
                        <h4>End of Term Examination</h4>
                        <p>9:00 AM - 4:00 PM</p>
                        <p>All Classrooms</p>
                    </div>
                </div>
                <div class="event-item">
                    <div class="event-date">
                        <span class="day">20</span>
                        <span class="month">Dec</span>
                    </div>
                    <div class="event-details">
                        <h4>School Concert</h4>
                        <p>6:00 PM - 8:00 PM</p>
                        <p>Main Auditorium</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// Create messages view
function createMessagesView() {
    return `
    <div class="dashboard messages-dashboard">
        <div class="widget messages-container">
            <div class="messages-sidebar">
                <div class="search-container">
                    <input type="text" placeholder="Search messages..." class="search-input">
                </div>
                <div class="conversation-list">
                    <div class="conversation-item active">
                        <img src="assests/images/user-avatar.jpg" class="conversation-avatar" alt="User" onerror="this.src='https://via.placeholder.com/40x40'">
                        <div class="conversation-info">
                            <h4>John Smith</h4>
                            <p>Sure, I'll send the homework...</p>
                        </div>
                        <div class="conversation-meta">
                            <span class="time">10:30 AM</span>
                            <span class="unread">3</span>
                        </div>
                    </div>
                    <div class="conversation-item">
                        <img src="assests/images/user-avatar.jpg" class="conversation-avatar" alt="User" onerror="this.src='https://via.placeholder.com/40x40'">
                        <div class="conversation-info">
                            <h4>Math Class Group</h4>
                            <p>Mr. Parker: Don't forget tomorrow's quiz</p>
                        </div>
                        <div class="conversation-meta">
                            <span class="time">Yesterday</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="messages-content">
                <div class="messages-header">
                    <div class="contact-info">
                        <img src="assests/images/user-avatar.jpg" class="conversation-avatar" alt="User" onerror="this.src='https://via.placeholder.com/40x40'">
                        <div>
                            <h4>John Smith</h4>
                            <p>Online</p>
                        </div>
                    </div>
                    <div class="messages-actions">
                        <button class="btn btn-outline"><span class="material-icons">call</span></button>
                        <button class="btn btn-outline"><span class="material-icons">videocam</span></button>
                        <button class="btn btn-outline"><span class="material-icons">more_vert</span></button>
                    </div>
                </div>
                <div class="messages-body">
                    <div class="message received">
                        <div class="message-content">
                            <p>Hi, did you finish the math homework?</p>
                            <span class="message-time">10:15 AM</span>
                        </div>
                    </div>
                    <div class="message sent">
                        <div class="message-content">
                            <p>Almost done. Just struggling with the last problem.</p>
                            <span class="message-time">10:18 AM</span>
                        </div>
                    </div>
                    <div class="message received">
                        <div class="message-content">
                            <p>I can help you with that. Do you want me to send you my solution?</p>
                            <span class="message-time">10:20 AM</span>
                        </div>
                    </div>
                    <div class="message sent">
                        <div class="message-content">
                            <p>That would be great, thanks!</p>
                            <span class="message-time">10:25 AM</span>
                        </div>
                    </div>
                    <div class="message received">
                        <div class="message-content">
                            <p>Sure, I'll send the homework shortly.</p>
                            <span class="message-time">10:30 AM</span>
                        </div>
                    </div>
                </div>
                <div class="messages-footer">
                    <button class="btn btn-outline"><span class="material-icons">attach_file</span></button>
                    <input type="text" placeholder="Type a message..." class="message-input">
                    <button class="btn btn-primary"><span class="material-icons">send</span></button>
                </div>
            </div>
        </div>
    </div>`;
}

// Initialize admin dashboard specific functionality
function initAdminDashboard() {
    // Initialize data tables
    initDataTables();
    
    // Initialize export functionality
    initExport();
    
    // Initialize admin tools functionality
    initAdminTools();
    
    // Add any other admin-specific functionality
    initUserManagement();
}

// Initialize admin tools functionality
function initAdminTools() {
    // Set up submenu for admin tools if it exists
    const adminToolsMenu = document.querySelector('.sidebar-item[data-role="admin-tools"]');
    if (adminToolsMenu) {
        // Make sure the submenu is displayed when on an admin tool page
        const currentPath = window.location.pathname;
        if (currentPath.includes('/admin/')) {
            const submenu = adminToolsMenu.querySelector('.submenu');
            if (submenu && !submenu.classList.contains('show')) {
                submenu.classList.add('show');
                const dropdownIcon = adminToolsMenu.querySelector('.dropdown-icon');
                if (dropdownIcon) {
                    dropdownIcon.textContent = 'expand_less';
                }
            }
            
            // Set the active state on the correct submenu item
            const pageName = currentPath.split('/').pop().replace('.html', '');
            const submenuItem = adminToolsMenu.querySelector(`.submenu-item[data-page="${pageName}"]`);
            if (submenuItem) {
                submenuItem.classList.add('active');
            }
        }
    }
    
    // Check if specific admin tools initialization is needed based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    switch (currentPage) {
        case 'user-management':
            // Additional user management specific initialization
            console.log('Initializing User Management tools');
            break;
        case 'content-approval':
            // Content approval specific initialization
            console.log('Initializing Content Approval tools');
            break;
        case 'system-settings':
            // System settings specific initialization
            console.log('Initializing System Settings tools');
            break;
        case 'analytics':
            // Analytics specific initialization
            console.log('Initializing Analytics tools');
            break;
        case 'notifications':
            // Notifications specific initialization
            console.log('Initializing Notification Center tools');
            break;
    }
}

// Initialize teacher dashboard specific functionality
function initTeacherDashboard() {
    // Initialize grade management
    initGradeManagement();
    
    // Initialize assignment creation
    initAssignmentCreation();
}

// Initialize student dashboard specific functionality
function initStudentDashboard() {
    // Initialize course view
    initCourseView();
    
    // Initialize assignment submission
    initAssignmentSubmission();
}

// Initialize parent dashboard specific functionality
function initParentDashboard() {
    // Initialize student progress view
    initStudentProgress();
    
    // Initialize communication with teachers
    initTeacherCommunication();
}

// Initialize calendar functionality
function initCalendar() {
    // Create calendar if DOM element exists
    const calendarContainer = document.getElementById('calendarContainer');
    if (calendarContainer) {
        try {
            // Check if SchoolCalendar is defined
            if (typeof SchoolCalendar === 'undefined') {
                console.error('SchoolCalendar is not defined. Make sure calendar.js is loaded properly.');
                calendarContainer.innerHTML = '<div class="error-message">Calendar could not be loaded.</div>';
                return;
            }
            
            const calendar = new SchoolCalendar();
            calendarContainer.appendChild(calendar.calendarEl);
            
            // Add event listeners for calendar navigation
            const prevMonthBtn = document.getElementById('prevMonth');
            const nextMonthBtn = document.getElementById('nextMonth');
            const addEventBtn = document.getElementById('addEvent');
            
            if (prevMonthBtn) {
                prevMonthBtn.addEventListener('click', () => calendar.prevMonth());
            }
            
            if (nextMonthBtn) {
                nextMonthBtn.addEventListener('click', () => calendar.nextMonth());
            }
            
            if (addEventBtn) {
                addEventBtn.addEventListener('click', () => {
                    // Check if openAddEventModal is defined before calling it
                    if (typeof openAddEventModal === 'function') {
                        openAddEventModal();
                    } else {
                        console.error('openAddEventModal function is not defined');
                        if (typeof showToast === 'function') {
                            showToast('Could not open event modal', 'error');
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing calendar:', error);
            calendarContainer.innerHTML = '<div class="error-message">Error loading calendar: ' + error.message + '</div>';
        }
    }
}

// Initialize messages functionality
function initMessages() {
    // Add event listeners to message input
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.messages-footer .btn-primary');
    
    if (messageInput && sendButton) {
        // Handle sending message with Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Handle sending message with button click
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Handle conversation switching
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            conversationItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // In a real app, load the conversation data here
        });
    });
}

// Initialize event listeners for sidebar collapse and submenu toggling
function initSidebarCollapse() {
    const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarCollapseBtn && sidebar) {
        sidebarCollapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Save state to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });
        
        // Check if sidebar was collapsed previously
        const wasCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (wasCollapsed) {
            sidebar.classList.add('collapsed');
        }
    }
}

// Initialize submenu functionality
function initSubmenuToggle() {
    const submenuItems = document.querySelectorAll('.sidebar-item.has-submenu');
    
    submenuItems.forEach(item => {
        // Add click event to toggle submenu
        item.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link inside the submenu
            if (e.target.closest('.submenu')) return;
            
            // Toggle the open class to show/hide submenu
            this.classList.toggle('open');
            
            // Close other open submenus
            submenuItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
            
            e.stopPropagation();
        });
    });
    
    // Set active submenu item based on current page
    const currentPath = window.location.pathname;
    const submenuLinks = document.querySelectorAll('.submenu-item a');
    
    submenuLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.closest('.submenu-item').classList.add('active');
            link.closest('.sidebar-item.has-submenu').classList.add('open');
        }
    });
}

// Send a message (simulated)
function sendMessage() {
    const messageInput = document.querySelector('.message-input');
    const messagesBody = document.querySelector('.messages-body');
    
    if (messageInput && messagesBody && messageInput.value.trim() !== '') {
        try {
            // Create new message element
            const messageText = messageInput.value.trim();
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const messageHtml = `
            <div class="message sent">
                <div class="message-content">
                    <p>${messageText}</p>
                    <span class="message-time">${currentTime}</span>
                </div>
            </div>`;
            
            // Add message to the chat
            messagesBody.innerHTML += messageHtml;
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            messagesBody.scrollTop = messagesBody.scrollHeight;
            
            // Simulate reply (in a real app, this would come from the server)
            setTimeout(() => {
                simulateReply(messagesBody);
            }, 2000);
        } catch (error) {
            console.error('Error sending message:', error);
            if (typeof showToast === 'function') {
                showToast('Error sending message', 'error');
            }
        }
    }
}

// Simulate a reply (for demo purposes)
function simulateReply(messagesBody) {
    if (!messagesBody) return;
    
    try {
        const replies = [
            "I'll look into that.",
            "Thanks for letting me know.",
            "Let me check and get back to you.",
            "That's interesting.",
            "I understand your concern."
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const replyHtml = `
        <div class="message received">
            <div class="message-content">
                <p>${randomReply}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        </div>`;
        
        // Add reply to the chat
        messagesBody.innerHTML += replyHtml;
        
        // Scroll to bottom
        messagesBody.scrollTop = messagesBody.scrollHeight;
    } catch (error) {
        console.error('Error simulating reply:', error);
    }
}

// Initialize data tables (for admin dashboard)
function initDataTables() {
    const tables = document.querySelectorAll('.data-table');
    
    if (!tables.length) return;
    
    try {
        tables.forEach(table => {
            // Add sort functionality to table headers
            const headers = table.querySelectorAll('th');
            
            headers.forEach(header => {
                const sortIcon = header.querySelector('.sort-icon');
                
                if (sortIcon) {
                    header.addEventListener('click', function() {
                        // Toggle sort direction
                        const currentDirection = sortIcon.textContent;
                        sortIcon.textContent = currentDirection === '▼' ? '▲' : '▼';
                        
                        // Here you would actually sort the table
                        // sortTable(table, headerIndex, currentDirection === '▼');
                        console.log(`Sorting table by ${header.textContent}`);
                    });
                }
            });
            
            // Add search functionality
            const searchInput = table.parentElement.querySelector('input[type="text"]');
            
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.toLowerCase();
                    const rows = table.querySelectorAll('tbody tr');
                    
                    rows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        row.style.display = text.includes(searchTerm) ? '' : 'none';
                    });
                });
            }
        });
    } catch (error) {
        console.error('Error initializing data tables:', error);
    }
}

// Initialize export functionality
function initExport() {
    const exportButtons = document.querySelectorAll('.export-btn');
    
    if (!exportButtons.length) return;
    
    try {
        exportButtons.forEach(button => {
            button.addEventListener('click', function() {
                const table = this.closest('.widget').querySelector('table');
                
                if (table) {
                    exportTableToCSV(table);
                } else {
                    console.error('No table found for export');
                    if (typeof showToast === 'function') {
                        showToast('No table found for export', 'error');
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error initializing export functionality:', error);
    }
}

// Export table to CSV
function exportTableToCSV(table) {
    if (!table) return;
    
    try {
        const rows = table.querySelectorAll('tr');
        let csv = [];
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowData = Array.from(cells).map(cell => {
                // Replace commas with spaces and remove line breaks
                return '"' + cell.textContent.replace(/,/g, ' ').replace(/\n/g, ' ') + '"';
            });
            
            csv.push(rowData.join(','));
        });
        
        // Create CSV file
        const csvContent = csv.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export_' + new Date().toISOString().slice(0, 10) + '.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        if (typeof showToast === 'function') {
            showToast('Table exported successfully', 'success');
        }
    } catch (error) {
        console.error('Error exporting table to CSV:', error);
        if (typeof showToast === 'function') {
            showToast('Error exporting table', 'error');
        }
    }
}