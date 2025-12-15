// Toggle sidebar sections on mobile
export default function sidebarToggle() {
    // Only apply on mobile (under 900px)
    function initSidebarToggle() {
        const sections = document.querySelectorAll('.gh-sidebar-section');

        sections.forEach(section => {
            const title = section.querySelector('.gh-sidebar-section-title');

            if (title && window.innerWidth <= 900) {
                // Start collapsed on mobile
                section.classList.add('collapsed');

                title.addEventListener('click', () => {
                    section.classList.toggle('collapsed');
                });
            }
        });
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebarToggle);
    } else {
        initSidebarToggle();
    }

    // Re-initialize on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initSidebarToggle, 250);
    });
}
