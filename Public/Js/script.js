const openBtn = document.querySelector(".open-btn");
const closeBtn = document.querySelector(".close-btn");
const Nav = document.querySelectorAll(".nav");

openBtn.addEventListener('click', function () {
        Nav.forEach(nav_el => nav_el.classList.add('visible'))
});

closeBtn.addEventListener('click', function () {
        Nav.forEach(nav_el => nav_el.classList.remove('visible'))
});

/*--------------------------------------------*/

