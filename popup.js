const statusEl=document.getElementById('status'), scanBtn=document.getElementById('scan'), downloadBtn=document.getElementById('download'), fromEl=document.getElementById('fromDate'), toEl=document.getElementById('toDate');
let rows=[], scannedRows=[];
const filteredRows=()=>scannedRows.filter(r=>{const d=new Date(r.endDate);if(!r.endDate||Number.isNaN(d.getTime()))return false;const day=new Date(d.getFullYear(),d.getMonth(),d.getDate());if(fromEl.value){const from=new Date(fromEl.value+'T00:00:00');if(day<from)return false;}if(toEl.value){const to=new Date(toEl.value+'T00:00:00');if(day>to)return false;}return true;});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
scanBtn.onclick=async()=>{
 statusEl.textContent='Scanning…';downloadBtn.disabled=true;
 try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
 if(!tab?.url?.startsWith('https://sellercentral.amazon.in/')){statusEl.textContent='Open Seller Central India first.';return;}
 const result=await chrome.tabs.sendMessage(tab.id,{type:'SCAN_ROWS'});scannedRows=result.rows||[];rows=filteredRows();
 statusEl.textContent=`Scanned ${scannedRows.length} rows.\nMatched date filter: ${rows.length} invoices.`+(rows.length?'\n\n'+rows.slice(0,20).map(r=>r.invoice).join('\n')+(rows.length>20?'\n…':''):'\nNo invoices match the selected dates.');
 downloadBtn.disabled=!rows.length;
 }catch(e){statusEl.textContent='Scan error: '+e.message+'\nReload the invoice page and retry.'}
};
downloadBtn.onclick=async()=>{
 downloadBtn.disabled=true;scanBtn.disabled=true;let success=0,failed=[];
 const [tab]=await chrome.tabs.query({active:true,currentWindow:true});rows=filteredRows();
 for(let i=0;i<rows.length;i++){
  statusEl.textContent=`Requesting invoice ${i+1}/${rows.length}\n${rows[i].invoice}`;
  try{
   const result=await chrome.tabs.sendMessage(tab.id,{type:'FETCH_DOWNLOAD_URL',row:rows[i]});
   if(!result?.ok)throw new Error(result?.error||'Failed to resolve download URL');
   const dl=await chrome.runtime.sendMessage({type:'DOWNLOAD_URL',url:result.url,invoice:rows[i].invoice});
   if(!dl?.ok)throw new Error(dl?.error||'Download start failed');success++;
  }catch(e){failed.push(`${rows[i].invoice}: ${e.message}`)}
  await sleep(350);
 }
 statusEl.textContent=`Finished.\nDownload requests started: ${success}\nFailed: ${failed.length}`+(failed.length?'\n\n'+failed.join('\n'):'')+'\n\nDate filtering is inclusive. This version processes only the rows currently loaded on the page; ZIP and pagination are not yet implemented.';
 scanBtn.disabled=false;
};
