const burgerButton = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const burgerIcon = burgerButton.querySelector('i');

let burgerOpen = false;

burgerButton.addEventListener('click', () => {
    burgerOpen = !burgerOpen;
    navLinks.classList.toggle('show', burgerOpen);

    burgerIcon.classList.add('hide');

    setTimeout(() => {
        if (burgerOpen) {
            burgerIcon.className = 'fa-solid fa-xmark';
        } else {
            burgerIcon.className = 'fa-solid fa-bars';
        }
        burgerIcon.classList.remove('hide');
    }, 150);
});

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

const dayNightButton = document.getElementById('dayNightButton');
const dayNightPopup = document.getElementById('dayNightPopup');
const modeOptions = document.querySelectorAll('.mode-option');

let popupOpen = false;

dayNightButton.addEventListener('click', () => {
    popupOpen = !popupOpen;
    dayNightPopup.classList.toggle('show', popupOpen);
    dayNightButton.style.transform = popupOpen ? 'rotate(180deg)' : 'rotate(0deg)';
});

modeOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if(mode === 'day'){
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        }

        popupOpen = false;
        dayNightPopup.classList.remove('show');
        dayNightButton.style.transform = 'rotate(0deg)';
    });
});

window.addEventListener('load', () => {
    if(localStorage.getItem('dark-mode') === 'enabled'){
        document.body.classList.add('dark-mode');
    }
});