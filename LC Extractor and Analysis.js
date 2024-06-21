function lcsActual() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
    "Base actuals term 23_LC"
  );
  const sheetData = sheet.getRange(1, 6, sheet.getLastRow(), 1).getValues();
  const lcs = sheetData.flat(1);
  for (let i = 0; i < sprintStartDate.length; i++) {
    console.log(sprintStartDate[i]);
    var url =
      "https://analytics.api.aiesec.org/v2/applications/analyze.json?access_token=" +
      "&start_date=" +
      sprintStartDate[i] +
      "&end_date=" +
      sprintEndDate[i] +
      "&performance_v3%5Boffice_id%5D=1559";
    var response = UrlFetchApp.fetch(url, { method: "GET" }).getContentText();
    var dataset = JSON.parse(response);
    for (let j = 0; j < 12; j++) {
      console.log(lcs[rowStartIndex[i] - 1 + j]);

      var data = dataset[lcs_codes[lcs[rowStartIndex[i] - 1 + j]]];
      var list = [];
      list.push([
        data.open_ogx.doc_count,
        data.open_o_programme_7.doc_count,
        data.open_o_programme_8.doc_count,
        data.open_o_programme_9.doc_count,
        data.applied_total.applicants.value,
        data.i_applied_7.applicants.value,
        data.i_applied_8.applicants.value,
        data.i_applied_9.applicants.value,
        data.o_applied_7.applicants.value,
        data.o_applied_8.applicants.value,
        data.o_applied_9.applicants.value,
        data.matched_total.doc_count,
        data.i_matched_7.doc_count,
        data.i_matched_8.doc_count,
        data.i_matched_9.doc_count,
        data.o_matched_7.doc_count,
        data.o_matched_8.doc_count,
        data.o_matched_9.doc_count,
        data.approved_total.doc_count,
        data.i_approved_7.doc_count,
        data.i_approved_8.doc_count,
        data.i_approved_9.doc_count,
        data.o_approved_7.doc_count,
        data.o_approved_8.doc_count,
        data.o_approved_9.doc_count,
        data.realized_total.doc_count,
        data.i_realized_7.doc_count,
        data.i_realized_8.doc_count,
        data.i_realized_9.doc_count,
        data.o_realized_7.doc_count,
        data.o_realized_8.doc_count,
        data.o_realized_9.doc_count,
        data.finished_total.doc_count,
        data.i_finished_7.doc_count,
        data.i_finished_8.doc_count,
        data.i_finished_9.doc_count,
        data.o_finished_7.doc_count,
        data.o_finished_8.doc_count,
        data.o_finished_9.doc_count,
        data.completed_total.doc_count,
        data.i_completed_7.doc_count,
        data.i_completed_8.doc_count,
        data.i_completed_9.doc_count,
        data.o_completed_7.doc_count,
        data.o_completed_8.doc_count,
        data.o_completed_9.doc_count,
      ]);

      sheet
        .getRange(rowStartIndex[i] + j, 7, 1, list[0].length)
        .setValues(list);
    }
  }
}
