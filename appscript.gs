function doPost(e) {
  // Tambahkan LockService di paling atas
  var lock = LockService.getScriptLock();

  try {
    // Berusaha mendapatkan akses eksklusif selama 30 detik
    // Jika dalam 30 detik tidak dapat giliran, akan melempar error
    lock.waitLock(30000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data =
      e.postData && e.postData.contents
        ? JSON.parse(e.postData.contents)
        : e.parameter;

    var namaPelajaran = data.pelajaran || "Data_Lain";
    var sheet = ss.getSheetByName(namaPelajaran);

    if (!sheet) {
      return ContentService.createTextOutput(
        "Error: Sheet '" + namaPelajaran + "' tidak ditemukan",
      ).setMimeType(ContentService.MimeType.TEXT);
    }

    // Logika Auto-Numbering (Sekarang aman karena dikunci lock)
    var lastRow = sheet.getLastRow();
    var newNumber = 1;
    if (lastRow >= 2) {
      var lastValue = sheet.getRange(lastRow, 1).getValue();
      newNumber = isNaN(lastValue) ? 1 : Number(lastValue) + 1;
    }

    var rowData = [
      newNumber,
      data.nama || "",
      data.kelas || "",
      data.tanggal || new Date(),
      data.nilai || 0,
    ];

    sheet.appendRow(rowData);

    // Paksa spreadsheet menulis data sekarang juga sebelum kunci dibuka
    SpreadsheetApp.flush();

    return ContentService.createTextOutput(
      "Sukses: Data masuk ke sheet " + namaPelajaran,
    ).setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput(
      "Error: " + err.toString(),
    ).setMimeType(ContentService.MimeType.TEXT);
  } finally {
    // Selalu buka kunci, baik sukses maupun error
    lock.releaseLock();
  }
}
