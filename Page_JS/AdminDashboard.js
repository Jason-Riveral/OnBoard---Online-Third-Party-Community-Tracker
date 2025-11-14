
// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    
    // For mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
    }
}

// Switch between tabs
function switchTab(tabName) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    event.currentTarget.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Update page title
    const titles = {
        'overview': 'Dashboard Overview',
        'members': 'Member Management',
        'applications': 'Application Tracking',
        'attendance': 'Attendance Records',
        'performance': 'Performance Tracking',
        'inventory': 'Inventory Management',
        'documents': 'Document Management',
        'feedback': 'Complaints & Feedback',
        'settings': 'Organization Settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[tabName];
    
    // Close mobile sidebar after selection
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('mobile-open');
    }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(event.target) && 
        !menuToggle.contains(event.target) &&
        sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }
});

// Handle responsive sidebar
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-open');
    }
});
