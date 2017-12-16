const table = document.getElementById("table");
const message = document.getElementById("message");
let cells = ["", "", "", "", "", "", "", "", ""];
var player = true;
let test, winner;
let counter = 0;
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
refresh();

function refresh() {
    table.innerHTML = `<table>
          <tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${
        cells[2]
    }</td></tr><tr><td>${cells[3]}</td><td>${cells[4]}</td><td>${
        cells[5]
    }</td></tr><tr><td>${cells[6]}</td><td>${cells[7]}</td><td>${
        cells[8]
    }</td></tr></table>`;
    test = Array.from(document.getElementsByTagName("td"));
    test.forEach(element => {
        element.addEventListener("click", changeValue);
    });
}

function changeValue() {
    if (this.innerHTML !== "X" && this.innerHTML !== "O") {
        if (player) {
            this.innerHTML = "X";
            cells[test.indexOf(this)] = "X";
            winner = "X";
        } else {
            this.innerHTML = "O";
            cells[test.indexOf(this)] = "O";
            winner = "O";
        }
    }
    player = !player;
    refresh();
    checkWinner();
}

function checkWinner() {
    for (let i = 0; i < winConditions.length; i++) {
        counter = 0;
        for (let a = 0; a < winConditions[i].length; a++) {
            if (cells[winConditions[i][a]] === "X") counter++;
            if (counter == 3) message.innerHTML = `Player X wins!`;
        }
    }

    for (let i = 0; i < winConditions.length; i++) {
        counter = 0;
        for (let a = 0; a < winConditions[i].length; a++) {
            if (cells[winConditions[i][a]] === "O") counter++;
            if (counter == 3) message.innerHTML = `Player O wins!`;
        }
    }
}
