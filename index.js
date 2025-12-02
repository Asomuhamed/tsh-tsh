

// ========== LOCAL STORAGE API ==========
const StorageAPI = {
    // Initialize default data if not exists
    init() {
        if (!localStorage.getItem('class9_users')) {
            const defaultUsers = [
                { id: 1, name: "Admin User", username: "admin", password: "admin123", email: "admin@school.edu", role: "Admin" },
                { id: 2, name: "Student One", username: "student1", password: "student123", email: "student1@school.edu", role: "Student" },
                { id: 3, name: "Student Two", username: "student2", password: "student123", email: "student2@school.edu", role: "Student" }
            ];
            this.setUsers(defaultUsers);
        }

        if (!localStorage.getItem('class9_questions')) {
            const defaultQuestions = [
                {
                    id: 1,
                    subject: "kurdish",
                    unitId: 1,
                    lessonId: 1,
                    question: "What is the capital of Kurdistan?",
                    options: ["Erbil", "Baghdad", "Damascus", "Tehran"],
                    correctAnswer: 0
                },
                {
                    id: 2,
                    subject: "kurdish",
                    unitId: 1,
                    lessonId: 1,
                    question: "Which language family does Kurdish belong to?",
                    options: ["Semitic", "Indo-European", "Turkic", "Dravidian"],
                    correctAnswer: 1
                }
            ];
            this.setQuestions(defaultQuestions);
        }

        if (!localStorage.getItem('class9_units')) {
            const defaultUnits = {
                kurdish: [
                    { id: 1, name: "Grammar Basics", description: "Fundamental grammar rules", lessons: [
                        { id: 1, name: "Nouns and Pronouns", description: "Understanding nouns and pronouns" },
                        { id: 2, name: "Verb Conjugation", description: "How to conjugate verbs" }
                    ]},
                    { id: 2, name: "Literature", description: "Kurdish literary works", lessons: [
                        { id: 3, name: "Classic Poetry", description: "Study of classic Kurdish poetry" },
                        { id: 4, name: "Modern Prose", description: "Contemporary Kurdish literature" }
                    ]}
                ],
                english: [
                    { id: 1, name: "Basic Grammar", description: "English grammar fundamentals", lessons: [
                        { id: 1, name: "Tenses", description: "Understanding English tenses" },
                        { id: 2, name: "Sentence Structure", description: "Building proper sentences" }
                    ]},
                    { id: 2, name: "Vocabulary", description: "Expanding English vocabulary", lessons: [
                        { id: 3, name: "Common Phrases", description: "Everyday English expressions" },
                        { id: 4, name: "Academic Words", description: "Vocabulary for academic purposes" }
                    ]}
                ]
            };
            this.setUnits(defaultUnits);
        }

        if (!localStorage.getItem('class9_language')) {
            this.setLanguage('en');
        }
    },

    // User management
    getUsers() {
        return JSON.parse(localStorage.getItem('class9_users') || '[]');
    },

    setUsers(users) {
        localStorage.setItem('class9_users', JSON.stringify(users));
    },

    // Question management
    getQuestions() {
        return JSON.parse(localStorage.getItem('class9_questions') || '[]');
    },

    setQuestions(questions) {
        localStorage.setItem('class9_questions', JSON.stringify(questions));
    },

    // Unit and lesson management
    getUnits() {
        return JSON.parse(localStorage.getItem('class9_units') || '{}');
    },

    setUnits(units) {
        localStorage.setItem('class9_units', JSON.stringify(units));
    },

    // Language preference
    getLanguage() {
        return localStorage.getItem('class9_language') || 'en';
    },

    setLanguage(lang) {
        localStorage.setItem('class9_language', lang);
    },

    // Quiz results
    getQuizResults() {
        return JSON.parse(localStorage.getItem('class9_quiz_results') || '{}');
    },

    saveQuizResult(lessonId, score, totalQuestions) {
        const results = this.getQuizResults();
        const userId = currentUser ? currentUser.id : 'guest';
        
        if (!results[userId]) {
            results[userId] = {};
        }
        
        if (!results[userId][lessonId]) {
            results[userId][lessonId] = [];
        }
        
        results[userId][lessonId].push({
            date: new Date().toISOString(),
            score: score,
            totalQuestions: totalQuestions
        });
        
        localStorage.setItem('class9_quiz_results', JSON.stringify(results));
    }
};

// ========== TOAST NOTIFICATION SYSTEM ==========
function showToast(message, type = 'info', title = '') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info} toast-icon"></i>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========== LOADING STATE FUNCTIONS ==========
function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('btn-loading');
        button.disabled = true;
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
    }
}

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('active');
}

// ========== DOM UTILITIES ==========
function safeSetText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

