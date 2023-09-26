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
        const gameBoardHTML = document.querySelector(".gameBoard");
        gameBoardHTML.innerHTML = "";

        gameboard.forEach((square, index) => {
            gameBoardHTML.appendChild(newNode(square, index));
        });

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick);
    })
    }

    const update = (index, value) => {
        if (gameboard[index] === "") {
            gameboard[index] = value;
            render();

            return true;
        }
        return false;
    }

    return {
        render,
        update,
    }
})();

const createPlayer = (name, symbol) => {
    return {
        name,
        symbol,
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.getElementById("player1").value, "X"),
            createPlayer(document.getElementById("player2").value, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        
        GameBoard.render();
    }

    const handleClick = (e) => {
        let index = e.target.id.split("-")[1];
        let value = players[currentPlayerIndex].symbol;
        let playerChange = GameBoard.update(index, value);
        if (playerChange) {
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
    }

    return {
        start,
        handleClick,
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
    Game.start();
})
