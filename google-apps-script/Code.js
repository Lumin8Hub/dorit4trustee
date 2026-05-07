// ============================================================
// Dorit4Trustee — Form Submission Handler
// Google Apps Script (paste into Extensions → Apps Script)
// ============================================================
//
// SETUP:
// 1. Create a Google Sheet with these column headers in Row 1:
//    Timestamp | First Name | Last Name | Email | Phone | Source
//
// 2. Open Extensions → Apps Script
// 3. Paste this entire file into Code.gs (replace any default code)
// 4. Click Deploy → New deployment
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the Web App URL and share it with Devin
//
// ============================================================

const NOTIFICATION_EMAIL = "info@dorit4trustee.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const timestamp = new Date().toLocaleString("en-CA", {
      timeZone: "America/Toronto",
    });

    // Append row to sheet
    sheet.appendRow([
      timestamp,
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.source || "unknown",
    ]);

    // Send email notification
    const subject = "New Campaign Signup — " + (data.firstName || "") + " " + (data.lastName || "");
    const body = [
      "New form submission on dorit4trustee.com",
      "",
      "Name: " + (data.firstName || "") + " " + (data.lastName || ""),
      "Email: " + (data.email || ""),
      "Phone: " + (data.phone || "N/A"),
      "Source: " + (data.source || "unknown"),
      "Time: " + timestamp,
    ].join("\n");

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body,
    });

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS preflight (browser sends OPTIONS before POST)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Dorit4Trustee form endpoint is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}
