# Explainx.ai 🚀

A beautiful Chrome extension that extracts and summarizes webpage content with a modern, user-friendly interface.

## Features ✨

- **🔘 Circular Floating Button**: A sleek circular button appears on the top-right of every webpage
- **📄 Content Extraction**: Extracts clean text content from any webpage
- **💾 Save Summaries**: Save webpage summaries for later reference
- **🔍 Search**: Search through your saved summaries
- **🎨 Modern UI**: Beautiful shadcn-inspired design with smooth animations
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

### Extracting Page Content

1. **Navigate to any webpage** you want to summarize
2. **Click the circular Explainx button** in the top-right corner of the page
3. A **beautiful dialog** will appear showing the extracted text content
4. Choose one of the following actions:
   - **Save Summary**: Save the content for later viewing
   - **Regenerate**: Extract the content again
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
- **Webpack 5**: Module bundler and build tool
- **Chrome Extension Manifest V3**: Latest Chrome extension standards
- **Chrome Storage API**: For saving summaries
- **Modern CSS**: Custom styling with CSS variables and animations

## Features Breakdown 🎯

### Content Script
- Injects a circular button into every webpage
- Extracts clean text content from the page
- Shows a modal dialog with extracted content
- Saves summaries to Chrome storage

### Popup
- Displays all saved summaries
- Search functionality
- Click to expand/collapse summaries
- Open original page
- Delete summaries
- Clear all summaries

### Background Service Worker
- Initializes extension storage
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

## Future Enhancements 🔮

- [ ] AI-powered summarization integration
- [ ] Export summaries as PDF/Markdown
- [ ] Tags and categories for summaries
- [ ] Cloud sync across devices
- [ ] Custom AI models selection
- [ ] Summary length customization
- [ ] Multi-language support

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
