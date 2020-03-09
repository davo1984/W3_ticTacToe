function buildBoard() {

    const contGame = document.querySelector('#gameBoard');
    console.log("contGame=" + contGame);

    for (let i = 0; i < 3; i++) {
        let rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "row");
        console.log('add row' + i);
        // append row
        
        for (let j = 0; j < 3; j++) {
            let colDiv = document.createElement("div");
            colDiv.setAttribute("class", "col-2 border border-dark");
            colDiv.setAttribute("style", "height: 100px; background-color: ivory;");
            colDiv.innerHTML = j;
            
            console.log('add col' + j);
            // append col
            rowDiv.appendChild(colDiv);
            //document.body.insertAfter(colDiv, rowDiv); 
            //contGame.insertAdjacentElement("beforeend", colDiv);
            
        }
        contGame.appendChild(rowDiv);

    }

    console.log({ gameBoard });
}

function gameMove() {

}

//console.log('before buildBoard');
buildBoard();