

const burgerButton = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burgerButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

let burgerOpen = false;

burgerButton.addEventListener('click', () => {
    burgerOpen = !burgerOpen;
    navLinks.classList.toggle('show', burgerOpen);
    burgerButton.innerHTML = burgerOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
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