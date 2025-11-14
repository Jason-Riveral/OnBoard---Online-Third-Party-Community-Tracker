
// ============================================
// DATABASE CONFIGURATION
// ============================================
const API_BASE_URL = '/api'; // Change this to your API endpoint
const USER_ID = 1; // This should be dynamically set based on logged-in user

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        return null;
    }
}

// ============================================
// INITIALIZE DASHBOARD
// ============================================

async function initializeDashboard() {
    await loadUserProfile();
    await loadHomeStats();
    await loadRecentActivity();
}

// ============================================
// USER PROFILE
// ============================================

async function loadUserProfile() {
    // Example API call: const userData = await fetchData(`/users/${USER_ID}`);
    
    // MOCK DATA - Replace with actual API call
    const userData = {
        id: 1,
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        email: 'juan.delacruz@example.com',
        phone: '+63 912 345 6789',
        address: '123 Main Street, Barangay San Roque',
        memberSince: 'January 15, 2024',
        role: 'Community Member',
        status: 'Active'
    };

    // Update sidebar
    const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
    document.getElementById('sidebarAvatar').textContent = initials;
    document.getElementById('sidebarUserName').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('sidebarUserRole').textContent = userData.status + ' Member';

    // Update welcome message
    document.getElementById('welcomeMessage').textContent = `Welcome back, ${userData.firstName}! 👋`;

    // Update profile tab
    renderProfile(userData);
}

function renderProfile(userData) {
    const initials = `${userData.firstName[0]}${userData.lastName[0]}`;
    const profileHTML = `
        <div class="profile-header">
            <div class="profile-avatar">${initials}</div>
            <div class="profile-info">
                <h3>${userData.firstName} ${userData.lastName}</h3>
                <div class="profile-role">${userData.role}</div>
                <div class="profile-status">Status: ${userData.status}</div>
            </div>
        </div>

        <div class="profile-details">
            <div class="detail-row">
                <div class="detail-label">Member ID:</div>
                <div class="detail-value">#${String(userData.id).padStart(3, '0')}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${userData.email}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Phone:</div>
                <div class="detail-value">${userData.phone}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Address:</div>
                <div class="detail-value">${userData.address}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Member Since:</div>
                <div class="detail-value">${userData.memberSince}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Role:</div>
                <div class="detail-value">${userData.role}</div>
            </div>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="editProfile()">✏️ Edit Profile</button>
            <button class="btn btn-secondary" onclick="changePassword()">🔒 Change Password</button>
        </div>
    `;
    document.getElementById('profileContent').innerHTML = profileHTML;
}

// ============================================
// HOME STATS
// ============================================

async function loadHomeStats() {
    // Example API call: const stats = await fetchData(`/users/${USER_ID}/stats`);
    
    // MOCK DATA - Replace with actual API call
    const stats = {
        attendanceRate: 95,
        tasksCompleted: 24,
        performanceRating: 4.5,
        upcomingEvents: 3
    };

    const statsHTML = `
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon green">✓</div>
            </div>
            <div class="stat-value">${stats.attendanceRate}%</div>
            <div class="stat-label">Attendance Rate</div>
        </div>

        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon blue">📊</div>
            </div>
            <div class="stat-value">${stats.tasksCompleted}</div>
            <div class="stat-label">Tasks Completed</div>
        </div>

        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon orange">🏆</div>
            </div>
            <div class="stat-value">${stats.performanceRating}/5</div>
            <div class="stat-label">Performance Rating</div>
        </div>

        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon red">📅</div>
            </div>
            <div class="stat-value">${stats.upcomingEvents}</div>
            <div class="stat-label">Upcoming Events</div>
        </div>
    `;
    document.getElementById('homeStats').innerHTML = statsHTML;
}

// ============================================
// RECENT ACTIVITY
// ============================================

