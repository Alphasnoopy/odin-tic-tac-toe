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

    const getGameboard = () => {return gameboard}

    const disable = () => {
        const squares = document.querySelectorAll('.square');

        squares.forEach((square) => {
            square.removeEventListener("click", Game.handleClick);
        })
    }

    const clear = () => {gameboard = ["", "", "", "", "", "", "", "", ""]}

    return {
        render,
        update,
        getGameboard,
        disable,
        clear,
    }
})();

const checkWin = (board) => {
    const winList = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winList.length; i++) {
        let [a, b, c] = winList[i];
 
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {       
            return true;
        }
    }

    return false;
}

const checkTie = (board) => {
    return board.every(square => square !== "");
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = ['X', 'O'];
        currentPlayerIndex = 0;
        gameOver = false;
        
        GameBoard.render();

        const reset = document.getElementById('reset');
        reset.addEventListener("click", () =>{
            GameBoard.clear();
            start();
        })
    }

    const handleClick = (e) => {
        let index = e.target.id.split("-")[1];
        let value = players[currentPlayerIndex];
        let playerChange = GameBoard.update(index, value);

        if (checkWin(GameBoard.getGameboard())) {
            gameOver = true;
            console.log("win");
            GameBoard.disable();
        }
        else if (checkTie(GameBoard.getGameboard())) {
            gameOver = true;
        }
        else {
            if (playerChange) {
                currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            }
        }
    }

    return {
        start,
        handleClick,
    }
})();

Game.start();
