const gameArea = document.getElementById("gameboard-wrapper");
let boxes = document.getElementsByClassName("box");
const abortController = new AbortController();
let player1 = {
	name: "Thomas",
	token: "X",
};
let player2 = {
	name: "Johnny",
	token: "O",
};
let currentoken = player2.token;
let currentPlayer = player2.name;
let gametiles = ["", "", "", "", "", "", "", "", ""];
let player1Moves = [];
let player2Moves = [];

const gameBoard = () => {
	const createBoard = (gametiles) => {
		let count = 1;
		gametiles.forEach((item) => {
			gameArea.innerHTML += `<div id=${count} class="box"></div>`;
			count++;
		});
	};
	createBoard(gametiles);
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
const checkWinner = (player1Moves,player2Moves) =>{
    player1Moves.sort((a,b) => a-b)
    player2Moves.sort((a,b) => a-b)
    for (let condition of winningconditions) {
        console.log(player1Moves + "moves + " + condition)
        if(player1Moves.sort().toString() == condition.toString()){
            alert(`${player1.name} wins this one`)
            boxes.disabled = true;
            return
        }
        if(player2Moves.sort().toString() == condition.toString()){
            alert(`${player2.name} wins this round`);
            return
        }
    }
}
  const addListener = () => {
    for (let box of boxes) {
        box.addEventListener("click", () => {
            if (box.innerHTML === "" && currentPlayer === player1.name) {
                box.innerHTML = currentoken + currentPlayer;
                player1Moves.push(box.id);
                console.log(player1Moves);
                players();
                checkWinner(player1Moves,player2Moves);
            }
            if (box.innerHTML === "" && currentPlayer === player2.name) {
                console.log(currentPlayer + "Hi");
                box.innerHTML = currentoken + currentPlayer;
                player2Moves.push(box.id);
                players();
                checkWinner(player1Moves,player2Moves);
            }
        });
    }
    
 }
	addListener();
};

const players = () => {
	currentoken = currentoken === player1.token ? player2.token : player1.token;
	currentPlayer = currentPlayer === player1.name ? player2.name : player1.name;
};

const resetGame = () => {
    player1Moves = [];
	 player2Moves = [];
    for(let box of boxes) {
        box.innerHTML = ""
    };
     
}



gameBoard();
game();
players();
