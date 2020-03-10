function buildBoard() {

    const contGame = document.querySelector('#gameBoard');
    //console.log("contGame=" + contGame);
    playWinDrawFlag = 0;

    for (let i = 0; i < 3; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");
        rowDiv.setAttribute("id", "boardRow")
        
        for (let j = 0; j < 3; j++) {
            let colDiv = document.createElement("div");
            let classUse = classBase;

            //don't print border around the outside of board
            if (i === 0) { classUse = classUse + " border-top-0" };
            if (i === 2) { classUse = classUse + " border-bottom-0" };
            if (j === 0) { classUse = classUse + " border-left-0" };
            if (j === 2) { classUse = classUse + " border-right-0" };

            //build our game tile
            colDiv.setAttribute("class", classUse);
            colDiv.setAttribute("style", "height: 100px; background-color: ivory;");
            colDiv.setAttribute("onclick", "gameMove(this)");
            colDiv.setAttribute("id", i+","+j);
            
            //add the column
            rowDiv.appendChild(colDiv);
        }

            //add the row
        contGame.appendChild(rowDiv);

    }


    //console.log({ gameBoard });
}

function gameMove(whereClicked) {
    if (playWinDrawFlag != 0) { 
        return;
    };

    let boardSquare = whereClicked.id;
    console.log('inside gameMove=' + boardSquare);
    let squareContent = whereClicked.textContent;
    let x = boardSquare.split(',');

    if (squareContent === "") {
        if (player) {
            whereClicked.textContent = "X";
            boardArr[x[0]][x[1]] = "X";
        } else {
            whereClicked.textContent = "O";
            boardArr[x[0]][x[1]] = "O";
        }

        //console.log('boardArr=' + boardArr[x[0],x[1]]);
        player = !player;

        winner = "";
        playWinDrawFlag = checkWinDraw();
        //console.log('>playWinDrawFlag=' + playWinDrawFlag +' winner='+winner);

        if (playWinDrawFlag > 0) {
            gameOver();
            return;
        }

        // change active player text
        if (player) { 
            document.querySelector('#whichPlayer').innerHTML = 'Player X';
        } else {
            document.querySelector('#whichPlayer').innerHTML = 'Player O';
        }
        
    } else {
         //STRETCH  modal?
        if (player) {
            document.querySelector('#whichPlayer').innerHTML = 'INVALID MOVE X!';
        } else {
            document.querySelector('#whichPlayer').innerHTML = 'INVALID MOVE O!';
        }

    }
}

function resetGame() {
    //console.log("resetGame: ");
    player = true;
    playWinDrawFlag = 0;
    classBase = "col-2 border border-dark";
    boardArr = [
        ["E", "E", "E"],
        ["E", "E", "E"],
        ["E", "E", "E"]
    ];

    document.querySelector('#whichPlayer').innerHTML = 'Player X';


        // erase board by loop & delete each row.
    for (let i=0; i < 3; i++) {
        let gameRows = document.querySelector("#boardRow");
        //console.log("resetGame: gameRows" + gameRows);
        //console.log({ gameRows});
        gameRows.remove();
        //console.log('resetGame: remove row='+i);
    }

    // prompt 4 names / same players -- STRETCH

    // prompt 4 who starts -- STRETCH

    //redraw board
    buildBoard();
}

function checkWinDraw() {
    let fullFlag = true;
    //console.log('boardArr=' + boardArr);

    //check each row
    for (let i = 0; i < 3; i++) {
        if (boardArr[i][0] === "E" || 
            boardArr[i][1] === "E" || 
            boardArr[i][2] === "E") 
            {
                fullFlag = false;
                playWinDrawFlag = 0;
        } else { 
            if ( boardArr[i][0] === boardArr[i][1] &&
                    boardArr[i][0] === boardArr[i][2]) 
                    {
                        winner = boardArr[i][0];
                        //console.log('Row='+i+' winner=' + winner);
                        return 1;
            }
        }
    }

    //check each column
    for (let i = 0; i < 3; i++) {
        if (boardArr[0][i] === "E" ||
            boardArr[1][i] === "E" ||
            boardArr[2][i] === "E") 
            {
                fullFlag = false;
                playWinDrawFlag = 0;
        } else { 
            if ( boardArr[0][i] === boardArr[1][i] &&
                    boardArr[1][i] === boardArr[2][i]) 
                {
                    winner = boardArr[0][i];
                    return 1;
            }
        }
    }

    //check both diagonals
    if (boardArr[0][0] === "E" ||
        boardArr[1][1] === "E" ||
        boardArr[2][2] === "E") {
        fullFlag = false;
        playWinDrawFlag = 0;
    } else if ( boardArr[0][0] === boardArr[1][1] &&
                boardArr[0][0] === boardArr[2][2]) 
        {
        winner = boardArr[0][0];
        //console.log('Diagonal 1 winner=' + winner);
            return 1;
    }
    if (boardArr[0][2] === "E" ||
        boardArr[1][1] === "E" ||
        boardArr[2][0] === "E") 
        {
        fullFlag = false;
        playWinDrawFlag = 0;
    } else if ( boardArr[0][2] === boardArr[1][1] &&
                boardArr[0][2] === boardArr[2][0]) 
        {
        winner = boardArr[0][2];
        //console.log('Diagonal 2 winner=' + winner);
        playWinDrawFlag = 1;
        return 1;
    }

//console.log('3 fullFlag=' + fullFlag);

    if (fullFlag == true) {
        return 2;
    }

//console.log('4 fullFlag=' + fullFlag);
    return 0;
}

function gameOver() {
    //console.log('winner is ' + winner);
        if (playWinDrawFlag === 1) { 
            document.querySelector('#whichPlayer').innerHTML = 'Player '+winner+' WINS!';
        } else {
            document.querySelector('#whichPlayer').innerHTML = 'DRAW :-/';           
        }
    }

//initial game setup & start first match

let player = true;
let playWinDrawFlag = 0;
let classBase = "col-2 border border-dark";
let winner = "";
let boardArr = [
    ["E", "E", "E"],
    ["E", "E", "E"],
    ["E", "E", "E"]
];
buildBoard();