var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var tileNo = 9; // remove the =1 later
var tile0;
var nextTile;
var tile1 = document.getElementById("tile1");
var tile2;
const size = 80;
var timeToBottom = 300;
var speedUp = 0;
let y = 0;
let x = 2;
let column = 2;
let score = 0;
let columnData;
let row;
let removed;
let id;
let rowCount = [
    [],
    [],
    [],
    [],
    []
];

ctx.fillStyle="#6A3940";
ctx.fillRect(0, 0, 600, 900);

ctx.fillStyle="#D3D3D3";
ctx.fillRect(100, 0, 400, 900); 

function startGame(speed) {
    timeToBottom = speed;
    dialog = document.getElementById("dialog");
    dialog.close();
    speedUp = 0;
    choosePiece();
    id = setInterval(runGame, 1);

}

function runGame() {
            if (y >= ((myCanvas.height - size)- (rowCount[x].length * 80))) {
                if (rowCount[x].length >= 10) {
                    clearInterval(id);
                    gameOver();
                    return;
                }
            clearInterval(id);
            ctx.clearRect(0, 0, myCanvas.width, (myCanvas.height));
            ctx.fillStyle="#6A3940";
            ctx.fillRect(0, 0, 600, 900);
    
    
            ctx.fillStyle="#D3D3D3";
            ctx.fillRect(100, 0, 400, 900);
            ctx.drawImage(tile1, ((x * 80) + 100), (myCanvas.height  - ((rowCount[x].length + 1) * 80)));
            rowCount[x].push(tileNo);
            nextPiece();
          } 
          else {
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            ctx.fillStyle="#6A3940";
            ctx.fillRect(0, 0, 600, 900);
    
            ctx.fillStyle="#D3D3D3";
            ctx.fillRect(100, 0, 400, 900); 
            setBoard();     
            ctx.drawImage(tile1, ((x * 80) + 100), y);
            y += myCanvas.height/(timeToBottom+speedUp);
        }
      
}

function gameOver() {
    for(let i = 0; i < rowCount.length; i++) {
        rowCount[i].length = 0;
    }
    dialog = document.getElementById("dialog");
    dialogText = document.getElementById("dialogText");
    dialogText.innerHTML = "Game Over! You scored " + score + " points.";
    dialog.style.position = 'absolute';
    dialog.style.top = '00%';
    dialog.style.left = '00%'; 
    dialog.style.transform = 'translateX(-50%)';
    dialog.style.transform = 'translateY(-50%)';  
    dialog.showModal();
    score=0;
    speedUp = 0;
}

function choosePiece() {
    if (!!tile0) {
        tileNo = nextTile;
        nextTile = (Math.floor(Math.random() * 9)) + 1;
        tile1 = document.getElementById("tile" + tileNo);
        tile0 = document.getElementById("tile" + nextTile);
    } else {
        nextTile = (Math.floor(Math.random() * 9)) + 1;
        tile0 = document.getElementById("tile" + nextTile);
        tileNo = (Math.floor(Math.random() * 9)) + 1;    
        tile1 = document.getElementById("tile" + tileNo);
     }
}

function nextPiece() {
    clearBoard(x);
    for(let i = 0; i < 10; i++) {
        clearBoard(2);
        clearBoard(3);
        clearBoard(1);
        clearBoard(4);
        clearBoard(0);
    }
    y = 0;
    x = 2;
    speedUp = 0;
    setBoard();
    choosePiece();
    setTimeout(function() {
        id = setInterval(runGame, 1);}, 200);
}