async function loadRecentActivity() {
    // Example API call: const activities = await fetchData(`/users/${USER_ID}/activities`);
    
    // MOCK DATA - Replace with actual API call
    const activities = [
        { activity: 'Community Meeting Attendance', date: 'Nov 14, 2025', status: 'Present', statusClass: 'status-present' },
        { activity: 'Profile Information Updated', date: 'Nov 10, 2025', status: 'Complete', statusClass: 'status-present' },
        { activity: 'Document Access: Community Guidelines', date: 'Nov 8, 2025', status: 'Viewed', statusClass: 'status-present' }
    ];

    const tableHTML = activities.length > 0 ? `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Activity</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${activities.map(item => `
                    <tr>
                        <td>${item.activity}</td>
                        <td>${item.date}</td>
                        <td><span class="status-badge ${item.statusClass}">${item.status}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<div class="empty-state"><div class="empty-state-icon">📭</div><p>No recent activity</p></div>';

    document.getElementById('recentActivityTable').innerHTML = tableHTML;
}

// ============================================
// ATTENDANCE
// ============================================

async function loadAttendanceStats() {
    // Example API call: const stats = await fetchData(`/users/${USER_ID}/attendance/stats`);
    
    // MOCK DATA
    const stats = {
        totalPresent: 38,
        totalAbsent: 2,
        totalLate: 3,
        attendanceRate: 95
    };

    const statsHTML = `
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon green">✓</div>
            </div>
            <div class="stat-value">${stats.totalPresent}</div>
            <div class="stat-label">Total Present</div>
        </div>
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon red">❌</div>
            </div>
            <div class="stat-value">${stats.totalAbsent}</div>
            <div class="stat-label">Total Absent</div>
        </div>
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon orange">⏰</div>
            </div>
            <div class="stat-value">${stats.totalLate}</div>
            <div class="stat-label">Late Arrivals</div>
        </div>
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon blue">📊</div>
            </div>
            <div class="stat-value">${stats.attendanceRate}%</div>
            <div class="stat-label">Attendance Rate</div>
        </div>
    `;
    document.getElementById('attendanceStats').innerHTML = statsHTML;
}

async function loadAttendanceHistory() {
    // Example API call: const records = await fetchData(`/users/${USER_ID}/attendance`);
    
    // MOCK DATA
    const records = [
        { event: 'Community Meeting', date: 'Nov 14, 2025', timeIn: '9:00 AM', timeOut: '5:00 PM', status: 'Present', statusClass: 'status-present' },
        { event: 'Bayanihan Activity', date: 'Nov 10, 2025', timeIn: '8:00 AM', timeOut: '12:00 PM', status: 'Present', statusClass: 'status-present' },
        { event: 'Training Session', date: 'Nov 7, 2025', timeIn: '9:15 AM', timeOut: '4:00 PM', status: 'Late', statusClass: 'status-late' },
        { event: 'Monthly Assembly', date: 'Nov 3, 2025', timeIn: '-', timeOut: '-', status: 'Absent', statusClass: 'status-absent' }
    ];

    const tableHTML = records.length > 0 ? `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${records.map(record => `
                    <tr>
                        <td>${record.event}</td>
                        <td>${record.date}</td>
                        <td>${record.timeIn}</td>
                        <td>${record.timeOut}</td>
                        <td><span class="status-badge ${record.statusClass}">${record.status}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<div class="empty-state"><div class="empty-state-icon">📭</div><p>No attendance records</p></div>';

    document.getElementById('attendanceTable').innerHTML = tableHTML;
}

// ============================================
// PERFORMANCE
// ============================================

async function loadPerformanceStats() {
    // Example API call: const stats = await fetchData(`/users/${USER_ID}/performance/stats`);
    
    // MOCK DATA
    const stats = {
        tasksCompleted: 24,
        averageRating: 4.5,
        achievements: 8,
        pendingTasks: 2
    };

    const statsHTML = `
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon blue">📊</div>
            </div>
            <div class="stat-value">${stats.tasksCompleted}</div>
            <div class="stat-label">Tasks Completed</div>
        </div>
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon green">⭐</div>
            </div>
            <div class="stat-value">${stats.averageRating}/5</div>
            <div class="stat-label">Average Rating</div>
        </div>
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon orange">🏆</div>
            </div>
            <div class="stat-value">${stats.achievements}</div>
            <div class="stat-label">Achievements</div>
        </div>
        <div class="stat-card">
            <div class="stat-header">
                <div class="stat-icon red">⏰</div>
            </div>
            <div class="stat-value">${stats.pendingTasks}</div>
            <div class="stat-label">Pending Tasks</div>
        </div>
    `;
    document.getElementById('performanceStats').innerHTML = statsHTML;
}

