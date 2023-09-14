const startFormBtn = document.querySelector(".startFormBtn");
const playerForm = document.getElementById("playerForm");
const overlay = document.querySelector(".overlay");

startFormBtn.addEventListener("click", () => {
    startFormBtn.classList.add('active');
    playerForm.classList.add('active');
})

playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    playerForm.classList.remove('active');
    overlay.classList.remove('active');
})

