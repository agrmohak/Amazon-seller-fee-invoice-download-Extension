
# Amazon Seller Fee Invoice Downloader (V0.6)

A Chrome extension to download Amazon Seller Central fee invoice PDFs in bulk, without manually clicking the View button for every invoice.

## Features

- Detects invoice details from the currently loaded Seller Central invoice table.
- Downloads invoice PDFs using Amazon Seller Central's invoice-download endpoint.
- Uses Chrome's built-in download manager.
- Supports optional **From Date** and **To Date** filters.
- Retains the endpoint-based download mechanism from V0.5.

## Requirements

- Google Chrome or a compatible Chromium-based browser.
- An active Amazon Seller Central India account.
- A signed-in Seller Central session.
- Access to the Seller Fee Invoices page.

## Installation

1. Download and extract `AmazonInvoiceDownloader_v0.6.zip`.
2. Open Google Chrome.
3. Navigate to:

   `chrome://extensions`

4. Enable **Developer mode** using the toggle in the top-right corner.
5. Click **Load unpacked**.
6. Select the extracted extension folder (the folder containing `manifest.json`).
7. The extension should now appear in your Chrome extensions list.

**Note:** Do not delete or move the extracted folder after installation. Chrome loads the extension directly from this folder.

## How to Use

### Step 1: Open Amazon Seller Central

1. Open Chrome.
2. Sign in to your Amazon Seller Central India account.
3. Navigate to the **Seller Fee Invoices** page.
4. Wait for the invoice table to load.

### Step 2: Open the Extension

1. Click the Extensions icon in Chrome.
2. Select **Amazon Invoice Downloader**.
3. The extension popup will open.

### Step 3: Set the Date Filter

You can optionally specify a date range.

| Filter | Behaviour |
|---|---|
| From Date only | Downloads invoices dated on or after the selected date. |
| To Date only | Downloads invoices dated on or before the selected date. |
| Both dates | Downloads invoices within the selected date range, including both dates. |
| Both blank | Includes all currently detected invoices. |

**Example:**

If you select:

- From Date: `01-10-2026`
- To Date: `31-10-2026`

The extension will include invoices dated from 1 October 2026 through 31 October 2026.

### Step 4: Scan Invoices

1. Click **Scan invoice rows**.
2. The extension will inspect the currently loaded invoice rows.
3. It will apply your selected date filter.
4. Review the number of matching invoices detected.

### Step 5: Download Invoices

1. Click **Download all detected PDFs**.
2. The extension will request each invoice PDF from Amazon Seller Central.
3. Amazon will return the corresponding PDF download URL.
4. Chrome will download the invoices automatically.

Downloaded files are saved using Chrome's normal download manager, potentially inside:

`Downloads/Amazon Seller Fee Invoices/`

The exact location depends on your Chrome download settings.

## Important Notes and Limitations

### 1. Currently Loaded Page Only

The extension processes invoice rows currently loaded on the Seller Central page.

It does not automatically navigate through multiple pages or pagination.

If you have invoices spread across multiple pages:

1. Download invoices from the current page.
2. Navigate to the next page.
3. Run the scan again.
4. Repeat the process.

### 2. Date Filtering

Date filtering is performed by the extension after scanning the invoice rows.

It does not modify Amazon's own date filters.

### 3. Seller Central Login

You must remain signed in to Seller Central while using the extension.

If your session expires, refresh the page and sign in again.

### 4. Multiple Downloads Permission

Chrome may display a prompt asking permission to download multiple files.

Allow multiple downloads for Seller Central if prompted.

## Troubleshooting

### No invoices detected

- Make sure you are on the Seller Fee Invoices page.
- Wait until the invoice table has completely loaded.
- Refresh the page and try scanning again.
- Check that the invoice rows are visible on the current page.

### No invoices match the selected date range

- Verify that the From Date is earlier than or equal to the To Date.
- Remember that both boundary dates are included.
- Clear both date fields to include all detected invoices.

### Downloads are failing

- Check whether you are still signed in to Seller Central.
- Refresh the Seller Central page.
- Run the scan again.
- Try downloading a smaller batch.
- Check Chrome Downloads at `chrome://downloads`.

### Chrome blocks downloads

- Allow multiple downloads when Chrome asks for permission.
- Check Chrome's site download permissions if necessary.

## Privacy and Security

The extension works within your authenticated Seller Central browser session to retrieve invoice PDFs.

- Keep your Seller Central login credentials private.
- Do not share downloaded tax invoices publicly.
- Install the extension only from a trusted source.

## Version History

### V0.6
- Added optional From Date and To Date filters.
- Supports From-only and To-only filtering.
- Date boundaries are inclusive.
- Retains the V0.5 endpoint-based PDF download mechanism.

### V0.5
- Introduced direct invoice PDF retrieval using Amazon Seller Central's invoice-download endpoint.
- Avoided the need to manually click individual View buttons.
- Added automatic PDF downloading through Chrome.

---

**Amazon Seller Fee Invoice Downloader — Built for faster bulk invoice retrieval from Seller Central India.**