async function loadPerformanceReviews() {
    // Example API call: const reviews = await fetchData(`/users/${USER_ID}/performance/reviews`);
    
    // MOCK DATA
    const reviews = [
        { period: 'October 2025', rating: '⭐⭐⭐⭐⭐', tasks: 12, comments: 'Excellent participation and leadership', date: 'Nov 1, 2025' },
        { period: 'September 2025', rating: '⭐⭐⭐⭐', tasks: 10, comments: 'Good work, consistent attendance', date: 'Oct 1, 2025' },
        { period: 'August 2025', rating: '⭐⭐⭐⭐⭐', tasks: 15, comments: 'Outstanding contribution to community', date: 'Sep 1, 2025' }
    ];

    const tableHTML = reviews.length > 0 ? `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Review Period</th>
                    <th>Rating</th>
                    <th>Tasks Completed</th>
                    <th>Comments</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${reviews.map(review => `
                    <tr>
                        <td>${review.period}</td>
                        <td>${review.rating}</td>
                        <td>${review.tasks}</td>
                        <td>${review.comments}</td>
                        <td>${review.date}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<div class="empty-state"><div class="empty-state-icon">📭</div><p>No performance reviews</p></div>';

    document.getElementById('performanceTable').innerHTML = tableHTML;
}

async function loadAchievements() {
    // Example API call: const achievements = await fetchData(`/users/${USER_ID}/achievements`);
    
    // MOCK DATA
    const achievements = [
        { icon: '🏆', title: 'Perfect Attendance', description: '3 months streak' },
        { icon: '⭐', title: 'Top Contributor', description: 'Most tasks completed' },
        { icon: '🤝', title: 'Team Player', description: 'Excellent collaboration' },
        { icon: '📈', title: 'Rising Star', description: 'Rapid improvement' }
    ];

    const achievementsHTML = achievements.length > 0 ? achievements.map(ach => `
        <div class="action-card" style="cursor: default;">
            <div class="action-icon">${ach.icon}</div>
            <div class="action-title">${ach.title}</div>
            <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">${ach.description}</p>
        </div>
    `).join('') : '<div class="empty-state"><div class="empty-state-icon">🏆</div><p>No achievements yet</p></div>';

    document.getElementById('achievementsGrid').innerHTML = achievementsHTML;
}

// ============================================
// DOCUMENTS
// ============================================

async function loadMyDocuments() {
    // Example API call: const documents = await fetchData(`/users/${USER_ID}/documents`);
    
    // MOCK DATA
    const documents = [
        { name: '📄 ID Document.pdf', type: 'Identification', date: 'Jan 15, 2024', size: '1.2 MB', id: 1 },
        { name: '📄 Certificate of Participation.pdf', type: 'Certificate', date: 'Oct 15, 2025', size: '856 KB', id: 2 },
        { name: '📄 Medical Certificate.pdf', type: 'Medical', date: 'Nov 3, 2025', size: '645 KB', id: 3 }
    ];

    const tableHTML = documents.length > 0 ? `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Document Name</th>
                    <th>Type</th>
                    <th>Upload Date</th>
                    <th>Size</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${documents.map(doc => `
                    <tr>
                        <td>${doc.name}</td>
                        <td>${doc.type}</td>
                        <td>${doc.date}</td>
                        <td>${doc.size}</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 0.5rem 1rem;" onclick="downloadDocument(${doc.id})">⬇️ Download</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<div class="empty-state"><div class="empty-state-icon">📄</div><p>No documents uploaded</p></div>';

    document.getElementById('myDocumentsTable').innerHTML = tableHTML;
}

