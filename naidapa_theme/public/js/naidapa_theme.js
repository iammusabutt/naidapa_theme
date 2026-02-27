frappe.provide("naidapa_theme");

naidapa_theme.setup = function () {
    console.log("Naidapa Theme Loaded 🚀");
    $('body').addClass('naidapa-theme-active');

    // Example: Add a custom welcome message to the console or subtle UI tweak
    // frappe.show_alert({
    //     message: __('Naidapa Theme Enabled'),
    //     indicator: 'green'
    // });
};

$(document).on('app_ready', function () {
    naidapa_theme.setup();
});

// Also trigger on page changes if needed
$(document).on('page-change', function () {
    if (!$('body').hasClass('naidapa-theme-active')) {
        $('body').addClass('naidapa-theme-active');
    }
});

// --- CUSTOM NAVIGATION IMPLEMENTATION ---
// Render logic has been moved to Python / Jinja templates (app.py / app.html)

naidapa_theme.highlight_active_route = function () {
    const current_route = window.location.pathname;

    $('.naidapa-nav-item').removeClass('active');

    // Find the link that matches the current route
    $(`.naidapa-nav-item[href="${current_route}"]`).addClass('active');

    // Also try fuzzy matching
    if (current_route && current_route !== "/app") {
        $('.naidapa-nav-item').each(function () {
            if ($(this).attr('href') && current_route.startsWith($(this).attr('href'))) {
                $(this).addClass('active');
            }
        });
    }
};

// --- HOOK INTO FRAPPE LIFECYCLE ---

$(document).on('app_ready', function () {
    // Original setup call
    naidapa_theme.setup();

    setTimeout(() => {
        naidapa_theme.highlight_active_route();
        naidapa_theme.remove_native_sidebar();
        naidapa_theme.remove_sidebar_toggle();
        naidapa_theme.mutate_workspace_container();
    }, 200);
});

$(document).on('page-change', function () {
    // Keep highlighting in sync as user navigates
    setTimeout(() => {
        naidapa_theme.highlight_active_route();
        naidapa_theme.remove_native_sidebar();
        naidapa_theme.remove_sidebar_toggle();
        naidapa_theme.mutate_workspace_container();
    }, 100);
});

// --- OVERRIDE NATIVE DOM ELEMENTS ---

naidapa_theme.remove_native_sidebar = function () {
    const nativeSidebar = document.querySelector('.layout-side-section');
    if (nativeSidebar) {
        nativeSidebar.remove();
    }
};

naidapa_theme.remove_sidebar_toggle = function () {
    const nativeSidebarToggle = document.querySelector('.sidebar-toggle-btn');
    if (nativeSidebarToggle) {
        nativeSidebarToggle.remove();
    }
};

naidapa_theme.mutate_workspace_container = function () {
    const selectors = [
        '#body > .content > .container',
        '#body > .content > .page-head > .container'
    ];

    selectors.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            container.classList.remove('container');
            container.classList.add('container-fluid');
        }
    });
};
