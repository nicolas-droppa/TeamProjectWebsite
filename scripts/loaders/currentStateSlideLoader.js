window.addEventListener('load', () => {
    const sidebars = document.querySelectorAll('.sidebar');
    sidebars.forEach((sidebar, i) => {
        setTimeout(() => sidebar.classList.add('slide-in'), 100 + i * 100);
    });

    const updates = document.querySelector('.updates');
    if (updates) {
        setTimeout(() => updates.classList.add('slide-in'), 250);
    }
});
