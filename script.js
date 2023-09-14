const startFormBtn = document.querySelector(".startFormBtn");
const playerForm = document.getElementById("playerForm");
const overlay = document.querySelector(".overlay");

const newNode = (square, index) => {
    const gameSquare = document.createElement("div");
    gameSquare.classList.add("square");
    gameSquare.setAttribute("id", `square-${index}`);
    gameSquare.textContent = `${square}`;
    return gameSquare;
}

const GameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        gameboard.forEach((square, index) => {
            document.querySelector(".gameBoard").appendChild(newNode(square, index));
        });
    }

    return {
        render,

    }
})();

startFormBtn.addEventListener("click", () => {
    startFormBtn.classList.add('active');
    playerForm.classList.add('active');
})

playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    playerForm.classList.remove('active');
    overlay.classList.remove('active');
    GameBoard.render();
})
