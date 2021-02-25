function onEdit(e) {
    copyInventory(e);
}

function copyInventory(e) {
    var spreadSheet = e.source.getActiveSheet();

    var targetColumn = 2;
    var targetRow = 1;
    var subsheet = 'Sheet1';

    // get row that was modified
    var row = e.range.getRow();
    // get column that was modified
    var col = e.range.getColumn();

    var kitNames = ['MU', 'ML', 'LU', 'LL', 'SU', 'SL'];
    var quantity = [];

    // get modified name
    var inventoryName = spreadSheet.getRange(row, col - 1).getDisplayValue();
    // get modified number
    var inventoryNumber = spreadSheet.getRange(row, col).getDisplayValue();
    // Logger.log("row: " + row + " col: " + col + " Value: " + inventoryNumber);

    if (col === targetColumn && spreadSheet.getName() === subsheet && row === targetRow) {
        // copy whole list of values over
        for (var i = 0; i < 6; i++) {
            quantity.push(spreadSheet.getRange(i + 1, col).getDisplayValue());
        }
        copyTo(kitNames, quantity);
        // copyTo(inventoryNumber);
    }
    // Logger.log(quantity);
    quantity = [];
}

// copy Over values
function copyTo(kitNames, quantity) {
    var spreadSheetName = SpreadsheetApp.getActiveSpreadsheet();

    var subSheetName = spreadSheetName.getSheetByName('copyTo');

    var lastRow = subSheetName.getLastRow();

    var date = new Date();

    Logger.log("kitNames: " + kitNames);
    Logger.log("quantity: " + quantity);

    if (quantity[0] !== "") {
        for (var i = 0; i < quantity.length; i++) {
            subSheetName.getRange(lastRow + 1, 1).setValue(date);
            subSheetName.getRange(lastRow + 1, 2).setValue(kitNames[i]);
            subSheetName.getRange(lastRow + 1, 3).setValue(quantity[i]);
            lastRow++;

        }
    }
}