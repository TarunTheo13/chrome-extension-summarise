# Explainx.ai 🚀

A beautiful Chrome extension that extracts and summarizes webpage content with a modern, user-friendly interface.

## Features ✨

- **🤖 AI-Powered Summaries**: Uses OpenAI's GPT-4o-mini for intelligent summaries
- **🔘 Circular Floating Button**: A sleek circular button appears on the top-right of every webpage
- **📄 Smart Content Extraction**: Extracts and summarizes clean text content from any webpage
- **💾 Save Summaries**: Save AI-generated or raw webpage summaries for later reference
- **🔍 Search**: Search through your saved summaries
- **⚙️ API Key Management**: Secure OpenAI API key storage and management
- **✨ AI Indicators**: Visual badges showing AI-generated content
- **🎨 Modern UI**: Beautiful shadcn-inspired design with smooth animations
- **⏳ Loading States**: Elegant loading animations during AI processing
- **🌙 Dark Mode**: Automatic dark mode support
- **📱 Responsive**: Works perfectly on different screen sizes

## Installation 🛠️

### Development Mode

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `build` folder from this project

### Development with Hot Reload

For development with hot reload:
```bash
npm start
```

This will start a development server and watch for changes.

## Usage 📖

### Setting Up OpenAI (Required for AI Summaries)

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click the **Explainx icon** in Chrome toolbar
3. Click the **Settings** gear icon
4. Paste your API key and click **Save**
5. You're ready to generate AI summaries! ✨

### Generating AI Summaries

1. **Navigate to any webpage** you want to summarize
2. **Click the circular Explainx button** in the top-right corner of the page
3. Watch the **AI generate your summary** (takes 2-5 seconds)
4. A **beautiful dialog** will appear with your AI-powered summary
5. Choose one of the following actions:
   - **Save Summary**: Save the AI summary for later viewing
   - **Regenerate**: Generate a new summary
   - **Discard**: Close the dialog without saving

### Viewing Saved Summaries

1. **Click the Explainx icon** in your Chrome toolbar
2. View all your **saved summaries** in a beautiful interface
3. **Search** through summaries using the search bar
4. **Click any summary** to expand and view full content
5. **Actions available**:
   - Open the original page
   - Delete individual summaries
   - Clear all summaries at once

## Project Structure 📁

```
chrome-extension-summarise/
├── src/
│   ├── assets/
│   │   └── img/           # Extension icons
│   ├── manifest.json      # Extension manifest
│   ├── pages/
│   │   ├── Background/    # Background service worker
│   │   ├── Content/       # Content script (injected into webpages)
│   │   │   ├── index.js
│   │   │   └── content.styles.css
│   │   └── Popup/         # Extension popup UI
│   │       ├── Popup.jsx
│   │       ├── Popup.css
│   │       └── index.jsx
├── build/                 # Built extension (after npm run build)
├── package.json
└── webpack.config.js
```

## Tech Stack 💻

- **React 18**: Modern React with Hooks
- **OpenAI GPT-4o-mini**: AI-powered text summarization
- **Webpack 5**: Module bundler and build tool
- **Chrome Extension Manifest V3**: Latest Chrome extension standards
- **Chrome Storage API**: For saving summaries and API keys
- **Modern CSS**: Custom styling with CSS variables and animations

## Features Breakdown 🎯

### Content Script
- Injects a circular button into every webpage
- Extracts clean text content from the page
- Requests AI summaries from background worker
- Shows loading states during AI generation
- Displays modal dialog with AI-generated content
- Handles errors gracefully
- Saves summaries to Chrome storage

### Popup
- Displays all saved summaries with AI indicators
- API key settings page
- Search functionality
- Click to expand/collapse summaries
- Open original page
- Delete summaries
- Clear all summaries
- Visual distinction for AI-generated content

### Background Service Worker
- Initializes extension storage
- Handles OpenAI API communication
- Manages API key storage
- Processes AI summary requests
- Handles inter-component messaging
- Manages storage operations

## Styling 🎨

The extension uses a modern, shadcn-inspired design with:
- Gradient backgrounds
- Smooth transitions and animations
- Clean, minimalist interface
- Responsive design
- Dark mode support
- Custom scrollbars
- Beautiful hover effects

## Storage 💾

Summaries are stored using Chrome's `storage.local` API with:
- Maximum of 50 saved summaries (auto-cleanup)
- Each summary contains:
  - Title
  - URL
  - Full content
  - Timestamp
  - Saved date

## Completed Features ✅

- [x] AI-powered summarization with OpenAI GPT-4o-mini
- [x] API key management
- [x] Loading states and error handling
- [x] AI content indicators

## Future Enhancements 🔮

- [ ] Export summaries as PDF/Markdown
- [ ] Tags and categories for summaries
- [ ] Cloud sync across devices
- [ ] Support for more AI providers (Claude, Gemini)
- [ ] Custom AI models selection
- [ ] Summary length customization
- [ ] Multi-language support
- [ ] Batch summarization

## Development 👨‍💻

### Build for Production
```bash
npm run build
```

### Format Code
```bash
npm run prettier
```

### Project Configuration
- **Webpack**: `webpack.config.js`
- **Build Script**: `utils/build.js`
- **Dev Server**: `utils/webserver.js`

## Browser Compatibility 🌐

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Brave
- Other Chromium-based browsers

## License 📄

MIT License - feel free to use this project for your own purposes!

## Credits 👏

Built with love using:
- React
- Webpack
- Chrome Extension APIs
- Modern CSS

---

**Happy Summarizing! 📝**

For questions or issues, please create an issue in the repository.
