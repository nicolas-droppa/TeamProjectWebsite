const dayNightButton = document.getElementById('dayNightButton');
const dayNightPopup = document.getElementById('dayNightPopup');
const modeOptions = document.querySelectorAll('.mode-option');

dayNightButton.addEventListener('click', () => {
    const isVisible = dayNightPopup.style.display === 'flex';
    dayNightPopup.style.display = isVisible ? 'none' : 'flex';
    dayNightButton.innerHTML = isVisible 
        ? '<i class="fa-solid fa-chevron-down"></i>' 
        : '<i class="fa-solid fa-chevron-up"></i>';
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

        dayNightPopup.style.display = 'none';
        dayNightButton.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    });
});

window.addEventListener('load', () => {
    if(localStorage.getItem('dark-mode') === 'enabled'){
        document.body.classList.add('dark-mode');
    }
});