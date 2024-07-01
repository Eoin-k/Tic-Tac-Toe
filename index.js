const gameArea = document.getElementById("gameboard-wrapper");
let boxes = document.getElementsByClassName("box");
const fields = document.querySelectorAll(".form-wrapper");
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
	gameArea.style.backgroundColor = "var(--base)";
	createBoard(gametiles);

	game();

	restart.style.display = "flex";
	restart.style.justifySelf = "end";
	player1.name =
		player1Name.value !== "" ? player1Name.value.toString() : player1.name;
	player2.name =
		player2Name.value !== "" ? player2Name.value.toString() : player2.name;
	currentPlayer = player2.name;
	currentoken = player2.token;
	currentTurn.textContent = `It's ${currentPlayer} to make the first move!`;
	startGame.style.display = "none";
	for (let field of fields) {
		field.style.display = "none";
	}
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
	const winningText = (player) => {
		let winner = player;
		currentTurn.textContent = `The winner is ${winner}!!! - Click restart to play again`;
	};

	const checkWinner = (player1Moves, player2Moves) => {
		players();
		for (let condition of winningconditions) {
			if (arrayContainsArray(player1Moves, condition)) {
				// alert(`${player1.name} wins this one`);
				gameover = true;
				winningText(player1.name);
				const duration = 15 * 1000,
					animationEnd = Date.now() + duration,
					defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

				function randomInRange(min, max) {
					return Math.random() * (max - min) + min;
				}

				const interval = setInterval(function () {
					const timeLeft = animationEnd - Date.now();

					if (timeLeft <= 0) {
						return clearInterval(interval);
					}

					const particleCount = 50 * (timeLeft / duration);

					// since particles fall down, start a bit higher than random
					confetti(
						Object.assign({}, defaults, {
							particleCount,
							origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
						}),
					);
					confetti(
						Object.assign({}, defaults, {
							particleCount,
							origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
						}),
					);
				}, 250);
				return;
			}
			if (arrayContainsArray(player2Moves, condition)) {
				// alert(`${player2.name} wins this round`);
				gameover = true;
				winningText(player2.name);
				const duration = 15 * 1000,
					animationEnd = Date.now() + duration,
					defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

				function randomInRange(min, max) {
					return Math.random() * (max - min) + min;
				}

				const interval = setInterval(function () {
					const timeLeft = animationEnd - Date.now();

					if (timeLeft <= 0) {
						return clearInterval(interval);
					}

					const particleCount = 50 * (timeLeft / duration);

					// since particles fall down, start a bit higher than random
					confetti(
						Object.assign({}, defaults, {
							particleCount,
							origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
						}),
					);
					confetti(
						Object.assign({}, defaults, {
							particleCount,
							origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
						}),
					);
				}, 250);
				return;
			}
			if (
				(player1Moves.length == 5 && player2Moves.length == 4) ||
				(player1Moves.length == 4 && player2Moves.length == 5)
			) {
				alert(`It's a draw - Click restart to play again`);
				currentTurn.textContent = `It's a draw - press the restart button to go again.`;
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
					box.innerHTML = currentoken;
					player1Moves.push(Number(box.id));
					checkWinner(player1Moves, player2Moves);
				}
				if (box.innerHTML === "" && currentPlayer === player2.name) {
					box.innerHTML = currentoken;
					player2Moves.push(Number(box.id));
					checkWinner(player1Moves, player2Moves);
				}
			});
		}
	};
	addListener();
};

const players = () => {
	currentoken = currentoken === player1.token ? player2.token : player1.token;
	currentPlayer = currentPlayer === player1.name ? player2.name : player1.name;
	currentTurn.textContent = `It's ${currentPlayer}'s turn now`;
};
const resetGame = () => {
	player1Moves = [];
	player2Moves = [];
	currentTurn.textContent = `It's ${currentPlayer} to make the first move!`;
	for (let box of boxes) {
		box.innerHTML = "";
	}
	gameover = false;
};
startGame.addEventListener("click", gameBoard);
restart.addEventListener("click", resetGame);