function setBoard() {
    ctx.font = "14px Arial";
    ctx.fillText("NEXT:",10 ,24);
    ctx.drawImage(tile0, 10, 30);
    scoreboard();
    for(let i = 0; i < rowCount[0].length; i++) {
        tile2 = document.getElementById("tile" + rowCount[0][i]);
        ctx.drawImage(tile2, 100, (myCanvas.height - (i * 80) - 80)); 
    }
    for(let i = 0; i < rowCount[1].length; i++) {
        tile2 = document.getElementById("tile" + rowCount[1][i]);
        ctx.drawImage(tile2, 180, (myCanvas.height - (i * 80) - 80)); 
    }
    for(let i = 0; i < rowCount[2].length; i++) {
        tile2 = document.getElementById("tile" + rowCount[2][i]);
        ctx.drawImage(tile2, 260, (myCanvas.height - (i * 80) - 80)); 
    }
    for(let i = 0; i < rowCount[3].length; i++) {
        tile2 = document.getElementById("tile" + rowCount[3][i]);
        ctx.drawImage(tile2, 340, (myCanvas.height - (i * 80) - 80)); 
    }
    for(let i = 0; i < rowCount[4].length; i++) {
        tile2 = document.getElementById("tile" + rowCount[4][i]);
        ctx.drawImage(tile2, 420, (myCanvas.height - (i * 80) - 80)); 
    }
}

function clearBoard(column) {
    row = rowCount[column].length - 1;
    columnData = rowCount[column][row];
    //vertical clear
    if ((columnData === (rowCount[column][rowCount[column].length - 2] + 1) && columnData === (rowCount[column][rowCount[column].length - 3] + 2)) || (columnData === (rowCount[column][rowCount[column].length - 2] - 1) && columnData === (rowCount[column][rowCount[column].length - 3] - 2))) {
        if(columnData === (rowCount[column][rowCount[column].length - 4] + 3) || columnData === (rowCount[column][rowCount[column].length - 4] - 3)) {
            removed = rowCount[column].splice(rowCount[column].length - 4, 4);
            score+=500;
        } else {
            removed = rowCount[column].splice(rowCount[column].length - 3, 3);
            score+=300;
        }
    }
    //horizontal clear
    switch(column) {
        case 0:
            if ((columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column+2][row] + 2)) 
                || (columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column+2][row] - 2))) {
                if(columnData === rowCount[column][row]) {
                    removed = rowCount[column].splice(row, 1);
                }
                removed = rowCount[column+1].splice(row, 1);
                removed = rowCount[column+2].splice(row, 1);
                score+=300;
            }
            break;
        case 1:
            if ((columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column+2][row] + 2)) 
                || (columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column+2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column+2].splice(row, 1);
                    score+=400;
                } else if ((columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column+2][row] + 2)) 
                    || (columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column+2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column+2].splice(row, 1);
                    score+=300;
                } else if ((columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column+1][row] + 1)) 
                    || (columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column+1][row] - 1))) {
                        if(columnData === rowCount[column][row]) {
                            removed = rowCount[column].splice(row, 1);
                        }
                        removed = rowCount[column+1].splice(row, 1);
                        removed = rowCount[column-1].splice(row, 1);
                        score+=300;
                    }
            break;
        case 2:
            if ((columnData === (rowCount[column+2][row] - 2) && columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column-2][row] + 2)) 
                || (columnData === (rowCount[column+2][row] + 2) && columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column-2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column-2].splice(row, 1);
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column+2].splice(row, 1);
                    score+=1000;
            } else if ((columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column+2][row] + 2)) 
                || (columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column+2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column+2].splice(row, 1);
                    score+=500;
            } else if ((columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column-2][row] + 2)) 
                || (columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column-2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column-2].splice(row, 1);
                    score+=500;
            } else if ((columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column+2][row] + 2)) 
                || (columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column+2][row] - 2))) {
                if(columnData === rowCount[column][row]) {
                    removed = rowCount[column].splice(row, 1);
                }
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column+2].splice(row, 1);
                    score+=300;
            } else if ((columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column-2][row] + 2)) 
                || (columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column-2][row] - 2))) {
                if(columnData === rowCount[column][row]) {
                    removed = rowCount[column].splice(row, 1);
                }
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column-2].splice(row, 1);
                    score+=300;
            } else if ((columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column+1][row] + 1)) 
                || (columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column+1][row] - 1))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column-1].splice(row, 1);
                    score+=300;
            }
            break;
        case 3:
            if ((columnData === (rowCount[column+1][row] - 1) && columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column-2][row] + 2)) 
                || (columnData === (rowCount[column+1][row] + 1) && columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column-2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column+1].splice(row, 1);
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column-2].splice(row, 1);
                    score+=500;
                } else if ((columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column-2][row] + 2)) 
                    || (columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column-2][row] - 2))) {
                    if(columnData === rowCount[column][row]) {
                        removed = rowCount[column].splice(row, 1);
                    }
                    removed = rowCount[column-1].splice(row, 1);
                    removed = rowCount[column-2].splice(row, 1);
                    score+=300;
                } else if ((columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column+1][row] + 1)) 
                    || (columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column+1][row] - 1))) {
                        if(columnData === rowCount[column][row]) {
                            removed = rowCount[column].splice(row, 1);
                        }
                        removed = rowCount[column+1].splice(row, 1);
                        removed = rowCount[column-1].splice(row, 1);
                        score+=300;
                    }
            break;
        case 4:
            if ((columnData === (rowCount[column-1][row] + 1) && columnData === (rowCount[column-2][row] + 2)) 
                || (columnData === (rowCount[column-1][row] - 1) && columnData === (rowCount[column-2][row] - 2))) {
                if(columnData === rowCount[column][row]) {
                    removed = rowCount[column].splice(row, 1);
                }
                removed = rowCount[column-1].splice(row, 1);
                removed = rowCount[column-2].splice(row, 1);
                score+=300;
            } 
            break;
    }

}

