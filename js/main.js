function buildBoard() {

    const contGame = document.querySelector('#gameBoard');
    //console.log("contGame=" + contGame);

    for (let i = 0; i < 3; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");
        rowDiv.setAttribute("id", "boardRow");
        //console.log('add row' + i);
        // append row
        
        for (let j = 0; j < 3; j++) {
            let colDiv = document.createElement("div");
            colDiv.setAttribute("class", "col-2 border border-dark");
            colDiv.setAttribute("style", "height: 100px; background-color: ivory;");
            colDiv.setAttribute("onclick", "gameMove(this)");
            colDiv.setAttribute("id", i+","+j);
            //console.log("id=" + i + "," + j);
            //colDiv.innerHTML = j;
            
            //console.log('add col' + j);
            // append col
            rowDiv.appendChild(colDiv);
        }
            
        contGame.appendChild(rowDiv);

    }

    player = true;
    boardArr = [["E"], ["E"], ["E"]], [["E"], ["E"], ["E"]], [["E"], ["E"], ["E"]];

    //console.log({ gameBoard });
}

function gameMove(whereClicked) {
    let boardSquare = whereClicked.id;
    console.log('inside gameMove=' + boardSquare);
    let squareContent = whereClicked.textContent;
    let x = boardSquare.split(',');

    if (squareContent === "") {
        if (player) {
            whereClicked.textContent = "X";
            boardArr[x[0], x[1]] = "X";
        } else {
            whereClicked.textContent = "O";
            boardArr[x[0], x[1]] = "O";
        }

        console.log('boardArr=' + boardArr[x[0],x[1]]);
        player = !player;

        let winner = "";
        if (0 != checkWinDraw(winner)) {
            gameOver(winner);
            return;
        }
        //TODO: change active player text
        
    } else {
        ; //TODO: ERROR: INVALID MOVE!
    }
    
}

function resetGame() {
    // erase board by loop & delete each row.
    let gameRows = document.querySelectorAll(".gameRow");
    console.log("gameRows.length="+gameRows.length());

    for (let i=0; i < gameRows.length(); i++) {
        gameRows[i].remove();
        console.log('inside resetGame, remove row='+i);
    }

    // prompt 4 names / same players -- STRETCH

    // prompt 4 who starts -- STRETCH

    //redraw board
    buildBoard();
}

function checkWinDraw(winner) {
    let fullFlag = true;

    //check each row
    for (let i=0; i<3; i++) {
        if (boardArr[i, 0] === "E" || 
            boardArr[i, 1] === "E" || 
            boardArr[i, 2] === "E") {
                fullFlag = false;
                playWinDraw = 0;
        } else if ( boardArr[i, 0] === boardArr[i, 1] &&
                    boardArr[i, 0] === boardArr[i, 2]) {
                        winner = boardArr[i, 0];
                        return 1;
                    }
    }

    //check each column
    for (let i = 0; i < 3; i++) {
        if (boardArr[0, i] === "E" ||
            boardArr[1, i] === "E" ||
            boardArr[2, i] === "E") {
            fullFlag = false;
            playWinDraw = 0;
        } else if (boardArr[0, i] === boardArr[1, i] &&
            boardArr[0, i] === boardArr[2, i]) {
            winner = boardArr[i, 0];
            return 1;
        }
    }

    //check both diagonals
    if (boardArr[0, 0] === "E" ||
        boardArr[1, 1] === "E" ||
        boardArr[2, 2] === "E") {
        fullFlag = false;
        playWinDraw = 0;
    } else if (boardArr[0, 0] === boardArr[1, 1] &&
        boardArr[0, 0] === boardArr[2, 2]) {
        playWinDraw = 1;
        winner = boardArr[0, 0];
    }
    if (boardArr[0, 2] === "E" ||
        boardArr[1, 1] === "E" ||
        boardArr[2, 0] === "E") {
        fullFlag = false;
        playWinDraw = 0;
    } else if (boardArr[0, 0] === boardArr[1, 1] &&
        boardArr[0, 0] === boardArr[2, 2]) {
        winner = boardArr[0, 2];
        return 1;
    }

    if (fullFlag = true) {
        return 3;
    }
}

function gameOver(winner) {
    //TODO message winner or tie
    // need more pseudocode
}

//console.log('before buildBoard');
let player = true;
let boardArr = [[],[]]
boardArr = [["E"], ["E"], ["E"]], [["E"], ["E"], ["E"]], [["E"], ["E"], ["E"]];
buildBoard();