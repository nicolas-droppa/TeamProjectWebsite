window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => heroContent.classList.add('slide-in'), 150);
    }

    if(localStorage.getItem('dark-mode') === 'enabled'){
        document.body.classList.add('dark-mode');
    }

    const aditionalInfo = document.querySelector('.aditional-info');
    setTimeout(() => {
        aditionalInfo.classList.add('show');
    }, 300);
});
