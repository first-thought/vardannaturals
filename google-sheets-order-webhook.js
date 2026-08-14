/**
 * Google Apps Script Web App for Vardan Naturals orders.
 *
 * Setup:
 * 1. Create a Google Sheet with a tab named "Orders".
 * 2. Extensions > Apps Script, paste this file.
 * 3. Set SHEET_ID to your spreadsheet ID.
 * 4. Deploy > New deployment > Web app.
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Paste the Web App URL into js/site-config.js as orderSheetWebAppUrl.
 */

const SHEET_ID = '1NOZ-Sbu-OsOEPXf1wQf-scINTRWqlaBJs6MsVG7eIr0';
const SHEET_NAME = 'Orders';
const HEADERS = [
  'Received At',
  'Order ID',
  'Status',
  'Subtotal',
  'Discount',
  'Total',
  'Coupon',
  'Address Line 1',
  'Address Line 2',
  'City',
  'State',
  'Pincode',
  'Items',
  'Raw JSON',
  'Customer Phone'
];

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = getOrdersSheet_();
    const rowNumber = appendOrder_(sheet, payload);

    console.log(`Order ${payload.orderId || '(no id)'} appended to ${sheet.getName()} row ${rowNumber}`);

    return jsonResponse_({ ok: true, orderId: payload.orderId || '', rowNumber });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return jsonResponse_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.test === '1') {
    const sheet = getOrdersSheet_();
    const rowNumber = appendOrder_(sheet, {
      orderId: `TEST-${new Date().getTime()}`,
      status: 'Apps Script test',
      subtotal: 0,
      discount: 0,
      total: 0,
      couponCode: '',
      customerPhone: '9999999999',
      address: {
        line1: 'Test address',
        line2: '',
        city: 'Test city',
        state: 'Test state',
        pincode: '000000'
      },
      items: [
        { name: 'Test product', variant: 'default', quantity: 1 }
      ]
    });
    return jsonResponse_({ ok: true, test: true, rowNumber });
  }

  return ContentService
    .createTextOutput('Vardan Naturals order webhook is running. Add ?test=1 to append a test row.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function parsePayload_(e) {
  const rawBody = (e && e.postData && e.postData.contents) || '';
  console.log(`Incoming order payload length: ${rawBody.length}`);

  if (rawBody) {
    return JSON.parse(rawBody);
  }

  if (e && e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  throw new Error('No POST payload received');
}

function getOrdersSheet_() {
  const spreadsheet = getSpreadsheet_();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeaderRow_(sheet);
  return sheet;
}

function getSpreadsheet_() {
  if (SHEET_ID && SHEET_ID !== 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE') {
    return SpreadsheetApp.openById(String(SHEET_ID).trim());
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSpreadsheet) return activeSpreadsheet;

  throw new Error('Set SHEET_ID to your Google Sheet ID');
}

function appendOrder_(sheet, payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    ensureHeaderRow_(sheet);
    const items = Array.isArray(payload.items) ? payload.items : [];
    const address = payload.address || {};

    sheet.appendRow([
      new Date(),
      payload.orderId || '',
      payload.status || 'New',
      payload.subtotal || 0,
      payload.discount || 0,
      payload.total || 0,
      payload.couponCode || '',
      address.line1 || '',
      address.line2 || '',
      address.city || '',
      address.state || '',
      address.pincode || '',
      items.map(item => `${item.name} (${item.variant || 'default'}) x ${item.quantity}`).join('\n'),
      JSON.stringify(payload),
      payload.customerPhone || ''
    ]);

    SpreadsheetApp.flush();
    return sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() > 0) {
    const existingHeaders = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length)).getValues()[0];

    HEADERS.forEach((header, index) => {
      if (!existingHeaders[index]) {
        sheet.getRange(1, index + 1).setValue(header);
      }
    });

    return;
  }

  sheet.appendRow(HEADERS);
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