async function loadSharedDocuments() {
    // Example API call: const documents = await fetchData(`/users/${USER_ID}/documents/shared`);
    
    // MOCK DATA
    const documents = [
        { name: '📄 Community Guidelines.pdf', sharedBy: 'Admin', date: 'Nov 1, 2025', id: 101 },
        { name: '📊 Monthly Report.xlsx', sharedBy: 'Maria Santos', date: 'Nov 10, 2025', id: 102 },
        { name: '📝 Event Schedule.docx', sharedBy: 'Admin', date: 'Nov 14, 2025', id: 103 }
    ];

    const tableHTML = documents.length > 0 ? `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Document Name</th>
                    <th>Shared By</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${documents.map(doc => `
                    <tr>
                        <td>${doc.name}</td>
                        <td>${doc.sharedBy}</td>
                        <td>${doc.date}</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 0.5rem 1rem;" onclick="viewDocument(${doc.id})">👁️ View</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<div class="empty-state"><div class="empty-state-icon">📄</div><p>No shared documents</p></div>';

    document.getElementById('sharedDocumentsTable').innerHTML = tableHTML;
}

// ============================================
// FEEDBACK
// ============================================

async function loadFeedbackHistory() {
    // Example API call: const feedback = await fetchData(`/users/${USER_ID}/feedback`);
    
    // MOCK DATA
    const feedback = [
        { type: 'Feedback', subject: 'Great community event!', date: 'Nov 14, 2025', status: 'Resolved', statusClass: 'status-present', id: 1 },
        { type: 'Suggestion', subject: 'Extended meeting hours', date: 'Nov 8, 2025', status: 'Under Review', statusClass: 'status-late', id: 2 },
        { type: 'Complaint', subject: 'Schedule conflict issue', date: 'Oct 28, 2025', status: 'Resolved', statusClass: 'status-present', id: 3 }
    ];

    const tableHTML = feedback.length > 0 ? `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Date Submitted</th>
                    <th>Status</th>
                    <th>Response</th>
                </tr>
            </thead>
            <tbody>
                ${feedback.map(item => `
                    <tr>
                        <td>${item.type}</td>
                        <td>${item.subject}</td>
                        <td>${item.date}</td>
                        <td><span class="status-badge ${item.statusClass}">${item.status}</span></td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 0.5rem 1rem;" onclick="viewFeedback(${item.id})">👁️ View</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    ` : '<div class="empty-state"><div class="empty-state-icon">💬</div><p>No feedback submitted</p></div>';

    document.getElementById('feedbackHistoryTable').innerHTML = tableHTML;
}

// ============================================
// SETTINGS
// ============================================

async function loadSettings() {
    // Example API call: const settings = await fetchData(`/users/${USER_ID}/settings`);
    
    // MOCK DATA
    const settings = {
        fullName: 'Juan Dela Cruz',
        email: 'juan.delacruz@example.com',
        phone: '+63 912 345 6789',
        address: '123 Main Street, Barangay San Roque',
        emailNotif: true,
        smsNotif: true,
        reminderNotif: true,
        publicProfile: true,
        showContact: false
    };

    const settingsHTML = `
        <h3 class="section-title">Account Settings</h3>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem; color: #667eea; font-size: 1.1rem;">Personal Information</h4>
            <div style="display: grid; gap: 1.5rem;">
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" value="${settings.fullName}">
                </div>
                <div class="form-group">
                    <label for="settingsEmail">Email Address</label>
                    <input type="email" id="settingsEmail" value="${settings.email}">
                </div>
                <div class="form-group">
                    <label for="settingsPhone">Phone Number</label>
                    <input type="tel" id="settingsPhone" value="${settings.phone}">
                </div>
                <div class="form-group">
                    <label for="settingsAddress">Address</label>
                    <input type="text" id="settingsAddress" value="${settings.address}">
                </div>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem; color: #667eea; font-size: 1.1rem;">Notification Preferences</h4>
            <div style="display: grid; gap: 1rem;">
                <div style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <input type="checkbox" id="emailNotif" ${settings.emailNotif ? 'checked' : ''} style="margin-right: 1rem;">
                    <label for="emailNotif" style="font-weight: 500; color: #333; cursor: pointer; margin: 0;">Email notifications for events</label>
                </div>
                <div style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <input type="checkbox" id="smsNotif" ${settings.smsNotif ? 'checked' : ''} style="margin-right: 1rem;">
                    <label for="smsNotif" style="font-weight: 500; color: #333; cursor: pointer; margin: 0;">SMS notifications for urgent announcements</label>
                </div>
                <div style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <input type="checkbox" id="reminderNotif" ${settings.reminderNotif ? 'checked' : ''} style="margin-right: 1rem;">
                    <label for="reminderNotif" style="font-weight: 500; color: #333; cursor: pointer; margin: 0;">Reminder notifications for meetings</label>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem; color: #667eea; font-size: 1.1rem;">Privacy Settings</h4>
            <div style="display: grid; gap: 1rem;">
                <div style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <input type="checkbox" id="publicProfile" ${settings.publicProfile ? 'checked' : ''} style="margin-right: 1rem;">
                    <label for="publicProfile" style="font-weight: 500; color: #333; cursor: pointer; margin: 0;">Make my profile visible to other members</label>
                </div>
                <div style="display: flex; align-items: center; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <input type="checkbox" id="showContact" ${settings.showContact ? 'checked' : ''} style="margin-right: 1rem;">
                    <label for="showContact" style="font-weight: 500; color: #333; cursor: pointer; margin: 0;">Show my contact information</label>
                </div>
            </div>
        </div>

        <div style="display: flex; gap: 1rem;">
            <button class="btn btn-primary" onclick="saveSettings()">💾 Save Changes</button>
            <button class="btn btn-secondary" onclick="changePassword()">🔒 Change Password</button>
        </div>
    `;
    document.getElementById('settingsForm').innerHTML = settingsHTML;
}