// ========== LANGUAGE SYSTEM ==========
const translations = {
    en: {
        app_title: "CLASS 9", login_subtitle: "Learning Platform", username: "Username", password: "Password",
        login: "Login", login_error: "Invalid username or password!", dashboard: "Dashboard",
        admin_panel: "Learning Platform", user_manager: "User Manager", content_management: "Content Management",
        logout: "Logout", back_to_dashboard: "Back to Dashboard", user_management: "User Management",
        add_new_user: "Add New User", id: "ID", name: "Name", email: "Email", role: "Role",
        actions: "Actions", full_name: "Full Name", admin: "Admin", student: "Student",
        cancel: "Cancel", save_user: "Save User", question_upload: "Question Upload",
        upload_subtitle: "Add questions to lessons and units", title: "Title",
        description: "Description", subject: "Subject", upload_file: "Upload File",
        upload_text: "Click to upload or drag and drop", upload_hint: "PDF, DOC, PPT, Images (Max. 10MB)",
        upload_content: "Upload Content", unit_management: "Unit and Lesson Management",
        unit_subtitle: "Create and manage units and lessons", question_text: "Question Text",
        options: "Options", upload_question: "Upload Question", add_unit: "Add Unit",
        add_lesson: "Add Lesson", kurdish: "Kurdish", english: "English", arabic: "Arabic", 
        math: "Mathematics", science: "Science", social: "Social Studies", 
        social_value: "Social Value", subjects: "Subjects", previous: "Previous",
        next: "Next", submit_quiz: "Submit Quiz", quiz_completed: "Quiz Completed!",
        close_results: "Close Results", questions_uploading: "Questions Uploading",
        unit_lesson_management: "Unit and Lesson Management", question_management: "Question Management",
        continue: "Continue", correct_answer: "Correct!", wrong_answer: "Wrong!",
        correct_answer_is: "The correct answer is:"
    },
    ku: {
        app_title: "پۆلی ٩", login_subtitle: "پلاتفۆرمی فێربوون", username: "ناوی بەکارهێنەر",
        password: "وشەی نهێنی", login: "چوونەژوورەوە", login_error: "ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە!",
        dashboard: "داشبۆرد", admin_panel: "پلاتفۆرمی فێربوون", user_manager: "بەڕێوەبەری بەکارهێنەران",
        content_management: "بەڕێوەبەری ناوەڕۆک", logout: "چوونەدەرەوە",
        back_to_dashboard: "گەڕانەوە بۆ داشبۆرد", user_management: "بەڕێوەبەری بەکارهێنەران",
        add_new_user: "زیادکردنی بەکارهێنەری نوێ", id: "ژمارە", name: "ناو", email: "ئیمەیڵ",
        role: "ڕۆڵ", actions: "کردارەکان", full_name: "ناوی تەواو", admin: "بەڕێوەبەر",
        student: "خوێندکار", cancel: "پاشگەزبوونەوە", save_user: "پاشەکەوتکردنی بەکارهێنەر",
        question_upload: "بارکردنی پرسیار", upload_subtitle: "زیادکردنی پرسیار بۆ وانەکان و یەکەکان",
        title: "ناونیشان", description: "پێناسە", subject: "بابەت", upload_file: "بارکردنی فایل",
        upload_text: "کرتە بکە بۆ بارکردن یان ڕاکێشان و دانان", 
        upload_hint: "PDF, DOC, PPT, وێنە (زۆرترین: ١٠ مێگابایت)",
        upload_content: "بارکردنی ناوەڕۆک", unit_management: "بەڕێوەبەری یەکە و وانە",
        unit_subtitle: "دروستکردن و بەڕێوەبردنی یەکەکان و وانەکان", question_text: "دەقی پرسیار",
        options: "هەڵبژاردەکان", upload_question: "بارکردنی پرسیار", add_unit: "زیادکردنی یەکە",
        add_lesson: "زیادکردنی وانە", kurdish: "کوردی", english: "ئینگلیزی", arabic: "عەرەبی",
        math: "بیرکاری", science: "زانست", social: " کۆمەڵایەتی",
        social_value: "بەهای کۆمەڵایەتی", subjects: "بابەتەکان", previous: "پێشوو",
        next: "دواتر", submit_quiz: "ناردنی تاقیکردنەوە", quiz_completed: "تاقیکردنەوە تەواو بوو!",
        close_results: "داخستنی ئەنجامەکان", questions_uploading: "بارکردنی پرسیارەکان",
        unit_lesson_management: "بەڕێوەبەری یەکە و وانە", question_management: "بەڕێوەبەری پرسیارەکان",
        continue: "بەردەوامبوون", correct_answer: "وەڵامی ڕاستە!", wrong_answer: "وەڵامی هەڵەیە!",
        correct_answer_is: "وەڵامی ڕاستە:"
    },
    ar: {
        app_title: "الصف التاسع", login_subtitle: "منصة التعلم", username: "اسم المستخدم",
        password: "كلمة المرور", login: "تسجيل الدخول", login_error: "اسم المستخدم أو كلمة المرور غير صحيحة!",
        dashboard: "لوحة التحكم", admin_panel: "منصة التعلم", user_manager: "مدير المستخدمين",
        content_management: "إدارة المحتوى", logout: "تسجيل الخروج",
        back_to_dashboard: "العودة إلى لوحة التحكم", user_management: "إدارة المستخدمين",
        add_new_user: "إضافة مستخدم جديد", id: "الرقم", name: "الاسم", email: "البريد الإلكتروني",
        role: "الدور", actions: "الإجراءات", full_name: "الاسم الكامل", admin: "مدير",
        student: "طالب", cancel: "إلغاء", save_user: "حفظ المستخدم", question_upload: "رفع الأسئلة",
        upload_subtitle: "إضافة أسئلة للدروس والوحدات", title: "العنوان",
        description: "الوصف", subject: "المادة", upload_file: "رفع ملف",
        upload_text: "انقر للرفع أو اسحب وأفلت", upload_hint: "PDF, DOC, PPT, الصور (الحد الأقصى 10 ميجابايت)",
        upload_content: "رفع المحتوى", unit_management: "إدارة الوحدات والدروس",
        unit_subtitle: "إنشاء وإدارة الوحدات والدروس", question_text: "نص السؤال",
        options: "الخيارات", upload_question: "رفع السؤال", add_unit: "إضافة وحدة",
        add_lesson: "إضافة درس", kurdish: "الكردية", english: "الإنجليزية", arabic: "العربية",
        math: "الرياضيات", science: "العلوم", social: "الدراسات الاجتماعية",
        social_value: "القيمة الاجتماعية", subjects: "المواد", previous: "السابق",
        next: "التالي", submit_quiz: "إرسال الاختبار", quiz_completed: "تم الانتهاء من الاختبار!",
        close_results: "إغلاق النتائج", questions_uploading: "رفع الأسئلة",
        unit_lesson_management: "إدارة الوحدات والدروس", question_management: "إدارة الأسئلة",
        continue: "استمرار", correct_answer: "إجابة صحيحة!", wrong_answer: "إجابة خاطئة!",
        correct_answer_is: "الإجابة الصحيحة هي:"
    }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    StorageAPI.setLanguage(lang);
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update current language display
    const langName = lang === 'en' ? 'English' : lang === 'ku' ? 'Kurdî' : 'العربية';
    
    safeSetText('currentLanguage', langName);
    safeSetText('subjectDetailCurrentLanguage', langName);
    safeSetText('userManagerCurrentLanguage', langName);
    safeSetText('questionsUploadingCurrentLanguage', langName);
    safeSetText('questionManagementCurrentLanguage', langName);
    safeSetText('unitLessonManagementCurrentLanguage', langName);
    
    // Update active language option
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
    
    // Update subject names based on language
    updateSubjectNames();
    
    showToast('Language changed successfully', 'success');
}

// ========== SUBJECT NAME TRANSLATION ==========
function updateSubjectNames() {
    const subjectElements = document.querySelectorAll('.card h3');
    subjectElements.forEach(element => {
        const subjectKey = element.getAttribute('data-subject-key');
        if (subjectKey && translations[currentLanguage][subjectKey]) {
            element.textContent = translations[currentLanguage][subjectKey];
        }
    });
}

// ========== AUTHENTICATION SYSTEM & SINGLE SESSION LOGIC ==========
let users = [];
let currentUser = null;

const SESSION_STORAGE_KEY = 'class9_session_auth';
const GLOBAL_SESSION_KEY_PREFIX = 'class9_active_token_';
let sessionCheckInterval;

// Initialize Session from saved data (runs on login or refresh)
function initializeUserSession(user) {
    currentUser = user;
    
    // UI Updates
    const loginPage = document.getElementById('loginPage');
    if (loginPage) loginPage.style.display = 'none';

    const appContainer = document.getElementById('appContainer');
    if (appContainer) appContainer.classList.add('active');
    
    const initials = user.name.split(' ').map(n => n[0]).join('');
    
    // Update all user profiles in DOM
    const profileIds = [
        { name: 'currentUser', avatar: 'userAvatar' },
        { name: 'subjectDetailCurrentUser', avatar: 'subjectDetailUserAvatar' },
        { name: 'userManagerCurrentUser', avatar: 'userManagerUserAvatar' },
        { name: 'questionsUploadingCurrentUser', avatar: 'questionsUploadingUserAvatar' },
        { name: 'questionManagementCurrentUser', avatar: 'questionManagementUserAvatar' },
        { name: 'unitLessonManagementCurrentUser', avatar: 'unitLessonManagementUserAvatar' }
    ];

    profileIds.forEach(profile => {
        safeSetText(profile.name, user.name);
        safeSetText(profile.avatar, initials);
    });
    
    if (user.role === 'Admin') {
        document.body.classList.add('user-admin');
    } else {
        document.body.classList.remove('user-admin');
    }
    
    startWatermark(user.username + " (" + user.id + ")");
    loadDashboard();
    
    // Start monitoring for concurrent sessions on other devices
    startSessionMonitoring();
}

