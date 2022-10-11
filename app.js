/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
*/

let virtualBoard = {col1:0,col2:0,col3:0,col4:0,col5:0,col6:0,col7:0};
const width = 7;
const height = 6;
let board = [];
const playerDisp = document.createElement('p');
playerDisp.innerText = 'Current Player: Red';
const cssMap = new Map();
cssMap.set(2,'second');
cssMap.set(3,'third');
cssMap.set(4,'fourth');
cssMap.set(5,'fifth');
cssMap.set(6,'sixth');
cssMap.set('col1',0);
cssMap.set('col2',1);
cssMap.set('col3',2);
cssMap.set('col4',3);
cssMap.set('col5',4);
cssMap.set('col6',5);
cssMap.set('col7',0);
let currPlayer = 1; // active player: 1 or 2

const htmlGame = document.getElementById('game');
const htmlBoard = document.getElementById('board');
htmlGame.append(playerDisp);

htmlBoard.addEventListener('click', handleClick);

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
// get x from ID of clicked cell
    let parent = evt.target.parentElement;
    let parentId = evt.target.parentElement.id;

    if(virtualBoard[parentId] <= 5){
        let circle = document.createElement('img');
        if (currPlayer === 1){
            circle.setAttribute('src','assets/red-circle.svg');
            currPlayer = 2;
            playerDisp.innerText = 'Current Player: Blue';
        } else {
            circle.setAttribute('src','assets/blue-circle.svg');
            currPlayer = 1;
            playerDisp.innerText = 'Current Player: Red';
        }
        circle.classList.add('game-piece');
        circle.setAttribute('alt','Circle');
        parent.append(circle);
        // get next spot in column (if none, ignore click)
        if(virtualBoard[parentId] === 0){
            virtualBoard[parentId] = 1;
            setTimeout(() => {
                circle.classList.add('first');
            },100);  
        }
        else {
            virtualBoard[parentId] = virtualBoard[parentId] + 1;
            setTimeout(() => {
                circle.classList.add(cssMap.get(virtualBoard[parentId]));
            },100); 
            if(virtualBoard[parentId] === 6) {
                parent.classList.add('no-room');

            }
        }
    }
    board[virtualBoard[parentId]-1] = [currPlayer];
    console.log(board);

    // check for win
    if (checkForWin()) {
        console.log(true);
    }
    else if(checkForTie(virtualBoard) === true){
        console.log(true);
    }
}

let checkForWin = () => {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
            y >= 0 &&
            y < height&&
            x >= 0 &&
            x < width &&
            board[y][x] === currPlayer
        );
    }
    
    // TODO: read and understand this code. Add comments to help you.

    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

let checkForTie = (obj) => {
    let {col1,col2,col3,col4,col5,col6,col7} = obj;
    if(col1 === 6 && col2 === 6 && col3 === 6 && col4 === 6 && col5 === 6 && col6 === 6 && col7 === 6 ){
        return true;
    }
}



