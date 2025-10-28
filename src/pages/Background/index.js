console.log('Explainx.ai background service worker started');

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Explainx.ai installed successfully');
    // Initialize storage
    chrome.storage.local.set({ summaries: [], openaiApiKey: '' });
  } else if (details.reason === 'update') {
    console.log('Explainx.ai updated to version', chrome.runtime.getManifest().version);
  }
});

// Function to call OpenAI API for summarization
async function generateAISummary(content, apiKey) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates concise, informative summaries of webpage content. Focus on the main points and key takeaways. Keep summaries clear and well-structured.'
          },
          {
            role: 'user',
            content: `Please summarize the following webpage content in a clear and concise way:\n\n${content.substring(0, 12000)}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate summary');
    }

    const data = await response.json();
    return {
      success: true,
      summary: data.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Get summaries
  if (request.action === 'getSummaries') {
    chrome.storage.local.get(['summaries'], (result) => {
      sendResponse({ summaries: result.summaries || [] });
    });
    return true;
  }

  // Save summary
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
    return true;
  }

  // Generate AI summary
  if (request.action === 'generateSummary') {
    chrome.storage.local.get(['openaiApiKey'], async (result) => {
      const apiKey = result.openaiApiKey;

      if (!apiKey || apiKey.trim() === '') {
        sendResponse({
          success: false,
          error: 'OpenAI API key not set. Please add your API key in the extension popup.'
        });
        return;
      }

      const summaryResult = await generateAISummary(request.content, apiKey);
      sendResponse(summaryResult);
    });
    return true;
  }

  // Save API key
  if (request.action === 'saveApiKey') {
    chrome.storage.local.set({ openaiApiKey: request.apiKey }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  // Get API key
  if (request.action === 'getApiKey') {
    chrome.storage.local.get(['openaiApiKey'], (result) => {
      sendResponse({ apiKey: result.openaiApiKey || '' });
    });
    return true;
  }
});
