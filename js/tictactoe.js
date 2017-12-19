$(document).ready(function() {
    const tableDiv = $("#table");
    const message = $("#message");
    const resetBtn = $("#reset");
    let cells = ["", "", "", "", "", "", "", "", ""];
    let player = "X";
    let tds, fieldIndex;
    let moveNumber = 0;
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

    drawTable();

    function drawTable() {
        tableDiv.empty();
        let table = $("<table>");
        let tr, td;
        $.each(cells, function(index) {
            if (index % 3 === 0) {
                tr = $("<tr>");
            }
            td = $("<td>");
            td.html(cells[index]);
            tr.append(td);
            table.append(tr);
        });
        tableDiv.append(table);

        setListeners();
    }

    function setListeners() {
        tds = $("td");

        tds.click(function() {
            fieldIndex = $(tds).index(this);
            changeValue(this, fieldIndex);
        });

        resetBtn.click(function() {
            reset();
        });
    }

    function changeValue(field, fieldIndex) {
        if (field.innerHTML === "") {
            $(field).html(player);
            cells[fieldIndex] = player;

            moveNumber++;
            checkWinner();
        }
    }

    function checkWinner() {
        if (moveNumber > 4) {
            $(winConditions).each(function(index, element) {
                counter = 0;
                $(winConditions[index]).each(function(i, e) {
                    if (cells[e] === player) counter++;
                    if (counter === 3) {
                        message.html(`Player ${player} wins!`);
                        tds.off("click");
                        moveNumber = 0;
                    }
                });
            });
        }
        if (moveNumber === 9) message.html("It's a draw");
        player === "X" ? (player = "O") : (player = "X");
        if (player === "O" && moveNumber !== 0) compTurn();
    }

    function compTurn() {
        tds.each(function(index, element) {
            if (element.innerHTML === "") {
                changeValue(element, index);
                return false;
            }
        });
    }

    function reset() {
        cells = ["", "", "", "", "", "", "", "", ""];
        player = "X";
        message.html("");
        drawTable();
    }
});
