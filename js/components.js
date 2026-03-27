// js/components.js
import { handleLogout } from './auth.js';

export function injectSidebar(activeId) {
    const sidebarHTML = `
        <nav class="sidebar glass-panel">
            <div class="sidebar-logo">
                <i class="fa-solid fa-wallet"></i>
                <span>Tracker</span>
            </div>
            <ul class="nav-links">
                <a href="index.html" class="nav-item ${activeId === 'dashboard' ? 'active' : ''}">
                    <i class="fa-solid fa-chart-pie"></i><span>Dashboard</span>
                </a>
                <a href="expenses.html" class="nav-item ${activeId === 'expenses' ? 'active' : ''}">
                    <i class="fa-solid fa-arrow-trend-down"></i><span>Expenses</span>
                </a>
                <a href="income.html" class="nav-item ${activeId === 'income' ? 'active' : ''}">
                    <i class="fa-solid fa-arrow-trend-up"></i><span>Income</span>
                </a>
                <a href="budget.html" class="nav-item ${activeId === 'budget' ? 'active' : ''}">
                    <i class="fa-solid fa-money-bill-wave"></i><span>Budget</span>
                </a>
                <a href="reports.html" class="nav-item ${activeId === 'reports' ? 'active' : ''}">
                    <i class="fa-solid fa-chart-line"></i><span>Reports</span>
                </a>
                <a href="goals.html" class="nav-item ${activeId === 'goals' ? 'active' : ''}">
                    <i class="fa-solid fa-bullseye"></i><span>Goals</span>
                </a>
                <a href="calendar.html" class="nav-item ${activeId === 'calendar' ? 'active' : ''}">
                    <i class="fa-solid fa-calendar-days"></i><span>Calendar</span>
                </a>
                <a href="score.html" class="nav-item ${activeId === 'score' ? 'active' : ''}">
                    <i class="fa-solid fa-star-half-stroke"></i><span>Spending Score</span>
                </a>
                <a href="challenge.html" class="nav-item ${activeId === 'challenge' ? 'active' : ''}">
                    <i class="fa-solid fa-fire-flame-curved"></i><span>No Spend Days</span>
                </a>
                <a href="timemachine.html" class="nav-item ${activeId === 'timemachine' ? 'active' : ''}">
                    <i class="fa-solid fa-clock-rotate-left"></i><span>Time Machine</span>
                </a>
                <a href="ai-insights.html" class="nav-item ${activeId === 'ai-insights' ? 'active' : ''}">
                    <i class="fa-solid fa-robot"></i><span>AI Insights</span>
                </a>
                <a href="guide.html" class="nav-item ${activeId === 'guide' ? 'active' : ''}">
                    <i class="fa-solid fa-book-open-reader"></i><span>User Guide</span>
                </a>
                <a href="settings.html" class="nav-item ${activeId === 'settings' ? 'active' : ''}">
                    <i class="fa-solid fa-gear"></i><span>Settings</span>
                </a>
            </ul>
            <div class="sidebar-footer">
                <button id="logout-btn" class="btn btn-outline" style="width: 100%; justify-content: flex-start;">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
            </div>
        </nav>
    `;
    return sidebarHTML;
}

export function injectHeader(title, userName) {
    const headerHTML = `
        <header class="top-header">
            <div>
                <h2>${title}</h2>
                <p id="header-subtitle">Manage your money effectively</p>
            </div>
            <div class="header-user">
                <div class="theme-toggle" id="theme-toggle" style="cursor: pointer; font-size: 1.2rem; margin-right: 15px;">
                    <i class="fa-solid fa-moon"></i>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 600;">${userName || 'Student'}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Verified User</div>
                </div>
                <div class="avatar">${(userName ? userName.charAt(0) : 'U').toUpperCase()}</div>
                <button id="header-logout-btn" class="btn btn-outline" style="margin-left: 15px; padding: 0.3rem 0.8rem; font-size: 0.85rem; border-color: var(--danger); color: var(--danger);" title="Logout">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </header>
    `;
    return headerHTML;
}

export function setupCommonUI(containerId, activeId, title, profile) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Inject sidebar and wrap main content
    const mainContentHTML = container.innerHTML;
    container.innerHTML = `
        ${injectSidebar(activeId)}
        <div class="main-content">
            ${injectHeader(title, profile ? profile.name : '')}
            <div class="page-content fade-in">
                ${mainContentHTML}
            </div>
        </div>
    `;

    // Setup Logout Event Listener
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    document.getElementById('header-logout-btn')?.addEventListener('click', handleLogout);

    // Setup Theme Toggle Listener
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update Icon
        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    });

    // Initialize Theme Icon
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}
