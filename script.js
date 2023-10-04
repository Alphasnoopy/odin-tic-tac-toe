const startFormBtn = document.querySelector(".startFormBtn");
const playerForm = document.getElementById("playerForm");
const overlay = document.querySelector(".overlay");

const newNode = (square, index) => {
    const gameSquare = document.createElement("div");
    gameSquare.classList.add("square");
    gameSquare.setAttribute("id", `square-${index}`);
    const squareSymbol = document.createElement("span");
    squareSymbol.textContent = `${square}`;
    gameSquare.appendChild(squareSymbol);
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

const winCombo = (winList) => {
    winList.forEach((num, index) => {
        const square = document.getElementById(`square-${num}`);
        square.firstElementChild.classList.add('active', `win-${index+1}`);
    })
}

const checkWin = (board) => {
    const winList = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winList.length; i++) {
        let [a, b, c] = winList[i];
 
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
            winCombo([a,b,c]);       
            return true;
        }
    }

    return false;
}

const checkTie = (board) => {
    return board.every(square => square !== "");
}

const turn = (currPlayer, nxtPlayer) => {
    const currSymbol = document.getElementById(currPlayer).firstElementChild;
    const nxtSymbol = document.getElementById(nxtPlayer).firstElementChild;

    currSymbol.classList.add('active');
    nxtSymbol.classList.remove('active');
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    let banners;

    const start = () => {
        players = ['X', 'O'];
        currentPlayerIndex = 0;
        gameOver = false;
        banners = document.querySelectorAll('.winnerBanner');
        
        GameBoard.render();

        turn(players[0], players[1]);

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
            GameBoard.disable();
            banners[currentPlayerIndex].firstElementChild.classList.add('active');
        }
        else if (checkTie(GameBoard.getGameboard())) {
            banners.forEach((banner) => {
                banner.firstElementChild.textContent = 'YOU TIED';
                banner.firstElementChild.classList.add('active');
            })
            gameOver = true;
        }
        else {
            if (playerChange) {
                if (currentPlayerIndex === 0) {
                    currentPlayerIndex = 1;
                    turn(players[1], players[0]);
                }
                else {
                    currentPlayerIndex = 0;
                    turn(players[0], players[1]);
                }
            }
        }
    }

    return {
        start,
        handleClick,
    }
})();

Game.start();
