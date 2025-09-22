window.addEventListener('load', () => {
    // Slide-in navbar
    const navbar = document.querySelector('.navbar');
    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';

    // Slide-in hero text
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'translateX(0)';
    heroContent.style.opacity = '1';

    if(localStorage.getItem('dark-mode') === 'enabled'){
        document.body.classList.add('dark-mode');
    }

    // Slide-in aditional-info text
    const aditionalInfo = document.querySelector('.aditional-info');
    setTimeout(() => {
        aditionalInfo.classList.add('show');
    }, 300);
});