// Check if a session already exists (Runs on page load)
function checkExistingSession() {
    try {
        // Check sessionStorage (survives refresh, dies on close)
        const localData = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (localData) {
            const { userId, token } = JSON.parse(localData);
            
            // Check if this token matches the globally active token in LocalStorage
            // If they don't match, it means another device logged in and overwrote the global token
            const activeToken = localStorage.getItem(GLOBAL_SESSION_KEY_PREFIX + userId);
            
            if (token === activeToken) {
                // Valid session found
                const user = users.find(u => u.id === userId);
                if (user) {
                    initializeUserSession(user);
                    return; 
                }
            } else {
                // Invalid token (overridden by another device) - Clear local session
                sessionStorage.removeItem(SESSION_STORAGE_KEY);
            }
        }
    } catch(e) {
        console.error("Session restore error", e);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
}

function login(username, password) {
    showLoading();
    setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            // GENERATE UNIQUE SESSION TOKEN
            const sessionToken = Date.now().toString() + Math.random().toString(36);
            
            // 1. Save to LocalStorage (Global State - "The Server")
            // This ensures only the most recent login is considered "active"
            localStorage.setItem(GLOBAL_SESSION_KEY_PREFIX + user.id, sessionToken);
            
            // 2. Save to SessionStorage (Local State - "The Browser Tab")
            // This persists on refresh but clears on close
            const sessionData = {
                userId: user.id,
                token: sessionToken
            };
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

            initializeUserSession(user);
            showToast(`Welcome back, ${user.name}!`, 'success');
        } else {
            const loginError = document.getElementById('loginError');
            if (loginError) loginError.style.display = 'block';
            showToast('Invalid username or password', 'error');
        }
        hideLoading();
    }, 1000);
}

function startSessionMonitoring() {
    if (sessionCheckInterval) clearInterval(sessionCheckInterval);
    
    // Check periodically if another device has taken over the session
    sessionCheckInterval = setInterval(() => {
        if (!currentUser) return;
        
        const activeToken = localStorage.getItem(GLOBAL_SESSION_KEY_PREFIX + currentUser.id);
        const localData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '{}');
        
        // If global token doesn't match local token, someone else logged in
        if (activeToken !== localData.token) {
            clearInterval(sessionCheckInterval);
            alert("You have been logged out because your account was logged in on another device.");
            logout(false); // False = don't clear global state (it belongs to the other device now)
        }
    }, 2000);
}

function logout(clearGlobal = true) {
    // If manual logout, clear global token to completely free the session
    if (currentUser && clearGlobal) {
        localStorage.removeItem(GLOBAL_SESSION_KEY_PREFIX + currentUser.id);
    }

    // Always clear local session
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    if (sessionCheckInterval) clearInterval(sessionCheckInterval);

    currentUser = null;
    const appContainer = document.getElementById('appContainer');
    if (appContainer) appContainer.classList.remove('active');
    
    const loginPage = document.getElementById('loginPage');
    if (loginPage) loginPage.style.display = 'flex';
    
    const loginError = document.getElementById('loginError');
    if (loginError) loginError.style.display = 'none';
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.reset();
    
    document.body.classList.remove('user-admin');
    
    // SECURITY: Stop watermark
    stopWatermark();
    
    if (clearGlobal) {
        showToast('You have been logged out', 'info');
    }
}

// ========== USER INFO DISPLAY ==========
function updateUserInfoDisplay() {
    if (!currentUser) return;
    
    const userInfoElements = document.querySelectorAll('.user-info-display');
    userInfoElements.forEach(element => {
        element.innerHTML = `
            <strong>Logged in as:</strong> ${currentUser.name} (${currentUser.role}) | 
            <strong>Username:</strong> ${currentUser.username} | 
            <strong>Email:</strong> ${currentUser.email}
        `;
    });
}

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        switch(pageId) {
            case 'dashboard':
                pageTitle.setAttribute('data-translate', 'dashboard');
                pageTitle.textContent = translations[currentLanguage].dashboard;
                break;
        }
    }
    
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });
    
    // Update user info display
    updateUserInfoDisplay();
}

// ========== SEPARATE PAGE NAVIGATION ==========
function showSeparatePage(pageId) {
    // Hide all separate pages
    document.querySelectorAll('.separate-page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    
    // Load content for the page
    switch(pageId) {
        case 'userManagerPage':
            loadUsers();
            break;
        case 'questionsUploadingPage':
            // Nothing specific to load
            break;
        case 'questionManagementPage':
            loadQuestions();
            break;
        case 'unitLessonManagementPage':
            loadUnitList();
            break;
    }
    
    // Update user info display
    updateUserInfoDisplay();
}

function closeAllSeparatePages() {
    document.querySelectorAll('.separate-page').forEach(page => {
        page.classList.remove('active');
    });
}

// ========== DASHBOARD AND SUBJECTS ==========
const subjects = [
    { id: 1, name: "Kurdish", color: "#4CAF50", icon: "fa-language", key: "kurdish" },
    { id: 2, name: "English", color: "#2196F3", icon: "fa-language", key: "english" },
    { id: 3, name: "Arabic", color: "#FF9800", icon: "fa-language", key: "arabic" },
    { id: 4, name: "Mathematics", color: "#F44336", icon: "fa-calculator", key: "math" },
    { id: 5, name: "Science", color: "#9C27B0", icon: "fa-flask", key: "science" },
    { id: 6, name: "Social Studies", color: "#795548", icon: "fa-globe-americas", key: "social" },
    { id: 7, name: "Social Value", color: "#607D8B", icon: "fa-hands-helping", key: "social-value" }
];

let units = {};

function loadDashboard() {
    const container = document.getElementById('subjectsCardContainer');
    if (!container) return;
    container.innerHTML = '';
    
    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-icon" style="background-color: ${subject.color};">
                <i class="fas ${subject.icon}"></i>
            </div>
            <h3 data-subject-key="${subject.key}">${translations[currentLanguage][subject.key] || subject.name}</h3>
        `;
        card.addEventListener('click', () => openSubject(subject));
        container.appendChild(card);
    });
    
    // Update user info display
    updateUserInfoDisplay();
}

function openSubject(subject) {
    showSeparatePage('subjectDetailPage');
    
    safeSetText('subjectDetailPageTitle', translations[currentLanguage][subject.key] || subject.name);
    safeSetText('subjectDetailTitle', translations[currentLanguage][subject.key] || subject.name);
    
    const container = document.getElementById('subjectDetailUnitsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const subjectUnits = units[subject.key] || [];
    
    if (subjectUnits.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="empty-state-title">No Content Available</div>
                <div class="empty-state-message">This subject doesn't have any units or lessons yet.</div>
            </div>
        `;
        return;
    }
    
    subjectUnits.forEach(unit => {
        const unitElement = document.createElement('div');
        unitElement.className = 'unit-container';
        unitElement.innerHTML = `
            <div class="unit-header">
                <div class="unit-title">${unit.name}</div>
                <div class="unit-toggle">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="lessons-container">
                ${unit.lessons.map(lesson => `
                    <div class="lesson-item">
                        <div class="lesson-info">
                            <div class="lesson-title">${lesson.name}</div>
                            <div class="lesson-description">${lesson.description}</div>
                        </div>
                        <div class="lesson-actions">
                            <button class="start-quiz-btn" data-lesson-id="${lesson.id}" data-subject="${subject.key}">
                                <i class="fas fa-play"></i> Start Quiz
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        const unitHeader = unitElement.querySelector('.unit-header');
        const lessonsContainer = unitElement.querySelector('.lessons-container');
        const toggleIcon = unitElement.querySelector('.unit-toggle i');
        
        unitHeader.addEventListener('click', () => {
            const isExpanded = lessonsContainer.style.display === 'block';
            lessonsContainer.style.display = isExpanded ? 'none' : 'block';
            toggleIcon.classList.toggle('expanded', !isExpanded);
        });
        
        container.appendChild(unitElement);
    });
    
    // Update user info display
    updateUserInfoDisplay();
}

