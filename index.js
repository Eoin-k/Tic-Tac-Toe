const gameArea = document.getElementById("gameboard-wrapper");
let boxes = document.getElementsByClassName("box");
const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const startGame = document.getElementById("start-game");
const restart = document.getElementById("restart-game");
const currentTurn = document.getElementById("turn");

let player1 = {
	name: "Player 1",
	token: "X",
};
let player2 = {
	name: "Player 2",
	token: "O",
};
let currentoken = player2.token;
let currentPlayer = player2.name;
let player1Moves = [];
let player2Moves = [];
let gameover = false;

function arrayContainsArray(playerArray, condition) {
	return condition.every((value) => playerArray.includes(value));
}

const gameBoard = () => {
	let gametiles = ["", "", "", "", "", "", "", "", ""];
	const createBoard = (gametiles) => {
		let count = 1;
		gametiles.forEach((item) => {
			gameArea.innerHTML += `<div id=${count} class="box"></div>`;
			count++;
		});
	};
	createBoard(gametiles);
	game();
	
	restart.style.display = "flex";
	player1.name =
		player1Name.value !== "" ? player1Name.value.toString() : player1.name;
	player2.name =
		player2Name.value !== "" ? player2Name.value.toString() : player2.name;
	currentPlayer = player2.name;
	currentoken = player2.token;
	currentTurn.textContent = `It's currently ${currentPlayer}'s`;
	startGame.disabled = true;
};

const game = () => {
	let winningconditions = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];

	const checkWinner = (player1Moves, player2Moves) => {
		for (let condition of winningconditions) {
			if (arrayContainsArray(player1Moves, condition)) {
				alert(`${player1.name} wins this one`);
				gameover = true;
				return;
			}
			if (arrayContainsArray(player2Moves, condition)) {
				alert(`${player2.name} wins this round`);
				gameover = true;
				return;
			}
			if (
				(player1Moves.length == 5 && player2Moves.length == 4) ||
				(player1Moves.length == 4 && player2Moves.length == 5)
			) {
				alert("its a draw");
				gameover = true;
				return;
			}
		}
	};
	const addListener = () => {
		for (let box of boxes) {
			box.addEventListener("click", () => {
				if (gameover == true) {
					return;
				}
				if (box.innerHTML === "" && currentPlayer === player1.name) {
					box.innerHTML = currentoken + currentPlayer;
					player1Moves.push(Number(box.id));
					checkWinner(player1Moves, player2Moves);
					players();
				}
				if (box.innerHTML === "" && currentPlayer === player2.name) {
					box.innerHTML = currentoken + currentPlayer;
					player2Moves.push(Number(box.id));
					checkWinner(player1Moves, player2Moves);
					players();
				}
			});
		}
	};
	addListener();
};

const players = () => {
	currentoken = currentoken === player1.token ? player2.token : player1.token;
	currentPlayer = currentPlayer === player1.name ? player2.name : player1.name;
	currentTurn.textContent = currentPlayer;
};
const resetGame = () => {
	player1Moves = [];
	player2Moves = [];
	for (let box of boxes) {
		box.innerHTML = "";
	}
	gameover = false;
};
startGame.addEventListener("click", gameBoard);
restart.addEventListener("click", resetGame);
