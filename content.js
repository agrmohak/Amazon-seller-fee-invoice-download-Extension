(() => {
  const selectors = 'button[id^="view_invoice_button"], .view_invoice_button_class button';
  const collect = () => [...document.querySelectorAll('tr')].map(tr => {
    const b = tr.querySelector(selectors);
    if (!b) return null;
    const version = b.value || '';
    const invoice = b.dataset.invoice || tr.querySelector('input[name*="vatInvoiceNumber"]')?.value || '';
    const payee = b.dataset.payeeregistrationnumber || '';
    return {
      invoice,
      fileType: b.dataset.filetype || 'PDF',
      endDate: b.dataset.enddate || '',
      payeeRegistrationNumber: payee,
      filterName: b.dataset.filtername || '',
      documentVersionId: version,
      rowText: tr.innerText.trim()
    };
  }).filter(x => x && x.invoice && x.documentVersionId);

  const encodePayload = row => ({
    fileType: encodeURIComponent(row.fileType),
    vatInvoiceNumber: encodeURIComponent(row.invoice),
    endDate: encodeURIComponent(row.endDate),
    payeeRegistrationNumber: encodeURIComponent(row.payeeRegistrationNumber),
    filterName: encodeURIComponent(row.filterName),
    documentVersionId: encodeURIComponent(row.documentVersionId)
  });

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg?.type === 'SCAN_ROWS') { sendResponse({ rows: collect() }); return true; }
    if (msg?.type === 'FETCH_DOWNLOAD_URL') {
      (async () => {
        try {
          const r = await fetch('/tax/view-seller-fee-invoice-execute', {
            method: 'POST', credentials: 'same-origin',
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(encodePayload(msg.row))
          });
          const text = await r.text();
          if (!r.ok) throw new Error(`Endpoint HTTP ${r.status}: ${text.slice(0,200)}`);
          let json; try { json = JSON.parse(text); } catch { throw new Error('Endpoint did not return JSON: ' + text.slice(0,200)); }
          if (!json.url) throw new Error('No URL in response: ' + text.slice(0,200));
          sendResponse({ok:true, url:new URL(json.url, location.origin).href, invoice:msg.row.invoice});
        } catch(e) { sendResponse({ok:false, error:e.message, invoice:msg.row.invoice}); }
      })();
      return true;
    }
  });
})();
