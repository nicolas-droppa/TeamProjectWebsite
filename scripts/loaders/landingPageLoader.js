window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'translateX(0)';
    heroContent.style.opacity = '1';

    if(localStorage.getItem('dark-mode') === 'enabled'){
        document.body.classList.add('dark-mode');
    }

    const aditionalInfo = document.querySelector('.aditional-info');
    setTimeout(() => {
        aditionalInfo.classList.add('show');
    }, 300);
});
