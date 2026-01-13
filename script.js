document.addEventListener('DOMContentLoaded', () => {
    const activityItems = document.querySelectorAll('.activity-item');

    activityItems.forEach(item => {
        const header = item.querySelector('.activity-header');

        header.addEventListener('click', () => {
            // Check if this item is currently active
            const isActive = item.classList.contains('active');

            // Close all items first
            closeAllItems();

            // If it wasn't active before, open it now
            if (!isActive) {
                openItem(item);
            }
        });
    });

    // Helper to open an item
    function openItem(item) {
        item.classList.add('active');
        const content = item.querySelector('.activity-content');
        content.style.maxHeight = content.scrollHeight + "px";
    }

    // Helper to close all items
    function closeAllItems() {
        activityItems.forEach(item => {
            item.classList.remove('active');
            const content = item.querySelector('.activity-content');
            content.style.maxHeight = null;
        });
    }

    // Initialize: Ensure the initially active item has correct height
    const initialActive = document.querySelector('.activity-item.active');
    if (initialActive) {
        openItem(initialActive);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Optional: Toggle icon styling if needed (e.g., change bars to X)
            // const icon = mobileMenuToggle.querySelector('i');
            // if (mainNav.classList.contains('active')) {
            //     icon.classList.remove('fa-bars');
            //     icon.classList.add('fa-xmark');
            // } else {
            //     icon.classList.toggle('fa-xmark');
            //     icon.classList.add('fa-bars');
            // }
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }
});
