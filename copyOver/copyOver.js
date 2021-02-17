function onEdit(e) {
    addTimeStamp(e);
}

// adds a timestamp when user scans customer ID #
function addTimeStamp(e) {
    var spreadSheet = e.source.getActiveSheet();

    var startRow = 2;
    var targetColumn = 2;
    var subsheet = 'Sheet1';

    // get row that was modified
    var row = e.range.getRow();
    // get column that was modified
    var col = e.range.getColumn();

    // get QR code and model number 
    var scannedQrCode = spreadSheet.getRange(row, col).getDisplayValue();
    var modelNum = spreadSheet.getRange(row, col + 1).getDisplayValue();

    if (col === targetColumn && spreadSheet.getName() === subsheet && row >= startRow) {
        copyOver(scannedQrCode, modelNum);
    }
}

// copies over the scanned qr code and saves it into 'copy' subsheet
function copyOver(scannedQrCode, modelNum) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var subSheetName = spreadSheet.getSheetByName('copy');

    var date = getDate();

    if (scannedQrCode !== "") {
        var lastRow = subSheetName.getLastRow();
        subSheetName.getRange(lastRow + 1, 1).setValue(date);
        subSheetName.getRange(lastRow + 1, 2).setValue(scannedQrCode);
        subSheetName.getRange(lastRow + 1, 3).setValue(modelNum);
    }
}

// returns new date
function getDate() {
    return new Date();
}