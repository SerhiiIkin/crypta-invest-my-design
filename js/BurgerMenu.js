const menu = document.querySelector(".header__menu");
const openMenuBtn = document.querySelector(".header__burger");

openMenuBtn.addEventListener("click", openMenu);

function openMenu() {
    menu.classList.toggle("active");
    openMenuBtn.classList.toggle("active");
}