// ========== USER MANAGEMENT ==========
function loadUsers() {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>••••••••</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td class="action-buttons">
                <button class="edit-btn" data-user-id="${user.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" data-user-id="${user.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = parseInt(e.target.closest('button').getAttribute('data-user-id'));
            editUser(userId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userId = parseInt(e.target.closest('button').getAttribute('data-user-id'));
            deleteUser(userId);
        });
    });
    
    // Update user info display
    updateUserInfoDisplay();
}

function addUser(userData) {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, ...userData };
    users.push(newUser);
    StorageAPI.setUsers(users);
    loadUsers();
    showToast('User added successfully', 'success');
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('username').value = user.username;
        document.getElementById('password').value = user.password;
        document.getElementById('email').value = user.email;
        document.getElementById('role').value = user.role;
        
        document.getElementById('userModal').style.display = 'flex';
        const modalTitle = document.querySelector('.modal-title');
        if (modalTitle) modalTitle.textContent = 'Edit User';
        
        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.textContent = 'Update User';
            saveBtn.setAttribute('data-edit-id', userId);
        }
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = users.findIndex(u => u.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            StorageAPI.setUsers(users);
            loadUsers();
            showToast('User deleted successfully', 'success');
        }
    }
}

// ========== QUESTION MANAGEMENT ==========
let questions = [];

function loadQuestions() {
    const tbody = document.getElementById('questionTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const subjectFilter = document.getElementById('filterSubject').value;
    const unitFilter = document.getElementById('filterUnit').value;
    const lessonFilter = document.getElementById('filterLesson').value;
    
    let filteredQuestions = questions;
    
    if (subjectFilter) {
        filteredQuestions = filteredQuestions.filter(q => q.subject === subjectFilter);
    }
    
    if (unitFilter) {
        filteredQuestions = filteredQuestions.filter(q => q.unitId === parseInt(unitFilter));
    }
    
    if (lessonFilter) {
        filteredQuestions = filteredQuestions.filter(q => q.lessonId === parseInt(lessonFilter));
    }
    
    if (filteredQuestions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="empty-state">
                    <div class="empty-state-icon">
                        <i class="fas fa-question-circle"></i>
                    </div>
                    <div class="empty-state-title">No Questions Found</div>
                    <div class="empty-state-message">No questions match your current filters.</div>
                </td>
            </tr>
        `;
        return;
    }
    
    filteredQuestions.forEach(question => {
        const subject = subjects.find(s => s.key === question.subject);
        const unit = units[question.subject]?.find(u => u.id === question.unitId);
        const lesson = unit?.lessons?.find(l => l.id === question.lessonId);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${question.id}</td>
            <td>${subject ? subject.name : question.subject}</td>
            <td>${unit ? unit.name : 'N/A'}</td>
            <td>${lesson ? lesson.name : 'N/A'}</td>
            <td>
                <div class="question-text">${question.question}</div>
            </td>
            <td>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <div>${String.fromCharCode(65 + index)}. ${option}</div>
                    `).join('')}
                </div>
            </td>
            <td>
                <div class="correct-option">${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}</div>
            </td>
            <td class="action-buttons">
                <button class="edit-btn edit-question-btn" data-question-id="${question.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn delete-question-btn" data-question-id="${question.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-question-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionId = parseInt(e.target.closest('button').getAttribute('data-question-id'));
            editQuestionInline(questionId);
        });
    });
    
    document.querySelectorAll('.delete-question-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionId = parseInt(e.target.closest('button').getAttribute('data-question-id'));
            deleteQuestion(questionId);
        });
    });
}

