chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'DOWNLOAD_URL') {
    chrome.downloads.download({url: msg.url, filename: `Amazon Seller Fee Invoices/${msg.invoice}.pdf`, saveAs: false}, id => {
      if (chrome.runtime.lastError) sendResponse({ok:false,error:chrome.runtime.lastError.message});
      else sendResponse({ok:true,id});
    });
    return true;
  }
});
