// ============================================================
// Dorit4Trustee — Form Submission Handler
// Google Apps Script (paste into Extensions → Apps Script)
// ============================================================
//
// SETUP:
// 1. Create a Google Sheet with these column headers in Row 1:
//    Timestamp | First Name | Last Name | Email | Phone | Source
//    Create a second tab named "Lawn Signs" with:
//    Timestamp | First Name | Last Name | Street Address | Town | Postal Code | Email | Phone | Source
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

    // Prefix values starting with =, +, -, @ to prevent formula injection
    var safe = function (v) {
      return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v;
    };

    // Trustee-site contact form: email only. Messages are NOT written to the
    // campaign Sheet, so campaign volunteers with Sheet access never see them.
    if (data.formType === "contact") {
      const clip = function (v, n) {
        return String(v || "").slice(0, n);
      };
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        replyTo: clip(data.email, 200),
        subject: "Website message: " + clip(data.topic, 120) + " (" + clip(data.name, 80) + ")",
        body: [
          "New message from dorit4trustee.com/contact",
          "",
          "Name: " + clip(data.name, 120),
          "Email: " + clip(data.email, 200),
          "Community: " + clip(data.community, 60),
          "School: " + (clip(data.school, 80) || "Not school-specific"),
          "Topic: " + clip(data.topic, 120),
          "Time: " + timestamp,
          "",
          clip(data.message, 5000),
        ].join("\n"),
      });
      return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(
        ContentService.MimeType.JSON,
      );
    }

    if (data.formType === "lawn-sign") {
      const lawnSignsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lawn Signs");
      lawnSignsSheet.appendRow([
        timestamp,
        safe(data.firstName || ""),
        safe(data.lastName || ""),
        safe(data.address || ""),
        safe(data.town || ""),
        safe(data.postalCode || ""),
        safe(data.email || ""),
        safe(data.phone || ""),
        safe(data.source || "unknown"),
      ]);

      const subject =
        "New Lawn Sign Request — " + (data.firstName || "") + " " + (data.lastName || "");
      const body = [
        "Name: " + (data.firstName || "") + " " + (data.lastName || ""),
        "Address: " +
          (data.address || "") +
          ", " +
          (data.town || "") +
          ", " +
          (data.postalCode || ""),
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

      return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(
        ContentService.MimeType.JSON,
      );
    }

    // Append row to sheet
    sheet.appendRow([
      timestamp,
      safe(data.firstName || ""),
      safe(data.lastName || ""),
      safe(data.email || ""),
      safe(data.phone || ""),
      safe(data.source || "unknown"),
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

    return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS preflight (browser sends OPTIONS before POST)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Dorit4Trustee form endpoint is live." }),
  ).setMimeType(ContentService.MimeType.JSON);
}