function editQuestionInline(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (question) {
        // Find the table row for this question
        const rows = document.querySelectorAll('#questionTableBody tr');
        let targetRow = null;
        
        for (let row of rows) {
            const editBtn = row.querySelector('.edit-question-btn');
            if (editBtn && parseInt(editBtn.getAttribute('data-question-id')) === questionId) {
                targetRow = row;
                break;
            }
        }
        
        if (targetRow) {
            // Create edit form
            const editForm = document.createElement('div');
            editForm.className = 'question-edit-form';
            editForm.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <select class="form-select edit-question-subject" required>
                            <option value="">Select a subject</option>
                            <option value="kurdish" ${question.subject === 'kurdish' ? 'selected' : ''}>Kurdish</option>
                            <option value="english" ${question.subject === 'english' ? 'selected' : ''}>English</option>
                            <option value="arabic" ${question.subject === 'arabic' ? 'selected' : ''}>Arabic</option>
                            <option value="math" ${question.subject === 'math' ? 'selected' : ''}>Mathematics</option>
                            <option value="science" ${question.subject === 'science' ? 'selected' : ''}>Science</option>
                            <option value="social" ${question.subject === 'social' ? 'selected' : ''}>Social Studies</option>
                            <option value="social-value" ${question.subject === 'social-value' ? 'selected' : ''}>Social Value</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Unit</label>
                        <select class="form-select edit-question-unit" required>
                            <option value="">Select a unit</option>
                            <!-- Units will be dynamically populated -->
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Lesson</label>
                        <select class="form-select edit-question-lesson" required>
                            <option value="">Select a lesson</option>
                            <!-- Lessons will be dynamically populated -->
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Question Text</label>
                    <textarea class="form-textarea edit-question-text" placeholder="Enter the question" required>${question.question}</textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Options</label>
                    <div class="edit-option-row">
                        <input type="text" class="edit-option-input edit-option-a" placeholder="Option A" value="${question.options[0] || ''}" required>
                        <div class="edit-correct-option">
                            <input type="radio" class="edit-correct-checkbox" name="editCorrectOption" value="0" ${question.correctAnswer === 0 ? 'checked' : ''} required>
                            <span>Correct</span>
                        </div>
                    </div>
                    <div class="edit-option-row">
                        <input type="text" class="edit-option-input edit-option-b" placeholder="Option B" value="${question.options[1] || ''}" required>
                        <div class="edit-correct-option">
                            <input type="radio" class="edit-correct-checkbox" name="editCorrectOption" value="1" ${question.correctAnswer === 1 ? 'checked' : ''} required>
                            <span>Correct</span>
                        </div>
                    </div>
                    <div class="edit-option-row">
                        <input type="text" class="edit-option-input edit-option-c" placeholder="Option C" value="${question.options[2] || ''}">
                        <div class="edit-correct-option">
                            <input type="radio" class="edit-correct-checkbox" name="editCorrectOption" value="2" ${question.correctAnswer === 2 ? 'checked' : ''}>
                            <span>Correct</span>
                        </div>
                    </div>
                    <div class="edit-option-row">
                        <input type="text" class="edit-option-input edit-option-d" placeholder="Option D" value="${question.options[3] || ''}">
                        <div class="edit-correct-option">
                            <input type="radio" class="edit-correct-checkbox" name="editCorrectOption" value="3" ${question.correctAnswer === 3 ? 'checked' : ''}>
                            <span>Correct</span>
                        </div>
                    </div>
                </div>
                
                <div class="edit-form-actions">
                    <button class="save-edit-btn" data-question-id="${questionId}">
                        <i class="fas fa-save"></i> Save Changes
                    </button>
                    <button class="cancel-edit-btn">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            `;
            
            // Insert the edit form after the table row
            targetRow.insertAdjacentElement('afterend', editForm);
            
            // Populate units and lessons
            updateEditInlineUnitSelectors(question.subject);
            setTimeout(() => {
                const unitSelect = document.querySelector('.edit-question-unit');
                if (unitSelect) unitSelect.value = question.unitId;
                
                updateEditInlineLessonSelectors(question.subject, question.unitId);
                setTimeout(() => {
                    const lessonSelect = document.querySelector('.edit-question-lesson');
                    if (lessonSelect) lessonSelect.value = question.lessonId;
                }, 100);
            }, 100);
            
            // Add event listeners for save and cancel
            const saveBtn = editForm.querySelector('.save-edit-btn');
            const cancelBtn = editForm.querySelector('.cancel-edit-btn');
            
            saveBtn.addEventListener('click', () => {
                saveQuestionEdit(questionId);
            });
            
            cancelBtn.addEventListener('click', () => {
                editForm.remove();
            });
            
            // Update unit selectors when subject changes
            editForm.querySelector('.edit-question-subject').addEventListener('change', function() {
                const subject = this.value;
                updateEditInlineUnitSelectors(subject);
            });
            
            // Update lesson selector when unit changes
            editForm.querySelector('.edit-question-unit').addEventListener('change', function() {
                const subject = editForm.querySelector('.edit-question-subject').value;
                const unitId = this.value;
                updateEditInlineLessonSelectors(subject, unitId);
            });
        }
    }
}

function updateEditInlineUnitSelectors(subject) {
    const selector = document.querySelector('.edit-question-unit');
    if (selector) {
        const currentValue = selector.value;
        
        selector.innerHTML = '<option value="">Select a unit</option>';
        
        if (subject && units[subject]) {
            units[subject].forEach(unit => {
                const option = document.createElement('option');
                option.value = unit.id;
                option.textContent = unit.name;
                selector.appendChild(option);
            });
        }
        
        // Try to restore previous selection
        if (currentValue) {
            selector.value = currentValue;
        }
    }
}

function updateEditInlineLessonSelectors(subject, unitId) {
    const selector = document.querySelector('.edit-question-lesson');
    if (selector) {
        const currentValue = selector.value;
        
        selector.innerHTML = '<option value="">Select a lesson</option>';
        
        if (subject && unitId && units[subject]) {
            const unit = units[subject].find(u => u.id === parseInt(unitId));
            if (unit) {
                unit.lessons.forEach(lesson => {
                    const option = document.createElement('option');
                    option.value = lesson.id;
                    option.textContent = lesson.name;
                    selector.appendChild(option);
                });
            }
        }
        
        // Try to restore previous selection
        if (currentValue) {
            selector.value = currentValue;
        }
    }
}

function saveQuestionEdit(questionId) {
    const editForm = document.querySelector('.question-edit-form');
    if (!editForm) return;
    
    const subject = editForm.querySelector('.edit-question-subject').value;
    const unitId = parseInt(editForm.querySelector('.edit-question-unit').value);
    const lessonId = parseInt(editForm.querySelector('.edit-question-lesson').value);
    const questionText = editForm.querySelector('.edit-question-text').value;
    const optionA = editForm.querySelector('.edit-option-a').value;
    const optionB = editForm.querySelector('.edit-option-b').value;
    const optionC = editForm.querySelector('.edit-option-c').value;
    const optionD = editForm.querySelector('.edit-option-d').value;
    const correctOption = editForm.querySelector('input[name="editCorrectOption"]:checked');
    
    if (subject && unitId && lessonId && questionText && optionA && optionB && correctOption) {
        const questionData = {
            subject: subject,
            unitId: unitId,
            lessonId: lessonId,
            question: questionText,
            options: [optionA, optionB, optionC || '', optionD || ''].filter(opt => opt !== ''),
            correctAnswer: parseInt(correctOption.value)
        };
        
        updateQuestion(questionId, questionData);
        editForm.remove();
    } else {
        showToast('Please fill in all required fields', 'error');
    }
}

function updateQuestion(questionId, questionData) {
    const index = questions.findIndex(q => q.id === questionId);
    if (index !== -1) {
        questions[index] = { ...questions[index], ...questionData };
        StorageAPI.setQuestions(questions);
        loadQuestions();
        showToast('Question updated successfully', 'success');
    }
}

function deleteQuestion(questionId) {
    if (confirm('Are you sure you want to delete this question?')) {
        const index = questions.findIndex(q => q.id === questionId);
        if (index !== -1) {
            questions.splice(index, 1);
            StorageAPI.setQuestions(questions);
            loadQuestions();
            showToast('Question deleted successfully', 'success');
        }
    }
}

// ========== QUIZ SYSTEM ==========
let currentQuiz = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let answerSubmitted = false;

function startQuiz(lessonId, subject) {
    // Filter questions by both lesson ID and subject
    currentQuiz = questions.filter(q => q.lessonId === lessonId && q.subject === subject);
    if (currentQuiz.length === 0) {
        showToast('No questions available for this lesson', 'warning');
        return;
    }
    
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);
    answerSubmitted = false;
    
    safeSetText('quizModalTitle', 'Lesson Quiz');
    safeSetText('quizModalSubtitle', `${currentQuiz.length} Questions`);
    
    showQuestion();
    const quizModal = document.getElementById('quizModal');
    if (quizModal) quizModal.style.display = 'flex';
}

function showQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    safeSetText('currentQuestionText', question.question);
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    const optionLetters = ['A', 'B', 'C', 'D'];
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = `option-item ${userAnswers[currentQuestionIndex] === index ? 'selected' : ''}`;
        optionElement.innerHTML = `
            <div class="option-letter">${optionLetters[index]}</div>
            <div class="option-text">${option}</div>
        `;
        
        if (!answerSubmitted) {
            optionElement.addEventListener('click', () => selectOption(index));
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = `${progress}%`;
    
    safeSetText('progressText', `Question ${currentQuestionIndex + 1} of ${currentQuiz.length}`);
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevQuestionBtn');
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
        prevBtn.style.display = 'flex';
    }
    
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) nextBtn.style.display = currentQuestionIndex < currentQuiz.length - 1 ? 'flex' : 'none';
    
    const submitBtn = document.getElementById('submitQuizBtn');
    if (submitBtn) submitBtn.style.display = currentQuestionIndex === currentQuiz.length - 1 ? 'flex' : 'none';
    
    // Hide feedback section
    const feedback = document.getElementById('answerFeedback');
    if (feedback) feedback.style.display = 'none';
}

function selectOption(optionIndex) {
    if (answerSubmitted) return;
    
    userAnswers[currentQuestionIndex] = optionIndex;
    showQuestion();
    
    // Check answer immediately after selection
    checkAnswer(optionIndex);
}

function checkAnswer(selectedOption) {
    const question = currentQuiz[currentQuestionIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    
    // Show feedback
    const feedbackElement = document.getElementById('answerFeedback');
    const feedbackContent = document.getElementById('feedbackContent');
    
    if (feedbackElement && feedbackContent) {
        if (isCorrect) {
            feedbackElement.style.backgroundColor = 'rgba(75, 181, 67, 0.1)';
            feedbackElement.style.border = '2px solid rgba(75, 181, 67, 0.5)';
            feedbackContent.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <i class="fas fa-check-circle" style="color: var(--success); font-size: 1.5rem;"></i>
                    <h3 style="color: var(--success); margin: 0;">${translations[currentLanguage].correct_answer}</h3>
                </div>
            `;
        } else {
            feedbackElement.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            feedbackElement.style.border = '2px solid rgba(220, 53, 69, 0.5)';
            feedbackContent.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <i class="fas fa-times-circle" style="color: var(--danger); font-size: 1.5rem;"></i>
                    <h3 style="color: var(--danger); margin: 0;">${translations[currentLanguage].wrong_answer}</h3>
                </div>
                <p>${translations[currentLanguage].correct_answer_is} <strong>${question.options[question.correctAnswer]}</strong></p>
            `;
        }
        
        feedbackElement.style.display = 'block';
    }
    
    // Hide navigation buttons
    const prevBtn = document.getElementById('prevQuestionBtn');
    if (prevBtn) prevBtn.style.display = 'none';
    
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) nextBtn.style.display = 'none';
    
    const submitBtn = document.getElementById('submitQuizBtn');
    if (submitBtn) submitBtn.style.display = 'none';
    
    answerSubmitted = true;
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        answerSubmitted = false;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        answerSubmitted = false;
        showQuestion();
    }
}

function submitQuiz() {
    let correctCount = 0;
    const resultsDetails = document.getElementById('resultsDetails');
    if (!resultsDetails) return;
    resultsDetails.innerHTML = '';
    
    currentQuiz.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correctAnswer;
        if (isCorrect) correctCount++;
        
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
        resultItem.innerHTML = `
            <div class="question-result">${index + 1}. ${question.question}</div>
            <div class="answer-result">
                <div class="result-comparison">
                    <div class="user-answer ${isCorrect ? 'correct' : ''}">
                        <strong>Your answer:</strong> ${question.options[userAnswers[index]]}
                    </div>
                    ${!isCorrect ? `
                        <div class="correct-answer">
                            <strong>Correct answer:</strong> ${question.options[question.correctAnswer]}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        resultsDetails.appendChild(resultItem);
    });
    
    // Save quiz result
    StorageAPI.saveQuizResult(currentQuiz[0].lessonId, correctCount, currentQuiz.length);
    
    safeSetText('resultsScore', `${correctCount}/${currentQuiz.length}`);
    
    const quizModal = document.getElementById('quizModal');
    if (quizModal) quizModal.style.display = 'none';
    
    const resultsModal = document.getElementById('resultsModal');
    if (resultsModal) resultsModal.style.display = 'flex';
}

// ========== UNIT AND LESSON MANAGEMENT ==========
function addUnit(subject, name, description) {
    if (!units[subject]) {
        units[subject] = [];
    }
    
    const newId = units[subject].length > 0 ? Math.max(...units[subject].map(u => u.id)) + 1 : 1;
    units[subject].push({
        id: newId,
        name: name,
        description: description,
        lessons: []
    });
    
    StorageAPI.setUnits(units);
    showToast('Unit added successfully', 'success');
    updateUnitSelectors();
    loadUnitList();
}

function addLesson(unitId, subject, name, description) {
    const unit = units[subject].find(u => u.id === unitId);
    if (unit) {
        const newId = unit.lessons.length > 0 ? Math.max(...unit.lessons.map(l => l.id)) + 1 : 1;
        unit.lessons.push({
            id: newId,
            name: name,
            description: description
        });
        
        StorageAPI.setUnits(units);
        showToast('Lesson added successfully', 'success');
        updateLessonSelectors(subject, unitId);
        loadUnitList();
    }
}

function deleteUnit(subject, unitId) {
    if (confirm('Are you sure you want to delete this unit? All lessons in this unit will also be deleted.')) {
        const subjectUnits = units[subject];
        if (subjectUnits) {
            const unitIndex = subjectUnits.findIndex(u => u.id === unitId);
            if (unitIndex !== -1) {
                // Also delete all questions associated with this unit
                questions = questions.filter(q => !(q.subject === subject && q.unitId === unitId));
                StorageAPI.setQuestions(questions);
                
                subjectUnits.splice(unitIndex, 1);
                StorageAPI.setUnits(units);
                showToast('Unit deleted successfully', 'success');
                updateUnitSelectors();
                loadUnitList();
            }
        }
    }
}

function deleteLesson(subject, unitId, lessonId) {
    if (confirm('Are you sure you want to delete this lesson? All questions in this lesson will also be deleted.')) {
        const unit = units[subject]?.find(u => u.id === unitId);
        if (unit) {
            const lessonIndex = unit.lessons.findIndex(l => l.id === lessonId);
            if (lessonIndex !== -1) {
                // Also delete all questions associated with this lesson
                questions = questions.filter(q => !(q.subject === subject && q.unitId === unitId && q.lessonId === lessonId));
                StorageAPI.setQuestions(questions);
                
                unit.lessons.splice(lessonIndex, 1);
                StorageAPI.setUnits(units);
                showToast('Lesson deleted successfully', 'success');
                updateLessonSelectors(subject, unitId);
                loadUnitList();
            }
        }
    }
}

function loadUnitList() {
    const container = document.getElementById('unitListContainer');
    if (!container) return;
    container.innerHTML = '';
    
    if (Object.keys(units).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="empty-state-title">No Units Created</div>
                <div class="empty-state-message">Create your first unit to get started.</div>
            </div>
        `;
        return;
    }
    
    Object.keys(units).forEach(subjectKey => {
        const subject = subjects.find(s => s.key === subjectKey);
        if (!subject) return;
        
        const subjectUnits = units[subjectKey];
        if (subjectUnits.length === 0) return;
        
        const subjectHeader = document.createElement('h3');
        subjectHeader.style.marginTop = '30px';
        subjectHeader.style.marginBottom = '15px';
        subjectHeader.style.color = 'var(--primary)';
        subjectHeader.style.fontSize = '1.5rem';
        subjectHeader.textContent = subject.name;
        container.appendChild(subjectHeader);
        
        subjectUnits.forEach(unit => {
            const unitElement = document.createElement('div');
            unitElement.className = 'unit-item';
            unitElement.innerHTML = `
                <div class="unit-item-header">
                    <div class="unit-item-title">${unit.name}</div>
                    <div class="action-buttons">
                        <button class="delete-btn delete-unit-btn" data-subject="${subjectKey}" data-unit-id="${unit.id}">
                            <i class="fas fa-trash"></i> Delete Unit
                        </button>
                    </div>
                </div>
                <div class="unit-item-description">${unit.description || 'No description'}</div>
                <div class="lesson-list">
                    ${unit.lessons.length > 0 ? 
                        unit.lessons.map(lesson => `
                            <div class="lesson-item">
                                <div class="lesson-info">
                                    <div class="lesson-item-title">${lesson.name}</div>
                                    <div class="lesson-item-description">${lesson.description || 'No description'}</div>
                                </div>
                                <div class="lesson-actions">
                                    <button class="delete-btn delete-lesson-btn" data-subject="${subjectKey}" data-unit-id="${unit.id}" data-lesson-id="${lesson.id}">
                                        <i class="fas fa-trash"></i> Delete Lesson
                                    </button>
                                </div>
                            </div>
                        `).join('') : 
                        '<div class="empty-state-message">No lessons in this unit</div>'
                    }
                </div>
            `;
            container.appendChild(unitElement);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-unit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const subject = e.target.closest('button').getAttribute('data-subject');
            const unitId = parseInt(e.target.closest('button').getAttribute('data-unit-id'));
            deleteUnit(subject, unitId);
        });
    });
    
    document.querySelectorAll('.delete-lesson-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const subject = e.target.closest('button').getAttribute('data-subject');
            const unitId = parseInt(e.target.closest('button').getAttribute('data-unit-id'));
            const lessonId = parseInt(e.target.closest('button').getAttribute('data-lesson-id'));
            deleteLesson(subject, unitId, lessonId);
        });
    });
}

