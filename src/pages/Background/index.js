console.log('Explainx.ai background service worker started');

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Explainx.ai installed successfully');
    // Initialize storage
    chrome.storage.local.set({ summaries: [] });
  } else if (details.reason === 'update') {
    console.log('Explainx.ai updated to version', chrome.runtime.getManifest().version);
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSummaries') {
    chrome.storage.local.get(['summaries'], (result) => {
      sendResponse({ summaries: result.summaries || [] });
    });
    return true; // Keep the message channel open for async response
  }

  if (request.action === 'saveSummary') {
    chrome.storage.local.get(['summaries'], (result) => {
      const summaries = result.summaries || [];
      summaries.unshift(request.summary);

      // Keep only last 50 summaries
      const trimmedSummaries = summaries.slice(0, 50);

      chrome.storage.local.set({ summaries: trimmedSummaries }, () => {
        sendResponse({ success: true });
      });
    });
    return true; // Keep the message channel open for async response
  }
});