function scoreboard() {
     if(score === 0) {
        ctx.font = "14px Arial";
        ctx.fillText("SCORE",510 ,24);
        const img = document.getElementById("tile0");
        ctx.drawImage(img, 510, 30);
        ctx.drawImage(img, 510, 110);
        ctx.drawImage(img, 510, 190);
    } else { 
    const scoreString = String(score);
    for(let i=0; i < scoreString.length; i++) {
        const digit = scoreString[i];
        const img = document.getElementById("tile" + digit);
        ctx.font = "14px Arial";
        ctx.fillText("SCORE",510 ,24);
        ctx.drawImage(img, 510, ((i * 80) + 30));
    }
    }
}

window.addEventListener(
    "keydown",
    (event) => {
        let keyPress = event.code;
        if (keyPress === "ArrowLeft" && x > 0 && (y < (myCanvas.height - (rowCount[column-1].length * 80) - 40))) {
            x--;
        } else if (keyPress === "ArrowRight" && x < 4 && (y < (myCanvas.height - (rowCount[column+1].length * 80) - 40))) {
            x++;
        } else if (keyPress === "ArrowDown") {
            if(speedUp === 0) {
            speedUp-=(timeToBottom * 0.95);
            }
        }
    },
    true,
);

window.addEventListener('touchstart', function(event) {
    // figure out which part of the screen and act accordingly
    const touch = event.touches[0];
    const xCoord = touch.pageX;
    const yCoord = touch.pageY;
    this.alert(yCoord);
    if(yCoord>(window.screen.height * .7)) {
        if(speedUp === 0) {
            speedUp-=(timeToBottom * 0.95);
            }
    } else if(xCoord > (this.screen.availWidth * .5) && x < 4 && (y < (myCanvas.height - (rowCount[column+1].length * 80) - 40))) {
        x++;
    } else if (xCoord < (this.screen.availWidth * .5) && x > 0 && (y < (myCanvas.height - (rowCount[column-1].length * 80) - 40))){ 
        x--;
    }

    // Prevent default browser behavior like scrolling/zooming if needed
    event.preventDefault(); 
});