function updateUnitSelectors() {
    const unitSelectors = [
        document.getElementById('questionUnit'),
        document.getElementById('newLessonUnit'),
        document.getElementById('filterUnit')
    ];
    
    unitSelectors.forEach(selector => {
        if (selector) {
            let currentSubject;
            if (selector.id === 'questionUnit') {
                const subjSelect = document.getElementById('questionSubject');
                if (subjSelect) currentSubject = subjSelect.value;
            } else if (selector.id === 'filterUnit') {
                const subjSelect = document.getElementById('filterSubject');
                if (subjSelect) currentSubject = subjSelect.value;
            } else {
                const subjSelect = document.getElementById('newUnitSubject');
                if (subjSelect) currentSubject = subjSelect.value;
            }
            
            const currentValue = selector.value;
            
            selector.innerHTML = '<option value="">Select a unit</option>';
            
            if (currentSubject && units[currentSubject]) {
                units[currentSubject].forEach(unit => {
                    const option = document.createElement('option');
                    option.value = unit.id;
                    option.textContent = unit.name;
                    selector.appendChild(option);
                });
            }
            
            // Try to restore previous selection
            if (currentValue) {
                selector.value = currentValue;
            }
        }
    });
}

function updateLessonSelectors(subject, unitId) {
    const lessonSelectors = [
        document.getElementById('questionLesson'),
        document.getElementById('filterLesson')
    ];
    
    lessonSelectors.forEach(lessonSelector => {
        if (lessonSelector) {
            const currentValue = lessonSelector.value;
            
            lessonSelector.innerHTML = '<option value="">Select a lesson</option>';
            
            if (subject && unitId && units[subject]) {
                const unit = units[subject].find(u => u.id === parseInt(unitId));
                if (unit) {
                    unit.lessons.forEach(lesson => {
                        const option = document.createElement('option');
                        option.value = lesson.id;
                        option.textContent = lesson.name;
                        lessonSelector.appendChild(option);
                    });
                }
            }
            
            // Try to restore previous selection
            if (currentValue) {
                lessonSelector.value = currentValue;
            }
        }
    });
}

