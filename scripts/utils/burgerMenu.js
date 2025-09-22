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