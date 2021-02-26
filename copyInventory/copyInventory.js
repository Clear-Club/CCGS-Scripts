// Miguel
// Last Modified: February 26, 2021
// copies over information from kit count over to master kit count to keep track of inventory
// DEPLOYED VERSION

function onEdit(e) {
    copyInventoryStart(e);
}

function copyInventoryStart(e) {
    var spreadSheet = e.source.getActiveSheet();

    var targetColumn = 2;
    var targetRow = 1;
    var subSheetName = "Kit Count";

    // get row that was modified
    var row = e.range.getRow();
    // get column that was modified
    var col = e.range.getColumn();

    var kitNames = ["Medium/Upper", "Medium/Lower", "Small/Upper", "Small/Lower", "Large/Upper", "Large/Lower", "Medium/Upper + Lower", "Small/Upper + Lower", "Large/Upper + Lower"];
    // saves quantity content for each kit name
    var quantity = [];

    if (col === targetColumn && spreadSheet.getName() === subSheetName && row === targetRow) {
        // copy whole list of values over
        // FIXED, modify this value if adding more content to inventory
        for (var i = 0; i < 9; i++) {
            quantity.push(spreadSheet.getRange(i + 1, col).getDisplayValue());
        }

        copyOverMaster(kitNames, quantity);
    }

    // clears array after finished copying over data
    quantity = [];
    Logger.log(quantity);
}

// copy over values to master inventory sheet
function copyOverMaster(kitNames, quantity) {
    var spreadSheetName = SpreadsheetApp.getActiveSpreadsheet();

    var subSheetName = spreadSheetName.getSheetByName("Master Kit Count");

    var lastRow = subSheetName.getLastRow();

    var date = new Date();

    if (quantity[0] !== "") {
        for (var i = 0; i < quantity.length; i++) {
            subSheetName.getRange(lastRow + 1, 1).setValue(date);
            subSheetName.getRange(lastRow + 1, 2).setValue(kitNames[i]);
            subSheetName.getRange(lastRow + 1, 3).setValue(quantity[i]);
            lastRow++;
        }
    }
}