// ========== SECURITY FEATURES ==========

function initSecurity() {
    // Disable right click context menu
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable keyboard shortcuts used for capture/saving
    document.addEventListener('keydown', function(e) {
        // PrintScreen (often code 44), or key name 'PrintScreen'
        if (e.key === 'PrintScreen' || e.keyCode === 44) {
            toggleSecurityOverlay(true);
            // Attempt to clear clipboard to prevent pasting screenshot
            if (navigator.clipboard) {
                navigator.clipboard.writeText(''); 
            }
            // Hide after a delay
            setTimeout(() => toggleSecurityOverlay(false), 2000);
        }
        
        // Block shortcuts: Ctrl+P (Print), Ctrl+S (Save), Ctrl+U (View Source), Ctrl+Shift+I (DevTools)
        // Also Windows+Shift+S (Snipping Tool) cannot be fully blocked but we can detect keydown
        if ((e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) || 
            (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
            toggleSecurityOverlay(true);
            setTimeout(() => toggleSecurityOverlay(false), 2000);
        }
    });

    // Detect window focus loss (Blur)
    // This happens when user clicks away, opens Snipping Tool, or switches tabs.
    // We show the black screen immediately.
    window.addEventListener('blur', function() {
        if (currentUser) { // Only active when logged in
            toggleSecurityOverlay(true);
        }
    });

    // Hide black screen when user comes back
    window.addEventListener('focus', function() {
        toggleSecurityOverlay(false);
    });
    
    // Page Visibility API
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && currentUser) {
             toggleSecurityOverlay(true);
        } else {
             toggleSecurityOverlay(false);
        }
    });
}

function toggleSecurityOverlay(show) {
    const overlay = document.getElementById('securityOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }
}

function startWatermark(text) {
    const container = document.getElementById('watermarkContainer');
    if (!container) return;
    
    container.innerHTML = ''; // Clear previous
    container.classList.add('active');
    
    // Create multiple watermark elements scattered across the screen
    // to ensure "move in all part" coverage
    const count = 20; 
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'watermark-text';
        el.textContent = text;
        
        // Random initial position
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        
        // Randomize animation duration and delay to make movement chaotic
        const duration = 20 + Math.random() * 20; // 20-40s duration
        const delay = Math.random() * -40; // Start at random point in animation
        
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        
        container.appendChild(el);
    }
}

