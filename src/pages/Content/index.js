console.log('Explainx.ai content script loaded!');

// Create the circular button
function createExplainxButton() {
  const button = document.createElement('div');
  button.id = 'explainx-trigger-button';
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `;
  button.title = 'Summarize this page with Explainx';
  document.body.appendChild(button);

  button.addEventListener('click', () => {
    extractAndShowPageContent();
  });
}

// Extract text content from the page
function extractPageContent() {
  // Get the main content, excluding script, style, and other non-visible elements
  const clone = document.cloneNode(true);

  // Remove unwanted elements
  const unwantedSelectors = ['script', 'style', 'noscript', 'iframe', 'nav', 'header', 'footer', '[role="navigation"]'];
  unwantedSelectors.forEach(selector => {
    clone.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Get text content
  let text = clone.body.innerText || clone.body.textContent || '';

  // Clean up the text
  text = text
    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
    .replace(/\n+/g, '\n')  // Replace multiple newlines with single newline
    .trim();

  // Get page title and URL
  const title = document.title;
  const url = window.location.href;

  return {
    title,
    url,
    content: text,
    timestamp: new Date().toISOString()
  };
}

// Create and show the dialog
function createDialog(pageData) {
  // Check if dialog already exists
  let existingDialog = document.getElementById('explainx-dialog-overlay');
  if (existingDialog) {
    existingDialog.remove();
  }

  const overlay = document.createElement('div');
  overlay.id = 'explainx-dialog-overlay';

  const dialog = document.createElement('div');
  dialog.id = 'explainx-dialog';

  dialog.innerHTML = `
    <div class="explainx-dialog-header">
      <div class="explainx-dialog-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <h2>Page Summary</h2>
      </div>
      <button class="explainx-close-btn" id="explainx-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    
    <div class="explainx-dialog-body">
      <div class="explainx-page-info">
        <h3>${pageData.title}</h3>
        <p class="explainx-url">${pageData.url}</p>
      </div>
      <div class="explainx-content-wrapper">
        <div class="explainx-content" id="explainx-content">${pageData.content}</div>
      </div>
    </div>
    
    <div class="explainx-dialog-footer">
      <button class="explainx-btn explainx-btn-secondary" id="explainx-discard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
        Discard
      </button>
      <button class="explainx-btn explainx-btn-secondary" id="explainx-regenerate">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        Regenerate
      </button>
      <button class="explainx-btn explainx-btn-primary" id="explainx-save">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Save Summary
      </button>
    </div>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Add event listeners
  document.getElementById('explainx-close').addEventListener('click', closeDialog);
  document.getElementById('explainx-discard').addEventListener('click', closeDialog);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeDialog();
    }
  });

  document.getElementById('explainx-regenerate').addEventListener('click', () => {
    extractAndShowPageContent();
  });

  document.getElementById('explainx-save').addEventListener('click', () => {
    saveSummary(pageData);
  });

  // Prevent body scroll when dialog is open
  document.body.style.overflow = 'hidden';
}

// Close the dialog
function closeDialog() {
  const overlay = document.getElementById('explainx-dialog-overlay');
  if (overlay) {
    overlay.remove();
  }
  document.body.style.overflow = '';
}

// Extract and show page content
function extractAndShowPageContent() {
  const pageData = extractPageContent();
  createDialog(pageData);
}

// Save summary to Chrome storage
function saveSummary(pageData) {
  chrome.storage.local.get(['summaries'], (result) => {
    const summaries = result.summaries || [];

    // Add new summary
    const newSummary = {
      id: Date.now().toString(),
      title: pageData.title,
      url: pageData.url,
      content: pageData.content,
      timestamp: pageData.timestamp,
      savedAt: new Date().toISOString()
    };

    summaries.unshift(newSummary);

    // Keep only last 50 summaries
    const trimmedSummaries = summaries.slice(0, 50);

    chrome.storage.local.set({ summaries: trimmedSummaries }, () => {
      // Show success message
      showNotification('Summary saved successfully!');
      closeDialog();
    });
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'explainx-notification';
  notification.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createExplainxButton);
} else {
  createExplainxButton();
}