// ============================================
// ACTION FUNCTIONS
// ============================================

function editProfile() {
    alert('Edit Profile functionality - Connect to your backend API');
    // Implement edit profile modal or redirect
}

function changePassword() {
    alert('Change Password functionality - Connect to your backend API');
    // Implement password change modal
}

function uploadDocument() {
    alert('Upload Document functionality - Connect to your backend API');
    // Implement file upload
}

function downloadDocument(docId) {
    alert(`Download Document ID: ${docId} - Connect to your backend API`);
    // Implement download
}

function viewDocument(docId) {
    alert(`View Document ID: ${docId} - Connect to your backend API`);
    // Implement document viewer
}

function viewFeedback(feedbackId) {
    alert(`View Feedback ID: ${feedbackId} - Connect to your backend API`);
    // Implement feedback detail view
}

async function saveSettings() {
    const settingsData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('settingsEmail').value,
        phone: document.getElementById('settingsPhone').value,
        address: document.getElementById('settingsAddress').value,
        emailNotif: document.getElementById('emailNotif').checked,
        smsNotif: document.getElementById('smsNotif').checked,
        reminderNotif: document.getElementById('reminderNotif').checked,
        publicProfile: document.getElementById('publicProfile').checked,
        showContact: document.getElementById('showContact').checked
    };

    // Example API call: await postData(`/users/${USER_ID}/settings`, settingsData);
    console.log('Saving settings:', settingsData);
    alert('Settings saved successfully!');
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    
    const titles = {
        'home': 'Home',
        'profile': 'My Profile',
        'attendance': 'My Attendance',
        'performance': 'Performance',
        'documents': 'Documents',
        'feedback': 'Feedback',
        'settings': 'Settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[tabName];
    
    // Load tab-specific data
    if (tabName === 'attendance') {
        loadAttendanceStats();
        loadAttendanceHistory();
    } else if (tabName === 'performance') {
        loadPerformanceStats();
        loadPerformanceReviews();
        loadAchievements();
    } else if (tabName === 'documents') {
        loadMyDocuments();
        loadSharedDocuments();
    } else if (tabName === 'feedback') {
        loadFeedbackHistory();
    } else if (tabName === 'settings') {
        loadSettings();
    }
    
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('mobile-open');
    }
}

// ============================================
// FORM SUBMISSION
// ============================================

document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        userId: USER_ID,
        type: document.getElementById('feedbackType').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        category: document.getElementById('category').value,
        dateSubmitted: new Date().toISOString()
    };
    
    // Example API call: await postData('/feedback', formData);
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback! We will review it shortly.');
    
    // Reset form
    this.reset();
    
    // Reload feedback history
    loadFeedbackHistory();
});

// ============================================
// MOBILE SIDEBAR HANDLING
// ============================================

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

window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-open');
    }
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});