function stopWatermark() {
    const container = document.getElementById('watermarkContainer');
    if (container) {
        container.classList.remove('active');
        container.innerHTML = '';
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize storage with default data
    StorageAPI.init();
    
    // Load data from storage
    users = StorageAPI.getUsers();
    questions = StorageAPI.getQuestions();
    units = StorageAPI.getUnits();
    currentLanguage = StorageAPI.getLanguage();
    
    // Apply language
    changeLanguage(currentLanguage);
    
    // Check for existing session (Auto-login)
    checkExistingSession();
    
    // Init Security Features
    initSecurity();
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            login(username, password);
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => logout(true));

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.toggle('active');
        });
    }

    // Language selector
    const languageBtn = document.getElementById('languageBtn');
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown) dropdown.classList.toggle('active');
        });
    }

    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            const dropdown = document.getElementById('languageDropdown');
            if (dropdown) dropdown.classList.remove('active');
        });
    });

    // Menu navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            if (page === 'dashboard') {
                showPage(page);
            } else {
                // For admin pages, open in separate page
                showSeparatePage(page);
            }
            
            // Close mobile sidebar after selection
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('active');
            }
        });
    });

    // Close separate page buttons
    const closeBtns = [
        'closeUserManagerPage', 'closeQuestionsUploadingPage', 
        'closeQuestionManagementPage', 'closeUnitLessonManagementPage',
        'closeSubjectDetailPage'
    ];
    
    closeBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', closeAllSeparatePages);
    });

    // User management modal
    const openModalBtn = document.getElementById('openModalBtn');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            const userModal = document.getElementById('userModal');
            if (userModal) userModal.style.display = 'flex';
            
            const userForm = document.getElementById('userForm');
            if (userForm) userForm.reset();
            
            const modalTitle = document.querySelector('.modal-title');
            if (modalTitle) modalTitle.textContent = 'Add New User';
            
            const saveBtn = document.getElementById('saveBtn');
            if (saveBtn) {
                saveBtn.textContent = 'Save User';
                saveBtn.removeAttribute('data-edit-id');
            }
        });
    }

    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            const userModal = document.getElementById('userModal');
            if (userModal) userModal.style.display = 'none';
        });
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            const userModal = document.getElementById('userModal');
            if (userModal) userModal.style.display = 'none';
        });
    }

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const role = document.getElementById('role').value;
            
            const userData = { name, username, password, email, role };
            
            const editId = this.getAttribute('data-edit-id');
            if (editId) {
                // Update existing user
                const userIndex = users.findIndex(u => u.id === parseInt(editId));
                if (userIndex !== -1) {
                    users[userIndex] = { ...users[userIndex], ...userData };
                    StorageAPI.setUsers(users);
                    loadUsers();
                    showToast('User updated successfully', 'success');
                }
            } else {
                // Add new user
                addUser(userData);
            }
            
            const userModal = document.getElementById('userModal');
            if (userModal) userModal.style.display = 'none';
        });
    }

    // Quiz navigation
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    if (nextQuestionBtn) nextQuestionBtn.addEventListener('click', nextQuestion);
    
    const prevQuestionBtn = document.getElementById('prevQuestionBtn');
    if (prevQuestionBtn) prevQuestionBtn.addEventListener('click', prevQuestion);
    
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    if (submitQuizBtn) submitQuizBtn.addEventListener('click', submitQuiz);
    
    // Continue button for feedback
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            if (currentQuestionIndex < currentQuiz.length - 1) {
                nextQuestion();
            } else {
                submitQuiz();
            }
        });
    }
    
    // Close quiz modal
    const closeQuizModalBtn = document.getElementById('closeQuizModalBtn');
    if (closeQuizModalBtn) {
        closeQuizModalBtn.addEventListener('click', function() {
            const quizModal = document.getElementById('quizModal');
            if (quizModal) quizModal.style.display = 'none';
        });
    }
    
    // Close results modal
    const closeResultsBtn = document.getElementById('closeResultsBtn');
    if (closeResultsBtn) {
        closeResultsBtn.addEventListener('click', function() {
            const resultsModal = document.getElementById('resultsModal');
            if (resultsModal) resultsModal.style.display = 'none';
        });
    }

    // Content management
    const addUnitBtn = document.getElementById('addUnitBtn');
    if (addUnitBtn) {
        addUnitBtn.addEventListener('click', function() {
            const subject = document.getElementById('newUnitSubject').value;
            const name = document.getElementById('newUnitName').value;
            const description = document.getElementById('newUnitDescription').value;
            
            if (subject && name) {
                addUnit(subject, name, description);
                document.getElementById('newUnitName').value = '';
                document.getElementById('newUnitDescription').value = '';
            } else {
                showToast('Please fill in all required fields', 'error');
            }
        });
    }

    const addLessonBtn = document.getElementById('addLessonBtn');
    if (addLessonBtn) {
        addLessonBtn.addEventListener('click', function() {
            const unitId = parseInt(document.getElementById('newLessonUnit').value);
            const subject = document.getElementById('newUnitSubject').value;
            const name = document.getElementById('newLessonName').value;
            const description = document.getElementById('newLessonDescription').value;
            
            if (unitId && subject && name) {
                addLesson(unitId, subject, name, description);
                document.getElementById('newLessonName').value = '';
                document.getElementById('newLessonDescription').value = '';
            } else {
                showToast('Please fill in all required fields', 'error');
            }
        });
    }

    const uploadQuestionBtn = document.getElementById('uploadQuestionBtn');
    if (uploadQuestionBtn) {
        uploadQuestionBtn.addEventListener('click', function() {
            const subject = document.getElementById('questionSubject').value;
            const unitId = parseInt(document.getElementById('questionUnit').value);
            const lessonId = parseInt(document.getElementById('questionLesson').value);
            const questionText = document.getElementById('questionText').value;
            const optionA = document.getElementById('optionA').value;
            const optionB = document.getElementById('optionB').value;
            const optionC = document.getElementById('optionC').value;
            const optionD = document.getElementById('optionD').value;
            const correctOption = document.querySelector('input[name="correctOption"]:checked');
            
            if (subject && unitId && lessonId && questionText && optionA && optionB && correctOption) {
                const newQuestion = {
                    id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1,
                    subject: subject,
                    unitId: unitId,
                    lessonId: lessonId,
                    question: questionText,
                    options: [optionA, optionB, optionC || '', optionD || ''].filter(opt => opt !== ''),
                    correctAnswer: parseInt(correctOption.value)
                };
                
                questions.push(newQuestion);
                StorageAPI.setQuestions(questions);
                
                // Clear form
                document.getElementById('questionText').value = '';
                document.getElementById('optionA').value = '';
                document.getElementById('optionB').value = '';
                document.getElementById('optionC').value = '';
                document.getElementById('optionD').value = '';
                document.querySelectorAll('input[name="correctOption"]').forEach(radio => {
                    radio.checked = false;
                });
                
                showToast('Question uploaded successfully', 'success');
            } else {
                showToast('Please fill in all required fields', 'error');
            }
        });
    }

    // Update unit selectors when subject changes
    const questionSubject = document.getElementById('questionSubject');
    if (questionSubject) questionSubject.addEventListener('change', updateUnitSelectors);
    
    const newUnitSubject = document.getElementById('newUnitSubject');
    if (newUnitSubject) newUnitSubject.addEventListener('change', updateUnitSelectors);
    
    const filterSubject = document.getElementById('filterSubject');
    if (filterSubject) {
        filterSubject.addEventListener('change', function() {
            updateUnitSelectors();
            loadQuestions();
        });
    }

    // Update lesson selector when unit changes
    const questionUnit = document.getElementById('questionUnit');
    if (questionUnit) {
        questionUnit.addEventListener('change', function() {
            const subject = document.getElementById('questionSubject').value;
            const unitId = this.value;
            updateLessonSelectors(subject, unitId);
        });
    }

    const filterUnit = document.getElementById('filterUnit');
    if (filterUnit) {
        filterUnit.addEventListener('change', function() {
            const subject = document.getElementById('filterSubject').value;
            const unitId = this.value;
            updateLessonSelectors(subject, unitId);
            loadQuestions();
        });
    }

    const filterLesson = document.getElementById('filterLesson');
    if (filterLesson) {
        filterLesson.addEventListener('change', function() {
            loadQuestions();
        });
    }

    // Initialize the application
    loadUsers();
    updateUnitSelectors();
    loadUnitList();
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Start quiz buttons (delegated event listener)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('start-quiz-btn') || e.target.closest('.start-quiz-btn')) {
            const button = e.target.classList.contains('start-quiz-btn') ? e.target : e.target.closest('.start-quiz-btn');
            const lessonId = parseInt(button.getAttribute('data-lesson-id'));
            const subject = button.getAttribute('data-subject');
            startQuiz(lessonId, subject);
        }
    });
});
