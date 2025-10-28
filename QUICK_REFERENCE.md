# Explainx.ai - Quick Reference Guide

## 🚀 Quick Commands

```bash
# Install dependencies (first time only)
npm install

# Build extension for production
npm run build

# Start development server with hot reload
npm start

# Format code
npm run prettier
```

## 📂 Key Files to Know

### Content Script (Injected into webpages)
- **Location**: `src/pages/Content/index.js`
- **Purpose**: Creates floating button, extracts page content, shows dialog
- **Styles**: `src/pages/Content/content.styles.css`

### Popup (Extension popup window)
- **Component**: `src/pages/Popup/Popup.jsx`
- **Styles**: `src/pages/Popup/Popup.css`
- **Purpose**: Display saved summaries, search, manage storage

### Background Service Worker
- **Location**: `src/pages/Background/index.js`
- **Purpose**: Handle storage operations, extension lifecycle

### Configuration
- **Manifest**: `src/manifest.json` - Extension configuration
- **Build**: `webpack.config.js` - Build configuration

## 🎯 Component Overview

### Circular Button
- Appears on every webpage (top-right)
- Gradient purple design
- Click to trigger content extraction

### Dialog Modal
- Shows extracted page content
- Three action buttons:
  - 💾 **Save**: Stores summary in Chrome storage
  - 🔄 **Regenerate**: Re-extracts content
  - 🗑️ **Discard**: Close without saving

### Popup Window
- Click extension icon to open
- Shows all saved summaries (max 50)
- Search bar for filtering
- Click card to expand/collapse
- Actions: Open page, Delete summary

## 🎨 Customization Guide

### Change Theme Colors
Edit these gradient values in CSS files:

**Primary Gradient**: `#667eea` → `#764ba2`

**Content Script** (`content.styles.css`):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Popup** (`Popup.css`):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Button Position
In `content.styles.css`:
```css
#explainx-trigger-button {
  top: 20px;    /* Change this */
  right: 20px;  /* Change this */
}
```

### Change Max Summaries
In `src/pages/Content/index.js` and `src/pages/Background/index.js`:
```javascript
const trimmedSummaries = summaries.slice(0, 50); // Change 50 to your limit
```

## 🔧 Storage Structure

Summaries are stored in Chrome's `storage.local`:

```javascript
{
  summaries: [
    {
      id: "1234567890",           // Timestamp
      title: "Page Title",
      url: "https://example.com",
      content: "Extracted text...",
      timestamp: "2025-10-28T...",
      savedAt: "2025-10-28T..."
    },
    // ... more summaries
  ]
}
```

## 📊 Chrome Storage API Usage

### Save Summary
```javascript
chrome.storage.local.set({ summaries: [...] }, callback);
```

### Get Summaries
```javascript
chrome.storage.local.get(['summaries'], (result) => {
  const summaries = result.summaries || [];
});
```

### Clear All
```javascript
chrome.storage.local.set({ summaries: [] }, callback);
```

## 🐛 Common Issues & Solutions

### Issue: Button not appearing
**Solution**: Refresh the page after installing extension

### Issue: Summaries not saving
**Solution**: Check storage permissions in manifest.json

### Issue: Build fails
**Solution**: 
```bash
rm -rf node_modules
npm install
npm run build
```

### Issue: Extension not updating
**Solution**: Go to chrome://extensions/ and click refresh icon

## 🎓 Next Steps (AI Integration)

To add AI summarization:

1. **Choose API**: OpenAI, Anthropic Claude, or local model
2. **Add API Key Management**: Store in Chrome storage
3. **Update Content Script**: Send content to AI for summarization
4. **Update Dialog**: Show AI summary instead of raw text
5. **Add Settings**: Let users configure AI preferences

Example flow:
```javascript
// In content script
const summary = await generateAISummary(pageContent, apiKey);
// Show summary in dialog
```

## 📝 Code Snippets

### Extract Page Content
```javascript
const pageData = extractPageContent();
// Returns: { title, url, content, timestamp }
```

### Show Notification
```javascript
showNotification('Your message here');
```

### Format Date
```javascript
formatDate(dateString);
// Returns: "Just now", "5m ago", "3h ago", etc.
```

## 🎯 Performance Tips

1. **Content Extraction**: Already optimized - removes scripts, styles
2. **Storage**: Auto-limits to 50 summaries
3. **Search**: Client-side filtering (instant results)
4. **Animations**: CSS-based (GPU accelerated)

## 📱 Testing Checklist

- [ ] Button appears on webpage
- [ ] Dialog opens on button click
- [ ] Content extraction works
- [ ] Save functionality works
- [ ] Popup shows saved summaries
- [ ] Search works
- [ ] Expand/collapse works
- [ ] Delete works
- [ ] Clear all works
- [ ] Dark mode works
- [ ] Responsive on small screens

---

**Pro Tip**: Use Chrome DevTools to inspect the content script:
1. Right-click on page → Inspect
2. Console → Select "Explainx content script" from dropdown
3. See console.log messages from content script

**Need more help?** Check [README.md](README.md) or [INSTALLATION.md](INSTALLATION.md)

