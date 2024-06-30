 const gameArea = document.getElementById("gameboard-wrapper")
 const player1Name = "Tom";
 const player2Name = "Johnny";
 const gameBoard = () => {
    let gametiles = ["","","","","","","","",""];
    const createBoard = (gametiles) =>{
        let count = 0;
       gametiles.forEach( item =>{
     gameArea.innerHTML +=`<div id=${count} class="box">${count}</div>`
            count++;
        })
    }
    createBoard(gametiles);
 }

 gameBoard();
